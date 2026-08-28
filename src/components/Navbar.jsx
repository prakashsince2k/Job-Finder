import React, { useContext } from 'react'
import FavoriteContext from '../context/FavoriteContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const { favorites } = useContext(FavoriteContext)

    return (
        <nav className="navbar">

            <div className="navbar-content">

                <h1 className="logo">
                    Job Finder
                </h1>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/favorites">
                        Saved Jobs ({favorites.length})
                    </Link>

                </div>

            </div>

        </nav>
    )
}

export default Navbar