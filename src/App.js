import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import { requestOptions } from './config';
import Geocoder from './components/Geocoder/Geocoder';
import LocationTracker from './components/LocationTracker';
import EsriMap from './components/EsriMap';
import LocationDetails from './components/LocationDetails/LocationDetails';

class App extends Component {
  state = {
    mapCenter: {
      x: -76.6,
      y: 39.3
    },
    updated: false,
    features: []
  };
  componentDidMount = async () => {
    const data = await queryFeatures(requestOptions);
    this.setState({ features: data.features });
  };
  onXYupdate = (x, y) => {
    this.setState({ mapCenter: { x, y }, updated: true });
  };
  render() {
    const { mapCenter, features, updated } = this.state;
    return (
      <div>
        <LocationTracker updateXY={this.onXYupdate} />
        <Container>
          <Geocoder updateXY={this.onXYupdate} />
          <EsriMap center={mapCenter} updateXY={this.onXYupdate} />
          <LocationDetails
            center={mapCenter}
            features={features}
            updated={updated}
          />
        </Container>
      </div>
    );
  }
}

export default App;
