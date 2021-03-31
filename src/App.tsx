import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Board from './components/Board';
import { StyledApp } from './styled';
import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState('');

  return (
    <StyledApp>
      <LoginForm setUser={setUser} />
      <Header />
      <Board userName={user} />
    </StyledApp>
  );
};

export default App;
