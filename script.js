const cobrarRefElement = document.getElementById("cobrarRef");
const darkModeToggle = document.getElementById("darkMode");
const divCobrar = document.getElementById("cobrar");
const divInfo = document.getElementById("informaciones");
const normalModeToggle = document.getElementById("normalMode");
const countdownAguinaldo = document.getElementById("countdown-aguinaldo");
const countdownCobro = document.getElementById("countdown-cobro");
const esHoyDiv = document.getElementById("es-hoy");
const toggleThemeElement = document.getElementById("toggleTheme");
const bodyTheme = document.getElementById("body-theme");
const divAguinaldo = document.getElementById("aguinaldo");
const btnVerMemes = document.getElementById("verMemes");
const divMemes = document.getElementById("memes");
const memeJulioElement = document.getElementById("memeJulio");
const textoFeliz = document.getElementById("texto-feliz");
const infoRefElement = document.getElementById("informacionesRef");
const aguinaldoRefElement = document.getElementById("aguinaldoRef");
const divNutriasTristes = document.getElementById("nutrias-tristes");
const memesRef = document.getElementById("memesRef");
const btnVolverInicio = document.getElementById("volverInicio");
const themeSwitcher = document.getElementById("theme-switcher");
const iconoSol = document.querySelector('.bi-brightness-high-fill');
const iconoLuna = document.querySelector('.bi-moon-stars-fill');


document.addEventListener("DOMContentLoaded", function() {
    divAguinaldo.style.display = "none";
    esHoyDiv.style.display = "none";
    cobrarRefElement.classList.add("active");
    esHoyDiv.style.display = "none";
    divInfo.style.display = "none";
    divMemes.style.display = "none";
    memesRef.classList.remove("active");
        divMemes.style.display = "none";

    const currentMode = localStorage.getItem("mode");

    if(currentMode === "dark"){
        iconoSol.classList.remove('icono-oscuro');
        iconoSol.classList.add('icono-claro');
        iconoLuna.classList.remove('icono-claro');
        iconoLuna.classList.add('icono-oscuro');
        enableDarkMode();
        themeSwitcher.checked = true;
    }else{
        iconoSol.classList.remove('icono-claro');
        iconoSol.classList.add('icono-oscuro');
        iconoLuna.classList.remove('icono-oscuro');
        iconoLuna.classList.add('icono-claro');
        disableDarkMode();
        themeSwitcher.checked = false;
    }

    themeSwitcher.addEventListener("change", function(){
        if(themeSwitcher.checked){
            iconoSol.classList.remove('icono-oscuro');
            iconoSol.classList.add('icono-claro');
            iconoLuna.classList.remove('icono-claro');
            iconoLuna.classList.add('icono-oscuro');
            enableDarkMode();
            localStorage.setItem("mode","dark");
        }
        else{
            iconoSol.classList.remove('icono-claro');
            iconoSol.classList.add('icono-oscuro');
            iconoLuna.classList.remove('icono-oscuro');
            iconoLuna.classList.add('icono-claro');
            disableDarkMode();
            localStorage.setItem("mode","light");
        }
    });

    //Dark Mode Truchazo
    function enableDarkMode(){
        bodyTheme.classList.remove("bg-light");
        bodyTheme.classList.add("bg-dark");
        bodyTheme.classList.add("dark-mode-active");
        countdownAguinaldo.classList.add("bg-dark");
        countdownCobro.classList.add("bg-dark");
    }

    function disableDarkMode(){
        bodyTheme.classList.remove("bg-dark");
        bodyTheme.classList.add("bg-light");
        bodyTheme.classList.remove("dark-mode-active");
        countdownAguinaldo.classList.remove("bg-dark");
        countdownCobro.classList.remove("bg-dark");
    }
});

// Función para verificar si una fecha es feriado (ignorando el año)
function esFeriado(fecha, feriados) {
    const mesDiaStr = `${fecha.getMonth() + 1}-${fecha.getDate()}`;
    return feriados.some(feriado => feriado.fecha === mesDiaStr);
}

