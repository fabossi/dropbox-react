import React, { Component } from 'react';


import { MdInsertDriveFile } from "react-icons/md";
import { formatDistance, subDays } from 'date-fns';
import { pt } from 'date-fns/esm/locale';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import './style.scss';
import logo from '../../assets/logo.svg';
import Api from '../../services/api';

export default class Box extends Component {
    state = { box: {} };

    async componentDidMount() {
        this.subscribeToNewFiles();

        const boxId = this.props.match.params.id;
        const response = await Api.get(`boxes/${boxId}`);

        this.setState({ box: response.data })
    }
    subscribeToNewFiles = () => {
        const boxId = this.props.match.params.id;
        const io = socket('https://dropbox-backend-fabossi.herokuapp.com');

        io.emit('connectRoom', boxId);
        io.on('file', data => {
            this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } });
        })
    }

    handleUpload = files => {
        files.forEach(file => {
            const data = new FormData();
            const boxId = this.props.match.params.id;

            data.append('file', file);

            Api.post(`boxes/${boxId}/files`, data);
        })
    }

    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt="" />
                    <h1>{this.state.box.title}</h1>
                </header>

                <Dropzone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Arraste arquivos ou clique aqui.</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    {this.state.box.files && this.state.box.files.map(files => (
                        <li key={files._id}>
                            <a className="fileInfo" href={files.url} target="_blank" rel="noopener noreferrer">
                                <MdInsertDriveFile size={24} color="#A5CFFF" />
                                <strong>{files.title}</strong>
                            </a>
                            <span>há {" "}
                                {formatDistance(subDays(new Date(), 3), new Date(), { locale: pt })}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
