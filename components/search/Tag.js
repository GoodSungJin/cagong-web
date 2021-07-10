import styled from "@emotion/styled";
import {css} from "@emotion/react";

function Tag({onClick, children}) {
	return (
		<StdTag onClick={onClick}>
			<p>{children}</p>
		</StdTag>
	);
}

export default Tag;

const StdTag = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    height: 32px;
    padding: 0 16px;
	  
	  display: inline-flex;
	  justify-content: center;
	  align-items: center;

    background-color: ${colors.gray50};
    border-radius: 16px;

    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
	  color: ${colors.black};
	  
	  cursor: pointer;
	  
	  & + & {
		  margin-left: 4px;
	  }
  `};
`;
