import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navbar'
import Banner from './Components/banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favorites';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={
          <>
            <Banner/>
            <Movies/>
          </>
        }/>
        <Route path='/favourites' element={<Favourites/>} />
        </Routes>
        
        {/* <Banner/>
        <Movies/>  */}
      </Router>

    </>
  );
}

export default App;
