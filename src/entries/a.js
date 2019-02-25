import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../containers/Acontainer/index';

const ele = document.createElement('div');
document.body.appendChild(ele);
ReactDOM.render(<Container />, ele);

if (module.hot) {
    module.hot.accept('../containers/Acontainer/index', () => {
        ReactDOM.render(<Container />, ele);
    })
}
