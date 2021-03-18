import styled from 'styled-components';

interface InputProps {
  small?: boolean;
  padding?: string;
}

export const Input = styled.input.attrs((props: InputProps) => ({
  type: 'text',
  size: props.small ? 5 : undefined,
}))<InputProps>`
  background: rgba(255, 255, 255, 0.644);
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  position: relative;
  min-width: 200px;
  padding: ${(props) => props.padding};

  ::placeholder {
    color: palevioletred;
  }
`;

export const Flexbox = styled.div`
  background-color: #74f0f0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: ${(props: { justifyContent?: string }) =>
    props.justifyContent};
`;

export const ClearButton = styled.button`
  font-size: 1em;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.644);
`;

export const Button = styled(ClearButton)`
  font-weight: bold;
  border-radius: 5px;
  max-width: 5em;
`;
