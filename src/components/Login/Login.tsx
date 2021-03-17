import React, { useState } from 'react';
import { StyledPopup, StyledCloseButton, Input } from './styled';

interface PropsType {
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  loginName: string;
}

const Login = (props: PropsType) => {
  const { onInputChange, loginName } = props;
  const [open, setOpen] = useState(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
        <h2>Enter your name:</h2>
        <Input value={loginName} onChange={onInputChange} />
        <StyledCloseButton onClick={closeModal}>Confirm</StyledCloseButton>
      </StyledPopup>
    </div>
  );
};

export default Login;
