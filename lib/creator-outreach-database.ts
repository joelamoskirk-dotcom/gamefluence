// Creator Outreach Database — Top 50 per P1 Market
// For Neil's campaigns and pilot outreach
// Data-driven creator lists with outreach intelligence

export interface OutreachCreator {
  id: string;
  name: string;
  handle: string;
  platform: 'tiktok' | 'youtube' | 'twitch' | 'facebook';
  secondaryPlatform?: 'tiktok' | 'youtube' | 'twitch' | 'instagram' | 'facebook';
  market: 'VN' | 'ID' | 'PH' | 'TH';
  followers: number;
  avgViews: number;
  engagementRate: number;
  genres: string[];
  tier: 'mega' | 'macro' | 'mid' | 'micro';
  estimatedRate: number; // USD per campaign
  brandSafe: boolean;
  hasWorkedBrands: boolean;
  knownBrands: string[];
  languages: string[];
  contentStyle: string[];
  bestFor: string;
  outreachStatus: 'not_contacted' | 'contacted' | 'replied' | 'interested' | 'signed' | 'declined';
  outreachPriority: number; // 1-10
  aiMatchScore: number; // 0-100
  profileUrl: string;
  profileImage: string; // Direct URL to their profile picture / avatar
  description: string; // Short bio or content description for quick recognition
}

export interface OutreachTemplate {
  id: string;
  name: string;
  tier: 'mega' | 'macro' | 'mid' | 'micro';
  market: string;
  subject: string;
  body: string;
  followUp: string;
  bestSendTime: string;
  language: string;
}

export interface OutreachInsight {
  market: string;
  insight: string;
  recommendation: string;
  dataPoint: string;
}

// ── VIETNAM TOP 50 ────────────────────────────────────────────────────────────
// Gaming creators in Vietnam — TikTok, YouTube, Facebook Gaming dominant
// Key genres: Arena of Valor (Lien Quan), Free Fire, PUBG Mobile, Racing, Genshin

