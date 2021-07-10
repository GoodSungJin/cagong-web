import { css } from '@emotion/react'
import TopNavBar from '@/components/common/TopNavBar';
import { useRouter } from 'next/router'
import { ReviewLinearSelector, ReviewTextArea } from '@/components/WriteReviewPage';
import { useState } from 'react';

const containerStyle = css`
  padding: 1.5rem;
`;

export default function WriteReviewPage() {
  const router = useRouter();
  const { cafeId, title } = router.query;

  const [noise, setNoise] = useState(3);
  const [sockets, setSockets] = useState(2);

  const [textReview, setTextReview] = useState('');

  return (
    <> 
      <TopNavBar shadow={true} title={title}/>
      <div css={containerStyle}>
        <ReviewLinearSelector question={"카페가 시끄러운가요?"} value={noise} setValue={setNoise} descriptions={["이곳은\n시장입니다", "시끄러운\n편이에요", "적당한\n수다소리", "조용한\n편이에요", "음악소리만\n들려요"]}/>
        <ReviewLinearSelector question={"콘센트가 있나요?"} value={sockets} setValue={setSockets} min={1} max={3} descriptions={["거의 없어요", "적당히 있어요", "여유로워요"]} />
        <hr/>
        <ReviewTextArea value={textReview} setValue={setTextReview} />
      </div>
    </>
  )
}