import {Swiper, SwiperSlide} from "swiper/react";
import Card from "@/components/map/Card";

function CafeCarousel({ cafeList, onSlideChange }) {
	const slides = cafeList.map(item => (
		<SwiperSlide
			key={item.id}
			data-id={item.id}
			virtualIndex={item.id}
			style={{width: '306px'}}
		>
			<Card
				image={item.imageUrl}
				title={item.place_name}
				menuDescription='아메리카노 4,000원'
				categoryIcon={item.categoryImage}
				onClickWrite={item.onClickWrite}
				onClick={item.onClick}
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
