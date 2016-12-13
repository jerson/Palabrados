import React from 'react'
import ReactDOM from 'react-dom'
import App from './scenes/App'
import './styles/Base.css'
import './styles/Animated.css'
import AudioPlayer from './libs/AudioPlayer'

AudioPlayer.init().then(() => {

    ReactDOM.render(
        <App />,
        document.getElementById('root'),
        () => {

        }
    );

})