import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredient = Object.keys( props.ingredients )
    .map( igKey => {
        // props.ingredients[igKey] will be values 2,3,1 depending upon values we entered in ingredients prop
        // Now we are creating array with "undefined" elements but whose length will be same as ingredients value
        // i.e salad array will be like  ['undefined'] and bacon array like ['undefined','undefined']
        // now we are looping these new arrays to return dynamic burgerBulider components with its type .
        // this is simillar to 2 nested foreach loops

        return [...Array(props.ingredients[igKey])].map( (value , key) => {
            return <BurgerIngredient key={igKey + key} type={igKey} />
        });

    } ).
    reduce( (arr, el) => {
        return arr.concat(el);
    }, []);

    // If length of dynamically generated ingredients = 0 then show message
    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* here we passing variable which containes dynamically genereated burgerIngredient component instead of
             statically placing burgerIngredient */}
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
export default burger;