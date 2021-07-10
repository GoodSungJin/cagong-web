import styled from "@emotion/styled";
import Image from 'next/image'

import Icon from '../../assets/images/icon_location_on.png'
import {css} from "@emotion/react";

function SearchResult({children}) {
	return (
		<StdResult>
			<StdIcon>
				<Image src={Icon} width='100%' height='100%' />
			</StdIcon>
			<StdText>{children}</StdText>
		</StdResult>
	);
}

export default SearchResult;

const StdResult = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    height: 56px;

    padding: 0 16px;

    display: flex;
    align-items: center;

    & + & {
      border-top: 1px solid ${colors.gray100};
    }
  `};
`;

const StdText = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.black};
  `};
`;

const StdIcon = styled.div`
	width: 24px;
	height: 24px;
	
	margin-right: 8px;
`;
