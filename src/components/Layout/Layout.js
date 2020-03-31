import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }


    render () {

        return (
            <Aux>
                {/* Renders Navigation Of Header */}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                {/* This will be rendered only in mobile devices. With navigation and menu in it. */}
                <Sidedrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>

                <main className={classes.Content}>
                    {/* All childs of Layout Component will be wrapped by this main tag
                    i.e everything written inside <Layout></Layout> will come here */}
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;