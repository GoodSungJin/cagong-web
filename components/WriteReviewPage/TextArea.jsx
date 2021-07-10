import { css } from '@emotion/react'

const containerStyle = css`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const titleStyle = css`
  margin-bottom: 1rem;
`

const textAreaStyle = css`
  height: 10rem;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f6f6f6;
`

export default function TextArea({
  value,
  setValue
}) {
  return (
    <div css={containerStyle}>
      <p css={titleStyle}>이용 후기를 작성해주세요</p>
      <textarea value={value} onChange={(e) => setValue(e.target.value)}
        css={textAreaStyle} placeholder="카페를 이용하신 후기를 솔직하게 작성해주세요."/>
    </div>
  )
}