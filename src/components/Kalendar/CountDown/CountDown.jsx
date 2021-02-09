import React, { useEffect, useState } from 'react';

const CountDown = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => getTimeDifference('2021-02-15T07:13:38.729Z'), 1000);
    return () => clearInterval(interval);
  });

  const leadingZero = num => {
    return num < 10 && num > 0 ? '0' + num : num;
  };

  const getTimeDifference = eventDate => {
    const time = Date.parse(eventDate) - Date.parse(new Date());
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    setCountdown({ days, hours, minutes, seconds });
  };

  return (
    <div>
      <div style={{ marginTop: '16px', border: '2px solid black' }}>
        <div>COUNTDOWN</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '8px' }}>
            {leadingZero(countdown.days)} {countdown.days === 1 ? 'day' : 'days'}
          </div>
          <div>
            {leadingZero(CountDown.hours)} {countdown.hours === 1 ? 'hour' : 'hours'}
          </div>
          <div>
            {leadingZero(countdown.minutes)} {countdown.minutes === 1 ? 'minute' : 'minutes'}
          </div>
          <div>
            {leadingZero(countdown.seconds)} {countdown.seconds === 1 ? 'second' : 'seconds'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
