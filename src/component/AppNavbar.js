import React, { Component } from 'react';
import {
    Button,
    Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
    NavLink, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLoggedIn: false,
            isSignUp: false,
            email: '',
            password: '',
            username: ''
        };
        this.toggle = this.toggle.bind(this);
        this.handllogin = this.handllogin.bind(this);
        this.logout = this.logout.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggle(flag) {
        this.setState({
            isOpen: !this.state.isOpen,
            isSignUp: flag
        });
    }

    handllogin = (e) => {
        // login logic
        e.preventDefault();
        console.log('e', e);
        const username = this.state.username;
        console.log('username: ', username);
        const password = this.state.password;
        console.log('pwd: ', password);
        const data = authService.login(username, password)
        if (data.success) {
            this.setState({ isLoggedIn: true, isOpen: !this.state.isOpen });
        } else {
            this.setState({ isLoggedIn: false });
        }

    }

    logout = () => {
        // logout logic
        this.setState({ isLoggedIn: false });
    }

    handleSignup = (e) => {
        // signup logic
        e.preventDefault();
        console.log('e', e);
        const email = this.state.email;
        console.log('email: ', email);
        const password = this.state.password;
        console.log('pwd: ', password);
        const username = this.state.username;
        console.log('username: ', username);
        authService.signUp(username, password, email);
        this.setState({ isLoggedIn: true });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const {
            isLoggedIn,
            isOpen,
            isSignUp,
            email,
            password,
            username
        } = this.state;
        let modalHeader = isSignUp ? 'SignUp' : 'Login';

        let FormBody = isSignUp ? (<div>
            <Form onSubmit={this.handleSignup}>
                <FormGroup>
                    <Label for="exampleEmail">Email:</Label>
                    <Input type="email" name="email" id="exampleEmail"
                        placeholder="abc@gmail.com" value={email} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleUsername">User Name</Label>
                    <Input type="username" name="username" id="exampleUsername"
                        placeholder="User Name" value={username} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword"
                        placeholder="password" value={password} onChange={this.handleChange} />
                </FormGroup>
                <Button color="primary" style={{ marginRight: '10px' }}>Register</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </Form>
        </div>) : (<div>
            <Form onSubmit={this.handllogin}>
                <FormGroup>
                    <Label for="exampleUsername">Username:</Label>
                    <Input type="username" name="username" id="exampleUsername"
                        placeholder="User Name" value={username} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password:</Label>
                    <Input type="password" name="password" id="examplePassword"
                        placeholder="password" value={password} onChange={this.handleChange} />
                </FormGroup>
                <Button color="primary" style={{ marginRight: '10px' }}>Login</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </Form>
        </div>);

        let body = isLoggedIn ?
            (
                <Nav>
                    <NavItem>
                        <NavLink style={{ color: "#d50000", cursor: 'pointer' }} onClick={() => this.logout()}>Logout</NavLink>
                    </NavItem>
                </Nav>
            ) : (
                <Nav>
                    <NavItem>
                        <NavLink style={{ color: "#2BBBAD", cursor: 'pointer' }} onClick={() => this.toggle(false)}>Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "#4285F4", cursor: 'pointer' }} onClick={() => this.toggle(true)}>SignUp</NavLink>
                    </NavItem>
                </Nav>
            )
        let booksBody = isLoggedIn ? (
            <Nav>
                <NavItem>
                    <NavLink href="/books" style={{ color: '#cddc39' }}>Books</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/orders" style={{ color: '#cddc39' }}>Orders</NavLink>
                </NavItem>
            </Nav>
        ) : (<div></div>);




        return (<div><Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {booksBody}
                </Nav>
                <Nav className="ml-auto" navbar>
                    {body}
                    <NavItem>
                        <NavLink href="https://github.com/sourabh33">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
            <div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="add-cart">
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalBody>{FormBody}</ModalBody>
                    <ModalFooter>
                        {/* {loginButton} */}
                        {/* <Button color="primary" onSubmit={() => this.login()}>Login</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
                    </ModalFooter>
                </Modal>
            </div>
        </div>

        );
    }
}