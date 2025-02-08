import { createContext, useContext, useEffect, useState } from "react";

export interface Pokemon {
  name: string;
  image: string;
}

interface PokemonApiContextType {
  // context: any;
  // setContext: React.Dispatch<React.SetStateAction<any>>;
  pokemon: Pokemon | null;
  pokemonList: Pokemon[];
  isError: boolean;
  isLoading: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  setPokemonList: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const PokemonApiContext = createContext<PokemonApiContextType>({
  // context: {},
  // setContext: () => {},
  pokemonList: [],
  isError: false,
  isLoading: false,
  setPokemon: () => {},
  setPokemonList: () => {},
  pokemon: null,
});

// const getRefreshContext = () => {
//   if (localStorage.getItem("pokemonApi") === null) {
//     localStorage.setItem("pokemonApi", JSON.stringify({}));
//   }
// };

export const usePokemonContextApi = () => {
  const {
    // context,
    // setContext,
    pokemon,
    pokemonList,
    isError,
    isLoading,
    setPokemon,
    setPokemonList,
  } = useContext(PokemonApiContext);

  return {
    // context,
    // setContext: (obj: PokemonApiContextType) => {
    //   setContext({ ...context, ...obj });
    // },
    // resetContext: () => {
    //   localStorage.removeItem("context");
    //   setContext(getRefreshContext());
    // },
    pokemon,
    pokemonList,
    isError,
    isLoading,
    setPokemon,
    setPokemonList,
  };
};

export const PokemonApiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [context, setContext] = useState(getRefreshContext());
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemon = async () => {
    setIsLoading(true);

    try {
      // const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
      const response = await fetch(
        "https://pokebuildapi.fr/api/v1/pokemon/limit/400"
      );
      const data = await response.json();
      setPokemonList(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Pokemon data from API
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Select a random Pokemon when the list is loaded
  useEffect(() => {
    if (pokemonList.length > 0 && !pokemon) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const selectedPokemon = { ...pokemonList[randomIndex] };
      selectedPokemon.name = selectedPokemon.name
        .toUpperCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
      setPokemon(selectedPokemon);
      setPokemonList((prevList) =>
        prevList.filter((_, index) => index !== randomIndex)
      );
    }
  }, [pokemonList, pokemon]);

  return (
    <PokemonApiContext.Provider
      value={{
        // context,
        // setContext,
        pokemon,
        pokemonList,
        isError,
        isLoading,
        setPokemon,
        setPokemonList,
      }}
    >
      {children}
    </PokemonApiContext.Provider>
  );
};
