import React from 'react';
import './styles.css';


// Banner component
class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <h1>Zip Code Search</h1>
      </div>
    );
  }
}

class ZipCodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      cityInfo: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  fetchZipCodeInfo(zipCode) {
    // fetch zip code information
    if(zipCode.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          const array = json.map(function(city) {
            return {
              locationText: city.LocationText,
              state: city.State,
              location: `(${city.Lat}, ${city.Long})`,
              population: city.EstimatedPopulation,
              totalWages: city.TotalWages,
            }});
          return array;
        }).then(function(zipInfo) {
          console.log(zipInfo);
          const cards = zipInfo.map(city => <CityCard data={city} />);
          this.setState({
            cityInfo: cards,
          });
        }).catch(function(ex) {
          console.log(ex);
          return "Cannot Resolve";
        });
    }
  }

  handleChange(event) {
    this.fetchZipCodeInfo(event.target.value);
  }

  render() {
    return (
      <div>
          <form className="zipform">
            <label>
              <b>Zip Code: </b>
            </label>
            <input type="text" placeholder={"try 10001"} onChange={this.handleChange} />
          </form>
      </div>
    );
  }
}

class CityCard extends React.Component {
  render() {
    // render city information
    const { data } = this.props;

    return (
      <div>
        <div className="citycard">
          <div className="citycardheader">{data.locationText}</div>
          <div>
            <ul>
              <li>State: {data.state}</li>
              <li>Location: {data.location}</li>
              <li>Population (estimated): {data.population}</li>
              <li>Total Wages: {data.totalWages}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

// App component
export class App extends React.Component {
  // main app component
  render() {
    return (
      <div>
        <Banner />
        <ZipCodeForm />
      </div>
    );
  }
}
