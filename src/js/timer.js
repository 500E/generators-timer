import { padStart } from './padStart';

export function timer() {
  let time = new Date();
  let seconds = time.getSeconds();
  let minutes = time.getMinutes();
  let hours = time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();

  const clock = document.querySelector('.clock');
  const updateTime = () => {
    clock.textContent = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;
  };

  function* secondsGen() {
    while (true) {
      yield seconds++;
    }
  }

  function* minutesGen() {
    while (true) {
      yield minutes++;
    }
  }

  function* hoursGen() {
    while (true) {
      yield hours++;
    }
  }

  const secondsG = secondsGen();
  const minutesG = minutesGen();
  const hoursG = hoursGen();

  setInterval(() => {
    secondsG.next();
    if (seconds === 60) {
      seconds = 0;
      minutesG.next();
    }
    if (minutes === 60) {
      minutes = 0;
      hoursG.next();
    }
    if (hours === 12) {
      hours = 0;
    }
    updateTime();
  }, 1000);
}
