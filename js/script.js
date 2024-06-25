document.getElementById("es-hoy").style.display = "none";

function getLastBusinessDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0); // Último día del mes
    while (date.getDay() === 0 || date.getDay() === 6) { // Mientras sea domingo o sábado
        date.setDate(date.getDate() - 1); // Retrocede un día
    }
    return date;
}

function updateCountdownCobro() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const lastBusinessDay = getLastBusinessDayOfMonth(currentYear, currentMonth);
    lastBusinessDay.setHours(18, 0, 0, 0); // 18:00 horas

    const timeRemaining = lastBusinessDay - now;

    if (timeRemaining < 0) {
        document.getElementById("countdown-cobro").innerText = "El tiempo ha expirado para este mes.";
        return;
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

    setTimeout(updateCountdownCobro, 1000);
}

updateCountdownCobro();
function updateCountdownAguinaldo() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const aguinaldoDate = new Date(currentYear, 11, 16); // December 15th of the current year
    aguinaldoDate.setHours(18, 0, 0, 0); // 18:00 hours

    const timeRemaining = aguinaldoDate - now;

    if (timeRemaining < 0) {
        document.getElementById("countdown-aguinaldo").innerText = "El tiempo ha expirado para este año.";
        return;
    }

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

    setTimeout(updateCountdownAguinaldo, 1000);
}

updateCountdownAguinaldo();

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("aguinaldo").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cobrarRef").classList.add("active");
});

document.getElementById("aguinaldoRef").addEventListener("click", function() {
    document.getElementById("cobrar").style.display = "none";
    document.getElementById("aguinaldo").style.display = "flex";
    document.getElementById("aguinaldoRef").classList.add("active");
    document.getElementById("cobrarRef").classList.remove("active");

});

document.getElementById("cobrarRef").addEventListener("click", function() {
    document.getElementById("aguinaldo").style.display = "none";
    document.getElementById("cobrar").style.display = "flex";
    document.getElementById("cobrarRef").classList.add("active");
    document.getElementById("aguinaldoRef").classList.remove("active");
});

document.getElementById("btn-aguinaldo").addEventListener("click", function() {
    document.getElementById("cobrar").style.display = "none";
    document.getElementById("aguinaldo").style.display = "flex";
    document.getElementById("aguinaldoRef").classList.add("active");
    document.getElementById("cobrarRef").classList.remove("active");

});

document.getElementById("btn-sueldo").addEventListener("click", function() {
    document.getElementById("aguinaldo").style.display = "none";
    document.getElementById("cobrar").style.display = "flex";
    document.getElementById("cobrarRef").classList.add("active");
    document.getElementById("aguinaldoRef").classList.remove("active");
});