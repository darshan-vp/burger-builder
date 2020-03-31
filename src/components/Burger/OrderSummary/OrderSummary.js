import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

/* Component to display order summary in Modal */
class OrderSummary extends Component{

    componentWillUpdate () {
        console.log('Order summray will update');
    }

    render () {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>Ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <strong>Total Price: {this.props.price.toFixed(2)}</strong>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;