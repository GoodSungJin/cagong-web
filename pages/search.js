import SearchInput from "@/components/common/SearchInput";
import {useState} from "react";
import styled from "@emotion/styled";
import SearchBar from "@/components/search/SearchBar";
import Tag from "@/components/search/Tag";
import {css} from "@emotion/react";
import SearchResult from "@/components/search/SearchResult";
import api from "../store/api";
import {useRouter} from "next/router";

function SearchPage() {
	const CITY_LIST = [
		{
			title: '인기 지역',
			regions: [
				['강남', '삼청동', '을지로', '건대입구'],
				['성수', '혜화', '해방촌', '연남동']
			]
		},
		{
			title: '서울',
			regions: [
				['강남', '삼청동', '을지로', '건대입구'],
				['성수', '혜화', '해방촌', '연남동']
			]
		},
		{
			title: '부산',
			regions: [
				['강남', '삼청동', '을지로', '건대입구'],
				['성수', '혜화', '해방촌', '연남동']
			]
		},
		{
			title: '경기도',
			regions: [
				['강남', '삼청동', '을지로', '건대입구'],
				['성수', '혜화', '해방촌', '연남동']
			]
		},
	];
	const RESULT_REGION_LIST = [
		'서울 강남구',
		'서울 서초구',
		'서울 종로구',
		'서울 중구',
	];

	const [inputValue, setInputValue] = useState('');
	const {getAddressInfo} = api();
	const router = useRouter();

	const onClickTag = (keyword) => {
		setInputValue(keyword);
	}

	const onClickResultRegion = () => {
		console.log(23232323)
		router.push('/map');
	};

	const regionsEl = CITY_LIST.map((city) => (
		<StdCategoryContainer key={city.title}>
			<StdCategoryTitle>{city.title}</StdCategoryTitle>

			{city.regions.map((row) => (
				<StdRegionRow key={row}>
					{row.map(region => (
						<Tag onClick={() => onClickTag(region)} key={region}>{region}</Tag>
					))}
				</StdRegionRow>
			))}
		</StdCategoryContainer>
	));
	const resultEl = RESULT_REGION_LIST.map((result) => (
		<SearchResult
			onClick={onClickResultRegion}
			key={result}
		>
			{result}
		</SearchResult>
	));

	return (
    <div>
	    <SearchBar
		    inputValue={inputValue}
		    onChange={(e) => setInputValue(e.target.value)}
		    onFocus={() => {}}
		    onClose={() => {
			    setInputValue('');
			    router.push('/');
		    }}
		    onKeyPress={async (e) => {
			    if (e.code === "Enter") {
				    console.log(
					    await getAddressInfo(inputValue)
				    );
			    }
		    }}
	    />
			<div>
		    {
		    	inputValue
				    ? <StdResultContainer>{resultEl}</StdResultContainer>
				    : regionsEl
		    }
			</div>
    </div>
  )
}

export default SearchPage;

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

const StdRegionRow = styled.div`
	& + & {
		margin-top: 8px;
	}
`;
