import { css } from '@emotion/react';
import { MainPageNearbyButton, MainPageSearchBar, MainPageTitle } from '../components/MainPage'

const containerStyle = css`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default function MainPage() {
  return (
    <div css={containerStyle}>
      <MainPageTitle />
      <MainPageSearchBar />
      <MainPageNearbyButton />
    </div>
  )
}
