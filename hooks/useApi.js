import axios from 'axios';

export default function() {
	const getAddressInfo = async (region) => {
		try {
			const { data } = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
				params: {
					query: region
				},
				headers: {
					Authorization: `KakaoAK 33655198691cb10e829905513d2ac52b`
				}
			});
			const [regionInfo] = data.documents;

			return {
				name: regionInfo?.address_name || '',
				x: 126.94626430747425,
				y: 37.55681734677461
			}
		} catch (e) {
			console.log(e)
		}
	}

	const getCafes = async (x, y) => {
		try {
			const { data } = await axios.get('https://aa09cqohrh.execute-api.ap-northeast-2.amazonaws.com/gdg-hackathon-lambda-index-1/cafes', {
				params: {
					latitude: y,
					longitude: x,
				}
			});
			if (!data.success) throw new Error('카페 불러오기 오류');

			return data.data;
		} catch (e) {
			console.log(e)
		}
	}

	const getCafeInfo = async (cafeId) => {
		try {
			const { data } = await axios.get(`https://ukklugbx3d.execute-api.ap-northeast-2.amazonaws.com/cagong/cafes/${cafeId}`);
			if (!data.success) throw new Error('카페 불러오기 오류');

			return data.data;
		} catch (e) {
			console.log(e)
		}
	}

	return {
		getAddressInfo,
		getCafes,
		getCafeInfo
	}
}
