import React, { Component } from 'react';

import './styles.scss';
import logo from '../../assets/logo.svg';

import Api from '../../services/api';

export default class Main extends Component {
    state = {
        newBox: '',
    };

    handleSubmit = async (e) => {

        e.preventDefault();

        const response = await Api.post('/boxes', {
            title: this.state.newBox
        });

        this.props.history.push(`/box/${response.data._id}`);
    };

    handleInputChange = (e) => {
        this.setState({ newBox: e.target.value });
    }

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" />
                    <input placeholder="Criar uma box"
                        value={this.state.newBox}
                        onChange={this.handleInputChange}
                    ></input>
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}
