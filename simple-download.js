const https = require("https");
const fs = require("fs");
const path = require("path");

// Pixabay API (무료, API 키 필요)
const PIXABAY_API_KEY = "YOUR_PIXABAY_API_KEY"; // https://pixabay.com/api/docs/ 에서 발급

const cities = [
	{ name: "gangnam", query: "seoul+city+skyline" },
	{ name: "hongdae", query: "hongdae+seoul+street" },
	{ name: "pangyo", query: "technology+business+district" },
	{ name: "haeundae", query: "beach+ocean+city" },
	{ name: "jeju", query: "jeju+island+nature" },
	{ name: "songdo", query: "modern+city+architecture" },
	{ name: "daejeon", query: "daejeon+city+korea" },
	{ name: "gwangju", query: "gwangju+korea+city" },
	{ name: "chuncheon", query: "lake+mountain+nature" },
	{ name: "sejong", query: "sejong+city+korea" },
	{ name: "suwon", query: "suwon+fortress+korea" },
	{ name: "daegu", query: "daegu+city+korea" },
];

async function downloadFromPixabay(query, filename) {
	try {
		const searchUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
			query
		)}&image_type=photo&category=places&min_width=400&per_page=3`;

		const response = await fetch(searchUrl);
		const data = await response.json();

		if (data.hits && data.hits.length > 0) {
			const imageUrl = data.hits[0].webformatURL;
			await downloadImage(imageUrl, filename);
		} else {
			console.log(`❌ No image found for: ${query}`);
		}
	} catch (error) {
		console.error(`❌ Error downloading ${filename}:`, error.message);
	}
}

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

async function main() {
	console.log("🚀 Starting image download from Pixabay...");

	for (const city of cities) {
		await downloadFromPixabay(city.query, `${city.name}.jpg`);
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	console.log("🎉 All images downloaded!");
}

main().catch(console.error);
