import styled from "styled-components";

export const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: 0.5s;
  padding: 1rem;

  h1 {
    font-size: 1.8rem;
    color: rgb(var(--grey-5));
  }

  .app__profile--card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: 0.5s;
    padding: 1rem;
    color: rgb(var(--grey-5));
    border: 2px solid rgb(var(--grey-4));
    border-radius: 0.4rem;

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.3rem;
      font-weight: 600;

      span {
        display: block;
        flex: 1;
        font-size: 1.3rem;
        font-weight: 400;
        text-align: end;
        margin-left: 2rem;
      }
    }
  }

  .app__profile--buttons {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    button {
      padding: 1rem 2rem;
      transition: 0.5s;
    }
    .profile__primary {
      background: rgb(var(--switch-primary));
      color: rgb(var(--grey-5));
      &:hover {
        box-shadow: 0 0 8px 1px rgba(var(--switch-primary), 0.5);
      }
    }
    .profile__secondary {
      background: rgb(var(--mid-primary));
      color: rgb(var(--grey-2));
      &:hover {
        box-shadow: 0 0 8px 1px rgba(var(--mid-primary), 0.5);
      }
    }
    .profile__link {
      background: rgb(var(--lower-primary));
      color: rgb(var(--grey-1));
      &:hover {
        box-shadow: 0 0 8px 1px rgba(var(--lower-primary), 0.5);
      }
    }
  }
`;
