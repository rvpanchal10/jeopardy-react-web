import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from '../helpers';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PageNotFound } from '../components/PageNotFound';
import { Board } from '../components/Board';
import { Spinner } from '../components/Spinner';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }
    render() {
        const { loaderVisibility } = this.props;
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <main>
                        <ToastContainer />
                        <Spinner isVisible={loaderVisibility} />
                        <Router history={history}>
                            <div className="mid-wrapper">
                                <Switch>
                                    <Route exact path="/" component={Board} />
                                    <Route exact path="*" component={PageNotFound}/>
                                </Switch>
                            </div>
                        </Router>
                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loaderVisibility: state.game.loaderVisibility
    };
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
