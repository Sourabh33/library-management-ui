import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as UrlConstant from './Constants';
import { Col, Card, Button, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Row, CardFooter } from "reactstrap";

class HomeCard extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [], isLoading: true };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(UrlConstant.booksUrl + '/books',)
            .then(response => response.json())
            .then(data => this.setState({ books: data, isLoading: false }))
            .catch(() => { if(this.props.history) this.props.history.push('/')});
    }


    render() {
        const { books, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        const booksdetails = books.map(book => {
            return (
                <Col>
                    <Card body outline color="info">
                        <CardImg top src={book.imgPath} alt="Book 1" />
                        <CardBody>
                            <CardTitle>{book.name}</CardTitle>
                            <CardSubtitle>{book.author}</CardSubtitle>
                            <CardText>{book.description}</CardText>
                        </CardBody>
                        <CardFooter>
                            <Button color="info" tag={Link} to={"/books/" + book.id}>Check this..</Button>
                        </CardFooter>
                    </Card>
                </Col>
            )
        });

        return (
            <div>
                <Row>
                    {booksdetails}
                </Row>

                <Row>
                    <Col>
                        <Card body outline color="primary"></Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HomeCard;