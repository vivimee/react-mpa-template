import React, { Component } from 'react';
import './index.less';
import bg from '../../images/holiday.jpeg';

export default class AContainer extends Component {
    render() {
        return (
            <div>
                <img src={bg} />
                <h3>hello world</h3>
            </div>
        );
    }
}
