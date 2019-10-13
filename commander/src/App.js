import React from 'react';
import Board from './components/board'
import './App.css';

const annyang = require('annyang');

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      hello: false, 
      board: false,
      gameId: "",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
      size: 512
    };
  }
  componentDidMount() {
    if (annyang) {
      this.gameState(function () {
        console.log(this.state)
        annyang.state = this.state;
      });

      var commands = {
        'hello': () => { 
          console.log("hi")
          this.setState({ hello: true })
        },
        'gary': () => { 
          console.log("goose")
          this.setState({ hello: true })
          this.moveRequest();
        },
        '*uci': {'regexp': /[a-h][1-8] to [a-h][1-8]/, 'callback': this.moveCommand},
        '*move': {'regexp': /(king|queen|bishop|knight|pawn|rook|brooke) [a-h][1-8]/, 'callback': this.moveCommand},
        '*pawn': {'regexp': /^[a-h][1-8]$/, 'callback': this.moveCommand},
      };

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.addCallback('soundstart', function() {
        console.log('listening...');
      });

      annyang.addCallback('resultMatch', this.process);
      
      annyang.addCallback('result', function() {
        console.log('stopped listening');
      });

      // Start listening.
      annyang.start();
    }
  }

  process (userSaid, commandText, phrases) {
    console.log(userSaid); // sample output: 'hello'
    console.log(commandText); // sample output: 'hello (there)'
    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']

    if (commandText === "*uci") {
      console.log(this)
      const uci = userSaid.replace(/\s/g, '').toLowerCase();
      fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/move/'+uci, {
        method: 'POST',
        headers: {
          'Accept': 'application',
          'Authorization': 'Bearer VXHc8GZgWf7q63JX',
          'Content-Type': 'application/json',
        },
      })
    }
  }

  moveCommand (piece, where) {
    console.log("to", piece, where)
  }

  gameState (callback) {
    fetch('https://lichess.org/api/account/playing', {
      method: 'GET',
      headers: {
        'Accept': 'application',
        'Authorization': 'Bearer VXHc8GZgWf7q63JX',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.nowPlaying.length) {
        this.setState({
          board: true,
          fen: data.nowPlaying[0].fen,
          gameId: data.nowPlaying[0].gameId,
          lastMove: data.nowPlaying[0].lastMove,
        }, callback)
      }
    })
  }

  render() {
    return (
      <Board hello={this.state.hello} fen={this.state.fen} size={this.state.size}/>
    );
  }

}


export default App;
