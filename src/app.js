import React from 'react';
import './styles.css';

// App component
export class App extends React.Component {
  render() {
    return (
      <div>
        <Banner />
        <Field />
        <CityCard />
      </div>
    );
  }
}

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

class Field extends React.Component {
  render() {
    return (
      <form>
        <label>Zip Code:</label>
        <input type="text"></input>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class CityCard extends React.Component {
  render() {
    return <p>City Info Goes Here</p>;
  }
}
