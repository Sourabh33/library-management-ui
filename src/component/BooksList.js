import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import * as UrlConstant from './Constants';
import AppNavbar from './AppNavbar';

class BooksList extends Component {
    book = {
        id: 1,
        name: "Head First Design Patterns",
        authur: "Eric Freeman & Ellisabeth Freeman",
        description: "A Brain Friendly Guide",
        price: "20.0"
    }
    constructor(props) {
        super(props);
        this.state = { books: [], isLoading: true, modal: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(UrlConstant.booksUrl + '/books',)
            .then(response => response.json())
            .then(data => this.setState({ books: data, isLoading: false }))
            .catch(() => this.props.history.push('/'));
    }


    render() {
        const { books, isLoading, modal } = this.state;
        if (isLoading && !books) {
            return <p>Loading...</p>;
        }

        const booksBody = books.map(book => {
            return <tr key={book.id}>
                <td>
                    <a href={"/books/" + book.id}>
                        {book.name}
                    </a>
                </td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                <td style={{ padding: '10px' }}>
                    <Button color="primary" onClick={this.toggle}>Add</Button>
                    &nbsp;
                    <Button color="success" tag={Link} to={"/buy"}>Buy</Button>
                </td>
            </tr>;
        })
        return (
            <div>
                <AppNavbar />
                <Container>
                    <div className="float-right">
                        <Button color="warning" tag={Link} to={"/cart"}>Check Cart</Button>
                    </div>
                    <br />
                    <Table hover className="mt-4">
                        <thead>
                            <tr>
                                <td>Book</td>
                                <td>Author</td>
                                <td>description</td>
                                <td>Price (in $)</td>
                                <td>Check out</td>
                            </tr>
                        </thead>
                        <tbody>
                            {booksBody}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={modal} toggle={this.toggle} className="add-cart">
                    <ModalHeader>Add carts</ModalHeader>
                    <ModalBody>Book added to the carts</ModalBody>
                    <ModalFooter>
                        <Button color="primary" tag={Link} to={"/cart"}>check cart</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default withRouter(BooksList);