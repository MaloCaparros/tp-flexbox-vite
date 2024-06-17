window.addEventListener('DOMContentLoaded', function () {
  const apiElement = document.getElementById("moApi");
  const scoreElement = document.getElementById("moAccel");
  const timerElement = document.getElementById("timer");

  let sensor; // Déclarer sensor pour qu'il soit accessible globalement

  if ('LinearAccelerationSensor' in window) {
    apiElement.textContent = 'Generic Sensor API';

    sensor = new LinearAccelerationSensor({ frequency: 60 });
    sensor.addEventListener('reading', () => {
      accelerationHandler(sensor);
    });
    sensor.start();

  } else if ('DeviceMotionEvent' in window) {
    apiElement.textContent = 'Device Motion API';

    window.addEventListener('devicemotion', (eventData) => {
      accelerationHandler(eventData.acceleration);
      intervalHandler(eventData.interval);
    }, false);

  } else {
    apiElement.textContent = 'No Accelerometer & Gyroscope API available';
  }

  function accelerationHandler(acceleration) {
    if (acceleration && acceleration.y !== null) {
      const info = `Y: ${acceleration.y.toFixed(3)}`;
      scoreElement.textContent = info;
    } else {
      scoreElement.textContent = 'N/A';
    }
  }

  let timeLeft = 60; // Compte à rebours de 60 secondes
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
