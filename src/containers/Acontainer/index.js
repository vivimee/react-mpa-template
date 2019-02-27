import React, { Component } from 'react';
import './index.less';
import bg from '../../images/holiday.jpeg';

export default class AContainer extends Component {
    async componentDidMount() {
        const res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve('promise done');
            }, 3000);
        });
        console.log(res);
    }
    render() {
        return (
            <div>
                <img src={bg} style={{transform: 'scale(.1)'}}/>
                <h3>hello world ～</h3>
            </div>
        );
    }
}
