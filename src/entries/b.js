import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../containers/Bcontainer/index';

const ele = document.querySelector('#react');
ReactDOM.render(<Container />, ele);

if (module.hot) {
    module.hot.accept('../containers/Bcontainer/index', () => {
        ReactDOM.render(<Container />, ele);
    })
}

