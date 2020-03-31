import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>

        {/* Drawer toggle is hamburger icon will only be visible in mobile devices as we used css media query to display
        only on mobile devices this component will be rendered on final html but will have no effect in desktop    */}
        <DrawerToggle clicked={props.drawerToggleClicked}/>

        {/* Renders logo */}
        <div className={classes.Logo}>
            <Logo />
        </div>
        {/* Renders Navigation Links of header */}
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);


export default toolbar;