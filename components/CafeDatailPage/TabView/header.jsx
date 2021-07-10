import { css } from '@emotion/react'
import Link from 'next/link';
import { useMemo } from 'react';

const containerStyle = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const tabItemStyle = (isSelected) => css`
  flex: 1;
  text-align: center;
  padding: 1rem 0;
  border-bottom: 5px solid #e2e2e2;
  ${isSelected && `
    border-color: #000;
    font-weight: bold;
  `}
`

const TABS = {
  info: "정보",
  review: "리뷰",
  photo: "사진",
  menu: "메뉴",
}

export default function TabViewHeader({
  cafeId,
  nowTab
}) {
  return (
    <div css={containerStyle}>
       {Object.keys(TABS).map(tab => (
        <Link href={`/cafe/${cafeId}/${tab}`} passHref scroll={false} key={tab}>
          <span css={tabItemStyle(nowTab === tab)}>{TABS[tab]}</span>
        </Link>
      ))}
    </div>
  )
}