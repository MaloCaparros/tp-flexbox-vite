window.addEventListener('DOMContentLoaded', function () {
  const apiElement = document.getElementById("moApi");
  const scoreElement = document.getElementById("moAccel");
  const timerElement = document.getElementById("timer");
  const pointsElement = document.getElementById("point");

  let sensor; // Déclarer sensor pour qu'il soit accessible globalement

  if ('LinearAccelerationSensor' in window) {
    apiElement.textContent = 'Generic Sensor API';

    sensor = new LinearAccelerationSensor({ frequency: 60 });
    sensor.addEventListener('reading', () => {
      accelerationHandler(sensor, 'moAccel');
    });
    sensor.start();

  } else if ('DeviceMotionEvent' in window) {
    apiElement.textContent = 'Device Motion API';

    window.addEventListener('devicemotion', (eventData) => {
      accelerationHandler(eventData.acceleration, 'moAccel');
      intervalHandler(eventData.interval);
    }, false);

  } else {
    apiElement.textContent = 'No Accelerometer & Gyroscope API available';
  }

  function accelerationHandler(acceleration, targetId) {
    if (acceleration && acceleration.y !== null) {
      const info = `Y: ${acceleration.y.toFixed(3)}`;
      scoreElement.textContent = info;
      if (acceleration.y.toFixed(3) > 0.5){
        pointsElement.textContent = pointsElement.textContent + 1;
      }
      
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
