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
  border: 2px solid black;
  width: 100%;
  min-height: 50px;
`;
export const StyledButton = styled.button`
  margin: ${(props: { margin?: string; alignSelf?: string }) => props.margin};
  align-self: ${(props: { alignSelf?: string; margin?: string }) =>
    props.alignSelf};
  cursor: pointer;
  padding: 1px 3px;
  font-size: 14px;
`;
