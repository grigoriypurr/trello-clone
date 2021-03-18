import Popup from 'reactjs-popup';
import styled from 'styled-components';

export const StyledPopup = styled(Popup)`
  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
  &-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    min-width: 30vw;
    max-width: 80vw;
    background-color: white;
    border: 2px solid black;
    padding: 30px;
  }
`;
export const StyledCloseButton = styled.button`
  cursor: pointer;
  margin-top: 50px;
  padding: 20px 40px;
  font-size: 20px;
`;
export const Input = styled.textarea`
  width: 400px;
  overflow-wrap: break-word;
  resize: none;
  overflow: hidden;
  white-space: normal;
`;
