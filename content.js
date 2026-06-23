/* =====================================================================
   content.js — Discover China 所有可编辑文案都在这里
   ---------------------------------------------------------------------
   只改这个文件就能改网站文字，不用碰逻辑(app.js)。改完保存 → 刷新浏览器。

   ⚠️ 保持格式，否则页面可能白屏：
   - 文字用英文双引号 "..." 包起来；引号内别再用英文双引号(改单引号或全角)。
   - 每行结尾的逗号 , 不要删。
   - [ ] 是列表、{ } 是一组，括号要成对。
   - 建议用 VS Code 编辑，写错会标红。

   结构速查：
   1) PREP —— 4 个模块(Payments / Communication / Connectivity / Mobility)
        title 标题 · tag 副标题 · intro "为什么不一样"那段
        img   配图(本地路径 或 commonsFile("维基文件名"))
        steps Key tips: { do:"动作", why:"原因", risk:"(可选)红色提醒", opt:true(可选,标 optional) }
        warn  Common mistakes: { title:"标题", points:["错误1","错误2"...] }
        quote 旅行者引言
   2) APP_CATS —— App 分类标签(一般不动)
   3) APPS —— 每个 App
        name/cn 名称 · note 一句话描述 · link 官网(弹窗 Get the app)
        logo  图标路径(img/logos/<id>.png) · glyph 无图标时的回退字
        howto 弹窗里的分步操作(一步一句) · features 关键特性 · tip 底部提醒
        cat   属于哪个模块(pay/comm/net/mob)
   ===================================================================== */

