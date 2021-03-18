import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Board from './components/Board';
import { useEffect, useState } from 'react';
import { StyledApp } from './styled';

export const useStateWithLocalStorage = (defaultValue: any, key: string) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

const App = () => {
  const [loginName, setLoginName] = useStateWithLocalStorage('', 'loginName');

  return (
    <StyledApp>
      <LoginForm setLoginName={setLoginName} />
      <Header />
      <Board loginName={loginName} />
    </StyledApp>
  );
};

export default App;
