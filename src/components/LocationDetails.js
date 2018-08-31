import React, { Component } from 'react';
import { List, Segment, Header } from 'semantic-ui-react';
import { queryFeatures } from '@esri/arcgis-rest-feature-service';
import isEqual from 'react-fast-compare';
import { format } from 'date-fns';
import { wardPrecinctURL } from '../config';

export default class LocationDetails extends Component {
  state = {
    attributes: {}
  };
  componentDidMount = () => {
    this.runQueryFeatures();
  };
  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.runQueryFeatures();
    }
  }
  getFeatures = item => {
    const { x, y } = this.props;
    return queryFeatures({
      url: item,
      geometryType: 'esriGeometryPoint',
      geometry: [x, y],
      inSR: { wkid: 4326 },
      returnGeometry: false,
      spatialRel: 'esriSpatialRelIntersects'
    });
  };

  runQueryFeatures = () => {
    const { x, y } = this.props;
    if (x && y) {
      this.getFeatures(wardPrecinctURL).then(feature => {
        if (feature.features.length > 0) {
          this.setState({
            attributes: feature.features[0].attributes
          });
        } else {
          this.setState({ features: [] });
        }
      });
    }
  };

  render() {
    const { attributes } = this.state;
    return (
      <Segment>
        <Header as="h3">Polling Place Information</Header>
        <List>
          <List.Item>
            <List.Icon name="building" />
            <List.Content>
              <List.Header>{attributes.Polling_Place_Name}</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="map marker alternate" />
            <List.Content>
              <List.Header>
                {attributes.Polling_Place_Address}, {attributes.ZIPCODE}
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="wheelchair" />
            <List.Content>{attributes.HANDICAP}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="address book" />
            <List.Content>{attributes.CONTACT}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="phone" />
            <List.Content>
              {attributes.PHONE &&
                attributes.PHONE.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="mail" />
            <List.Content>
              <a href={`mailto:${attributes.EMAIL}`}>{attributes.EMAIL}</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="linkify" />
            <List.Content>
              <List.Content>Precinct: {attributes.PRECINCTID}</List.Content>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="calendar" color="blue" />
            <List.Content>
              <List.Content>
                Next Election Date:{' '}
                {attributes.NextElectionDate &&
                  format(attributes.NextElectionDate, 'MM/DD/YYYY')}
              </List.Content>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="calendar" color="red" />
            <List.Content>
              <List.Content>
                Registration End Date:{' '}
                {attributes.RegistrationDate &&
                  format(attributes.RegistrationDate, 'MM/DD/YYYY')}
              </List.Content>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="map outline" />
            <List.Content>
              <List.Content>
                Council District: {attributes.COUNC_DIS}
              </List.Content>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="user" />
            <List.Content>
              <List.Content>
                Council Member: {attributes.COUNC_REP}
              </List.Content>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    );
  }
}
