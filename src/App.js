import React, { Component } from 'react';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

import steps from './config/steps';

import './App.css';
import logo from './assets/images/kushy-logo-white.svg';
import logo_stayregular from './assets/images/stayregular-logo-black.png';
import logo_kushyapi from './assets/images/kushyapi-logo-black.png';
import logo_chatbot from './assets/images/react-simple-chatbot.svg';
import kushy_avatar from './assets/images/kushy-avatar.png';
import icon_user from './assets/images/icon-user.png';
import './assets/css/main.css';
import './assets/css/bootstrap-grid.min.css';

import chat_styles from './config/chatstyles'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="Header">
          <img src={logo} className="Header-logo" alt="logo" />
        </header>
        <div className="container content">
          <div className="row justify-content-md-center">
            <div className="col">
              <ThemeProvider theme={chat_styles}>
                 <ChatBot 
                    steps={steps} 
                    headerTitle="Kushy Chatbot"
                    placeholder="Type away..."
                    customDelay="500"
                    botAvatar={kushy_avatar}
                    userAvatar={icon_user}
                  />
              </ThemeProvider>
            </div>
          </div>
        </div>
        <footer className="Footer">
          <p className="copy">Created by <a href="http://stayregular.net" className="stayregular"><img src={logo_stayregular} alt="Stay Regular" /></a> using the <a href="http://kushy.net" className="kushyapi"><img src={logo_kushyapi} alt="Kushy API" /></a>.</p>
          <p className="credit">Shoutout to <a href="https://lucasbassetti.com.br/react-simple-chatbot/" className="chatbot"><img src={logo_chatbot} alt="React Simple Chatbot" /></a>.</p>
        </footer>

    </div>
    );
  }
}

export default App;
