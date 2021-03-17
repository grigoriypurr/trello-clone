import styled from 'styled-components';

export const Input = styled.textarea`
  outline: none;
  border: none;
  font-size: 16px;
  width: 99%;
  overflow-wrap: break-word;
  resize: none;
  overflow: hidden;
  white-space: normal;
`;

export const StyledComment = styled.div`
  padding: 5px;
  width: auto;

  flex-direction: column;
  border: 2px solid lightgray;
  word-wrap: break-word;
`;

export const StyledDiv = styled.div`
  margin: 10px 0px 10px 0px;
`;

export const StyledButton = styled.button`
  align-self: flex-start;
  margin: ${(props: { margin?: string; alignSelf?: string }) => props.margin};
  align-self: ${(props: { alignSelf?: string; margin?: string }) =>
    props.alignSelf};
  cursor: pointer;
  padding: 1px 3px;
  font-size: 14px;
`;
