import toad from "./assets/toad.png";
import style from "./App.module.scss";

function App() {
  return (
    <div className="flex-center">
      <div className={`${style.hypnoContainer} flex-center`}>
        <div className={style.circles} />
        <div className={`${style.toadContainer} flex-center`}>
          <img src={toad} alt="Toad image" />
          <div className={style.leftEye}>
            <div className={style.pupil} />
          </div>
          <div className={style.rightEye}>
            <div className={style.pupil} />
          </div>
          <button
            className={style.btn}
            onClick={() => window.open("https://github.com/tjllis", "_blank")}
          >
            Hire me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
