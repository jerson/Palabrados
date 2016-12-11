import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './Base.css'
import './App.css'
import './Animated.css'

export default class Welcome extends Component {

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
            this.props.onNewGame(value)
        }

    }

    render() {

        return (
            <div className="App">


                <div className="WelcomeContainer">
                    <form onSubmit={this.send.bind(this)}>
                        <textarea ref="phrase" rows={3}></textarea>

                        <button type="submit">Iniciar Juego</button>
                    </form>


                </div>


            </div>
        );
    }
}

