import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card, Modal, ModalBody, ModalFooter, ModalHeader, Container, CardImg, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';
import AppNavbar from './AppNavbar';
import BooksList from './BooksList';
import * as UrlConstant from './Constants';

class BookPurchase extends Component {
    book = {
        id: 1,
        name: "Head First Java",
        authur: "Kathy Sierra & Bert Bates",
        description: "Learn Java with fun",
        price: "20.0"
    }
    constructor(props) {
        super(props);
        this.state = { books: [this.book], isLoading: false, modal: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log(this.props.match.params.id);

        fetch(UrlConstant.booksUrl + '/' + this.props.match.params.id,)
            .then(response => response.json())
            .then(data => this.setState({ books: [data], isLoading: false }))
            .catch(() => this.props.history.push('/'));
    }

    render() {
        const { books, isLoading, modal } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        const booksBody = books.map(book => {

            return <div><CardTitle>Book: {book.name}</CardTitle>
                <CardSubtitle>Author: {book.author}</CardSubtitle>
                <CardText>Description: {book.description}</CardText>
                <CardText>Price: {book.price} $</CardText>
                <Button color="info" tag={Link} to={"/buy"}>Buy</Button>{' '}
                <Button color="info" onClick={this.toggle}>Add</Button>
            </div>;
        })
        const bookImage = books.map(book => {
            return <img src={book.imgPath} alt="Book 1" />;
        })
        return (
            <div>
                <div><AppNavbar /></div>
                <Container>
                    <div className="float-right">
                        <Button color="warning" tag={Link} to={"/cart"}>Check Cart</Button>
                    </div>
                    <Container>
                        <Row>
                            <Col>
                                {bookImage}
                            </Col>
                            <Col>
                                <Card body outline color="info">
                                    {booksBody}
                                </Card>
                            </Col>
                        </Row>


                    </Container>
                    <br />
                    <h1 style={{ width: "100%", textAlign: "center", color: "Blue" }}>Thank you for visiting</h1>
                </Container>
                <Modal isOpen={modal} toggle={this.toggle} className="add-cart">
                    <ModalHeader>Add carts</ModalHeader>
                    <ModalBody>Book added to cart</ModalBody>
                    <ModalFooter>
                        <Button color="primary" tag={Link} to={"/cart"}>check cart</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(BookPurchase);