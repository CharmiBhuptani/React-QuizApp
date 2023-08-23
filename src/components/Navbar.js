import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='navbar'>
            <Link to='/'><img src={require('../assets/svg/home.svg').default} alt='Trivia'></img></Link>
            <img className='logo' src={require('../assets/images/logo.png')} alt='Trivia'></img>
        </nav>
    )
}

export default React.memo(Navbar)
