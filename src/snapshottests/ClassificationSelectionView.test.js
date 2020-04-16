import React from 'react';
import renderer from 'react-test-renderer';

import {Provider} from "react-redux";
import {getInitialState} from "../reducers/initial-state";
import configureStore from "../store/configureStore";

import ClassificationSelectionView from "../components/ClassificationSelectionView";

const state = getInitialState();
const store = configureStore(state);

const component = renderer.create(
    <Provider store={store}><ClassificationSelectionView /></Provider>,
);

test('Test ClassificationSelectionView component render', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