const commonsFile = (name) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    name,
  )}?width=900`;

const PREP = [
  {
    id: "pay",
    ico: "¥",
    title: "Payments",
    tag: "Set up at home — not on arrival",
    img: "./img/payment%20demo.png",
    imgCredit: "",
    intro: "In China, payment mostly runs on QR codes — not cards, not cash. Shops, taxis, even street stalls expect WeChat Pay or Alipay, and many won't take a card at all. The good news: since 2024 you can link a Visa/Mastercard to both. Set it up at home so a declined card isn't a crisis on arrival.",
    steps: [
      { do: "Install WeChat & Alipay before you go", why: "China's two QR-code payment apps and your daily backbone — full setup in Key apps below." },
      { do: "Link a Visa/Mastercard, then test one small payment at home", why: "Card binding is far easier today but not 100% — a test means a declined card isn't a crisis on arrival. Some travellers also link a Wise card.", risk: "Some features still ask for a Chinese phone number." },
      { do: "Pay with the app's Scan (扫一扫) function, not your phone camera", why: "It's how shops, taxis and street stalls expect you to pay. Alipay even has a built-in translate button and can order daily goods to your hotel." },
      { do: "Add Nihao China as a backup", why: "UnionPay's app for travellers — works when WeChat/Alipay refuse a card. Setup in Key apps below." },
      { do: "Carry one physical bank card and 500–1000 RMB cash", why: "A real card for hotel deposits and emergencies; cash for small vendors and some tax-refund desks." },
    ],
    warn: {
      title: "Common mistakes",
      points: [
        "Relying on a single payment app — keep both WeChat and Alipay, plus some cash, since risk-control tightens at holidays.",
        "Even with the apps set up, paying a friend, a small vendor or a taxi driver by direct transfer can still fail — use cash, or have a local pay and reimburse you.",
        "Assuming your card works everywhere — bind it and run a test payment at home; plenty of places are QR-only.",
      ],
    },
    quote: "Card binding was painless this year, but a direct transfer to a street vendor kept getting declined. A test at home and some cash saved the trip.",
  },
  {
    id: "comm",
    ico: "译",
    title: "Communication",
    tag: "Cross the language gap",
    img: commonsFile("Hohhot.rue.jpg"),
    imgCredit: "Wikimedia Commons · Popolon · CC BY-SA 4.0",
    intro: "Most people in China won't speak much English, except at star hotels and tourist sites. And the apps you'd normally reach for, like Google Translate or WhatsApp, may be blocked or need data. Sort a translator with an offline pack before you go, and lean on WeChat, which is how people in China actually message, call and swap contacts.",
    steps: [
      { do: "Install a free translator with an offline Chinese pack before you go", why: "Apple, Google, Microsoft and Baidu translate are all free — grab one and download the offline pack. (Alipay and WeChat also have a built-in translate button in a pinch.) Setup in Key apps below." },
      { do: "Lean on camera & photo translate for menus and signs", why: "Point your phone at the characters — far faster than typing what you can't read." },
      { do: "Use WeChat to message, call and swap contacts", why: "It's how everyone in China stays in touch — set it up in Payments above." },
      { do: "Screenshot your hotel address and a few key phrases in Chinese", why: "Showing the Chinese text gets you a taxi home when nothing else works." },
    ],
    warn: {
      title: "Common mistakes",
      points: [
        "Relying on Google Translate without a VPN — download an offline pack, or use Apple / Microsoft / Baidu translate.",
        "Expecting WhatsApp or Instagram DMs to work — they need a VPN; locals will just ask for your WeChat.",
        "Typing characters you can't read — use the camera and handwriting modes instead.",
      ],
    },
    quote: "Camera-translating menus and showing my hotel address in Chinese got me through two weeks without a word of spoken Mandarin.",
  },
  {
    id: "mob",
    ico: "↗",
    title: "Mobility",
    tag: "Get around like it's normal",
    img: commonsFile(
      "G7232 Bullet Train leaving Zhenjiang Station on the Shanghai-Nanjing Intercity High-Speed Railway.JPG",
    ),
    imgCredit: "Wikimedia Commons · Opacitatic · CC BY 4.0",
    intro: "Distances are huge, but the high-speed-rail network is world-class and cities run on apps for maps, taxis and metro. Google Maps isn't reliable here, and hailing a car on the street invites trouble — so the right apps, set up in advance, replace almost everything.",
    steps: [
      { do: "Install Amap & DiDi before you go", why: "Your map and your taxi — Google Maps is unreliable inside China. Setup in Key apps below." },
      { do: "Save every hotel & destination address in Chinese", why: "Pinyin and English often return nothing; the Chinese string always works for maps and drivers." },
      { do: "For Beijing–Xi'an–Shanghai, lean on high-speed rail and book ahead", why: "Punctual, city-center to city-center, top-rated by travellers — popular routes open 15 days out, so book early on the free official 12306 app or Trip.com (Key apps below)." },
      { do: "Find food & honest reviews with Dianping (大众点评)", why: "Partial English, real local ratings — the local way to tell a great spot from a tourist trap. Setup in Key apps below." },
      { do: "Keep your passport ready — physical and a photo", why: "It's scanned at rail gates, hotel check-in, and many ticket pickups." },
    ],
    warn: {
      title: "Common mistakes",
      points: [
        "Going with drivers who approach you at airports and stations — use DiDi's official pickup points instead.",
        "Searching addresses in English or pinyin — paste the Chinese text, or maps return nothing.",
        "Leaving holiday rail tickets to the last minute — Golden-Week seats sell out; book as routes open 15 days ahead.",
      ],
    },
    quote: "Saving addresses in Chinese and using DiDi instead of station touts made getting around shockingly smooth.",
  },
  {
    id: "net",
    ico: "≋",
    title: "Connectivity",
    tag: "Arrive already online",
    img: commonsFile("4FF eUICC (eSIM) cards 2024.jpg"),
    imgCredit: "Wikimedia Commons · Perillamint · CC BY-SA 4.0",
    intro: "Many everyday services — Google, WhatsApp, Instagram, Gmail — are blocked inside China, and public WiFi often demands a Chinese phone number. The fix is to arrive already online: a travel eSIM (many route around the firewall) plus a tested VPN as backup, all sorted before you land.",
    steps: [
      { do: "Buy & activate a travel eSIM before you land", why: "The most reliable way online; many route around the firewall so common apps just work. Activate it on the plane.", risk: "Not every eSIM is perfect — keep a backup." },
      { do: "Install & test 1–2 VPNs at home", why: "Your backup if the eSIM underperforms — and they can't be installed once you're inside China. Setup in Key apps below." },
      { do: "Download all key apps before departure", why: "Some can't be installed from inside China — grab the ones in Key apps below now." },
      { do: "Keep international roaming as a pricier but stable fallback", why: "Expensive, but works out of the box if the eSIM fails." },
    ],
    warn: {
      title: "Common mistakes",
      points: [
        "Waiting until you land to sort connectivity — buy and activate the eSIM before takeoff.",
        "Counting on a VPN you didn't install at home — app stores and VPN sites are often blocked once you're inside China.",
        "Jumping on public WiFi — it often needs a Chinese-number SMS code; your eSIM data is more reliable and safer.",
      ],
    },
    quote: "Activating the eSIM before landing was the single best decision — I never touched a VPN, and Maps and WhatsApp just worked.",
  },
];

const APP_CATS = [
  { key: "pay", label: "Payments", ico: "¥" },
  { key: "mob", label: "Mobility & booking", ico: "↗" },
  { key: "net", label: "Connectivity & essentials", ico: "≋" },
];

const APPS = [
  {
    id: "wechat", cat: "pay", name: "WeChat", cn: "微信", note: "Pay, chat, super-app", link: "https://www.wechat.com/",
    logo: "./img/logos/wechat.png",
    setup: "Register with passport → Me → Wallet → Bank Cards → add a Visa/Mastercard, then scan to pay.",
    howto: [
      "Before you fly, install WeChat from your phone's app store.",
      "Open it, tap Sign Up, and register with your phone number + the SMS code.",
      "Set a name and password to finish the basic account.",
      "If it asks for friend verification, have someone who already uses WeChat scan your QR (Me → tap your QR) to activate it.",
      "Go to Me → Services → Wallet → Bank Cards → Add a Card and enter your Visa/Mastercard.",
      "Complete the passport identity check if prompted.",
      "To pay: tap + (top right) → Scan for a shop's QR, or Money to show your own code.",
    ],
    what: "China's everything-app: messaging, WeChat Pay, and mini-programs that quietly replace dozens of standalone apps.",
    features: [
      "Messaging, voice & video — your main contact channel in China",
      "WeChat Pay: scan-to-pay at nearly every merchant",
      "Mini-programs (DiDi, bikes, tickets, delivery) run inside — no extra install",
      "Official accounts for city guides, attractions and services",
    ],
    how: { mod: "Payments", text: "Bind a Visa/Mastercard under Me → Wallet → Bank Cards, then pay with the in-app Scan (扫一扫). Small payments are seamless; large or person-to-person transfers can be limited." },
    tip: "Setup is fiddlier than Alipay and verification can lag — do it with your passport before you fly. Coverage is the broadest, so set up both.",
  },
  {
    id: "alipay", cat: "pay", name: "Alipay", cn: "支付宝", note: "Pay, transit, tickets", link: "https://www.alipay.com/",
    logo: "./img/logos/alipay.png",
    setup: "Register → Me → Bank Cards → add a card (often accepts ones WeChat won't), then pay with the in-app Scan (扫一扫). Turn on the transit QR for metro.",
    howto: [
      "Install Alipay (the international version) before you travel.",
      "Open it, pick your country code, and sign up with your phone number + SMS code.",
      "Tap Add Bank Card (or Me → Bank Cards) and enter your Visa/Mastercard.",
      "Complete the passport verification when asked.",
      "Tap Transport on the home screen and enable the metro/bus QR for your city.",
      "To pay: tap Scan (扫一扫, top-left) and scan the merchant's QR — not your camera app.",
      "Handy extras on the home screen: the Translate and Travel tools.",
    ],
    what: "The other dominant payment super-app — often the smoothest for travellers, with built-in tourist tools.",
    features: [
      "Scan-to-pay everywhere, with smooth Visa/Mastercard support",
      "Built-in transit QR for metro & bus nationwide",
      "Built-in translate button and tourist city-services",
      "Order daily goods & travel gear via in-app Meituan, to your hotel front desk",
    ],
    how: { mod: "Payments", text: "Add an international card under Me → Bank Cards, then pay using the app's own Scan (扫一扫) — not your phone camera. Alipay often approves cards WeChat declines, rides the metro via its transit QR, and can even order essentials to your hotel through the in-app Meituan." },
    tip: "Most travellers find Alipay the more reliable of the two — but set up both.",
  },
  {
    id: "nihao", cat: "pay", name: "Nihao China", cn: "你好中国", note: "UnionPay pay · no Chinese number", link: "https://www.unionpayintl.com/en/",
    logo: "./img/logos/nihao.png",
    setup: "Sign up (no Chinese number needed) → add your card → scan to pay. Keep as backup method #3.",
    howto: [
      "Install Nihao China — no Chinese phone number needed.",
      "Open it and register with your email or phone number.",
      "Tap Add Card and enter your Visa / Mastercard / UnionPay card.",
      "Confirm the verification code your bank sends.",
      "To pay: tap Scan and scan the merchant's QR code.",
      "Use it as your backup whenever WeChat or Alipay refuse your card.",
    ],
    what: "UnionPay's official payment app built specifically for travellers — your payment safety net.",
    features: [
      "No Chinese phone number required to pay",
      "Scan-to-pay at UnionPay-accepting merchants",
      "Tourist-focused, simple sign-up",
      "Works when WeChat/Alipay refuse your card",
    ],
    how: { mod: "Payments", text: "Register, add your card, and scan to pay. If a card won't bind in WeChat or Alipay, it often works here — keep it as backup method #3." },
    tip: "Coverage is good but not universal; don't rely on it as your only method.",
  },
  {
    id: "amap", cat: "mob", name: "Amap", cn: "高德地图", note: "Maps & transit — best in China", link: "https://www.amap.com/",
    logo: "./img/logos/amap.png",
    setup: "Download but don't open it yet → phone Settings → Apps → Amap → Language → pick your language → then open it. (Changing it after first launch is much harder.) Paste Chinese addresses to navigate.",
    howto: [
      "Install Amap (AMap Global) — but DON'T open it yet.",
      "Go to phone Settings → Apps → Amap → Language.",
      "Choose English (or your language), then leave Settings.",
      "Now open Amap and allow location access.",
      "Search by pasting a Chinese address copied from your hotel booking.",
      "Tap a result → Route for walking, metro or driving directions.",
    ],
    what: "China's leading maps & navigation app — the one travellers now rate highest. Google Maps is unreliable inside China.",
    features: [
      "Accurate maps, live traffic and transit routing",
      "Walking / driving / metro directions, real-time",
      "Built-in ride-hailing and taxi booking",
      "Improving English UI; search works best in Chinese",
    ],
    how: { mod: "Mobility", text: "Paste your saved Chinese addresses to navigate, plan metro routes, and hail cars. Pairs with DiDi for door-to-door trips." },
    tip: "Search in Chinese for reliable results — save hotel addresses in Chinese to paste in.",
  },
  {
    id: "didi", cat: "mob", name: "DiDi", cn: "滴滴", note: "Ride-hailing (like Uber)", link: "https://www.didiglobal.com/",
    logo: "./img/logos/didi.png",
    setup: "Use inside WeChat/Alipay, or install standalone and register with your phone number; add your bank card, or just pay through Alipay/WeChat.",
    howto: [
      "Install DiDi Rider, or open DiDi inside WeChat/Alipay (search 'DiDi').",
      "Register with your phone number + SMS code.",
      "Set the app language to English in Settings.",
      "Add your bank card, or set payment to Alipay/WeChat.",
      "Enter your destination (paste the Chinese address) and confirm the pickup point.",
      "Tap Confirm to match a driver — payment is automatic, no cash.",
      "At airports/stations, walk to the signed 'ride-hailing / DiDi' pickup area.",
    ],
    what: "China's dominant ride-hailing app. Use it standalone, or inside the WeChat / Alipay mini-program.",
    features: [
      "Book licensed cars, taxis and premium rides",
      "Cashless — pays through your linked WeChat/Alipay",
      "English-capable; driver chat auto-translates",
      "Upfront pricing; avoids airport/station touts",
    ],
    how: { mod: "Mobility", text: "Set pickup & destination (Chinese addresses paste cleanly), match a driver, and it charges your payment app automatically. No cash, no haggling." },
    tip: "At airports and stations use the official DiDi pickup points, not drivers who approach you.",
  },
  {
    id: "rail12306", cat: "mob", name: "Railway 12306", cn: "铁路12306", note: "Official rail booking · free", link: "https://www.12306.cn/",
    logo: "./img/logos/rail12306.png",
    setup: "Register and finish passport / real-name verification ahead of time — the website verifies faster than the app.",
    howto: [
      "Install China Railway 12306 before you travel.",
      "Open it, switch the language to English, and tap Register.",
      "Enter your name exactly as printed on your passport, plus the passport number.",
      "Complete real-name verification — doing it on the 12306 website first is faster.",
      "Search your route and date; high-speed tickets open 15 days ahead.",
      "Book and pay with your card; keep the order / e-ticket number.",
      "At the station, scan your passport at the gate to board — no paper ticket.",
    ],
    what: "China Railway's official high-speed-rail booking app — English interface, passport sign-up, and no booking fees.",
    features: [
      "Official app — no commission or markup",
      "English interface",
      "Passport-based registration & e-tickets",
      "Every high-speed and sleeper route",
    ],
    how: { mod: "Mobility", text: "Book rail directly. Popular routes go on sale 15 days ahead, so register early and buy as soon as they open for the most choice." },
    tip: "Free and official — the no-fee alternative to Trip.com for trains (Trip.com is still easier for hotels & flights).",
  },
  {
    id: "trip", cat: "mob", name: "Trip.com", cn: "", note: "Trains, hotels, flights (English)", link: "https://www.trip.com/",
    logo: "./img/logos/trip.png",
    setup: "Sign in with your passport details; book rail & hotels, then save the e-ticket QR for the gate.",
    howto: [
      "Install Trip.com (English) before you travel.",
      "Sign up with your email or phone number.",
      "For trains: search the route, pick a high-speed G/D service, enter passenger passport details.",
      "Pay with your card and save the e-ticket QR / collection code.",
      "For hotels: filter to those that accept international guests.",
      "At the station, collect with your passport or scan the e-ticket.",
    ],
    what: "The main English-language booking platform for China — high-speed rail, flights, hotels and attractions in one place.",
    features: [
      "Book high-speed-rail tickets in English (easier than 12306)",
      "Hotels filtered to those that accept international guests",
      "Flights and attraction tickets together",
      "Passport-based booking; e-ticket QR for rail gates",
    ],
    how: { mod: "Mobility", text: "Book the Beijing–Xi'an–Shanghai rail legs here, then collect tickets with your passport at the station or scan the e-ticket at the gate." },
    tip: "Book holiday / Golden-Week rail early — popular routes sell out fast.",
  },
  {
    id: "dianping", cat: "mob", name: "Dianping", cn: "大众点评", note: "Local food & reviews", link: "https://www.dianping.com/",
    logo: "./img/logos/dianping.png",
    setup: "Install and switch to the English interface where it's offered; search a city to see top-rated local spots.",
    howto: [
      "Install Dianping (大众点评).",
      "Open it, allow location, and sign up with phone/email to save places.",
      "Switch to the English interface in Settings where offered (some text stays Chinese).",
      "Search a city or 'nearby' to see top-rated restaurants and sights.",
      "Tap a place for reviews, photos, price and the address.",
      "Copy the Chinese address into Amap to navigate there.",
    ],
    what: "China's local food & things-to-do guide — real reviews and rankings to find where locals actually eat and go.",
    features: [
      "Honest local reviews and ratings",
      "Find food, cafés, sights and activities by city",
      "Partial English interface",
      "Deals and bookable restaurant tables",
    ],
    how: { mod: "Mobility", text: "Search the city you're in to surface top-rated spots, then cross-check the address in Amap. Great for telling a real local favourite from a tourist trap." },
    tip: "Some listings stay in Chinese — pair it with your translator for menus and reviews.",
  },
  {
    id: "translate", cat: "comm", name: "Translator", cn: "翻译", note: "Free — Apple / Google / Baidu",
    glyph: "译",
    setup: "Pick a free one (Apple Translate, Google Translate, Microsoft Translator or Baidu) and download its offline Chinese pack before you fly.",
    howto: [
      "Pick a free app: Apple Translate (built into iPhone), Google Translate, Microsoft Translator, or Baidu Translate.",
      "Open it and download the offline Chinese (Simplified) pack.",
      "Try camera mode: point it at Chinese text to translate live.",
      "Try voice / conversation mode for talking with drivers and vendors.",
      "Remember: Google Translate needs a VPN in China — the offline pack avoids that.",
    ],
    what: "A free translation app with an offline Chinese pack — for menus, signs and talking to drivers and vendors. Any of the big ones works; there's no need to pay.",
    features: [
      "Camera translate for menus and signs",
      "Voice / conversation mode",
      "Offline pack — works without data or a VPN",
      "Handwriting & pinyin input",
    ],
    how: { mod: "Communication", text: "Apple Translate (iOS) and Microsoft Translator work without a VPN; Google Translate needs one inside China, so download its offline pack first. Baidu Translate is a solid local option — all are free." },
    tip: "Every major translator is free — skip paid dictionary apps unless you're actually learning the language.",
  },
  {
    id: "vpn", cat: "net", name: "VPN ×1–2", cn: "", note: "Set up & test at home",
    glyph: "VPN",
    setup: "Install AND test 1–2 at home before departure — they can't be added once you're inside China.",
    howto: [
      "Choose 1–2 reputable VPN apps and install them BEFORE you leave home.",
      "Create the account and pay at home — VPN sites are often blocked in China.",
      "Connect to a nearby server (Hong Kong, Singapore, Japan) and check Google/WhatsApp load.",
      "Turn on auto-connect if the app offers it.",
      "In China, open the VPN first, then your blocked apps.",
      "If one is slow or blocked, switch servers or use your second VPN.",
    ],
    what: "A VPN restores access to Google, WhatsApp, Instagram and other services blocked inside China.",
    features: [
      "Access to Google, Gmail, WhatsApp, Instagram, etc.",
      "Multiple server locations to switch if one is slow",
      "Works alongside a travel eSIM as insurance",
      "Some travel eSIMs already bypass the firewall",
    ],
    how: { mod: "Connectivity", text: "Install AND test 1–2 VPNs before departure — app stores and VPN sites are often blocked once you're in China. A good travel eSIM may make it unnecessary, but keep one as backup." },
    tip: "Must be set up at home. If your eSIM already routes around the firewall, the VPN is just insurance.",
  },
];

/* =====================================================================
   CITY & ROUTE DATA — the destinations shown on the map, and the curated
   day-by-day routes used as a starting point by the trip planner.
   (commonsFile is defined at the top of this file.)
   ===================================================================== */
const DESTINATIONS = [
  {
    id: "beijing",
    name: "Beijing",
    cn: "北京",
    region: "North China",
    lng: 116.4074,
    lat: 39.9042,
    tags: ["First trip", "History", "Food"],
    stay: "3–4 days",
    bestFor: "Imperial history",
    season: "Sep–Oct",
    hub: "Excellent",
    confidence: "Confirmed",
    summary:
      "The strongest first stop in China: Forbidden City, hutong neighborhoods, museums, and Great Wall day trips, all on a clean metro and rail grid.",
    why: "Locals treat the hutongs and Jingshan sunset, not just the big monuments, as the real Beijing.",
    mistake:
      "Skipping Forbidden City advance booking — entry is timed and sells out days ahead in peak season.",
    pair: "Two-night add-on to Xi'an by high-speed rail (about 4.5–6h).",
    keywords: ["北京 攻略", "故宫 预约", "北京 胡同 citywalk"],
    experiences: [
      "Walk the Forbidden City into Jingshan Park for the rooftop view",
      "Give one full day to Mutianyu or Jinshanling Great Wall",
      "Eat Peking duck, then street breakfast in a hutong",
    ],
    // --- enriched fields (template city; others fall back gracefully) ---
    seasonLong:
      "Best in spring (Apr–May) and autumn (Sep–Oct). Summer is hot, humid and crowded; winter is cold but clear, cheap and quiet.",
    todo: {
      see: [
        "Forbidden City & Tiananmen Square",
        "Temple of Heaven park",
        "Summer Palace lake & gardens",
      ],
      experience: [
        "Hike the Mutianyu or Jinshanling Great Wall",
        "Cycle the hutong lanes at dusk",
        "Sunset over the rooftops from Jingshan Park",
      ],
      eat: [
        "Peking roast duck",
        "Hutong street breakfast — jianbing & baozi",
        "Old-Beijing zhajiangmian noodles",
      ],
    },
    show: [
      { en: "Forbidden City", cn: "故宫" },
      { en: "Great Wall (Mutianyu)", cn: "慕田峪长城" },
      { en: "Temple of Heaven", cn: "天坛" },
      { en: "Summer Palace", cn: "颐和园" },
      { en: "Tiananmen Square", cn: "天安门广场" },
    ],
    facts: {
      rail: "Major high-speed-rail hub — direct trains to Xi'an, Shanghai and most of China",
      metro: "Yes — large network with English signage",
      flights: "Two international airports — Capital (PEK) and Daxing (PKX)",
      english: "Understood at major sights and hotels, limited elsewhere",
      prices:
        "Casual meal 20–40 yuan · restaurant dinner 80–150 yuan per person · mid-range hotel 400–800 yuan a night",
      climate: "Winter −5 to 5°C · summer 25 to 35°C · dry spring and autumn",
    },
    photo: commonsFile("Forbidden City Beijing Shenwumen Gate.JPG"),
    credit: "Photo: Wikimedia Commons · Kallgan · CC BY-SA 3.0",
  },
  {
    id: "shanghai",
    name: "Shanghai",
    cn: "上海",
    region: "East China",
    lng: 121.4737,
    lat: 31.2304,
    tags: ["First trip", "Food", "Slow travel"],
    stay: "2–3 days",
    bestFor: "Modern city",
    season: "Oct–Nov",
    hub: "Excellent",
    confidence: "Confirmed",
    summary:
      "A soft landing into modern China: the Bund, the Former French Concession, world-class food, and the fastest rail links in the country.",
    why: "Locals love the lane houses and café streets of the Concession far more than the tourist Bund crowds.",
    mistake:
      "Only seeing the skyline — the low-rise neighborhoods are where the city actually lives.",
    pair: "Day trip to Hangzhou or Suzhou (under 1h by train).",
    keywords: ["上海 citywalk", "上海 咖啡馆", "外滩 机位"],
    experiences: [
      "See the Bund and Lujiazui at blue hour from the Bund side",
      "Wander the Former French Concession's plane-tree lanes",
      "Eat xiaolongbao and scallion-oil noodles for breakfast",
    ],
    seasonLong:
      "Best in late spring (Apr–May) and autumn (Oct–Nov). Summers are hot and humid with a June plum-rain spell; winters damp and chilly but mild.",
    show: [
      { en: "The Bund", cn: "外滩" },
      { en: "Yu Garden", cn: "豫园" },
      { en: "Wukang Road", cn: "武康路" },
      { en: "Shanghai Museum", cn: "上海博物馆" },
      { en: "Oriental Pearl Tower", cn: "东方明珠" },
    ],
    todo: {
      see: [
        "The Bund waterfront & colonial architecture",
        "Yu Garden and the old-town bazaar",
        "Shanghai Museum",
      ],
      experience: [
        "Wander the Former French Concession's plane-tree lanes",
        "Blue hour over Lujiazui from the Bund side",
        "Café-hop along Wukang Road",
      ],
      eat: [
        "Xiaolongbao soup dumplings",
        "Scallion-oil noodles",
        "Sheng jian pan-fried buns",
      ],
    },
    facts: {
      rail: "China's fastest links — Beijing ~4.5h, Hangzhou & Suzhou under 1 hour",
      metro: "Yes — the world's largest metro, bilingual signage",
      flights: "Two airports — Pudong (PVG, international) and Hongqiao (SHA, mostly domestic)",
      english: "The most widely understood in China, at hotels, sights and cafés",
      prices:
        "Casual meal 30–60 yuan · restaurant dinner 120–250 yuan per person · mid-range hotel 500–1000 yuan a night",
      climate: "Winter 2 to 10°C · summer 28 to 36°C, humid · plum rains in June",
    },
    photo: commonsFile("Shanghai Pudong Skyline.jpg"),
    credit: "Photo: Wikimedia Commons · Dynastie des Tang · public domain",
  },
  {
    id: "xian",
    name: "Xi'an",
    cn: "西安",
    region: "Shaanxi",
    lng: 108.9398,
    lat: 34.3416,
    tags: ["First trip", "History", "Food"],
    stay: "2 days",
    bestFor: "Ancient capital",
    season: "Sep–Oct",
    hub: "Strong",
    confidence: "Confirmed",
    summary:
      "One of China's great ancient capitals — Terracotta Warriors, an intact city wall you can cycle, pagodas, and a serious street-food scene.",
    why: "The Muslim Quarter night-eating culture is a local ritual, not a tourist set piece.",
    mistake:
      "Rushing the Terracotta Warriors without a guide or audio — the context is the whole point.",
    pair: "Mid-route hinge between Beijing and Chengdu / Shanghai.",
    keywords: ["西安 攻略", "兵马俑 讲解", "西安 美食"],
    experiences: [
      "Visit the Terracotta Warriors with a guide or audio guide",
      "Cycle the full loop of the old city wall at dusk",
      "Eat roujiamo and biangbiang noodles in the Muslim Quarter",
    ],
    seasonLong:
      "Best in spring (Apr–May) and autumn (Sep–Oct). Summers are hot and dusty; winters cold and grey, but quiet and cheap.",
    show: [
      { en: "Terracotta Warriors", cn: "兵马俑" },
      { en: "Xi'an City Wall", cn: "西安城墙" },
      { en: "Big Wild Goose Pagoda", cn: "大雁塔" },
      { en: "Muslim Quarter", cn: "回民街" },
      { en: "Bell Tower", cn: "钟楼" },
    ],
    todo: {
      see: [
        "Terracotta Warriors, Pit 1",
        "The intact Ming-era city wall",
        "Big Wild Goose Pagoda",
      ],
      experience: [
        "Cycle the full city-wall loop at dusk",
        "Night-eat through the Muslim Quarter",
        "Drum & Bell Tower square after dark",
      ],
      eat: [
        "Roujiamo — the 'Chinese burger'",
        "Biangbiang hand-pulled noodles",
        "Lamb paomo bread soup",
      ],
    },
    facts: {
      rail: "Central high-speed-rail hub — Beijing ~4.5–6h, Chengdu ~3h, Shanghai ~6h",
      metro: "Yes — a growing network with English signage",
      flights: "One airport — Xianyang (XIY), with some international routes",
      english: "OK at major sights and big hotels, limited in the Muslim Quarter",
      prices:
        "Casual meal 15–35 yuan · restaurant dinner 60–120 yuan per person · mid-range hotel 300–600 yuan a night",
      climate: "Winter −3 to 6°C · summer 26 to 36°C · best in spring and autumn",
    },
    photo: commonsFile("Terracotta Army, View of Pit 1.jpg"),
    credit: "Photo: Wikimedia Commons · Jmhullot · CC BY 3.0",
  },
  {
    id: "chengdu",
    name: "Chengdu",
    cn: "成都",
    region: "Sichuan",
    lng: 104.0668,
    lat: 30.5728,
    tags: ["First trip", "Food", "Slow travel"],
    stay: "3 days",
    bestFor: "Sichuan food",
    season: "Mar–Jun",
    hub: "Strong",
    confidence: "Confirmed",
    summary:
      "Sichuan food, teahouses, pandas, and an unhurried pace — plus a gateway to Leshan and the wider mountain west.",
    why: "Locals measure Chengdu by its teahouse afternoons, not its checklist sights.",
    mistake:
      "Arriving at the Panda Base late — the animals are active early morning and nap by midday.",
    pair: "Springboard west toward Yunnan or up to the mountains.",
    keywords: ["成都 美食", "成都 茶馆", "熊猫基地 预约"],
    experiences: [
      "Go at opening time to the Giant Panda Breeding base",
      "Eat hotpot, mapo tofu, and chuan-chuan skewers",
      "Lose an afternoon in a People's Park teahouse",
    ],
    seasonLong:
      "Best in spring (Mar–Jun) and autumn (Sep–Nov). Often grey and overcast; summers warm and humid, winters mild but damp.",
    show: [
      { en: "Panda Breeding Base", cn: "大熊猫繁育研究基地" },
      { en: "Kuanzhai Alley", cn: "宽窄巷子" },
      { en: "Jinli Street", cn: "锦里" },
      { en: "People's Park", cn: "人民公园" },
      { en: "Dujiangyan", cn: "都江堰" },
    ],
    todo: {
      see: [
        "Giant Panda Breeding Base (early morning)",
        "Kuanzhai & Jinli old alleys",
        "Dujiangyan irrigation works (day trip)",
      ],
      experience: [
        "A slow teahouse afternoon in People's Park",
        "A bubbling Sichuan hotpot dinner",
        "A face-changing Sichuan-opera show",
      ],
      eat: [
        "Sichuan hotpot",
        "Mapo tofu",
        "Chuan-chuan skewers & dan dan noodles",
      ],
    },
    facts: {
      rail: "Major western hub — Xi'an ~3h, Chongqing ~1.5h, Shanghai ~7–11h",
      metro: "Yes — large modern network with English signage, links both airports",
      flights: "Two international airports — Shuangliu (CTU) and Tianfu (TFU)",
      english: "Limited beyond hotels and big sights — a translator helps",
      prices:
        "Casual meal 15–40 yuan · restaurant dinner 70–140 yuan per person · mid-range hotel 300–600 yuan a night",
      climate: "Winter 5 to 10°C, damp · summer 25 to 33°C · mild, often cloudy",
    },
    photo: commonsFile("Chengdu Panda base.jpg"),
    credit: "Photo: Wikimedia Commons · David Castor · public domain",
  },
  {
    id: "guilin",
    name: "Guilin",
    cn: "桂林",
    region: "Guangxi",
    lng: 110.29,
    lat: 25.2736,
    tags: ["Nature", "Slow travel"],
    stay: "2–3 days",
    bestFor: "Karst scenery",
    season: "Apr–Oct",
    hub: "Good",
    confidence: "Confirmed",
    summary:
      "Limestone peaks, the Li River, and Yangshuo's countryside — the postcard China that actually delivers if you base outside the city.",
    why: "Locals base in Yangshuo, not Guilin city, for the river and cycling.",
    mistake:
      "Staying only in Guilin city — the scenery you came for is downstream in Yangshuo.",
    pair: "Easy nature pairing with Zhangjiajie.",
    keywords: ["桂林 阳朔 攻略", "漓江 游船", "龙脊梯田"],
    experiences: [
      "Cruise or raft the Li River between Guilin and Yangshuo",
      "Cycle the karst countryside around Yangshuo",
      "Add Longji rice terraces in the right season",
    ],
    seasonLong:
      "Best Apr–Oct, when the river is greenest after spring rains. Summers warm and wet; winters mild but misty.",
    show: [
      { en: "Li River", cn: "漓江" },
      { en: "Yangshuo", cn: "阳朔" },
      { en: "Longji Rice Terraces", cn: "龙脊梯田" },
      { en: "Elephant Trunk Hill", cn: "象鼻山" },
      { en: "West Street (Yangshuo)", cn: "阳朔西街" },
    ],
    todo: {
      see: [
        "Li River karst peaks",
        "Longji (Dragon's Backbone) rice terraces",
        "Elephant Trunk Hill",
      ],
      experience: [
        "Cruise or bamboo-raft the Li River to Yangshuo",
        "Cycle the countryside lanes around Yangshuo",
        "Yangshuo West Street in the evening",
      ],
      eat: [
        "Guilin rice noodles (米粉)",
        "Yangshuo beer fish",
        "Stuffed Li River snails",
      ],
    },
    facts: {
      rail: "On the high-speed network — Guangzhou ~2.5–3h; Yangshuo has its own rail station",
      metro: "No metro — use buses, taxis and DiDi; base in Yangshuo for cycling",
      flights: "One airport — Liangjiang (KWL), mostly domestic plus some regional",
      english: "Some English in Yangshuo's tourist areas, little elsewhere",
      prices:
        "Casual meal 15–35 yuan · restaurant dinner 50–110 yuan per person · mid-range hotel 250–550 yuan a night",
      climate: "Winter 8 to 14°C, misty · summer 26 to 34°C, wet · lush after rain",
    },
    photo: commonsFile("Guilin li river.jpg"),
    credit: "Photo: Wikimedia Commons · Mgmoscatello · CC BY-SA 3.0",
  },
  {
    id: "zhangjiajie",
    name: "Zhangjiajie",
    cn: "张家界",
    region: "Hunan",
    lng: 110.479,
    lat: 29.117,
    tags: ["Nature"],
    stay: "2–3 days",
    bestFor: "Mountain scenery",
    season: "Apr–Oct",
    hub: "Moderate",
    confidence: "Likely",
    summary:
      "Sandstone pillars, cliff walks, and glass bridges — the dramatic vertical landscape that inspired floating-mountain film scenery.",
    why: "Locals chase clear-weather windows; the pillars vanish in fog.",
    mistake:
      "Booking Tianmen Mountain on a cloudy day and seeing nothing.",
    pair: "Pairs naturally with Guilin for a pure-nature loop.",
    keywords: ["张家界 攻略", "张家界 国家森林公园", "天门山"],
    experiences: [
      "Walk Yuanjiajie and Tianzi Mountain in the forest park",
      "Take the Bailong Elevator for the classic vertical view",
      "Save Tianmen Mountain for a clear day",
    ],
    seasonLong:
      "Best Apr–Oct on clear days — the pillars vanish in fog and winter cold. Autumn brings the clearest skies.",
    show: [
      { en: "National Forest Park", cn: "张家界国家森林公园" },
      { en: "Tianmen Mountain", cn: "天门山" },
      { en: "Yuanjiajie", cn: "袁家界" },
      { en: "Glass Bridge", cn: "玻璃桥" },
      { en: "Fenghuang Old Town", cn: "凤凰古城" },
    ],
    todo: {
      see: [
        "Yuanjiajie and the 'Avatar' sandstone pillars",
        "Tianzi Mountain viewpoints",
        "Tianmen Mountain and its cliff walkways",
      ],
      experience: [
        "Ride the Bailong glass elevator",
        "Cross the Grand Canyon glass bridge",
        "Side-trip to riverside Fenghuang old town",
      ],
      eat: [
        "Tujia smoked bacon (腊肉)",
        "Sour-and-spicy Hunan dishes",
        "Three-down-the-pot (三下锅)",
      ],
    },
    facts: {
      rail: "Zhangjiajie West high-speed station — direct to Changsha, Guangzhou and Guilin (~7h)",
      metro: "No metro — park shuttles, cable cars and taxis get you around",
      flights: "One airport — Zhangjiajie Hehua (DYG), mostly domestic",
      english: "Very limited — bring a translator and offline maps",
      prices:
        "Casual meal 15–35 yuan · restaurant dinner 60–120 yuan per person · mid-range hotel 250–550 yuan a night",
      climate: "Winter 0 to 8°C, foggy · summer 22 to 30°C · cool in the mountains",
    },
    photo: commonsFile(
      "Zhangjiajie National Forest Park 37718-Zhangjiajie (48757249388).jpg",
    ),
    credit: "Photo: Wikimedia Commons · xiquinhosilva · CC BY 2.0",
  },
  {
    id: "hangzhou",
    name: "Hangzhou",
    cn: "杭州",
    region: "Zhejiang",
    lng: 120.1551,
    lat: 30.2741,
    tags: ["First trip", "Slow travel", "Food"],
    stay: "1–2 days",
    bestFor: "Lake & tea",
    season: "Mar–Apr",
    hub: "Excellent",
    confidence: "Confirmed",
    summary:
      "West Lake, temples, and Longjing tea villages — a calm, walkable counterweight that pairs perfectly after Shanghai.",
    why: "Locals weekend in the tea villages above the lake, away from the crowds.",
    mistake:
      "Doing only the lake's busy east shore and missing the quiet tea hills.",
    pair: "Best as a 1–2 night extension from Shanghai.",
    keywords: ["杭州 西湖 攻略", "龙井 茶园", "灵隐寺"],
    experiences: [
      "Walk or cycle the quieter west side of West Lake",
      "Drink Longjing tea near Meijiawu village",
      "Visit Lingyin Temple and its forested paths",
    ],
    seasonLong:
      "Loveliest in spring (Mar–May) for blossoms and autumn (Sep–Nov). Summers hot and humid; winters mild, prettiest under light snow.",
    show: [
      { en: "West Lake", cn: "西湖" },
      { en: "Lingyin Temple", cn: "灵隐寺" },
      { en: "Longjing tea village", cn: "龙井村" },
      { en: "Leifeng Pagoda", cn: "雷峰塔" },
      { en: "Xixi Wetland", cn: "西溪湿地" },
    ],
    todo: {
      see: [
        "West Lake causeways & pagodas",
        "Lingyin Temple and its forest grottoes",
        "Leifeng Pagoda at sunset",
      ],
      experience: [
        "Cycle the quieter west shore of West Lake",
        "Tea-tasting in Longjing or Meijiawu village",
        "A boat across the lake at dusk",
      ],
      eat: [
        "Longjing tea shrimp",
        "West Lake vinegar fish",
        "Dongpo braised pork",
      ],
    },
    facts: {
      rail: "Excellent — Shanghai in ~1h via the Hongqiao hub; high-speed rail to most of China",
      metro: "Yes — large network expanded for the 2023 Asian Games, bilingual",
      flights: "One airport — Xiaoshan (HGH), with growing international routes",
      english: "OK at West Lake sights and hotels, limited in the tea villages",
      prices:
        "Casual meal 25–50 yuan · restaurant dinner 90–180 yuan per person · mid-range hotel 400–800 yuan a night",
      climate: "Winter 3 to 10°C · summer 28 to 36°C, humid · mild spring and autumn",
    },
    photo: commonsFile("Leifeng Pagoda at West Lake (Xi Hu), Hangzhou.jpg"),
    credit: "Photo: Wikimedia Commons · Peter · CC BY 2.0",
  },
  {
    id: "yunnan",
    name: "Yunnan",
    cn: "云南",
    region: "Southwest China",
    lng: 102.7183,
    lat: 25.0389,
    tags: ["Nature", "Slow travel", "Food"],
    stay: "5–7 days",
    bestFor: "Multi-city loop",
    season: "Mar–Jun",
    hub: "Good",
    confidence: "Likely",
    summary:
      "A province, not a city: Kunming, Dali, and Lijiang strung together by lakes, old towns, rice noodles, and mountains.",
    why: "Locals treat Dali's Erhai Lake loop as the heart of a Yunnan trip.",
    mistake:
      "Trying to 'do Yunnan' in two days — it's a loop that needs a week.",
    pair: "Reachable west from Chengdu by air or rail.",
    keywords: ["云南 路线", "大理 洱海", "丽江 古城"],
    experiences: [
      "Use Kunming as the flight and rail gateway",
      "Base in Dali for the Erhai Lake loop",
      "Continue to Lijiang or Shangri-La with more time",
    ],
    seasonLong:
      "Mild almost year-round — best Mar–Jun and Sep–Nov. A rainy season runs Jul–Aug; high passes like Shangri-La are cold in winter.",
    show: [
      { en: "Dali Old Town", cn: "大理古城" },
      { en: "Erhai Lake", cn: "洱海" },
      { en: "Lijiang Old Town", cn: "丽江古城" },
      { en: "Jade Dragon Snow Mountain", cn: "玉龙雪山" },
      { en: "Kunming", cn: "昆明" },
    ],
    todo: {
      see: [
        "Dali Old Town and the Erhai Lake loop",
        "Lijiang Old Town's canals and lanes",
        "Jade Dragon Snow Mountain",
      ],
      experience: [
        "Cycle or e-bike around Erhai Lake",
        "Push on to Shangri-La's plateau with more time",
        "Walk Lijiang early, before the crowds",
      ],
      eat: [
        "Crossing-the-bridge rice noodles (过桥米线)",
        "Yunnan wild mushrooms",
        "Dai-style grilled fish and flowers",
      ],
    },
    facts: {
      rail: "High-speed rail links Kunming–Dali–Lijiang; Kunming connects east to Chengdu & Guangzhou",
      metro: "Kunming has a 6-line metro; Dali and Lijiang use buses, taxis and scooters",
      flights: "Kunming Changshui (KMG) is a major Southeast-Asia gateway; Dali & Lijiang have airports",
      english: "Some in the backpacker areas of Dali and Lijiang, limited elsewhere",
      prices:
        "Casual meal 15–35 yuan · restaurant dinner 50–120 yuan per person · mid-range hotel 250–600 yuan a night",
      climate: "Mild all year — Kunming 8 to 24°C; nights cool with altitude, Shangri-La cold",
    },
    photo: commonsFile("Dali Old Town 80.JPG"),
    credit: "Photo: Wikimedia Commons · Brücke-Osteuropa · public domain",
  },
  {
    id: "xinjiang",
    name: "Xinjiang",
    cn: "新疆",
    region: "Northwest China",
    lng: 87.6168,
    lat: 43.8256,
    tags: ["Nature", "Food"],
    stay: "7+ days",
    bestFor: "Long landscapes",
    season: "Jun–Sep",
    hub: "Specialized",
    confidence: "Caution",
    summary:
      "Huge distances, bazaars, deserts, and alpine lakes — a road-trip-scale region that rewards planning and time, not a quick add-on.",
    why: "Locals plan Xinjiang as separate regional loops, never one fast circuit.",
    mistake:
      "Underestimating distances — cities are flights apart, not a day's drive.",
    pair: "A standalone trip; don't bolt it onto an east-China route.",
    keywords: ["新疆 自由行", "喀什 古城", "伊犁 路线"],
    experiences: [
      "Plan Kashgar, Urumqi, or Yili as separate loops",
      "Use flights and drivers for the long legs",
      "Eat laghman, polo, naan, and grilled lamb",
    ],
    seasonLong:
      "Best Jun–Sep, with September for fruit and golden poplars. Winters are long and bitterly cold; spring is dusty.",
    show: [
      { en: "Kashgar Old City", cn: "喀什古城" },
      { en: "Heavenly Lake of Tianshan", cn: "天山天池" },
      { en: "Kanas Lake", cn: "喀纳斯" },
      { en: "Nalati Grassland", cn: "那拉提草原" },
      { en: "Grand Bazaar (Urumqi)", cn: "国际大巴扎" },
    ],
    todo: {
      see: [
        "Kashgar Old City and Id Kah Mosque",
        "Heavenly Lake of Tianshan",
        "Kanas Lake and the northern valleys",
      ],
      experience: [
        "Plan Kashgar, Urumqi and Yili as separate loops",
        "Hire drivers for the long desert and grassland legs",
        "Time a visit to a Kashgar Sunday bazaar",
      ],
      eat: [
        "Laghman hand-pulled noodles",
        "Polo — lamb pilaf rice",
        "Naan and whole-lamb kebabs",
      ],
    },
    facts: {
      rail: "Long distances — high-speed line links Urumqi–Turpan–Hami; most travel is by plane or long road",
      metro: "Urumqi has a single metro line plus an airport line; elsewhere it's taxis and drivers",
      flights: "Urumqi Diwopu (URC) is the hub; Kashgar, Yining and others have airports — flying saves days",
      english: "Very limited — Uyghur and Mandarin dominate; bring a translator and a guide",
      prices:
        "Casual meal 20–45 yuan · restaurant dinner 70–150 yuan per person · mid-range hotel 250–600 yuan a night",
      climate: "Extreme — winter −15 to −5°C · summer 25 to 40°C in deserts, cool in the mountains",
    },
    photo: commonsFile("Kashgar old city IGP3789.jpg"),
    credit: "Photo: Wikimedia Commons · w0zny · CC BY-SA 3.0",
  },
  {
    id: "guangzhou",
    name: "Guangzhou",
    cn: "广州",
    region: "Guangdong",
    lng: 113.2644,
    lat: 23.1291,
    tags: ["Food", "First trip"],
    stay: "2 days",
    bestFor: "Cantonese food",
    season: "Oct–Dec",
    hub: "Excellent",
    confidence: "Confirmed",
    summary:
      "The Cantonese food capital and a southern transport hub — an easy pairing with Shenzhen, Hong Kong, or Macau.",
    why: "Morning yum cha is a daily social ritual, not a tourist activity.",
    mistake:
      "Eating dim sum at dinner — the real spread is a morning thing.",
    pair: "Anchor for a Greater Bay Area add-on.",
    keywords: ["广州 早茶", "广州 美食", "沙面"],
    experiences: [
      "Do morning dim sum at a traditional teahouse",
      "Walk Shamian Island and the old arcades",
      "Use it as a base for Greater Bay Area trips",
    ],
    seasonLong:
      "Best Oct–Dec when it's dry and warm. Long hot, humid summers (May–Sep) with heavy rain; winters mild.",
    show: [
      { en: "Shamian Island", cn: "沙面岛" },
      { en: "Canton Tower", cn: "广州塔" },
      { en: "Chen Clan Ancestral Hall", cn: "陈家祠" },
      { en: "Shangxiajiu Street", cn: "上下九步行街" },
      { en: "Yuexiu Park", cn: "越秀公园" },
    ],
    todo: {
      see: [
        "Shamian Island's colonial arcades",
        "Chen Clan Ancestral Hall",
        "Canton Tower over the skyline",
      ],
      experience: [
        "Morning yum cha — the dim-sum ritual",
        "Walk the Pearl River bund at night",
        "Base here for Foshan, Hong Kong or Macau",
      ],
      eat: [
        "Dim sum and morning tea",
        "Cantonese roast goose & char siu",
        "Late-night congee and seafood",
      ],
    },
    facts: {
      rail: "Huge hub — Hong Kong ~50 min, Guilin ~2.5h, Shanghai ~7h; gateway to the Greater Bay Area",
      metro: "Yes — one of China's largest metros, fully bilingual",
      flights: "Baiyun (CAN) — one of China's busiest international airports",
      english: "Some English plus Cantonese; understood at hotels and big restaurants",
      prices:
        "Casual meal 20–45 yuan · restaurant dinner 90–180 yuan per person · mid-range hotel 350–700 yuan a night",
      climate: "Winter 12 to 20°C, mild · summer 28 to 35°C, very humid · wet May–Sep",
    },
    photo: commonsFile("Canton Tower.JPG"),
    credit: "Photo: Wikimedia Commons · Brücke-Osteuropa · CC0",
  },
];

const PLANS = {
  firstTrip: {
    3: ["Beijing", "Beijing", "Shanghai"],
    5: ["Beijing", "Beijing", "Xi'an", "Shanghai", "Shanghai"],
    7: ["Beijing", "Beijing", "Xi'an", "Xi'an", "Shanghai", "Hangzhou", "Shanghai"],
    10: ["Beijing", "Beijing", "Xi'an", "Chengdu", "Chengdu", "Shanghai", "Hangzhou", "Guilin", "Guilin", "Shanghai"],
    14: ["Beijing", "Beijing", "Xi'an", "Xi'an", "Chengdu", "Chengdu", "Yunnan", "Yunnan", "Guilin", "Guilin", "Hangzhou", "Shanghai", "Shanghai", "Guangzhou"],
  },
  food: {
    3: ["Shanghai", "Hangzhou", "Shanghai"],
    5: ["Guangzhou", "Guangzhou", "Chengdu", "Chengdu", "Xi'an"],
    7: ["Shanghai", "Hangzhou", "Xi'an", "Xi'an", "Chengdu", "Chengdu", "Guangzhou"],
    10: ["Beijing", "Xi'an", "Xi'an", "Chengdu", "Chengdu", "Yunnan", "Yunnan", "Guangzhou", "Guangzhou", "Shanghai"],
    14: ["Beijing", "Beijing", "Xi'an", "Xi'an", "Chengdu", "Chengdu", "Yunnan", "Yunnan", "Guilin", "Guangzhou", "Guangzhou", "Hangzhou", "Shanghai", "Shanghai"],
  },
  nature: {
    3: ["Guilin", "Guilin", "Zhangjiajie"],
    5: ["Chengdu", "Zhangjiajie", "Zhangjiajie", "Guilin", "Guilin"],
    7: ["Chengdu", "Chengdu", "Yunnan", "Yunnan", "Guilin", "Guilin", "Zhangjiajie"],
    10: ["Chengdu", "Chengdu", "Yunnan", "Yunnan", "Yunnan", "Guilin", "Guilin", "Zhangjiajie", "Zhangjiajie", "Shanghai"],
    14: ["Xinjiang", "Xinjiang", "Xinjiang", "Chengdu", "Chengdu", "Yunnan", "Yunnan", "Yunnan", "Guilin", "Guilin", "Zhangjiajie", "Zhangjiajie", "Hangzhou", "Shanghai"],
  },
  slow: {
    3: ["Hangzhou", "Hangzhou", "Shanghai"],
    5: ["Shanghai", "Hangzhou", "Hangzhou", "Guilin", "Guilin"],
    7: ["Beijing", "Beijing", "Hangzhou", "Hangzhou", "Guilin", "Guilin", "Shanghai"],
    10: ["Beijing", "Beijing", "Xi'an", "Chengdu", "Chengdu", "Yunnan", "Yunnan", "Hangzhou", "Hangzhou", "Shanghai"],
    14: ["Beijing", "Beijing", "Xi'an", "Xi'an", "Chengdu", "Chengdu", "Yunnan", "Yunnan", "Yunnan", "Guilin", "Guilin", "Hangzhou", "Hangzhou", "Shanghai"],
  },
};

