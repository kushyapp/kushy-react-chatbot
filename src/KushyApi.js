import React, { Component } from 'react';

export default class KushyApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
      section: '',
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const filters = [];
    const section = steps.sections.value;
    const name = steps.name.value;

    // Products
    if(section == 'products') {

      const search = steps.products.value;
      if(search !== 'search') {
        let product_filter = `filters[category][contains]=${search}`;
        filters.push(product_filter);

        if(steps.product_brands.value === 'yes') {
          let subcat_filter = `filters[brand][contains]=${steps.product_brand_yes.value}`;
          filters.push(subcat_filter);
        }
      } else {
        let product_filter = `filters[name][contains]=${steps.product_search_prompt.value}`;
        filters.push(product_filter);
      }
      
      let subcategory = '';
      switch(search){
        case 'concentrates':
          subcategory = steps.concentrates.value;
          break;
        case 'edibles':
          subcategory = steps.edibles.value;
          break;
      }
      if(subcategory != '') {
        let subcat_filter = `filters[category][contains]=${subcategory}`;
        filters.push(subcat_filter);
      }
    }
    // Products
    if(section == 'strains') {

      const search = steps.strains.value;
      if(search != 'help-strain-type') {
        let strain_filter = `filters[type]=${search}`;
        filters.push(strain_filter);
      }

      if(steps.strain_search_bool.value == 'yes') {
        let strain_search = `filters[name][contains]=${steps.strain_search.value}`;
        filters.push(strain_search);
      }

    }
    // Brands
    if(section == 'brands') {
      console.log(steps);
      if(steps.brands_bool.value == 'yes') {
        let strain_search = `filters[name][contains]=${steps.brand_search.value}`;
        filters.push(strain_search);
      } else {
        if(steps.brands_search_bool.value == 'name') {
          let strain_search = `filters[name][contains]=${steps.brand_search.value}`;
          filters.push(strain_search);
        }
        if(steps.brands_search_bool.value == 'category') {
          let strain_search = `filters[category][contains]=${steps.brand_search.value}`;
          filters.push(strain_search);        
        }
      }

    }

    var filter_string = filters.join('&');

    console.log(filter_string);

    const queryUrl = `http://api.kushy.net/api/1.1/tables/${section}/rows/?${filter_string}`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText);
        let total = data.meta.total;
        console.log(total);
        if(total > 0) {
          console.log('greater than zero!');
          let results = [];
          data.data.forEach(function(s) {
            results.push(s.name);
          });
          // let result_list = results.join(', ');
          const result_list = results.map((name) =>
            <li>{name}</li>
            );

          if(total >= 20) { total = '20 or more'}

          const result_msg = `I found ${total} ${section}.`;

          results = {
            msg:  result_msg,
            list: result_list
          };

          console.log(results);

          self.setState({ loading: false, result: results, section: section, name: name });

        } else {
          const result_msg = `Sorry, I couldn't find anything that matched your search.`;
          const result_list = [];
          let results = {
            msg:  result_msg,
            list: result_list
          };
          self.setState({ loading: false, result: results, section: section, name: name });
        }
      }
    }

    xhr.open('GET', queryUrl);
    xhr.send();
  }

  triggetNext(triggerData) {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep(triggerData);
    });
  }

  render() {
    const { trigger, loading, result, section, name } = this.state;
    
    let trigger_search = 1;
    switch(section) {
      case 'products':
        trigger_search = 100;
        break;
      case 'strains':
        trigger_search = 200;
        break;
      case 'brands':
        trigger_search = 'brands';
        break;
    }

    const section_title = section.charAt(0).toUpperCase() + section.slice(1);
    

    return (
      <div className="kushy_results">
        { loading ? 'Loading' : result.msg }
        { loading ? '' : result.list }
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
              <button
                onClick={() => this.triggetNext({ value: name, trigger: '3'})}
              >
                Start Over
              </button>
            }
            {
              !trigger &&
              <button
                onClick={() => this.triggetNext({ value: 'startover', trigger: trigger_search})}
              >
                Search {section_title} Again
              </button>
            }
          </div>
        }
      </div>
    );
  }
}