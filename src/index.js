import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import AudioPlayer from './AudioPlayer'

AudioPlayer.init().then(() => {

    ReactDOM.render(
        <App />,
        document.getElementById('root'),
        () => {

        }
    );

})