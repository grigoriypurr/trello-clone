import Header from './components/Header/Header';
import './App.css';
import Tables from './components/Tables';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const App = () => {
  return (
    <StyledApp>
      <Header />
      <Tables />
    </StyledApp>
  );
};

export default App;
