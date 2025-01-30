import { useEffect, useState } from "react";

const Timer = ({
  handleTimeFinished,
  isGameOver,
  isGameWon,
}: {
  handleTimeFinished: () => void;
  isGameOver: boolean;
  isGameWon: boolean;
}) => {
  const initialseconde = 1200;
  const [seconde, setSeconde] = useState(initialseconde);
  // const [minute, setMinute] = useState(1);
  const [timeFinished, setTimeFinished] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (seconde === 0) {
      setTimeFinished(true);
      return;
    }

    if (seconde < 0) {
      // setMinute((minute: number) => minute - 1);
      setSeconde(59);
    }
  }, [seconde]);

  useEffect(() => {
    if (timeFinished) {
      handleTimeFinished();
      return;
    }
    const intervalseconde = setInterval(() => {
      setSeconde((seconde: number) => seconde - 1);
    }, 1000);

    return () => {
      clearInterval(intervalseconde);
    };
  }, [timeFinished, handleTimeFinished]);

  const progress = (seconde / initialseconde) * 100;

  return (
    <div className="">
      {timeFinished || isGameOver ? (
        <span>Temps écoulé !</span>
      ) : isGameWon ? (
        <span>Bravo!</span>
      ) : (
        <div className="flex justify-between items-center h-16 px-4 bg-gray-100">
          <div className="w-56 border border-gray-300">
            <div
              className={`h-5 ${progress > 20 ? "bg-blue-500" : "bg-red-500"}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div>{formatTime(seconde)}</div>
        </div>
      )}
    </div>
  );
};

export default Timer;
