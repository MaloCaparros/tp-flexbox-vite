window.addEventListener("DOMContentLoaded", function () {
  const apiElement = document.getElementById("moApi");
  let score = 0.0;
  const scoreElement = document.getElementById("moAccel");
  const timerElement = document.getElementById("timer");

  let sensor; // Déclarer sensor pour qu'il soit accessible globalement

  if ("LinearAccelerationSensor" in window) {
    apiElement.textContent = "Generic Sensor API";

    sensor = new LinearAccelerationSensor({ frequency: 60 });
    sensor.addEventListener("reading", () => {
      accelerationHandler(sensor);
    });
    sensor.start();
  } else if ("DeviceMotionEvent" in window) {
    apiElement.textContent = "Device Motion API";

    window.addEventListener(
      "devicemotion",
      (eventData) => {
        accelerationHandler(eventData.acceleration.y);
        intervalHandler(eventData.interval);
      },
      false
    );
  } else {
    apiElement.textContent = "No Accelerometer & Gyroscope API available";
  }
  let scoreboard;

  function accelerationHandler(acceleration) {
    if (acceleration && acceleration.y !== null) {
      const info = acceleration.y.toFixed(3);
      timerElement.textContent = timeLeft;
      
        scoreboard = setInterval(() => {
            if (info > -0.5 && info < 0.5) {
              score += 0.1;
              scoreElement.textContent = score;
            }
            if (info < -0.5 || info > 0.5) {
              score += 0.5;
              scoreElement.textContent = score;
            }
            
        
        }, 500);
      }
    }

    let timeLeft = 60;
    let countdown = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(countdown);
        this.clearInterval(scoreboard);
        if (sensor) {
          sensor.stop();
        }
        alert("Temps écoulé ! Vous avez obtenu un score de " + score + " points !");
      }
    }, 1000);

});
