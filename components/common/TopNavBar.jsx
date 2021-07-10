import Image from 'next/image'
import { css } from '@emotion/react'
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const containerStyle = ({shadow}) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  ${shadow && `
    border-bottom: 1px solid #E2E2E2;
  `}
`;

const buttonStyle = css`
  background-color: transparent;
  border: none;
`;

export default function TopNavBar({
  shadow = false,
  title,
}) {
  const router = useRouter();
  const goBack = useCallback(() => {
    router.back();
  }, [router]);
  const doShare = useCallback(() => {
    alert('todo: use WebShare API')
  }, []);
  return(
    <div css={containerStyle({ shadow })}>
      <button css={buttonStyle} onClick={goBack}>
        <Image width={16} height={16} src="/assets/backButton.svg" alt="back"/>
      </button>
      <span>{title}</span>
      <button css={buttonStyle} onClick={doShare}>
        <Image width={16} height={16} src="/assets/shareButton.svg" alt="share"/>
      </button>
    </div>
  )
}