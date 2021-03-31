import styled from 'styled-components';

export const StyledCards = styled.div`
  padding: 0px 8px 0px 3px;
  border-radius: 3px;
  position: relative;
  background-color: white;
  display: flex;
  margin-top: 3px;
  margin-bottom: 3px;
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
