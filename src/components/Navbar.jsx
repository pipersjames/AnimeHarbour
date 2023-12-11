import { NavLink } from "react-router-dom";

export default function Navbar () {

    return (
        <nav className="navigation">
            <h3 className="AppName">AnimeHarbour</h3>
            <ul>
                
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/trending">Trending</NavLink>
                </li>
                <li>
                    <NavLink to="/recent-updates">Recent Updates</NavLink>
                </li>
                <li>
                    <NavLink to="/search">Search</NavLink>
                </li>
                <li>
                    <NavLink to="/favourites">Favourites</NavLink>
                </li>
            </ul>
        </nav>
    )
}