import { css } from '@emotion/react'
import Image from 'next/image';

const containerStyle = css`
  padding: 0 1rem;
  h3 {
    margin: 1rem 0;
  }
  > div {
    padding: 1rem 0;
    border-bottom: 1px solid #eeeeee;
  }
`;

const reviewTextStyle = css`
  padding: 1rem;
  background: #F6F6F6;
  border-radius: 6px;
  margin-bottom: 1rem;
`

const horizontalIndicatorsContainerStyle = css`
  display: flex;
  flex-direction: row;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const verticalIndicatorsContainerStyle = css`
  display: flex;
  flex-direction: column;
  > div > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    > span {
      margin-left: 0.5rem;
    }
  }
  > div > p {
    margin: 0.5rem 0;
    margin-left: 1.5rem;
  }
`

export default function TabViewInfo({
  data
}) {
  return (
    <div css={containerStyle}>
      <div>
        <h3>대표리뷰</h3>
        <div css={reviewTextStyle}>{data?.review}</div>
      </div>
      <div css={css`display: flex; align-items: center;`}>
        <Image src="/assets/phone.svg" width={16} height={16} alt="phone"/>
        <span css={css`margin-left: 1rem;`}>{data?.phone ?? "없음"}</span>
      </div>
      <div css={css`display: flex; align-items: center;`}>
        <Image src="/assets/address.svg" width={16} height={16} alt="phone"/>
        <span css={css`margin-left: 1rem;`}>{data?.address ?? "없음"}</span>
      </div>
      <div css={horizontalIndicatorsContainerStyle}>
        <div>
          <p>소음지수</p>
          <Image src="/assets/noiseIndicator.svg" width={90} height={90} alt="noise"/>
          <p>{data?.avg_noise}</p>
          <p>indicator string</p>
        </div>
        <div>
          <p>조명 밝기</p>
          <Image src="/assets/lightingIndicator.svg" width={90} height={90} alt="noise"/>
          <p>{data?.avg_light}</p>
          <p>indicator string</p>
        </div>
        <div>
          <p>좌석</p>
          <Image src="/assets/seatIndicator.svg" width={90} height={90} alt="noise"/>
          <p>{data?.avg_light}</p>
          <p>indicator string</p>
        </div>
      </div>
      <div css={verticalIndicatorsContainerStyle}>
        <div>
          <div>
            <Image src="/assets/elec.svg" width={16} height={16} alt="sockets" />
            <span>콘센트</span>
          </div>
          <p>콘센트가 <span>{data?.avg_consent}</span> 있어요</p>
        </div>
        <div>
          <div>
            <Image src="/assets/wifi.svg" width={16} height={16} alt="sockets" />
            <span>와이파이</span>
          </div>
          <p>와이파이가 <span>{data?.avg_wifi}</span></p>
        </div>
        <div>
          <div>
            <Image src="/assets/person.svg" width={16} height={16} alt="sockets" />
            <span>주 이용 고객</span>
          </div>
          <p><span>{data?.avg_customer}</span> 손님이 많아요</p>
        </div>
      </div>
      <div>
        <h3>지도</h3>
        <div>
          (맨마지막에추가하자)
          latlng: {data?.latitude} / {data?.longitude}
        </div>
      </div>
    </div>
  )
}