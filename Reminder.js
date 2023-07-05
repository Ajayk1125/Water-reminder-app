import React, { useState, useEffect } from 'react';
import './App.css';

const Reminder = () => {
  const [intervalValue, setIntervalValue] = useState(30); // Default interval of 30 minutes
  const [reminderInterval, setReminderInterval] = useState(null);
  const [totalGlasses, setTotalGlasses] = useState(0);
  const [hydrationLevel, setHydrationLevel] = useState(0);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  const startReminder = () => {
    if (intervalValue > 0) {
      setReminderInterval(setInterval(showNotification, intervalValue * 60 * 1000));
    }
  };

  const stopReminder = () => {
    clearInterval(reminderInterval);
    setReminderInterval(null);
  };

  const showNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Drink Water', {
        body: 'Stay hydrated! Take a sip of water.',
      });
      setTotalGlasses((prevTotal) => prevTotal + 1);
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      requestNotificationPermission();
    } else {
      alert('Browser does not support notifications');
    }
  };

  useEffect(() => {
    setHydrationLevel(Math.floor((totalGlasses / 8) * 100));
  }, [totalGlasses]);

  return (
    <div className="container">
      <h1>Drink Water Reminder</h1>
      <label htmlFor="interval">Enter Time Interval (minutes):</label>
      <input
        type="number"
        id="interval"
        value={intervalValue}
        onChange={(e) => setIntervalValue(e.target.value)}
        placeholder="Enter minutes"
      />
      <button onClick={startReminder}>Start Reminder</button>
      <button onClick={stopReminder} disabled={!reminderInterval}>
        Stop Reminder
      </button>
      <div className="progress-bar">
        <div style={{ width: `${hydrationLevel}%` }}></div>
      </div>
      <p>Total Glasses of Water Consumed: {totalGlasses}</p>
    </div>
  );
};

export default Reminder;
