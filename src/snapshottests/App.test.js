import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import App from '../components/App';
import {Provider} from "react-redux";
import {getInitialState} from "../reducers/initial-state";
import configureStore from "../store/configureStore";

const state = getInitialState();
const store = configureStore(state);

const component = renderer.create(
    <Provider store={store}><App /></Provider>,
);
test('renders learn react link', () => {

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
