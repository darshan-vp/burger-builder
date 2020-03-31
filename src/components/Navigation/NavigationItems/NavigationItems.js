import { NavLink } from 'react-router-dom';
import React from 'react';
import classes from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>

        <li className={classes.NavigationItem}>
            <NavLink exact to="/" activeClassName={classes.active}>Burger Builder</NavLink>
            <NavLink to="/orders" activeClassName={classes.active} >Orders</NavLink>
        </li>

    </ul>
);

export default navigationItems;