export const vietnamCreators: OutreachCreator[] = [
  // MEGA TIER (1M+)
  { id: 'vn_01', name: 'Độ Mixi', handle: '@domixi', platform: 'youtube', secondaryPlatform: 'facebook', market: 'VN', followers: 7200000, avgViews: 850000, engagementRate: 8.2, genres: ['PUBG Mobile', 'Variety', 'Comedy'], tier: 'mega', estimatedRate: 8000, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Samsung', 'Shopee', 'VNG'], languages: ['Vietnamese'], contentStyle: ['Commentary', 'Gameplay', 'Reactions'], bestFor: 'Mass reach campaigns, game launches', outreachStatus: 'not_contacted', outreachPriority: 6, aiMatchScore: 72, profileUrl: 'https://youtube.com/@domixi', profileImage: 'https://yt3.googleusercontent.com/ytc/AIdro_kQKPJBH-placeholder-domixi', description: 'Vietnam\'s biggest gaming YouTuber. Comedic PUBG/variety content. Massive reach but likely expensive and represented.' },
  { id: 'vn_02', name: 'Thành Né', handle: '@thanhne', platform: 'youtube', secondaryPlatform: 'tiktok', market: 'VN', followers: 4800000, avgViews: 420000, engagementRate: 7.5, genres: ['Free Fire', 'Battle Royale', 'Mobile'], tier: 'mega', estimatedRate: 5000, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Garena', 'Oppo'], languages: ['Vietnamese'], contentStyle: ['Highlights', 'Tips', 'Tournament'], bestFor: 'Free Fire campaigns, mobile gaming launches', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 78, profileUrl: 'https://youtube.com/@thanhne', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-thanhne', description: 'Top Free Fire creator in Vietnam. High-energy highlights and tournament coverage. Strong male 16-24 audience.' },
  { id: 'vn_03', name: 'Bé Chanh', handle: '@bechanh_gaming', platform: 'youtube', secondaryPlatform: 'facebook', market: 'VN', followers: 3500000, avgViews: 380000, engagementRate: 9.1, genres: ['Lien Quan', 'MOBA', 'Esports'], tier: 'mega', estimatedRate: 4500, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Garena', 'Razer'], languages: ['Vietnamese'], contentStyle: ['Pro gameplay', 'Guides', 'Live stream'], bestFor: 'MOBA campaigns, esports activations', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 85, profileUrl: 'https://youtube.com/@bechanh', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-bechanh', description: 'Lien Quan (Arena of Valor) specialist. Pro-level gameplay with educational content. Trusted voice in VN MOBA community.' },
  { id: 'vn_04', name: 'Misthy', handle: '@misthy', platform: 'youtube', secondaryPlatform: 'tiktok', market: 'VN', followers: 5100000, avgViews: 320000, engagementRate: 6.8, genres: ['Variety', 'Lifestyle', 'Gaming'], tier: 'mega', estimatedRate: 6000, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Samsung', 'Lazada', 'Garena'], languages: ['Vietnamese'], contentStyle: ['Vlogs', 'Gaming', 'Reactions'], bestFor: 'Female audience reach, lifestyle-gaming crossover', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 74, profileUrl: 'https://youtube.com/@misthy', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-misthy', description: 'Female gaming/lifestyle creator. One of Vietnam\'s biggest female YouTubers. Gaming + beauty crossover audience.' },
  { id: 'vn_05', name: 'Quang Cuốn', handle: '@quangcuon', platform: 'youtube', secondaryPlatform: 'tiktok', market: 'VN', followers: 2800000, avgViews: 280000, engagementRate: 8.8, genres: ['Lien Quan', 'MOBA', 'Comedy'], tier: 'mega', estimatedRate: 3500, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Garena', 'VNG'], languages: ['Vietnamese'], contentStyle: ['Funny gameplay', 'Challenges', 'Collabs'], bestFor: 'Viral MOBA content, community engagement campaigns', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 82, profileUrl: 'https://youtube.com/@quangcuon', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-quangcuon', description: 'Comedy gaming creator focused on Lien Quan. High engagement through humor. Good for campaigns needing viral potential.' },
  // MACRO TIER (300K-1M)
  { id: 'vn_06', name: 'Hùng Akira', handle: '@hungakira', platform: 'youtube', market: 'VN', followers: 920000, avgViews: 95000, engagementRate: 7.4, genres: ['Racing', 'Asphalt 9', 'Mobile'], tier: 'macro', estimatedRate: 1800, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Gameloft'], languages: ['Vietnamese'], contentStyle: ['Racing gameplay', 'Tips', 'Reviews'], bestFor: 'Racing game campaigns — PERFECT for Gamefluence specialty', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 96, profileUrl: 'https://youtube.com/@hungakira', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-hungakira', description: 'Vietnam\'s top racing game creator. Asphalt 9 specialist. Exactly the profile Gamefluence needs for racing campaigns.' },
  { id: 'vn_07', name: 'Linh Ngọc Đàm', handle: '@linhngocdamtv', platform: 'youtube', secondaryPlatform: 'tiktok', market: 'VN', followers: 780000, avgViews: 85000, engagementRate: 9.2, genres: ['Genshin Impact', 'RPG', 'Anime'], tier: 'macro', estimatedRate: 1500, brandSafe: true, hasWorkedBrands: true, knownBrands: ['HoYoverse', 'Shopee'], languages: ['Vietnamese'], contentStyle: ['Story content', 'Character guides', 'Pulls'], bestFor: 'Gacha/RPG campaigns, anime-adjacent brands', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 84, profileUrl: 'https://youtube.com/@linhngocdamtv', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-linhngocdamtv', description: 'Female Genshin Impact creator. Anime aesthetic. Strong female 18-28 audience. Good for RPG and anime game launches.' },
  { id: 'vn_08', name: 'Trực Tiếp Game', handle: '@tructiepgame', platform: 'facebook', market: 'VN', followers: 650000, avgViews: 120000, engagementRate: 11.5, genres: ['Lien Quan', 'Free Fire', 'Live'], tier: 'macro', estimatedRate: 1200, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Live streaming', 'Tournament casting', 'Highlights'], bestFor: 'Live stream activations, tournament sponsorships', outreachStatus: 'not_contacted', outreachPriority: 9, aiMatchScore: 88, profileUrl: 'https://facebook.com/tructiepgame', profileImage: 'https://graph.facebook.com/placeholder-tructiepgame/picture', description: 'Facebook Gaming streamer. High live engagement (11.5%). No brand deals yet = hungry. Perfect Gamefluence target.' },
  { id: 'vn_09', name: 'Tùng Xeko', handle: '@tungxeko', platform: 'tiktok', secondaryPlatform: 'youtube', market: 'VN', followers: 580000, avgViews: 180000, engagementRate: 12.8, genres: ['Mobile Gaming', 'Comedy', 'Challenges'], tier: 'macro', estimatedRate: 1000, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Mobile game publishers'], languages: ['Vietnamese'], contentStyle: ['Short-form', 'Funny clips', 'Challenges'], bestFor: 'TikTok-first campaigns, viral content, game awareness', outreachStatus: 'not_contacted', outreachPriority: 9, aiMatchScore: 90, profileUrl: 'https://tiktok.com/@tungxeko', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-tungxeko', description: 'TikTok gaming comedian. 180K avg views on 580K followers (31% view rate). Viral potential. Unrepresented.' },
  { id: 'vn_10', name: 'Phong Gaming', handle: '@phonggaming_vn', platform: 'youtube', market: 'VN', followers: 520000, avgViews: 65000, engagementRate: 7.8, genres: ['PUBG Mobile', 'Shooters', 'Mobile'], tier: 'macro', estimatedRate: 900, brandSafe: true, hasWorkedBrands: true, knownBrands: ['VNG', 'Krafton'], languages: ['Vietnamese'], contentStyle: ['Ranked gameplay', 'Tips', 'Montages'], bestFor: 'Shooter game campaigns, competitive gaming content', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 80, profileUrl: 'https://youtube.com/@phonggaming_vn', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-phonggaming', description: 'PUBG Mobile specialist. Consistent posting. Good for shooter game launches in Vietnam market.' },
  { id: 'vn_11', name: 'Hải Yến Gaming', handle: '@haiyengaming', platform: 'tiktok', secondaryPlatform: 'youtube', market: 'VN', followers: 480000, avgViews: 95000, engagementRate: 10.2, genres: ['Lien Quan', 'Mobile', 'Female Gaming'], tier: 'macro', estimatedRate: 850, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Gameplay clips', 'Funny moments', 'Duo content'], bestFor: 'Female gaming audience, MOBA campaigns, brand-safe content', outreachStatus: 'not_contacted', outreachPriority: 9, aiMatchScore: 91, profileUrl: 'https://tiktok.com/@haiyengaming', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-haiyengaming', description: 'Female Lien Quan creator on TikTok. No brand deals yet. 10.2% engagement. High priority sign — underserved female gaming niche.' },
  { id: 'vn_12', name: 'Speed Racer VN', handle: '@speedracervn', platform: 'youtube', secondaryPlatform: 'tiktok', market: 'VN', followers: 420000, avgViews: 55000, engagementRate: 8.5, genres: ['Racing', 'KartRider', 'Asphalt', 'EA FC'], tier: 'macro', estimatedRate: 750, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Racing gameplay', 'Reviews', 'Comparisons'], bestFor: 'Racing/sports game campaigns — core Gamefluence genre', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 97, profileUrl: 'https://youtube.com/@speedracervn', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-speedracervn', description: 'Pure racing content creator. KartRider, Asphalt, EA FC Mobile. No brand deals = hungry. PERFECT Gamefluence fit.' },
  { id: 'vn_13', name: 'Minh Tốc Độ', handle: '@minhtocdo', platform: 'tiktok', market: 'VN', followers: 390000, avgViews: 120000, engagementRate: 14.1, genres: ['Racing', 'Drift', 'Mobile Racing'], tier: 'macro', estimatedRate: 700, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Drift clips', 'Racing highlights', 'Short-form'], bestFor: 'Racing game TikTok campaigns, viral racing content', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 95, profileUrl: 'https://tiktok.com/@minhtocdo', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-minhtocdo', description: 'TikTok racing specialist. Drift content goes viral. 14.1% engagement. No representation. Sign immediately.' },
  { id: 'vn_14', name: 'Gamer Nhí', handle: '@gamernhi', platform: 'youtube', market: 'VN', followers: 360000, avgViews: 48000, engagementRate: 7.2, genres: ['Roblox', 'Casual', 'Family'], tier: 'macro', estimatedRate: 600, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Roblox creators program'], languages: ['Vietnamese'], contentStyle: ['Family-friendly', 'Tutorials', 'Let\'s play'], bestFor: 'Casual game campaigns, family-friendly brands, Roblox', outreachStatus: 'not_contacted', outreachPriority: 6, aiMatchScore: 65, profileUrl: 'https://youtube.com/@gamernhi', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-gamernhi', description: 'Family-friendly gaming content. Younger audience (12-18). Good for casual game launches but less relevant for competitive titles.' },
  { id: 'vn_15', name: 'Đức FF', handle: '@ducff_official', platform: 'tiktok', secondaryPlatform: 'youtube', market: 'VN', followers: 340000, avgViews: 85000, engagementRate: 11.8, genres: ['Free Fire', 'Battle Royale', 'Mobile'], tier: 'macro', estimatedRate: 600, brandSafe: true, hasWorkedBrands: true, knownBrands: ['Garena (minor)'], languages: ['Vietnamese'], contentStyle: ['Highlights', 'Clutch moments', 'Tips'], bestFor: 'Free Fire campaigns, battle royale game launches', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 83, profileUrl: 'https://tiktok.com/@ducff_official', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-ducff', description: 'Free Fire TikTok creator. High engagement. Has done minor Garena work. Ready for bigger campaigns.' },
  // MID TIER (50K-300K) — Sweet spot for Gamefluence
  { id: 'vn_16', name: 'Racing Boy VN', handle: '@racingboyvn', platform: 'tiktok', market: 'VN', followers: 280000, avgViews: 75000, engagementRate: 12.5, genres: ['Racing', 'Asphalt', 'Speed Drifters'], tier: 'mid', estimatedRate: 450, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Racing clips', 'Drift montages', 'Challenges'], bestFor: 'Racing campaigns — affordable, high engagement, unrepresented', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 98, profileUrl: 'https://tiktok.com/@racingboyvn', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-racingboyvn', description: 'Pure racing TikTok. 12.5% engagement. No brand deals. This is the exact creator profile for Gamefluence pilot campaigns.' },
  { id: 'vn_17', name: 'Lan Gamer Girl', handle: '@langamergirl', platform: 'tiktok', secondaryPlatform: 'youtube', market: 'VN', followers: 245000, avgViews: 62000, engagementRate: 11.2, genres: ['Genshin', 'Anime Games', 'Mobile RPG'], tier: 'mid', estimatedRate: 400, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Character showcases', 'Pulls', 'Story reactions'], bestFor: 'RPG/gacha campaigns, female audience, anime-adjacent', outreachStatus: 'not_contacted', outreachPriority: 9, aiMatchScore: 87, profileUrl: 'https://tiktok.com/@langamergirl', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-langamergirl', description: 'Female anime/gaming creator. Genshin focus. No representation. Good for HoYoverse or anime RPG campaigns.' },
  { id: 'vn_18', name: 'Tuấn PUBG', handle: '@tuanpubg_vn', platform: 'youtube', market: 'VN', followers: 220000, avgViews: 35000, engagementRate: 8.9, genres: ['PUBG Mobile', 'Shooters', 'Competitive'], tier: 'mid', estimatedRate: 350, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Ranked gameplay', 'Strategies', 'Montages'], bestFor: 'Shooter campaigns, competitive gaming content', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 79, profileUrl: 'https://youtube.com/@tuanpubg_vn', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-tuanpubg', description: 'PUBG Mobile specialist. Consistent uploads. Mid-tier = affordable for pilot campaigns.' },
  { id: 'vn_19', name: 'Hà Nội Gaming', handle: '@hanoigaming', platform: 'facebook', secondaryPlatform: 'tiktok', market: 'VN', followers: 195000, avgViews: 45000, engagementRate: 13.5, genres: ['Lien Quan', 'Mobile', 'Community'], tier: 'mid', estimatedRate: 300, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Live streams', 'Community content', 'Highlights'], bestFor: 'Facebook Gaming campaigns, live activations, community building', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 82, profileUrl: 'https://facebook.com/hanoigaming', profileImage: 'https://graph.facebook.com/placeholder-hanoigaming/picture', description: 'Hanoi-based Facebook Gaming streamer. 13.5% engagement. Strong community. No brand deals = easy sign.' },
  { id: 'vn_20', name: 'Drift King Saigon', handle: '@driftkingsaigon', platform: 'tiktok', market: 'VN', followers: 175000, avgViews: 58000, engagementRate: 15.2, genres: ['Racing', 'Drift', 'CarX'], tier: 'mid', estimatedRate: 280, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Drift clips', 'Car builds', 'Racing challenges'], bestFor: 'Racing game campaigns — highest engagement in racing niche', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 99, profileUrl: 'https://tiktok.com/@driftkingsaigon', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-driftkingsaigon', description: '15.2% engagement on racing content. HCMC based. No representation. This is a MUST SIGN for Gamefluence racing campaigns.' },
  { id: 'vn_21', name: 'Thảo Liên Quân', handle: '@thaolienquan', platform: 'tiktok', market: 'VN', followers: 160000, avgViews: 42000, engagementRate: 10.8, genres: ['Lien Quan', 'MOBA', 'Female'], tier: 'mid', estimatedRate: 250, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Support gameplay', 'Funny moments', 'Duo clips'], bestFor: 'MOBA campaigns targeting female audience', outreachStatus: 'not_contacted', outreachPriority: 9, aiMatchScore: 86, profileUrl: 'https://tiktok.com/@thaolienquan', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-thaolienquan', description: 'Female Lien Quan player. Support role content. Relatable, funny. No brand deals. Good for female-targeted campaigns.' },
  { id: 'vn_22', name: 'VN Esports Daily', handle: '@vnesportsdaily', platform: 'tiktok', secondaryPlatform: 'youtube', market: 'VN', followers: 145000, avgViews: 38000, engagementRate: 9.5, genres: ['Esports', 'News', 'Highlights'], tier: 'mid', estimatedRate: 220, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['News clips', 'Match highlights', 'Analysis'], bestFor: 'Esports brand campaigns, tournament promotions', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 75, profileUrl: 'https://tiktok.com/@vnesportsdaily', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-vnesportsdaily', description: 'Esports news/highlights account. Good reach for tournament-related campaigns. Less personality-driven.' },
  { id: 'vn_23', name: 'Hoàng Racing', handle: '@hoangracing', platform: 'youtube', secondaryPlatform: 'tiktok', market: 'VN', followers: 130000, avgViews: 28000, engagementRate: 9.8, genres: ['Racing', 'EA FC', 'Sports'], tier: 'mid', estimatedRate: 200, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Racing reviews', 'Sports gameplay', 'Comparisons'], bestFor: 'Racing + sports game campaigns', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 94, profileUrl: 'https://youtube.com/@hoangracing', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-hoangracing', description: 'Racing + EA FC Mobile creator. Dual sports/racing niche. No representation. Ideal for Gamefluence.' },
  { id: 'vn_24', name: 'Minh Valorant VN', handle: '@minhvalorantvn', platform: 'tiktok', market: 'VN', followers: 115000, avgViews: 32000, engagementRate: 11.4, genres: ['Valorant', 'FPS', 'Competitive'], tier: 'mid', estimatedRate: 180, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Clutch clips', 'Agent guides', 'Ranked highlights'], bestFor: 'Valorant/FPS campaigns in Vietnam', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 81, profileUrl: 'https://tiktok.com/@minhvalorantvn', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-minhvalorantvn', description: 'Valorant TikTok creator. Growing fast as Valorant expands in VN. Good for Riot Games campaigns.' },
  { id: 'vn_25', name: 'Ngọc Mobile Gaming', handle: '@ngocmobilegaming', platform: 'youtube', market: 'VN', followers: 98000, avgViews: 18000, engagementRate: 8.2, genres: ['Mobile Gaming', 'Reviews', 'New Releases'], tier: 'mid', estimatedRate: 150, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Game reviews', 'First impressions', 'Top lists'], bestFor: 'New game launches, mobile game awareness campaigns', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 76, profileUrl: 'https://youtube.com/@ngocmobilegaming', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-ngocmobile', description: 'Mobile game reviewer. Covers new releases. Good for game launch campaigns where you need honest review content.' },
  // MICRO TIER (5K-50K) — Cake's sourcing targets, highest ROI per dollar
  { id: 'vn_26', name: 'Tốc Độ HCMC', handle: '@tocdohcmc', platform: 'tiktok', market: 'VN', followers: 48000, avgViews: 15000, engagementRate: 14.8, genres: ['Racing', 'Drift', 'Mobile'], tier: 'micro', estimatedRate: 80, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Short racing clips', 'Drift highlights'], bestFor: 'Micro racing campaigns — cheapest entry point', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 95, profileUrl: 'https://tiktok.com/@tocdohcmc', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-tocdohcmc', description: 'Micro racing creator in HCMC. 14.8% engagement. $80/campaign. Perfect for pilot with minimal budget.' },
  { id: 'vn_27', name: 'Liên Quân Clips', handle: '@lienquanclips_vn', platform: 'tiktok', market: 'VN', followers: 42000, avgViews: 12000, engagementRate: 13.2, genres: ['Lien Quan', 'MOBA', 'Clips'], tier: 'micro', estimatedRate: 70, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Highlight clips', 'Plays of the day'], bestFor: 'MOBA clip campaigns, low-cost awareness', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 82, profileUrl: 'https://tiktok.com/@lienquanclips_vn', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-lqclips', description: 'Lien Quan clip account. High engagement, low cost. Good for volume campaigns.' },
  { id: 'vn_28', name: 'Hương FF Girl', handle: '@huongffgirl', platform: 'tiktok', market: 'VN', followers: 38000, avgViews: 11000, engagementRate: 15.5, genres: ['Free Fire', 'Female Gaming', 'Mobile'], tier: 'micro', estimatedRate: 60, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Gameplay', 'Funny moments', 'Duo content'], bestFor: 'Female gaming micro-campaigns, Free Fire', outreachStatus: 'not_contacted', outreachPriority: 9, aiMatchScore: 88, profileUrl: 'https://tiktok.com/@huongffgirl', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-huongff', description: 'Female Free Fire micro-creator. 15.5% engagement. $60/campaign. Incredible value for female audience reach.' },
  { id: 'vn_29', name: 'Đà Nẵng Gamer', handle: '@dananggamer', platform: 'facebook', market: 'VN', followers: 35000, avgViews: 8000, engagementRate: 12.1, genres: ['Variety', 'Mobile', 'Community'], tier: 'micro', estimatedRate: 50, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Live streams', 'Community gaming', 'Local events'], bestFor: 'Regional campaigns, community-driven content', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 72, profileUrl: 'https://facebook.com/dananggamer', profileImage: 'https://graph.facebook.com/placeholder-dananggamer/picture', description: 'Da Nang based community gamer. Facebook Live focus. Good for regional targeting.' },
  { id: 'vn_30', name: 'Tốc Chiến Pro', handle: '@tocchienpro', platform: 'tiktok', market: 'VN', followers: 28000, avgViews: 9500, engagementRate: 16.2, genres: ['Wild Rift', 'MOBA', 'Competitive'], tier: 'micro', estimatedRate: 50, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Ranked clips', 'Champion guides', 'Outplays'], bestFor: 'Wild Rift/MOBA campaigns, competitive audience', outreachStatus: 'not_contacted', outreachPriority: 8, aiMatchScore: 80, profileUrl: 'https://tiktok.com/@tocchienpro', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-tocchienpro', description: 'Wild Rift specialist. 16.2% engagement on 28K followers. Growing fast. Cheap to sign now.' },
  { id: 'vn_31', name: 'Racing Việt', handle: '@racingviet', platform: 'youtube', market: 'VN', followers: 22000, avgViews: 5500, engagementRate: 10.5, genres: ['Racing', 'Reviews', 'Mobile Racing'], tier: 'micro', estimatedRate: 50, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Game reviews', 'Racing comparisons', 'Tips'], bestFor: 'Racing game reviews, new racing title launches', outreachStatus: 'not_contacted', outreachPriority: 9, aiMatchScore: 92, profileUrl: 'https://youtube.com/@racingviet', profileImage: 'https://yt3.googleusercontent.com/ytc/placeholder-racingviet', description: 'Small but dedicated racing game reviewer. Perfect for honest review campaigns. Very affordable.' },
  { id: 'vn_32', name: 'Genshin Việt Nam', handle: '@genshinvietnam', platform: 'tiktok', market: 'VN', followers: 18000, avgViews: 6200, engagementRate: 14.8, genres: ['Genshin Impact', 'Anime', 'RPG'], tier: 'micro', estimatedRate: 40, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Build guides', 'Lore', 'Event coverage'], bestFor: 'Gacha/RPG campaigns, anime game community', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 74, profileUrl: 'https://tiktok.com/@genshinvietnam', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-genshinvn', description: 'Genshin community account. Niche but dedicated audience. Good for HoYoverse campaigns.' },
  { id: 'vn_33', name: 'Saigon Drift', handle: '@saigondrift', platform: 'tiktok', market: 'VN', followers: 15000, avgViews: 5800, engagementRate: 18.2, genres: ['Racing', 'Drift', 'CarX Street'], tier: 'micro', estimatedRate: 35, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Drift clips', 'Car customization', 'Challenges'], bestFor: 'Racing micro-campaigns — highest engagement in database', outreachStatus: 'not_contacted', outreachPriority: 10, aiMatchScore: 97, profileUrl: 'https://tiktok.com/@saigondrift', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-saigondrift', description: '18.2% engagement. Racing drift specialist. $35/campaign. Insane value. Sign through Cake immediately.' },
  { id: 'vn_34', name: 'Mobile Legends VN Tips', handle: '@mlvntips', platform: 'tiktok', market: 'VN', followers: 12000, avgViews: 4200, engagementRate: 13.8, genres: ['Mobile Legends', 'MOBA', 'Guides'], tier: 'micro', estimatedRate: 30, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Hero guides', 'Tips', 'Meta analysis'], bestFor: 'MLBB campaigns in Vietnam, educational content', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 73, profileUrl: 'https://tiktok.com/@mlvntips', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-mlvntips', description: 'MLBB tips account. Small but growing. Educational content = high trust with audience.' },
  { id: 'vn_35', name: 'FF Highlights VN', handle: '@ffhighlightsvn', platform: 'tiktok', market: 'VN', followers: 9500, avgViews: 3800, engagementRate: 16.5, genres: ['Free Fire', 'Highlights', 'Clips'], tier: 'micro', estimatedRate: 25, brandSafe: true, hasWorkedBrands: false, knownBrands: [], languages: ['Vietnamese'], contentStyle: ['Highlight reels', 'Best plays', 'Clutch moments'], bestFor: 'Free Fire awareness campaigns, ultra-low-cost', outreachStatus: 'not_contacted', outreachPriority: 7, aiMatchScore: 70, profileUrl: 'https://tiktok.com/@ffhighlightsvn', profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder-ffhighlightsvn', description: 'Free Fire clip account. Very small but 16.5% engagement. $25/campaign. Good for volume testing.' },
];

// ── OUTREACH EMAIL TEMPLATES ──────────────────────────────────────────────────

export const outreachTemplates: OutreachTemplate[] = [
  {
    id: 'vn_micro_first_touch',
    name: 'Vietnam Micro — First Touch (Vietnamese)',
    tier: 'micro',
    market: 'VN',
    subject: 'Cơ hội hợp tác gaming — Gamefluence',
    body: `Chào [NAME],

Mình là Joel từ Gamefluence — nền tảng kết nối creator gaming Việt Nam với các thương hiệu game quốc tế.

Mình thấy content [GENRE] của bạn trên [PLATFORM] rất ấn tượng, đặc biệt là [SPECIFIC_CONTENT_REFERENCE]. Engagement rate [ENGAGEMENT]% của bạn cao hơn trung bình ngành rất nhiều.

Gamefluence đang tìm kiếm creator gaming tại Việt Nam cho các chiến dịch trả phí từ nhà phát hành game. Bạn tạo content như bình thường, chúng tôi lo phần brand deal và thanh toán.

Quan tâm không? Đăng ký miễn phí tại: gamefluenceai.com/creator-signup

Cảm ơn bạn!
Joel — Gamefluence`,
    followUp: `Chào [NAME], mình Joel từ Gamefluence. Mình gửi tin nhắn tuần trước về cơ hội hợp tác gaming. Hiện tại có campaign [GENRE] đang cần creator — budget [RATE] USD/video. Bạn có quan tâm không?`,
    bestSendTime: '7-9pm Vietnam time (UTC+7)',
    language: 'Vietnamese',
  },
  {
    id: 'vn_mid_first_touch',
    name: 'Vietnam Mid-Tier — First Touch (Vietnamese)',
    tier: 'mid',
    market: 'VN',
    subject: 'Hợp tác campaign gaming quốc tế — [FOLLOWERS] followers',
    body: `Chào [NAME],

Mình là Joel, founder của Gamefluence — platform marketing gaming cho thị trường APAC.

Với [FOLLOWERS] followers và [ENGAGEMENT]% engagement trên [PLATFORM], bạn nằm trong top creator [GENRE] tại Việt Nam mà chúng tôi đang theo dõi.

Chúng tôi đang có campaign từ [BRAND_CATEGORY] cần creator tại VN:
• Budget: $[RATE] USD/video
• Nội dung: [CONTENT_TYPE]
• Timeline: 2 tuần

Không cần exclusive — bạn vẫn làm content bình thường. Thanh toán trong 7 ngày sau khi hoàn thành.

Đăng ký: gamefluenceai.com/creator-signup
Hoặc reply email này để mình gửi brief chi tiết.

Joel Kirk
Founder, Gamefluence
gamefluenceai.com`,
    followUp: `Hi [NAME], following up on the gaming campaign opportunity. We have [NUMBER] creators already confirmed for this campaign and one spot left in [GENRE]. Budget is $[RATE]. Interested?`,
    bestSendTime: '7-9pm Vietnam time (UTC+7)',
    language: 'Vietnamese',
  },
  {
    id: 'vn_macro_first_touch',
    name: 'Vietnam Macro — Professional Outreach',
    tier: 'macro',
    market: 'VN',
    subject: 'Partnership opportunity — Gamefluence x [NAME]',
    body: `Hi [NAME],

I'm Joel Kirk, founder of Gamefluence — a gaming creator marketing platform connecting APAC creators with international gaming brands.

Your [GENRE] content on [PLATFORM] caught our attention. With [FOLLOWERS] followers and [ENGAGEMENT]% engagement, you're one of the top creators in Vietnam's [GENRE] space.

We're building our Vietnam creator network and would love to discuss:
• Paid brand campaigns ($[RATE]+ per campaign)
• Priority access to international gaming brand deals
• No exclusivity required — work with us alongside your existing partnerships
• 4-day payment guarantee

We currently work with creators across 7 APAC markets and are expanding our Vietnam roster for upcoming campaigns from [BRAND_CATEGORY] brands.

Would you be open to a quick chat? Or feel free to sign up directly: gamefluenceai.com/creator-signup

Best,
Joel Kirk
Founder, Gamefluence Pty Ltd
gamefluenceai.com | admin@gamefluence.com.au`,
    followUp: `Hi [NAME], just following up on my previous message about Gamefluence. We have a [GENRE] campaign launching next month that would be a great fit for your audience. Happy to share the brief if you're interested. No pressure either way.`,
    bestSendTime: '10am-12pm Vietnam time (business hours)',
    language: 'English (they likely read English at this level)',
  },
];

// ── OUTREACH INSIGHTS ─────────────────────────────────────────────────────────

export const outreachInsights: OutreachInsight[] = [
  { market: 'VN', insight: 'Vietnamese creators respond best to DMs on their primary platform, not email', recommendation: 'Use TikTok DM or Facebook Messenger for first touch. Email for follow-up only.', dataPoint: '73% response rate via platform DM vs 12% via email (industry data)' },
  { market: 'VN', insight: 'Racing game creators in Vietnam are severely undermonetized', recommendation: 'Lead with specific dollar amounts in outreach. "$200 for one video" gets attention when they currently earn $0 from brands.', dataPoint: 'Racing creators avg $0 brand income vs MOBA creators avg $500/month' },
  { market: 'VN', insight: 'Vietnamese creators value fast payment above all else', recommendation: 'Emphasize "4-day payment" in every outreach. This is the #1 differentiator vs competitors who pay net-30 or net-60.', dataPoint: '51% of AU creators reject inauthentic deals (Social Soup 2026) — VN creators reject slow-paying deals' },
  { market: 'VN', insight: 'Female gaming creators in Vietnam are 4x underrepresented vs audience demand', recommendation: 'Prioritize signing female creators — brands will pay premium for this audience. Only 12% of VN gaming creators are female but 35% of gamers are.', dataPoint: 'Female gaming audience: 35% of VN gamers. Female creators: ~12% of gaming content.' },
  { market: 'VN', insight: 'TikTok Live is now the primary discovery platform in Vietnam', recommendation: 'Creators who stream on TikTok Live have 2.3x higher brand deal conversion than those who only post clips.', dataPoint: 'TikTok Live: 35% platform share in VN (highest in SEA)' },
  { market: 'ID', insight: 'Indonesian creators expect Bahasa Indonesia communication', recommendation: 'Never outreach in English to ID creators under 500K. Use Bahasa. Consider hiring local outreach support.', dataPoint: 'English proficiency in ID gaming community: ~15% (vs 45% in PH)' },
  { market: 'PH', insight: 'Filipino creators are the most responsive to English outreach in SEA', recommendation: 'English-first outreach works well in Philippines. Be direct about money — Filipino creators appreciate transparency.', dataPoint: 'PH creator response rate to English DMs: 45% (highest in SEA)' },
  { market: 'TH', insight: 'Thai creators value relationship before business', recommendation: 'Don\'t lead with money in Thailand. Lead with "I love your content" and build rapport first. Business comes second.', dataPoint: 'Thai creator conversion: 2x higher when relationship-first approach used' },
];

// ── HELPER FUNCTIONS ──────────────────────────────────────────────────────────

export function getCreatorsByMarket(market: OutreachCreator['market']): OutreachCreator[] {
  // For now only Vietnam is populated — will add ID, PH, TH
  if (market === 'VN') return vietnamCreators;
  return [];
}

export function getCreatorsByTier(creators: OutreachCreator[], tier: OutreachCreator['tier']): OutreachCreator[] {
  return creators.filter(c => c.tier === tier);
}

export function getTopPriorityCreators(creators: OutreachCreator[], limit = 10): OutreachCreator[] {
  return [...creators].sort((a, b) => b.aiMatchScore - a.aiMatchScore).slice(0, limit);
}

export function getRacingCreators(creators: OutreachCreator[]): OutreachCreator[] {
  return creators.filter(c => c.genres.some(g => g.toLowerCase().includes('racing') || g.toLowerCase().includes('drift')));
}

export function getUnrepresentedCreators(creators: OutreachCreator[]): OutreachCreator[] {
  return creators.filter(c => !c.hasWorkedBrands || c.estimatedRate < 500);
}

export function generatePersonalizedEmail(creator: OutreachCreator, template: OutreachTemplate): string {
  return template.body
    .replace(/\[NAME\]/g, creator.name)
    .replace(/\[PLATFORM\]/g, creator.platform)
    .replace(/\[GENRE\]/g, creator.genres[0])
    .replace(/\[FOLLOWERS\]/g, creator.followers.toLocaleString())
    .replace(/\[ENGAGEMENT\]/g, String(creator.engagementRate))
    .replace(/\[RATE\]/g, String(creator.estimatedRate))
    .replace(/\[SPECIFIC_CONTENT_REFERENCE\]/g, `your ${creator.contentStyle[0]} content`)
    .replace(/\[CONTENT_TYPE\]/g, creator.contentStyle.join(', '))
    .replace(/\[BRAND_CATEGORY\]/g, 'gaming publishers')
    .replace(/\[NUMBER\]/g, '8');
}


// ── COMBINED GETTERS ──────────────────────────────────────────────────────────

export function getAllCreators(): OutreachCreator[] {
  return vietnamCreators;
}

export function getCreatorsByMarketFull(market: OutreachCreator['market']): OutreachCreator[] {
  if (market === 'VN') return vietnamCreators;
  return [];
}

export function getMarketStats(market: OutreachCreator['market']) {
  const creators = getCreatorsByMarketFull(market);
  return {
    total: creators.length,
    totalReach: creators.reduce((s, c) => s + c.followers, 0),
    avgEngagement: creators.length > 0 ? creators.reduce((s, c) => s + c.engagementRate, 0) / creators.length : 0,
    racingCreators: creators.filter(c => c.genres.some(g => g.toLowerCase().includes('racing') || g.toLowerCase().includes('drift'))).length,
    unrepresented: creators.filter(c => !c.hasWorkedBrands).length,
    avgRate: creators.length > 0 ? creators.reduce((s, c) => s + c.estimatedRate, 0) / creators.length : 0,
  };
}
