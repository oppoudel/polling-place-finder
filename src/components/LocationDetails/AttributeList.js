import React from 'react';
import { List, Segment, Header } from 'semantic-ui-react';
import { format, parse } from 'date-fns';

export default ({ attributes }) => {
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
            <List.Content>Ward Precinct: {attributes.PRECINCTID}</List.Content>
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
                format(parse(attributes.RegistrationDate), 'MM/DD/YYYY')}
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
          <List.Icon name="user outline" />
          <List.Content>
            <List.Content>Council Member: {attributes.COUNC_REP}</List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="map" />
          <List.Content>
            <List.Content>
              State Legislative District: {attributes.LEG_DIST}
            </List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="user" />
          <List.Content>
            <List.Content>
              State Representative: {attributes.LEG_REP}
            </List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="map outline" />
          <List.Content>
            <List.Content>
              Congress District: {attributes.CONGR_DI_1}
            </List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="user outline" />
          <List.Content>
            <List.Content>
              Congressional Representative: {attributes.CONGR_REP}
            </List.Content>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
};
