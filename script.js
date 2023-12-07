function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
  }
  
  function openStopwatch() {
    document.getElementById('stopwatch-panel').style.display = 'block';
    document.getElementById('timer-panel').style.display = 'none';
  }
  
  function openTimer() {
    document.getElementById('stopwatch-panel').style.display = 'none';
    document.getElementById('timer-panel').style.display = 'block';
  }
  
  let stopwatchRunning = false;
  let stopwatchInterval;
  let stopwatchSeconds = 0;
  
  function startStopwatch() {
    stopwatchRunning = !stopwatchRunning;
  
    if (stopwatchRunning) {
      stopwatchInterval = setInterval(updateStopwatch, 1000);
    } else {
      clearInterval(stopwatchInterval);
    }
  }
  
  function updateStopwatch() {
    stopwatchSeconds++;
    const formattedTime = formatTime(stopwatchSeconds);
    document.getElementById('stopwatch-display').textContent = `Stopwatch: ${formattedTime}`;
  }
  
  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchSeconds = 0;
    document.getElementById('stopwatch-display').textContent = 'Stopwatch: 00:00:00';
  }
  
  let timerInterval;
  let timerSeconds;
  
  function startTimer() {
    const hours = parseInt(document.getElementById('timer-hours').value, 10);
    const minutes = parseInt(document.getElementById('timer-minutes').value, 10);
    const seconds = parseInt(document.getElementById('timer-seconds').value, 10);
  
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      alert('Please enter valid numeric values for hours, minutes, and seconds.');
      return;
    }
  
    timerSeconds = hours * 3600 + minutes * 60 + seconds;
  
    function updateTimerDisplay() {
      const formattedTime = formatTime(timerSeconds);
      document.getElementById('timer-display').textContent = formattedTime;
  
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        alert('Timer is complete!');
        resetTimer();
      }
    }
  
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-hours').value = '0';
    document.getElementById('timer-minutes').value = '0';
    document.getElementById('timer-seconds').value = '0';
    document.getElementById('timer-display').textContent = '';
  }
  
  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  