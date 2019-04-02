export default config => {
  // const { access_token } = JSON.parse(localStorage.getItem('token')) || {
  //   access_token: '',
  // };
  const { getTokenInfo } = config;
  const { access_token } = getTokenInfo();
  config.headers.authorization = `Bearer ${access_token}`;
  return config;
};
