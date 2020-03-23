/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './helpers';

import { App } from './app';

import './css/style.scss';

import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true
    // productionPrefix: 'MuiFormControl',
});

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <JssProvider generateClassName={generateClassName}>
                <App />
            </JssProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
