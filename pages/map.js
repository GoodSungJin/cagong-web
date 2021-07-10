import {useCallback, useEffect, useState} from "react";
import styled from "@emotion/styled";
import api from "../store/api";

import IconOn from '../assets/images/icon_location_on.png';
import IconOff from '../assets/images/icon_location_off.png';
import CategoryNoise from '../assets/images/noise.png';
import CategoryBright from '../assets/images/bright.png';
import CategorySeat from '../assets/images/seat.png';

import CafeCarousel from "@/components/map/CafeCarousel";
import {useRouter} from "next/router";

function MapPage() {
	const {getAddressInfo, getCafes} = api();
	const [cafeList, setCafeList] = useState([]);
	const [currId, setCurrId] = useState(0);
	const [location, setLocation] = useState([0, 0]);
	const router = useRouter();

	const initMap = useCallback(({
		x, y, id, list
	}) => {
		console.log(id, "SDSDSD")
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

			setLocation([x, y]);
			setCafeList(res.map(item => ({
				...item,
				onClick: () => router.push(`/cafe/${item.id}/review`)
			})));
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
