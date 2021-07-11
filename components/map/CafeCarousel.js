import {Swiper, SwiperSlide} from "swiper/react";
import Card from "@/components/map/Card";
import CategoryNoise from "../../assets/images/noise.png";

function CafeCarousel({ cafeList, onSlideChange }) {
	const slides = cafeList.map(item => (
		<SwiperSlide
			key={item.id}
			data-id={item.id}
			virtualIndex={item.id}
			style={{width: '306px'}}
		>
			<Card
				cafeId={item.id}
				image="https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic3.jpg"
				title={item.place_name}
				menuDescription='아메리카노 4,000원'
				categoryIcon={CategoryNoise.src}
				onClickWrite={item.onClick}
			/>
		</SwiperSlide>
	));

	return (
		<Swiper
			spaceBetween={8}
			slidesPerView='auto'
			centeredSlides
			onSlideChange={(swiper) => {
				onSlideChange(cafeList[swiper.activeIndex].id)
			}}
		>
			{slides}
		</Swiper>
	);
}

export default CafeCarousel;
