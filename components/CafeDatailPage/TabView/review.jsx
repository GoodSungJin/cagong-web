import { css } from '@emotion/react';
import Image from 'next/image';

const containerStyle = css`
  padding: 1rem;
`

const cagongIndexStyle = css`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
font-size: 24px;
white-space: pre;
  margin: 1rem 0;
`

const reviewElemStyle = css`
  padding: 1rem;
  background: #F6F6F6;
  border-radius: 6px;
  margin-bottom: 1rem;
`

const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);

function CagongIndexIndicator({ score, size = 24 }){
  const filledCount = Math.round(score);
  return (
    <div css={css`
      display: flex;
      vertical-align: middle;
    `}>
      { range(1, filledCount).map(((e, idx) => (
        <Image src="/assets/cafeCupFilled.svg" width={size} height={size} alt="cafe cup" key={idx}/>
      )))}
    </div>
  )
}

export default function TabViewReview({
  baseData,
  data
}){
  return (
    <div css={containerStyle}>
      <div css={cagongIndexStyle}>
        <span css={css`font-weight: bold;`}>{baseData?.avg_star}</span> / 5.0
        {"    "}
        {baseData && <CagongIndexIndicator score={baseData?.avg_star}/>}
      </div>
      <div>
      { data?.map((e, idx) => (
        <div css={reviewElemStyle} key={idx}>
          <div css={css`margin-bottom: 1rem;`}>
            <CagongIndexIndicator score={e.star} size={16}/>
          </div>
          <p>{e.detail}</p>
        </div>
      ))}
      </div>
    </div>
  )
}