import { css } from '@emotion/react'
import Image from 'next/image'

const containerStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem;
`

export default function TabViewPhoto({
  data
}) {
  return (
    <div css={containerStyle}>
      { data?.map((e, idx) => (
        <div css={css`
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc( (100% - 1.5rem) / 3);
          margin: 0.25rem;
          aspect-ratio: 1;
        `} key={idx}>
          <Image src={e} layout="fill" alt="image"/>
        </div>
      ))}
    </div>
  )
}