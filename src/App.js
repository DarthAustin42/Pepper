import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://ec2-3-19-188-25.us-east-2.compute.amazonaws.com:4001",

      color: 'white',

      cards:[],
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      id: 0

    };
  }
  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://ec2-3-19-188-25.us-east-2.compute.amazonaws.com/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
          this.setStat({ id: json.id });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://ec2-3-19-188-25.us-east-2.compute.amazonaws.com:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://ec2-3-19-188-25.us-east-2.compute.amazonaws.com:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

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

    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">Pepper</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
            </ul>
            <div>
              <span class="navbar-text">
                <h5 id="loginGreetText">{this.state.logged_in
                    ? `Hello, ${this.state.username} (User ${this.state.id})`
                    : 'Please Sign In'}</h5>
                <Nav
                  logged_in={this.state.logged_in}
                  display_form={this.display_form}
                  handle_logout={this.handle_logout}
                />
              </span>
            </div>
          </div>
        </nav>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => this.send() }>Change Color</button>

          <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
          <button id="red" onClick={() => this.setColor('red')}>Red</button>
          {form}
        </div>
      </div>
    )
  }
}
export default App;
