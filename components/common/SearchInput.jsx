import {forwardRef, useImperativeHandle, useState} from "react";
import Image from 'next/image'

import styled from "@emotion/styled";
import {css} from "@emotion/react";

import SearchIcon from "../../assets/images/icon_search_orange.png";


const SearchInput = ({ value, placeholder, onChange, onFocus }) => {
	const [errors, setErrors] = useState({
		touched: false
	});

	return (
		<StdSearchLabel>
			<StdIcon>
				<Image src={SearchIcon} />
			</StdIcon>
			<StdSearchInput
				onFocus={() => {
					setErrors(prev => ({touched: true}));
					onFocus(errors.touched);
				}}
				onChange={onChange}
				type='search'
				placeholder={placeholder}
				value={value}
			/>
		</StdSearchLabel>
	);
};

export default SearchInput;


const StdSearchLabel = styled.label`
  ${({theme: {colors, borderRadius}}) => css`
    width: 100%;
    height: 56px;
	  
	  
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  
	  background-color: ${colors.gray100};
    border-radius: ${borderRadius.bold};
	  border: 0px;
  `};
`;

const StdSearchInput = styled.input`
  ${({theme: {colors}}) => css`
    color: ${colors.gray150};
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
  `};
`;

const StdIcon = styled.div`
	width: 24px;
	height: 24px;
	
	margin-right: 8px;
	
	display: flex;
	align-items: center;
	justify-content: center;
`;
