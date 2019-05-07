const dev = {
  EndpointRestAPI: 'http://127.0.0.1:3000/api/v1',
  SecretKey: 'S1e23o1r01a2n3g67E3k55s87a3',
}

const prod = {
  EndpointRestAPI: 'http://127.0.0.1:3000/api/v1',
  SecretKey: 'S1e23o1r01a2n3g67E3k55s87a3',
}

export default {
  ...(process.env.REACT_APP_STAGE === 'prod' ? prod : dev), // Default to dev if not set
}
