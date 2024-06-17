window.addEventListener('DOMContentLoaded', function () {
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("counter");
  let countdown;
  let compteur = 0;
  let sensor;

  function startSensor() {
      if ('LinearAccelerationSensor' in window) {
          let lastReadingTimestamp;
          sensor = new LinearAccelerationSensor({ frequency: 60 });
          sensor.addEventListener('reading', () => {
              if (lastReadingTimestamp) {
                  intervalHandler(Math.round(sensor.timestamp - lastReadingTimestamp));
              }
              lastReadingTimestamp = sensor.timestamp;
              accelerationHandler(sensor.y, 'counter');
          });
          sensor.start();
      } else if ('DeviceMotionEvent' in window) {
          window.addEventListener('devicemotion', (eventData) => {
              const y = eventData.acceleration.y !== null ? eventData.acceleration.y.toFixed(3) : 'N/A';
              scoreElement.textContent = `Y: ${y}`;
          }, false);
      }
  }

  function accelerationHandler(y, targetId) {
      compteur += y
      document.getElementById(targetId).innerHTML = compteur.toFixed(3);
  }

  function intervalHandler(interval) {
      console.log(`Interval: ${interval} ms`);
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
