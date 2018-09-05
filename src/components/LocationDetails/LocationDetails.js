import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import isEqual from 'react-fast-compare';
import { point } from '@turf/helpers';
import booleanContains from '@turf/boolean-contains';
import isEmpty from 'lodash.isempty';
import AttributeList from './AttributeList';

export default class LocationDetails_Client extends Component {
  state = {
    attributes: {},
    Polling_Place_Address: null
  };

  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.getAttributes();
    }
  }

  getAttributes = () => {
    const {
      features,
      center: { x, y }
    } = this.props;
    const location = point([x, y]);
    if (!isEmpty(features)) {
      const feature = features.filter(feature =>
        booleanContains(feature, location)
      );
      if (feature.length > 0) {
        this.setState({
          attributes: feature[0].properties,
          Polling_Place_Address: feature[0].properties.Polling_Place_Address
        });
      } else {
        this.setState({ attributes: {} });
      }
    }
  };

  render() {
    const { attributes } = this.state;
    const { updated } = this.props;
    return updated && !isEmpty(attributes) ? (
      <AttributeList attributes={attributes} />
    ) : updated ? (
      <Message error>
        There is no Polling Place information for this location. If you think
        this is an error, please email us at
        <a href="mailto:gis@baltimorecity.gov"> gis@baltimorecity.gov</a> .
      </Message>
    ) : null;
  }
}
