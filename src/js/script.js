window.addEventListener('DOMContentLoaded', function () {
  const timerElement = document.getElementById("timer");
  const counterElement = document.getElementById("counter");
  let countdown;
  let sensor;
  let counter = 0.0;

  function startSensor() {
      if ('LinearAccelerationSensor' in window) {
          let lastReadingTimestamp;
          sensor = new LinearAccelerationSensor({ frequency: 60 });
          sensor.addEventListener('reading', () => {
              if (lastReadingTimestamp) {
                  intervalHandler(Math.round(sensor.timestamp - lastReadingTimestamp));
              }
              lastReadingTimestamp = sensor.timestamp;
              handleAcceleration(sensor.y);
          });
          sensor.start();
      } else if ('DeviceMotionEvent' in window) {
          window.addEventListener('devicemotion', (eventData) => {
              handleAcceleration(eventData.acceleration.y);
          }, false);
      } else {
          apiElement.innerHTML = 'No Accelerometer & Gyroscope API available';
      }
  }

  function handleAcceleration(y) {
      if (y !== null) {
          if (Math.abs(y) > 1) {
              counter += 0.5;
          } else {
              counter += 0.1;
          }
          counterElement.textContent = counter.toFixed(1);
      }
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
          alert(`Temps écoulé ! Votre compteur est à ${counter.toFixed(1)}`);
      }
  }, 1000);
});
