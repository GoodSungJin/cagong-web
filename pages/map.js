import {useCallback, useEffect, useState} from "react";
import styled from "@emotion/styled";
import useApi from "../hooks/useApi";
import Image from 'next/image'

import IconOn from '../assets/images/icon_location_on.png';
import IconOff from '../assets/images/icon_location_off.png';
import CategoryNoise from '../assets/images/noise.png';
import CategoryBright from '../assets/images/bright.png';
import CategorySeat from '../assets/images/seat.png';
import IconArrowDown from '../assets/images/icon_Arrow_down.png';

import CafeCarousel from "@/components/map/CafeCarousel";
import {useRouter} from "next/router";
import {css} from "@emotion/react";

function MapPage() {
	const {getAddressInfo, getCafes, getCafeInfo} = useApi();
	const [cafeList, setCafeList] = useState([]);
	const [currId, setCurrId] = useState(0);
	const [location, setLocation] = useState([0, 0]);
	const router = useRouter();

	const initMap = useCallback(({
		x, y, id, list
	}) => {
		const container = document.getElementById('map');
		const map = new kakao.maps.Map(container, {
			center: new kakao.maps.LatLng(y, x),
			level: 3
		})
		const imageSize = new kakao.maps.Size(40, 40);
		const imageOption = {offset: new kakao.maps.Point(27, 69)};

		list.forEach(item => {
			new kakao.maps.Marker({
				map,
				position: new kakao.maps.LatLng(item.latitude, item.longitude),
				image: new kakao.maps.MarkerImage(
					+item.id === +id ? IconOn.src : IconOff.src,
					imageSize,
					imageOption
				),
				zIndex: +item.id === +id ? 1 : 0
			})
		});
	}, []);

	useEffect(() => {
		const init = async () => {
			const { x, y } = await getAddressInfo('이대');
			const res = await getCafes(x, y);
			const list = res.map(item => ({
				...item,
				onClickWrite: () => router.push(`/cafe/${item.id}/review`),
				onClick: () => router.push(`/cafe/${item.id}`),
			}))
			const cafeInfoList = await Promise.all(list.map(item => getCafeInfo(item.id)));

			setLocation([x, y]);
			setCafeList(list.map(item => {
				const {
					avg_noise,
					avg_light,
					avg_chair,
					thumbnail
				} = cafeInfoList.find(info => {
					return (+item?.id || 0) === (+info?.id || 0)
				} );
				const avg = [avg_chair, avg_light, avg_noise];
				const categories =[CategorySeat, CategoryBright, CategoryNoise];

				return {
					...item,
					imageUrl: thumbnail,
					categoryImage: categories[avg.findIndex(num => +num === +Math.max(...avg))].src
				}
			}));
			setCurrId(res[0].id);

			initMap({
				x,
				y,
				list: res,
				id: res[0].id
			});
		};

		init();
	}, [])
	
  return (
	  <StdContainer>
		  <StdRegionTag onClick={() => {
		  	router.push('/search')
		  }}>
			  <StdTagText>
				  이대
			  </StdTagText>
			  <StdArrowDown>
			    <Image src={IconArrowDown} width='100%' height='100%'/>
			  </StdArrowDown>
		  </StdRegionTag>

  	  <StdMap id='map' />

		  <StdCards>
			  <CafeCarousel
				  cafeList={cafeList}
				  onSlideChange={(id) => {
					  const { longitude, latitude } = cafeList.find(item => +item.id === +id);
					  initMap({
						  x: longitude,
						  y: latitude,
						  id,
						  list: cafeList
					  });
				  }}
			  />
		  </StdCards>
	  </StdContainer>
  )
}

export default MapPage;

const StdContainer = styled.div`
	width: 100%;
	height: 100%;
	
	position: relative;
`;


const StdMap = styled.div`
	width: 100%;
	height: 100%;
`;

const StdCards = styled.div`
	width: 100%;
	
	position: absolute;
	bottom: 24px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
	
	overflow: hidden;
`;

const StdRegionTag = styled.div`
  ${({theme: {colors, borderRadius}}) => css`
    height: 36px;
	  
    padding: 0 16px;
	  
	  position: absolute;
	  top: 24px;
	  left: 50%;
	  transform: translateX(-50%);
	  
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  
	  border-radius: 36px;
    background-color: ${colors.black};
	  z-index: 2;
  `};
`;

const StdTagText = styled.span`
  ${({theme: {colors, borderRadius}}) => css`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    color: ${colors.white};
  `};

`;

const StdArrowDown = styled.div`
	width: 16px;
	height: 16px;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	margin-left: 4px;
`;
