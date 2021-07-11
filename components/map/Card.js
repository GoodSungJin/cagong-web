import styled from "@emotion/styled";
import {css} from "@emotion/react";
import Image from 'next/image';
import IconWhite from '../../assets/images/icon_write.png';
import Link from "next/link";

function Card({ cafeId, image, title, menuDescription, categoryIcon, onClickWrite }) {
	return (
		<StdCard>
			<StdImage>
				<Link href={`/cafe/${cafeId}`}>
					<img
						src={image}
						height='100%'
						width='100%'
						alt=""
					/>
				</Link>
				<StdWhiteButton onClick={onClickWrite}>
					<Image
						src={IconWhite}
						height='100%'
						width='100%'
						alt=""
					/>
				</StdWhiteButton>
			</StdImage>
			<Link href={`/cafe/${cafeId}`} passHref>
				<StdContentContainer>
					<div>
						<StdTitle>
							{title}
						</StdTitle>

						<StdMenuDescription>
							{menuDescription}
						</StdMenuDescription>
					</div>
					<StdIcon>
						<img src={categoryIcon} width='100%' height='100%' alt=""/>
					</StdIcon>
				</StdContentContainer>
			</Link>
		</StdCard>
	);
}

export default Card;

const StdCard = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    width: 100%;
    height: 266px;
	  
	  display: flex;
	  flex-direction: column;

    border-radius: ${borderRadius.light};
	  background-color: ${colors.white};
    overflow: hidden;
  `};
`;

const StdImage = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
	  width: 100%;
    height: 182px;
	  
	  position: relative;
  `};
`;

const StdContentContainer = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    padding: 0 10px 0 16px;

	  
    flex: 1;
    display: flex;
    align-items: center;
	  justify-content: space-between;
  `};
`;

const StdTitle = styled.p`
  ${({theme: {colors, borderRadius}}) => css`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: ${colors.black};
  `};
`;

const StdMenuDescription = styled.p`
  ${({theme: {colors, borderRadius}}) => css`
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    color: ${colors.black};
  `};
`;

const StdWhiteButton = styled.p`
  ${({theme: {colors, borderRadius}}) => css`
    width: 52px;
	  height: 52px;
	  
		position: absolute;
		right: 8px;
		bottom: 8px; 
  `};
`;

const StdIcon = styled.div`
	width: 64px;
	height: 64px;
	
`;
