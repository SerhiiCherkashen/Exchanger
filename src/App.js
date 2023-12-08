import logo from "./logo.svg";
import "./App.css";
import mem from "./virus-markt.gif";
import Exchanger from "./component/exchanger";

function App() {
  return (
    <div className="App">
      {/* <img className="mem" src={mem} alt="" />
       */}
      <Exchanger />
    </div>
  );
}

export default App;
