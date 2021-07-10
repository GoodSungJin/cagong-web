import SearchInput from "@/components/common/SearchInput";
import {useState} from "react";
import styled from "@emotion/styled";
import SearchBar from "@/components/search/SearchBar";
import Tag from "@/components/search/Tag";
import {css} from "@emotion/react";
import SearchResult from "@/components/search/SearchResult";

export default function SearchPage() {
	const [inputValue, setInputValue] = useState('');
	const CATEGORIES = [
		{
			title: '인기 지역',
			regions: ['강남', '삼청동', '을지로', '건대입구', '성수', '혜화', '해방촌', '연남동']
		},
		{
			title: '서울',
			regions: ['강남', '삼청동', '을지로', '건대입구', '성수', '혜화', '해방촌', '연남동']
		},
		{
			title: '부산',
			regions: ['강남', '삼청동', '을지로', '건대입구', '성수', '혜화', '해방촌', '연남동']
		},
		{
			title: '경기도',
			regions: ['강남', '삼청동', '을지로', '건대입구', '성수', '혜화', '해방촌', '연남동']
		},
	]


	const regionsEl = CATEGORIES.map((item) => {
		return (
			<StdCategoryContainer key={item.title}>
				<StdCategoryTitle>{item.title}</StdCategoryTitle>

				{item.regions.map((region, idx) => {
					return <Tag key={region}>{region}</Tag>
				})}
			</StdCategoryContainer>
		);
	});

	const resultEl = ['서울 강남구', '서울 서초구'].map((item) => {
		return (
			<SearchResult>{item}</SearchResult>
		);
	});

	return (
    <StdSearch>
	    <SearchBar onChange={(e) => setInputValue(e.target.value)} inputValue={inputValue} onFocus={() => {}} />
			<div>
		    {
		    	inputValue ? <StdResultContainer>{resultEl}</StdResultContainer> : regionsEl
		    }
			</div>
    </StdSearch>
  )
}

const StdSearch = styled.div`
`;

const StdCategoryContainer = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    padding: 16px 16px 8px;
  `};
`;

const StdCategoryTitle = styled.p`
  ${({theme: {colors, borderRadius}}) => css`
	  margin-bottom: 12px;
	  
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.black};
  `};
`;

const StdResultContainer = styled.div`
	padding: 0 16px;
`;
