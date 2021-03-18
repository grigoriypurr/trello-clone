import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Board from './components/Tables';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export function useStateWithLocalStorage(defaultValue: any, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

const App = () => {
  const [loginName, setLoginName] = useStateWithLocalStorage('', 'loginName');

  return (
    <StyledApp>
      <Login setLoginName={setLoginName} />
      <Header />
      <Board loginName={loginName} />
    </StyledApp>
  );
};

export default App;
