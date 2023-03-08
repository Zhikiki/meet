// THIS IS THE BRRENCH WHEN I FINISHED INTEGRATION TESTS, INTEGRATED API AND DEBUGGED TROUBLES WITH ()

//  This function takes an events array, then uses map to create a new array with only locations.
//  It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
//  The Set will remove all duplicates from the array.
import { mockData } from './mock-data';
import axios from 'axios';
//import NProgress from 'nprogress';

// What this function does is check whether there’s a path,
// then build the URL with the current path
// (or build the URL without a path using window.history.pushState()).
// removes the code from the URL once you’re finished with it
// used in get events with valid token
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

// takes the access token which was found bellow in the code
// checks wheather it is valid (returns response) or not (catches error)
export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const getEvents = async () => {
  // shows users that the application is loading data when it tries to access the Google Calendar API
  //NProgress.start();
  // If we are using local host, we'll get events from mockData
  if (window.location.href.startsWith('http://localhost')) {
    //NProgress.done();
    return mockData;
  }

  // Returns cashed data when user is ofline
  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents');
    console.log(JSON.parse(data));
    //NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  // First we need to wait for results of getAccessToken() - funktion writen bellow
  const token = await getAccessToken();

  if (token) {
    // removes the code from the URL once you’re finished with it
    removeQuery();
    // if token exists, we make a call to Lambda endpoint with axios
    const url =
      'https://zzgiz9xeii.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    // const getEventsLambdaEP =
    //   'https://zzgiz9xeii.execute-api.eu-central-1.amazonaws.com/dev/api/get-events';
    // const url = `${getEventsLambdaEP}/${token}`;

    const result = await axios.get(url);
    // if API call (axios) was siccessful, we get data with events
    if (result.data) {
      // we send events to extractLocations() - to get all avaliable locations
      var locations = extractLocations(result.data.events);
      // we save results of API call in local storage (events & locations)
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    //NProgress.done();
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  // Checks if token exists in local storage of the user
  const accessToken = localStorage.getItem('access_token');

  // Checks if token (whwn it is found) is valid
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // If token is not found or it is not valid
  if (!accessToken || tokenCheck.error) {
    // We remove any vercion of token (if it exists)
    await localStorage.removeItem('access_token');
    // We check for authorisation code
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    // If no authorisation code is found, user is redirected to Google auth screen
    // there they can sign in and receive their code
    if (!code) {
      const results = await axios.get(
        'https://zzgiz9xeii.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

// function is called bellow, when
// there is no valid token, there is a code (URI)
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    // eslint-disable-next-line no-useless-concat
    'https://zzgiz9xeii.execute-api.eu-central-1.amazonaws.com/dev/api/token' +
      '/' +
      encodeCode
  )
    // const getTokenLambdaEP =
    //   'https://zzgiz9xeii.execute-api.eu-central-1.amazonaws.com/dev/api/token';
    // const { access_token } = await fetch(`${getTokenLambdaEP}/${encodeCode}`)
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);
  // If token is successfuly fetched, we are saving it in local storage for future needs
  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};
