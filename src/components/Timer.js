import "./Timer.css";

export const Timer = ({ elapsedTime }) => {
  return (
    <div className='timer-wrapper'>
      <div
        className='time-elapsed'
        style={{ width: `${(elapsedTime / 10) * 100}%` }}
      ></div>
      <div
        className='time-left'
        style={{ width: `${((10 - elapsedTime) / 10) * 100}%` }}
      ></div>
    </div>
  );
};
