import { css } from '@emotion/react'
import TopNavBar from '@/components/common/TopNavBar';
import { useRouter } from 'next/router'
import { ReviewFileUploadArea, ReviewLinearSelector, ReviewStarSelector, ReviewTextArea } from '@/components/WriteReviewPage';
import { useState } from 'react';

const containerStyle = css`
  padding: 1.5rem;
`;

export default function WriteReviewPage() {
  const router = useRouter();
  const { cafeId, title } = router.query;

  const [star, setStar] = useState();

  const [noise, setNoise] = useState(3);
  const [lighting, setLighting] = useState(3);
  const [seat, setSeat] = useState(3);
  const [sockets, setSockets] = useState(2);
  const [wifi, setWifi] = useState(2);
  const [customer, setCustomer] = useState(3);

  const [textReview, setTextReview] = useState('');
  const [uploadedSlot, setUploadedSlot] = useState(["/assets/defaults/cafeHeader.png", "/assets/wifi.svg", null]);

  return (
    <> 
      <TopNavBar shadow={true} title={title}/>
      <div css={containerStyle}>
        <ReviewStarSelector setValue={setStar}/>
        <ReviewLinearSelector question={"카페가 시끄러운가요?"} value={noise} setValue={setNoise} descriptions={["이곳은\n시장입니다", "시끄러운\n편이에요", "적당한\n수다소리", "조용한\n편이에요", "음악소리만\n들려요"]}/>
        <ReviewLinearSelector question={"조명은 밝은가요?"} value={lighting} setValue={setLighting} descriptions={["너무 밝아서\n눈이 시려요", "사무실\n같아요", "적당한\n밝기에요", "무드등\n느낌이에요", "땅굴 느낌\n낭낭해요"]} />
        <ReviewLinearSelector question={"좌석이 편한가요?"} value={seat} setValue={setSeat} descriptions={["앉으라고\n만든건가요", "다소\n불편해요", "평범한\n테이블,의자", "편안한\n정도에요", "매우 넓고\n쾌적해요"]} />
        <ReviewLinearSelector question={"콘센트가 있나요?"} value={sockets} setValue={setSockets} min={1} max={3} descriptions={["거의 없어요", "적당히 있어요", "여유로워요"]} />
        <ReviewLinearSelector question={"와이파이가 제공되나요?"} value={wifi} setValue={setWifi} min={1} max={3} descriptions={["제공 안돼요", "제공 돼요", "빵빵합니다"]} />
        <ReviewLinearSelector question={"주 이용 고객"} value={customer} setValue={setCustomer} displayDigit={false} descriptions={["청소년", "대학생", "가족 단위", "직장인", "그 외"]} />
        <hr/>
        <ReviewTextArea value={textReview} setValue={setTextReview} />
        <ReviewFileUploadArea uploadedSlot={uploadedSlot} setUploadedSlot={setUploadedSlot} />
      </div>
    </>
  )
}