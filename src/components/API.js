export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorizationToken = headers.authorization; // не знаю пока
  }
}
