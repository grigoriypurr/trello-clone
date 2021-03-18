import React from 'react';
import { StyledPopup, StyledCloseButton, Input } from './styled';
import { useStateWithLocalStorage } from '../../App';

interface PropsType {
  setLoginName: React.Dispatch<any>;
}

const LoginForm = (props: PropsType) => {
  const { setLoginName } = props;

  const [open, setOpen] = useStateWithLocalStorage(true, 'isLoginFormClosed');
  const [loginValue, setLoginValue] = useStateWithLocalStorage(
    '',
    'loginFormValue'
  );

  const closeModal = () => {
    setLoginName(loginValue);
    setOpen(false);
  };
  const onLoginValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLoginValue(e.currentTarget.value);
  };

  return (
    <div>
      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
        <h2>Enter your name:</h2>
        <Input value={loginValue} onChange={onLoginValueChange} />
        <StyledCloseButton onClick={closeModal}>Confirm</StyledCloseButton>
      </StyledPopup>
    </div>
  );
};

export default LoginForm;
