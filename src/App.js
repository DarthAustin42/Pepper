import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://ec2-3-19-188-25.us-east-2.compute.amazonaws.com:4001",

      color: 'white',

      cards:[]

    };
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color)
  }

  setColor = (color) => {
    this.setState({ color })
    fetch('https://deckofcardsapi.com/api/deck/c02izkbzt534/pile/P2/list/')
    .then(res => res.json())
    .then((data) => {
        this.setState({ cards: data })
    })
    .catch(console.log)
  }

  render() {

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
      console.log(this.state.cards)
    })

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>

        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>

      </div>
    )
  }
}
export default App;
