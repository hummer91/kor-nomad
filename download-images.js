const https = require("https");
const fs = require("fs");
const path = require("path");

// Unsplash API 키 (무료로 발급 가능)
const UNSPLASH_ACCESS_KEY = "8XpSxw4e_4Ci9yMKfGKNXpMT9KyFKbZpTklUF3E4sUg"; // https://unsplash.com/developers 에서 발급

const cities = [
	{ name: "gangnam", query: "Seoul Gangnam skyline" },
	{ name: "hongdae", query: "Hongdae Seoul street" },
	{ name: "pangyo", query: "Pangyo techno valley" },
	{ name: "haeundae", query: "Haeundae beach Busan" },
	{ name: "jeju", query: "Jeju island Korea" },
	{ name: "songdo", query: "Songdo Incheon smart city" },
	{ name: "daejeon", query: "Daejeon city Korea" },
	{ name: "gwangju", query: "Gwangju Korea" },
	{ name: "chuncheon", query: "Chuncheon lake Korea" },
	{ name: "sejong", query: "Sejong city Korea" },
	{ name: "suwon", query: "Suwon Hwaseong fortress" },
	{ name: "daegu", query: "Daegu city Korea" },
];

async function downloadImage(url, filename) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(
			path.join(__dirname, "public", "city", filename)
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
			const imageUrl = data.results[0].urls.regular;
			await downloadImage(imageUrl, filename);
		} else {
			console.log(`❌ No image found for: ${query}`);
		}
	} catch (error) {
		console.error(`❌ Error downloading ${filename}:`, error.message);
	}
}

async function main() {
	console.log("🚀 Starting image download...");

	for (const city of cities) {
		await searchAndDownload(city.query, `${city.name}.jpg`);
		// API 제한을 피하기 위해 1초 대기
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	console.log("🎉 All images downloaded!");
}

main().catch(console.error);
