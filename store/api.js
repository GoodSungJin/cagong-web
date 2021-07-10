export default function() {
	const getAddressInfo = async (region) => {
		try {
			const response = await fetch(
				`https://dapi.kakao.com/v2/local/search/address.json?query=${region}`, {
					headers: {
						Authorization: `KakaoAK 33655198691cb10e829905513d2ac52b`
					}})
			const data = await response.json();

			if (!data.documents) throw new Error('주소 검색 에러');

			const [{ address_name, x, y }] = data.documents;

			return {
				name: address_name,
				x: 126.94626430747425,
				y: 37.55681734677461
			}
		} catch (e) {
			console.log(e)
		}
	}

	const getCafes = async (x, y) => {
		const baseUrl = "https://aa09cqohrh.execute-api.ap-northeast-2.amazonaws.com/gdg-hackathon-lambda-index-1";

		try {
			// const response = await fetch(
			// 	`${baseUrl}/cafes?latitude=${y}&longitude=${x}`);
			// const data = await response.json();

			// if (!data.sucess) throw new Error('카페 불러오기 오류');

			return [
				{
					"id": "806447073",
					"place_name": "투썸플레이스 이대역점",
					"latitude": "37.5572360514845",
					"longitude": "126.94569812655"
				},
				{
					"id": "1866064248",
					"place_name": "카페봄봄 이화여대점",
					"latitude": "37.55722067043155",
					"longitude": "126.94555893119713"
				},
				{
					"id": "19622085",
					"place_name": "공차 이대점",
					"latitude": "37.5569764014276",
					"longitude": "126.945345206914"
				},
				{
					"id": "438330961",
					"place_name": "흑화당 이대점",
					"latitude": "37.5571243278597",
					"longitude": "126.945698207623"
				},
				{
					"id": "13127567",
					"place_name": "카페쥬디",
					"latitude": "37.5572832629733",
					"longitude": "126.946485798103"
				},
				{
					"id": "1595131797",
					"place_name": "커피베이 이대역점",
					"latitude": "37.55650794784634",
					"longitude": "126.945485885993"
				},
				{
					"id": "10368507",
					"place_name": "라바짜 이대점",
					"latitude": "37.5574344119916",
					"longitude": "126.946005822281"
				},
				{
					"id": "213867029",
					"place_name": "다인전통찻집",
					"latitude": "37.556443159523",
					"longitude": "126.945667012953"
				},
				{
					"id": "23040316",
					"place_name": "바카라",
					"latitude": "37.55606405286577",
					"longitude": "126.9461324344883"
				},
				{
					"id": "17811924",
					"place_name": "이지웨이 이대점",
					"latitude": "37.5572252103555",
					"longitude": "126.945634755837"
				}
			];
		} catch (e) {
			console.log(e)
		}
	}

	return {
		getAddressInfo,
		getCafes
	}
}
