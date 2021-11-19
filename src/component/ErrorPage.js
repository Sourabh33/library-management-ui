import React, { Component } from 'react';
import Alert from 'reactstrap/lib/Alert';

class ErrorPage extends Component {
    render() {
        return <div style={{margin: "auto", width: "50%"}}>
                <Alert variant="warning">
                    <h2>Server Maintenance</h2>
                    <br/>
                    <h3>Please visit in sometime</h3>
                </Alert>
            </div>;
    }
}

export default ErrorPage;