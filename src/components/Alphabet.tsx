import { useCallback, useEffect, useState } from "react";
import { usePokemonContextApi } from "../hook/usePokemonApi";

interface AlphabetProps {
  setCorrectLetter: React.Dispatch<React.SetStateAction<string[]>>;
  setWrongAttempts: React.Dispatch<React.SetStateAction<number>>;
  openModal: () => void;
  setModalMessage: React.Dispatch<
    React.SetStateAction<{ title: string; message: string }>
  >;
  setGameOver: React.Dispatch<
    React.SetStateAction<
      "timeFinished" | "tooManyWrongAnswers" | "gameWon" | null
    >
  >;
}

const Alphabet = ({
  setCorrectLetter,
  setWrongAttempts,
  openModal,
  setModalMessage,
  setGameOver,
}: AlphabetProps) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const maxAttempts = 10;
  const [alreadyUsedLetters, setAlreadyUsedLetters] = useState<string[]>([]);
  const { pokemon } = usePokemonContextApi();

  const handleWrongAnswer = useCallback(() => {
    setWrongAttempts((prev) => {
      const nextValue = Math.min(prev + 1, maxAttempts);
      if (nextValue === maxAttempts) {
        setModalMessage({
          title: "Perdu",
          message: "Trop de mauvaises réponses !",
        });
        setGameOver("tooManyWrongAnswers");
        openModal();
      }
      return nextValue;
    });
  }, [maxAttempts, openModal, setGameOver, setModalMessage, setWrongAttempts]);

  const handleLetterClick = useCallback(
    (letter: string) => {
      if (alreadyUsedLetters.includes(letter)) return;

      setAlreadyUsedLetters((prev) => [...prev, letter]);
      if (pokemon?.name.includes(letter)) {
        setCorrectLetter((prev) => {
          const updatedCorrectLetters = [...prev, letter];
          const maskedWord = pokemon.name
            .split("")
            .map((letter: string) =>
              updatedCorrectLetters.includes(letter) ? letter : "_"
            )
            .join("");

          if (!maskedWord.includes("_")) {
            setModalMessage({ title: "Bravo", message: "Vous avez gagné !" });
            setGameOver("gameWon");
            openModal();
          }

          return updatedCorrectLetters;
        });
      } else {
        handleWrongAnswer();
      }
    },
    [
      alreadyUsedLetters,
      pokemon,
      handleWrongAnswer,
      openModal,
      setGameOver,
      setModalMessage,
      setCorrectLetter,
    ]
  );

  const handleKeypress = useCallback(
    (event: KeyboardEvent) => {
      const letter = event.key.toUpperCase();
      if (alphabet.includes(letter)) {
        handleLetterClick(letter);
      }
    },
    [handleLetterClick, alphabet]
  );

  useEffect(() => {
    document.addEventListener("keypress", handleKeypress);
    return () => document.removeEventListener("keypress", handleKeypress);
  }, [handleKeypress]);

  return (
    <div className="grid grid-cols-6 gap-2 mt-4">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          disabled={alreadyUsedLetters?.includes(letter)}
          className={`h-10 w-full rounded bg-emerald-500 text-white transition duration-300 hover:bg-emerald-600 focus:outline-none disabled:bg-emerald-100  ${
            alreadyUsedLetters?.includes(letter) ? "text-gray-300" : ""
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Alphabet;
