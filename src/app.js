import React from 'react';
import './styles.css';


export class App extends React.Component {
  // main app component class
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  extractCityInfo(json) {
    return {
      locationText: json.LocationText,
      state: json.State,
      location: `(${json.Lat}, ${json.Long})`,
      population: json.EstimatedPopulation,
      totalWages: json.TotalWages
    }
  }

  getCities(json) {
    return json.map(city => this.extractCityInfo(city));
  }

  createCards(zipInfo) {
    if(typeof zipInfo === 'string') {
      return <div className="notfound">Not Found</div>;
    } else {
      return zipInfo.map((city, i) => <CityCard data={city} key={"city_" + i} />);
    }
  }

  fetchZipCodeInfo(zipCode) {
    // fetch zip code information
    if(zipCode.length === 0) {
      this.setState({ cities: [] });
    } else if(zipCode.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCode}`)
        .then(response => response.json()
        ).then(json => this.getCities(json)
        ).then(zipInfo => this.setState({ cities: this.createCards(zipInfo) })
        ).catch(ex => console.log(ex));
    } else {
      this.setState({ cities: this.createCards("Not Found") });
    }
  }

  handleChange(event) {
    this.fetchZipCodeInfo(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="banner">
          <h1>Zip Code Search</h1>
        </div>
        <div>
          <form className="zipform">
            <label>
              <b>Zip Code: </b>
            </label>
            <input type="text" placeholder={"try 10001"} onChange={this.handleChange} />
          </form>
        </div>
        <div>{this.state.cities}</div>
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
