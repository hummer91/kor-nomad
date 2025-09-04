// 도시 데이터 타입 정의
export interface City {
	id: number;
	name: string;
	region: string;
	regionName: string;
	image: string;
	nomadScore: number;
	monthlyCost: number;
	internetSpeed: number;
	cafeDensity: string;
	tags: string[];
}

export interface Region {
	id: string;
	name: string;
	count: number;
}

// 지역 데이터
export const regions: Region[] = [
	{ id: "all", name: "전체", count: 85 },
	{ id: "seoul", name: "서울특별시", count: 25 },
	{ id: "gyeonggi", name: "경기도", count: 31 },
	{ id: "incheon", name: "인천광역시", count: 10 },
	{ id: "gangwon", name: "강원도", count: 18 },
	{ id: "chungbuk", name: "충청북도", count: 11 },
	{ id: "chungnam", name: "충청남도", count: 15 },
	{ id: "daejeon", name: "대전광역시", count: 5 },
	{ id: "sejong", name: "세종특별자치시", count: 1 },
	{ id: "jeonbuk", name: "전라북도", count: 14 },
	{ id: "jeonnam", name: "전라남도", count: 22 },
	{ id: "gwangju", name: "광주광역시", count: 5 },
	{ id: "gyeongbuk", name: "경상북도", count: 23 },
	{ id: "gyeongnam", name: "경상남도", count: 18 },
	{ id: "daegu", name: "대구광역시", count: 8 },
	{ id: "ulsan", name: "울산광역시", count: 5 },
	{ id: "busan", name: "부산광역시", count: 16 },
	{ id: "jeju", name: "제주특별자치도", count: 2 },
];

// 도시 데이터
export const cities: City[] = [
	{
		id: 1,
		name: "강남구",
		region: "seoul",
		regionName: "서울특별시",
		image: "/city/gangnam.jpg",
		nomadScore: 4.8,
		monthlyCost: 2800000,
		internetSpeed: 95,
		cafeDensity: "높음",
		tags: ["IT허브", "비즈니스", "쇼핑"],
	},
	{
		id: 2,
		name: "홍대",
		region: "seoul",
		regionName: "서울특별시",
		image: "/city/hongdae.jpg",
		nomadScore: 4.6,
		monthlyCost: 2200000,
		internetSpeed: 88,
		cafeDensity: "높음",
		tags: ["창작", "문화", "청년"],
	},
	{
		id: 3,
		name: "판교",
		region: "gyeonggi",
		regionName: "경기도",
		image: "/city/pangyo.jpg",
		nomadScore: 4.7,
		monthlyCost: 2400000,
		internetSpeed: 100,
		cafeDensity: "높음",
		tags: ["테크밸리", "스타트업", "IT"],
	},
	{
		id: 4,
		name: "해운대",
		region: "busan",
		regionName: "부산광역시",
		image: "/city/daegu.jpg",
		nomadScore: 4.3,
		monthlyCost: 1600000,
		internetSpeed: 75,
		cafeDensity: "보통",
		tags: ["해변", "관광", "휴양"],
	},
	{
		id: 5,
		name: "제주시",
		region: "jeju",
		regionName: "제주특별자치도",
		image: "/city/jeju.jpg",
		nomadScore: 4.5,
		monthlyCost: 1800000,
		internetSpeed: 70,
		cafeDensity: "보통",
		tags: ["자연", "힐링", "워케이션"],
	},
	{
		id: 6,
		name: "송도",
		region: "incheon",
		regionName: "인천광역시",
		image: "/city/songdo.jpg",
		nomadScore: 4.4,
		monthlyCost: 2000000,
		internetSpeed: 92,
		cafeDensity: "보통",
		tags: ["스마트시티", "국제", "신도시"],
	},
	{
		id: 7,
		name: "대전 유성구",
		region: "daejeon",
		regionName: "대전광역시",
		image: "/city/daejeon.jpg",
		nomadScore: 4.2,
		monthlyCost: 1400000,
		internetSpeed: 85,
		cafeDensity: "보통",
		tags: ["연구", "과학", "대학"],
	},
	{
		id: 8,
		name: "광주 상무지구",
		region: "gwangju",
		regionName: "광주광역시",
		image: "/city/gwangju.jpg",
		nomadScore: 4.0,
		monthlyCost: 1300000,
		internetSpeed: 80,
		cafeDensity: "보통",
		tags: ["문화", "예술", "전통"],
	},
	{
		id: 9,
		name: "춘천",
		region: "gangwon",
		regionName: "강원도",
		image: "/city/chuncheon.jpg",
		nomadScore: 3.9,
		monthlyCost: 1200000,
		internetSpeed: 65,
		cafeDensity: "낮음",
		tags: ["자연", "호수", "조용함"],
	},
	{
		id: 10,
		name: "세종시",
		region: "sejong",
		regionName: "세종특별자치시",
		image: "/city/sejong.jpg",
		nomadScore: 4.1,
		monthlyCost: 1500000,
		internetSpeed: 88,
		cafeDensity: "보통",
		tags: ["행정", "신도시", "계획도시"],
	},
	{
		id: 11,
		name: "수원",
		region: "gyeonggi",
		regionName: "경기도",
		image: "/city/suwon.jpg",
		nomadScore: 4.0,
		monthlyCost: 1700000,
		internetSpeed: 82,
		cafeDensity: "보통",
		tags: ["역사", "전통", "문화재"],
	},
	{
		id: 12,
		name: "대구 수성구",
		region: "daegu",
		regionName: "대구광역시",
		image: "/city/daegu.jpg",
		nomadScore: 3.8,
		monthlyCost: 1350000,
		internetSpeed: 78,
		cafeDensity: "보통",
		tags: ["주거", "교육", "안정"],
	},
];
