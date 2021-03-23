import React, { useState } from 'react';
import { StyledPopup, StyledCloseButton, Input } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { getUserName } from '../../redux/userSlice';

interface PropsType {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm = (props: PropsType) => {
  const { setUserName } = props;

  const userName = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(true);
  const [loginValue, setLoginValue] = useState(userName);

  const dispatch = useDispatch();
  const closeModal = () => {
    if (!loginValue) return;
    setUserName(loginValue);
    dispatch(getUserName(loginValue));
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
