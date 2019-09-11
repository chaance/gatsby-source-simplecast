const fetch = require('node-fetch');

class Simplecast {
  constructor({ token, podcastId }) {
    this.token = token;
    this.podcastId = podcastId;
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    this.baseUrl = `https://api.simplecast.com/podcasts/${this.podcastId}`;
  }

  setHeaders = (headers = {}) => {
    // extract auth values to avoid potential bugs
    const { Authorization, authorization, ...newHeaders } = headers;
    const { currentHeaders } = this;
    this.headers = {
      ...currentHeaders,
      ...newHeaders,
    };
  };

  request = (path = '', params = {}, method = 'GET') => {
    // TODO: let query = qs.stringify(params) || '';
    const url = this.baseUrl + path;
    return fetch(url, {
      method,
      headers: this.headers,
      cache: 'default',
    });
  };

  getEpisodes = () => {
    return this.request('/episodes')
      .then(res => res.json())
      .then(info => info.collection)
      .catch(console.error);
  };
}

module.exports = Simplecast;
