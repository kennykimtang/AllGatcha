import type { Locale } from "./i18n";
import type { CardCategory, CardRarity } from "./wikipedia";

export interface WebsiteEntry {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  category?: CardCategory;
  rarity?: CardRarity;
}

/** Curated "weird / interesting" websites. EN/KO for locale. */
const WEBSITES_EN: WebsiteEntry[] = [
  { title: "Pointer Pointer", description: "A site that finds a person pointing at your cursor from a huge database of photos.", url: "https://pointerpointer.com" },
  { title: "This Person Does Not Exist", description: "AI-generated faces that look real but are not. Each refresh creates a new person.", url: "https://thispersondoesnotexist.com" },
  { title: "Stars (Chrome Experiments)", description: "Interactive 100,000 stars in the browser. Zoom and explore our stellar neighborhood.", url: "https://stars.chromeexperiments.com" },
  { title: "The Useless Web", description: "A button that takes you to a random useless but entertaining website.", url: "https://theuselessweb.com" },
  { title: "Staggering Beauty", description: "Move your cursor and watch the worm go wild. Hypnotic and chaotic.", url: "https://staggeringbeauty.com" },
  { title: "Bored Button", description: "One click sends you to a random fun or weird site when you're bored.", url: "https://www.boredbutton.com" },
  { title: "Maze", description: "An endless maze you navigate with the arrow keys. Simple and addictive.", url: "https://maze.toys/mazes/mini/daily" },
  { title: "Radio Garden", description: "Listen to live radio from around the world by rotating a 3D globe.", url: "https://radio.garden", rarity: "rare" },
  { title: "Infinite Sushi", description: "Endless conveyor belt of sushi. No purpose, just vibes.", url: "https://sushistream.com" },
  { title: "Old Web Today", description: "Browse the web as it looked in the 1990s with emulated old browsers.", url: "https://oldweb.today" },
  { title: "Webdriver Torso", description: "A mysterious YouTube channel of short automated test videos. Internet legend.", url: "https://en.wikipedia.org/wiki/Webdriver_Torso" },
  { title: "Zoom Quilt", description: "Infinite zoom through collaborative art. Click to zoom in forever.", url: "https://zoomquilt.org", rarity: "legendary" },
  { title: "Patatap", description: "Tap keys to make sounds and colorful shapes. A portable sound and animation toy.", url: "https://patatap.com" },
  { title: "Silk – Interactive Generative Art", description: "Draw with your mouse and create flowing, silk-like generative art.", url: "https://weavesilk.com" },
  { title: "A Soft Murmur", description: "Mix ambient sounds (rain, thunder, coffee shop, waves) to create your own background noise.", url: "https://asoftmurmur.com" },
  { title: "Window Swap", description: "See the view from a random window somewhere in the world. Calming and voyeuristic.", url: "https://window-swap.com" },
  { title: "Drive & Listen", description: "Drive through cities around the world while listening to local radio. Immersive and relaxing.", url: "https://driveandlisten.herokuapp.com" },
  { title: "GeoGuessr", description: "You're dropped somewhere on Earth. Use street view to guess where you are.", url: "https://www.geoguessr.com", rarity: "legendary" },
  { title: "Ocearch Shark Tracker", description: "Track real sharks (and other marine life) in real time on a map.", url: "https://www.ocearch.org/tracker" },
  { title: "Flightradar24", description: "See every commercial flight in the world in real time on a live map.", url: "https://www.flightradar24.com" },
  // Science & Space
  { title: "Visible Earth (NASA)", description: "NASA's catalog of satellite imagery of Earth. Stunning photos from orbit.", url: "https://visibleearth.nasa.gov", category: "science", rarity: "rare" },
  { title: "Scale of the Universe", description: "Zoom from the quantum foam to the observable universe. Mind-bending interactive.", url: "https://htwins.net/scale2", category: "science", rarity: "rare" },
  { title: "Windy", description: "Breathtaking real-time global wind, wave, and temperature visualization on a 3D globe.", url: "https://www.windy.com", category: "science", rarity: "legendary" },
  { title: "Eyes on the Solar System (NASA)", description: "Navigate the solar system in 3D in real time. Explore planets, moons, and spacecraft.", url: "https://eyes.nasa.gov/apps/solar-system", category: "science", rarity: "legendary" },
  { title: "Stellarium Web", description: "A full planetarium in your browser. See the night sky anywhere on Earth in real time.", url: "https://stellarium-web.org", category: "science", rarity: "rare" },
  // Art & Creativity
  { title: "Google Arts & Culture — Art Selfie", description: "Find your art doppelgänger in a museum painting using your selfie.", url: "https://artsandculture.google.com/camera/selfie", category: "art", rarity: "rare" },
  { title: "The Pudding", description: "Essays visualized. Data journalism so good it feels like art.", url: "https://pudding.cool", category: "art", rarity: "rare" },
  { title: "Neal.fun — The Size of Space", description: "Scroll down to comprehend the true scale of the universe. Deceptively simple and profound.", url: "https://neal.fun/size-of-space", category: "science", rarity: "legendary" },
  { title: "Incredibox", description: "Drag and drop characters to layer beats and make your own beatbox music instantly.", url: "https://www.incredibox.com", category: "art" },
  { title: "Chrome Music Lab — Song Maker", description: "Draw melodies on a grid and play them back instantly. Music-making for everyone.", url: "https://musiclab.chromeexperiments.com/Song-Maker", category: "art" },
  // Internet Oddities
  { title: "This Website Will Self Destruct", description: "A message board that deletes itself if no one posts for 24 hours. Ephemeral community.", url: "https://www.thiswebsitewillselfdestruct.com", category: "internet" },
  { title: "Is It Christmas?", description: "A site with one purpose: tells you if today is Christmas. Updated annually.", url: "https://isitchristmas.com", category: "internet" },
  { title: "The True Size Of…", description: "Drag any country across the world map to see its true size compared to other regions.", url: "https://www.thetruesize.com", category: "knowledge", rarity: "rare" },
  { title: "Wayback Machine", description: "The internet's memory. Browse archived versions of any website going back to 1996.", url: "https://web.archive.org", category: "internet", rarity: "rare" },
  { title: "Every Noise at Once", description: "A map of every music genre on Spotify. Click any genre to hear it.", url: "https://everynoise.com", category: "culture", rarity: "legendary" },
  // Culture & Knowledge
  { title: "Falling Falling", description: "A deeply relaxing browser toy. Just watch colored shapes fall forever.", url: "https://www.fallingfalling.com", category: "internet" },
  { title: "Akinator", description: "The web genie who can guess any real or fictional character you're thinking of.", url: "https://en.akinator.com", category: "culture", rarity: "rare" },
  { title: "Nicky Case — Explorable Explanations", description: "Interactive essays on game theory, mental health, and complex systems. Learning reimagined.", url: "https://ncase.me", category: "knowledge", rarity: "legendary" },
  { title: "Gravity Points", description: "Click to create gravity wells and watch particles spiral into them. Hypnotic physics toy.", url: "https://codepen.io/akm2/full/EBmYmJ", category: "internet" },
  { title: "Eel Slap!", description: "Drag your cursor across the screen. Slap a man with an eel. That's it.", url: "https://eelslap.com", category: "internet" },
  { title: "Hacker News", description: "Tech's most influential link aggregator. Where the internet's builders actually talk.", url: "https://news.ycombinator.com", category: "knowledge" },
  { title: "Letters of Note", description: "Remarkable historical letters and telegrams from famous figures throughout history.", url: "https://lettersofnote.com", category: "history", rarity: "rare" },
  { title: "xkcd", description: "The legendary webcomic about romance, sarcasm, math, and language. Required reading.", url: "https://xkcd.com", category: "culture", rarity: "rare" },
  { title: "The Noun Project", description: "A library of over 5 million icons representing everything humans do or think about.", url: "https://thenounproject.com", category: "art" },
];

