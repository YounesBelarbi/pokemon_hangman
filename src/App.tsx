import { useEffect, useState } from "react";
import Alphabet from "./components/Alphabet";
import HangmanDrawing from "./components/HangmanDrawing";
import MaskedWord from "./components/MaskedWord";
import Modal from "./components/modal/Modal";
import Timer from "./components/Timer";
import { usePokemonContextApi } from "./hook/usePokemonApi";
import Header from "./layout/Header";

// !IIIIIImportant a corriger le problème du double lettre, exemple dracauffeu
//!lorsque la modal est ouverte tous le reste est desactiver
function App() {
  const [modalMessage, setModalMessage] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [correctLetter, setCorrectLetter] = useState<string[]>([]); //utilisé par Alphabet + MaskedWord
  const [wrongAttempts, setWrongAttempts] = useState(0); //utilisé par Alphabet + HangDrawing
  const [gameOver, setGameOver] = useState<
    "timeFinished" | "tooManyWrongAnswers" | "gameWon" | null
  >(null);
  const { isError, isLoading, pokemon, setPokemon } = usePokemonContextApi();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // useEffect(() => {
  //   if (gameOver) {
  //     setWrongAttempts(0);
  //     setCorrectLetter([]);
  //     setPokemon(null);
  //   }
  // }, [gameOver, setWrongAttempts, setCorrectLetter, setPokemon]);

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
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-1">
        <div className="container h-full mx-auto p-8">
          <div className="grid h-full grid-cols-4 gap-10  lg:grid-cols-12 overflow-auto">
            <div className="col-span-4  lg:col-span-4  ">
              <div className="h-1/2 overflow-hidden rounded border border-slate-200">
                <HangmanDrawing wrongAttempts={wrongAttempts} />
              </div>
              <div className="flex flex-col  h-1/2">
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
            <div className="p-4 col-span-4 sm:col-span-2 lg:col-span-8 rounded bg-white shadow">
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
    </div>
  );
}

export default App;
