import { Button, FlexBox, Input, ClearButton } from './styled';

const Header = () => {
  const clearLocalStorage = () => {
    window.localStorage.clear();
  };

  return (
    <FlexBox justifyContent="space-between">
      <FlexBox>
        <Button> &#8962;</Button>
        <Input />
      </FlexBox>
      <div>Trello </div>
      <div>
        <ClearButton onClick={clearLocalStorage}>
          Clear LocalStorage
        </ClearButton>
        <Button>&#43;</Button>
        <Button>&#9432;</Button>
        <Button>&#128276;</Button>
      </div>
    </FlexBox>
  );
};

export default Header;