import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import ReactDOM from 'react-dom';
var dragula = require('react-dragula');

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://ec2-3-19-188-25.us-east-2.compute.amazonaws.com:4001",

      color: 'white',

      cards: [],
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      c1img: "temp.png",
      c2img: "temp.png",
      c3img: "temp.png",
      c4img: "temp.png",
      c5img: "temp.png",
      c6img: "temp.png"

    };
  }
  componentDidMount() {
    var url = "";
    var userN = "";
    let currentComponent = this;
    if (this.state.logged_in) {
      fetch('http://ec2-3-19-188-25.us-east-2.compute.amazonaws.com:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
          return json.username
        })
        .then(function(un) {
          userN = un;
          url = 'https://deckofcardsapi.com/api/deck/rmh4zzx9bvro/pile/' + un + '/list/';
          return fetch(url)

          .catch(console.log)
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          console.log(json);
          currentComponent.setState({ cards: json });
          return json.piles[userN]
        })
        .then(function(pic) {
          currentComponent.setState({ c1img: pic.cards[0].image})
          currentComponent.setState({ c2img: pic.cards[1].image})
          currentComponent.setState({ c3img: pic.cards[2].image})
          currentComponent.setState({ c4img: pic.cards[3].image})
          currentComponent.setState({ c5img: pic.cards[4].image})
          currentComponent.setState({ c6img: pic.cards[5].image})
          console.log("HERE -->" + pic + "<")
        })
        .catch(console.log);

    }
    // var initWidth = document.getElementById("mainBody").offsetWidth;
    // var initHeight = document.getElementById("mainBody").offsetHeight;
    // var newWidth = initWidth / initWidth;
    // var newHeight = initHeight / initHeight;
    //
    // if (initWidth < initHeight) {
    //   document.getElementById("zoomID").style.transform = "scale(" + newWidth + ")";
    // }
    // else {
    //   document.getElementById("zoomID").style.transform = "scale(" + newHeight + ")";
    // }
    // document.getElementById("mainBody").style.height = window.innerHeight - 60;
    //
    // console.log(window.innerHeight);
    // window.addEventListener("resize", function(){
    //   document.getElementById("mainBody").style.height = window.innerHeight - 60;
    //   console.log(document.getElementById("mainBody").offsetWidth + " : " + initWidth);
    //   console.log(document.getElementById("mainBody").offsetHeight + " : " + initHeight);
    //   var width = document.getElementById("mainBody").offsetWidth;
    //   var height = document.getElementById("mainBody").offsetHeight;
    //   newWidth = width / initWidth;
    //   newHeight = height / initHeight;
    //   if (width < height) {
    //     newHeight = newWidth
    //     document.getElementById("zoomID").style.transform = "scale(" + newWidth + ")";
    //   }
    //   else {
    //     newWidth = newHeight;
    //     document.getElementById("zoomID").style.transform = "scale(" + newHeight + ")";
    //   }
    // });
    var container = ReactDOM.findDOMNode(this);
    dragula([container]);
  }

  handle_login = (e, data) => {
    var url = "";
    var userN = "";
    let currentComponent = this;
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
        return json.user.username;
      })
      .then(function(un) {
        userN = un;
        url = 'https://deckofcardsapi.com/api/deck/rmh4zzx9bvro/pile/' + un + '/list/';
        return fetch(url)

        .catch(console.log)
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
        currentComponent.setState({ cards: json });
        return json.piles[userN]
      })
      .then(function(pic) {
        currentComponent.setState({ c1img: pic.cards[0].image})
        currentComponent.setState({ c2img: pic.cards[1].image})
        currentComponent.setState({ c3img: pic.cards[2].image})
        currentComponent.setState({ c4img: pic.cards[3].image})
        currentComponent.setState({ c5img: pic.cards[4].image})
        currentComponent.setState({ c6img: pic.cards[5].image})
        console.log("HERE -->" + pic + "<")
      })
      .catch(console.log);
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
          username: json.username,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '', id: 0 });
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

    var url = 'https://deckofcardsapi.com/api/deck/rmh4zzx9bvro/pile/' + this.state.username + '/list/'
    fetch(url)
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
      var test = this.state.username
      //console.log(this.state.cards.piles["super"])
      console.log(this.state.cards.piles[this.state.username].cards[0].image)
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

    const imageClick = () => {
      console.log('Click');
    }

    const large = (t) => {
      document.getElementById(t).style.transform = "scale(1.5)"
    }
    const normal = (t) => {
      document.getElementById(t).style.transform = "scale(1.0)"
    }
    const small = (t) => {
      document.getElementById(t).style.transform = "scale(0.5)"
    }

    return (
      <div>
        <nav id="navBar" class="navbar navbar-expand-lg navbar-dark bg-dark">
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
                    ? `Hello, ${this.state.username}`
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

        {this.state.logged_in
            ? <div>
                <div style={{ textAlign: "center" }}>
                  <button onClick={() => this.send() }>Change Color</button>
                  <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                  <button id="red" onClick={() => this.setColor('red')}>Red</button>
                </div>
                <div id="boardDiv">
                  <div id="mainDiv">
                    <div class="deck" id="p1Deck">
                      <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card1" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card2" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card3" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card4" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card5" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card6" onClick={() => imageClick()}></img>
                      </div>
                      <div class="deck" id="p2Deck">
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card1" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card2" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card3" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card4" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card5" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card6" onClick={() => imageClick()}></img>
                      </div>
                      <div class="deck container" id="p3Deck">
                        <img class="cardImg" src={this.state.c1img} alt="Card1" onClick={() => imageClick()}></img>
                        <img class="cardImg" src={this.state.c2img} alt="Card2" onClick={() => imageClick()}></img>
                        <img class="cardImg" src={this.state.c3img} alt="Card3" onClick={() => imageClick()}></img>
                        <img class="cardImg" src={this.state.c4img} alt="Card4" onClick={() => imageClick()}></img>
                        <img class="cardImg" src={this.state.c5img} alt="Card5" onClick={() => imageClick()}></img>
                        <img class="cardImg" src={this.state.c6img} alt="Card6" onClick={() => imageClick()}></img>
                      </div>
                      <div class="deck" id="p4Deck">
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card1" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card2" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card3" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card4" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card5" onClick={() => imageClick()}></img>
                        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png" alt="Card6" onClick={() => imageClick()}></img>
                      </div>
                      <div id="playingField">

                      </div>
                    </div>
                  </div>
                </div>
            : <div>
              {form}
              </div>}
      </div>
    )
  }
}
export default App;
