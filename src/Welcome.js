import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './Base.css'
import './App.css'
import './Animated.css'

export default class Welcome extends Component {

    state = {
        useSpaces: false,
    };

    onChangeSpaces(e) {

        this.setState({useSpaces:!this.state.useSpaces})
    }

    componentDidMount() {
    }

    send(e) {
        e.preventDefault();
        let inputKey = ReactDOM.findDOMNode(this.refs.phrase);
        let value = inputKey.value.replace(/\s+/g, ' ').trim().toLocaleLowerCase();

        if (!value) {
            return;
        }

        if (typeof this.props.onNewGame === 'function') {
            this.props.onNewGame(value, this.state.useSpaces)
        }

    }

    render() {

        return (
            <div className="App">


                <div className="WelcomeContainer">
                    <form onSubmit={this.send.bind(this)}>
                        <textarea ref="phrase" rows={3}></textarea>

                        <div className="radioContainer">
                            <input value="on" type="checkbox" id="radio1" checked={this.state.useSpaces }
                                   onChange={this.onChangeSpaces.bind(this)} className="radio"/>
                            <label htmlFor="radio1">Usar espacios como opciones</label>
                        </div>

                        <button type="submit">Iniciar Juego</button>
                    </form>


                </div>


            </div>
        );
    }
}

