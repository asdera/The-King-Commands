import React from 'react';
import './board.css';

export default class Board extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.stage}</h1>
                
                {this.props.hello ? <MicWorks /> : <MicCheck />}

                <img src={"http://www.fen-to-image.com/image/"+this.props.size+"/"+this.props.fen} alt="Chess Board" />
            </div>
            
        );
    }
}


class MicCheck extends React.Component {    
    render() {
        return <p>Welcome, say "hello" to test your mic!</p>;
    }
}

class MicWorks extends React.Component {
    render() {
        return <p>Hey there, your mic works! Good luck on your game!</p>;
    }
}