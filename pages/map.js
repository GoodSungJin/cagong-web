import {useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import api from "../store/api";

import {Swiper, SwiperSlide} from "swiper/react";


import IconOn from '../assets/images/icon_location_on.png';
import IconOff from '../assets/images/icon_location_off.png';
import CategoryNoise from '../assets/images/noise.png';
import CategoryBright from '../assets/images/bright.png';
import CategorySeat from '../assets/images/seat.png';
import Card from "@/components/map/Card";

export default function MapPage() {
	const {getAddressInfo, getCafes} = api();
	const [cafeList, setCafeList] = useState([]);
	const [currIdx, setCurrIdx] = useState(0);
	const [location, setLocation] = useState([0, 0]);

	useEffect(() => {
		const container = document.getElementById('map');
		const map = new kakao.maps.Map(container, {
			center: new kakao.maps.LatLng(location[1], location[0]), //지도의 중심좌표.
			level: 3 //지도의 레벨(확대, 축소 정도)
		})

		const imageOn = IconOn.src; // 마커이미지의 주소입니다
		const imageOff = IconOff.src; // 마커이미지의 주소입니다
		const imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
		const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

		cafeList.forEach(item => {
			new kakao.maps.Marker({
				map,
				position: new kakao.maps.LatLng(item.latitude, item.longitude),
				image: new kakao.maps.MarkerImage(item.id === currIdx ? imageOn : imageOff, imageSize, imageOption),
				zIndex: item.id === currIdx ? 1 : 0
			})
		});
	}, [cafeList, currIdx, location, location])

	useEffect(() => {
		const init = async () => {
			const { x, y} = await getAddressInfo('강남구');
			const res = await getCafes(x, y);

			setLocation([x, y]);
			setCafeList(res);
			setCurrIdx(res[0].id);

		};


		init();
	}, [])


  return (
	  <StdContainer>
  	  <StdMap id='map' />

		  <StdCards>
			  <Swiper spaceBetween={8} slidesPerView='auto' centeredSlides onSlideChange={(swiper) => {
				  setCurrIdx(cafeList[swiper.activeIndex].id);
			  }}>
				  {
					  cafeList.map(item => {
					  	return (
							  <SwiperSlide data-id={item.id} virtualIndex={item.id} key={item.id} style={{width: '306px'}}>
								  <Card image={''} title={item.place_name} menuDescription='아메리카노 4,000원' categoryIcon={CategoryNoise.src} />
							  </SwiperSlide>
						  )
					  })
				  }
			  </Swiper>
		  </StdCards>
	  </StdContainer>
  )
}

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
