import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import MainPage from './Component/home';
import Calculator6 from './Component/calculator/calculator6';
import WeatherApp from './Component/WeatherApp/WeatherApp';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
    <Routes>
      
      <Route path ="/" element={<MainPage/>}/>
      <Route path="/Calculator"element={<Calculator6 />} />
      <Route path="/Weatherapp"element={<WeatherApp />} />
         
    </Routes>

    </div>
    </BrowserRouter>
  ); 
}

export default App;
