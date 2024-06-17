window.addEventListener("DOMContentLoaded", function () {
  const apiElement = document.getElementById("moApi");
  const scoreElement = document.getElementById("moAccel");
  const timerElement = document.getElementById("timer");
  const pointsElement = document.getElementById("point");
  const water = document.getElementById("water");
  water.style =
    "height: 10em; -webkit-transition: all 15s ease-out; -moz-transition: all 15s ease-out; -o-transition: all 15s ease-out; transition: all 15s ease-out;";
  let score = 0;


  let sensor; // Déclarer sensor pour qu'il soit accessible globalement

  if ("LinearAccelerationSensor" in window) {
    apiElement.textContent = "Generic Sensor API";

    sensor = new LinearAccelerationSensor({ frequency: 2 });
    sensor.addEventListener("reading", () => {
      accelerationHandler(sensor, "moAccel");
    });
    sensor.start();
  } else if ("DeviceMotionEvent" in window) {
    apiElement.textContent = "Device Motion API";

    window.addEventListener(
      "devicemotion",
      (eventData) => {
        accelerationHandler(eventData.acceleration, "moAccel");
        intervalHandler(eventData.interval);
      },
      false
    );
  } else {
    apiElement.textContent = "No Accelerometer & Gyroscope API available";
  }

  function accelerationHandler(acceleration, targetId) {
    if (acceleration && acceleration.y !== null) {
      const info = `Y: ${acceleration.y.toFixed(3)}`;
      scoreElement.textContent = info;
      if (acceleration.y.toFixed(3) > 2 || acceleration.y.toFixed(3) < -2) {
        score = score + 0.01;
      }
      if (acceleration.y.toFixed(3) > 2 || acceleration.y.toFixed(3) < -2) {
        score = score + 0.05;
      }
      if (acceleration.y.toFixed(3) > 5 || acceleration.y.toFixed(3) < -5) {
        score = score + 0.1;
      }
      pointsElement.textContent = score.toFixed(2);
    } else {
      scoreElement.textContent = "N/A";
    }
  }

  let timeLeft = 20; // Compte à rebours de 60 secondes
  timerElement.textContent = timeLeft;
  


  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      alert(
        "Temps écoulé ! vous avez obtenu " + score.toFixed(2) + " litres de lait."
      );
      
    }
  }, 1000);
});
