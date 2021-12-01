import React, { Component } from 'react';
import {
    Button,
    Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
    NavLink, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import Alert from 'reactstrap/lib/Alert';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLoggedIn: false,
            isSignUp: false,
            email: '',
            password: '',
            username: '',
            error_message: '',
            isValid: true,
            success_message: '',
            isRefresh: false
        };
        this.toggle = this.toggle.bind(this);
        this.handllogin = this.handllogin.bind(this);
        this.logout = this.logout.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetLogin = this.resetLogin.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    toggle(flag) {
        this.setState({
            isOpen: !this.state.isOpen,
            isSignUp: flag
        });
    }

    resetLogin() {
        this.setState({ error_message: '', username: '', password: '', email: '' });
    }

    handllogin = (e) => {
        // login logic
        e.preventDefault();
        console.log('e', e);
        const username = this.state.username;
        console.log('username: ', username);
        const password = this.state.password;
        console.log('pwd: ', password);
        authService.login(username, password)
            .then(
                (data) => {
                    console.log('data', data)
                    this.setState({ isLoggedIn: true, isOpen: !this.state.isOpen });
                },
                (error) => {
                    let data = error.response.data;
                    console.log("error: ", data);
                    this.setState({ isLoggedIn: false, error_message: data.message })
                }
            )

    }

    logout = () => {
        // logout logic
        authService.logout();
        this.setState({ isLoggedIn: false });
    }

    refresh = () => {
        let refreshPromise = new Promise(resolve => setTimeout(resolve, 2000))
        refreshPromise.then(
            () => {
                window.location.reload(false);
            }

        )
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
        this.setState({
            error_message: '',
            success_message: ''
        });
        authService.signUp(username, password, email)
            .then(
                response => {
                    console.log('response: ', response.data);
                    this.setState({
                        success_message: response.data.message,
                    }, this.refresh())
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        error_message: resMessage
                    });
                }
            )
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        console.log('value: ', value);
        if (value == '') {
            this.setState({ isValid: false });
        }
        this.setState({ [name]: value });
    }

    render() {
        const {
            isLoggedIn,
            isOpen,
            isSignUp,
            email,
            password,
            username,
            error_message,
            success_message
        } = this.state;
        let modalHeader = isSignUp ? 'SignUp' : 'Login';

        let FormBody = isSignUp ? (<div>
            <Form onSubmit={this.handleSignup}>
                <FormGroup>
                    <Label for="exampleEmail">Email:</Label>
                    <Input type="email" name="email" id="exampleEmail"
                        placeholder="abc@gmail.com" value={email} onChange={this.handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleUsername">User Name</Label>
                    <Input type="username" name="username" id="exampleUsername"
                        placeholder="User Name" value={username} onChange={this.handleChange}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword"
                        placeholder="password" value={password} onChange={this.handleChange}
                        required />
                </FormGroup>
                {error_message && (
                    <FormGroup>
                        <Alert color="danger">
                            {error_message}
                        </Alert>
                    </FormGroup>
                )}
                {success_message && (
                    <FormGroup>
                        <Alert color="info">
                            {success_message}
                        </Alert>
                    </FormGroup>
                )}
                <Button color="primary" style={{ marginRight: '10px' }}>Register</Button>
                {error_message && (
                    <Button color="warning" style={{ marginRight: '10px' }} onClick={this.resetLogin}>Retry</Button>
                )}
            </Form>
        </div>) : (<div>
            <Form onSubmit={this.handllogin}>
                <FormGroup>
                    <Label for="exampleUsername">Username:</Label>
                    <Input type="username" name="username" id="exampleUsername"
                        placeholder="User Name" value={username} onChange={this.handleChange}
                        required
                        invalid={error_message} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password:</Label>
                    <Input type="password" name="password" id="examplePassword"
                        placeholder="password" value={password} onChange={this.handleChange}
                        required
                        invalid={error_message} />
                </FormGroup>
                {error_message && (
                    <FormGroup>
                        <Alert color="danger">
                            {error_message}
                        </Alert>
                    </FormGroup>
                )}

                <Button color="primary" style={{ marginRight: '10px' }}>Login</Button>
                {error_message && (
                    <Button color="warning" style={{ marginRight: '10px' }} onClick={this.resetLogin}>Retry</Button>
                )}

                {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
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