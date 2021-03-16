import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Tables from './components/Tables';
import styled from 'styled-components';
import { useState } from 'react';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const App = () => {
  const [loginName, setLoginName] = useState('Grin');

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
