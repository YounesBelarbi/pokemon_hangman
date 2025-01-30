import { useCallback } from "react";

interface Pokemon {
  name: string;
  image: string;
}

interface MaskedWordInterface {
  pokemon: Pokemon | null;
  correctLetter: string[];
}

const MaskedWord = ({ pokemon, correctLetter }: MaskedWordInterface) => {
  console.log(correctLetter);
  // const { pokemon, correctLetter, wrongAttempts } = usePokemonContext();

  const getMaskedWord = useCallback(() => {
    if (pokemon) {
      return pokemon.name
        .split("")
        .map((letter) => (correctLetter?.includes(letter) ? letter : "_"))
        .join("");
    }
    return "";
  }, [pokemon, correctLetter]);

  return (
    <>
      <span className="text-3xl xl:text-6xl tracking-widest">
        {getMaskedWord()}
      </span>
    </>
  );
};

export default MaskedWord;
