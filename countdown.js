const countdown = document.getElementById("countdown");
const minutesInput = document.getElementById("minutes");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timerMessage = document.getElementById("timerMessage");

let remainingSeconds = 0;
let timer = null;

function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    countdown.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

startBtn.addEventListener("click", function () {
    if (timer !== null) return;

    if (remainingSeconds <= 0) {
        const minutes = Number(minutesInput.value);

        if (!Number.isInteger(minutes) || minutes < 1 || minutes > 60) {
            timerMessage.textContent = "Vui lòng nhập từ 1 đến 60 phút.";
            return;
        }

        remainingSeconds = minutes * 60;
    }

    timerMessage.textContent = "Đang đếm ngược...";
    updateDisplay();

    timer = setInterval(function () {
        remainingSeconds--;
        updateDisplay();

        if (remainingSeconds <= 0) {
            clearInterval(timer);
            timer = null;
            timerMessage.textContent = "Hết giờ!";
        }
    }, 1000);
});

resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    remainingSeconds = 0;
    updateDisplay();
    timerMessage.textContent = "";
});

updateDisplay();
