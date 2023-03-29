import React, { useState, useContext } from 'react';
import { stack as Menu } from 'react-burger-menu';
import NavBar from '../Navbar/nav';
import Hamburger from 'hamburger-react';
import './style.css'

// make a new context
const MyContext = React.createContext();

// create the provider
const MyProvider = (props) => {
    const [menuOpenState, setMenuOpenState] = useState(false)

    return (
        <MyContext.Provider value={{
            isMenuOpen: menuOpenState,
            toggleMenu: () => setMenuOpenState(!menuOpenState),
            stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen)
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

// create a button that calls a context function to set a new open state when clicked
const Button = () => {
    const ctx = useContext(MyContext)
    const [isOpen, setOpen] = useState(false)
    return (
        <div>
            <p onClick={ctx.toggleMenu}><Hamburger className='bm-burger-bars' toggled={isOpen} toggle={setOpen}  /></p>
        </div>
    );
    
}

// create a navigation component that wraps the burger menu
const Navigation = () => {
    const ctx = useContext(MyContext)

    return (
        <Menu
            customBurgerIcon={false}
            isOpen={ctx.isMenuOpen}
            onStateChange={(state) => ctx.stateChangeHandler(state)}>
            <NavBar />
        </Menu>

    )
}

// default export here
const App = () => {
    return (
        <MyProvider>
            <div>
                <Button />
                <Navigation />
            </div>
        </MyProvider>
    )
}

export default App;