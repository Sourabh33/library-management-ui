import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card, CardBody, Col, Container, Row, Button,
    Form, FormGroup, Label, Input, Table
} from 'reactstrap';
import AppNavbar from './AppNavbar';

class BuyerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [this.cart1, this.cart2],
            isLoading: false,
            modal: false,
            cardNumber: '',
            cardName: '',
            expiryDate: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.clear = this.clear.bind(this);
    }

    clear = (e) => {
        e.preventDefault();
        this.setState({
            cardName: '',
            cardNumber: '', expiryDate: ''
        });
    }

    handleSubmission = (e) => {
        e.preventDefault();
        console.log('e', e);
        console.log('cardNumber: ', this.state.cardNumber);
        console.log('cardName: ', this.state.cardName);
        console.log('expiryDate: ', this.state.expiryDate);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { isLoading, cardNumber, cardName, expiryDate } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <AppNavbar />
                <div className="d-inline-block">
                    <h1 style={{ paddingLeft: '400px', color: "#9933CC", textAlign: "center" }}>Thankyou for shopping</h1>
                </div>
                <div>
                    <Row>
                        <Col>
                            <Container>
                                <Card>
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmission}>
                                            <FormGroup>
                                                <Label for="cardNumber">Card Number:</Label>
                                                <Input type="text" name="cardNumber" id="cardNumber"
                                                    placeholder="12345678910" value={cardNumber} onChange={this.handleChange} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="nameOnCard">Name:</Label>
                                                <Input type="text" name="cardName" id="nameOnCard"
                                                    placeholder="Name" value={cardName} onChange={this.handleChange} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="expiryDate">Expiry Date:</Label>
                                                <Input type="text" name="expiryDate" id="expiryDate"
                                                    placeholder="MM/YY" value={expiryDate} onChange={this.handleChange} />
                                            </FormGroup>
                                            <Button color="primary" style={{ marginRight: '10px' }}>Buy</Button>
                                            <Button color="secondary" onClick={this.clear}>Cancel</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Container>
                        </Col>
                        <Col>
                            <Container>
                                <Card>
                                    <CardBody>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <th>Bill</th>
                                                    <th>22.01 $</th>
                                                </tr>
                                                <tr>
                                                    <th>Discount</th>
                                                    <th>.02 $</th>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <th>21.99 $</th>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Container>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}

export default withRouter(BuyerPage);