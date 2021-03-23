import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Board from './components/Board';
import { StyledApp } from './styled';
import { useStateWithLocalStorage } from './hooks';
import { useState } from 'react';

const App = () => {
  const [userName, setUserName] = useState('');

  return (
    <StyledApp>
      <LoginForm setUserName={setUserName} />
      <Header />
      <Board userName={userName} />
    </StyledApp>
  );
};

export default App;
