import styled from 'styled-components';

export const StyledList = styled.div`
  background-color: white;
  display: flex;

  /* flex-grow: 0; */
  flex-direction: column;
`;
export const Flexbox = styled.div`
  display: flex;
  justify-content: ${(props: { justifyContent?: string }) =>
    props.justifyContent};
  /* flex-shrink: 0; */
`;
export const Input = styled.input`
  width: 300px;
`;
