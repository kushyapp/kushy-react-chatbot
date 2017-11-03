import React, { Component } from 'react';
import PropTypes from 'prop-types';

import KushyApi from '../KushyApi';

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
            id: '5',
            message: 'Placholder',
            trigger: 'sections',
          },
          {
            id: 'sections',
            options: [
              { value: 'products', label: 'Products', trigger: '100' },
              { value: 'strains', label: 'Strains', trigger: '200' },
              { value: 'brands', label: 'Brands', trigger: 'brands' },
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
              { value: 'search', label: 'Search by name', trigger: 'product_search_prompt' },
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
              { value: 'bubble hash', label: 'Bubble Hash', trigger: '150' },
              { value: 'crumble', label: 'Crumble', trigger: '150' },
              { value: 'kief', label: 'Kief', trigger: '150' },
              { value: 'oil', label: 'Oil', trigger: '150' },
              { value: 'shatter', label: 'Shatter', trigger: '150' },
              { value: 'wax', label: 'Wax', trigger: '150' },
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
              { value: 'candy', label: 'Candy', trigger: '150' },
              { value: 'chocolate', label: 'Chocolate', trigger: '150' },
              { value: 'dressing', label: 'Dressing', trigger: '150' },
              { value: 'drink', label: 'Drink', trigger: '150' },
              { value: 'pill', label: 'Pill', trigger: '150' },
              { value: 'snack', label: 'Snack', trigger: '150' },
              { value: 'spread', label: 'Spread', trigger: '150' },
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
            trigger: ({ value, steps }) => value,
          },
          {
            id: 'product_search_prompt',
            user: true,
            trigger: 'product_brands_search',
          },
          {
            id: '200',
            message: 'What kind of strain are you looking for?',
            trigger: 'strains',
          },
          {
            id: 'strains',
            options: [
              { value: 'indica', label: 'Indica', trigger: '201' },
              { value: 'sativa', label: 'Sativa', trigger: '201' },
              { value: 'hybrid', label: 'Hybrid', trigger: '201' },
              { value: 'help-strain-type', label: 'What?', trigger: 'help-strain-type' },
            ],
          },
          {
            id: '201',
            message: 'Do you know the name of the strain you\'re looking for?',
            trigger: 'strain_search_bool',
          },
          {
            id: 'strain_search_bool',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'strain_search' },
              { value: 'no', label: 'No', trigger: '204' },
            ],
          },
          {
            id: 'strain_search',
            user: true,
            trigger: 'strain_search_response',
          },
          {
            id: 'strain_search_response',
            message: 'Sounds dank. Let me look that up.',
            trigger: 'product_brands_search',
          },
          {
            id: '204',
            message: 'How would you like to find a strain?',
            trigger: '205',
          },
          {
            id: '205',
            options: [
              { value: 'strain-flavor', label: 'Flavor', trigger: '201' },
              { value: 'strain-effects', label: 'High', trigger: '201' },
              { value: 'strain-medical', label: 'Medical Benefits', trigger: '201' },
            ],
          },
          {
            id: 'help-strain-type',
            message: 'Cannabis often comes classified in 3 major categories: indica, sativa, and hybrid.',
            trigger: 'help-strain-type-1',
          },
          {
            id: 'help-strain-type-1',
            message: 'Would you like to learn more about them?',
            trigger: 'help-strain-type-2',
          },
          {
            id: 'help-strain-type-repeat',
            message: 'Is there anything else you want to learn?',
            trigger: 'help-strain-type-2',
          },
          {
            id: 'help-strain-type-2',
            options: [
              { value: 'indica', label: 'Indica?', trigger: 'help-strain-type-indica' },
              { value: 'sativa', label: 'Sativa?', trigger: 'help-strain-type-sativa' },
              { value: 'hybrid', label: 'Hybrid?', trigger: 'help-strain-type-hybrid' },
              { value: 'help-strain-type', label: 'Nah bro', trigger: '201' },
            ],
          },
          {
            id: 'help-strain-type-indica',
            message: 'Indica strains are generally more body-high orientated, with relaxing buzzes and the stereotypical couchlock stone.',
            trigger: 'help-strain-type-repeat',
          },
          {
            id: 'help-strain-type-sativa',
            message: 'Sativa strains are generally more of a mind-high, with energizing creative vibes and stimulated senses.',
            trigger: 'help-strain-type-repeat',
          },
          {
            id: 'help-strain-type-hybrid',
            message: 'Hybrid strains are generally more of a balance between body and mind high, with relaxing body buzzes and enough energy to counteract couchlock.',
            trigger: 'help-strain-type-repeat',
          },
          {
            id: 'brands',
            message: 'Awesome. Do you know what brand it is?',
            trigger: 'brands_bool',
          },
          {
            id: 'brands_bool',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'brand_search' },
              { value: 'no', label: 'No', trigger: 'brand_bool_no' },
            ],
          },
          {
            id: 'brand_bool_no',
            message: 'No worries. Do you want to search by name or category?',
            trigger: 'brands_search_bool',
          },
          {
            id: 'brands_search_bool',
            options: [
              { value: 'name', label: 'Name', trigger: 'brand_search' },
              { value: 'category', label: 'Category', trigger: 'brand_category' },
            ],
          },
          {
            id: 'brand_category',
            options: [
              { value: 'flower', label: 'Flower', trigger: 'brand_category_search' },
              { value: 'concentrates', label: 'Concentrates', trigger: 'brand_category_search' },
              { value: 'edibles', label: 'Edibles', trigger: 'brand_category_search' },
              { value: 'medical', label: 'Medical', trigger: 'brand_category_search' },
              { value: 'vapes', label: 'Vapes', trigger: 'brand_category_search' },
            ],
          },
          {
            id: 'brand_category_search',
            message: 'Cool, let me find all our {previousValue} brands.',
            trigger: 'product_brands_search',
          },
          {
            id: 'brand_search',
            user: true,
            trigger: 'brand_search_response',
          },
          {
            id: 'brand_search_response',
            message: 'Sounds dank. Let me look that up.',
            trigger: 'product_brands_search',
          },


          {
            id: 'shops',
            message: 'What kind of shop are you looking for?',
            trigger: 'shop_categories',
          },
          {
            id: 'shop_categories',
            options: [
              { value: 'dispensary', label: 'MMJ Dispensary', trigger: 'shop_state_msg' },
              { value: 'recshop', label: 'Rec Shop', trigger: 'shop_state_msg' },
              { value: 'headshop', label: 'Headshop', trigger: 'shop_state_msg' },
              { value: 'doctor', label: 'Doctor', trigger: 'shop_state_msg' },
            ],
          },
          {
            id: 'shop_state_msg',
            message: 'What state do you live in?',
            trigger: 'shop_state',
          },
          {
            id: 'shop_state',
            user: true,
            trigger: 'shop_state_response',
          },
          {
            id: 'shop_state_response',
            message: 'Still adding this feature, check back soon!',
            trigger: '1',
          },

        ];


KushyApi.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

KushyApi.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default steps;