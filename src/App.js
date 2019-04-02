import React, { useState, useEffect, useRef } from 'react';
import api from './lib/api';
import './App.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const config = {
    baseURL: 'http://localhost:8000',
    getTokenInfo: () =>
      JSON.parse(localStorage.getItem('token')) || { access_token: '' },
    setTokenInfo: tokenInfo =>
      localStorage.setItem('token', JSON.stringify(tokenInfo)),
  };
  const API = api(config);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  useInterval(async () => {
    const response = await API.get('/');
    const msg = response && response.data ? response.data.message : 'Fuck';
    setMessage(msg);
    setCount(count + 1);
  }, 5000);

  const handleLoginClick = event => {
    event.preventDefault();
    const data = { username, password };
    API.post('/login', data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <div>
            <input
              type="text"
              onChange={event => setUsername(event.target.value)}
              name="username"
              value={username}
            />
            <input
              type="password"
              onChange={event => setPassword(event.target.value)}
              name="password"
              value={password}
            />
          </div>
          <button type="submit" onClick={handleLoginClick}>
            Login
          </button>
        </div>
        <div>
          Attempt no {count} with message: {message}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default App;
