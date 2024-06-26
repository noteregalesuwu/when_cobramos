document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("aguinaldo").style.display = "none";
    document.getElementById("es-hoy").style.display = "none";
    document.getElementById("cobrarRef").classList.add("active");
    document.getElementById("es-hoy").style.display = "none";
    document.getElementById("informaciones").style.display = "none";
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
    lastBusinessDay.setHours(18, 0, 0, 0); // 18:00 horas

    const timeRemaining = lastBusinessDay - now;

    if (timeRemaining < 0) {
        if (currentMonth === 11) { // Si es diciembre, incrementa el año y ajusta el mes a enero
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        lastBusinessDay = getLastBusinessDayOfMonth(currentYear, currentMonth, feriados);
        lastBusinessDay.setHours(18, 0, 0, 0); // 18:00 horas
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("countdown-cobro").innerHTML = 
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
        document.getElementById("es-hoy").style.display = "block";
        document.getElementById("nutrias-tristes").style.display = "none";
    } else {
        document.getElementById("es-hoy").style.display = "none";
        document.getElementById("nutrias-tristes").style.display = "block";
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
    let [aguinaldoMonth, aguinaldoDay] = aguinaldoFecha.split('-').map(Number);
    let aguinaldoDate = new Date(currentYear, aguinaldoMonth - 1, aguinaldoDay); // Fecha del aguinaldo del año actual

    if (now > aguinaldoDate) {
        currentYear++; // Si ya pasó la fecha, ajusta al siguiente año
        aguinaldoDate = new Date(currentYear, aguinaldoMonth - 1, aguinaldoDay);
    }

    aguinaldoDate = getNextBusinessDay(aguinaldoDate, feriados);
    aguinaldoDate.setHours(18, 0, 0, 0); // 18:00 horas

    const timeRemaining = aguinaldoDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("countdown-aguinaldo").innerHTML = 
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
fetch('feriados.json')
    .then(response => response.json())
    .then(data => {
        const feriados = Array.isArray(data.feriados) ? data.feriados : [];
        const aguinaldoFecha = data.aguinaldoFecha ;
        updateCountdownCobro(feriados);
        updateCountdownAguinaldo(feriados, aguinaldoFecha);
    })
    .catch(error => console.error('Error al cargar los datos:', error));


document.getElementById("aguinaldoRef").addEventListener("click", function() {
    document.getElementById("cobrar").style.display = "none";
    document.getElementById("aguinaldo").style.display = "flex";
    document.getElementById("aguinaldoRef").classList.add("active");
    document.getElementById("cobrarRef").classList.remove("active");
    document.getElementById("informaciones").style.display = "none";
    document.getElementById("informacionesRef").classList.remove("active");
});

document.getElementById("cobrarRef").addEventListener("click", function() {
    document.getElementById("aguinaldo").style.display = "none";
    document.getElementById("informaciones").style.display = "none";
    document.getElementById("cobrar").style.display = "flex";
    document.getElementById("cobrarRef").classList.add("active");
    document.getElementById("aguinaldoRef").classList.remove("active");
    document.getElementById("informacionesRef").classList.remove("active");

});

document.getElementById("btn-aguinaldo").addEventListener("click", function() {
    document.getElementById("cobrar").style.display = "none";
    document.getElementById("informaciones").style.display = "none";
    document.getElementById("aguinaldo").style.display = "flex";
    document.getElementById("aguinaldoRef").classList.add("active");
    document.getElementById("cobrarRef").classList.remove("active");
    document.getElementById("informacionesRef").classList.remove("active");

});

document.getElementById("btn-sueldo").addEventListener("click", function() {
    document.getElementById("aguinaldo").style.display = "none";
    document.getElementById("informaciones").style.display = "none";
    document.getElementById("cobrar").style.display = "flex";
    document.getElementById("cobrarRef").classList.add("active");
    document.getElementById("aguinaldoRef").classList.remove("active");
    document.getElementById("informacionesRef").classList.remove("active");
});

document.getElementById("informacionesRef").addEventListener("click", function() {
    document.getElementById("cobrar").style.display = "none";
    document.getElementById("aguinaldo").style.display = "none";
    document.getElementById("informaciones").style.display = "flex";
    document.getElementById("informacionesRef").classList.add("active");
    document.getElementById("cobrarRef").classList.remove("active");
    document.getElementById("aguinaldoRef").classList.remove("active");
});