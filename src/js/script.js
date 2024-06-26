const start = document.getElementById("start");
const gamestart = document.querySelector(".gamestart");
const gameplay = document.querySelector(".gameplay");
const traire = document.getElementById("button_milk");

start.addEventListener("click", function () {
  navigator.vibrate(3000);
  gamestart.style.display = "none";
  gameplay.style.display = "block";
  const timerElement = document.getElementById("timer");
  const pointsElement = document.getElementById("point");
  const water = document.getElementById("water");

  let score = 0;
  traire.addEventListener("click", function () {
    score = score + 0.1;
    pointsElement.textContent = score.toFixed(2);
  });

  let sensor; 

  if ("LinearAccelerationSensor" in window) {
    sensor = new LinearAccelerationSensor({ frequency: 2 });
    sensor.addEventListener("reading", () => {
      accelerationHandler(sensor);
    });
    sensor.start();
  } else if ("DeviceMotionEvent" in window) {
    window.addEventListener(
      "devicemotion",
      (eventData) => {
        accelerationHandler(eventData.acceleration);
        intervalHandler(eventData.interval);
      },
      false
    );
  }

  function accelerationHandler(acceleration) {
    if (acceleration && acceleration.y !== null) {
      const info = `Y: ${acceleration.y.toFixed(3)}`;
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
    }
  }
  let timeLeft = 20; 
  timerElement.textContent = timeLeft;
  let countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 20) {
      water.style = "height: 10em;";
    }
    if (timeLeft <= 0) {
      clearInterval(countdown);
      if (sensor) {
        sensor.stop();
      }
      navigator.vibrate(2000);
      alert(
        "Temps écoulé ! vous avez obtenu " +
          score.toFixed(2) +
          " litres de lait."
      );

      let playerName = document.getElementById("name").value;

      if (playerName.trim() === "") {
          playerName = "Anonyme"; 
      } else if (playerName === null) {
          playerName = "Anonyme";
      }
      
      let finalScore = score.toFixed(2);

      let gameData = {
        playerName: playerName,
        score: finalScore,
      };
      axios
        .post("https://vachibox.vercel.app/saveGameData", gameData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {})
        .catch((error) => {
          console.error("Erreur lors de l'envoi des données:", error);
        });

      gamestart.style.display = "flex";
      gameplay.style.display = "none";
      water.style = "height: 5em;";
    }
  }, 1000);
});
