import React from 'react';
import Board from './components/board'
import FENBoard from "fen-chess-board";
import './App.css';

const annyang = require('annyang');
var urlParams = new URLSearchParams(window.location.search);

const hasToken = urlParams.has('token');

var authToken = urlParams.get('token');

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      needsToken: 2,
      turn: false,
      white: true,
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
        // console.log(this.state)
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
        },

        'castle': () => {
          const uci = this.state.white ? "e1g1" : "e8g8";
          fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/move/'+uci, {
            method: 'POST',
            headers: {
              'Accept': 'application',
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',
            },
          })

          const uci2 = this.state.white ? "e1c1" : "e8c8";
          fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/move/'+uci2, {
            method: 'POST',
            headers: {
              'Accept': 'application',
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',
            },
          })
        },

        'castle short': () => { 
          const uci = this.state.white ? "e1g1" : "e8g8";
          fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/move/'+uci, {
            method: 'POST',
            headers: {
              'Accept': 'application',
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',
            },
          })
        },

        'castle long': () => { 
          const uci = this.state.white ? "e1c1" : "e8c8";
          fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/move/'+uci, {
            method: 'POST',
            headers: {
              'Accept': 'application',
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',
            },
          })
        },

        'resign game': () => { 
          fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/resign', {
            method: 'POST',
            headers: {
              'Accept': 'application',
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',
            },
          })
        },

        'abort game': () => { 
          fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/abort', {
            method: 'POST',
            headers: {
              'Accept': 'application',
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json',
            },
          })
        },

        '*uci': {'regexp': /^[a-h][1-8] [a-h][1-8]$/, 'callback': this.moveCommand},

        'piece *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},

        'pawn *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'pain *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'pond *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'on *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'pause *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'minion *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},

        'knight *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'night *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'knights *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'horse *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'cavalary *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'cowboy *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},

        'bishop *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'wizard *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'mage *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'shazam *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'cleric *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'sorcerer *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},

        'rook *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'brooke *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'rock *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'castlehead *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'ruck *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'tower *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},

        'queen *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'dragon *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'princess *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'chancellor *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'lady *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'amazon *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},

        'king *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'royal *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'president *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'crown *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'prince *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},
        'pope *move': {'regexp': /[a-h][1-8]$/, 'callback': this.moveCommand},

        // '*square': {'regexp': /^[a-h][1-8]$/, 'callback': this.moveCommand},
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
      if (this.state.needsToken === 2) {
        annyang.start();
      }
    }
  }

  process (userSaid, commandText, phrases) {
    console.log(userSaid); // sample output: 'hello'
    console.log(commandText); // sample output: 'hello (there)'
    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']

    if (commandText === "*uci") {
      console.log("uci", this);
      const uci = userSaid.replace(/\s/g, '').toLowerCase();
      fetch('https://lichess.org/api/bot/game/'+this.state.gameId+'/move/'+uci, {
        method: 'POST',
        headers: {
          'Accept': 'application',
          'Authorization': 'Bearer ' + authToken,
          'Content-Type': 'application/json',
        },
      })
      return;
    } else if (commandText === "piece *move" && this.state.turn) {
      var occurences = [
        ["pawn", "pain", "pond", "on", "pause", "minion", 0],
        ["night", "knight", "warrior", "horse", "cavalary", "cowboy", 0],
        ["bishop", "wizard", "mage", "shazam", "cleric", "sorcerer", 0],
        ["rook", "brooke", "rock", "castlehead", "ruck", "tower", "roxy", "rough", "rex", "rick", "wreck", "rug", 0],
        ["queen", "dragon", "princess", "chancellor", "lady", "amazon", 0],
        ["king", "royal", "president", "crown", "prince", "pope", 0]
      ];

      phrases.forEach(function(p) {
        for (var i = 0; i < 6; i++) {
          for (var j = 0; j < occurences[i].length-1; j++) {
            if (p.toLowerCase().includes(occurences[i][j])) {
              occurences[i][occurences[i].length-1]++;
            }
          }
        }
      });

      const maximum = Math.max.apply(Math, occurences.map(x => x[x.length-1]));

      occurences = occurences.filter(x => x[x.length-1] === maximum);

      var symbol;

      if (occurences.length === 6) {
        symbol = "p";
      } else {
        symbol = occurences[Math.floor(Math.random()*occurences.length)][0].slice(0, 1);
      }

      if (this.state.white) {
        symbol = symbol.toUpperCase();
      }

      var square = userSaid.split(" ");
      square = square[square.length - 1];

      console.log(maximum, symbol, occurences, square);

      const id = this.state.gameId;

      this.state.fenBoard.forEach(function(row, i) {
        row.forEach(function(p, j) {
          const uci = ("abcdefgh".slice(j, j+1) + (8-i) + square).toLowerCase();
          if (p === symbol && !(symbol.toLowerCase() === "p" && Math.abs("abcdefgh".indexOf(uci[0]) - "abcdefgh".indexOf(uci[2])) > 1)) {
            console.log(uci);
            fetch('https://lichess.org/api/bot/game/'+id+'/move/'+uci, {
              method: 'POST',
              headers: {
                'Accept': 'application',
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json',
              },
            })
          }
        });
      });
    }
  }

  moveCommand (piece, where) {

  }

  gameState (callback) {
    fetch('https://lichess.org/api/account/playing', {
      method: 'GET',
      headers: {
        'Accept': 'application',
        'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(data => {
      // console.log(data)
      if (hasToken && data.nowPlaying) {
        if (data.nowPlaying.length) {
          this.setState({
            board: true,
            turn: data.nowPlaying[0].isMyTurn,
            white: data.nowPlaying[0].color === "white",
            fen: data.nowPlaying[0].fen,
            fenBoard: new FENBoard(data.nowPlaying[0].fen).board,
            gameId: data.nowPlaying[0].gameId,
            lastMove: data.nowPlaying[0].lastMove,
            needsToken: 2,
          }, callback)
        } else {
          this.setState({
            needsToken: 1,
          })
        }
        
        setTimeout(function() {
          this.gameState(function () {
            // console.log(this.state)
            annyang.state = this.state;
          });
        }.bind(this), 1000);
      } else {
        this.setState({
          needsToken: 0,
        })
      }
    })
  }
  
  render() {
    return (
      <Board 
        hello={this.state.hello} 
        fen={this.state.fen} 
        size={this.state.size} 
        white={this.state.white} 
        stage={["Please add your lichess.org personal access token to the current url - ?token=YOUR_API_TOKEN", "Join a game on lichess.org to begin!", "Speech Recognition Chess"][this.state.needsToken]}
      />
    );
  }

}


export default App;
