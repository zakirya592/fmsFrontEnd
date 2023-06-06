import logo from './logo.svg';
import './App.css';
import Pagerounter from './Component/AllRounter/Pagerounter';
import axios from "axios";

axios.defaults.baseURL = "http://gs1ksa.org:3021";
function App() {
  return (
    <div className="App">
      < Pagerounter/>
    </div>
  );
}

export default App;
