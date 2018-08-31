export const wardPrecinctURL =
  'https://gis.baltimorecity.gov/egis/rest/services/Election/WardPrecincts_Application/MapServer/0';

export const requestOptions = {
  url: wardPrecinctURL,
  params: {
    f: 'geojson',
    outFields: '*',
    where: '1=1'
  }
};
