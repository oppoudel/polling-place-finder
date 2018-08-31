import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import { requestOptions } from './config';
import Geocoder from './components/Geocoder/Geocoder';
import LocationTracker from './components/LocationTracker';
import EsriMap from './components/EsriMap';
import LocationDetailsClient from './components/LocationDetails_Client';

class App extends Component {
  state = {
    mapCenter: {
      x: -76.6,
      y: 39.3
    },
    features: []
  };
  componentDidMount = async () => {
    const data = await queryFeatures(requestOptions);
    this.setState({ features: data.features });
  };
  onXYupdate = (x, y) => {
    this.setState({ mapCenter: { x, y } });
  };
  render() {
    const { mapCenter, features } = this.state;
    return (
      <div>
        <LocationTracker updateXY={this.onXYupdate} />
        <Container>
          <Geocoder updateXY={this.onXYupdate} />
          <EsriMap center={mapCenter} updateXY={this.onXYupdate} />
          <LocationDetailsClient center={mapCenter} features={features} />
        </Container>
      </div>
    );
  }
}

export default App;
