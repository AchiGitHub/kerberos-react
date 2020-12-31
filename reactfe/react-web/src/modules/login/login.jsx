import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginActions } from './ducks/index';
import {loginSelectors} from './ducks/index';
import {
    Grid,
    Card,
    Icon,
    Form,
    Segment,
    Button,
    Divider,
    Input
} from 'semantic-ui-react'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: ""
        }
        this.DoLogin = this.DoLogin.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.DoCancel = this.DoCancel.bind(this);
    }

     /* ********** Methods ********** */

    // Invoke login action
    DoLogin() {
        this.props.login({ username: this.props.username, password: this.state.password });
        this.clearPassword()
    }

    // Clears username and password
    DoCancel() {
        this.clearPassword()
        this.props.loginCancel();
    }

    // Only clears password field
    clearPassword() {
        this.setState({ password: "" })
    }



    onUsernameChange(event) {
        this.props.loginFieldChanged("username", event.target.value)
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        console.log(this.props)
        return (
            <Grid textAlign='center' style={{ height: '100%', paddingTop: '60px' }} verticalAlign='middle'>
                <button className="primary" onClick={() => this.props.loginWithSSO()}>
                    Connect with SSO
                </button>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 400, height: "100%", marginTop: "2%" }}>
                        <Segment basic>
                            <Card fluid raised={true} >
                                <Card.Header className='login-form' style={{ padding: "20px" }}>
                                    <h3>Sample Login</h3>
                                </Card.Header>
                                <Card.Content className='login-form'>
                                    <h4>Log-in to your account</h4>
                                    <Card.Description>
                                        <Form size={'large'}>
                                            <Form.Group style={{ alignItems: "center", justifyContent: "center", marginTop: "2em" }}>
                                                <Input icon='user' control='input' placeholder='Username' className="username" value={this.props.username} onChange={this.onUsernameChange}/>
                                            </Form.Group>
                                            <Form.Group style={{ alignItems: "center", justifyContent: "center" }}>
                                                <Input icon='lock' style={{ marginTop: "10px" }} control='input' placeholder='Password' type='Password' className="password" onChange={this.onPasswordChange}/>
                                            </Form.Group>
                                            <Form.Field style={{ paddingRight: "40px", marginTop: "2em" }} >
                                                <a style={{ fontSize: "10px" }} href="/home">Forgot your password?</a>   <Button className="button-confirm" primary type='submit' onClick={this.DoLogin} floated="right" size="tiny"><Icon name='sign in' /> Login</Button>
                                            </Form.Field>
                                            <Divider hidden />
                                        </Form>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <span><Icon name='copyright' />MIT 2019</span>
                                </Card.Content>
                            </Card>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.Login,
        Username: loginSelectors.getUsername(state),
        isAuthenticated: loginSelectors.getAuthenticated(state),
        loading: state.Login.loading,
    };
}

export default connect(mapStateToProps, loginActions)(Login);
