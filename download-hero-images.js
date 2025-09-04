const https = require("https");
const fs = require("fs");
const path = require("path");

// Unsplash API 키
const UNSPLASH_ACCESS_KEY = "8XpSxw4e_4Ci9yMKfGKNXpMT9KyFKbZpTklUF3E4sUg";

// 히어로 섹션용 이미지들
const heroImages = [
	{
		name: "hero-main",
		query: "digital nomad laptop coffee shop",
		description: "메인 히어로 이미지 - 디지털 노마드가 카페에서 작업하는 모습",
	},
	{
		name: "hero-seoul",
		query: "Seoul skyline modern city",
		description: "서울 스카이라인 이미지",
	},
	{
		name: "hero-workspace",
		query: "modern workspace laptop setup",
		description: "모던 워크스페이스 이미지",
	},
	{
		name: "hero-travel",
		query: "digital nomad travel laptop",
		description: "디지털 노마드 여행 이미지",
	},
];

async function downloadImage(url, filename) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(
			path.join(__dirname, "public", "hero", filename)
		);
		https
			.get(url, (response) => {
				response.pipe(file);
				file.on("finish", () => {
					file.close();
					console.log(`✅ Downloaded: ${filename}`);
					resolve();
				});
			})
			.on("error", (err) => {
				fs.unlink(filename, () => {});
				reject(err);
			});
	});
}

async function searchAndDownload(query, filename) {
	try {
		const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
			query
		)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;

		const response = await fetch(searchUrl);
		const data = await response.json();

		if (data.results && data.results.length > 0) {
			const imageUrl = data.results[0].urls.full; // 더 큰 이미지 사용
			await downloadImage(imageUrl, filename);
		} else {
			console.log(`❌ No image found for: ${query}`);
		}
	} catch (error) {
		console.error(`❌ Error downloading ${filename}:`, error.message);
	}
}

async function main() {
	console.log("🚀 Starting hero images download...");

	// hero 폴더가 없으면 생성
	const heroDir = path.join(__dirname, "public", "hero");
	if (!fs.existsSync(heroDir)) {
		fs.mkdirSync(heroDir, { recursive: true });
		console.log("📁 Created hero directory");
	}

	for (const image of heroImages) {
		console.log(`🔍 Searching for: ${image.description}`);
		await searchAndDownload(image.query, `${image.name}.jpg`);
		// API 제한을 피하기 위해 1초 대기
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	console.log("🎉 All hero images downloaded!");
}

main().catch(console.error);
