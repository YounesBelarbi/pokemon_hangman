type HangmanDrawingProps = {
  wrongAttempts: number;
};

const HangmanDrawing = ({ wrongAttempts }: HangmanDrawingProps) => {
  const parts = [
    <line key="base" x1="10" y1="90" x2="90" y2="90" />,
    <line key="pole" x1="50" y1="90" x2="50" y2="10" />,
    <line key="top" x1="50" y1="10" x2="70" y2="10" />,
    <line key="rope" x1="70" y1="10" x2="70" y2="20" />,
    <circle key="head" cx="70" cy="30" r="10" />,
    <line key="body" x1="70" y1="40" x2="70" y2="60" />,
    <line key="left-arm" x1="70" y1="50" x2="60" y2="40" />,
    <line key="right-arm" x1="70" y1="50" x2="80" y2="40" />,
    <line key="left-leg" x1="70" y1="60" x2="60" y2="70" />,
    <line key="right-leg" x1="70" y1="60" x2="80" y2="70" />,
  ];

  {
    console.log(parts.slice(0, wrongAttempts));
  }
  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        width: "100%",
        height: "100%",
        stroke: "black",
        strokeWidth: "2",
        fill: "none",
        strokeLinecap: "round",
      }}
    >
      {parts.slice(0, wrongAttempts)}
    </svg>
  );
};

export default HangmanDrawing;
