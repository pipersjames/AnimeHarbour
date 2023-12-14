import { Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";
import { ApiSearchPage } from "./components/ApiSearchPage";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          <Route path="/search" element={<ApiSearchPage/>}>
          </Route>
            


        </Routes>

    </div>
  )
}

export default App;
