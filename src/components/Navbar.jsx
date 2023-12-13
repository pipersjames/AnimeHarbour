import { NavLink } from "react-router-dom";
import magnifyingGlassImage from "../assets/magnifying-glass.png"

export default function Navbar () {

    return (
        <nav className="Navigation">
            <div className="AppNameContainer">
                <NavLink className="AppName" id="HomeNavigation" to="/">AnimeHarbour</NavLink>
            </div>
            <div className="NavOptionsContainer">
                <ul className="NavOptions">
                    
                    <li>
                        
                    </li>
                    <li>
                        <NavLink to="/trending">Trending</NavLink>
                    </li>
                    <li>
                        <NavLink to="/recent-updates">Recent Updates</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/favourites">Favourites</NavLink>
                    </li>
                </ul>
            </div>
            <div className="EyeGlassContainer">
                <NavLink to="/search"><img id="EyeGlass" src={magnifyingGlassImage} alt="Search" /></NavLink>
            </div> 
        </nav>
    )
}