const WEBSITES_KO: WebsiteEntry[] = [
  { title: "Pointer Pointer", description: "커서 위치를 가리키는 사람 사진을 수많은 사진 DB에서 찾아 보여주는 사이트.", url: "https://pointerpointer.com" },
  { title: "This Person Does Not Exist", description: "실제 사람이 아닌 AI가 생성한 얼굴. 새로고침할 때마다 새로운 인물이 등장합니다.", url: "https://thispersondoesnotexist.com" },
  { title: "Stars (Chrome 실험)", description: "브라우저에서 탐험하는 10만 개의 별. 줌하며 우리 은하 근처를 둘러보세요.", url: "https://stars.chromeexperiments.com" },
  { title: "The Useless Web", description: "쓸모없지만 재미있는 랜덤 웹사이트로 데려다주는 버튼.", url: "https://theuselessweb.com" },
  { title: "Staggering Beauty", description: "마우스를 움직이면 벌레가 미쳐 날뜁니다. 최면적이고 혼란스러운 경험.", url: "https://staggeringbeauty.com" },
  { title: "Bored Button", description: "심심할 때 한 번 클릭으로 재미있거나 이상한 랜덤 사이트로 이동.", url: "https://www.boredbutton.com" },
  { title: "Maze", description: "화살표 키로 탐험하는 끝없는 미로. 단순하고 중독적.", url: "https://maze.toys/mazes/mini/daily" },
  { title: "Radio Garden", description: "3D 지구를 돌리며 전 세계 라이브 라디오를 들을 수 있습니다.", url: "https://radio.garden", rarity: "rare" },
  { title: "Infinite Sushi", description: "끝없이 돌아가는 회전 초밥 벨트. 목적 없이 분위기만.", url: "https://sushistream.com" },
  { title: "Old Web Today", description: "1990년대 모습의 웹을 에뮬레이터로 둘러보기.", url: "https://oldweb.today" },
  { title: "Zoom Quilt", description: "협업 아트 속으로 무한 줌인. 클릭하면 끝없이 들어갑니다.", url: "https://zoomquilt.org", rarity: "legendary" },
  { title: "Patatap", description: "키를 누르면 소리와 색깔 도형이 나오는 휴대용 사운드·애니메이션 장난감.", url: "https://patatap.com" },
  { title: "Silk – 인터랙티브 생성 예술", description: "마우스로 그리면 흐르는 실처럼 생성 예술이 만들어집니다.", url: "https://weavesilk.com" },
  { title: "A Soft Murmur", description: "비, 천둥, 카페, 파도 등 앰비언트 소리를 섞어 나만의 배경음을 만드세요.", url: "https://asoftmurmur.com" },
  { title: "Window Swap", description: "세계 어딘가 무작위 창문 밖 풍경을 보세요. 차분하고 호기심을 자극합니다.", url: "https://window-swap.com" },
  { title: "Drive & Listen", description: "전 세계 도시를 운전하며 현지 라디오를 들을 수 있습니다.", url: "https://driveandlisten.herokuapp.com" },
  { title: "GeoGuessr", description: "지구 어딘가에 떨어져 스트리트 뷰로 위치를 맞춰보세요.", url: "https://www.geoguessr.com", rarity: "legendary" },
  { title: "Ocearch Shark Tracker", description: "실제 상어와 해양 생물의 실시간 위치를 지도에서 추적합니다.", url: "https://www.ocearch.org/tracker" },
  { title: "Flightradar24", description: "전 세계 상업 항공기를 실시간 지도에서 확인하세요.", url: "https://www.flightradar24.com" },
  // 과학 & 우주
  { title: "Visible Earth (NASA)", description: "NASA의 위성 사진 아카이브. 궤도에서 찍은 지구의 숨막히는 사진들.", url: "https://visibleearth.nasa.gov", category: "science", rarity: "rare" },
  { title: "Scale of the Universe", description: "양자 거품에서 관측 가능한 우주까지 줌인·줌아웃. 뇌를 흔드는 인터랙티브 경험.", url: "https://htwins.net/scale2", category: "science", rarity: "rare" },
  { title: "Windy", description: "실시간 전 세계 바람·파도·기온을 3D 지구본으로 시각화. 장관입니다.", url: "https://www.windy.com", category: "science", rarity: "legendary" },
  { title: "Eyes on the Solar System (NASA)", description: "NASA의 3D 태양계 탐험. 실시간으로 행성, 위성, 탐사선을 탐험하세요.", url: "https://eyes.nasa.gov/apps/solar-system", category: "science", rarity: "legendary" },
  { title: "Stellarium Web", description: "브라우저 속 풀 플라네타리움. 지구 어디서든 실시간 밤하늘을 볼 수 있습니다.", url: "https://stellarium-web.org", category: "science", rarity: "rare" },
  // 아트 & 창작
  { title: "Google 아트 & 컬처 — 아트 셀피", description: "셀카로 미술관 그림 속 나의 도플갱어를 찾아보세요.", url: "https://artsandculture.google.com/camera/selfie", category: "art", rarity: "rare" },
  { title: "The Pudding", description: "시각화된 에세이. 데이터 저널리즘이 예술처럼 느껴지는 곳.", url: "https://pudding.cool", category: "art", rarity: "rare" },
  { title: "Neal.fun — 우주의 크기", description: "스크롤로 우주의 진짜 규모를 체감하세요. 단순하지만 엄청납니다.", url: "https://neal.fun/size-of-space", category: "science", rarity: "legendary" },
  { title: "Incredibox", description: "캐릭터를 끌어다 놓으면 즉석 비트박스 음악이 완성됩니다.", url: "https://www.incredibox.com", category: "art" },
  { title: "Chrome Music Lab — Song Maker", description: "그리드에 그림을 그리듯 멜로디를 만들고 즉시 재생하세요. 누구나 음악가.", url: "https://musiclab.chromeexperiments.com/Song-Maker", category: "art" },
  // 인터넷 기묘한 것들
  { title: "This Website Will Self Destruct", description: "24시간 동안 아무도 글을 올리지 않으면 사이트가 삭제되는 메시지 보드.", url: "https://www.thiswebsitewillselfdestruct.com", category: "internet" },
  { title: "Is It Christmas?", description: "오직 한 가지 목적: 오늘이 크리스마스인지 알려줍니다. 매년 업데이트.", url: "https://isitchristmas.com", category: "internet" },
  { title: "The True Size Of…", description: "세계 지도에서 국가를 드래그해 실제 크기를 비교하세요.", url: "https://www.thetruesize.com", category: "knowledge", rarity: "rare" },
  { title: "Wayback Machine", description: "인터넷의 기억. 1996년까지 거슬러 모든 웹사이트의 아카이브를 탐색하세요.", url: "https://web.archive.org", category: "internet", rarity: "rare" },
  { title: "Every Noise at Once", description: "Spotify의 모든 음악 장르를 지도로 표현. 장르를 클릭하면 음악이 나옵니다.", url: "https://everynoise.com", category: "culture", rarity: "legendary" },
  // 컬처 & 지식
  { title: "Falling Falling", description: "색깔 도형이 영원히 떨어지는 매우 힐링되는 브라우저 장난감.", url: "https://www.fallingfalling.com", category: "internet" },
  { title: "Akinator", description: "당신이 생각하는 실존·허구 인물을 맞추는 웹 지니.", url: "https://en.akinator.com", category: "culture", rarity: "rare" },
  { title: "Nicky Case — 탐험 가능한 설명들", description: "게임 이론·정신 건강·복잡계를 인터랙티브 에세이로 배우는 곳.", url: "https://ncase.me", category: "knowledge", rarity: "legendary" },
  { title: "Gravity Points", description: "클릭해 중력 우물을 만들고 입자들이 빨려드는 걸 보세요. 최면적인 물리 장난감.", url: "https://codepen.io/akm2/full/EBmYmJ", category: "internet" },
  { title: "Eel Slap!", description: "커서를 화면에 끌면 장어로 남자를 때립니다. 그게 전부예요.", url: "https://eelslap.com", category: "internet" },
  { title: "Hacker News", description: "테크 업계에서 가장 영향력 있는 링크 모음. 인터넷을 만드는 사람들이 실제로 대화하는 곳.", url: "https://news.ycombinator.com", category: "knowledge" },
  { title: "Letters of Note", description: "역사 속 유명인들의 놀라운 편지와 전보 모음.", url: "https://lettersofnote.com", category: "history", rarity: "rare" },
  { title: "xkcd", description: "로맨스·냉소·수학·언어에 관한 전설적인 웹코믹. 필독입니다.", url: "https://xkcd.com", category: "culture", rarity: "rare" },
  { title: "The Noun Project", description: "인간의 모든 행위와 생각을 아이콘으로 표현한 500만 개 이상의 아이콘 라이브러리.", url: "https://thenounproject.com", category: "art" },
];

const BY_LOCALE: Record<Locale, WebsiteEntry[]> = {
  en: WEBSITES_EN,
  ko: WEBSITES_KO,
};

export interface WebsiteCardShape {
  title: string;
  summary: string;
  image: string | null;
  url: string;
  timestamp: number;
  source: "website";
  category?: CardCategory;
  rarity?: CardRarity;
  language?: Locale;
}

/** Logo/thumbnail URL for a site. Uses Clearbit logo when available. */
function getWebsiteThumbnail(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return `https://logo.clearbit.com/${hostname}`;
  } catch {
    return "";
  }
}

export function getRandomWebsite(locale: Locale): WebsiteCardShape {
  const list = BY_LOCALE[locale];
  const entry = list[Math.floor(Math.random() * list.length)];
  const image =
    entry.image !== undefined && entry.image !== null
      ? entry.image
      : getWebsiteThumbnail(entry.url);
  return {
    title: entry.title,
    summary: entry.description,
    image: image || null,
    url: entry.url,
    timestamp: Date.now(),
    source: "website",
    language: locale,
    category: (entry.category as CardCategory | undefined) ?? "internet",
    rarity: (entry.rarity as CardRarity | undefined) ?? "common",
  };
}
