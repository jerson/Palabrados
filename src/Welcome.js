import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Checkbox from './Checkbox'
import './Base.css'
import './App.css'
import './Animated.css'

export default class Welcome extends Component {

    componentDidMount() {
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
                useSpaces: !this.refs.skipSpaces.getValue(),
                showSpecials: this.refs.showSpecials.getValue()
            })
        }

    }

    render() {

        return (
            <div className="App">


                <div className="WelcomeContainer">
                    <form onSubmit={this.send.bind(this)}>
                        <textarea ref="phrase" rows={3}></textarea>

                        <Checkbox label={'Omitir espacios en blanco'} defaultValue={true} ref="skipSpaces"/>
                        <Checkbox label={'Mostrar caracteres especiales'} defaultValue={true} ref="showSpecials"/>

                        <button type="submit">Iniciar Juego</button>
                    </form>


                </div>


            </div>
        );
    }
}

