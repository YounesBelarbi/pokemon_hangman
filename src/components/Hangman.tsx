import { useEffect, useState } from "react";
import { usePokemonContextApi } from "../hook/UsePokemonApi";
import Alphabet from "./Alphabet";
import HangmanDrawing from "./HangmanDrawing";
import MaskedWord from "./MaskedWord";
import Modal from "./modal/Modal";
import Timer from "./Timer";

const Hangman = () => {
  const [modalMessage, setModalMessage] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [correctLetter, setCorrectLetter] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameOver, setGameOver] = useState<
    "timeFinished" | "tooManyWrongAnswers" | "gameWon" | null
  >(null);
  const { isError, isLoading, pokemon, setPokemon } = usePokemonContextApi();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!isModalOpen) {
      setWrongAttempts(0);
      setCorrectLetter([]);
      setPokemon(null);
      setGameOver(null);
    }
  }, [isModalOpen, setWrongAttempts, setCorrectLetter, setPokemon]);

  if (isLoading) return <p>Pokemon en cours de chargement...</p>;
  if (isError) return <p>Une erreur s'est produite.</p>;

  return (
    <>
      <div className="flex-1 min-h-0">
        <div className="container mx-auto p-3 h-full flex flex-col overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Première colonne */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-4 flex flex-col gap-6">
              <div className="w-full overflow-hidden rounded border border-slate-200">
                <HangmanDrawing wrongAttempts={wrongAttempts} />
              </div>
              <div className="w-full">
                <Alphabet
                  key={pokemon ? pokemon.name : "empty"}
                  setCorrectLetter={setCorrectLetter}
                  setWrongAttempts={setWrongAttempts}
                  openModal={openModal}
                  setModalMessage={setModalMessage}
                  setGameOver={setGameOver}
                />
              </div>
            </div>

            {/* Deuxième colonne */}
            <div className="p-4 col-span-1 sm:col-span-1 lg:col-span-8 rounded bg-white shadow">
              {!gameOver && (
                <Timer
                  gameOver={gameOver}
                  setModalMessage={setModalMessage}
                  openModal={openModal}
                  setGameOver={setGameOver}
                />
              )}
              <div className="flex justify-center py-6 h-full xl:items-center">
                <MaskedWord correctLetter={correctLetter} />
                <span>{wrongAttempts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        message={modalMessage}
        isShowing={isModalOpen}
        setIsShowing={closeModal}
        setGameOver={setGameOver}
      />
    </>
  );
};

export default Hangman;
