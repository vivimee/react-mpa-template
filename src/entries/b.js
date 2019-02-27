import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../containers/Bcontainer/index';
import { saySomething } from '../utils/helper';

const ele = document.querySelector('#react');
ReactDOM.render(<Container />, ele);
saySomething();

if (module.hot) {
    module.hot.accept('../containers/Bcontainer/index', () => {
        ReactDOM.render(<Container />, ele);
    })
}

