import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Tables from './components/Tables';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const App = () => {
  function useStickyState(defaultValue: any, key: string) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }
  const [loginName, setLoginName] = useStickyState('', 'login');

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLoginName(e.currentTarget.value);
  };

  return (
    <StyledApp>
      <Login onInputChange={(e) => onInputChange(e)} loginName={loginName} />
      <Header />
      <Tables loginName={loginName} />
    </StyledApp>
  );
};

export default App;
