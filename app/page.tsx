"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronDown,
	MapPin,
	Star,
	Wifi,
	Coffee,
	DollarSign,
	Search,
	ArrowUpDown,
	Instagram,
	Twitter,
	Mail,
	Phone,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { cities, regions } from "@/lib/data";
import { BackgroundPaths } from "@/components/ui/background-paths";

const sortOptions = [
	{ id: "nomad-score", name: "노마드 점수 순", icon: Star },
	{ id: "cost-low", name: "생활비 낮은 순", icon: DollarSign },
	{ id: "cost-high", name: "생활비 높은 순", icon: DollarSign },
	{ id: "internet-speed", name: "인터넷 속도 순", icon: Wifi },
	{ id: "name", name: "도시명 가나다순", icon: ArrowUpDown },
];

export default function HomePage() {
	const [selectedRegion, setSelectedRegion] = useState("all");
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("nomad-score");

	const selectedRegionData =
		regions.find((r) => r.id === selectedRegion) || regions[0];

	const filteredAndSortedCities = useMemo(() => {
		let filtered = cities;

		if (selectedRegion !== "all") {
			filtered = filtered.filter((city) => city.region === selectedRegion);
		}

		if (searchQuery.trim()) {
			filtered = filtered.filter(
				(city) =>
					city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					city.regionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
					city.tags.some((tag) =>
						tag.toLowerCase().includes(searchQuery.toLowerCase())
					)
			);
		}

		const sorted = [...filtered].sort((a, b) => {
			switch (sortBy) {
				case "nomad-score":
					return b.nomadScore - a.nomadScore;
				case "cost-low":
					return a.monthlyCost - b.monthlyCost;
				case "cost-high":
					return b.monthlyCost - a.monthlyCost;
				case "internet-speed":
					return b.internetSpeed - a.internetSpeed;
				case "name":
					return a.name.localeCompare(b.name, "ko");
				default:
					return 0;
			}
		});

		return sorted;
	}, [selectedRegion, searchQuery, sortBy]);

	const formatCurrency = (amount: number) => {
		return `₩${(amount / 10000).toFixed(0)}만`;
	};

	const getCafeDensityColor = (density: string) => {
		switch (density) {
			case "높음":
				return "bg-green-100 text-green-800";
			case "보통":
				return "bg-yellow-100 text-yellow-800";
			case "낮음":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<BackgroundPaths title="KOR NOMAD" />

			{/* Regional Filter Section */}
			<section
				id="filters-section"
				className="py-12 sm:py-16 px-4 sm:px-6 bg-card"
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-8 sm:mb-12">
						<h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-balance">
							지역별 도시 검색 !{" "}
						</h3>
						<p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
							원하는 지역을 선택하여 디지털 노마드에게 최적화된 도시를
							찾아보세요
						</p>
					</div>

					{/* Desktop Filter Tabs */}
					<div className="hidden md:block mb-8">
						<div className="flex flex-wrap justify-center gap-2">
							{regions.map((region) => (
								<button
									key={region.id}
									onClick={() => setSelectedRegion(region.id)}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-[40px] touch-manipulation ${
										selectedRegion === region.id
											? "bg-primary text-primary-foreground shadow-md"
											: "bg-background text-foreground hover:bg-muted border border-border"
									}`}
								>
									{region.name}
									<span className="ml-2 text-xs opacity-70">
										({region.count})
									</span>
								</button>
							))}
						</div>
					</div>

					{/* Mobile Filter Dropdown */}
					<div className="md:hidden mb-6 sm:mb-8">
						<div className="relative">
							<button
								onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
								className="w-full flex items-center justify-between px-4 py-4 bg-background border border-border rounded-lg text-left min-h-[56px] touch-manipulation"
							>
								<div className="flex items-center gap-3">
									<MapPin
										size={20}
										className="text-muted-foreground flex-shrink-0"
									/>
									<div className="min-w-0">
										<span className="font-medium text-sm sm:text-base block truncate">
											{selectedRegionData.name}
										</span>
										<span className="text-xs sm:text-sm text-muted-foreground">
											({selectedRegionData.count}개 도시)
										</span>
									</div>
								</div>
								<ChevronDown
									size={20}
									className={`text-muted-foreground transition-transform flex-shrink-0 ${
										isMobileFilterOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{isMobileFilterOpen && (
								<div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
									{regions.map((region) => (
										<button
											key={region.id}
											onClick={() => {
												setSelectedRegion(region.id);
												setIsMobileFilterOpen(false);
											}}
											className={`w-full px-4 py-4 text-left hover:bg-muted transition-colors min-h-[56px] touch-manipulation ${
												selectedRegion === region.id
													? "bg-muted font-medium"
													: ""
											}`}
										>
											<div className="flex items-center justify-between">
												<span className="text-sm sm:text-base">
													{region.name}
												</span>
												<span className="text-xs sm:text-sm text-muted-foreground">
													{region.count}개
												</span>
											</div>
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Search and Sort Controls */}
					<div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 md:flex-row">
						<div className="flex-1 relative">
							<Search
								size={18}
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
							/>
							<Input
								placeholder="도시명, 지역명, 태그로 검색..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 h-12 sm:h-14 text-base touch-manipulation"
							/>
						</div>
						<div className="w-full md:w-64">
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="h-12 sm:h-14 text-base touch-manipulation">
									<SelectValue placeholder="정렬 기준 선택" />
								</SelectTrigger>
								<SelectContent>
									{sortOptions.map((option) => {
										const IconComponent = option.icon;
										return (
											<SelectItem
												key={option.id}
												value={option.id}
												className="py-3 touch-manipulation"
											>
												<div className="flex items-center gap-2">
													<IconComponent size={16} />
													<span className="text-sm sm:text-base">
														{option.name}
													</span>
												</div>
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Filter Results Summary */}
					<div className="text-center mb-6 sm:mb-8">
						<div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-accent/10 text-accent rounded-full">
							<MapPin size={14} className="sm:hidden" />
							<MapPin size={16} className="hidden sm:block" />
							<span className="font-medium text-sm sm:text-base">
								{searchQuery ? (
									<>검색 결과: {filteredAndSortedCities.length}개의 도시</>
								) : (
									<>
										{selectedRegionData.name}에서{" "}
										{filteredAndSortedCities.length}개의 도시를 찾았습니다
									</>
								)}
							</span>
						</div>
					</div>

					{/* City Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{filteredAndSortedCities.map((city) => (
							<Card
								key={city.id}
								className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
							>
								<div className="relative overflow-hidden">
									<img
										src={city.image || "/placeholder.svg"}
										alt={`${city.name} 도시 전경`}
										className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute top-3 right-3">
										<Badge className="bg-primary text-primary-foreground text-xs sm:text-sm">
											<Star size={10} className="mr-1 fill-current sm:hidden" />
											<Star
												size={12}
												className="mr-1 fill-current hidden sm:block"
											/>
											{city.nomadScore}
										</Badge>
									</div>
								</div>

								<CardContent className="p-3 sm:p-4">
									<div className="mb-3">
										<h4 className="text-base sm:text-lg font-semibold text-foreground mb-1 leading-tight">
											{city.name}
										</h4>
										<p className="text-xs sm:text-sm text-muted-foreground">
											{city.regionName}
										</p>
									</div>

									<div className="space-y-2 mb-3 sm:mb-4">
										<div className="flex items-center justify-between text-xs sm:text-sm">
											<div className="flex items-center gap-2">
												<DollarSign
													size={12}
													className="text-muted-foreground sm:hidden"
												/>
												<DollarSign
													size={14}
													className="text-muted-foreground hidden sm:block"
												/>
												<span>월 생활비</span>
											</div>
											<span className="font-medium">
												{formatCurrency(city.monthlyCost)}
											</span>
										</div>

										<div className="flex items-center justify-between text-xs sm:text-sm">
											<div className="flex items-center gap-2">
												<Wifi
													size={12}
													className="text-muted-foreground sm:hidden"
												/>
												<Wifi
													size={14}
													className="text-muted-foreground hidden sm:block"
												/>
												<span>평균 인터넷</span>
											</div>
											<span className="font-medium">
												{city.internetSpeed}Mbps
											</span>
										</div>

										<div className="flex items-center justify-between text-xs sm:text-sm">
											<div className="flex items-center gap-2">
												<Coffee
													size={12}
													className="text-muted-foreground sm:hidden"
												/>
												<Coffee
													size={14}
													className="text-muted-foreground hidden sm:block"
												/>
												<span>카페 밀도</span>
											</div>
											<Badge
												variant="secondary"
												className={`${getCafeDensityColor(
													city.cafeDensity
												)} text-xs`}
											>
												{city.cafeDensity}
											</Badge>
										</div>
									</div>

									<div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
										{city.tags.map((tag, index) => (
											<Badge key={index} variant="outline" className="text-xs">
												#{tag}
											</Badge>
										))}
									</div>

									<Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground min-h-[44px] text-sm sm:text-base touch-manipulation">
										자세히 보기
									</Button>
								</CardContent>
							</Card>
						))}
					</div>

					{/* No Results State */}
					{filteredAndSortedCities.length === 0 && (
						<div className="text-center py-8 sm:py-12">
							<Search
								size={40}
								className="mx-auto mb-4 text-muted-foreground opacity-50 sm:hidden"
							/>
							<Search
								size={48}
								className="mx-auto mb-4 text-muted-foreground opacity-50 hidden sm:block"
							/>
							<p className="text-base sm:text-lg font-medium text-muted-foreground mb-2">
								{searchQuery
									? "검색 결과가 없습니다"
									: "선택한 지역에 도시 데이터가 없습니다"}
							</p>
							<p className="text-sm text-muted-foreground">
								{searchQuery
									? "다른 검색어를 시도해보세요"
									: "다른 지역을 선택해보세요"}
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-primary text-primary-foreground py-8 sm:py-12 px-4 sm:px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
						<div className="col-span-1 sm:col-span-2">
							<h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
								KOR NOMAD
							</h4>
							<p className="text-primary-foreground/80 mb-3 sm:mb-4 text-sm sm:text-base">
								한국 디지털 노마드 커뮤니티 !!
							</p>

							{/* Social Media Icons */}
							<div className="flex items-center gap-4 mb-4">
								<a
									href="https://instagram.com/kor_nomad"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full transition-colors duration-200 group"
									aria-label="인스타그램 팔로우"
								>
									<Instagram
										size={20}
										className="text-primary-foreground group-hover:scale-110 transition-transform duration-200"
									/>
								</a>
								<a
									href="https://twitter.com/kor_nomad"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full transition-colors duration-200 group"
									aria-label="트위터 팔로우"
								>
									<Twitter
										size={20}
										className="text-primary-foreground group-hover:scale-110 transition-transform duration-200"
									/>
								</a>
							</div>

							<p className="text-xs sm:text-sm text-primary-foreground/60">
								Copyright © 2025 KOR NOMAD. All rights reserved.
							</p>
						</div>

						<div>
							<h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
								서비스
							</h5>
							<ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/80">
								<li>도시 추천</li>
								<li>생활비 정보</li>
								<li>카페 정보</li>
								<li>인터넷 속도</li>
							</ul>
						</div>

						<div>
							<h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
								정보
							</h5>
							<ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/80">
								<li>이용약관</li>
								<li>개인정보처리방침</li>
								<li>데이터 출처</li>
								<li>문의하기</li>
							</ul>
						</div>

						<div>
							<h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
								연락처
							</h5>
							<div className="space-y-3 text-xs sm:text-sm text-primary-foreground/80">
								<div className="flex items-center gap-2">
									<Mail size={16} className="text-primary-foreground/60" />
									<a
										href="mailto:aa@aa.aa"
										className="hover:text-primary-foreground transition-colors duration-200"
									>
										aa@aa.aa
									</a>
								</div>
								<div className="flex items-center gap-2">
									<Phone size={16} className="text-primary-foreground/60" />
									<a
										href="tel:+821012341234"
										className="hover:text-primary-foreground transition-colors duration-200"
									>
										+82-10-1234-1234
									</a>
								</div>
								<div className="flex items-center gap-2">
									<MapPin size={16} className="text-primary-foreground/60" />
									<span>경기도 다낭시 한시장</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
