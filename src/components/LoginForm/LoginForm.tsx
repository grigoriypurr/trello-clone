import React, { useState } from 'react';
import { StyledPopup, StyledCloseButton, Input } from './styled';

interface PropsType {
  setUserName: React.Dispatch<any>;
}

const LoginForm = (props: PropsType) => {
  const { setUserName } = props;

  const [open, setOpen] = useState(true);
  const [loginValue, setLoginValue] = useState('');

  const closeModal = () => {
    if (!loginValue) return;
    setUserName(loginValue);
    setOpen(false);
  };
  const onLoginValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLoginValue(e.currentTarget.value);
  };

  return (
    <div>
      <StyledPopup open={open} closeOnDocumentClick={false} onClose={closeModal}>
        <h2>Enter your name:</h2>
        <Input value={loginValue} onChange={onLoginValueChange} />
        <StyledCloseButton onClick={closeModal}>Confirm</StyledCloseButton>
      </StyledPopup>
    </div>
  );
};

export default LoginForm;