function getLastBusinessDayOfMonth(year, month, feriados) {
    let date = new Date(year, month + 1, 0); // Último día del mes
    while (date.getDay() === 0 || date.getDay() === 6 || esFeriado(date, feriados)) { // Mientras sea domingo, sábado o feriado
        date.setDate(date.getDate() - 1); // Retrocede un día
    }
    return date;
}

function updateCountdownCobro(feriados) {
    const now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();

    let lastBusinessDay = getLastBusinessDayOfMonth(currentYear, currentMonth, feriados);
    lastBusinessDay.setHours(22, 0, 0, 0); 

    let timeRemaining = lastBusinessDay - now;

    if (timeRemaining < 0) {
        if (currentMonth === 11) { // Si es diciembre, incrementa el año y ajusta el mes a enero
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        lastBusinessDay = getLastBusinessDayOfMonth(currentYear, currentMonth, feriados);
        lastBusinessDay.setHours(22, 0, 0, 0); 
        timeRemaining = lastBusinessDay - now; // Recalcula el tiempo restante después de cambiar el mes
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownCobro.innerHTML = 
        `<div class="col-md-3 col-3">
            <span><p>${days}</p></span>
            <small><p>días</p></small>
        </div>
        <div class="col-md-3 col-3">
            <span><p>${hours}</p></span>
            <small><p>horas</p></small>
        </div>
        <div class="col-md-3 col-3">
            <span><p>${minutes}</p></span>
            <small><p>minutos</p></small>
        </div>
        <div class="col-md-3 col-3">
            <span><p>${seconds}</p></span>
            <small><p>segundos</p></small>
        </div>`;

    if (days < 1 ) {
        esHoyDiv.style.display = "block";
        divNutriasTristes.style.display = "none";
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }else if(days === 1 && hours > 1 ){
        esHoyDiv.style.display = "block";
        textoFeliz.textContent="Mañana";
        divNutriasTristes.style.display = "none";
    } else {
        esHoyDiv.style.display = "none";
        divNutriasTristes.style.display = "block";
    }

    setTimeout(() => updateCountdownCobro(feriados), 1000);
}

function getNextBusinessDay(date, feriados) {
    while (date.getDay() === 0 || date.getDay() === 6 || esFeriado(date, feriados)) { // Mientras sea domingo, sábado o feriado
        date.setDate(date.getDate() + 1); // Avanza un día
    }
    return date;
}


function updateCountdownAguinaldo(feriados, aguinaldoFecha) {
    const now = new Date();
    let currentYear = now.getFullYear();
    let [aguinaldoMonth, aguinaldoDay] = aguinaldoFecha.split("-").map(Number);
    let aguinaldoDate = new Date(currentYear, aguinaldoMonth - 1, aguinaldoDay); // Fecha del aguinaldo del año actual

    if (now > aguinaldoDate) {
        currentYear++; // Si ya pasó la fecha, ajusta al siguiente año
        aguinaldoDate = new Date(currentYear, aguinaldoMonth - 1, aguinaldoDay);
    }

    aguinaldoDate = getNextBusinessDay(aguinaldoDate, feriados);
    aguinaldoDate.setHours(22, 0, 0, 0);

    const timeRemaining = aguinaldoDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownAguinaldo.innerHTML = 
        `<div class="col-md-3 col-3">
            <span class="span-aguinaldo"><p>${days}</p></span>
            <small><p>días</p></small>
        </div>
        <div class="col-md-3 col-3">
            <span class="span-aguinaldo"><p>${hours}</p></span>
            <small><p>horas</p></small>
        </div>
        <div class="col-md-3 col-3">
            <span class="span-aguinaldo"><p>${minutes}</p></span>
            <small><p>minutos</p></small>
        </div>
        <div class="col-md-3 col-3">
            <span class="span-aguinaldo"><p>${seconds}</p></span>
            <small><p>segundos</p></small>
        </div>`;

    setTimeout(() => updateCountdownAguinaldo(feriados, aguinaldoFecha), 1000);
}

// Cargar los feriados y la fecha del aguinaldo desde el archivo JSON
fetch("feriados.json")
    .then(response => response.json())
    .then(data => {
        const feriados = Array.isArray(data.feriados) ? data.feriados : [];
        const aguinaldoFecha = data.aguinaldoFecha ;
        updateCountdownCobro(feriados);
        updateCountdownAguinaldo(feriados, aguinaldoFecha);
    })
    .catch(error => console.error("Error al cargar los datos:", error));


aguinaldoRefElement.addEventListener("click", function() {
    divCobrar.style.display = "none";
    divAguinaldo.style.display = "flex";
    aguinaldoRefElement.classList.add("active");
    cobrarRefElement.classList.remove("active");
    divInfo.style.display = "none";
    infoRefElement.classList.remove("active");
    memesRef.classList.remove("active");
    divMemes.style.display = "none";
});

cobrarRefElement.addEventListener("click", function() {
    divAguinaldo.style.display = "none";
    divInfo.style.display = "none";
    divCobrar.style.display = "flex";
    cobrarRefElement.classList.add("active");
    aguinaldoRefElement.classList.remove("active");
    infoRefElement.classList.remove("active");
    memesRef.classList.remove("active");
    divMemes.style.display = "none";
});

document.getElementById("btn-aguinaldo").addEventListener("click", function() {
    divCobrar.style.display = "none";
    divInfo.style.display = "none";
    divAguinaldo.style.display = "flex";
    aguinaldoRefElement.classList.add("active");
    cobrarRefElement.classList.remove("active");
    infoRefElement.classList.remove("active");
    memesRef.classList.remove("active");
    divMemes.style.display = "none";
});

document.getElementById("btn-sueldo").addEventListener("click", function() {
    divAguinaldo.style.display = "none";
    divInfo.style.display = "none";
    divCobrar.style.display = "flex";
    cobrarRefElement.classList.add("active");
    aguinaldoRefElement.classList.remove("active");
    infoRefElement.classList.remove("active");
    memesRef.classList.remove("active");
    divMemes.style.display = "none";
});

infoRefElement.addEventListener("click", function() {
    divCobrar.style.display = "none";
    divAguinaldo.style.display = "none";
    divInfo.style.display = "flex";
    infoRefElement.classList.add("active");
    cobrarRefElement.classList.remove("active");
    aguinaldoRefElement.classList.remove("active");
    memesRef.classList.remove("active");
    divMemes.style.display = "none";
});

btnVerMemes.addEventListener("click",function(){
    divMemes.style.display = "block";
    divCobrar.style.display = "none";
    divCobrar.style.display = "none";
    divAguinaldo.style.display = "none";
    divInfo.style.display = "none";
    memesRef.classList.add("active");
    aguinaldoRefElement.classList.remove("active");
    cobrarRefElement.classList.remove("active");
    infoRefElement.classList.remove("active");
});

memesRef.addEventListener("click",function(){
    divMemes.style.display = "block";
    divCobrar.style.display = "none";
    divAguinaldo.style.display = "none";
    divInfo.style.display = "none";
    memesRef.classList.add("active");
    aguinaldoRefElement.classList.remove("active");
    cobrarRefElement.classList.remove("active");
    infoRefElement.classList.remove("active");
});


btnVolverInicio.addEventListener("click",function(){
    divAguinaldo.style.display = "none";
    divInfo.style.display = "none";
    divCobrar.style.display = "flex";
    cobrarRefElement.classList.add("active");
    aguinaldoRefElement.classList.remove("active");
    infoRefElement.classList.remove("active");
    memesRef.classList.remove("active");
    divMemes.style.display = "none";
});

async function loadMemes() {
    try {
        const response = await fetch('memes.json');
        const data = await response.json();
        const rowMemes = document.getElementById('row-memes');
        data.memes.forEach(src => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-4 col-md-3';
            const a = document.createElement('a');
            a.href = src;
            a.setAttribute('data-fancybox', 'gallery');
            const img = document.createElement('img');
            img.src = src;
            img.className = 'img-fluid rounded mx-auto d-block';
            a.appendChild(img);
            colDiv.appendChild(a);
            rowMemes.appendChild(colDiv);
        });
    } catch (error) {
        console.error('Error cargando el JSON:', error);
    }
};
document.addEventListener('DOMContentLoaded', loadMemes);
