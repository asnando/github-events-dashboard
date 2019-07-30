const encodeQueryStringParams = params => Object.keys(params)
  .map(param => `${param}=${params[param]}`)
  .join('&');

export default encodeQueryStringParams;
