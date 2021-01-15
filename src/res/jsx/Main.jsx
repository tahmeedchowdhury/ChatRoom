import React, {Component} from 'react';
import Title from './Title';
import NavBar from './NavBar';


export default class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <div id = "Main">
            <Title></Title>
            
        </div>
            );
    }
}