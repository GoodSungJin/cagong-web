import { css } from '@emotion/react';
import Image from 'next/image';
import ReactStars from "react-rating-stars-component";

const containerStyle = css`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const questionTextStyle = css`
  text-align: center;
  font-weight: 500;
  margin: 1rem 0;
`

export default function StarSelector({
  setValue
}){
  return (
    <div css={containerStyle}>
      <p css={questionTextStyle}>이 카페 카공하기 좋았나요?</p>
      <ReactStars
        count={5}
        onChange={setValue}
        size={32}
        filledIcon={<div css={css`margin: 0 0.5rem;`}><Image src="/assets/cafeCupFilled.svg" width={32} height={32} alt="filled score"/></div>}
        emptyIcon={<div css={css`margin: 0 0.5rem;`}><Image src="/assets/cafeCupDimmed.svg" width={32} height={32} alt="not filled score"/></div>}
        activeColor="#fb6721"
      />
    </div>
  )
}