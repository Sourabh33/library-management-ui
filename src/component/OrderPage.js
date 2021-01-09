import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import { Container, Button, Table, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import * as URLConstants from './Constants';

class OrderPage extends Component {
    order1 = {
        id: '1',
        orderName: 'book name',
        status: 'Delivered'
    }
    order2 = {
        id: '2',
        orderName: 'book name',
        status: 'On the way'
    }
    constructor(props) {
        super(props);
        this.state = { orders: [this.order1, this.order2], isLoading: false, modal: false, orderId: 0};
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(URLConstants.aggregateUrl + '/order/details',)
            .then(response => response.json())
            .then(data => this.setState({ orders: data, isLoading: false }))
            .catch(() => this.props.history.push('/'));
    }

    toggle = (orderId) => {
        this.setState({modal: !this.state.modal, orderId: orderId}); 
    };

    render() {
        const { orders, isLoading, modal, orderId } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        console.log('orders:', orders[0]);
        const order = orders.filter(order => order.id === orderId);
        console.log('order:', order);
        const status = order.length > 0 ? order[0].status : 'Not available';
        console.log('status:', status);
        const orderDetails = orders.map(order => {
            console.log('order:', order);
            return <tr key={order.id}>
                <td>
                    {order.orderName}
                </td>
                <td>{order.status}</td>
                <td>
                    <Button color="info" onClick={() => this.toggle(order.id)}>Details</Button>
                </td>
            </tr>;
        })
        console.log('orderDetails:', orderDetails);
        return (
            <div>
                <AppNavbar />
                <div>
                    <div className="d-inline-block float-left">
                        <Button style={{ marginTop: '10px', marginLeft: '10px' }} color="info" tag={Link} to={"/books"}>Back to shopping</Button>
                    </div>
                    <div className="d-inline-block">
                        <h1 style={{ paddingLeft: '250px', color: "#ff6f00", textAlign: "center" }}>Here are your order list</h1>
                    </div>
                </div>
                <Container body outline color='blue'>
                    <Table hover className='mt-4'>
                        <thead>
                            <tr>
                                <td>Item</td>
                                <td>status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails}
                        </tbody>

                    </Table>
                </Container>
                <Modal isOpen={modal} toggle={this.toggle} className="add-cart">
                    <ModalHeader>Order detail</ModalHeader>
                    <ModalBody>
                        Order status = {status}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Okay</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default withRouter(OrderPage);