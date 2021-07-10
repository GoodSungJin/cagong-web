import {css} from "@emotion/react";
import styled from "@emotion/styled";

function SharedButton({ children }) {
  return (
    <StdButton>{children}</StdButton>
  );
}

export default SharedButton;

const StdButton = styled.button`
  ${({ theme: { colors, borderRadius } }) => css`
    width: 100%;
    height: 56px;
	  
	  background-color: ${colors.black};
	  border-radius: ${borderRadius.bold};
	  
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    color: ${colors.white};
  `};
`;
