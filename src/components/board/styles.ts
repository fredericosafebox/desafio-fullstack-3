import styled from "styled-components";

export const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: 0.5s;
  padding: 1rem;
  border-radius: 0.4rem;
  background: rgba(var(--grey-4), 0.1);

  .app__board--header {
    background: rgb(var(--lower-primary));
    color: rgb(var(--grey-1));
    padding: 1.2rem 1rem;
    display: flex;
    border-radius: 0.4rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    transition: 0.5s;
    height: 25rem;
    overflow-y: auto;
    scrollbar-gutter: stable;

    .app__contact {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgb(var(--grey-5));
      border: 2px solid rgb(var(--grey-4));
      border-radius: 0.4rem;
      padding: 1rem;
      height: 4rem;
      gap: 1rem;
      background: rgb(var(--grey-1));
      cursor: pointer;
      transition: 0.5s;
      width: 99%;

      h6 {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.9rem;
        font-weight: 600;
        width: 12rem;

        span {
          display: block;
          margin-left: 0.4rem;
          font-size: 0.9rem;
          font-weight: 400;
        }
      }

      .app__contact--buttons {
        display: flex;
      }

      &:hover {
        background: rgba(var(--grey-4), 0.2);
      }
    }

    &::-webkit-scrollbar {
      width: 0.5rem;
      border-radius: 0.4rem;
    }

    &::-webkit-scrollbar-thumb {
      width: 0.5rem;
      border-radius: 0.4rem;
      background: rgb(var(--lower-primary));
    }
    &::-webkit-scrollbar-track {
      width: 0.5rem;
      border-radius: 0.4rem;
    }
  }
`;
