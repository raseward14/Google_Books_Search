import React, { useState, useContext } from 'react';
import { stack as Menu } from 'react-burger-menu';
import NavBar from '../Navbar/nav';

// new context
const MyContext = React.createContext();

// new provider
const MyProvider = (props) => {
    const [menuOpenState, setMenuOpenState] = useState(false)
    return (
        <MyContext.Provider value={{
            isMenuOpen: menuOpenState,
            toggleMenu: () => setMenuOpenState(!menuOpenState),
            stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen)
        }
        }>
        {props.children}    
        </MyContext.Provider>
    );
};

// button that calls a context function to set a new open state when clicked
const Button = () => {
    const ctx = useContext(MyContext)
    return (
        <button onClick={ctx.toggleMenu}>Toggle menu</button>
    );
};

// navigation component that wraps the burger menu
const Navigation = () => {
    const ctx = useContext(MyContext)
    return (
        <Menu
        customBurgerIcon={false}
        isOpen={ctx.isMenuOpen}
        onStateChange={(state) => ctx.stateChangeHandler(state)} />
    );
};

// default export
const ReactBurger = () => {
    return (
        <MyProvider>
            <div>
                <Button />
                <Navigation />
            </div>
        </MyProvider>
    );
};

export default ReactBurger;