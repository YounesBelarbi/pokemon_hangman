import { useCallback } from "react";
import { usePokemonContextApi } from "../hook/usePokemonApi";

interface MaskedWordInterface {
  correctLetter: string[];
}

const MaskedWord = ({ correctLetter }: MaskedWordInterface) => {
  const { pokemon } = usePokemonContextApi();

  const getMaskedWord = useCallback(() => {
    if (pokemon) {
      return pokemon.name
        .split("")
        .map((letter: string) =>
          correctLetter?.includes(letter) ? letter : "_"
        )
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
