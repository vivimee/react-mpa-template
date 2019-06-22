import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const root = document.createElement('div');
document.body.appendChild(root);

export default (Container) => {
    render(
        <AppContainer>
            <Container />
        </AppContainer>,
        root
    );
};
