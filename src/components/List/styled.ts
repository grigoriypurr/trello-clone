import styled from 'styled-components';

export const StyledList = styled.div`
  background-color: lightgray;
  display: flex;
  margin: 10px 10px 10px 0px;
  /* flex-grow: 0; */
  flex-direction: column;
`;
export const Flexbox = styled.div`
  position:relative;
  display: flex;
  flex-direction: flex-start;
  justify-content: ${(props: { justifyContent?: string }) =>
    props.justifyContent};
  /* flex-shrink: 0; */
`;

export const Input = styled.textarea`
  width: 300px;
  overflow-wrap: break-word;
  resize: none;
  overflow: hidden;
  white-space: normal;
`;

export const StyledListTitle = styled.p`
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
