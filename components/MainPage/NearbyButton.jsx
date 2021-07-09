import Link from 'next/link'

export default function MainPageNearbyButton() {
  return (
    <div>
      <Link href={"/map"} passHref>
        <button>
          쓰레빠 끌고 내 주변 카페 가기
        </button>
      </Link>

    </div>
  )
}