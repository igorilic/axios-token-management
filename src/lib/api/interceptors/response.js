export default response => {
  const { data, status, config } = response;
  const { setTokenInfo } = config;
  if (status === 200 && data && data.token) {
    const token = { access_token: data.token };
    setTokenInfo(token);
  }
  return response;
};
