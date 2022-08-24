const controlBtns = document.querySelectorAll('button');
const body = document.querySelector('body');
const [startBtn, stopBtn] = [...controlBtns];
let changeBodyColorId = null;
let timerId = null;

// default disabled stop btn
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  changeBodyColorId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  changeStateBtn(controlBtns);
});

stopBtn.addEventListener('click', () => {
  clearInterval(changeBodyColorId);
  changeStateBtn(controlBtns);
});

// help us to change our state of btn
function changeStateBtn(btns) {
  [...btns].forEach(btn => {
    btn.disabled ? (btn.disabled = false) : (btn.disabled = true);
  });
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
