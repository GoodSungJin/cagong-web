import { css } from '@emotion/react'
import Image from 'next/image';

const containerStyle = css`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const questionTextStyle = css`
  text-align: center;
  font-weight: 500;
  margin: 1rem 0;
`

const radioContainerStyle = css`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const radioAreaStyle = ({ selected }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  > button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: none;
    background-color: #e2e2e2;
    span {
      font-weight: 700;
    }
  }
  > p {
    margin-top: 0.5rem;
    white-space: pre;
    font-size: 0.75rem;
    text-align: center;
  }
  .selected {
    display: none;
    position: absolute;
    z-index: 10;
    background-color: #000;
  }
  ${selected && `
    .selected {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `}
`;

const horizontalBarStyle = css`
  border:1px solid #e2e2e2;
  top: 1.25rem;
  left: 1rem;
  right: 1rem;
  position: absolute;
  z-index: 0;
`;

const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);

export default function LinearSelector({
  question,
  value,
  setValue,
  descriptions,
  min = 1,
  max = 5,
  displayDigit = true,
}) {
  return (
    <div css={containerStyle}>
      <p css={questionTextStyle}>{question}</p>
      <div css={radioContainerStyle}>
        { range(min, max).map((digit, index) => (
          <label css={radioAreaStyle({selected: value === digit})} key={digit}>
            <button onClick={() => setValue(digit)}>
              <span>{displayDigit && digit}</span>
            </button>
            <button className="selected" disabled>
              <Image src="/assets/heart.svg" width={12} height={12} alt="selected"/>
            </button>
            <p>{descriptions && descriptions[index]}</p>
          </label>
        ))}
        <hr css={horizontalBarStyle}/>
      </div>

    </div>
  )
}