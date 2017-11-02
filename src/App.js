import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';

import Review from './Review';
import KushyApi from './KushyApi';
import ChatBot from 'react-simple-chatbot';



KushyApi.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

KushyApi.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const steps = [
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, what can I help you find today?',
            trigger: 'sections',
          },
          {
            id: 'sections',
            options: [
              { value: 'products', label: 'Products', trigger: '100' },
              { value: 'strains', label: 'Strains', trigger: '5' },
              { value: 'brands', label: 'Brands', trigger: '5' },
              { value: 'shops', label: 'Shops', trigger: '5' },
            ],
          },
          {
            id: '100',
            message: 'What kind of products are you looking for?',
            trigger: 'products',
          },
          {
            id: 'products',
            options: [
              { value: 'concentrates', label: 'Concentrates', trigger: '101' },
              { value: 'edibles', label: 'Edibles', trigger: '102' },
              { value: 'pre-roll', label: 'Pre-rolls', trigger: '150' },
              { value: 'vape', label: 'Vape Cartridges', trigger: '150' },
            ],
          },
          {
            id: '101',
            message: 'What kind of concentrates are you looking for?',
            trigger: 'concentrates',
          },
          {
            id: 'concentrates',
            options: [
              { value: 'bubble hash', label: 'Bubble Hash', trigger: '5' },
              { value: 'crumble', label: 'Crumble', trigger: '5' },
              { value: 'kief', label: 'Kief', trigger: '5' },
              { value: 'oil', label: 'Oil', trigger: '5' },
              { value: 'shatter', label: 'Shatter', trigger: '5' },
              { value: 'wax', label: 'Wax', trigger: '5' },
            ],
          },
          {
            id: '102',
            message: 'What kind of edibles are you looking for?',
            trigger: 'edibles',
          },
          {
            id: 'edibles',
            options: [
              { value: 'candy', label: 'Candy', trigger: '5' },
              { value: 'chocolate', label: 'Chocolate', trigger: '5' },
              { value: 'dressing', label: 'Dressing', trigger: '5' },
              { value: 'drink', label: 'Drink', trigger: '5' },
              { value: 'pill', label: 'Pill', trigger: '5' },
              { value: 'snack', label: 'Snack', trigger: '5' },
              { value: 'spread', label: 'Spread', trigger: '5' },
            ],
          },
          {
            id: '150',
            message: 'Awesome. Do you know what brand it is?',
            trigger: 'product_brands',
          },
          {
            id: 'product_brands',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'product_brand_yes' },
              { value: 'no', label: 'No', trigger: 'product_brand_no' },
            ],
          },
          {
            id: 'product_brand_yes',
            user: true,
            trigger: 'product_brand_query',
          },
          {
            id: 'product_brand_no',
            message: 'No worries.',
            trigger: 'product_brand_query',
          },
          {
            id: 'product_brand_query',
            message: 'Cool. Let me look that up.',
            trigger: 'product_brands_search',
          },
          {
            id: 'product_brands_search',
            component: <KushyApi />,
            waitAction: true,
            trigger: '1',
          },
          {
            id: '5',
            message: 'Awesome. Do you know what brand it is?',
            trigger: 'product_brands',
          },
        ];

const wiki_steps = [
      {
        id: '1',
        message: 'Type something to search for a strain. (Ex.: Blue)',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        component: <KushyApi />,
        waitAction: true,
        trigger: '1',
      },
    ];


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
           <ChatBot steps={steps} />
        </p>
      </div>
    );
  }
}

export default App;
