// import Canvas from "./components/CanvasOld";
import P5Canvas from "./components/P5Canvas";

function App() {
  return (
    <div className="w-screen h-screen bg-[url('https://thumbs.dreamstime.com/b/video-games-outline-pattern-vector-game-seamless-background-video-games-outline-pattern-vector-game-concept-seamless-background-159043550.jpg')] bg-center">
      <div className="w-full h-full bg-primary/80 overflow-scroll">
        <div className="py-6 flex items-center justify-center">
          <div className="grid grid-cols-11 gap-6">
            <div className="col-span-3 w-full h-full bg-white rounded-lg"></div>
            <div className="col-span-8 flex flex-col items-center gap-6">
              <div className="w-full h-80 bg-white rounded-lg">
                {/* <Canvas width={800} height={500} /> */}
                <P5Canvas />
              </div>
              <div className="bg-white rounded-lg w-full h-52"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
