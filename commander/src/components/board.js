import React from 'react';
import './board.css';

export default class Board extends React.Component {

    render() {
        console.log(this.props)

        return (
            <div>
                {this.props.hello ? <SaidHello /> : <Welcome />}

                <img src={"http://www.fen-to-image.com/image/"+this.props.size+"/"+this.props.fen} alt="Chess Board" />
            </div>
            
        );
    }
}

class Welcome extends React.Component {    
    render() {
        return <div>Say "hello" to check your mic!</div>;
    }
}

class SaidHello extends React.Component {
    render() {
        return <div>Hey, hello! Your mic works!</div>;
    }
}