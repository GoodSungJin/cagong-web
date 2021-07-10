import SearchInput from "@/components/common/SearchInput";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

function SearchBar({onFocus, onChange, inputValue}) {

	return (
		<StdSearchBar>
			<StdBarInput>
				<SearchInput
					onFocus={onFocus}
					onChange={onChange}
					placeholder="지역, 카페 검색하기"
					value={inputValue}
				/>
			</StdBarInput>
			<StdBarText>취소</StdBarText>
		</StdSearchBar>
	);
}

export default SearchBar;

const StdSearchBar = styled.div`
	padding: 16px;
	
	display: flex;
	align-items: center;
`;

const StdBarText = styled.span`
  ${({theme: {colors, borderRadius}}) => css`
	  margin-left: 16px;
	  
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
	  color: ${colors.black};
  `};
`;

const StdBarInput = styled.span`
  ${({theme: {colors, borderRadius}}) => css`
    flex: 1;
  `};
`;

