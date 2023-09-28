const clickArea = document.querySelector("#click-area");
const timer = document.querySelector("#timer");
let minTime = 5000;
let maxTime = 200000;
let timeUntilGreen = 0;
let timeSinceRed = 0;
let countdown = null;
let counter = null;
let greenStart = 0;
let stage = 0;
/*
    stage = 0   => before ready
    stage = 1   => after ready
    stage = 2   => after green
*/

clickArea.addEventListener("click", () => {
    if (stage == 0) {
        timeUntilGreen = Math.floor(Math.random() * (maxTime - minTime) + minTime);
        if (timeUntilGreen == 69420)
            timeUntilGreen = 600000;    // trololololololololo

        clickArea.style.setProperty("background-color", "darkred");
        clickArea.innerHTML = "Czekaj na zielone.";

        timeSinceRed = Date.now();

        countdown = setTimeout(() => {
            clickArea.style.setProperty("background-color", "green");
            clickArea.innerHTML = "Kliknij w dowolne miejsce.";
            greenStart = Date.now();
            stage = 2;
        }, timeUntilGreen);

        counter = setInterval(() => {
            let time = Date.now() - timeSinceRed;
            let mins = Math.floor(time / 60000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            time -= 60000 * mins;
            let secs = Math.floor(time / 1000).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            let mils = (time - 1000 * secs).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false});
            let insert = `${mins}:${secs}:${mils}`;
            timer.innerHTML = insert;
        }, 1);

        stage++;
    }
    else if (stage == 1) {
        clickArea.style.setProperty("background-color", "darkcyan");
        clickArea.innerHTML = "Zbyt szybko. Kliknij w dowolnym miejscu, aby ponowić próbę.";
        clearTimeout(countdown);
        clearInterval(counter);
        stage--;
    }
    if (stage == 2) {
        clickArea.style.setProperty("background-color", "darkcyan");
        clickArea.innerHTML = `<div id="time">${Date.now() - greenStart} ms</div>Kliknij w dowolnym miejscu aby ponowić próbę`;
        clearInterval(counter);
        stage = 0;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.altKey && event.key.toLowerCase() == "w") {
        timer.style.setProperty("display", "block");
    }
});

document.addEventListener("keyup", (event) => {
    if (event.altKey || event.key.toLowerCase() == "w") {
        timer.style.setProperty("display", "none");
    }
});