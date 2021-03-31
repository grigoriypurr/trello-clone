import React, { useState } from 'react';
import { StyledPopup, StyledCloseButton, Input } from './styled';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../redux/userSlice';

interface PropsType {
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<PropsType> = ({ setUser }) => {
  const [open, setOpen] = useState(true);
  const [loginValue, setLoginValue] = useState('');

  const dispatch = useDispatch();

  const closeModal = () => {
    if (!loginValue) return;
      setUser(loginValue);
      dispatch(setUserName(loginValue));
      setOpen(false);
  };
  const onLoginValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLoginValue(e.currentTarget.value);
  };

  return (
    <div>
      <StyledPopup
        open={open}
        closeOnDocumentClick={false}
        onClose={closeModal}
      >
        <h2>Enter your name:</h2>
        <Input value={loginValue} onChange={onLoginValueChange} />
        <StyledCloseButton onClick={closeModal}>Confirm</StyledCloseButton>
      </StyledPopup>
    </div>
  );
};

export default LoginForm;
