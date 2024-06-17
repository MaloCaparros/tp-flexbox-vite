window.addEventListener('DOMContentLoaded', function () {
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("moAccel");
  let countdown;
  let sensor;

  function startSensor() {
    if ('LinearAccelerationSensor' in window) {
      document.getElementById('moApi').innerHTML = 'Generic Sensor API';
    
      let lastReadingTimestamp;
      let accelerometer = new LinearAccelerationSensor();
      accelerometer.addEventListener('reading', () => {
        if (lastReadingTimestamp) {
          intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
        }
        lastReadingTimestamp = accelerometer.timestamp;
        accelerationHandler(accelerometer, 'moAccel');
      });
      accelerometer.start();
    
    
    } else if ('DeviceMotionEvent' in window) {
      document.getElementById('moApi').innerHTML = 'Device Motion API';
    
      var onDeviceMotion = function (eventData) {
        accelerationHandler(eventData.acceleration, 'moAccel');
        intervalHandler(eventData.interval);
      }
    
      window.addEventListener('devicemotion', onDeviceMotion, false);
    
    }
    
    function accelerationHandler(acceleration, targetId) {
      var info = `[X, Y, Z]`;
    
      info = info.replace("X", acceleration.x !== null ? acceleration.x.toFixed(3) : 'Nan');
      info = info.replace("Y", acceleration.y !== null ? acceleration.y.toFixed(3) : 'Nan');
      info = info.replace("Z", acceleration.z !== null ? acceleration.z.toFixed(3) : 'Nan');
      document.getElementById(scoreElement).innerHTML = info;
    }
    
    function intervalHandler(interval) {
      document.getElementById("moInterval").innerHTML = interval;
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
