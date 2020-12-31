import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginActions } from './ducks';
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

class Home extends Component {
    render() {
        console.log('actions', this.props)
        const { user, secret } = this.props;
        return (
            //     <main className="Home">
            //     <section className="Connection">
            //         <>
            //             <h1>
            //                 Welcome <br />
            //                 <span>{user?.displayName}</span>
            //             </h1>
            //             <button>Disconnect</button>
            //         </>
            //     </section>
            //     <button className="primary secret-btn" onClick={() => this.props.getUserToken()}>
            //         Look at my secret...
            //     </button>
            //     <span className="secret">{secret ? JSON.stringify(secret) : '\u00A0'}</span>
            // </main>

            <Grid textAlign='center' style={{ height: '100%', paddingTop: '60px' }} verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 400, height: "100%", marginTop: "2%" }}>
                        <Segment basic>
                            <Card fluid raised={true} >
                                <Card.Header className='login-form' style={{ padding: "20px" }}>
                                    <h3>Welcome!</h3>
                                </Card.Header>
                                <Card.Content className='login-form'>
                                    <Card.Description>
                                    <Button className="button-confirm" primary onClick={() => this.props.getUserToken()} floated="right" size="tiny"><Icon name='sign in' /> Get Token</Button>
                                    <span className="secret">{secret ? JSON.stringify(secret) : '\u00A0'}</span>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Button className="button-confirm" primary onClick={() => this.props.headerToken()} floated="right" size="tiny"><Icon name='sign in' /> Get Token</Button>
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
        user: state.Login.user,
        secret: state.Login.secret,
    };
}

export default connect(mapStateToProps, loginActions)(Home);
