import React, { Component } from 'react';

export default class KushyApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const filters = [];
    const section = steps.sections.value;
    if(section == 'products') {

      const search = steps.products.value;
      let product_filter = `filters[category][contains]=${search}`;
      filters.push(product_filter);
      
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
    var filter_string = filters.join('&');

    console.log(filter_string);

    const queryUrl = `http://api.kushy.net/api/1.1/tables/${section}/rows/?${filter_string}`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText);
        let total = data.meta.total;
        if(total > 0) {

          let results = [];
          data.data.forEach(function(s) {
            results.push(s.name);
          });
          // let result_list = results.join(', ');
          const result_list = results.map((name) =>
            <li>{name}</li>
            );

          if(total >= 20) { total = '20 or more'}

          const result_msg = `I found ${total} products.`;

          results = {
            msg:  result_msg,
            list: result_list
          };

          console.log(results);

          self.setState({ loading: false, result: results });

        } else {
          self.setState({ loading: false, result: 'Not found.' });
        }
      }
    }

    xhr.open('GET', queryUrl);
    xhr.send();
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="kushyapi">
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
                onClick={() => this.triggetNext()}
              >
                Search Again
              </button>
            }
          </div>
        }
      </div>
    );
  }
}