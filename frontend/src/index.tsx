import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Provider} from "react-redux";
import store from "./reducers";
import { BUGSNAG } from './config';
import Bugsnag from "@bugsnag/js";
import BugsnagPerformance from "@bugsnag/browser-performance";
import BugsnagPluginReact from "@bugsnag/plugin-react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

Bugsnag.start({
    apiKey: BUGSNAG,
    plugins: [new BugsnagPluginReact()]
})
BugsnagPerformance.start({ apiKey: BUGSNAG })

// @ts-expect-error хз почему линтер ругается
const ErrorBoundary = Bugsnag.getPlugin('react')
    .createErrorBoundary(React)

const ErrorView = () =>
    <div>
        <p>Inform users of an error in the component tree.</p>
    </div>

root.render(
    <ErrorBoundary FallbackComponent={ErrorView}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </ErrorBoundary>
);