const water = document.getElementById("water");
water.style =
  "height: 10em; -webkit-transition: all 15s ease-out; -moz-transition: all 15s ease-out; -o-transition: all 15s ease-out; transition: all 15s ease-out;";
// Initialisation du capteur
let sensor;

if ('Accelerometer' in window) {
  sensor = new Accelerometer();
  sensor.addEventListener('reading', () => {
    console.log(`Acceleration along X-axis ${sensor.x}`);
    console.log(`Acceleration along Y-axis ${sensor.y}`);
    console.log(`Acceleration along Z-axis ${sensor.z}`);
  });
}

document.getElementById('playButton').addEventListener('click', function(event) {
  event.preventDefault();

  // Démarrer le capteur de l'accéléromètre
  if (sensor) {
    sensor.start();
  }

  // Démarrer le compteur d'une minute
  let timerElement = document.getElementById('timer');
  let timeLeft = 60;
  timerElement.textContent = timeLeft;

  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      alert('Temps écoulé !');
    }
  }, 1000);
});
