import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Burger/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Burger/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// Initial ingredients prices constant
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon:0.7
};

/* This component will render burger and its build controls using which we can add remove
ingredients. This will also load order summary modal */
class BurgerBuilder extends Component {

    // Intial burger builder state
    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading:false,
        error: null
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    // Helper function to calculate sum of ingredients in burger
    // and to identify if burger is purchasable or not
    updatePurchaseStaet (updatedIngredients) {

        const sum =
        // Get keys from object e.g [salad, cheese]
        Object.keys(updatedIngredients)
        // Loop each element of array
        .map(igKey => {
            // This will return value of key e.g updatedIngredients['salad']
            return updatedIngredients[igKey];
        })
        // So at this point sum array will be like i.e [2,4,5]
        .reduce((sum, el) => {
            // Now calculate sum of all elements of array
            return sum + el;
        },0);


        // Set purchase to true if sum is greter than 0 means there are ingredients in burger
        this.setState({
            purchasable: sum > 0
        });
    }

    /* Called when clicked on more button to add more ingredient */
    addIngredientHandler = (type) => {

        // How many no of particular ingredient is there. e.g Salad: 1, Cheese: 2
        // Type is type of ingredient
        const oldCount = this.state.ingredients[type];
        // Add 1 to old count
        const updatedCount = oldCount + 1;
        // Copy ingredients state to variable to be used later in setState (Immutability)
        const updatedIngredients =  {
            ...this.state.ingredients
        }
        updatedIngredients[type]  = updatedCount;

        // Get price of added ingredient in variable
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        // Add new added ingredient's price in total price of burger
        const newPrice = oldPrice + priceAddition;
        // Set state with new price and updated ingredients
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseStaet(updatedIngredients);
    }

    // THis is called when clicked on less button.
    // this is same as addIngredientHandler but here we deduct ingredient price from total price
    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        // If there are already 0 ingredient of type then no need to follow below process
        // i.e salad: 0 then no need to deduct from total price
        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients =  {
            ...this.state.ingredients
        }
        updatedIngredients[type]  = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseStaet(updatedIngredients);
    }

    /* Set purchasing to false when clicked on Cancel button of  order summary modal */
    purchaseCancelledHandler = () => {
        this.setState({purchasing:false});
    }

    /*Called when clicked on continue button of modal*/
    purchaseContinueHandler = () => {

        let queryParams = [];

        // Push what ingredients added and in what quantity in array
        for (let i in this.state.ingredients) {
            // Url encode as we will pass this in query string
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        // Push price in query params
        queryParams.push('price='+this.state.totalPrice);
        // Join array to make valid query string from array elements
        // e.g Salad=1&cheese=2
        queryParams = queryParams.join('&');

        // Redirect to checkout Url with query string
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams
        });
    }

    componentDidMount () {
        // Get initial burger ingredients from firebase using ajax request
        axios.get('https://burger-builder-b0270.firebaseio.com/ingredients.json')
        .then(response => {
            // set ingredient state with new values returned from firebase db
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            // IF error occurs then set error = true
            this.setState({error: true});
        });
    }

    render () {

        // copy ingredients items in another variable
        const disabledInfo = {
            ...this.state.ingredients
        };

        // Loop and set value of ingredient to true or false to determine if that ingredient
        // button should be disabled or not
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        // If there is error then load error message otherwise load display spinner
        let burger = this.state.error ? <p>Ingredients can't be loaded. </p> : <Spinner />
        // If there are ingredients then we will load burger
        if (this.state.ingredients) {

            burger = (
                <Aux>
                    {/* Will render burger UI */}
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo} />
                </Aux>
            );

            /* Modal that will display order details with cancel and continue buttons
            This modal will open when clicked on Order Now button
            */
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelledHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            />;
        }

        // Show spinner when loading is true
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
// Custom hoc for error handler
export default withErrorHandler(BurgerBuilder, axios);