import React, {Component} from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/Burger/UI/Modal/Modal';

const withErrorHandler = (WrappedContent, axios) => {

    return class extends Component  {

        state = {
            error: null
        }

        componentWillMount () {
            // Create axios request and response interceptors
            // These will intercepts every axios ajax request and response
            // and will set state error if there are any errors
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // Release memory of intercepor when component unmounts
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render () {
            return (
                <Aux>
                    {/* If there is error then it will be displayed in modal  */}
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    {/* This will render components that are wrapped in this hoc with all props */}
                    <WrappedContent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;