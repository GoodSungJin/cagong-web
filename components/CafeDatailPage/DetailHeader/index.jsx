import { css } from '@emotion/react'
import Image from 'next/image'

const containerStyle = css`
  width: 100%;
`

const imageWrapperStyle = css`
  position: relative;
`

const infoAreaStyle = css`
  margin-top: 0.5rem;
  padding: 1rem;
  > h1 {
    font-weight: 700;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
  > p {
    vertical-align: middle;
  }
`

const reviewButtonStyle = css`
  position: absolute;
  border: none;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: #000;

  right: 1rem;
  bottom: -2rem;
`;

const chipContainerStyle = css`
  margin-top: 1rem;
`

const tagChipStyle = css`
  border-radius: 1rem;
  border: none;
  background-color: #f6f6f6;
  padding: 0.5rem;
  > span {
    padding: 0 0.5rem;
  }
`

export default function DetailHeader({
  headerImage = "/assets/defaults/cafeHeader.png",
  title,
  cagongIndex,
  reviewCount,
  tags,
}) {
  return (
    <div css={containerStyle}>
      <div css={imageWrapperStyle}>
        <Image src={headerImage} alt={"cafeHeader"} layout="responsive" width={375} height={275}/>
        <button css={reviewButtonStyle}>
          <Image src={"/assets/reviewButton.svg"} alt={"write review"} width={20} height={22}/>
        </button>
      </div>
      <div css={infoAreaStyle}>
        <h1>{title}</h1>
        <div>
          <Image src={"/assets/cafeCup.svg"} alt={"cagongIndex"} width={16} height={16} />{' '}
          <span css={css`font-weight: bold;`}>카공지수 {cagongIndex}</span>{' '}
          <span>(후기 {reviewCount}개)</span>
        </div>
        <div css={chipContainerStyle}>
          { tags.map(tag => (
            <button css={tagChipStyle} key={tag}>
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}