import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Welcome from './Welcome'
import './App.css'
import AudioPlayer from '../libs/AudioPlayer'

class App extends Component {

    state = {
        phrase: '',
        skipSpaces: true,
        showSpecials: true,
        keys: [],
        fontSize: 80,
        total: 0,
        totalOk: 0,
        totalError: 0,
    };

    componentDidMount() {
    }

    focusInput() {
        this.refs.key && ReactDOM.findDOMNode(this.refs.key).focus();
    }

    onNewGame(phrase: string, settings: any = {}) {
        this.setPhrase(phrase, settings)
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

    setPhrase(phrase: string, settings: any) {

        let keys = phrase.split('').map((key, index) => {

            let status = 'pending';
            let value = this.replaceAcents(key);

            if (/[^a-zA-Z0-9\s]/.test(value) && settings.showSpecials) {
                status = 'ok'
            } else if (value === ' ' && settings.skipSpaces) {
                status = 'ok'
            }

            return {
                key,
                value,
                index,
                status
            }
        });

        this.setState({keys, phrase, ...settings}, () => {
            this.restartCounters();
        });

    }

    restart() {
        this.setPhrase(this.state.phrase, {
            showSpecials: this.state.showSpecials,
            skipSpaces: this.state.skipSpaces,
        });
    }

    restartCounters() {

        this.setState({total: 0, totalOk: 0, totalError: 0}, () => {
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
            AudioPlayer.success.play();
            totalOk++;
        } else {
            AudioPlayer.fail.play();
            totalError++;
        }
        this.setState({keys, total, totalOk, totalError}, () => {
            if (isOk) {
                this.checkIfAllIsOk();
            }
        });
    }

    checkIfAllIsOk() {
        let isMissingSome = this.state.keys.some((key, index) => {
            return key.status === 'pending'
        });

        let allOk = !isMissingSome;
        this.setState({allOk});

        if (allOk) {
            AudioPlayer.win.play();
            ReactDOM.findDOMNode(this.refs.newGame).focus();
        } else {
            this.focusInput();
        }

    }

    bigger() {
        let {fontSize}  =this.state;
        fontSize += 10;
        this.setState({fontSize});
    }

    smaller() {

        let {fontSize}  =this.state;
        fontSize -= 10;
        fontSize = fontSize < 20 ? 20 : fontSize;
        this.setState({fontSize});
    }

    render() {

        let {keys, phrase, fontSize} = this.state;
        let number = 0;

        if (!phrase) {
            return <Welcome onNewGame={this.onNewGame.bind(this)}/>
        }

        return (
            <div className="App">

                <div className="KeysContainer">

                    {keys.map((key, index) => {

                        let isAlphabet = false;
                        if (!/[^a-zA-Z0-9]/.test(key.value)) {
                            isAlphabet = true;
                            number++;
                        }

                        if (!this.state.skipSpaces && key.value === ' ') {
                            number++;
                        } else if (!this.state.showSpecials && /[^a-zA-Z0-9\s]/.test(key.value)) {
                            number++;
                        }

                        let className = 'Key ' + (key.status === 'ok' ? 'Active ' : '');
                        return (
                            <div key={index} className="KeyContainer" style={{width:fontSize-10,height:fontSize+10,}}>


                                {isAlphabet &&
                                <div className={className}>
                                    <div className="KeyFront" style={{fontSize:fontSize-20}}>{number}</div>
                                    <div className="KeyBack" style={{fontSize}}>{key.key}</div>
                                </div>
                                }

                                {!isAlphabet &&
                                <div className={className}>
                                    <div className="KeyFront" style={{fontSize:fontSize-10}}>{number}</div>
                                    <div className="KeySpace" style={{fontSize}}>{key.key}</div>
                                </div>
                                }

                            </div>
                        )

                    })}


                </div>

                <div className="InfoContainer">


                    <div className="ResultsContainer">
                        <div className="result"><span className="label">Aciertos:</span> <span
                            className="counter">{this.state.totalOk}</span></div>
                        <div className="result"><span className="label">Errores:</span> <span
                            className="counter">{this.state.totalError}</span></div>

                    </div>
                    <div className="InputContainer">
                        <form onSubmit={this.send.bind(this)}>
                            <input maxLength="1" ref="key"/>

                            <button type="submit" className="success">Enviar</button>
                        </form>


                    </div>

                    <div className="SizeContainer">

                        <button type="button" className="info" onClick={this.bigger.bind(this)}>+</button>
                        <button type="button" className="info" onClick={this.smaller.bind(this)}>-</button>

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
