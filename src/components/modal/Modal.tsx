import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { usePokemonContextApi } from "../../hook/UsePokemonApi";
import Button from "./Button";

interface ModalProps {
  isShowing: boolean;
  setIsShowing: (value: boolean) => void;
  message: { title: string; message: string };
  // setGameOver: React.Dispatch<
  //   React.SetStateAction<
  //     "timeFinished" | "tooManyWrongAnswers" | "gameWon" | null
  //   >
  // >;
}

export default function ModalIconActionButtons({
  isShowing,
  setIsShowing,
  message,
}: // setGameOver,
ModalProps) {
  const pokemon = usePokemonContextApi().pokemon;
  const focusRef = useRef<HTMLButtonElement>(null);
  //pour permettre de fermer le modal en cliquant en dehors
  // const wrapperRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       wrapperRef.current &&
  //       !wrapperRef.current.contains(event.target as Node)
  //     ) {
  //       setIsShowing(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [wrapperRef, setIsShowing]);

  useEffect(() => {
    focusRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!["Tab", "Enter", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
      }
    };

    if (isShowing) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isShowing]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log((event.target as HTMLButtonElement).innerText);
    setIsShowing(false);
  };

  return (
    <>
      {isShowing &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div
              // ref={wrapperRef}
              className="bg-white rounded-md shadow-lg p-6 flex flex-col justify-between max-w-lg w-full sm:w-[90%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-4 text-center">
                <h1 className="text-3xl font-semibold">{message.title}</h1>
                <p>{message.message}</p>
                <p>
                  {message.title === "Perdu"
                    ? "La réponse était:"
                    : "C'est bien"}{" "}
                  {pokemon?.name}
                </p>
              </div>
              <div className="flex justify-center items-center h-52 sm:h-60 md:h-72 border border-slate-200 mx  my-5">
                <img
                  src={pokemon?.image}
                  alt={pokemon?.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  ref={focusRef}
                  handleClick={(e) => handleButtonClick(e)}
                  text="Oui"
                />
                <Button handleClick={(e) => handleButtonClick(e)} text="Non" />
              </div>
            </div>
          </div>,
          document.getElementById("modal") as HTMLElement
        )}
    </>
  );
}
