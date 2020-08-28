import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import QuizList from "./conteiners/QuizList/QuizList";
import QuizCreator from "./conteiners/QuizCreator/QuizCreator";
import Auth from "./conteiners/Auth/Auth";
import Layout from "./hoc/Layout/Layout";

import Quiz from "./conteiners/Quiz/Quiz";
import {connect} from "react-redux";
import Logout from "./conteiners/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {

        let routs = (
            <Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/' component={QuizList}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routs = (
                <Switch>
                    <Route path='/quiz-creator' component={QuizCreator}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' exact component={QuizList}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <Layout>
                {routs}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
