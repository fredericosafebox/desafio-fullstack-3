import styled from "styled-components";

export const StyledSwitch = styled.label`
  display: flex;
  align-items: center;
  background: rgb(var(--grey-5));
  height: 1.9rem;
  width: 3.3rem;
  position: relative;
  transition: 0.5s;
  border-radius: 1rem;

  cursor: pointer;

  .switch__button {
    height: 2rem;
    width: 2rem;
    background: rgb(var(--switch-primary));
    transition: 0.3s;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(var(--grey-5));
    cursor: pointer;
  }

  .switch {
    position: absolute;
    right: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  p {
    position: absolute;
    right: -7rem;
    top: 0.4rem;
    transition: 0.5s;
    font-size: 1rem;
    font-weight: 600;
  }

  &:has(.switch:checked) {
    .switch__button {
      transform: translateX(1.6rem);
      background: rgb(var(--switch-primary));
      box-shadow: 0 0 6px 1px rgb(var(--switch-primary));
    }
  }
`;
