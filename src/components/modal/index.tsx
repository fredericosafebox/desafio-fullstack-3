import { StyledWrapper } from "./styles";

export interface IProps {
  children: React.ReactNode;
}

export default function Modal({ children }: IProps) {
  return <StyledWrapper>{children}</StyledWrapper>;
}
