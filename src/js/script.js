window.addEventListener("DOMContentLoaded", function () {
  const water = document.getElementById("water");
  let sensor;

  water.style =
    "height: 10em; -webkit-transition: all 15s ease-out; -moz-transition: all 15s ease-out; -o-transition: all 15s ease-out; transition: all 15s ease-out;";
  // Initialisation du capteur

  sensor = new Accelerometer();
  sensor.start();
  sensor.addEventListener("reading", () => {
    console.log(`Acceleration along X-axis ${sensor.x}`);
    console.log(`Acceleration along Y-axis ${sensor.y}`);
    console.log(`Acceleration along Z-axis ${sensor.z}`);
  });

  let timerElement = document.getElementById("timer");
  let scoreELement = document.getElementById("score");
  scoreELement.textContent = sensor.x + " " + sensor.y + " " + sensor.z;
  let timeLeft = 30;
  timerElement.textContent = timeLeft;

  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      alert("Temps écoulé !");
    }
  }, 1000);
});
