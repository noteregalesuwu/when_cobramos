function getLastBusinessDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0); // Último día del mes
    while (date.getDay() === 0 || date.getDay() === 6) { // Mientras sea domingo o sábado
        date.setDate(date.getDate() - 1); // Retrocede un día
    }
    return date;
}

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const lastBusinessDay = getLastBusinessDayOfMonth(currentYear, currentMonth);
    lastBusinessDay.setHours(18, 0, 0, 0); // 18:00 horas

    const timeRemaining = lastBusinessDay - now;

    if (timeRemaining < 0) {
        document.getElementById("countdown").innerText = "El tiempo ha expirado para este mes.";
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = 
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

    setTimeout(updateCountdown, 1000);
}

updateCountdown();
