import Popup from 'reactjs-popup';
import styled from 'styled-components';

export const StyledPopup = styled(Popup)`
  &-overlay {
   
  }
  &-content {
    background-color: purple;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 50vh;
    min-width: 30vw;
    max-width: 30vw;
    max-height:80vh;
    background-color: white;
    border: 2px solid black;
    padding: 30px;
    overflow-x: hidden; 
    overflow-y: auto; 
  }
`;
export const FlexBox = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: ${(props: { justifyContent?: string }) =>
    props.justifyContent};
`;
export const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const StyledButton = styled.button`
  margin-top: ${(props: { marginTop?: string; alignSelf?: string }) =>
    props.marginTop};

  align-self: ${(props: { alignSelf?: string; margin?: string }) =>
    props.alignSelf};
  cursor: pointer;
  padding: 3px 7px;
  font-size: 14px;
`;
export const StyledCardTitle = styled.div`
  margin: 0px;
  white-space: normal;
  word-break: break-all;
`;

export const Input = styled.textarea`
  font-size: 16px;
  width: 100%;
  overflow-wrap: break-word;
  resize: none;
  overflow: hidden;
  white-space: normal;
`;
export const StyledDescription = styled.div`
  cursor: pointer;
  width: 100%;
  min-height: 50px;
  background-color: lightgray;
`;
export const StyledSpan = styled.span`
  color: lightgrey;
  font-size: 12 px;
`;
export const StyledSpanWithUnderline = styled(StyledSpan)`
  text-decoration: underline;
`;
