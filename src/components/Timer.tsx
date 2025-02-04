import { useEffect, useState } from "react";

interface TimerProps {
  gameOver: "timeFinished" | "tooManyWrongAnswers" | "gameWon" | null;
  setModalMessage: React.Dispatch<
    React.SetStateAction<{ title: string; message: string }>
  >;
  openModal: () => void;
  setGameOver: React.Dispatch<
    React.SetStateAction<
      "timeFinished" | "tooManyWrongAnswers" | "gameWon" | null
    >
  >;
}

const Timer = ({
  gameOver,
  setModalMessage,
  openModal,
  setGameOver,
}: TimerProps) => {
  const initialseconde = 1200;
  const [seconde, setSeconde] = useState(initialseconde);
  const isTimeFinished = seconde === 0;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isTimeFinished) {
      setModalMessage({ title: "Perdu", message: "Le temps est écoulé !" });
      setGameOver("timeFinished");
      openModal();
      return;
    }
    const intervalseconde = setInterval(() => {
      setSeconde((seconde: number) => seconde - 1);
    }, 1000);

    return () => {
      clearInterval(intervalseconde);
    };
  }, [setModalMessage, openModal, setGameOver, isTimeFinished]);

  const progress = (seconde / initialseconde) * 100;

  return (
    <div className="">
      {isTimeFinished || gameOver === "timeFinished" ? (
        <span>Temps écoulé !</span>
      ) : gameOver === "gameWon" ? (
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
