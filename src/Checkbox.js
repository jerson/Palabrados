import React, {Component} from 'react'
import './Base.css'
import './App.css'
import './Animated.css'

export default class Checkbox extends Component {

    state = {
        value: false,
        id: 1
    };

    static id = 1;

    componentDidMount() {
        Checkbox.id++;
        this.setState({id: Checkbox.id});

        if (typeof this.props.defaultValue === 'boolean') {
            this.setState({value: this.props.defaultValue})
        }
    }

    onChange(e) {

        this.setState({value: !this.state.value})
    }

    getValue(): boolean {
        return this.state.value

    }

    render() {

        return (
            <div className="radioContainer">
                <input value="on" type="checkbox" id={`radio${this.state.id}`} checked={this.state.value }
                       onChange={this.onChange.bind(this)} className="radio"/>
                <label htmlFor={`radio${this.state.id}`}>{this.props.label}</label>
            </div>

        );
    }
}

