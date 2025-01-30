import { useEffect, useState } from "react";
import Alphabet from "./components/Alphabet";
import HangmanDrawing from "./components/HangmanDrawing";
import MaskedWord from "./components/MaskedWord";
import Modal from "./components/Modal";
import Timer from "./components/Timer";
import { usePokemonContextApi } from "./hook/usePokemonApi";
import Header from "./layout/Header";

// IIIIIImportant a corriger le problème du double lettre, exemple dracauffeu
// interface Pokemon {
//   name: string;
//   image: string;
// }

function App() {
  // const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  // const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const [correctLetter, setCorrectLetter] = useState<string[]>([]); //utilisé par Alphabet + MaskedWord
  const [wrongAttempts, setWrongAttempts] = useState(0); //utilisé par Alphabet + HangDrawing
  //const [pokemon, setPokemon] = useState<Pokemon | null>(null); //utilisé par Alphabet + MaskedWord
  const [gameOver, setGameOver] = useState(false); //utilisé par Alphabet + Timer
  const [isGameWon, setIsGameWon] = useState(false); //utilisé par Alphabet + Timer

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // const fetchPokemon = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://pokebuildapi.fr/api/v1/pokemon/limit/100"
  //     );
  //     const data = await response.json();
  //     setPokemonList(data);
  //   } catch (error) {
  //     console.error("Error fetching Pokemon data:", error);
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Fetch Pokemon data from API
  // useEffect(() => {
  //   fetchPokemon();
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("test");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const { pokemon, isError, isLoading, setPokemon, setPokemonList } =
    usePokemonContextApi();

  console.log(pokemon);
  // // Select a random Pokemon when the list is loaded
  // useEffect(() => {
  //   if (pokemonList.length > 0 && !pokemon) {
  //     const randomIndex = Math.floor(Math.random() * pokemonList.length);
  //     const selectedPokemon = { ...pokemonList[randomIndex] };
  //     selectedPokemon.name = selectedPokemon.name
  //       .toUpperCase()
  //       .normalize("NFD")
  //       .replace(/[̀-ͯ]/g, "");
  //     setPokemon(selectedPokemon);
  //     setPokemonList((prevList) =>
  //       prevList.filter((_, index) => index !== randomIndex)
  //     );
  //   }
  // }, [pokemonList, pokemon]);

  const handleTimeFinished = () => {
    setModalMessage("Le temps est écoulé !");
    setGameOver(true);
    openModal();
  };

  if (isLoading) return <p>Pokemon en cours de chargement...</p>;
  if (isError) return <p>Une erreur s'est produite.</p>;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <button onClick={() => setPokemon(null)}>deletePokemon</button>
      <button onClick={() => setPokemonList([])}>refreshList</button>
      <div className="flex-1">
        <div className="container h-full mx-auto p-8">
          <div className="grid h-full grid-cols-4 gap-8 md:grid-cols-4 lg:grid-cols-12">
            <div className="col-span-2  lg:col-span-4  ">
              <div className="h-1/2 overflow-hidden rounded border border-slate-200">
                <HangmanDrawing wrongAttempts={wrongAttempts} />
              </div>
              <div className="flex flex-col  h-1/2">
                <Alphabet
                  setCorrectLetter={setCorrectLetter}
                  setWrongAttempts={setWrongAttempts}
                  openModal={openModal}
                  setModalMessage={setModalMessage}
                  setGameOver={setGameOver}
                  setIsGameWon={setIsGameWon}
                  pokemon={pokemon}
                />
              </div>
            </div>
            <div className="p-4 col-span-4 lg:col-span-8 rounded bg-white shadow">
              <Timer
                isGameWon={isGameWon}
                isGameOver={gameOver}
                handleTimeFinished={handleTimeFinished}
              />
              <div className="flex justify-center py-6 h-full xl:items-center">
                <MaskedWord correctLetter={correctLetter} pokemon={pokemon} />
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
      />
    </div>
  );
}

export default App;
