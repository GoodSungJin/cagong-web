import { css } from '@emotion/react'
import Image from 'next/image';
import { useEffect } from 'react';

const containerStyle = css`
  padding: 0 1rem;
  h3 {
    margin: 1rem 0;
    font-weight: 700;
  }
  > div {
    padding: 1rem 0;
    border-bottom: 1px solid #eeeeee;
  }
  .indicatorTitle {
    font-weight: 700;
  }
  .indicatorScore {
    font-weight: 700;
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
  justify-content: space-around;
  padding-top: 1rem;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    > * {
      margin: 0.5rem 0;
    }
  }
  .indicatorString {
    white-space: pre;
    text-align: center;
    font-weight: 400;
    font-size: small;
  }
`

const verticalIndicatorsContainerStyle = css`
  display: flex;
  flex-direction: column;
  > div {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
  > div > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    > .indicatorTitle {
      margin-left: 0.5rem;
    }
  }
  > div > div.indicatorParagraph {
    margin: 0.5rem 0;
    margin-left: 1.5rem;
    white-space: pre;
  }
  .indicatorString {
    font-weight: bold;
    color: #FB6721;
  }
`

const NOISE_INDICATOR_STRINGS = ["이곳은\n시장입니다", "시끄러운\n편이에요", "적당한\n수다소리", "조용한\n편이에요", "음악소리만\n들려요"];
const LIGHTING_INDICATOR_STRINGS = ["너무 밝아서\n눈이 시려요", "사무실\n같아요", "적당한\n밝기에요", "무드등\n느낌이에요", "땅굴 느낌\n낭낭해요"];
const SEAT_INDICATOR_STRINGS = ["앉으라고\n만든건가요", "다소\n불편해요", "평범한\n테이블,의자", "편안한\n정도에요", "매우 넓고\n쾌적해요"];
const SOCKET_INDICATOR_STRINGS = ["거의 없어요", "적당히 있어요", "여유로워요"];
const WIFI_INDICATOR_STRINGS = ["제공 안돼요", "제공 돼요", "빵빵합니다"];
const CUSTOMER_INDICATOR_STRINGS = ["청소년", "대학생", "가족 단위", "직장인", "그 외"];

export default function TabViewInfo({
  data
}) {
  useEffect(() => {
		const container = document.getElementById('map');
		const map = new kakao.maps.Map(container, {
			center: new kakao.maps.LatLng(data.latitude, data.longitude),
			level: 3
		})
    new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(data.latitude, data.longitude),
    })
  }, [data]);
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
          <p className="indicatorTitle">소음지수</p>
          <Image src="/assets/noiseIndicator.svg" width={90} height={90} alt="noise"/>
          <p className="indicatorScore">{data?.avg_noise}{data?.avg_noise && ".0"}</p>
          <p className="indicatorString">{data?.avg_noise && NOISE_INDICATOR_STRINGS[data?.avg_noise - 1]}</p>
        </div>
        <div>
          <p className="indicatorTitle">조명 밝기</p>
          <Image src="/assets/lightingIndicator.svg" width={90} height={90} alt="noise"/>
          <p className="indicatorScore">{data?.avg_light}{data?.avg_light && ".0"}</p>
          <p className="indicatorString">{data?.avg_light && LIGHTING_INDICATOR_STRINGS[data?.avg_light - 1]}</p>
        </div>
        <div>
          <p className="indicatorTitle">좌석</p>
          <Image src="/assets/seatIndicator.svg" width={90} height={90} alt="noise"/>
          <p className="indicatorScore">{data?.avg_chair}{data?.avg_chair && ".0"}</p>
          <p className="indicatorString">{data?.avg_chair && SEAT_INDICATOR_STRINGS[data?.avg_chair - 1]}</p>
        </div>
      </div>
      <div css={verticalIndicatorsContainerStyle}>
        <div>
          <div>
            <Image src="/assets/elec.svg" width={16} height={16} alt="sockets" />
            <span className="indicatorTitle">콘센트</span>
          </div>
          <div className="indicatorParagraph">콘센트가 <span className="indicatorString">{data?.avg_consent && SOCKET_INDICATOR_STRINGS[data?.avg_consent - 1]}</span></div>
        </div>
        <div>
          <div>
            <Image src="/assets/wifi.svg" width={16} height={16} alt="sockets" />
            <span className="indicatorTitle">와이파이</span>
          </div>
          <div className="indicatorParagraph">와이파이가 <span className="indicatorString">{data?.avg_wifi && WIFI_INDICATOR_STRINGS[data?.avg_wifi - 1]}</span></div>
        </div>
        <div>
          <div>
            <Image src="/assets/person.svg" width={16} height={16} alt="sockets" />
            <span className="indicatorTitle">주 이용 고객</span>
          </div>
          <div className="indicatorParagraph"><span className="indicatorString">{data?.customer && CUSTOMER_INDICATOR_STRINGS[data?.customer - 1]}</span> 손님이 많아요</div>
        </div>
      </div>
      <div>
        <h3>지도</h3>
        <div id="map" css={css`
          width: 100%;
          aspect-ratio: 1.6;
        `}/>
      </div>
    </div>
  )
}