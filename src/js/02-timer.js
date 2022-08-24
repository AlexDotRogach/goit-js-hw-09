import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('*[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      // choose time and set time for start
      const time = setTime(
        Date.parse(selectedDates[0]) - Date.parse(new Date())
      );

      startBtn.addEventListener('click', () => startTimer(time));
    }
  },
};

flatpickr('#datetime-picker', options);

// create interval and invoke function that set time
function startTimer(timeTo) {
  setInterval(() => {
    timeTo -= 1000;
    setTime(timeTo);
  }, 1000);
}

// sort out elements and set values in correct span then return time that was set
function setTime(timeTo) {
  const objTime = convertMs(timeTo);

  // set time
  for (let key in objTime) {
    document.querySelector(`*[data-${key}]`).textContent = addLeadingZero(
      objTime[key]
    );
  }

  return timeTo;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value += '';
  return value.padStart(2, '0');
}
