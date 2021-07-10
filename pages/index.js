import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import Image from "next/image";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import SearchInput from "@/components/common/SearchInput";
import SharedButton from "@/components/common/SharedButton";

import CategoryNoise from '../assets/images/noise.png';
import CategoryBright from '../assets/images/bright.png';
import CategorySeat from '../assets/images/seat.png';
import Link from "next/link";

function MainPage() {
	const ETIQUETTE_LIST = [
		'세시간이 지나면 \n추가로 음료를 \n주문하자',
		'4인 좌석은 \n착석을 \n지양하자',
		'시끄럽다면 \n내가 참자. \n이어폰을 끼자.',
		'사용한 자리 \n정돈 필수! \n지우개 똥을 치우자'
	];
	const CATEGORIES = [
		[
			{
				title: '조용한 카페',
				icon: CategoryNoise

			},
			{
				title: '아늑한 카페',
				icon: CategorySeat

			},
			{
				title: '조용한 카페',
				icon: CategoryBright

			}],
		[
			{
				title: '눈이 편한 카페',
				icon: CategoryNoise

			},
			{
				title: '와이파이 빵빵',
				icon: CategorySeat

			},
			{
				title: '혼공족 많은 카페',
				icon: CategoryBright

			}]
	];
	const router = useRouter();
	const [inputValue, setInputValue] = useState('');


	const onFocus = (e) => {
		router.push('/search')
	}
	const onChange = (e) => {
		setInputValue(prev => e.target.value);
	};

	const etiquetteListEl = ETIQUETTE_LIST.map(item => (
		<SwiperSlide key={item} style={{width: '180px'}}>
			<StdEtiquette>
				{item}
			</StdEtiquette>
		</SwiperSlide>
	));
	const categoriesEl = CATEGORIES.map((row, idx) => (
		<StdThumbnailRow key={idx}>
			{row.map(category => (
				<StdCategoryThumbnail key={category.title}>
					<StdThumbnail>
						<Image src={category.icon} alt={category.title} />
					</StdThumbnail>
					<StdThumbnailDescription>
						{category.title}
					</StdThumbnailDescription>
				</StdCategoryThumbnail>
			))}
		</StdThumbnailRow>
	));


  return (
	  <StdMain>
		  <StdTop>
		    <StdTitle>
			    공부하러 <br />
			    카페 어디로 갈까?
	      </StdTitle>

			  <StdButtonContainer>
			    <SearchInput
				    onFocus={onFocus}
				    onChange={onChange}
				    placeholder="지역, 카페 검색하기"
				    value={inputValue}
			    />
			  </StdButtonContainer>
			  <StdButtonContainer>
					<Link href="/map" passHref>
			    	<SharedButton>내 주변 카페 가기</SharedButton>
					</Link>
			  </StdButtonContainer>
		  </StdTop>
		  <StdBottom>
			  <StdBottomTitle>혼공하기 좋은 카페 둘러보기</StdBottomTitle>
			  <StdThumbnailContainer>
				  {categoriesEl}
			  </StdThumbnailContainer>

			  <StdBottomTitle>품격있는 카공족의 에티켓</StdBottomTitle>
			  <StdCarousel>
				  <Swiper
					  freeMode
					  spaceBetween={8}
					  slidesPerView='auto'
					  style={{margin: '0 16px', overflow: 'visible'}}
				  >
					  {etiquetteListEl}
				  </Swiper>
			  </StdCarousel>
		  </StdBottom>
	  </StdMain>
  )
}

export default MainPage;

const StdMain = styled.main`
  ${({theme: {colors, borderRadius}}) => css`
	  width: 100%;
	  
	  
	  display: flex;
	  flex-direction: column;
  `};
`;

const StdTop = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    width: 100%;
    height: 468px;
	  
	  padding: 0 24px;
	  
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  
    background-color: ${colors.orange};
  `};
`;

const StdTitle = styled.h1`
  ${({theme: {colors, borderRadius}}) => css`
	  margin-bottom: 12px;
	  
    color: ${colors.white};
    font-weight: bold;
    font-size: 28px;
    line-height: 140%;
    letter-spacing: -0.01em;
	  text-align: center;
  `};
`;

const StdButtonContainer = styled.div`
	width: 100%;
	
	& + & {
		margin-top: 12px;
	}
`;

const StdBottom = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
	  height: 708px;
	  width: 100%;
	  
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  
	  padding: 40px 0 24px;
	  
    color: ${colors.white};
  `};
`;

const StdBottomTitle = styled.h2`
  ${({theme: {colors, borderRadius}}) => css`
	  margin-bottom: 24px;
	  
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.01em;
	  
    color: ${colors.black};
  `};
`;

const StdThumbnailContainer = styled.div`
	display: flex;
  flex-wrap: wrap;
	justify-content: center;
	
	margin-bottom: 48px;
`;

const StdThumbnailRow = styled.div`
	display: flex;
	
	& + & {
		margin-top: 24px;
	}
`;

const StdCategoryThumbnail = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  
	  & + & {
		  margin-left: 24px;
	  }
  `};
`;

const StdThumbnail = styled.div`
	width: 90px;
	height: 90px;
	
	margin-bottom: 8px;
`;

const StdThumbnailDescription = styled.p`
  ${({theme: {colors, borderRadius}}) => css`
	  font-style: normal;
	  font-weight: bold;
	  font-size: 14px;
	  line-height: 22px;
	  color: ${colors.black};
  `};
`;

const StdEtiquette = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    width: 100%;
    height: 220px;

	  padding: 20px;
    border-radius: 10px;
	  background-color: ${colors.black};

    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
	  white-space: pre;
  `};
`;

const StdCarousel = styled.div`
	width: 100%;
	overflow: hidden;
`;
