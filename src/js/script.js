window.addEventListener('DOMContentLoaded', function () {
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("moAccel");
  let sensor;
  let countdown;

  function startSensor() {
    if ('LinearAccelerationSensor' in window) {
      sensor = new LinearAccelerationSensor({ frequency: 60 });
      sensor.addEventListener('reading', () => {
        const y = sensor.y !== null ? sensor.y.toFixed(3) : 'N/A';
        scoreElement.textContent = `Y: ${y}`;
      });
      sensor.start();
    } else if ('DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', (eventData) => {
        const y = eventData.acceleration.y !== null ? eventData.acceleration.y.toFixed(3) : 'N/A';
        scoreElement.textContent = `Y: ${y}`;
      }, false);
    } else {
      alert('No Accelerometer API available');
    }
  }

  // Démarrer le capteur de l'accéléromètre et le compteur d'une minute
  startSensor();

  let timeLeft = 60; // Compte à rebours de 60 secondes
  timerElement.textContent = timeLeft;

  countdown = setInterval(() => {
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
