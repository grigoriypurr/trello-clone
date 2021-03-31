import styled from 'styled-components';

export const StyledTables = styled.div`
  background-color: #a1ffff;
  display: flex;
  flex-grow: 1;
  overflow-x: auto;
`;
export const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props: { justifyContent?: string }) =>
    props.justifyContent};
  flex-basis: 10px;
  align-items: flex-start;
`;
export const StyledButton = styled.div`
  flex-shrink: 0;
  margin-top: 10px;
`;
