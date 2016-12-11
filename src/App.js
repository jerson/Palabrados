import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Welcome from './Welcome'
import './Base.css'
import './App.css'
import './Animated.css'

class App extends Component {

    state = {
        phrase: '',
        useSpaces: false,
        keys: [],
        total: 0,
        totalOk: 0,
        totalError: 0,
    };

    focusInput(){
       ReactDOM.findDOMNode(this.refs.key).focus();
    }

    onNewGame(phrase, useSpaces: bool = false) {
        this.setPhrase(phrase, useSpaces)
    }

    replaceAcents(str: string): string {

        str = str.toLocaleLowerCase();

        let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {};

        for (let i = 0, j = from.length; i < j; i++)
            mapping[from.charAt(i)] = to.charAt(i);

        let ret = [];
        for (let i = 0, j = str.length; i < j; i++) {
            let c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');

    }

    setPhrase(phrase: string, useSpaces: bool) {

        let keys = phrase.split('').map((key, index) => {
            return {
                key,
                value: this.replaceAcents(key),
                index,
                status: 'pending'
            }
        });

        this.setState({keys, phrase, useSpaces},()=>{
            this.restart();
        });

    }

    restart() {

        let keys = this.state.keys.map((key, index) => {
            key.status = 'pending';
            return key;
        });
        this.setState({keys, total: 0, totalOk: 0, totalError: 0},()=>{
            this.focusInput();
        });

    }

    showAll() {

        let keys = this.state.keys.map((key, index) => {

            key.status = 'ok';
            return key;
        });
        this.setState({keys}, () => {
            this.checkIfAllIsOk();
        });

    }

    send(e) {
        e.preventDefault();
        let inputKey = ReactDOM.findDOMNode(this.refs.key);
        let value = inputKey.value.toLocaleLowerCase();
        value = value.length > 0 ? value[0] : '';

        if (!value) {
            return;
        }

        inputKey.value = '';

        let isOk = false;
        let keys = this.state.keys.map((key, index) => {

            if (key.value === value && key.status !== 'ok') {
                key.status = 'ok';
                isOk = true;
            }
            return key;
        });

        let {total, totalOk, totalError} = this.state;

        total++;
        if (isOk) {
            totalOk++;
        } else {
            totalError++;
        }
        this.setState({keys, total, totalOk, totalError}, () => {
            this.checkIfAllIsOk();
        });
    }

    checkIfAllIsOk() {
        let isMissingSome = this.state.keys.some((key, index) => {
            return key.status === 'pending'
        });


        console.log(isMissingSome);

        let allOk = !isMissingSome;
        this.setState({allOk});

        if (allOk) {
            ReactDOM.findDOMNode(this.refs.newGame).focus();
        }else{
            this.focusInput();
        }

    }

    render() {

        let {keys, phrase, useSpaces} = this.state;
        let number = 0;

        if (!phrase) {
            return <Welcome onNewGame={this.onNewGame.bind(this)}/>
        }

        return (
            <div className="App">

                <div className="KeysContainer">

                    {keys.map((key, index) => {

                        if (key.key !== ' ' || useSpaces) {
                            number++;
                        }

                        let className = 'Key ' + (key.status === 'ok' ? 'Active' : '');
                        return (
                            <div key={index} className="KeyContainer">
                                {key.key === ' ' && !useSpaces &&
                                <div className="Key">
                                    <div className="KeySpace"></div>
                                </div>
                                }
                                {(key.key !== ' ' || useSpaces) &&
                                <div className={className}>
                                    <div className="KeyFront">{number}</div>
                                    <div className="KeyBack">{key.key}</div>
                                </div>
                                }
                            </div>
                        )

                    })}


                </div>

                <div className="InfoContainer">


                    <div className="InputContainer">
                        <div>Aciertos: {this.state.totalOk}</div>
                        <div>Errores: {this.state.totalError}</div>

                    </div>
                    <div className="InputContainer">
                        <form onSubmit={this.send.bind(this)}>
                            <input maxLength="1" ref="key"/>

                            <button type="submit">Enviar</button>
                        </form>


                    </div>
                    <div className="SettingsContainer">

                        <button type="button" onClick={this.restart.bind(this)}>Reiniciar</button>
                        <button type="button" onClick={this.showAll.bind(this)}>Mostrar</button>
                        <button type="button" ref="newGame" onClick={this.onNewGame.bind(this,'',false)}>Nuevo</button>

                    </div>
                </div>


            </div>
        );
    }
}

export default App;
