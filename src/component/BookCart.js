import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Button, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import * as URLConstants from './Constants';

class BookCart extends Component {
    cart1 = {
        id: 1,
        name: 'book name',
        quantity: '1',
        price: '20.01'
    }
    cart2 = {
        id: 2,
        name: 'book name',
        quantity: '1',
        price: '22.11'
    }

    constructor(props) {
        super(props);
        this.state = {
            carts: [this.cart1, this.cart2],
            isLoading: true,
            modal: false
        };
        // this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(URLConstants.aggregateUrl + '/cart/details',)
            .then(response => response.json())
            .then(data => this.setState({ carts: data, isLoading: false }))
            .catch(() => this.props.history.push('/'));
    }

    

    render() {
        const { carts, isLoading, modal } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const cartdetails = carts.map(cart => {
            return <tr key={cart.id}>
                <td>
                    {cart.name}
                </td>
                <td>{cart.quantity}</td>
                <td>{cart.price}</td>
            </tr>;
        })


        const total = carts.reduce((a, cart) => parseFloat(a) + parseFloat(cart.price), 0).toFixed(3);

        return (
            <div>
                <AppNavbar />
                <div>
                    <div className="d-inline-block float-left">
                        <Button style={{ marginTop: '10px', marginLeft: '10px' }} color="info" tag={Link} to={"/books"}>Back to shopping</Button>
                    </div>
                    <div className="d-inline-block">
                        <h1 style={{ paddingLeft: '310px', textAlign: "center", color: "Green" }}>Welcome To Cart</h1>
                    </div>
                    <div className="d-inline-block float-right">
                        <Button style={{ marginTop: '10px', marginRight: '10px' }} color="info" tag={Link} to={"/buy"}>Proceed to buying</Button>
                    </div>
                </div>
                <Container body outline color='blue'>
                    <Table hover className='mt-4'>
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td>Quantity</td>
                                <td>Price (in $)</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cartdetails}
                        </tbody>
                        <tfoot>
                            <td>
                            </td>
                            <td>TOTAL</td>
                            <td>
                                {total}
                            </td>
                        </tfoot>
                    </Table>
                </Container>
            </div>
        );
    }

}

export default withRouter(BookCart);