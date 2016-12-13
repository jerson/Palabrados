import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Checkbox from '../components/Checkbox'
import AudioPlayer from '../libs/AudioPlayer'

export default class Welcome extends Component {

    componentDidMount() {
        AudioPlayer.background.play();
        this.focusInput();

    }

    focusInput() {
        ReactDOM.findDOMNode(this.refs.phrase).focus();
    }

    send(e) {
        e.preventDefault();
        let inputKey = ReactDOM.findDOMNode(this.refs.phrase);
        let value = inputKey.value.replace(/\s+/g, ' ').trim().toLocaleLowerCase();

        if (!value) {
            return;
        }

        if (typeof this.props.onNewGame === 'function') {
            this.props.onNewGame(value, {
                skipSpaces: this.refs.skipSpaces.getValue(),
                showSpecials: this.refs.showSpecials.getValue()
            })
        }

    }

    render() {

        return (
            <div className="App">


                <div className="WelcomeContainer">
                    <form onSubmit={this.send.bind(this)}>
                        <textarea ref="phrase" rows={2} placeholder="Ingresa el texto"></textarea>

                        <Checkbox label={'Omitir espacios en blanco'} defaultValue={true} ref="skipSpaces"/>
                        <Checkbox label={'Mostrar caracteres especiales'} defaultValue={true} ref="showSpecials"/>

                        <button className="success" type="submit">Iniciar juego</button>
                    </form>


                </div>


            </div>
        );
    }
}

