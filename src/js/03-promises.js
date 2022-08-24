import Notiflix from 'notiflix';

const inputsArr = [...document.querySelectorAll('input[type="number"]')];
const form = document.querySelector('form');
const valuesObj = {};

form.addEventListener('submit', e => {
  e.preventDefault();

  inputsArr.forEach(input => {
    valuesObj[input.name] = input.value;
  });
  // first invoke
  procPromise(createPromise(1, valuesObj.delay));
  // other elements
  for (let i = 1; i < valuesObj.amount; i++) {
    procPromise(createPromise(i + 1, +valuesObj.delay + +valuesObj.step * i));
  }
});
// process a promise
function procPromise(promise) {
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
// create promise and transfer delay and position of promise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
