import blockDropSound from "./assets/sounds/block-drop.mp3";

function App() {
  const playSound = () => {
    const audio = new Audio(blockDropSound);
    audio.play();
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={playSound}>Play Sound</button>
    </div>
  );
}

export default App;
