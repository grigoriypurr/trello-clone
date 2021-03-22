import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Board from './components/Board';
import { StyledApp } from './styled';
import { useStateWithLocalStorage } from './hooks';

const App = () => {
  const [userName, setUserName] = useStateWithLocalStorage('', 'userName');

  return (
    <StyledApp>
      <LoginForm setUserName={setUserName} />
      <Header />
      <Board userName={userName} />
    </StyledApp>
  );
};

export default App;