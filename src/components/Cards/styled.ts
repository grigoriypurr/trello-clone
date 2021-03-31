import styled from 'styled-components';

export const StyledCards = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  margin: 2px;
  flex-direction: column;
  white-space: normal;
  word-break: break-all;
`;

export const StyledTextarea = styled.textarea`
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  white-space: normal;
  background-color: white;
`;
export const StyledButton = styled.button`
  position: absolute;
  right: 0;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
