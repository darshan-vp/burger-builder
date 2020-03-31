import React from 'react';
import classes from './DrawerToggle.module.css';

// This hanburger icon only visible to mobile devices

const drawerToggle = (props) => {
    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;