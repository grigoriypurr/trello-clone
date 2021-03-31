import styled from 'styled-components';

export const StyledList = styled.div`
  border-radius: 3px;
  padding: 5px;
  background-color: lightgray;
  display: flex;
  margin: 10px 10px 10px 0px;
  flex-direction: column;
`;
export const FlexBox = styled.div`
  position:relative;
  display: flex;
  flex-direction: flex-start;
  justify-content: ${(props: { justifyContent?: string; }) =>
    props.justifyContent};
`;

export const Input = styled.textarea`
  margin-bottom: 3px;
  width: 304px;
  overflow-wrap: break-word;
  resize: none;
  overflow: hidden;
  white-space: normal;
`;

export const StyledListTitle = styled.p`
  padding: 0px 5px ;
  margin: 0px;
  width: 300px;
  white-space: normal;
  word-break: break-all;
`;
export const StyledButton = styled.button`
  position: absolute;
  right: 0;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
