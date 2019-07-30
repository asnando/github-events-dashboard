const decodeParamsStringToObject = (params) => {
  const decoded = {};
  params.split('&').forEach((qs) => {
    const paramName = qs.split('=')[0];
    const paramValue = qs.split('=')[1];
    decoded[paramName] = paramValue;
  });
  return decoded;
};

export default decodeParamsStringToObject;
