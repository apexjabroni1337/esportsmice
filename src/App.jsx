import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { Home, Mouse, Trophy, Cpu, Users, Gamepad2, Building2, TrendingUp, GitCompare } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const BRAND_COLORS = {
  Razer: "#00ff6a",
  Logitech: "#00b4ff",
  Zowie: "#ff3c3c",
  Finalmouse: "#d4af37",
  Lamzu: "#c084fc",
  Pulsar: "#f472b6",
  SteelSeries: "#ff8c00",
  Corsair: "#ffd700",
  Endgame: "#8b5cf6",
  "Endgame Gear": "#8b5cf6",
  Vaxee: "#06b6d4",
  ASUS: "#e11d48",
  Ninjutso: "#10b981",
  WLMouse: "#f59e0b",
  Sony: "#3b82f6",
  "G-Wolves": "#a78bfa",
  LGG: "#ef4444",
  HyperX: "#ff4500",
};

const MOUSE_IMAGE_URLS = {
  "Razer Viper V3 Pro": "/images/mice/razer-viper-v3-pro.png",
  "Logitech G Pro X Superlight 2": "/images/mice/logitech-g-pro-x-superlight-2.png",
  "Logitech G Pro X2 Superstrike": "/images/mice/logitech-g-pro-x2-superstrike.png",
  "Logitech G Pro X Superlight": "/images/mice/logitech-g-pro-x-superlight.png",
  "Zowie EC2-CW": "/images/mice/zowie-ec2-cw.png",
  "Razer DeathAdder V3 Pro": "/images/mice/razer-deathadder-v3-pro.png",
  "Finalmouse UltralightX": "/images/mice/finalmouse-ultralightx.png",
  "Finalmouse Starlight-12": "/images/mice/finalmouse-starlight-12.png",
  "Lamzu Maya X": "/images/mice/lamzu-maya-x.png",
  "Lamzu Atlantis Mini": "/images/mice/lamzu-atlantis-mini.png",
  "Pulsar X2F": "/images/mice/pulsar-x2f.png",
  "Vaxee Outset AX": "/images/mice/vaxee-outset-ax.png",
  "SteelSeries Aerox 5 Wireless": "/images/mice/steelseries-aerox-5-wireless.png",
  "Zowie EC2-DW": "/images/mice/zowie-ec2-dw.png",
  "Endgame Gear OP1 8K": "/images/mice/endgame-gear-op1-8k.png",
  "ASUS ROG Harpe Ace Extreme": "/images/mice/asus-rog-harpe-ace-extreme.png",
  "Corsair M75 Air": "/images/mice/corsair-m75-air.png",
  "Ninjutso Sora V2": "/images/mice/ninjutso-sora-v2.png",
  "WLMouse Beast X": "/images/mice/wlmouse-beast-x.png",
  "Sony INZONE M10": "/images/mice/sony-inzone-m10.png",
  "Razer Viper V3 HyperSpeed": "/images/mice/razer-viper-v3-hyperspeed.png",
  "Razer DeathAdder V3": "/images/mice/razer-deathadder-v3.png",
  "Logitech G502 X Plus": "/images/mice/logitech-g502-x-plus.png",
  "Pulsar X2H": "/images/mice/pulsar-x2h.png",
  "Pulsar X2 Mini": "/images/mice/pulsar-x2-mini.png",
  "Zowie FK2-CW": "/images/mice/zowie-fk2-cw.png",
  "Zowie ZA13-C": "/images/mice/zowie-za13-c.png",
  "Lamzu Inca": "/images/mice/lamzu-inca.png",
  "Vaxee XE Wireless": "/images/mice/vaxee-xe-wireless.png",
  "Vaxee NP-01S Wireless": "/images/mice/vaxee-np-01s-wireless.png",
  "Finalmouse ULX Prophecy": "/images/mice/finalmouse-ulx-prophecy.png",
  "SteelSeries Prime Wireless": "/images/mice/steelseries-prime-wireless.png",
  "Corsair M75 Wireless": "/images/mice/corsair-m75-wireless.png",
  "Razer Basilisk V3 Pro": "/images/mice/razer-basilisk-v3-pro.png",
  "Endgame Gear XM2w": "/images/mice/endgame-gear-xm2w.png",
  "WLMouse Beast X Mini": "/images/mice/wlmouse-beast-x-mini.png",
  "G-Wolves HTS Plus 4K": "/images/mice/g-wolves-hts-plus-4k.png",
  "Lethal Gaming Gear LA-2": "/images/mice/lethal-gaming-gear-la-2.png",
  "ASUS ROG Gladius III": "/images/mice/asus-rog-gladius-iii.png",
  "HyperX Pulsefire Haste 2": "/images/mice/hyperx-pulsefire-haste-2.png",
  "Razer DeathAdder V4 Pro": "/images/mice/razer-deathadder-v4-pro.png",
  "Vaxee E1 Wireless": "/images/mice/vaxee-e1-wireless.png",
  "Zowie FK2-DW": "/images/mice/zowie-fk2-dw.png",
  "Zowie U2-DW": "/images/mice/zowie-u2-dw.png",
  "Zowie EC1-CW": "/images/mice/zowie-ec1-cw.png",
  "Pulsar Xlite V3 Es": "/images/mice/pulsar-xlite-v3-es.png",
  "Logitech G Pro X Superlight 2 Dex": "/images/mice/logitech-g-pro-x-superlight-2-dex.png",
  "Pulsar ZywOo Chosen Mouse": "/images/mice/pulsar-zywoo-chosen-mouse.png"
};

const MOUSE_DESCRIPTIONS = {
  "Razer Viper V3 Pro": {
    text: "The Razer Viper V3 Pro dethroned the Logitech G Pro X Superlight in 2024 to become the most-used mouse in professional esports. At just 54 grams with 8KHz polling and Razer's Focus Pro 35K sensor, it redefined what a top-tier wireless mouse could be. It has been used to win multiple S-tier championships including IEM Katowice 2025 and VCT Champions. Razer's third-generation optical switches deliver zero-debounce actuation, setting a click latency standard that competitors are still chasing. The symmetrical shape draws from the original Viper lineage but with refined curves that suit both claw and fingertip grips. Over 20% of all tracked professional players now use this mouse - a dominance level rarely seen in esports history.",
    highlights: ["most-used mouse in professional esports", "IEM Katowice 2025 and VCT Champions", "Over 20% of all tracked professional players"]
  },
  "Logitech G Pro X Superlight 2": {
    text: "The Logitech G Pro X Superlight 2 is the successor to the most iconic esports mouse ever made, and it doesn't disappoint. Featuring the HERO 2 sensor and Lightspeed wireless with 8KHz polling support, it improves on the original in every measurable dimension while maintaining the beloved shape. It has been used to win over 15 major tournament titles across CS2, Valorant, and other FPS games since its 2023 release. At 60 grams with Lightforce hybrid switches, it delivers both the speed of optical and the satisfying click feel of mechanical. The Superlight 2 remains the second most popular mouse in professional esports, trusted by approximately 17% of all tracked pros. Its predecessor dominated for four straight years, and this model continues that legacy at the highest level.",
    highlights: ["most iconic esports mouse ever made", "over 15 major tournament titles", "second most popular mouse in professional esports"]
  },
  "Logitech G Pro X2 Superstrike": {
    text: "The Logitech G Pro X2 Superstrike represents the most technologically advanced gaming mouse ever created, featuring HITS (Haptic Inductive Trigger System) technology that replaces traditional mechanical switches entirely. Magnetic induction actuators enable tunable actuation points, rapid trigger functionality, and haptic feedback previously impossible in a mouse. Released in 2025, it builds on the proven Superlight shape at 61 grams while pushing into completely uncharted territory for input technology. HITS switches have no physical contact point, meaning they theoretically never degrade - offering unlimited click lifespan. The Superstrike has already been adopted by forward-thinking pros who value the consistency of identical actuation force over millions of clicks. It may well be the mouse that defines the next era of competitive peripherals.",
    highlights: ["most technologically advanced gaming mouse ever created", "replaces traditional mechanical switches entirely", "unlimited click lifespan"]
  },
  "Logitech G Pro X Superlight": {
    text: "The original Logitech G Pro X Superlight was a watershed moment for esports peripherals when it launched in 2020. At 63 grams with flawless HERO 25K sensor tracking, it was the mouse that convinced the entire professional scene that ultralight wireless was the future. It held the number one position in pro usage for nearly four consecutive years from 2020 to 2024, a reign of dominance unlikely to ever be repeated. Counter-Strike legends like s1mple, NiKo, and ZywOo all wielded this mouse during their peak performances. Despite being superseded by the Superlight 2, it still commands roughly 11% pro usage - a testament to how many players refuse to switch from a shape they trust. The Superlight didn't just win a market - it created one.",
    highlights: ["number one position in pro usage for nearly four consecutive years", "s1mple, NiKo, and ZywOo", "still commands roughly 11% pro usage"]
  },
  "Zowie EC2-CW": {
    text: "The Zowie EC2-CW is the wireless evolution of arguably the most influential ergonomic gaming mouse shape ever designed. The EC2's right-handed contour, originally inspired by the Microsoft IntelliMouse Explorer 3.0, has been the template that dozens of competitors have attempted to clone since its debut. During the golden era of CS:GO from 2014 to 2019, Zowie EC mice dominated with nearly 45% of the professional scene using them. The CW variant cuts the cord while maintaining Zowie's signature plug-and-play philosophy with no software required. At 77 grams it's heavier than modern ultralight competitors, but many players prefer the stability and controlled feel that comes with the extra mass. If you've ever used any ergonomic gaming mouse, chances are its shape owes something to the EC2.",
    highlights: ["most influential ergonomic gaming mouse shape ever designed", "nearly 45% of the professional scene", "no software required"]
  },
  "Razer DeathAdder V3 Pro": {
    text: "The Razer DeathAdder V3 Pro carries forward one of the most storied legacies in gaming peripheral history. The original DeathAdder, first released in 2006, became the best-selling gaming mouse of all time and established Razer as a household name in esports. The V3 Pro refined the iconic ergonomic shape while dropping weight to 63 grams and adding Razer's Focus Pro 30K sensor with 4KHz wireless polling. Professional players across multiple titles trust its comfortable right-hand shape for marathon tournament sessions. It has been a favorite among entry fraggers and support players who value consistent tracking during extended play. Approximately 5% of all tracked professional players still choose the DeathAdder V3 Pro over lighter alternatives, proving that ergonomic comfort remains a priority for many.",
    highlights: ["best-selling gaming mouse of all time", "one of the most storied legacies", "5% of all tracked professional players"]
  },
  "Finalmouse UltralightX": {
    text: "The Finalmouse UltralightX marked a new chapter for the brand that invented the ultralight gaming mouse category. At under 45 grams with 8KHz polling and a custom sensor, it represents Finalmouse's most refined and accessible release to date. Unlike previous limited drops that sold out in minutes, the UltralightX saw wider availability while still maintaining the brand's premium positioning. The symmetrical shape is designed for high-speed flick aiming favored by Valorant and Fortnite professionals. TenZ, one of the most popular FPS players in the world, has been closely associated with Finalmouse throughout his career, lending the brand massive visibility. The UltralightX proves that Finalmouse can evolve beyond the hype-driven drops that defined their early years while still pushing the boundaries of weight and performance.",
    highlights: ["invented the ultralight gaming mouse category", "TenZ, one of the most popular FPS players in the world", "most refined and accessible release"]
  },
  "Finalmouse Starlight-12": {
    text: "The Finalmouse Starlight-12 was a landmark achievement in mouse engineering when it launched in 2021, using a magnesium alloy shell to hit 42 grams - a weight that seemed physically impossible for a wireless mouse at the time. Its limited-release model created a secondary market frenzy, with units regularly reselling for $300 to $500 or more. The Starlight-12 proved that exotic materials could deliver structural rigidity at extreme low weights, a concept that influenced every major manufacturer's R&D direction. Despite its age, it still sees use among professional players who fell in love with its unique feel and premium build quality. The honeycomb-free design was a deliberate statement that you could go ultralight without Swiss-cheesing the shell. It remains one of the most collectible gaming peripherals ever produced, with sealed units commanding premium prices years after release.",
    highlights: ["reselling for $300 to $500", "seemed physically impossible", "most collectible gaming peripherals ever produced"]
  },
  "Lamzu Maya X": {
    text: "The Lamzu Maya X is the mouse that put a three-year-old startup on equal footing with industry giants. Powered by the cutting-edge PAW3950 sensor with 8KHz polling at just 52 grams, it delivers flagship performance that rivals mice costing significantly more. Its claim to fame reached new heights when ScreaM - nicknamed 'the human aimbot' for his legendary one-tap headshot accuracy - chose the Maya X as his primary mouse. The symmetrical shape is optimized for claw grip with gentle curves that avoid the aggressive angles found in some competitors. Lamzu's rapid community-driven iteration means the Maya X incorporated feedback from hundreds of enthusiasts before production. It represents the best of what the new wave of mouse companies can achieve: uncompromising quality, aggressive pricing, and genuine pro adoption.",
    highlights: ["ScreaM - nicknamed 'the human aimbot'", "three-year-old startup on equal footing with industry giants", "uncompromising quality, aggressive pricing"]
  },
  "Lamzu Atlantis Mini": {
    text: "The Lamzu Atlantis Mini refined the formula that put Lamzu on the map, shrinking the original Atlantis into a 51-gram compact form factor beloved by claw-grip players. The PAW3950 sensor and 8KHz polling rate ensure it punches well above its price point in raw performance metrics. Its egg-shaped design sits in a sweet spot between the wider Superlight shape and narrower competition mice, making it one of the most universally comfortable small mice available. The Atlantis Mini became a go-to recommendation in the mouse enthusiast community for players with small-to-medium hands looking for a no-compromise wireless option. At around $99, it undercuts most competitors by $50 to $80 while matching or exceeding their specifications. Lamzu proved with the Atlantis Mini that great mouse design doesn't require a legacy brand name or a premium price tag.",
    highlights: ["punches well above its price point", "most universally comfortable small mice", "undercuts most competitors by $50 to $80"]
  },
  "Pulsar X2F": {
    text: "The Pulsar X2F is the featherweight champion of the X2 family, pushing the envelope at just 38 grams while maintaining full wireless functionality with 8KHz polling. Pulsar's proprietary XS-1 sensor delivers clean, lag-free tracking that competes with the best in the industry. The symmetrical egg shape has become Pulsar's signature, offering a neutral grip feel that works across claw, palm, and fingertip styles. Huano Blue Pink Dot switches provide a crisp, tactile click that enthusiasts praise for its consistency and satisfying feedback. The X2F is particularly popular among aim trainer enthusiasts and Kovaak's players who optimize for pure flick speed and micro-adjustment accuracy. At 38 grams, picking up the X2F for the first time is genuinely startling - it feels almost weightless on the mousepad.",
    highlights: ["just 38 grams", "almost weightless on the mousepad", "particularly popular among aim trainer enthusiasts"]
  },
  "Vaxee Outset AX": {
    text: "The Vaxee Outset AX is a love letter to the ergonomic shapes that defined competitive gaming in the 2010s, designed by people who lived through that era as professional players. Vaxee was founded by former Zowie employees who wanted to push shape design even further, and the Outset AX represents their vision of the perfect right-handed ergonomic mouse. At 67 grams wired with a premium paracord cable, it trades wireless freedom for a direct, zero-latency connection that some purists still prefer. The PAW3395 sensor ensures flawless tracking, while Huano switches deliver a crisp, defined click. Professional Counter-Strike players who grew up on Zowie EC shapes often find the Outset AX to be a natural evolution of what they already loved. It's proof that innovation doesn't always mean going wireless or ultralight - sometimes it means perfecting a shape.",
    highlights: ["founded by former Zowie employees", "perfect right-handed ergonomic mouse", "innovation doesn't always mean going wireless"]
  },
  "SteelSeries Aerox 5 Wireless": {
    text: "The SteelSeries Aerox 5 Wireless bridges the gap between traditional ergonomic mice and the ultralight revolution, offering 74 grams of IP54 water-resistant durability. SteelSeries has been in the esports peripheral business since 2001, making them one of the oldest dedicated gaming brands in existence. The Aerox 5 features nine programmable buttons including a unique side rocker switch, offering more input options than most lightweight competitors. The TrueMove Air sensor and quantum 2.0 wireless deliver reliable performance, though the 1KHz polling rate falls behind newer 4K and 8K competitors. Its perforated shell achieves low weight while maintaining structural integrity, and the IP54 rating means it can handle sweat and dust that would compromise other honeycomb designs. The 180-hour battery life is among the longest in the wireless gaming mouse market, making it ideal for players who hate frequent charging.",
    highlights: ["one of the oldest dedicated gaming brands", "IP54 water-resistant", "180-hour battery life"]
  },
  "Zowie EC2-DW": {
    text: "The Zowie EC2-DW is the latest refinement of the legendary EC2 shape, upgrading to the PAW3395 sensor while maintaining the plug-and-play simplicity that Zowie is famous for. At 75 grams wireless, it shaves a couple of grams off the EC2-CW while delivering higher sensor specifications including 26,000 DPI capability. The 'DW' designation represents Zowie's new generation of wireless mice that maintain the brand's no-driver philosophy but with improved sensor and wireless technology. Professional CS2 players who have been using EC2 variants for years appreciate the seamless transition - same shape, better internals. The mouse features adjustable click tension and Zowie's custom switches, allowing players to fine-tune the feel to their preference. It's the EC2 for players who want modern specs without sacrificing the shape that built competitive Counter-Strike.",
    highlights: ["latest refinement of the legendary EC2 shape", "adjustable click tension", "shape that built competitive Counter-Strike"]
  },
  "Endgame Gear OP1 8K": {
    text: "The Endgame Gear OP1 8K is German engineering distilled into a 56-gram wireless gaming mouse, with 8KHz polling and the PAW3950 sensor pushing it into the top tier of specifications. Endgame Gear built their reputation on the XM1, which was widely praised for having the best stock cable and click feel in the industry at the time of its release. The OP1 8K continues that attention to detail with Kailh GM 8.0 switches that deliver a sharp, clean actuation that many reviewers consider best-in-class. The symmetrical shape is refined through direct consultation with professional CS players, resulting in a design that prioritizes competitive performance over mass appeal. At $119, it sits in a competitive price bracket while offering flagship-level components throughout. Endgame Gear proves that a focused, engineering-first approach can compete with brands that have ten times their marketing budget.",
    highlights: ["German engineering", "best stock cable and click feel", "engineering-first approach"]
  },
  "ASUS ROG Harpe Ace Extreme": {
    text: "The ASUS ROG Harpe Ace Extreme is one of the most ambitious mice ever produced by a major electronics manufacturer, featuring a carbon fiber composite shell that hits just 47 grams. ASUS brings a unique advantage to mouse design - they fabricate their own chips, enabling custom silicon integration between the sensor, MCU, and wireless radio that no other mouse manufacturer can replicate. The AimPoint Pro sensor at 42,000 DPI and 8KHz polling represents some of the highest raw specifications available in any production mouse. ROG's wireless implementation benefits from ASUS's decades of networking expertise, delivering a connection stability that leverages their router and Wi-Fi engineering knowledge. The carbon fiber construction isn't just a weight-saving gimmick - it provides exceptional rigidity-to-weight ratio that makes the mouse feel solid despite its extreme lightness. At $179 it commands a premium, but for players who want cutting-edge material science in their peripheral, nothing else comes close.",
    highlights: ["carbon fiber composite shell", "fabricate their own chips", "47 grams"]
  },
  "Corsair M75 Air": {
    text: "The Corsair M75 Air brought 8KHz polling to a surprisingly accessible $99 price point, making high-refresh wireless technology available to players who couldn't justify flagship pricing. At 60 grams with the Marksman S 33K sensor, it delivers a complete competitive package from a company better known for keyboards, RAM, and cases. Corsair's iCUE software integration means the M75 Air slots seamlessly into a broader ecosystem for players who already own Corsair peripherals. The symmetrical shape takes inspiration from proven esports designs without directly cloning any single competitor, resulting in a comfortable if slightly safe form factor. Its 100-hour battery life provides excellent longevity between charges, and the USB-C charging means no proprietary cables needed. The M75 Air demonstrated that Corsair is serious about competing in the esports mouse space, not just the broader gaming peripheral market.",
    highlights: ["$99 price point", "8KHz polling", "100-hour battery life"]
  },
  "Ninjutso Sora V2": {
    text: "The Ninjutso Sora V2 is a 42-gram precision instrument from a Japanese-inspired brand that has quietly earned respect among the most demanding mouse enthusiasts. The PAW3395 sensor with 4KHz polling delivers tracking performance that competes with mice costing twice as much. Kailh GM 8.0 switches provide a crisp, high-quality click that several reviewers have compared favorably to Endgame Gear's acclaimed implementation. The symmetrical shape is compact and slightly flat, making it ideal for fingertip and claw-grip players who want maximum control with minimal hand contact. At $89, the Sora V2 represents exceptional value - delivering 42 grams of refined wireless performance at a price point that would have been unthinkable two years ago. It's the kind of mouse that doesn't generate headlines but earns a permanent spot on recommendation lists through sheer quality.",
    highlights: ["42-gram precision instrument", "mice costing twice as much", "exceptional value"]
  },
  "WLMouse Beast X": {
    text: "The WLMouse Beast X holds the record as the world's lightest production wireless gaming mouse at an almost absurd 30 grams, shattering every conception of how light a functional mouse could be. To put that weight in perspective, 30 grams is lighter than most AA batteries and roughly half the weight of the already-ultralight Superlight. The Beast X launched as a crowd-funded project and became an instant sensation, selling out repeatedly and generating a secondary market reminiscent of Finalmouse's early limited drops. The PAW3950 sensor and 8KHz polling ensure that the extreme weight reduction doesn't come at the cost of tracking performance. Some players find 30 grams too light for precise control, preferring the stability that comes with additional mass, but for those who want absolute speed in flick-heavy games, nothing else compares. The Beast X didn't just push the envelope - it proved the envelope was much larger than anyone imagined.",
    highlights: ["world's lightest production wireless gaming mouse", "30 grams is lighter than most AA batteries", "proved the envelope was much larger than anyone imagined"]
  },
  "Sony INZONE M10": {
    text: "The Sony INZONE M10 marks the PlayStation giant's aggressive entry into the competitive PC gaming peripheral market, bringing semiconductor expertise that few competitors can match. At 48 grams with a custom Sony sensor, 8KHz polling, and optical switches, it launches with specifications that immediately position it among the best. Sony's wireless technology benefits from decades of Bluetooth and radio frequency engineering across their entire product ecosystem, from headphones to gaming consoles. The symmetrical shape is designed for competitive FPS play with a focus on claw and fingertip grips, targeting the same audience as the Viper V3 Pro and Superlight 2. The 90-hour battery life is impressive given the 8KHz polling rate and lightweight construction. Whether Sony can convert PlayStation brand loyalty into PC peripheral market share remains to be seen, but the M10 makes a compelling technical argument.",
    highlights: ["PlayStation giant's aggressive entry", "semiconductor expertise", "48 grams"]
  },
  "Razer Viper V3 HyperSpeed": {
    text: "The Razer Viper V3 HyperSpeed is the value-oriented sibling of the Viper V3 Pro, delivering the same beloved shape at a lower price point with slight specification tradeoffs. At 59 grams it's only 5 grams heavier than the Pro, while maintaining the Focus Pro 35K sensor that powers Razer's flagship. The main concession is a 4KHz maximum polling rate versus the Pro's 8KHz, a difference that only the most sensitive players can perceive in blind testing. For the vast majority of competitive players, the HyperSpeed variant offers nearly identical in-game performance at a meaningful cost savings. Razer's optical switches and the refined Viper V3 shape are identical between the two models, meaning you get the same click feel and ergonomics. It's the smart choice for players who want the Viper V3 experience without paying the premium for specifications they may not need.",
    highlights: ["same beloved shape at a lower price point", "nearly identical in-game performance", "the smart choice"]
  },
  "Razer DeathAdder V3": {
    text: "The Razer DeathAdder V3 is the wired variant of Razer's legendary ergonomic line, offering the refined V3 shape at just 59 grams with zero wireless latency concerns. Some professional players deliberately choose wired mice for the psychological assurance of a direct connection, and the DeathAdder V3 serves that preference with a premium SpeedFlex cable that minimizes drag. The Focus Pro 30K sensor delivers identical tracking to the wireless version, and at 8KHz polling via USB, it matches or exceeds the wireless variant's report rate. The ergonomic right-hand shape has been refined over nearly two decades of iteration, making the DeathAdder lineage one of the longest-running in gaming history. At a lower price point than the Pro, it's an excellent entry point for players who want Razer's best ergonomic shape without the wireless premium. The DeathAdder V3 proves that wired mice aren't obsolete - they're a legitimate choice for players who prioritize simplicity and consistency.",
    highlights: ["zero wireless latency concerns", "nearly two decades of iteration", "wired mice aren't obsolete"]
  },
  "Logitech G502 X Plus": {
    text: "The Logitech G502 X Plus is the wireless evolution of the G502 - one of the most popular gaming mice ever sold to the general consumer market. The original G502 earned the nickname 'the brick' from enthusiasts due to its heavier weight and numerous features, but the X Plus modernizes the formula with Lightforce hybrid switches and Lightspeed wireless. At 106 grams, it's significantly heavier than most esports-focused mice, but the weight is intentional - many players prefer the planted, stable feel for games that value tracking over flick speed. The G502 shape offers a thumb rest, infinite scroll wheel, and multiple programmable buttons that make it exceptional for productivity and RPG gaming alongside competitive play. Despite its weight, it sees professional use in games like League of Legends, Dota 2, and strategy titles where ultralight isn't a priority. It's the mouse for players who want to do everything well rather than optimizing purely for competitive FPS.",
    highlights: ["one of the most popular gaming mice ever sold", "nickname 'the brick'", "do everything well"]
  },
  "Pulsar X2H": {
    text: "The Pulsar X2H is the hump-back variant of the acclaimed X2 line, adding a more pronounced rear hump that provides better palm support for relaxed claw and palm-grip players. The PAW3395 sensor and 4KHz polling deliver flawless tracking, while Huano switches maintain the satisfying click feel that defines the X2 family. At 57 grams wireless, it hits a sweet spot that feels substantial enough for control without being heavy enough to slow down flick aiming. The 'H' designation was born directly from community feedback - players loved the X2's shape but wanted more rear support, and Pulsar listened. This kind of responsive iteration is what has built Pulsar's reputation as one of the most community-connected mouse brands in the industry. The X2H represents how a company can expand a successful product line by addressing specific grip-style preferences rather than trying to make one shape fit everyone.",
    highlights: ["born directly from community feedback", "most community-connected mouse brands", "sweet spot"]
  },
  "Pulsar X2 Mini": {
    text: "The Pulsar X2 Mini is the compact variant that pushed the X2 platform into sub-48-gram territory while maintaining full wireless capability. Designed specifically for fingertip and aggressive claw-grip players with small-to-medium hands, it offers one of the best small-mouse experiences available at any price. The PAW3395 sensor and responsive switches are identical to its larger siblings, ensuring no performance compromise despite the smaller footprint. Pulsar's decision to offer Mini, Standard, and H-back variants of the same sensor platform shows a level of grip-style consideration that most manufacturers ignore. At around $90, it undercuts Finalmouse and WLMouse offerings while delivering a more refined and readily available product. The X2 Mini is a favorite in the competitive aim-training community, where players need maximum cursor speed with minimal physical effort.",
    highlights: ["sub-48-gram territory", "best small-mouse experiences available", "favorite in the competitive aim-training community"]
  },
  "Zowie FK2-CW": {
    text: "The Zowie FK2-CW is the wireless version of the FK2, one of the most important ambidextrous mouse shapes in competitive gaming history. The FK series, introduced in 2013, pioneered the low-profile symmetrical design that would later inspire Razer's Viper line and dozens of other competitors. The FK2's flatter profile and wider stance made it the preferred choice for claw-grip players who wanted maximum control during precise micro-adjustments. At 69 grams wireless with the PAW3370 sensor, it delivers reliable performance with Zowie's characteristic no-software philosophy. Professional Counter-Strike players who built their careers on FK shapes in the wired era can now transition to wireless without changing their muscle memory. The FK2-CW carries forward a design legacy that fundamentally shaped how the industry thinks about low-profile gaming mice.",
    highlights: ["most important ambidextrous mouse shapes", "inspired Razer's Viper line", "fundamentally shaped how the industry thinks"]
  },
  "Zowie ZA13-C": {
    text: "The Zowie ZA13-C is the small variant of Zowie's high-profile symmetrical series, featuring a distinctive high rear hump that sets it apart from the flatter FK line. The ZA series was designed for players who want a symmetrical shape but with aggressive rear support that fills the palm during claw grip. At 66 grams wired with the PAW3370 sensor, it delivers the precision Zowie is known for through a premium paracord cable that feels nearly wireless. The ZA13-C's compact dimensions make it ideal for players with smaller hands who find even the FK2 too wide for comfortable fingertip transitions. As a wired mouse in an increasingly wireless world, it appeals to purists who value zero-latency direct connection and never having to worry about battery life. The ZA13-C represents Zowie's commitment to offering shapes for every grip style, not just chasing the latest wireless trend.",
    highlights: ["aggressive rear support", "feels nearly wireless", "every grip style"]
  },
  "Lamzu Inca": {
    text: "The Lamzu Inca explores ergonomic territory for a brand that initially made its name with symmetrical designs, offering a right-handed shape at just 48 grams with 8KHz polling. The PAW3950 sensor delivers top-tier tracking while the form factor targets players who love ergo shapes but want modern ultralight weight. Lamzu's rapid design iteration shines here - the Inca went through multiple prototype rounds with community testers before reaching production. The optical switches provide a fast, consistent actuation that pairs well with the comfortable ergonomic grip. At $99 to $119, it maintains Lamzu's positioning as a premium-quality brand that doesn't gouge on price like some competitors. The Inca proves that Lamzu can design for multiple grip preferences, not just the claw-grip audience that the Atlantis originally targeted.",
    highlights: ["just 48 grams with 8KHz polling", "multiple prototype rounds with community testers", "doesn't gouge on price"]
  },
  "Vaxee XE Wireless": {
    text: "The Vaxee XE Wireless is the cordless evolution of Vaxee's acclaimed symmetrical shape, bringing the brand's shape-first design philosophy into the wireless era. Vaxee mice are designed by former Zowie engineers who understand that competitive players care about shape and ergonomics above all else. At 65 grams wireless with the PAW3395 sensor, the XE Wireless maintains the precise, controlled feel that made the wired version a favorite among CS players. The symmetrical design features subtle ergonomic cues that guide hand placement without forcing a specific grip style. Professional Counter-Strike players in particular have gravitated toward Vaxee shapes for their neutral, distraction-free feel during high-stakes matches. The XE Wireless represents Vaxee's evolution from a boutique wired-only brand into a full-spectrum competitor.",
    highlights: ["former Zowie engineers", "shape-first design philosophy", "distraction-free feel during high-stakes matches"]
  },
  "Vaxee NP-01S Wireless": {
    text: "The Vaxee NP-01S Wireless is the smaller variant of Vaxee's ergonomic NP-01 line, a right-handed shape designed specifically for competitive Counter-Strike from the ground up. The 'NP' stands for 'New Phase', reflecting Vaxee's ambition to create ergonomic shapes that improve upon the Zowie EC legacy rather than simply copying it. At a competitive weight with the PAW3395 sensor, it offers tracking performance that matches the best in the industry. The NP-01S features a slightly more aggressive curve than the EC2, with a higher right side that prevents the pinky from dragging on the mousepad. It's particularly popular in the Asian CS2 scene, where Vaxee's Taiwanese heritage and direct connection to competitive players gives the brand strong credibility. The NP-01S Wireless proves that ergonomic mouse design still has room for genuine innovation beyond what Zowie established.",
    highlights: ["designed specifically for competitive Counter-Strike", "improve upon the Zowie EC legacy", "popular in the Asian CS2 scene"]
  },
  "Finalmouse ULX Prophecy": {
    text: "The Finalmouse ULX Prophecy is the latest iteration of Finalmouse's ultralight vision, pushing their design philosophy forward with the kind of bold aesthetic choices the brand is known for. Building on the UltralightX platform, the Prophecy variant features a distinctive colorway and design language that reflects Finalmouse's focus on creating mice that feel like luxury objects as much as performance tools. The sub-45 gram weight with 8KHz polling places it among the lightest wireless mice available from any manufacturer. Finalmouse's custom sensor implementation delivers clean tracking without the smoothing or prediction that plagues some budget alternatives. The limited availability creates demand that keeps the brand in constant conversation among the enthusiast community. Whether you view Finalmouse as innovative visionaries or masterful marketers, their mice consistently deliver on the weight and performance promises they make.",
    highlights: ["mice that feel like luxury objects", "among the lightest wireless mice available", "consistently deliver on the weight and performance promises"]
  },
  "SteelSeries Prime Wireless": {
    text: "The SteelSeries Prime Wireless was designed through a direct collaboration with over 100 professional esports players, resulting in a shape that prioritizes competitive performance above all else. The TrueMove Pro sensor, co-developed with PixArt, was tuned specifically for esports rather than chasing maximum DPI specifications. At 80 grams it's heavier than modern ultralight mice, but the Prestige OM optical magnetic switches deliver an exceptionally crisp click with a guaranteed 100 million click lifespan. SteelSeries stripped away RGB lighting, extra buttons, and other features that competitive players don't need, resulting in a focused, distraction-free design. The Prime Wireless found a dedicated following among players who value click quality and shape over pure weight reduction. It represents SteelSeries' philosophy that the best esports mouse isn't necessarily the lightest - it's the one that feels right in your hand.",
    highlights: ["collaboration with over 100 professional esports players", "100 million click lifespan", "best esports mouse isn't necessarily the lightest"]
  },
  "Corsair M75 Wireless": {
    text: "The Corsair M75 Wireless is the standard wireless variant of Corsair's competitive mouse platform, offering a balanced package that doesn't sacrifice any single feature to minimize weight. At 89 grams with the Marksman sensor and Corsair's Slipstream wireless technology, it provides reliable performance with excellent battery life. The shape takes cues from proven esports designs while incorporating Corsair's own ergonomic research into button placement and side grip texture. Full iCUE integration means it works seamlessly with Corsair keyboards, headsets, and other peripherals for a unified RGB and macro ecosystem. The M75 Wireless targets the player who wants a complete, polished experience rather than a stripped-down race for the lowest spec sheet weight. It's Corsair's statement that a great wireless gaming mouse can be defined by consistency and reliability rather than extreme metrics.",
    highlights: ["balanced package", "unified RGB and macro ecosystem", "consistency and reliability"]
  },
  "Razer Basilisk V3 Pro": {
    text: "The Razer Basilisk V3 Pro is Razer's answer to the Logitech G502 - a feature-rich wireless mouse designed for players who want extensive customization alongside competitive performance. At 112 grams with Razer's HyperScroll tilt wheel offering infinite scroll, it's the heaviest mouse in the database but also one of the most feature-complete. The Focus Pro 30K sensor ensures tracking is flawless despite the additional weight, and Razer's optical switches provide the zero-debounce latency the brand is known for. Smart-Reel technology automatically switches between notched and free-spin scrolling based on scroll speed, a feature borrowed from Logitech that Razer has implemented elegantly. It's the preferred choice for players in MMOs, strategy games, and productivity workflows who also want competitive FPS capability. The Basilisk V3 Pro proves that the heaviest mouse can still be the smartest mouse.",
    highlights: ["most feature-complete", "automatically switches between notched and free-spin scrolling", "heaviest mouse can still be the smartest mouse"]
  },
  "Endgame Gear XM2w": {
    text: "The Endgame Gear XM2w carries forward the legacy of the XM1 - the mouse that put Endgame Gear on the map with its universally praised cable and click implementation. At 63 grams wireless, the XM2w translates the XM1's beloved shape into a cordless format with the PAW3370 sensor delivering reliable tracking. The symmetrical design features a flat profile with a slight rear hump that claw-grip players find ideal for quick, controlled movements. Kailh GM 8.0 switches continue Endgame Gear's tradition of selecting components based on click feel rather than marketing specifications. The XM2w has earned particular appreciation in the German and European competitive scene, where Endgame Gear's engineering-focused brand identity resonates strongly. It's the mouse for players who choose peripherals based on how they feel rather than how they look on a spec sheet.",
    highlights: ["universally praised cable and click implementation", "choose peripherals based on how they feel", "engineering-focused brand identity"]
  },
  "WLMouse Beast X Mini": {
    text: "The WLMouse Beast X Mini takes the record-breaking formula of the Beast X and shrinks it into a compact form factor designed for fingertip and small-hand claw-grip players. At approximately 29 grams, it may actually be the lightest wireless gaming mouse variant ever produced, edging out even its larger sibling. The PAW3950 sensor and 8KHz polling ensure that the extreme weight reduction doesn't compromise on tracking accuracy or responsiveness. The Mini form factor addresses the most common criticism of the original Beast X - that its standard dimensions felt uncontrollable for players with smaller hands. WLMouse's crowd-funded origins mean the community had direct input on the Mini's dimensions and features before production began. It's the ultimate expression of the ultralight philosophy: if 30 grams was revolutionary, 29 grams in a compact shell is the logical next step.",
    highlights: ["lightest wireless gaming mouse variant ever produced", "approximately 29 grams", "ultimate expression of the ultralight philosophy"]
  },
  "G-Wolves HTS Plus 4K": {
    text: "The G-Wolves HTS Plus 4K comes from one of the original boutique mouse brands that helped kickstart the ultralight movement alongside Finalmouse. G-Wolves earned early recognition with the Hati and Skoll series, which offered ultralight shapes at price points that undercut major brands significantly. The HTS Plus 4K represents their latest evolution with 4KHz polling support and modern sensor technology in a compact symmetrical shell. At a competitive weight, it targets the same fingertip and claw-grip audience that brands like Pulsar and Lamzu have been courting. G-Wolves' experience in the ultralight space dates back further than many of their current competitors, giving them accumulated knowledge in shell design and weight optimization. The HTS Plus 4K shows that G-Wolves can keep pace with the rapid innovation cycle that defines the modern mouse market.",
    highlights: ["helped kickstart the ultralight movement", "undercut major brands significantly", "accumulated knowledge in shell design"]
  },
  "Lethal Gaming Gear LA-2": {
    text: "The Lethal Gaming Gear LA-2 represents an unusual entry into the mouse market - a peripheral brand primarily known for premium mousepads and accessories that decided to build their own mouse. Lethal Gaming Gear leveraged their deep understanding of the competitive gaming ecosystem and direct relationships with professional players to design from the ground up. The LA-2 benefits from insights gathered through years of testing mice across every surface type they sell, giving them a unique perspective on how mouse feet, weight, and shape interact with pad surfaces. The symmetrical design targets competitive FPS players with a shape informed by community feedback and pro player testing. It's a relatively rare example of a peripheral accessories company successfully crossing over into the hardware manufacturing space. The LA-2 demonstrates that understanding how mice are used can be just as valuable as understanding how they're built.",
    highlights: ["premium mousepads and accessories", "unique perspective on how mouse feet, weight, and shape interact", "understanding how mice are used"]
  },
  "ASUS ROG Gladius III": {
    text: "The ASUS ROG Gladius III is a versatile ergonomic mouse that showcases ASUS's engineering depth with features like hot-swappable switches that let you change click feel without soldering. ROG's push-fit switch socket system means players can swap between different switch types in seconds, customizing click weight and feel to personal preference. The AimPoint sensor co-developed by ASUS offers excellent tracking at up to 36,000 DPI, backed by ROG's custom-tuned wireless technology. At a moderate weight, it prioritizes versatility and build quality over extreme lightness, targeting players who value customization. The paracord-style ROG cable on the wired variant and tri-mode connectivity on wireless versions give players maximum flexibility in how they connect. The Gladius III represents ASUS's philosophy that the best mouse is one you can adapt to your exact preferences rather than forcing you to adapt to it.",
    highlights: ["hot-swappable switches", "change click feel without soldering", "adapt to your exact preferences"]
  },
  "HyperX Pulsefire Haste 2": {
    text: "The HyperX Pulsefire Haste 2 delivers a solid competitive package at one of the most accessible price points in the wireless gaming mouse market. HyperX, originally Kingston's gaming division, has built a reputation for offering excellent performance-per-dollar across their entire peripheral lineup. At 61 grams wireless with a 26,000 DPI sensor and low-latency wireless, it punches significantly above its weight class in raw specifications. The symmetrical shape is comfortable for extended gaming sessions without any aggressive curves that might fatigue during long tournament days. HyperX mice have found adoption among professional players in multiple titles, particularly those who appreciate the brand's straightforward, no-gimmick approach. The Pulsefire Haste 2 is often the first mouse recommended to competitive players on a budget, and for good reason - it does almost everything right at a price that's hard to argue with.",
    highlights: ["most accessible price points", "punches significantly above its weight class", "first mouse recommended to competitive players on a budget"]
  },
  "Razer DeathAdder V4 Pro": {
    text: "The Razer DeathAdder V4 Pro launched in 2025 as the most advanced iteration of the 19-year-old DeathAdder lineage, proving that the legendary ergonomic shape still has room to evolve. It combines the refined V3 ergonomics with next-generation internals including 8KHz polling and improved optical switches for the fastest DeathAdder experience ever. The V4 Pro has already seen rapid adoption among professional players, climbing to approximately 6% pro usage in a remarkably short time since release. Its ergonomic right-hand design continues to be one of the most comfortable shapes for palm and relaxed claw grips, reducing strain during marathon practice and tournament sessions. The DeathAdder family has collectively been used to win more prize money across esports history than perhaps any other mouse lineage. The V4 Pro carries that weight of history while proving the DeathAdder isn't just a nostalgic classic - it's a living, evolving platform.",
    highlights: ["19-year-old DeathAdder lineage", "approximately 6% pro usage", "more prize money across esports history than perhaps any other mouse lineage"]
  },
  "Vaxee E1 Wireless": {
    text: "The Vaxee E1 Wireless is a compact ergonomic mouse designed for players who want an ergo shape but with the smaller footprint typically associated with symmetrical mice. Vaxee's approach to ergonomic design differs from the EC2 clones that dominate the market - the E1 features unique curvature that prioritizes claw grip ergonomics over traditional palm support. The PAW3395 sensor and wireless implementation deliver clean performance that meets the expectations of the competitive players Vaxee designs for. The smaller dimensions make it particularly appealing in the Asian market, where hand sizes tend to be smaller and compact ergonomic options are historically limited. Vaxee's direct relationships with professional CS2 teams inform every curve and angle of the E1's design. It fills a niche that most major brands ignore: the player who wants ergonomic comfort but can't use a full-size right-hand mouse comfortably.",
    highlights: ["unique curvature", "niche that most major brands ignore", "direct relationships with professional CS2 teams"]
  },
  "Zowie FK2-DW": {
    text: "The Zowie FK2-DW upgrades the wireless FK2 experience with the PAW3395 sensor and 26,000 DPI capability, representing the latest wireless technology from a brand synonymous with no-compromise esports mice. The FK2's low-profile ambidextrous shape remains unchanged - it's the same silhouette that professional players have trusted for over a decade. The DW designation indicates Zowie's newer wireless platform with improved latency and sensor performance over the previous CW generation. Zowie's custom switches offer a distinct click feel that divides opinion - some find it perfectly crisp while others prefer lighter actuation, but consistency across units is excellent. The FK2-DW appeals to the player who knows exactly what shape they want and simply needs it updated with modern wireless internals. At $99, it delivers the Zowie experience at a price that's competitive with newer boutique brands.",
    highlights: ["trusted for over a decade", "no-compromise esports mice", "knows exactly what shape they want"]
  },
  "Zowie U2-DW": {
    text: "The Zowie U2-DW is a compact symmetrical mouse that pushes Zowie into the ultralight wireless territory at just 58 grams with 4KHz polling support. The U2 represents a new design direction for Zowie, featuring a smaller footprint that targets fingertip and aggressive claw-grip players who find the FK2 too large. The PAW3395 sensor and Zowie's custom wireless technology deliver the reliable, interference-free performance that competitive players demand. The 4KHz polling rate option brings Zowie into the high-refresh era, though the no-software philosophy means switching poll rates is done via a physical button. The U2-DW shows that Zowie is willing to innovate beyond their classic shapes while maintaining the plug-and-play simplicity that defines the brand. Released in 2025, it's the most modern mouse in Zowie's lineup and signals where the company is heading next.",
    highlights: ["just 58 grams with 4KHz polling", "new design direction for Zowie", "most modern mouse in Zowie's lineup"]
  },
  "Zowie EC1-CW": {
    text: "The Zowie EC1-CW is the large variant of Zowie's legendary EC series, designed for palm-grip players with larger hands who need a bigger canvas to rest their entire hand. At 77 grams wireless, it shares the same weight as the EC2-CW but offers a noticeably wider and longer body. The EC1 shape has been a staple among professional players who prioritize comfort and stability over aggressive micro-adjustments. With the PAW3370 sensor and Zowie's plug-and-play wireless, it delivers the reliable performance the brand is known for. Large ergonomic mice are increasingly rare in a market obsessed with compact ultralight designs, making the EC1-CW an important option for players who physically need more mouse. It's a reminder that hand size diversity exists in esports, and not every professional player can comfortably use a 50-gram mini mouse.",
    highlights: ["hand size diversity exists in esports", "increasingly rare", "legendary EC series"]
  },
  "Pulsar Xlite V3 Es": {
    text: "The Pulsar Xlite V3 Es is an ergonomic design from a brand predominantly known for symmetrical shapes, offering Pulsar's engineering quality in a right-handed format. The Xlite series has been one of Pulsar's most popular lines, proving that their attention to weight and sensor quality translates beautifully to ergonomic designs. The V3 Es iteration refines the shape with improved button placement and a slightly adjusted rear hump based on community feedback. At a competitive weight with high-end sensor technology, it competes directly with the Zowie EC2-CW and Razer DeathAdder for the ergonomic wireless crown. Pulsar's reputation for quality control means the Xlite V3 Es delivers consistent click feel and build quality across units, a reliability that some boutique brands struggle to match. For players who love ergo shapes but want something from the new generation of mouse companies, the Xlite V3 Es is one of the strongest options available.",
    highlights: ["translates beautifully to ergonomic designs", "competes directly with the Zowie EC2-CW and Razer DeathAdder", "one of the strongest options available"]
  },
  "Logitech G Pro X Superlight 2 Dex": {
    text: "The Logitech G Pro X Superlight 2 Dex is Logitech's first foray into ergonomic esports mouse design under the G Pro X banner, bringing the Superlight 2's acclaimed internals into a right-handed shape. The HERO 2 sensor, Lightforce hybrid switches, and 8KHz Lightspeed wireless are identical to the standard Superlight 2, ensuring no performance compromise in the transition to ergonomics. The 'Dex' name reflects its right-hand-optimized design, which takes inspiration from popular ergonomic shapes while incorporating Logitech's own ergonomic research. For players who loved the Superlight 2's performance but craved an ergonomic form factor, the Dex fills a gap that Logitech's lineup has had for years. It directly challenges the Razer DeathAdder and Zowie EC series in a market segment where Logitech has historically been absent. The Dex represents Logitech's recognition that the esports mouse market needs both symmetrical and ergonomic options at the highest level.",
    highlights: ["Logitech's first foray into ergonomic esports mouse design", "fills a gap that Logitech's lineup has had for years", "challenges the Razer DeathAdder and Zowie EC series"]
  },
  "Pulsar ZywOo Chosen Mouse": {
    text: "The Pulsar ZywOo Chosen Mouse is a signature collaboration between Pulsar and Mathieu 'ZywOo' Herbaut, widely considered the best Counter-Strike player in the world across multiple years. ZywOo has won the HLTV number one player award multiple times, making his equipment choices enormously influential in the professional CS community. This collaboration mouse features a shape and specification set tuned to ZywOo's exact preferences, with input that goes far beyond a simple colorway change. The mouse carries the weight of being associated with a player whose aim and consistency have set records that may never be broken. For fans and aspiring professionals, using the same mouse that ZywOo helped design offers a tangible connection to the highest level of Counter-Strike performance. It represents the growing trend of meaningful pro player collaborations where the player genuinely influences the product rather than just lending their name.",
    highlights: ["widely considered the best Counter-Strike player in the world", "won the HLTV number one player award multiple times", "genuinely influences the product"]
  }
};


const BRAND_IMAGE_URLS = {
  "Razer": "/images/brands/razer.png",
  "Logitech": "/images/brands/logitech.png",
  "Zowie": "/images/brands/zowie.png",
  "Vaxee": "/images/brands/vaxee.png",
  "Finalmouse": "/images/brands/finalmouse.png",
  "Pulsar": "/images/brands/pulsar.png",
  "Lamzu": "/images/brands/lamzu.png",
  "WLMouse": "/images/brands/wlmouse.png",
  "Corsair": "/images/brands/corsair.png",
  "SteelSeries": "/images/brands/steelseries.png",
  "Endgame": "/images/brands/endgame.png",
  "Endgame Gear": "/images/brands/endgame.png",
  "HyperX": "/images/brands/hyperx.png",
  "Ninjutso": "/images/brands/ninjutso.png",
  "ASUS": "/images/brands/asus.png",
  "Sony": "/images/brands/sony.png",
  "G-Wolves": "/images/brands/g-wolves.png",
};

const GAME_IMAGE_URLS = {
  "CS2": "/images/games/cs2.png",
  "Valorant": "/images/games/valorant.png",
  "Fortnite": "/images/games/fortnite.png",
  "LoL": "/images/games/lol.png",
  "R6 Siege": "/images/games/r6-siege.png",
  "PUBG": "/images/games/pubg.png",
  "Apex": "/images/games/apex.png",
  "Dota 2": "/images/games/dota-2.png",
  "Marvel Rivals": "/images/games/marvel-rivals.png",
  "Overwatch 2": "/images/games/overwatch-2.png",
  "Deadlock": "/images/games/deadlock.png",
  "Call of Duty": "/images/games/call-of-duty.png",
  "Rocket League": "/images/games/rocket-league.png",
};

const GAME_DESCRIPTIONS = {
  "CS2": "The Logitech G Pro X Superlight 2 reigns supreme in Counter-Strike 2 at 23%, a title where precision and consistency are valued above all else. CS2 pros tend to be more conservative with gear changes, and the Superlight 2's proven shape and flawless HERO 2 sensor make it the safest choice at the highest level. The Razer Viper V3 Pro is gaining ground fast at 15%, driven by its lighter 54g weight and 8KHz polling that appeals to a new generation of fraggers. The original Superlight still commands a loyal 10% following, proving that many pros simply refuse to abandon a shape that carried them through years of tournament play. Razer's DeathAdder V4 Pro at 9% shows that ergonomic mice still have a strong home in CS2, particularly among AWPers and support players who value comfort in marathon sessions.",
  "Valorant": "The Razer Viper V3 Pro dominates Valorant at a commanding 30% usage rate, more than triple its nearest competitor. Valorant's emphasis on ultra-precise crosshair placement and flick-heavy duels rewards the Viper V3 Pro's 54g weight and zero-debounce optical switches. The original Logitech G Pro X Superlight holds second at 10%, a testament to its enduring popularity among players who entered competitive Valorant during its early days. The Superlight 2 follows closely at 9%, gradually replacing its predecessor as pros upgrade their setups. Razer's overall brand dominance at 51% in Valorant is remarkable and largely unmatched in any other major esports title, reflecting how effectively the Viper V3 Pro has captured the tactical FPS audience.",
  "Fortnite": "The Razer Viper V3 Pro leads Fortnite at 33%, where the game's unique combination of building mechanics and aim duels demands both speed and precision. Fortnite pros need mice that can handle rapid 180-degree flicks during build fights and then immediately transition to precision aiming for shotgun duels. The original Logitech G Pro X Superlight remains hugely popular at 16%, as many Fortnite pros have been using it since the game's competitive peak and see no reason to switch. The Superlight 2 follows at 11% as the natural upgrade path for loyal Logitech users. Finalmouse maintains an 8% brand share here, reflecting the brand's deep roots in the Fortnite community through players like TenZ and Bugha who popularized ultralight mice in the battle royale scene.",
  "LoL": "Logitech absolutely dominates League of Legends with 63% total brand share, the highest single-brand concentration in any major esports title we track. The G Pro X Superlight 2 leads at 20%, followed by the original Superlight at 14% and the G Pro Wireless at 8% — three Logitech mice taking the top three spots. League pros prioritize comfort and reliability over raw weight since the game demands constant clicking over long sessions rather than explosive flick aiming. The Razer Viper V3 Pro appears at just 6%, reflecting that Valorant and CS2's ultralight meta hasn't fully crossed over into MOBA territory. Higher DPI settings are common here too, with an average of 1,443 DPI compared to CS2's 656, since League requires fast cursor movement across large screen areas.",
  "R6 Siege": "Rainbow Six Siege shows one of the most evenly split mouse markets in esports, with the Razer Viper V3 Pro leading at just 15% followed closely by the Superlight 2 at 12% and original Superlight at 11%. This three-way race reflects Siege's unique gameplay that blends precise angle-holding with fast entry fragging, meaning no single mouse style dominates. The DeathAdder V4 Pro and Superlight 2 Dex both sit at 6%, showing that ergonomic shapes have a strong following among Siege pros who spend a lot of time holding tight pixel angles. Logitech edges out Razer in overall brand share at 37% to 33%, with Zowie maintaining a respectable 10% driven by EC2 loyalists from the game's earlier competitive era.",
  "PUBG": "PUBG's mouse landscape tells a story of a game whose pro scene crystallized during the Logitech Superlight era. The original G Pro X Superlight commands a massive 36% share — the highest single-mouse dominance in any game we track — reflecting how many PUBG pros locked in their setups years ago and haven't switched. Logitech holds 54% total brand share, with the G Pro Wireless adding another 7% from players still using the 2018 classic. Zowie maintains 18% brand share, the second-highest Zowie presence in any title, driven by FK2 and EC2 loyalists from PUBG's golden competitive era. The Razer Viper V3 Pro has only penetrated 5% of the market, suggesting PUBG pros are among the most resistant to switching gear in all of esports.",
  "Apex": "Apex Legends shows a remarkably balanced mouse market with Logitech and Razer tied at 29% brand share each, reflecting the game's diverse mechanical demands. The Viper V3 Pro leads individual models at 16%, but the Superlight and Superlight 2 combine for 22%, showing the Logitech ecosystem's combined strength. Finalmouse holds a notable 13% brand share — one of their strongest showings in any title — driven by the movement-heavy, flick-intensive playstyle that Apex rewards. Lamzu appears at 7%, higher than most titles, suggesting Apex pros are more willing to experiment with newer boutique brands. The average eDPI of 1,274 is significantly higher than tactical shooters, reflecting Apex's need for fast 360-degree tracking during movement-heavy gunfights.",
  "Dota 2": "Dota 2's mouse preferences diverge significantly from the FPS-dominated landscape, with Razer leading at 44% brand share primarily through the DeathAdder line rather than the Viper. The DeathAdder V3 Pro and V2 variants combine for a significant presence, as Dota pros favor the ergonomic comfort of the DeathAdder for games that can last over an hour. Unlike FPS titles, the top mouse in Dota 2 only commands 9%, showing extreme fragmentation with no single model dominating. HyperX holds 14% share — their strongest presence in any title — reflecting the brand's long-standing relationships with Dota teams in CIS and Asian regions. With only 28% wireless adoption, Dota 2 has the lowest wireless rate of any game we track, suggesting pros here are the least concerned about cutting-edge peripheral technology.",
  "Marvel Rivals": "Marvel Rivals shows a mouse distribution similar to Overwatch 2, which makes sense given the shared hero-shooter DNA between the two games. The Superlight 2 and Viper V3 Pro are neck and neck at 19% and 10% respectively, with the DeathAdder V3 Pro and original Superlight also tied at 10%. Logitech leads brand share at 38% with Razer close behind at 33%, and Pulsar has carved out a 10% niche — one of their strongest showings in any competitive title. The average eDPI of 1,767 is among the highest across FPS titles, reflecting the fast-paced, ability-heavy gameplay where tracking multiple airborne heroes requires quick cursor movement. As a newer esports scene, Marvel Rivals players appear more willing to experiment with diverse mouse brands compared to the more entrenched CS2 or Valorant communities.",
  "Overwatch 2": "Overwatch 2's professional scene is split almost perfectly between two mice: the Razer Viper V3 Pro and Logitech G Pro X Superlight 2, each commanding 44% of the market. This near-perfect duopoly is unique across esports and reflects the OWL legacy where Razer and Logitech were the dominant sponsors throughout the league's history. The DeathAdder V3 Pro picks up the remaining 13%, showing that some tank and support players still prefer ergonomic comfort for extended matches. Every single tracked Overwatch 2 pro uses a wireless mouse — the only title with 100% wireless adoption — highlighting how the game's fast movement and frequent 180-degree flicks make cable drag unacceptable. The average 4,000Hz poll rate is also the highest of any game, showing OW2 pros are early adopters of cutting-edge wireless technology.",
  "Deadlock": "Valve's Deadlock shows the Logitech G Pro X Superlight 2 leading at 47%, closely followed by the Razer Viper V3 Pro at 40%, creating another near-duopoly similar to Overwatch 2. As a new title, Deadlock's early adopter pro scene is naturally populated by players migrating from other competitive games, bringing their established mouse preferences with them. The 100% wireless adoption and average 3,800Hz polling rate show that Deadlock pros are using cutting-edge setups, suggesting the early competitive community skews toward experienced FPS veterans rather than newcomers. The market is split cleanly between Logitech at 53% and Razer at 47%, with no other brand represented — a level of brand concentration unique among all titles we track.",
  "Call of Duty": "The Razer Viper V3 Pro commands a dominant 50% share in Call of Duty, with the Superlight 2 and DeathAdder V3 Pro splitting the remainder at 25% each. CoD's fast time-to-kill and emphasis on snappy target acquisition rewards the Viper V3 Pro's ultralight weight and low latency optical switches. Razer holds 75% total brand share — the highest single-brand dominance in any FPS title — largely because the CDL's partnership ecosystem has historically favored Razer-sponsored players. The average eDPI of 4,430 is the highest of any FPS game by a wide margin, reflecting Call of Duty's tradition of much higher sensitivity play compared to tactical shooters. Every tracked CoD pro uses wireless at 4,000Hz polling, showing the competitive scene has fully embraced high-refresh wireless technology.",
  "Rocket League": "Rocket League's mouse data is limited in our database as the game is predominantly played with controllers at the professional level. The Logitech G Pro X Superlight 2 appears as the only tracked mouse, representing the rare keyboard-and-mouse Rocket League player. Most competitive Rocket League is played with PlayStation or Xbox controllers, making mouse choice largely irrelevant for the majority of the pro scene. For the small community of KBM Rocket League players, lightweight wireless mice are preferred for the fast aerial adjustments the game demands. Rocket League remains an outlier in esports — one of the very few major competitive titles where peripheral choice centers on controller selection rather than mouse specifications.",
};

const mice = [
  { id: 1, name: "Razer Viper V3 Pro", brand: "Razer", weight: 54, sensor: "Focus Pro 35K", dpi: 35000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 159, switches: "Gen-3 Optical", proUsage: 21, rating: 9.8, image: "🐍", color: "#00ff6a", batteryLife: 95, clicks: "100M", cable: "USB-C", releaseYear: 2024 },
  { id: 2, name: "Logitech G Pro X Superlight 2", brand: "Logitech", weight: 60, sensor: "HERO 2", dpi: 44000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 159, switches: "Lightforce Hybrid", proUsage: 17, rating: 9.6, image: "🎯", color: "#00b4ff", batteryLife: 95, clicks: "100M", cable: "USB-C", releaseYear: 2023 },
  { id: 21, name: "Logitech G Pro X2 Superstrike", brand: "Logitech", weight: 61, sensor: "HERO 2", dpi: 44000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 180, switches: "HITS Haptic Inductive", proUsage: 1, rating: 9.5, image: "⚡", color: "#00b4ff", batteryLife: 90, clicks: "Unlimited", cable: "USB-C", releaseYear: 2025 },
  { id: 3, name: "Logitech G Pro X Superlight", brand: "Logitech", weight: 63, sensor: "HERO 25K", dpi: 25600, pollingRate: 1000, shape: "Symmetrical", connectivity: "Wireless", price: 129, switches: "Omron", proUsage: 11, rating: 9.2, image: "⚡", color: "#0088cc", batteryLife: 70, clicks: "20M", cable: "Micro-USB", releaseYear: 2020 },
  { id: 4, name: "Zowie EC2-CW", brand: "Zowie", weight: 77, sensor: "PAW3370", dpi: 3200, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 99, switches: "Huano", proUsage: 2, rating: 9.1, image: "🏆", color: "#ff3c3c", batteryLife: 70, clicks: "20M", cable: "USB-C", releaseYear: 2023 },
  { id: 5, name: "Razer DeathAdder V3 Pro", brand: "Razer", weight: 63, sensor: "Focus Pro 30K", dpi: 30000, pollingRate: 4000, shape: "Ergonomic", connectivity: "Wireless", price: 149, switches: "Gen-3 Optical", proUsage: 5, rating: 9.5, image: "☠️", color: "#00ff6a", batteryLife: 90, clicks: "90M", cable: "USB-C", releaseYear: 2022 },
  { id: 6, name: "Finalmouse UltralightX", brand: "Finalmouse", weight: 36, sensor: "Custom", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 189, switches: "Custom Mechanical", proUsage: 1, rating: 9.0, image: "🦁", color: "#d4af37", batteryLife: 80, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 7, name: "Finalmouse Starlight-12", brand: "Finalmouse", weight: 42, sensor: "Custom", dpi: 20000, pollingRate: 1000, shape: "Symmetrical", connectivity: "Wireless", price: 189, switches: "Custom Mechanical", proUsage: 1, rating: 8.6, image: "⭐", color: "#c8a02a", batteryLife: 60, clicks: "60M", cable: "USB-C", releaseYear: 2022 },
  { id: 8, name: "Lamzu Maya X", brand: "Lamzu", weight: 52, sensor: "PAW3950", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 119, switches: "Optical", proUsage: 1, rating: 8.6, image: "🌙", color: "#c084fc", batteryLife: 80, clicks: "100M", cable: "USB-C", releaseYear: 2025 },
  { id: 9, name: "Lamzu Atlantis Mini", brand: "Lamzu", weight: 51, sensor: "PAW3950", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 99, switches: "Optical", proUsage: 1, rating: 8.5, image: "🐬", color: "#a855f7", batteryLife: 75, clicks: "100M", cable: "USB-C", releaseYear: 2024 },
  { id: 10, name: "Pulsar X2F", brand: "Pulsar", weight: 38, sensor: "XS-1", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 109, switches: "Huano Blue Pink Dot", proUsage: 0, rating: 8.8, image: "💫", color: "#f472b6", batteryLife: 65, clicks: "80M", cable: "USB-C", releaseYear: 2025 },
  { id: 11, name: "Vaxee Outset AX", brand: "Vaxee", weight: 67, sensor: "PAW3395", dpi: 26000, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wired", price: 79, switches: "Huano", proUsage: 1, rating: 8.5, image: "🎮", color: "#06b6d4", batteryLife: null, clicks: "20M", cable: "Paracord", releaseYear: 2023 },
  { id: 12, name: "SteelSeries Aerox 5 Wireless", brand: "SteelSeries", weight: 74, sensor: "TrueMove Air", dpi: 18000, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 139, switches: "Golden Micro IP54", proUsage: 1, rating: 8.5, image: "🦅", color: "#ff8c00", batteryLife: 180, clicks: "80M", cable: "USB-C", releaseYear: 2022 },
  { id: 13, name: "Zowie EC2-DW", brand: "Zowie", weight: 75, sensor: "PAW3395", dpi: 3200, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 109, switches: "Huano", proUsage: 1, rating: 9.3, image: "🔴", color: "#ff5555", batteryLife: 70, clicks: "20M", cable: "USB-C", releaseYear: 2024 },
  { id: 14, name: "Endgame Gear OP1 8K", brand: "Endgame", weight: 56, sensor: "PAW3950", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 119, switches: "Kailh GM 8.0", proUsage: 1, rating: 9.0, image: "🎯", color: "#8b5cf6", batteryLife: 70, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 15, name: "ASUS ROG Harpe Ace Extreme", brand: "ASUS", weight: 47, sensor: "AimPoint Pro", dpi: 42000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 179, switches: "ROG Optical Micro", proUsage: 0, rating: 9.3, image: "🦅", color: "#e11d48", batteryLife: 90, clicks: "100M", cable: "USB-C", releaseYear: 2025 },
  { id: 16, name: "Corsair M75 Air", brand: "Corsair", weight: 60, sensor: "Marksman S 33K", dpi: 33000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 99, switches: "Omron", proUsage: 1, rating: 8.8, image: "💨", color: "#ffd700", batteryLife: 100, clicks: "60M", cable: "USB-C", releaseYear: 2024 },
  { id: 17, name: "Ninjutso Sora V2", brand: "Ninjutso", weight: 42, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 89, switches: "Kailh GM 8.0", proUsage: 1, rating: 9.0, image: "🥷", color: "#10b981", batteryLife: 55, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 18, name: "WLMouse Beast X", brand: "WLMouse", weight: 30, sensor: "PAW3950", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 199, switches: "Optical", proUsage: 1, rating: 9.2, image: "🐉", color: "#f59e0b", batteryLife: 70, clicks: "100M", cable: "USB-C", releaseYear: 2025 },
  { id: 19, name: "Sony INZONE M10", brand: "Sony", weight: 48, sensor: "Custom Sony", dpi: 30000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 149, switches: "Optical", proUsage: 0, rating: 9.1, image: "🎮", color: "#3b82f6", batteryLife: 90, clicks: "100M", cable: "USB-C", releaseYear: 2025 },
  { id: 20, name: "Razer Viper V3 HyperSpeed", brand: "Razer", weight: 82, sensor: "Focus Pro 35K", dpi: 35000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 99, switches: "Gen-3 Optical", proUsage: 1, rating: 9.3, image: "🐍", color: "#00dd55", batteryLife: 280, clicks: "90M", cable: "USB-C", releaseYear: 2024 },
  { id: 21, name: "Razer DeathAdder V3", brand: "Razer", weight: 59, sensor: "Focus Pro 35K", dpi: 35000, pollingRate: 8000, shape: "Ergonomic", connectivity: "Wired", price: 90, switches: "Gen-3 Optical", proUsage: 1, rating: 9.4, image: "🐍", color: "#00ff6a", batteryLife: null, clicks: "90M", cable: "Speedflex", releaseYear: 2023 },
  { id: 22, name: "Logitech G502 X Plus", brand: "Logitech", weight: 106, sensor: "HERO 25K", dpi: 25600, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 160, switches: "Lightforce Hybrid", proUsage: 1, rating: 9.0, image: "🎯", color: "#00b4ff", batteryLife: 130, clicks: "Hybrid", cable: "USB-C", releaseYear: 2022 },
  { id: 23, name: "Pulsar X2H", brand: "Pulsar", weight: 53, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Ergonomic", connectivity: "Wireless", price: 99, switches: "Kailh GM 8.0", proUsage: 1, rating: 8.8, image: "💫", color: "#f472b6", batteryLife: 75, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 24, name: "Pulsar X2 Mini", brand: "Pulsar", weight: 46, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 95, switches: "Kailh GM 8.0", proUsage: 1, rating: 8.7, image: "💫", color: "#f472b6", batteryLife: 70, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 25, name: "Zowie FK2-CW", brand: "Zowie", weight: 69, sensor: "PAW3370", dpi: 3200, pollingRate: 1000, shape: "Symmetrical", connectivity: "Wireless", price: 99, switches: "Huano", proUsage: 0, rating: 9.0, image: "🔴", color: "#ff3c3c", batteryLife: 70, clicks: "Mechanical", cable: "USB-C", releaseYear: 2023 },
  { id: 26, name: "Zowie ZA13-C", brand: "Zowie", weight: 66, sensor: "PAW3370", dpi: 3200, pollingRate: 1000, shape: "Symmetrical", connectivity: "Wired", price: 69, switches: "Huano", proUsage: 0, rating: 9.0, image: "🔴", color: "#ff3c3c", batteryLife: null, clicks: "Mechanical", cable: "Paracord", releaseYear: 2022 },
  { id: 27, name: "Lamzu Inca", brand: "Lamzu", weight: 48, sensor: "PAW3950", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 110, switches: "Huano Transparent", proUsage: 1, rating: 8.4, image: "🌙", color: "#c084fc", batteryLife: 80, clicks: "80M", cable: "USB-C", releaseYear: 2025 },
  { id: 28, name: "Vaxee XE Wireless", brand: "Vaxee", weight: 66, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 99, switches: "Huano", proUsage: 1, rating: 8.5, image: "🎮", color: "#06b6d4", batteryLife: 80, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 29, name: "Vaxee NP-01S Wireless", brand: "Vaxee", weight: 68, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Ergonomic", connectivity: "Wireless", price: 99, switches: "Huano", proUsage: 0, rating: 8.4, image: "🎮", color: "#06b6d4", batteryLife: 80, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 30, name: "Finalmouse ULX Prophecy", brand: "Finalmouse", weight: 40, sensor: "Custom", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 189, switches: "Optical", proUsage: 0, rating: 9.1, image: "⭐", color: "#d4af37", batteryLife: 100, clicks: "100M", cable: "USB-C", releaseYear: 2025 },
  { id: 31, name: "SteelSeries Prime Wireless", brand: "SteelSeries", weight: 80, sensor: "TrueMove Air", dpi: 18000, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 110, switches: "Prestige OM", proUsage: 1, rating: 8.3, image: "🦅", color: "#ff8c00", batteryLife: 100, clicks: "100M", cable: "USB-C", releaseYear: 2021 },
  { id: 32, name: "Corsair M75 Wireless", brand: "Corsair", weight: 89, sensor: "Marksman S 33K", dpi: 33000, pollingRate: 2000, shape: "Ergonomic", connectivity: "Wireless", price: 99, switches: "Omron", proUsage: 1, rating: 8.4, image: "⚓", color: "#ffd700", batteryLife: 110, clicks: "60M", cable: "USB-C", releaseYear: 2024 },
  { id: 33, name: "Razer Basilisk V3 Pro", brand: "Razer", weight: 112, sensor: "Focus Pro 35K", dpi: 35000, pollingRate: 4000, shape: "Ergonomic", connectivity: "Wireless", price: 160, switches: "Gen-3 Optical", proUsage: 1, rating: 9.2, image: "🐍", color: "#00ff6a", batteryLife: 90, clicks: "90M", cable: "USB-C", releaseYear: 2022 },
  { id: 34, name: "Endgame Gear XM2w", brand: "Endgame", weight: 63, sensor: "PAW3370", dpi: 19000, pollingRate: 1000, shape: "Symmetrical", connectivity: "Wireless", price: 99, switches: "Kailh GM 8.0", proUsage: 1, rating: 8.7, image: "🎯", color: "#8b5cf6", batteryLife: 75, clicks: "80M", cable: "USB-C", releaseYear: 2023 },
  { id: 35, name: "WLMouse Beast X Mini", brand: "WLMouse", weight: 28, sensor: "PAW3950", dpi: 32000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 189, switches: "Optical", proUsage: 1, rating: 9.0, image: "🐉", color: "#f59e0b", batteryLife: 50, clicks: "100M", cable: "USB-C", releaseYear: 2025 },
  { id: 36, name: "G-Wolves HTS Plus 4K", brand: "G-Wolves", weight: 44, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 79, switches: "Kailh GM 8.0", proUsage: 0, rating: 8.8, image: "🐺", color: "#a78bfa", batteryLife: 60, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 37, name: "Lethal Gaming Gear LA-2", brand: "LGG", weight: 52, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 89, switches: "Huano Transparent", proUsage: 0, rating: 8.9, image: "💀", color: "#ef4444", batteryLife: 70, clicks: "80M", cable: "USB-C", releaseYear: 2024 },
  { id: 38, name: "ASUS ROG Gladius III", brand: "ASUS", weight: 79, sensor: "PAW3395", dpi: 26000, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 119, switches: "ROG Micro", proUsage: 0, rating: 8.4, image: "🦁", color: "#e11d48", batteryLife: 90, clicks: "70M", cable: "USB-C", releaseYear: 2023 },
  { id: 39, name: "HyperX Pulsefire Haste 2", brand: "HyperX", weight: 53, sensor: "PAW3395", dpi: 26000, pollingRate: 8000, shape: "Symmetrical", connectivity: "Wireless", price: 90, switches: "Optical", proUsage: 1, rating: 8.7, image: "⚡", color: "#ff4500", batteryLife: 100, clicks: "100M", cable: "USB-C", releaseYear: 2024 },
  { id: 40, name: "Razer DeathAdder V4 Pro", brand: "Razer", weight: 55, sensor: "Focus Pro 36K Gen-2", dpi: 36000, pollingRate: 8000, shape: "Ergonomic", connectivity: "Wireless", price: 159, switches: "Optical Gen-3", proUsage: 6, rating: 9.7, image: "🐍", color: "#00ff44", batteryLife: 100, clicks: "100M", cable: "USB-C", releaseYear: 2025 },
  { id: 41, name: "Vaxee E1 Wireless", brand: "Vaxee", weight: 64, sensor: "PAW3395", dpi: 26000, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 99, switches: "Huano", proUsage: 1, rating: 8.4, image: "🎯", color: "#22d3ee", batteryLife: 80, clicks: "60M", cable: "USB-C", releaseYear: 2024 },
  { id: 42, name: "Zowie FK2-DW", brand: "Zowie", weight: 60, sensor: "PAW3395", dpi: 26000, pollingRate: 1000, shape: "Symmetrical", connectivity: "Wireless", price: 99, switches: "Zowie Custom", proUsage: 1, rating: 9.1, image: "🏆", color: "#ef4444", batteryLife: 70, clicks: "N/A", cable: "USB-C", releaseYear: 2024 },
  { id: 43, name: "Zowie U2-DW", brand: "Zowie", weight: 58, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 109, switches: "Zowie Custom", proUsage: 1, rating: 9.3, image: "🏆", color: "#ef4444", batteryLife: 70, clicks: "N/A", cable: "USB-C", releaseYear: 2025 },
  { id: 44, name: "Zowie EC1-CW", brand: "Zowie", weight: 77, sensor: "PAW3370", dpi: 26000, pollingRate: 1000, shape: "Ergonomic", connectivity: "Wireless", price: 99, switches: "Zowie Custom", proUsage: 1, rating: 9.0, image: "🏆", color: "#ef4444", batteryLife: 70, clicks: "N/A", cable: "USB-C", releaseYear: 2023 },
  { id: 45, name: "Pulsar Xlite V3 Es", brand: "Pulsar", weight: 46, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Ergonomic", connectivity: "Wireless", price: 109, switches: "Kailh GM 8.0", proUsage: 1, rating: 8.6, image: "💫", color: "#f59e0b", batteryLife: 70, clicks: "80M", cable: "USB-C", releaseYear: 2025 },
  { id: 46, name: "Logitech G Pro X Superlight 2 Dex", brand: "Logitech", weight: 60, sensor: "HERO 2", dpi: 44000, pollingRate: 8000, shape: "Ergonomic", connectivity: "Wireless", price: 169, switches: "Lightforce", proUsage: 2, rating: 9.2, image: "🖱️", color: "#3b82f6", batteryLife: 95, clicks: "N/A", cable: "USB-C", releaseYear: 2025 },
  { id: 47, name: "Pulsar ZywOo Chosen Mouse", brand: "Pulsar", weight: 49, sensor: "PAW3395", dpi: 26000, pollingRate: 4000, shape: "Symmetrical", connectivity: "Wireless", price: 119, switches: "Kailh GM 8.0", proUsage: 0, rating: 8.6, image: "💫", color: "#f59e0b", batteryLife: 70, clicks: "80M", cable: "USB-C", releaseYear: 2025 },
];

const proPlayers = [
  { name: "s1mple", game: "CS2", team: "BC.Game", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "AWPer", country: "🇺🇦", age: 27, fullName: "Oleksandr Kostyliev",
    bio: "Widely regarded as one of the greatest CS players of all time. Known for unmatched mechanical skill, aggressive AWPing, and clutch performances under pressure.",
    achievements: ["HLTV #1 Player 2018", "HLTV #1 Player 2021", "HLTV #1 Player 2022", "PGL Major Antwerp 2022 Champion", "PGL Major Antwerp 2022 MVP", "Intel Grand Slam Season 4", "BLAST Premier World Final 2021 MVP", "IEM Katowice 2020 MVP", "ESL One Cologne 2021 Champion", "20+ HLTV MVP Awards"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2021-2024" }, { mouse: "Logitech G Pro Wireless", period: "2019-2021" }, { mouse: "Zowie EC2-A", period: "2016-2019" }],
  },
  { name: "ZywOo", game: "CS2", team: "Team Vitality", mouse: "Pulsar ZywOo The Chosen Mouse", hz: 1000, dpi: 400, sens: 2.0, edpi: 800, role: "Rifler", country: "🇫🇷", age: 24, fullName: "Mathieu Herbaut",
    bio: "French prodigy who burst onto the scene at 18 and immediately dominated. Known for his calm, methodical playstyle and absurd consistency across every tournament.",
    achievements: ["HLTV #1 Player 2019", "HLTV #1 Player 2020", "HLTV #1 Player 2023", "HLTV #1 Player 2025", "BLAST Premier World Final 2023 Champion", "BLAST Premier World Final 2023 MVP", "IEM Katowice 2025 Champion", "BLAST Austin Major 2025 Champion", "5 HLTV MVP awards in rookie year", "Gamers8 2023 MVP"],
    mouseHistory: [{ mouse: "Pulsar ZywOo The Chosen Mouse", period: "2025-Present" }, { mouse: "Vaxee Outset AX", period: "2023-2025" }, { mouse: "Zowie EC2-CW", period: "2021-2023" }, { mouse: "Zowie EC2-B", period: "2019-2021" }],
  },
  { name: "NiKo", game: "CS2", team: "Falcons Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇧🇦", age: 28, fullName: "Nikola Kovač",
    bio: "The Bosnian prodigy known for arguably the best raw aim in CS history. Despite an elusive Major title, NiKo's individual brilliance and longevity at the top are legendary.",
    achievements: ["HLTV #2 Player 2017", "HLTV #3 Player 2021", "9× Counter-Strike Championship MVP", "ESL One New York 2017 MVP", "IEM Katowice 2022 MVP", "BLAST Premier Spring Final 2022 Champion", "Tied highest Big Event rating (1.70)", "ESL Pro League S14 Champion", "IEM Cologne 2022 Champion", "BLAST Premier World Final 2022 Champion"],
    mouseHistory: [{ mouse: "Razer DeathAdder V4 Pro", period: "2025-Present" }, { mouse: "Razer DeathAdder V3 Pro", period: "2023-2025" }, { mouse: "Zowie EC2-A", period: "2018-2023" }, { mouse: "SteelSeries Rival 100", period: "2015-2018" }],
  },
  { name: "donk", game: "CS2", team: "Team Spirit", mouse: "ZOWIE x donk Mouse", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇷🇺", age: 18, fullName: "Danil Kryshkovets",
    bio: "The teenage sensation who redefined what a rookie year looks like. Started playing CS at age 4, went pro at 16, and won a Major at 17. The youngest Major MVP in CS history.",
    achievements: ["HLTV #1 Player 2024", "HLTV #2 Player 2025", "Perfect World Shanghai Major 2024 Champion & MVP", "IEM Katowice 2024 Champion & MVP", "IEM Cologne 2025 Champion & MVP", "Youngest Major MVP in CS history", "10 HLTV MVP Awards", "HLTV Rookie of the Year 2024", "BLAST Premier Spring Final 2024 Champion", "Highest Major rating ever (1.49)"],
    mouseHistory: [{ mouse: "ZOWIE x donk Mouse", period: "2025-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2024-2025" }, { mouse: "Razer Viper V2 Pro", period: "2023-2024" }],
  },
  { name: "m0NESY", game: "CS2", team: "Falcons Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 800, sens: 1.15, edpi: 920, role: "AWPer", country: "🇷🇺", age: 20, fullName: "Ilya Osipov",
    bio: "A generational AWPing talent who joined G2 at just 16. Known for flashy flick shots, insane highlight plays, and carrying G2 to numerous deep tournament runs.",
    achievements: ["HLTV #4 Player 2024", "HLTV #3 Player 2023", "IEM Katowice 2023 MVP", "BLAST Premier Spring Groups 2023 MVP", "IEM Cologne 2024 MVP", "PGL Major Copenhagen 2024 Semi-finalist", "Youngest player signed to G2 at 16", "Multiple 1.30+ rated tournaments", "ESL Pro League S17 MVP", "BLAST Premier Fall Final 2023 Champion"],
    mouseHistory: [{ mouse: "Logitech G Pro X2 SUPERSTRIKE", period: "2025-Present" }, { mouse: "Razer Viper V3 Pro", period: "2024-2025" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }, { mouse: "Logitech G Pro Wireless", period: "2021-2022" }],
  },
  { name: "ropz", game: "CS2", team: "Team Vitality", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 2000, dpi: 400, sens: 1.77, edpi: 708, role: "Lurker", country: "🇪🇪", age: 25, fullName: "Robin Kool",
    bio: "The Estonian lurking specialist famous for his invisible rotations and clutch plays. One of the most fundamentally sound players in CS history with unreal crosshair placement.",
    achievements: ["PGL Major Antwerp 2022 Champion", "IEM Katowice 2022 Champion", "IEM Cologne 2022 Champion", "ESL Pro League S15 Champion", "Intel Grand Slam Season 4", "HLTV #5 Player 2022", "HLTV Top 10 Player 3 consecutive years", "BLAST Premier World Final 2022 Champion", "IEM Katowice 2022 MVP", "Shanghai Major 2024 Finalist"],
    mouseHistory: [{ mouse: "Razer DeathAdder V3 HyperSpeed", period: "2025-Present" }, { mouse: "Zowie EC2-CW", period: "2023-2025" }, { mouse: "Zowie EC2-B", period: "2019-2023" }, { mouse: "Zowie EC2-A", period: "2017-2019" }],
  },
  { name: "Faker", game: "LoL", team: "T1", mouse: "Razer DeathAdder V3 Pro", dpi: 3500, sens: 6, edpi: 21000, role: "Mid", country: "🇰🇷", age: 29, fullName: "Lee Sang-hyeok",
    bio: "The undisputed GOAT of League of Legends and arguably all of esports. Six World Championships, unmatched longevity, and a level of fame that transcends gaming.",
    achievements: ["6× League of Legends World Champion (2013, 2015, 2016, 2023, 2024, 2025)", "2× MSI Champion", "10× LCK Champion", "Worlds 2023 Finals MVP", "Most decorated LoL player of all time", "Named to Forbes 30 Under 30", "Owner of 'Faker Tower' in Seoul", "Worlds 2024 Finals MVP", "Longest tenure with single org in LoL", "LOL Hall of Legends inductee"],
    mouseHistory: [{ mouse: "Razer DeathAdder V3 Pro", period: "2023-Present" }, { mouse: "Razer DeathAdder V2 Pro", period: "2020-2023" }, { mouse: "Razer DeathAdder Elite", period: "2017-2020" }],
  },
  { name: "TenZ", game: "Valorant", team: "Sentinels", mouse: "Finalmouse Starlight-12", dpi: 800, sens: 0.40, edpi: 320, role: "Duelist", country: "🇨🇦", age: 23, fullName: "Tyson Ngo",
    bio: "One of the faces of competitive Valorant from day one. Known for his insane aim, flashy plays, and massive streaming presence. A cultural icon for the Valorant community.",
    achievements: ["VCT Masters Reykjavik 2021 Champion", "VCT Masters Reykjavik 2021 MVP", "First Valorant player to reach Radiant on NA ladder", "Most popular Valorant content creator", "VCT Champions 2024 Finalist", "Multiple First Strike victories", "Sentinels franchise player", "VCT Americas League 2024", "Former CS:GO pro for Cloud9", "VCT Masters Shanghai 2024 Semi-finalist"],
    mouseHistory: [{ mouse: "Finalmouse Starlight-12", period: "2022-Present" }, { mouse: "Finalmouse UltralightX", period: "2024-Present (alternate)" }, { mouse: "Logitech G Pro X Superlight", period: "2021-2022" }, { mouse: "Razer Viper Mini", period: "2020-2021" }],
  },
  { name: "aspas", game: "Valorant", team: "LOUD", mouse: "Razer Viper V3 Pro", dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇧🇷", age: 21, fullName: "Erick Santos",
    bio: "Brazil's brightest Valorant star, known for jaw-dropping aim and aggressive entries. Led LOUD to become the first non-Korean/NA team to win a Valorant international event.",
    achievements: ["VCT Champions 2022 Champion", "VCT Champions 2022 MVP", "VCT Masters Copenhagen 2022 Champion", "VCT LOCK//IN São Paulo 2023 Champion", "VCT Americas 2023 Champion", "VCT Champions 2023 Finalist", "Multiple VCT Americas MVP awards", "LOUD franchise star", "Brazil's most decorated Valorant player", "VCT Masters Madrid 2024 Semi-finalist"],
    mouseHistory: [{ mouse: "Razer Viper V3 Pro", period: "2024-Present" }, { mouse: "Razer Viper V2 Pro", period: "2023-2024" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2023" }],
  },
  { name: "yay", game: "Valorant", team: "Cloud9", mouse: "Logitech G Pro X Superlight 2", dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇺🇸", age: 25, fullName: "Jaccob Whiteaker",
    bio: "Known as 'El Diablo' for his terrifying Chamber play. One of the most mechanically gifted NA Valorant players with surgical precision on the Operator.",
    achievements: ["VCT Masters Copenhagen 2022 Finalist", "VCT Champions 2022 Semi-finalist", "VCT NA Champions 2022", "Multiple OpTic Gaming tournament wins", "VCT NA Player of the Year 2022", "HLTV/Thespike Top 5 Player 2022", "OpTic Gaming franchise star", "VCT Masters Reykjavik 2022 Champion", "Known for 'El Diablo' Chamber play", "VCT Americas League competitor"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }, { mouse: "Razer Viper Ultimate", period: "2020-2022" }],
  },
  { name: "Demon1", game: "Valorant", team: "Evil Geniuses", mouse: "Razer Viper V3 Pro", dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇺🇸", age: 20, fullName: "Max Mazanov",
    bio: "An explosive young talent who took the Valorant scene by storm. Known for extremely low sensitivity and insane flick aim that makes highlight reels look routine.",
    achievements: ["VCT Champions 2023 Champion", "VCT Champions 2023 Grand Finals MVP", "VCT Americas 2023 First Team", "Youngest VCT Champions winner", "Evil Geniuses franchise player", "VCT LOCK//IN 2023 Finalist", "Lowest eDPI among top Valorant pros", "Multiple VCT Americas MVP nominations", "Rookie of the Year candidate 2023", "VCT Americas 2024 competitor"],
    mouseHistory: [{ mouse: "Razer Viper V3 Pro", period: "2024-Present" }, { mouse: "Razer Viper V2 Pro", period: "2023-2024" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2023" }],
  },
  { name: "cNed", game: "Valorant", team: "Navi", mouse: "Logitech G Pro X Superlight", dpi: 800, sens: 0.37, edpi: 296, role: "Duelist", country: "🇹🇷", age: 23, fullName: "Mehmet Yağız İpek",
    bio: "Turkey's Valorant superstar, known for his Jett mastery and clutch Operator plays. His VCT Champions 2021 run with Acend is one of the most iconic in Valorant history.",
    achievements: ["VCT Champions 2021 Champion", "VCT Champions 2021 Grand Finals MVP", "VCT EMEA 2021 Champion", "First VCT Champions winner ever", "Acend franchise player", "VCT Masters Berlin 2021 Finalist", "Turkey's most famous Valorant player", "VCT EMEA League competitor", "Multiple clutch-of-the-year moments", "Transitioned to NAVI roster"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight", period: "2021-Present" }, { mouse: "Logitech G Pro Wireless", period: "2020-2021" }],
  },
  { name: "Chovy", game: "LoL", team: "Gen.G", mouse: "Logitech G Pro X Superlight 2", dpi: 1600, sens: 7, edpi: 11200, role: "Mid", country: "🇰🇷", age: 24, fullName: "Jeong Ji-hoon",
    bio: "One of the most mechanically talented mid laners in LoL history. Famous for his CS records and laning dominance, Chovy has been a perennial MVP candidate.",
    achievements: ["LCK Champion 2024", "LCK Spring 2024 MVP", "Worlds 2024 Semi-finalist", "LCK All-Pro First Team (multiple)", "Holds multiple CS per minute records", "Gen.G franchise mid laner", "LCK regular season MVP 2022", "Worlds 2022 Quarter-finalist", "Griffin prodigy turned star", "Consistently top 3 mid laner worldwide"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }, { mouse: "Logitech G Pro Wireless", period: "2020-2022" }],
  },
  { name: "Caps", game: "LoL", team: "G2", mouse: "Razer Viper V3 Pro", dpi: 1600, sens: 6, edpi: 9600, role: "Mid", country: "🇩🇰", age: 25, fullName: "Rasmus Borregaard Winther",
    bio: "Europe's greatest mid laner, nicknamed 'Claps' when on form and 'Craps' when off. Known for his aggressive, limit-testing playstyle and incredible champion pool.",
    achievements: ["Worlds 2019 Finalist", "MSI 2019 Champion", "MSI 2017 Finalist", "9× LEC Champion", "LEC MVP (multiple)", "G2 Esports franchise mid laner", "Worlds 2018 Semi-finalist", "Worlds 2020 Semi-finalist", "Most LEC titles of any player", "Known for iconic Vayne mid pick"],
    mouseHistory: [{ mouse: "Razer Viper V3 Pro", period: "2024-Present" }, { mouse: "Razer Viper V2 Pro", period: "2023-2024" }, { mouse: "Logitech G Pro Wireless", period: "2019-2023" }],
  },
  { name: "Bugha", game: "Fortnite", team: "Sentinels", mouse: "Finalmouse UltralightX", dpi: 800, sens: 6.1, edpi: 4880, role: "Solos", country: "🇺🇸", age: 22, fullName: "Kyle Giersdorf",
    bio: "The Fortnite World Cup champion who became a household name at 16. His calm, calculated playstyle and building mechanics made him the face of competitive Fortnite.",
    achievements: ["Fortnite World Cup 2019 Solo Champion ($3M)", "Youngest esports millionaire at 16", "Multiple FNCS victories", "Sentinels franchise player", "Fortnite Champion Series Grand Finals", "Twitch Rivals victories", "Consistent top earner in Fortnite", "Cultural icon of competitive Fortnite", "Featured on Tonight Show with Jimmy Fallon", "Multiple DreamHack tournament wins"],
    mouseHistory: [{ mouse: "Finalmouse UltralightX", period: "2024-Present" }, { mouse: "Finalmouse Starlight-12", period: "2022-2024" }, { mouse: "Finalmouse Air58", period: "2019-2022" }],
  },
  { name: "arT", game: "CS2", team: "Fluxo", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 800, sens: 2.55, edpi: 2040, role: "IGL", country: "🇧🇷", age: 28, fullName: "Andrei Piovezan",
    bio: "The most aggressive IGL in CS history. Known for his unorthodox rush-heavy calling style, knife kills, and making FURIA one of the most exciting teams to watch.",
    achievements: ["IEM New York 2020 Champion", "ESL Pro League S12 Finalist", "Multiple BLAST Premier appearances", "FURIA franchise captain since 2019", "ESL Pro League S16 Semi-finalist", "Known for most aggressive IGL style", "Led FURIA to consistent top 10 world ranking", "Multiple ESL tournament deep runs", "Fan favorite for knife kills and aggression", "PGL Major Copenhagen 2024 competitor"],
    mouseHistory: [{ mouse: "Razer DeathAdder V3 Pro", period: "2023-Present" }, { mouse: "Razer DeathAdder V2 Pro", period: "2021-2023" }, { mouse: "Zowie EC2-B", period: "2019-2021" }],
  },
  { name: "ScreaM", game: "Valorant", team: "Karmine Corp", mouse: "Lamzu Maya X", dpi: 400, sens: 0.78, edpi: 312, role: "Duelist", country: "🇧🇪", age: 30, fullName: "Adil Benrlitom",
    bio: "The legendary 'Headshot Machine' who transitioned from CS:GO to become one of Valorant's biggest stars. Known for his insane one-tap aim and headshot percentage.",
    achievements: ["VCT EMEA Challengers Champion", "Known as 'The Headshot Machine'", "Former CS:GO star with 90%+ HS rate", "Team Liquid Valorant founding member", "Multiple First Strike victories", "VCT Masters Berlin 2021 competitor", "One of first big CS→Valorant transitions", "Longest-tenured Valorant pro", "Karmine Corp franchise player", "Cultural icon bridging CS and Valorant"],
    mouseHistory: [{ mouse: "Lamzu Maya X", period: "2025-Present" }, { mouse: "Lamzu Atlantis Mini", period: "2024-2025" }, { mouse: "Finalmouse Starlight-12", period: "2022-2024" }, { mouse: "Logitech G Pro X Superlight", period: "2021-2022" }],
  },
  { name: "EliGE", game: "CS2", team: "Team Liquid", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 1600, sens: 0.74, edpi: 1184, role: "Rifler", country: "🇺🇸", age: 27, fullName: "Jonathan Jablonowski",
    bio: "North America's finest rifler for over a decade. Known for incredible spray control, consistency, and carrying the flag for NA CS through multiple eras.",
    achievements: ["Intel Grand Slam Season 2 (Team Liquid)", "ESL One Cologne 2019 Champion", "IEM Chicago 2019 Champion", "BLAST Premier Spring 2020 Champion", "HLTV #8 Player 2019", "Longest-tenured NA pro in CS", "Multiple ESL Pro League titles", "IEM Sydney 2019 Champion", "Led Team Liquid's era in 2019", "NA CS icon and ambassador"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2021-2024" }, { mouse: "Logitech G Pro Wireless", period: "2019-2021" }, { mouse: "Zowie EC2-A", period: "2016-2019" }],
  },
  { name: "Puppey", game: "Dota 2", team: "Secret", mouse: "Razer DeathAdder V3 Pro", dpi: 800, sens: 6.0, edpi: 4800, role: "Support", country: "🇪🇪", age: 34, fullName: "Clement Ivanov",
    bio: "One of the most legendary captains in Dota 2 history. Founded Team Secret and has been competing at the highest level since the original DotA days.",
    achievements: ["The International 2011 Champion (Navi)", "Founded Team Secret in 2014", "Multiple TI appearances (10+)", "Dota 2 Asia Championships 2015 Champion", "Shanghai Major 2016 Champion", "The longest-active Dota 2 pro", "Multiple Majors victories", "ESL One Birmingham 2018 Champion", "Kuala Lumpur Major 2018 Champion", "Consistently top-tier captain for 14+ years"],
    mouseHistory: [{ mouse: "Razer DeathAdder V3 Pro", period: "2023-Present" }, { mouse: "Razer DeathAdder V2", period: "2020-2023" }, { mouse: "Razer DeathAdder Elite", period: "2017-2020" }],
  },
  { name: "Yatoro", game: "Dota 2", team: "Spirit", mouse: "Logitech G Pro X Superlight 2", dpi: 800, sens: 4.5, edpi: 3600, role: "Carry", country: "🇺🇦", age: 23, fullName: "Illya Mulyarchuk",
    bio: "The carry player who led Team Spirit to a shocking TI10 victory as massive underdogs. Known for an incredibly deep hero pool and fearless late-game plays.",
    achievements: ["The International 2021 (TI10) Champion", "TI10 Grand Finals MVP performance", "Largest hero pool of any carry at TI10", "Team Spirit Dota 2 franchise carry", "Multiple DPC Major appearances", "Riyadh Masters 2023 competitor", "Lima Major 2023 competitor", "One of youngest TI winners", "Known for Morphling and Terrorblade mastery", "Consistently top-tier carry player"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }, { mouse: "Razer DeathAdder V2", period: "2021-2022" }],
  },
  { name: "Collapse", game: "Dota 2", team: "Spirit", mouse: "Razer Viper V3 Pro", dpi: 800, sens: 3.8, edpi: 3040, role: "Offlane", country: "🇺🇦", age: 23, fullName: "Magomed Khalilov",
    bio: "Famous for the most iconic play in TI history  -  his Magnus Reverse Polarity in the TI10 Grand Finals that turned the series. An explosive offlaner with incredible initiation.",
    achievements: ["The International 2021 (TI10) Champion", "The 'Magnus RP'  -  most iconic TI play ever", "TI10 Grand Finals key performer", "Team Spirit franchise offlaner", "Multiple DPC Major appearances", "Known for Mars and Magnus mastery", "Bali Major 2023 competitor", "Riyadh Masters appearances", "One of best initiators in Dota 2", "Consistently top-rated offlaner"],
    mouseHistory: [{ mouse: "Razer Viper V3 Pro", period: "2024-Present" }, { mouse: "Razer Viper V2 Pro", period: "2023-2024" }, { mouse: "Logitech G Pro Wireless", period: "2021-2023" }],
  },
  { name: "Beaulo", game: "R6 Siege", team: "DarkZero", mouse: "Razer Viper V3 Pro", dpi: 400, sens: 12, edpi: 4800, role: "Entry", country: "🇺🇸", age: 23, fullName: "Jason Doty",
    bio: "Rose to fame through YouTube montages before going pro. Widely considered the most mechanically gifted R6 Siege player in North America.",
    achievements: ["Six Invitational 2023 Finalist", "NAL Champion (multiple seasons)", "R6 Siege content creator turned pro", "Most watched R6 player on YouTube", "TSM franchise player for years", "Six Major appearances", "Consistently top-rated NA player", "DarkZero star fragger", "Known for insane flick shots and reflexes", "Face of North American Rainbow Six"],
    mouseHistory: [{ mouse: "Razer Viper V3 Pro", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }, { mouse: "Finalmouse Ultralight 2", period: "2020-2022" }],
  },
  { name: "Shaiiko", game: "R6 Siege", team: "BDS", mouse: "Logitech G Pro X Superlight 2", dpi: 400, sens: 9, edpi: 3600, role: "Flex", country: "🇫🇷", age: 24, fullName: "Stéphane Music",
    bio: "The French aiming phenomenon of R6 Siege. Known for aggressive entry fragging, incredible aim, and being the backbone of BDS Esport's dominant European campaigns.",
    achievements: ["Six Invitational 2024 Champion", "EUL Champion (multiple)", "Six Major August 2022 Champion", "Most feared fragger in EU R6", "BDS Esport franchise player", "Multiple Six Invitational appearances", "Consistently highest rated EU player", "Known for 'Shaiiko peek' technique", "EU League MVP (multiple)", "Longest tenured BDS player"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }, { mouse: "Logitech G Pro Wireless", period: "2020-2022" }],
  },
  { name: "Paluh", game: "R6 Siege", team: "w7m", mouse: "Zowie EC2-CW", dpi: 400, sens: 8, edpi: 3200, role: "Support", country: "🇧🇷", age: 26, fullName: "Luccas Maroneze",
    bio: "Brazil's finest R6 player, known for clutch plays and smart positioning. Led multiple Brazilian rosters to international success in the Six Invitational.",
    achievements: ["Six Invitational 2021 Champion (NiP)", "Six Invitational 2021 Grand Finals MVP", "LATAM League Champion (multiple)", "Six Major Mexico 2021 Champion", "Brazil's most decorated R6 player", "w7m esports star player", "Multiple Copa Elite Six victories", "Consistently top-rated LATAM player", "Known for clutch 1vX situations", "Six Invitational regular competitor"],
    mouseHistory: [{ mouse: "Zowie EC2-CW", period: "2023-Present" }, { mouse: "Zowie EC2-B", period: "2020-2023" }],
  },
  { name: "Jstn", game: "Rocket League", team: "G2", mouse: "Logitech G Pro X Superlight 2", dpi: 800, sens: null, edpi: null, role: "Striker", country: "🇺🇸", age: 22, fullName: "Justin Morales",
    bio: "One of the most mechanically gifted Rocket League players ever. Famous for his ceiling shots, double taps, and the iconic Game 7 overtime goal at RLCS S5.",
    achievements: ["RLCS Season 5 World Champion", "RLCS S5 iconic OT goal", "Multiple RLCS regional championships", "NRG Esports franchise player (former)", "RLCS Season 8 Finalist", "One of highest mechanical ceilings in RL", "G2 Esports star player", "RLCS Major appearances", "Known for ceiling shot mastery", "North America's most talented striker"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }],
  },
  { name: "Shotzzy", game: "Call of Duty", team: "OpTic", mouse: "Razer Viper V3 Pro", dpi: 800, sens: 5.5, edpi: 4400, role: "SMG", country: "🇺🇸", age: 23, fullName: "Anthony Cuevas-Castro",
    bio: "The movement king of Call of Duty. Former Halo champion who brought unprecedented movement mechanics to CoD, revolutionizing how SMG players approach gunfights.",
    achievements: ["CDL 2022 Champion (OpTic Texas)", "CDL 2022 MVP", "Halo World Championship 2018 Champion", "First player to win Halo + CoD championships", "CDL Major victories (multiple)", "CDL All-Star (multiple)", "OpTic franchise SMG player", "Known for revolutionary movement", "CDL Stage MVP awards", "Youngest Halo world champion at the time"],
    mouseHistory: [{ mouse: "Razer Viper V3 Pro", period: "2024-Present" }, { mouse: "Razer Viper V2 Pro", period: "2023-2024" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2023" }],
  },
  { name: "Simp", game: "Call of Duty", team: "Atlanta FaZe", mouse: "Logitech G Pro X Superlight 2", dpi: 800, sens: 6.0, edpi: 4800, role: "SMG", country: "🇺🇸", age: 23, fullName: "Chris Lehr",
    bio: "One of the greatest Call of Duty players of all time. Known for his ice-cold composure, lethal SMG play, and forming the legendary duo with aBeZy on Atlanta FaZe.",
    achievements: ["CDL 2021 Champion (Atlanta FaZe)", "CWL 2019 Championship Runner-up", "CDL 2021 MVP", "Multiple CDL Major wins", "CDL All-Star (every year)", "Atlanta FaZe franchise player", "CoD League kills record holder", "Champs Sunday appearances (multiple)", "Known for 'Tiny Terrors' duo with aBeZy", "Consistently highest K/D in CDL"],
    mouseHistory: [{ mouse: "Logitech G Pro X Superlight 2", period: "2024-Present" }, { mouse: "Logitech G Pro X Superlight", period: "2022-2024" }, { mouse: "Logitech G Pro Wireless", period: "2020-2022" }],
  },
  { name: "Cellium", game: "Call of Duty", team: "Atlanta FaZe", mouse: "Razer DeathAdder V3 Pro", dpi: 800, sens: 5.0, edpi: 4000, role: "AR", country: "🇺🇸", age: 24, fullName: "McArthur Jovel",
    bio: "The most versatile player in Call of Duty. Known for his intelligence, creative use of game mechanics, and ability to play any role at the highest level.",
    achievements: ["CDL 2021 Champion (Atlanta FaZe)", "CDL 2023 Major Champion", "CDL MVP candidate (multiple years)", "Atlanta FaZe franchise AR", "CDL All-Star (multiple)", "Known for 'galaxy brain' plays", "Most versatile player in CDL", "Multiple CDL Major finals", "Champs 2022 Grand Finals appearance", "Consistently top 3 AR player in CDL"],
    mouseHistory: [{ mouse: "Razer DeathAdder V3 Pro", period: "2023-Present" }, { mouse: "Razer DeathAdder V2 Pro", period: "2021-2023" }, { mouse: "Logitech G Pro Wireless", period: "2020-2021" }],
  },
];

// Extended database  -  players without full profiles (sourced from prosettings.net data)
const extendedPlayers = [
  // Spirit
  // Heroic
  // Navi extended
  // Complexity
  // paiN
  // GamerLegion
  // BIG
  // Virtus.pro
  // 3DMAX
  // SAW
  // Monte
  // Apeks
  // Imperial
  // MIBR
  // OG
  // 9Pandas
  // Ninjas in Pyjamas
  // ECSTATIC
  // Ence
  // FlyQuest
  // Wildcard / TheMongolz
  // Falcons extended
  // Retired legends / Streamers still tracked
  // Additional active pros
  // Overwatch 2
  { name: "Proper", game: "Overwatch 2", team: "SF Shock", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 3.5, edpi: 2800, role: "DPS", country: "🇰🇷" },
  { name: "Profit", game: "Overwatch 2", team: "Seoul Dynasty", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 5.0, edpi: 4000, role: "DPS", country: "🇰🇷" },
  { name: "Kevster", game: "Overwatch 2", team: "LA Gladiators", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 3.0, edpi: 2400, role: "DPS", country: "🇸🇪" },
  // Deadlock
  { name: "s1mple_DL", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.1, edpi: 840, role: "Carry", country: "🇺🇦" },
  { name: "Subroza", game: "Deadlock", team: "Content", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.0, edpi: 800, role: "DPS", country: "🇨🇦" },
  { name: "fl0m_DL", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Carry", country: "🇺🇸" },
  { name: "Mixwell", game: "Deadlock", team: "Content", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.9, edpi: 720, role: "DPS", country: "🇪🇸" },
  { name: "n0thing", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.3, edpi: 920, role: "Flex", country: "🇺🇸" },
  { name: "Hiko", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.1, edpi: 880, role: "DPS", country: "🇺🇸" },
  { name: "WARDELL", game: "Deadlock", team: "Content", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.85, edpi: 680, role: "Carry", country: "🇨🇦" },
  { name: "ShahZaM", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.0, edpi: 800, role: "Flex", country: "🇺🇸" },
  { name: "Zest", game: "Deadlock", team: "Content", mouse: "Razer DeathAdder V3 Pro", hz: 4000, dpi: 800, sens: 1.2, edpi: 960, role: "Support", country: "🇰🇷" },
  { name: "mang0", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.5, edpi: 1200, role: "Flex", country: "🇺🇸" },
  // More LoL
  // More Overwatch 2
  { name: "Fearless", game: "Overwatch 2", team: "Dallas Fuel", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 4.0, edpi: 3200, role: "Tank", country: "🇰🇷" },
  { name: "Shu", game: "Overwatch 2", team: "LA Gladiators", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 4.5, edpi: 3600, role: "Support", country: "🇰🇷" },
  { name: "Pelican", game: "Overwatch 2", team: "Houston Outlaws", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 3.2, edpi: 2560, role: "DPS", country: "🇰🇷" },
  { name: "Lip", game: "Overwatch 2", team: "Shanghai Dragons", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 4.0, edpi: 3200, role: "DPS", country: "🇰🇷" },
  { name: "Viol2t", game: "Overwatch 2", team: "SF Shock", mouse: "Razer DeathAdder V3 Pro", hz: 4000, dpi: 800, sens: 4.8, edpi: 3840, role: "Support", country: "🇰🇷" },
  // Call of Duty
  { name: "Shotzzy2", game: "Call of Duty", team: "OpTic", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 5.5, edpi: 4400, role: "SMG", country: "🇺🇸" },
  { name: "aBeZy", game: "Call of Duty", team: "Atlanta FaZe", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 6.0, edpi: 4800, role: "SMG", country: "🇺🇸" },
  { name: "Dashy2", game: "Call of Duty", team: "OpTic", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 5.0, edpi: 4000, role: "AR", country: "🇨🇦" },
  { name: "Kenny", game: "Call of Duty", team: "LA Thieves", mouse: "Razer DeathAdder V3 Pro", hz: 4000, dpi: 800, sens: 5.5, edpi: 4400, role: "SMG", country: "🇺🇸" },
  { name: "Pred", game: "Call of Duty", team: "Seattle Surge", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 5.8, edpi: 4640, role: "SMG", country: "🇺🇸" },




  // ─── OVERWATCH 2 BATCH ───
  { name: "Proper", game: "Overwatch 2", team: "SF Shock", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 3.5, edpi: 2800, role: "DPS", country: "🇰🇷" },
  { name: "Kilo", game: "Overwatch 2", team: "Seoul Dynasty", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 4.0, edpi: 3200, role: "DPS", country: "🇰🇷" },
  { name: "MN3", game: "Overwatch 2", team: "Philly Fusion", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 3.0, edpi: 2400, role: "DPS", country: "🇰🇷" },
  { name: "Profit", game: "Overwatch 2", team: "Seoul Dynasty", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 5.0, edpi: 4000, role: "DPS", country: "🇰🇷" },
  { name: "LiP2", game: "Overwatch 2", team: "Shanghai Dragons", mouse: "Razer DeathAdder V3 Pro", hz: 4000, dpi: 800, sens: 3.8, edpi: 3040, role: "DPS", country: "🇰🇷" },
  { name: "Hanbin", game: "Overwatch 2", team: "Dallas Fuel", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 5.5, edpi: 4400, role: "Tank", country: "🇰🇷" },
  { name: "smurf", game: "Overwatch 2", team: "Atlanta Reign", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 4.2, edpi: 3360, role: "Tank", country: "🇰🇷" },
  { name: "Twilight", game: "Overwatch 2", team: "Seoul Dynasty", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 4.5, edpi: 3600, role: "Support", country: "🇰🇷" },




  // ─── DEADLOCK BATCH ───
  { name: "Ethos", game: "Deadlock", team: "Content", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.0, edpi: 800, role: "Carry", country: "🇺🇸" },
  { name: "Sinatraa", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.2, edpi: 960, role: "Carry", country: "🇺🇸" },
  { name: "Stewie2k_DL", game: "Deadlock", team: "Content", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 400, sens: 2.0, edpi: 800, role: "Flex", country: "🇺🇸" },
  { name: "Tarik_DL", game: "Deadlock", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.1, edpi: 880, role: "Flex", country: "🇺🇸" },
  { name: "caedrel", game: "Deadlock", team: "Content", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.9, edpi: 720, role: "Support", country: "🇬🇧" },


  // ─── CS2: 817 players from prosettings.net (verified Feb 2026) ───
  { name: "flameZ", game: "CS2", team: "Team Vitality", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 3, edpi: 1200, role: "Rifler", country: "🇮🇱" },
  { name: "ropz", game: "CS2", team: "Team Vitality", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 2000, dpi: 400, sens: 1.77, edpi: 708, role: "Rifler", country: "🇪🇪" },
  { name: "mezii", game: "CS2", team: "Team Vitality", mouse: "VAXEE XE V2 Fluorescent", hz: 2000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇬🇧" },
  { name: "ZywOo", game: "CS2", team: "Team Vitality", mouse: "Pulsar ZywOo The Chosen Mouse", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇫🇷" },
  { name: "apEX", game: "CS2", team: "Team Vitality", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 1.91, edpi: 764, role: "Rifler", country: "🇫🇷" },
  { name: "zont1x", game: "CS2", team: "Team Spirit", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.05, edpi: 840, role: "Rifler", country: "🇺🇦" },
  { name: "chopper", game: "CS2", team: "Team Spirit", mouse: "VAXEE ZYGEN NP-01S V2 Wireless", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇷🇺" },
  { name: "tN1R", game: "CS2", team: "Team Spirit", mouse: "ZOWIE x donk Mouse", hz: 1000, dpi: 800, sens: 0.5, edpi: 400, role: "Rifler", country: "🇧🇾" },
  { name: "magixx", game: "CS2", team: "Team Spirit", mouse: "VAXEE OUTSET AX", hz: 2000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇷🇺" },
  { name: "sh1ro", game: "CS2", team: "Team Spirit", mouse: "ZOWIE U3-DW", hz: 2000, dpi: 800, sens: 1.04, edpi: 832, role: "Sniper", country: "🇷🇺" },
  { name: "donk", game: "CS2", team: "Team Spirit", mouse: "ZOWIE x donk Mouse", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇷🇺" },
  { name: "torzsi", game: "CS2", team: "MOUZ", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇭🇺" },
  { name: "Jimpphat", game: "CS2", team: "MOUZ", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇫🇮" },
  { name: "Brollan", game: "CS2", team: "MOUZ", mouse: "ZOWIE EC2-CW", hz: 2000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇸🇪" },
  { name: "xertioN", game: "CS2", team: "MOUZ", mouse: "ZOWIE EC1-C", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇮🇱" },
  { name: "Spinx", game: "CS2", team: "MOUZ", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇮🇱" },
  { name: "kyxsan", game: "CS2", team: "Falcons Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 8000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇲🇰" },
  { name: "TeSeS", game: "CS2", team: "Falcons Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 1600, sens: 0.5, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "kyousuke", game: "CS2", team: "Falcons Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.28, edpi: 1024, role: "Rifler", country: "🇷🇺" },
  { name: "NiKo", game: "CS2", team: "Falcons Esports", mouse: "Razer DeathAdder V4 Pro NiKo Edition", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇦" },
  { name: "m0NESY", game: "CS2", team: "Falcons Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 800, sens: 1.15, edpi: 920, role: "Sniper", country: "🇷🇺" },
  { name: "bLitz", game: "CS2", team: "The Mongolz", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇲🇳" },
  { name: "910", game: "CS2", team: "The Mongolz", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇲🇳" },
  { name: "cobra", game: "CS2", team: "The Mongolz", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇲🇳" },
  { name: "mzinho", game: "CS2", team: "The Mongolz", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇲🇳" },
  { name: "Techno4K", game: "CS2", team: "The Mongolz", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇲🇳" },
  { name: "Wicadia", game: "CS2", team: "Aurora", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.8, edpi: 1440, role: "Rifler", country: "🇹🇷" },
  { name: "jottAAA", game: "CS2", team: "Aurora", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 3.4, edpi: 1360, role: "Rifler", country: "🇹🇷" },
  { name: "woxic", game: "CS2", team: "Aurora", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 1, edpi: 1600, role: "Sniper", country: "🇹🇷" },
  { name: "XANTARES", game: "CS2", team: "Aurora", mouse: "ZOWIE FK1-C", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇹🇷" },
  { name: "Soulfly", game: "CS2", team: "Aurora", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇹🇷" },
  { name: "MAJ3R", game: "CS2", team: "Aurora", mouse: "Logitech G Pro X Superlight 2", hz: 500, dpi: 800, sens: 1.59, edpi: 1270, role: "Rifler", country: "🇹🇷" },
  { name: "Aleksib", game: "CS2", team: "Natus Vincere", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.06, edpi: 848, role: "Rifler", country: "🇫🇮" },
  { name: "b1t", game: "CS2", team: "Natus Vincere", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.65, edpi: 660, role: "Rifler", country: "🇺🇦" },
  { name: "w0nderful", game: "CS2", team: "Natus Vincere", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 400, sens: 2.6, edpi: 1040, role: "Sniper", country: "🇺🇦" },
  { name: "makazze", game: "CS2", team: "Natus Vincere", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.28, edpi: 1024, role: "Rifler", country: "🇽🇰" },
  { name: "iM", game: "CS2", team: "Natus Vincere", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇷🇴" },
  { name: "matys", game: "CS2", team: "G2 Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.82, edpi: 656, role: "Rifler", country: "🇸🇰" },
  { name: "HeavyGod", game: "CS2", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 3.1, edpi: 1240, role: "Rifler", country: "🇮🇱" },
  { name: "malbsMd", game: "CS2", team: "G2 Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇬🇹" },
  { name: "huNter", game: "CS2", team: "G2 Esports", mouse: "ZOWIE EC2-DW Glossy", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇧🇦" },
  { name: "SunPayus", game: "CS2", team: "G2 Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 400, sens: 1.8, edpi: 720, role: "Sniper", country: "🇪🇸" },
  { name: "sl3nd", game: "CS2", team: "GamerLegion", mouse: "VAXEE XE Wireless", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Sniper", country: "🇭🇺" },
  { name: "Kursy", game: "CS2", team: "GamerLegion", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇫🇷" },
  { name: "hypex", game: "CS2", team: "GamerLegion", mouse: "DAREU AE6 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "ztr", game: "CS2", team: "GamerLegion", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 1.55, edpi: 620, role: "Rifler", country: "🇸🇪" },
  { name: "REZ", game: "CS2", team: "GamerLegion", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 0.95, edpi: 760, role: "Rifler", country: "🇸🇪" },
  { name: "PR", game: "CS2", team: "GamerLegion", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇨🇿" },
  { name: "Tauson", game: "CS2", team: "GamerLegion", mouse: "VAXEE E1 Wireless Fluorescent", hz: 4000, dpi: 400, sens: 1.75, edpi: 700, role: "Rifler", country: "🇩🇰" },
  { name: "Snax", game: "CS2", team: "GamerLegion", mouse: "ZOWIE FK2-DW", hz: 4000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇵🇱" },
  { name: "NAF", game: "CS2", team: "Team Liquid", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇨🇦" },
  { name: "ultimate", game: "CS2", team: "Team Liquid", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.95, edpi: 760, role: "Sniper", country: "🇵🇱" },
  { name: "EliGE", game: "CS2", team: "Team Liquid", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 1600, sens: 0.74, edpi: 1184, role: "Rifler", country: "🇺🇸" },
  { name: "siuhy", game: "CS2", team: "Team Liquid", mouse: "ZOWIE EC2-DW", hz: 4000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇵🇱" },
  { name: "Nertz", game: "CS2", team: "Team Liquid", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇮🇱" },
  { name: "olofmeister", game: "CS2", team: "FaZe Clan", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇸🇪" },
  { name: "Frozen", game: "CS2", team: "FaZe Clan", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇸🇰" },
  { name: "jcobbb", game: "CS2", team: "FaZe Clan", mouse: "Corsair Sabre V2 Pro CF", hz: 1000, dpi: 800, sens: 1.17, edpi: 936, role: "Rifler", country: "🇵🇱" },
  { name: "karrigan", game: "CS2", team: "FaZe Clan", mouse: "Corsair Sabre v2 Pro", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇩🇰" },
  { name: "Twistzz", game: "CS2", team: "FaZe Clan", mouse: "Endgame Gear XM2w 4k v2", hz: 4000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇨🇦" },
  { name: "broky", game: "CS2", team: "FaZe Clan", mouse: "WLMouse Beast X Max", hz: 8000, dpi: 400, sens: 2.57, edpi: 1028, role: "Sniper", country: "🇱🇻" },
  { name: "nilo", game: "CS2", team: "HEROIC", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇸🇪" },
  { name: "alkarenn", game: "CS2", team: "HEROIC", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 600, sens: 1.2, edpi: 720, role: "Sniper", country: "🇰🇿" },
  { name: "xfl0ud", game: "CS2", team: "HEROIC", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 1.16, edpi: 928, role: "Rifler", country: "🇹🇷" },
  { name: "Chr1zN", game: "CS2", team: "HEROIC", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.83, edpi: 664, role: "Rifler", country: "🇩🇰" },
  { name: "susp", game: "CS2", team: "HEROIC", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.55, edpi: 440, role: "Rifler", country: "🇸🇪" },
  { name: "yxngstxr", game: "CS2", team: "HEROIC", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 1.16, edpi: 928, role: "Rifler", country: "🇸🇪" },
  { name: "fame", game: "CS2", team: "Virtus.pro", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "FL1T", game: "CS2", team: "Virtus.pro", mouse: "Logitech G Pro X Superlight 2", hz: 8000, dpi: 1600, sens: 0.42, edpi: 680, role: "Rifler", country: "🇷🇺" },
  { name: "b1st", game: "CS2", team: "Virtus.pro", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.47, edpi: 1176, role: "Rifler", country: "🇷🇺" },
  { name: "tO0RO", game: "CS2", team: "Virtus.pro", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 500, sens: 2.3, edpi: 1150, role: "Rifler", country: "🇷🇺" },
  { name: "Perfecto", game: "CS2", team: "Virtus.pro", mouse: "Waizowl OGM Cloud 8K", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇷🇺" },
  { name: "Staehr", game: "CS2", team: "Astralis", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "jabbi", game: "CS2", team: "Astralis", mouse: "ZOWIE EC2-DW Glossy", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇩🇰" },
  { name: "phzy", game: "CS2", team: "Astralis", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇸🇪" },
  { name: "ryu", game: "CS2", team: "Astralis", mouse: "Razer Deathadder V3 Pro", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇱🇹" },
  { name: "HooXi", game: "CS2", team: "Astralis", mouse: "Razer Viper V4 Pro", hz: 2000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇩🇰" },
  { name: "FalleN", game: "CS2", team: "FURIA", mouse: "Fallen Gear Lobo Wireless", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Sniper", country: "🇧🇷" },
  { name: "YEKINDAR", game: "CS2", team: "FURIA", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇱🇻" },
  { name: "kscerato", game: "CS2", team: "FURIA", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 400, sens: 3, edpi: 1200, role: "Rifler", country: "🇧🇷" },
  { name: "yuurih", game: "CS2", team: "FURIA", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇧🇷" },
  { name: "molodoy", game: "CS2", team: "FURIA", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇰🇿" },
  { name: "Graviti", game: "CS2", team: "3DMAX", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1.36, edpi: 1088, role: "Rifler", country: "🇫🇷" },
  { name: "Ex3rcice", game: "CS2", team: "3DMAX", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇫🇷" },
  { name: "Maka", game: "CS2", team: "3DMAX", mouse: "HITSCAN Hyperlight", hz: 8000, dpi: 800, sens: 1.32, edpi: 1058, role: "Sniper", country: "🇫🇷" },
  { name: "Lucky", game: "CS2", team: "3DMAX", mouse: "ZOWIE U2-DW", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇫🇷" },
  { name: "bodyy", game: "CS2", team: "3DMAX", mouse: "Pulsar eS FS-1", hz: 2000, dpi: 400, sens: 2.7, edpi: 1080, role: "Rifler", country: "🇫🇷" },
  { name: "saffee", game: "CS2", team: "MIBR", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇧🇷" },
  { name: "brnz4n", game: "CS2", team: "MIBR", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.69, edpi: 676, role: "Rifler", country: "🇧🇷" },
  { name: "kl1m", game: "CS2", team: "MIBR", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇷🇺" },
  { name: "insani", game: "CS2", team: "MIBR", mouse: "ZOWIE U2-DW", hz: 4000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "LNZ", game: "CS2", team: "MIBR", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.79, edpi: 716, role: "Rifler", country: "🇸🇪" },
  { name: "venomzera", game: "CS2", team: "MIBR", mouse: "VAXEE XE-S Wireless", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇧🇷" },
  { name: "alex666", game: "CS2", team: "B8 Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇺🇦" },
  { name: "headtr1ck", game: "CS2", team: "B8 Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Sniper", country: "🇺🇦" },
  { name: "npl", game: "CS2", team: "B8 Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇺🇦" },
  { name: "kensizor", game: "CS2", team: "B8 Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.65, edpi: 520, role: "Rifler", country: "🇺🇦" },
  { name: "esenthial", game: "CS2", team: "B8 Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇺🇦" },
  { name: "ewjerkz", game: "CS2", team: "Ninjas in Pyjamas", mouse: "ZOWIE ZA13-DW", hz: 1000, dpi: 400, sens: 1.65, edpi: 660, role: "Rifler", country: "🇵🇹" },
  { name: "sjuush", game: "CS2", team: "Ninjas in Pyjamas", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 1.11, edpi: 888, role: "Rifler", country: "🇩🇰" },
  { name: "Snappi", game: "CS2", team: "Ninjas in Pyjamas", mouse: "ZOWIE EC2-DW Glossy", hz: 4000, dpi: 400, sens: 1.95, edpi: 780, role: "Rifler", country: "🇩🇰" },
  { name: "xKacpersky", game: "CS2", team: "Ninjas in Pyjamas", mouse: "Lamzu Maya X", hz: 1000, dpi: 400, sens: 1.83, edpi: 732, role: "Rifler", country: "🇵🇱" },
  { name: "cairne", game: "CS2", team: "Ninjas in Pyjamas", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.65, edpi: 660, role: "Rifler", country: "🇺🇦" },
  { name: "r1nkle", game: "CS2", team: "Ninjas in Pyjamas", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.33, edpi: 1064, role: "Rifler", country: "🇺🇦" },
  { name: "n1ssim", game: "CS2", team: "Legacy", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 400, sens: 1.77, edpi: 708, role: "Rifler", country: "🇧🇷" },
  { name: "dumau", game: "CS2", team: "Legacy", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "saadzin", game: "CS2", team: "Legacy", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 1600, sens: 0.9, edpi: 1440, role: "Rifler", country: "🇧🇷" },
  { name: "lux", game: "CS2", team: "Legacy", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 1.92, edpi: 768, role: "Rifler", country: "🇧🇷" },
  { name: "latto", game: "CS2", team: "Legacy", mouse: "ZOWIE EC2-DW Glossy", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "snow", game: "CS2", team: "paiN Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇧🇷" },
  { name: "dav1deuS", game: "CS2", team: "paiN Gaming", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 3.06, edpi: 1224, role: "Rifler", country: "🇨🇱" },
  { name: "nqz", game: "CS2", team: "paiN Gaming", mouse: "ZOWIE U2-DW", hz: 2000, dpi: 800, sens: 1.2, edpi: 960, role: "Sniper", country: "🇧🇷" },
  { name: "biguzera", game: "CS2", team: "paiN Gaming", mouse: "ZOWIE EC1-DW", hz: 1000, dpi: 400, sens: 1.75, edpi: 700, role: "Rifler", country: "🇧🇷" },
  { name: "vsm", game: "CS2", team: "paiN Gaming", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇧🇷" },
  { name: "piriajr", game: "CS2", team: "paiN Gaming", mouse: "VAXEE XE V2", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "Rifler", country: "🇧🇷" },
  { name: "Jee", game: "CS2", team: "TyLoo", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇨🇳" },
  { name: "Mercury", game: "CS2", team: "TyLoo", mouse: "ZOWIE S2-DW", hz: 1000, dpi: 400, sens: 2.12, edpi: 848, role: "Rifler", country: "🇨🇳" },
  { name: "Moseyuh", game: "CS2", team: "TyLoo", mouse: "ZOWIE S2-DW Glossy", hz: 1000, dpi: 800, sens: 1.27, edpi: 1016, role: "Rifler", country: "🇨🇳" },
  { name: "JamYoung", game: "CS2", team: "TyLoo", mouse: "VAXEE XE V2 Lake", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇨🇳" },
  { name: "DANK1NG", game: "CS2", team: "TyLoo", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇨🇳" },
  { name: "Westmelon", game: "CS2", team: "Lynn Vision", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇨🇳" },
  { name: "C4LLM3SU3", game: "CS2", team: "Lynn Vision", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇨🇳" },
  { name: "Starry", game: "CS2", team: "Lynn Vision", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇨🇳" },
  { name: "EmiliaQAQ", game: "CS2", team: "Lynn Vision", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇨🇳" },
  { name: "z4kr", game: "CS2", team: "Lynn Vision", mouse: "ZOWIE U2-DW Glossy", hz: 4000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇨🇳" },
  { name: "JDC", game: "CS2", team: "BIG", mouse: "ZOWIE FK2-DW", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇩🇪" },
  { name: "prosus", game: "CS2", team: "BIG", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.15, edpi: 860, role: "Rifler", country: "🇩🇪" },
  { name: "gr1ks", game: "CS2", team: "BIG", mouse: "Logitech G Pro X Superlight 2", hz: 8000, dpi: 1000, sens: 0.8, edpi: 800, role: "Rifler", country: "🇧🇾" },
  { name: "blameF", game: "CS2", team: "BIG", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇩🇰" },
  { name: "faveN", game: "CS2", team: "BIG", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇩🇪" },
  { name: "tabseN", game: "CS2", team: "BIG", mouse: "WLMouse BEAST X Mini Magnesium", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇩🇪" },
  { name: "Krimbo", game: "CS2", team: "BIG", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇩🇪" },
  { name: "fr3nd", game: "CS2", team: "Wildcard Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Sniper", country: "🇵🇱" },
  { name: "Peeping", game: "CS2", team: "Wildcard Gaming", mouse: "Pulsar X2 CrazyLight", hz: 2000, dpi: 1600, sens: 0.82, edpi: 1320, role: "Rifler", country: "🇺🇸" },
  { name: "reck", game: "CS2", team: "Wildcard Gaming", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 400, sens: 3.5, edpi: 1400, role: "Rifler", country: "🇺🇸" },
  { name: "HexT", game: "CS2", team: "Wildcard Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇨🇦" },
  { name: "Vexite", game: "CS2", team: "FlyQuest", mouse: "ZOWIE EC2-DW Glossy", hz: 1000, dpi: 800, sens: 1.24, edpi: 992, role: "Rifler", country: "🇦🇺" },
  { name: "INS", game: "CS2", team: "FlyQuest", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇦🇺" },
  { name: "nettik", game: "CS2", team: "FlyQuest", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇳🇿" },
  { name: "jks", game: "CS2", team: "FlyQuest", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 1.85, edpi: 740, role: "Rifler", country: "🇦🇺" },
  { name: "regali", game: "CS2", team: "FlyQuest", mouse: "Logitech G Pro X Superlight 2 SE", hz: 4000, dpi: 400, sens: 3.09, edpi: 1236, role: "Sniper", country: "🇷🇴" },
  { name: "story", game: "CS2", team: "FlyQuest", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.75, edpi: 1100, role: "Sniper", country: "🇵🇹" },
  { name: "Ax1Le", game: "CS2", team: "BetBoom Team", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇷🇺" },
  { name: "s1ren", game: "CS2", team: "BetBoom Team", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇷🇺" },
  { name: "Artfr0st", game: "CS2", team: "BetBoom Team", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.49, edpi: 1192, role: "Sniper", country: "🇷🇺" },
  { name: "Magnojez", game: "CS2", team: "BetBoom Team", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "d1Ledez", game: "CS2", team: "BetBoom Team", mouse: "VAXEE XE Wireless Yellow", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇷🇺" },
  { name: "Boombl4", game: "CS2", team: "BetBoom Team", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇷🇺" },
  { name: "zorte", game: "CS2", team: "BetBoom Team", mouse: "Pulsar Xlite V3 Size 2", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Sniper", country: "🇷🇺" },
  { name: "1eer", game: "CS2", team: "Nemiga Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇧🇾" },
  { name: "riskyb0b", game: "CS2", team: "Nemiga Gaming", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1.05, edpi: 840, role: "Rifler", country: "🇷🇺" },
  { name: "khaN", game: "CS2", team: "Nemiga Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Sniper", country: "🇰🇿" },
  { name: "sowalio", game: "CS2", team: "Nemiga Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇷🇺" },
  { name: "Xant3r", game: "CS2", team: "Nemiga Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "Rifler", country: "🇷🇺" },
  { name: "KaiR0N-", game: "CS2", team: "Nemiga Gaming", mouse: "ZOWIE S2-DW", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇷🇺" },
  { name: "SYPH0", game: "CS2", team: "Nemiga Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇰🇿" },
  { name: "shalfey", game: "CS2", team: "Nemiga Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.01, edpi: 804, role: "Rifler", country: "🇷🇺" },
  { name: "Nexius", game: "CS2", team: "OG Esports", mouse: "Logitech G Pro X Superlight", hz: 4000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇧🇪" },
  { name: "spooke", game: "CS2", team: "OG Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇸🇪" },
  { name: "cadiaN", game: "CS2", team: "OG Esports", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.3, edpi: 920, role: "Sniper", country: "🇩🇰" },
  { name: "FL4MUS", game: "CS2", team: "OG Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.35, edpi: 1080, role: "Rifler", country: "🇷🇺" },
  { name: "arrozdoce", game: "CS2", team: "OG Esports", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇵🇹" },
  { name: "adamb", game: "CS2", team: "OG Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇸🇪" },
  { name: "Lake", game: "CS2", team: "M80", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇺🇸" },
  { name: "slaxz-", game: "CS2", team: "M80", mouse: "Finalmouse Ultralight X Prophecy Clix Small", hz: 2000, dpi: 800, sens: 0.95, edpi: 760, role: "Sniper", country: "🇩🇪" },
  { name: "dephh", game: "CS2", team: "M80", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 450, sens: 2, edpi: 900, role: "Rifler", country: "🇬🇧" },
  { name: "Swisher", game: "CS2", team: "M80", mouse: "VAXEE XE V2 Lake", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇺🇸" },
  { name: "s1n", game: "CS2", team: "M80", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇩🇪" },
  { name: "JBa", game: "CS2", team: "M80", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇺🇸" },
  { name: "autimatic", game: "CS2", team: "NRG", mouse: "Razer Deathadder V3 Pro", hz: 2000, dpi: 800, sens: 1.12, edpi: 900, role: "Rifler", country: "🇺🇸" },
  { name: "nosraC", game: "CS2", team: "NRG", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.6, edpi: 540, role: "Rifler", country: "🇺🇸" },
  { name: "Sonic", game: "CS2", team: "NRG", mouse: "Lamzu Maya X Purple Shadow", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇿🇦" },
  { name: "Jeorge", game: "CS2", team: "NRG", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇺🇸" },
  { name: "nitr0", game: "CS2", team: "NRG", mouse: "Logitech G Pro X Superlight 2", hz: 500, dpi: 800, sens: 1.05, edpi: 840, role: "Rifler", country: "🇺🇸" },
  { name: "br0", game: "CS2", team: "NRG", mouse: "Pulsar ZywOo The Chosen Mouse", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇩🇰" },
  { name: "oSee", game: "CS2", team: "NRG", mouse: "Pulsar ZywOo The Chosen Mouse", hz: 2000, dpi: 1600, sens: 0.57, edpi: 920, role: "Sniper", country: "🇺🇸" },
  { name: "Neityu", game: "CS2", team: "ENCE", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇫🇷" },
  { name: "podi", game: "CS2", team: "ENCE", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.23, edpi: 980, role: "Sniper", country: "🇫🇮" },
  { name: "sdy", game: "CS2", team: "ENCE", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇺🇦" },
  { name: "kRaSnaL", game: "CS2", team: "ENCE", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.82, edpi: 728, role: "Rifler", country: "🇵🇱" },
  { name: "F1KU", game: "CS2", team: "ENCE", mouse: "ZOWIE EC1-CW", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇵🇱" },
  { name: "WOOD7", game: "CS2", team: "ODDIK", mouse: "ZOWIE EC2-CW", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇧🇷" },
  { name: "ksloks", game: "CS2", team: "ODDIK", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "pancc", game: "CS2", team: "ODDIK", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "naitte", game: "CS2", team: "ODDIK", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.7, edpi: 1360, role: "Rifler", country: "🇧🇷" },
  { name: "coldzera", game: "CS2", team: "ODDIK", mouse: "ZOWIE ZA13-DW", hz: 2000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "togs", game: "CS2", team: "ODDIK", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.26, edpi: 504, role: "Rifler", country: "🇧🇷" },
  { name: "matios", game: "CS2", team: "ODDIK", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 400, sens: 1.51, edpi: 604, role: "Rifler", country: "🇧🇷" },
  { name: "mizu", game: "CS2", team: "HOTU", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇷🇺" },
  { name: "n0rb3r7", game: "CS2", team: "HOTU", mouse: "Lamzu Maya X", hz: 2000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇦🇲" },
  { name: "wastzera", game: "CS2", team: "Imperial Esports", mouse: "Fallen Gear Pantera Pro Wireless Preto", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "Shr", game: "CS2", team: "Imperial Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇵🇹" },
  { name: "VINI", game: "CS2", team: "Imperial Esports", mouse: "Endgame Gear OP1 8k", hz: 1000, dpi: 800, sens: 0.95, edpi: 764, role: "Rifler", country: "🇧🇷" },
  { name: "chelo", game: "CS2", team: "Imperial Esports", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 400, sens: 4, edpi: 1600, role: "Rifler", country: "🇧🇷" },
  { name: "noway", game: "CS2", team: "Imperial Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "skullz", game: "CS2", team: "Imperial Esports", mouse: "ZOWIE U2-DW", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "ROUX", game: "CS2", team: "Chinggis Warriors", mouse: "Logitech G Pro Gaming Mouse", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇲🇳" },
  { name: "cool4st", game: "CS2", team: "Chinggis Warriors", mouse: "ZOWIE EC2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇲🇳" },
  { name: "rmn", game: "CS2", team: "SAW", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.28, edpi: 512, role: "Rifler", country: "🇵🇹" },
  { name: "Fazery", game: "CS2", team: "Natus Vincere Jr.", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇨🇿" },
  { name: "kodak", game: "CS2", team: "Natus Vincere Jr.", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.3, edpi: 520, role: "Rifler", country: "🇺🇦" },
  { name: "arT", game: "CS2", team: "Fluxo", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 800, sens: 2.55, edpi: 2040, role: "Rifler", country: "🇧🇷" },
  { name: "zevy", game: "CS2", team: "Fluxo", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.6, edpi: 1280, role: "Sniper", country: "🇧🇷" },
  { name: "Lucaozy", game: "CS2", team: "Fluxo", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "kye", game: "CS2", team: "Fluxo", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.89, edpi: 708, role: "Rifler", country: "🇧🇷" },
  { name: "mlhzin", game: "CS2", team: "Fluxo", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.23, edpi: 984, role: "Rifler", country: "🇧🇷" },
  { name: "decenty", game: "CS2", team: "Fluxo", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇧🇷" },
  { name: "exit", game: "CS2", team: "Fluxo", mouse: "VAXEE ZYGEN NP-01S Wireless", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "Buzz", game: "CS2", team: "ECSTATIC", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇩🇰" },
  { name: "nut nut", game: "CS2", team: "ECSTATIC", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇩🇰" },
  { name: "TMB", game: "CS2", team: "ECSTATIC", mouse: "ZOWIE EC3-C", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇩🇰" },
  { name: "nicoodoz", game: "CS2", team: "ECSTATIC", mouse: "Lamzu Maya", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Sniper", country: "🇩🇰" },
  { name: "Anlelele", game: "CS2", team: "ECSTATIC", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.35, edpi: 1080, role: "Rifler", country: "🇩🇰" },
  { name: "Kjaerbye", game: "CS2", team: "JiJieHao", mouse: "SteelSeries Aerox 3 Wireless", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇩🇰" },
  { name: "dennyslaw", game: "CS2", team: "JiJieHao", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇧🇬" },
  { name: "BOROS", game: "CS2", team: "JiJieHao", mouse: "ZOWIE S2-C", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇯🇴" },
  { name: "Bibu", game: "CS2", team: "JiJieHao", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2.45, edpi: 980, role: "Rifler", country: "🇮🇶" },
  { name: "Grim", game: "CS2", team: "Passion UA", mouse: "VAXEE XE V2", hz: 2000, dpi: 800, sens: 0.72, edpi: 576, role: "Rifler", country: "🇺🇸" },
  { name: "JT", game: "CS2", team: "Passion UA", mouse: "ZOWIE EC3-DW Glossy", hz: 1000, dpi: 400, sens: 2.8, edpi: 1120, role: "Rifler", country: "🇿🇦" },
  { name: "hallzerk", game: "CS2", team: "Passion UA", mouse: "VAXEE E1 Wireless", hz: 4000, dpi: 400, sens: 2.5, edpi: 1000, role: "Sniper", country: "🇳🇴" },
  { name: "nicx", game: "CS2", team: "Passion UA", mouse: "Logitech G300S", hz: 1000, dpi: 1000, sens: 1.4, edpi: 1400, role: "Rifler", country: "🇺🇸" },
  { name: "Kvem", game: "CS2", team: "Passion UA", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 3, edpi: 1200, role: "Rifler", country: "🇺🇦" },
  { name: "Senzu", game: "CS2", team: "Passion UA", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 2000, dpi: 400, sens: 3, edpi: 1200, role: "Rifler", country: "🇲🇳" },
  { name: "try", game: "CS2", team: "Passion UA", mouse: "WLMOUSE HUAN MA-GIC", hz: 2000, dpi: 400, sens: 2.91, edpi: 1164, role: "Sniper", country: "🇦🇷" },
  { name: "BELCHONOKK", game: "CS2", team: "PARIVISION", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "Jame", game: "CS2", team: "PARIVISION", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 3200, sens: 0.3, edpi: 960, role: "Sniper", country: "🇷🇺" },
  { name: "nota", game: "CS2", team: "PARIVISION", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.95, edpi: 760, role: "Rifler", country: "🇷🇺" },
  { name: "Qikert", game: "CS2", team: "PARIVISION", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇰🇿" },
  { name: "xiELO", game: "CS2", team: "PARIVISION", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇷🇺" },
  { name: "zweih", game: "CS2", team: "PARIVISION", mouse: "Pulsar eS FS-1", hz: 1000, dpi: 800, sens: 1.28, edpi: 1024, role: "Rifler", country: "🇷🇺" },
  { name: "jackasmo", game: "CS2", team: "Fnatic", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇺🇦" },
  { name: "KRIMZ", game: "CS2", team: "Fnatic", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇸🇪" },
  { name: "jambo", game: "CS2", team: "Fnatic", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇺🇦" },
  { name: "fear", game: "CS2", team: "Fnatic", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.35, edpi: 540, role: "Rifler", country: "🇺🇦" },
  { name: "maden", game: "CS2", team: "Fnatic", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 4000, dpi: 800, sens: 2, edpi: 1600, role: "Rifler", country: "🇲🇪" },
  { name: "Mokuj1n", game: "CS2", team: "Team Spirit Academy", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇷🇺" },
  { name: "robo", game: "CS2", team: "Team Spirit Academy", mouse: "", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Rifler", country: "🇷🇺" },
  { name: "L1haNg", game: "CS2", team: "Rare Atom", mouse: "Wooting 80HE", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇨🇳" },
  { name: "somebody", game: "CS2", team: "Rare Atom", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.25, edpi: 900, role: "Rifler", country: "🇨🇳" },
  { name: "Kaze", game: "CS2", team: "Rare Atom", mouse: "Pulsar Xlite V4 Es", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇲🇾" },
  { name: "ChildKing", game: "CS2", team: "Rare Atom", mouse: "Lamzu Maya", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇨🇳" },
  { name: "Summer", game: "CS2", team: "Rare Atom", mouse: "Lamzu Maya Doodle", hz: 8000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇨🇳" },
  { name: "XELLOW", game: "CS2", team: "Nexus Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇷🇴" },
  { name: "Blytz", game: "CS2", team: "Nexus Gaming", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇷🇴" },
  { name: "s0und", game: "CS2", team: "Nexus Gaming", mouse: "ZOWIE U2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇷🇴" },
  { name: "refrezh", game: "CS2", team: "9INE", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇩🇰" },
  { name: "raalz", game: "CS2", team: "9INE", mouse: "ZOWIE EC1-CW", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇩🇰" },
  { name: "cej0t", game: "CS2", team: "9INE", mouse: "Pulsar Xlite V3 Es Founder's Edition", hz: 4000, dpi: 1600, sens: 0.47, edpi: 760, role: "Rifler", country: "🇵🇱" },
  { name: "kraghen", game: "CS2", team: "9INE", mouse: "VAXEE XE V2", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "bnox", game: "CS2", team: "9INE", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇵🇱" },
  { name: "Calyx", game: "CS2", team: "Eternal Fire", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "Rifler", country: "🇹🇷" },
  { name: "imoRR", game: "CS2", team: "Eternal Fire", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Sniper", country: "🇹🇷" },
  { name: "EMSTAR", game: "CS2", team: "Eternal Fire", mouse: "Rampage Blitz Ultimate 8K", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇹🇷" },
  { name: "jresy", game: "CS2", team: "Eternal Fire", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇹🇷" },
  { name: "mASKED", game: "CS2", team: "Eternal Fire", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.61, edpi: 644, role: "Rifler", country: "🇵🇱" },
  { name: "maaryy", game: "CS2", team: "Eternal Fire", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1, edpi: 400, role: "Rifler", country: "🇵🇱" },
  { name: "rigoN", game: "CS2", team: "Eternal Fire", mouse: "Razer DeathAdder V4 Pro", hz: 8000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇨🇭" },
  { name: "Woro2k", game: "CS2", team: "Eternal Fire", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.33, edpi: 932, role: "Sniper", country: "🇺🇦" },
  { name: "DemQQ", game: "CS2", team: "Eternal Fire", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇺🇦" },
  { name: "SaMey", game: "CS2", team: "ESC Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇵🇱" },
  { name: "Markeloff", game: "CS2", team: "ESC Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 1.75, edpi: 700, role: "Rifler", country: "🇺🇦" },
  { name: "olimp", game: "CS2", team: "ESC Gaming", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 400, sens: 0.69, edpi: 276, role: "Rifler", country: "🇵🇱" },
  { name: "bajmi", game: "CS2", team: "ESC Gaming", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 1600, sens: 0.4, edpi: 640, role: "Rifler", country: "🇵🇱" },
  { name: "Grashog", game: "CS2", team: "ESC Gaming", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 1.15, edpi: 922, role: "Rifler", country: "🇧🇬" },
  { name: "moonwalk", game: "CS2", team: "ESC Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.66, edpi: 664, role: "Rifler", country: "🇵🇱" },
  { name: "nellozz", game: "CS2", team: "Preasy", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 1.51, edpi: 604, role: "Rifler", country: "🇩🇰" },
  { name: "tOPZ", game: "CS2", team: "Preasy", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.28, edpi: 1024, role: "Rifler", country: "🇩🇰" },
  { name: "Gnøffe", game: "CS2", team: "Preasy", mouse: "Endgame Gear OP1w 4K", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇩🇰" },
  { name: "Krad", game: "CS2", team: "9 Pandas", mouse: "ZOWIE U2", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "adamS", game: "CS2", team: "9z Team", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇷🇴" },
  { name: "urban0", game: "CS2", team: "9z Team", mouse: "VAXEE XE V2", hz: 1000, dpi: 500, sens: 1.55, edpi: 775, role: "Rifler", country: "🇧🇷" },
  { name: "luchov", game: "CS2", team: "9z Team", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇦🇷" },
  { name: "HUASOPEEK", game: "CS2", team: "9z Team", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.76, edpi: 608, role: "Rifler", country: "🇨🇱" },
  { name: "dgt", game: "CS2", team: "9z Team", mouse: "Pulsar Xlite V4 Es", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇺🇾" },
  { name: "max", game: "CS2", team: "9z Team", mouse: "VAXEE XE V2", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇺🇾" },
  { name: "meyern", game: "CS2", team: "9z Team", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.25, edpi: 900, role: "Rifler", country: "🇦🇷" },
  { name: "lcf", game: "CS2", team: "TropiCaos", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.82, edpi: 728, role: "Rifler", country: "🇧🇷" },
  { name: "CSO", game: "CS2", team: "TropiCaos", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.77, edpi: 708, role: "Rifler", country: "🇧🇷" },
  { name: "land1n", game: "CS2", team: "TropiCaos", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Sniper", country: "🇧🇷" },
  { name: "Zyphon", game: "CS2", team: "Sashi", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "Cabbi", game: "CS2", team: "Sashi", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇩🇰" },
  { name: "Beccie", game: "CS2", team: "Sashi", mouse: "", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇩🇰" },
  { name: "Patti", game: "CS2", team: "Sashi", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇩🇰" },
  { name: "MistR", game: "CS2", team: "Sashi", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.68, edpi: 544, role: "Rifler", country: "🇩🇰" },
  { name: "acoR", game: "CS2", team: "Sashi", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 2.02, edpi: 808, role: "Sniper", country: "🇩🇰" },
  { name: "Djoko", game: "CS2", team: "GenOne", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇫🇷" },
  { name: "misutaaa", game: "CS2", team: "GenOne", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 400, sens: 1.35, edpi: 540, role: "Rifler", country: "🇫🇷" },
  { name: "NBK-", game: "CS2", team: "GenOne", mouse: "ZOWIE S2 Divina", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇫🇷" },
  { name: "steel", game: "CS2", team: "undefined", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇨🇦" },
  { name: "Skadoodle", game: "CS2", team: "undefined", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 0.42, edpi: 672, role: "Sniper", country: "🇺🇸" },
  { name: "tomaszin", game: "CS2", team: "BESTIA", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇦🇷" },
  { name: "Noktse", game: "CS2", team: "BESTIA", mouse: "VAXEE OUTSET AX Wireless Orange", hz: 1000, dpi: 800, sens: 1.19, edpi: 952, role: "Rifler", country: "🇦🇷" },
  { name: "timo", game: "CS2", team: "BESTIA", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.52, edpi: 416, role: "Rifler", country: "🇺🇾" },
  { name: "buda", game: "CS2", team: "BESTIA", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇦🇷" },
  { name: "Dytor", game: "CS2", team: "Dynamo Eclot", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇨🇿" },
  { name: "Aaron", game: "CS2", team: "Dynamo Eclot", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇭🇺" },
  { name: "leen", game: "CS2", team: "Monte", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.23, edpi: 984, role: "Rifler", country: "🇺🇦" },
  { name: "Gizmy", game: "CS2", team: "Monte", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇬🇧" },
  { name: "afro", game: "CS2", team: "Monte", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.15, edpi: 920, role: "Sniper", country: "🇫🇷" },
  { name: "hAdji", game: "CS2", team: "Monte", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇫🇷" },
  { name: "Bymas", game: "CS2", team: "Monte", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 2000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇱🇹" },
  { name: "AZUWU", game: "CS2", team: "Monte", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇬🇧" },
  { name: "Rainwaker", game: "CS2", team: "Monte", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇧🇬" },
  { name: "dem0n", game: "CS2", team: "FUT Esports", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇺🇦" },
  { name: "cmtry", game: "CS2", team: "FUT Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Sniper", country: "🇺🇦" },
  { name: "Nivera", game: "CS2", team: "FUT Esports", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.6, edpi: 480, role: "Rifler", country: "🇧🇪" },
  { name: "dziugss", game: "CS2", team: "FUT Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇱🇹" },
  { name: "Krabeni", game: "CS2", team: "FUT Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.76, edpi: 607, role: "Rifler", country: "🇽🇰" },
  { name: "ScreaM", game: "CS2", team: "FUT Esports", mouse: "Finalmouse Ultralight X Prophecy ScreaM Classic", hz: 4000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇧🇪" },
  { name: "lauNX", game: "CS2", team: "FUT Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇷🇴" },
  { name: "h4rn", game: "CS2", team: "Pompa Team", mouse: "VAXEE ZYGEN NP-01", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Sniper", country: "🇧🇬" },
  { name: "t9rnay", game: "CS2", team: "w7m esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "Razzmo", game: "CS2", team: "Nakama", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.52, edpi: 416, role: "Rifler", country: "🇫🇷" },
  { name: "history", game: "CS2", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇧🇷" },
  { name: "kauez", game: "CS2", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇧🇷" },
  { name: "drop", game: "CS2", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇧🇷" },
  { name: "Chay", game: "CS2", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇧🇷" },
  { name: "felps", game: "CS2", team: "Gaimin Gladiators", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "HEN1", game: "CS2", team: "Gaimin Gladiators", mouse: "Pulsar Xlite V4", hz: 4000, dpi: 400, sens: 2.7, edpi: 1080, role: "Sniper", country: "🇧🇷" },
  { name: "MICHU", game: "CS2", team: "IKLA", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 800, sens: 0.54, edpi: 428, role: "Rifler", country: "🇵🇱" },
  { name: "SHiPZ", game: "CS2", team: "500", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇧🇬" },
  { name: "CYPHER", game: "CS2", team: "500", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇬🇧" },
  { name: "VLDN", game: "CS2", team: "Partizan Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇷🇸" },
  { name: "emi", game: "CS2", team: "Partizan Esports", mouse: "ZOWIE EC2-B Divina", hz: 1000, dpi: 400, sens: 1.77, edpi: 708, role: "Rifler", country: "🇷🇸" },
  { name: "c0llins", game: "CS2", team: "Partizan Esports", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇷🇸" },
  { name: "nopzy", game: "CS2", team: "Partizan Esports", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 1.35, edpi: 1080, role: "Rifler", country: "🇷🇸" },
  { name: "Kind0", game: "CS2", team: "Partizan Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.85, edpi: 740, role: "Rifler", country: "🇷🇸" },
  { name: "SLIGHT", game: "CS2", team: "BLUEJAYS", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "Sniper", country: "🇺🇸" },
  { name: "Fruitcupx", game: "CS2", team: "BLUEJAYS", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇺🇸" },
  { name: "Wolffe", game: "CS2", team: "BLUEJAYS", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇺🇸" },
  { name: "atarax1a", game: "CS2", team: "KRÜ Esports", mouse: "VAXEE ZYGEN NP-01S Wireless", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇦🇷" },
  { name: "laser", game: "CS2", team: "KRÜ Esports", mouse: "ZOWIE S1", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇦🇷" },
  { name: "deco", game: "CS2", team: "KRÜ Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.75, edpi: 600, role: "Rifler", country: "🇦🇷" },
  { name: "kNgV-", game: "CS2", team: "O PLANO", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.7, edpi: 1080, role: "Sniper", country: "🇧🇷" },
  { name: "boltz", game: "CS2", team: "O PLANO", mouse: "WLMouse BEAST X", hz: 1000, dpi: 1600, sens: 0.88, edpi: 1400, role: "Rifler", country: "🇧🇷" },
  { name: "danistzz", game: "CS2", team: "Sangal", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.79, edpi: 716, role: "Rifler", country: "🇷🇺" },
  { name: "clax", game: "CS2", team: "Sangal", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "Patsi", game: "CS2", team: "Sangal", mouse: "ZOWIE U2", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇷🇺" },
  { name: "r3salt", game: "CS2", team: "Sangal", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.25, edpi: 500, role: "Rifler", country: "🇷🇺" },
  { name: "Norwi", game: "CS2", team: "Sangal", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 400, sens: 1.2, edpi: 480, role: "Rifler", country: "🇷🇺" },
  { name: "h0kz", game: "CS2", team: "Sangal", mouse: "ATK Blazing Sky F1 Pro MAX", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇹🇷" },
  { name: "allu", game: "CS2", team: "JANO Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 3, edpi: 1200, role: "Sniper", country: "🇫🇮" },
  { name: "HENU", game: "CS2", team: "JANO Esports", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇫🇮" },
  { name: "stadodo", game: "CS2", team: "Rebels Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Sniper", country: "🇵🇹" },
  { name: "Icarus", game: "CS2", team: "Rebels Gaming", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇵🇹" },
  { name: "snapy", game: "CS2", team: "Rebels Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇵🇹" },
  { name: "NOPEEJ", game: "CS2", team: "Rebels Gaming", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇵🇹" },
  { name: "TMKj", game: "CS2", team: "Rebels Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇵🇹" },
  { name: "SHOOWTiMe", game: "CS2", team: "Corinthians", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇧🇷" },
  { name: "JOTA", game: "CS2", team: "Los Grandes", mouse: "ZOWIE EC3-CW", hz: 1000, dpi: 800, sens: 2.5, edpi: 2000, role: "Rifler", country: "🇧🇷" },
  { name: "captainMo", game: "CS2", team: "Steel Helmet", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇨🇳" },
  { name: "Gratisfaction", game: "CS2", team: "Team NKT", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.19, edpi: 950, role: "Sniper", country: "🇳🇿" },
  { name: "Enzo", game: "CS2", team: "Anonymo", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 1.72, edpi: 688, role: "Rifler", country: "🇵🇱" },
  { name: "Nami", game: "CS2", team: "Anonymo", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 1.45, edpi: 580, role: "Sniper", country: "🇵🇱" },
  { name: "darchevile", game: "CS2", team: "Anonymo", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇵🇱" },
  { name: "AdrieN", game: "CS2", team: "Anonymo", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 1600, sens: 0.5, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "yvro", game: "CS2", team: "Anonymo", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.56, edpi: 888, role: "Rifler", country: "🇵🇱" },
  { name: "Melavi", game: "CS2", team: "Anonymo", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2.3, edpi: 1120, role: "Rifler", country: "🇵🇱" },
  { name: "chudy", game: "CS2", team: "Anonymo", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇵🇱" },
  { name: "danoco", game: "CS2", team: "Keyd Stars", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇧🇷" },
  { name: "b4rtiN", game: "CS2", team: "Keyd Stars", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "lash", game: "CS2", team: "Keyd Stars", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "yepz", game: "CS2", team: "Case Esports", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇧🇷" },
  { name: "bsd", game: "CS2", team: "Case Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "Cooper", game: "CS2", team: "Mythic", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇺🇸" },
  { name: "fl0m", game: "CS2", team: "Mythic", mouse: "SteelSeries Prime Wireless", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Sniper", country: "🇺🇸" },
  { name: "Trucklover86", game: "CS2", team: "Mythic", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇺🇸" },
  { name: "dex", game: "CS2", team: "EYEBALLERS", mouse: "VAXEE ZYGEN NP-01S V2 Wireless", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇸🇪" },
  { name: "bobeksde", game: "CS2", team: "EYEBALLERS", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "maxster", game: "CS2", team: "EYEBALLERS", mouse: "ZOWIE EC1-CW", hz: 1000, dpi: 800, sens: 0.68, edpi: 544, role: "Rifler", country: "🇸🇪" },
  { name: "Ro1f", game: "CS2", team: "EYEBALLERS", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "JW", game: "CS2", team: "EYEBALLERS", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇸🇪" },
  { name: "MisteM", game: "CS2", team: "Young Ninjas", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.33, edpi: 532, role: "Rifler", country: "🇿🇦" },
  { name: "MahaR", game: "CS2", team: "Young Ninjas", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇨🇿" },
  { name: "Valde", game: "CS2", team: "Tricked Esport", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.65, edpi: 660, role: "Rifler", country: "🇩🇰" },
  { name: "Leakz", game: "CS2", team: "Tricked Esport", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇩🇰" },
  { name: "salazar", game: "CS2", team: "Tricked Esport", mouse: "Pulsar JV-X", hz: 4000, dpi: 400, sens: 2.35, edpi: 940, role: "Rifler", country: "🇩🇰" },
  { name: "Boye", game: "CS2", team: "Tricked Esport", mouse: "Sprime PM1", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇩🇰" },
  { name: "IceBerg", game: "CS2", team: "Tricked Esport", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.85, edpi: 680, role: "Rifler", country: "🇩🇰" },
  { name: "NickyB", game: "CS2", team: "Tricked Esport", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇩🇰" },
  { name: "uli", game: "CS2", team: "HAVU", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.65, edpi: 660, role: "Rifler", country: "🇫🇮" },
  { name: "xns", game: "CS2", team: "Team oNe eSports", mouse: "ZOWIE EC2-A", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇧🇷" },
  { name: "pesadelo", game: "CS2", team: "Team oNe eSports", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇧🇷" },
  { name: "HObbit", game: "CS2", team: "1WIN", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇰🇿" },
  { name: "lattykk", game: "CS2", team: "1WIN", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.9, edpi: 1440, role: "Sniper", country: "🇷🇺" },
  { name: "interz", game: "CS2", team: "1WIN", mouse: "VAXEE XE V2", hz: 4000, dpi: 800, sens: 1.4, edpi: 1120, role: "Rifler", country: "🇷🇺" },
  { name: "mirbit", game: "CS2", team: "Nordavind", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇩🇪" },
  { name: "shokz", game: "CS2", team: "Finest", mouse: "ZOWIE EC2", hz: 1000, dpi: 1600, sens: 0.43, edpi: 688, role: "Rifler", country: "🇪🇪" },
  { name: "gxx", game: "CS2", team: "Bad News Eagles", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇽🇰" },
  { name: "juanflatroo", game: "CS2", team: "Bad News Eagles", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇽🇰" },
  { name: "sinnopsyy", game: "CS2", team: "Bad News Eagles", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 3.25, edpi: 1300, role: "Rifler", country: "🇦🇱" },
  { name: "syncD", game: "CS2", team: "Wave Esports", mouse: "Pulsar Xlite v4 Mini Quiccs Edition", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇨🇿" },
  { name: "hayanh", game: "CS2", team: "Wave Esports", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇪" },
  { name: "AyeZ", game: "CS2", team: "Wave Esports", mouse: "Razer Deathadder V3 Pro", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇪" },
  { name: "miksozzz", game: "CS2", team: "Wave Esports", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2.5, edpi: 1000, role: "Sniper", country: "🇷🇸" },
  { name: "dav1g", game: "CS2", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇪🇸" },
  { name: "sausol", game: "CS2", team: "Gentle Mates", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 800, sens: 1.2, edpi: 880, role: "Rifler", country: "🇪🇸" },
  { name: "alex", game: "CS2", team: "Gentle Mates", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇪🇸" },
  { name: "mopoz", game: "CS2", team: "Gentle Mates", mouse: "ZOWIE FK1+", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇪🇸" },
  { name: "MartinezSa", game: "CS2", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇪🇸" },
  { name: "MiGHTYMAX", game: "CS2", team: "Endpoint", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇬🇧" },
  { name: "beastik", game: "CS2", team: "SINNERS Esports", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 400, sens: 1.2, edpi: 480, role: "Rifler", country: "🇨🇿" },
  { name: "SHOCK", game: "CS2", team: "SINNERS Esports", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.2, edpi: 480, role: "Rifler", country: "🇨🇿" },
  { name: "MoriiSko", game: "CS2", team: "SINNERS Esports", mouse: "VAXEE ZYGEN NP-01S V2 Wireless Deep", hz: 1000, dpi: 400, sens: 1.49, edpi: 594, role: "Rifler", country: "🇨🇿" },
  { name: "ZEDKO", game: "CS2", team: "SINNERS Esports", mouse: "VAXEE ZYGEN NP-01S V2 Wireless Deep", hz: 1000, dpi: 800, sens: 0.49, edpi: 392, role: "Rifler", country: "🇨🇿" },
  { name: "Kisserek", game: "CS2", team: "SINNERS Esports", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 400, sens: 1.42, edpi: 568, role: "Rifler", country: "🇵🇱" },
  { name: "Pepo", game: "CS2", team: "SINNERS Esports", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 1.75, edpi: 700, role: "Rifler", country: "🇸🇰" },
  { name: "stressarN", game: "CS2", team: "SINNERS Esports", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇲🇰" },
  { name: "MoDo", game: "CS2", team: "SINNERS Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇷🇴" },
  { name: "doc", game: "CS2", team: "Sharks Esports", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "PlesseN", game: "CS2", team: "Alliance", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Rifler", country: "🇸🇪" },
  { name: "MaiL09", game: "CS2", team: "Alliance", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇸🇪" },
  { name: "eraa", game: "CS2", team: "Alliance", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Sniper", country: "🇸🇪" },
  { name: "upE", game: "CS2", team: "Alliance", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇸🇪" },
  { name: "twist", game: "CS2", team: "Alliance", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "Avid", game: "CS2", team: "Alliance", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇸🇪" },
  { name: "niko", game: "CS2", team: "TSM", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 1.3, edpi: 520, role: "Rifler", country: "🇩🇰" },
  { name: "gokushima", game: "CS2", team: "forZe", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.6, edpi: 1280, role: "Sniper", country: "🇷🇺" },
  { name: "rain", game: "CS2", team: "100 Thieves", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.95, edpi: 760, role: "Rifler", country: "🇳🇴" },
  { name: "Ag1l", game: "CS2", team: "100 Thieves", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇵🇹" },
  { name: "device", game: "CS2", team: "100 Thieves", mouse: "ZOWIE EC2-DW Glossy", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇩🇰" },
  { name: "poiii", game: "CS2", team: "100 Thieves", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "sirah", game: "CS2", team: "100 Thieves", mouse: "VAXEE ZYGEN NP-01S", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇩🇰" },
  { name: "ay0k", game: "CS2", team: "MOUZ NXT", mouse: "Lamzu Atlantis OG V2 Pro Polar", hz: 1000, dpi: 400, sens: 1.43, edpi: 572, role: "Sniper", country: "🇱🇻" },
  { name: "Joey", game: "CS2", team: "MOUZ NXT", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.89, edpi: 712, role: "Rifler", country: "🇪🇸" },
  { name: "Nikodeon", game: "CS2", team: "MOUZ NXT", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.47, edpi: 757, role: "Rifler", country: "🇩🇰" },
  { name: "opdust", game: "CS2", team: "MOUZ NXT", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇵🇹" },
  { name: "xelex", game: "CS2", team: "MOUZ NXT", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇭🇺" },
  { name: "Dementor", game: "CS2", team: "AGO", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇽🇰" },
  { name: "isak", game: "CS2", team: "Metizport", mouse: "Logitech G Pro X Superlight 2", hz: 8000, dpi: 800, sens: 0.85, edpi: 684, role: "Rifler", country: "🇸🇪" },
  { name: "L00m1", game: "CS2", team: "Metizport", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇸🇪" },
  { name: "Plopski", game: "CS2", team: "Metizport", mouse: "VAXEE E1 Wireless", hz: 500, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "Dragon", game: "CS2", team: "Metizport", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇷🇸" },
  { name: "forsyy", game: "CS2", team: "Metizport", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Sniper", country: "🇨🇿" },
  { name: "Jackinho", game: "CS2", team: "Metizport", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Sniper", country: "🇸🇪" },
  { name: "ritchiE", game: "CS2", team: "Project G", mouse: "FinalMouse Starlight Pro", hz: 1000, dpi: 800, sens: 0.75, edpi: 600, role: "Rifler", country: "🇧🇪" },
  { name: "Rip", game: "CS2", team: "Fire Flux Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.6, edpi: 480, role: "Rifler", country: "🇹🇷" },
  { name: "Lobanjica", game: "CS2", team: "Unluko5", mouse: "ZOWIE EC1 Tyloo", hz: 1000, dpi: 800, sens: 1.7, edpi: 1360, role: "Rifler", country: "🇲🇪" },
  { name: "lov1kus", game: "CS2", team: "CYBERSHOKE", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇷🇺" },
  { name: "glowiing", game: "CS2", team: "CYBERSHOKE", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇷🇺" },
  { name: "FenomeN", game: "CS2", team: "CYBERSHOKE", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇧🇾" },
  { name: "notineki", game: "CS2", team: "CYBERSHOKE", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇺🇦" },
  { name: "bl1x1", game: "CS2", team: "CYBERSHOKE", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.7, edpi: 1360, role: "Rifler", country: "🇷🇺" },
  { name: "alpha", game: "CS2", team: "CYBERSHOKE", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.69, edpi: 676, role: "Rifler", country: "🇷🇺" },
  { name: "brzer", game: "CS2", team: "CEPTER", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇩🇰" },
  { name: "nafany", game: "CS2", team: "AMKAL", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇷🇺" },
  { name: "iDISBALANCE", game: "CS2", team: "AMKAL", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.35, edpi: 1080, role: "Sniper", country: "🇷🇺" },
  { name: "TRAVIS", game: "CS2", team: "AMKAL", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "sstiNiX", game: "CS2", team: "AMKAL", mouse: "Logitech G Pro X Superlight 2", hz: 500, dpi: 400, sens: 2.87, edpi: 1148, role: "Rifler", country: "🇷🇺" },
  { name: "KENSI", game: "CS2", team: "AMKAL", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "d4rty", game: "CS2", team: "Party Astronauts", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇺🇸" },
  { name: "austin", game: "CS2", team: "Party Astronauts", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 4000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇺🇸" },
  { name: "Matheos", game: "CS2", team: "Copenhagen Wolves", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 4000, dpi: 1600, sens: 0.63, edpi: 1003, role: "Rifler", country: "🇭🇷" },
  { name: "Tapewaare", game: "CS2", team: "Copenhagen Wolves", mouse: "Pulsar ZywOo The Chosen Mouse", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇳🇴" },
  { name: "Jorko", game: "CS2", team: "Copenhagen Wolves", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 1600, sens: 0.5, edpi: 800, role: "Rifler", country: "🇧🇬" },
  { name: "yAmi", game: "CS2", team: "The Huns Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇲🇳" },
  { name: "Veccil", game: "CS2", team: "The Huns Esports", mouse: "", hz: 4000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇲🇳" },
  { name: "Bart4k", game: "CS2", team: "The Huns Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇲🇳" },
  { name: "sk0R", game: "CS2", team: "The Huns Esports", mouse: "Logitech G Pro X Superlight", hz: 500, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇲🇳" },
  { name: "xerolte", game: "CS2", team: "The Huns Esports", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇲🇳" },
  { name: "nin9", game: "CS2", team: "The Huns Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Sniper", country: "🇲🇳" },
  { name: "controlez", game: "CS2", team: "The Huns Esports", mouse: "VAXEE XE V2", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇲🇳" },
  { name: "fostar", game: "CS2", team: "Permitta Esports", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇺🇦" },
  { name: "1mpala", game: "CS2", team: "V1dar Gaming", mouse: "Xtrfy M8 Frosty Purple", hz: 1000, dpi: 1600, sens: 1.57, edpi: 2512, role: "Sniper", country: "🇺🇦" },
  { name: "easy", game: "CS2", team: "GUN5", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇷🇺" },
  { name: "Annihilation", game: "CS2", team: "ATOX Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.48, edpi: 592, role: "Sniper", country: "🇲🇳" },
  { name: "kabal", game: "CS2", team: "ATOX Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇲🇳" },
  { name: "dobu", game: "CS2", team: "ATOX Esports", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2.15, edpi: 860, role: "Rifler", country: "🇲🇳" },
  { name: "Zesta", game: "CS2", team: "ATOX Esports", mouse: "", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇲🇳" },
  { name: "AccuracyTG", game: "CS2", team: "ATOX Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "Rifler", country: "🇲🇳" },
  { name: "DARE", game: "CS2", team: "Elevate", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 1.35, edpi: 1080, role: "Rifler", country: "🇺🇸" },
  { name: "adeX", game: "CS2", team: "Revenant Esports", mouse: "VAXEE NP-01S", hz: 1000, dpi: 800, sens: 1.1, edpi: 878, role: "Rifler", country: "🇷🇴" },
  { name: "Drop", game: "CS2", team: "Take Flyte", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.42, edpi: 568, role: "Rifler", country: "🇨🇦" },
  { name: "X5G7V", game: "CS2", team: "Team Space", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.05, edpi: 840, role: "Rifler", country: "🇷🇺" },
  { name: "CoJoMo", game: "CS2", team: "Perseverance Gaming", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇺🇸" },
  { name: "jkaem", game: "CS2", team: "BC.Game", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇳🇴" },
  { name: "aNdu", game: "CS2", team: "BC.Game", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇪🇪" },
  { name: "aragornN", game: "CS2", team: "BC.Game", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 8000, dpi: 400, sens: 1.35, edpi: 540, role: "Rifler", country: "🇵🇹" },
  { name: "MUTiRiS", game: "CS2", team: "BC.Game", mouse: "VAXEE E1 Wireless Fluorescent", hz: 4000, dpi: 400, sens: 2.91, edpi: 1164, role: "Rifler", country: "🇵🇹" },
  { name: "electronic", game: "CS2", team: "BC.Game", mouse: "Pulsar Xlite V4 Es", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "s1mple", game: "CS2", team: "BC.Game", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "Sniper", country: "🇺🇦" },
  { name: "krazy", game: "CS2", team: "BC.Game", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.05, edpi: 820, role: "Rifler", country: "🇵🇹" },
  { name: "honda", game: "CS2", team: "Vikings KR", mouse: "Pulsar Xlite V3 Size 2", hz: 1000, dpi: 400, sens: 1.2, edpi: 480, role: "Rifler", country: "🇧🇷" },
  { name: "kory", game: "CS2", team: "Pera Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇭🇺" },
  { name: "tAk", game: "CS2", team: "G2 Ares", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇱🇹" },
  { name: "Draken", game: "CS2", team: "Johnny Speeds", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 1.95, edpi: 780, role: "Sniper", country: "🇸🇪" },
  { name: "Sapec", game: "CS2", team: "Johnny Speeds", mouse: "VAXEE ZYGEN NP-01S", hz: 1000, dpi: 800, sens: 1.13, edpi: 904, role: "Rifler", country: "🇸🇪" },
  { name: "Svedjehed", game: "CS2", team: "Johnny Speeds", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "Lekr0", game: "CS2", team: "Johnny Speeds", mouse: "VAXEE XE V2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "jocab", game: "CS2", team: "Johnny Speeds", mouse: "Lamzu Atlantis 4K", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇸🇪" },
  { name: "bevve", game: "CS2", team: "Reason Gaming", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇬🇧" },
  { name: "POLO", game: "CS2", team: "brazylijski luz", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 1.11, edpi: 888, role: "Sniper", country: "🇵🇱" },
  { name: "virtuoso", game: "CS2", team: "brazylijski luz", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "nestee", game: "CS2", team: "500 Rush", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.03, edpi: 827, role: "Rifler", country: "🇵🇱" },
  { name: "Marix", game: "CS2", team: "FAVBET", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 1600, sens: 0.35, edpi: 560, role: "Rifler", country: "🇱🇺" },
  { name: "bondik", game: "CS2", team: "FAVBET", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 1800, sens: 2.5, edpi: 1125, role: "Rifler", country: "🇺🇦" },
  { name: "Freeman", game: "CS2", team: "Alter Ego", mouse: "ZOWIE FK1", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇭🇰" },
  { name: "tomiko", game: "CS2", team: "Alter Ego", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "BnTeT", game: "CS2", team: "Alter Ego", mouse: "SteelSeries Sensei Ten", hz: 1000, dpi: 810, sens: 1.1, edpi: 668, role: "Rifler", country: "🇮🇩" },
  { name: "ohnepixel", game: "CS2", team: "DRILLAS", mouse: "Logitech G305", hz: 1000, dpi: 1600, sens: 0.45, edpi: 720, role: "Rifler", country: "🇩🇪" },
  { name: "EspiranTo", game: "CS2", team: "9INE Academy", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇱🇹" },
  { name: "stanislaw", game: "CS2", team: "BOSS", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇨🇦" },
  { name: "FaNg", game: "CS2", team: "BOSS", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 1.06, edpi: 848, role: "Rifler", country: "🇨🇦" },
  { name: "NEOFRAG", game: "CS2", team: "UNiTY ESPORTS", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇨🇿" },
  { name: "aVN", game: "CS2", team: "Zero Tenacity", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇷🇸" },
  { name: "brutmonster", game: "CS2", team: "Zero Tenacity", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇧🇦" },
  { name: "Cjoffo", game: "CS2", team: "Zero Tenacity", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.52, edpi: 608, role: "Rifler", country: "🇲🇪" },
  { name: "simke", game: "CS2", team: "Zero Tenacity", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇧🇦" },
  { name: "nEMANHA", game: "CS2", team: "Zero Tenacity", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.95, edpi: 780, role: "Rifler", country: "🇷🇸" },
  { name: "swicher", game: "CS2", team: "Viperio", mouse: "", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇪🇪" },
  { name: "mediocrity", game: "CS2", team: "GR Gaming", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.75, edpi: 600, role: "Rifler", country: "🇷🇺" },
  { name: "weqt2", game: "CS2", team: "GR Gaming", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇷🇺" },
  { name: "SALO_MUX", game: "CS2", team: "GR Gaming", mouse: "ZOWIE EC1-A", hz: 1000, dpi: 800, sens: 1.75, edpi: 1400, role: "Rifler", country: "🇷🇺" },
  { name: "hades", game: "CS2", team: "Apogee", mouse: "VAXEE NP-01S Ergo Malt Brown", hz: 2000, dpi: 400, sens: 2.15, edpi: 860, role: "Sniper", country: "🇵🇱" },
  { name: "tried", game: "CS2", team: "WW", mouse: "WLMouse BEAST X", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Rifler", country: "🇷🇺" },
  { name: "StRoGo", game: "CS2", team: "WW", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.15, edpi: 900, role: "Rifler", country: "🇷🇺" },
  { name: "Aunkere", game: "CS2", team: "WW", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 500, sens: 2.4, edpi: 1200, role: "Rifler", country: "🇷🇺" },
  { name: "m3wsu", game: "CS2", team: "WW", mouse: "WLMouse YING", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇷🇺" },
  { name: "deko", game: "CS2", team: "WW", mouse: "Endgame Gear OP1 8k Purple", hz: 2000, dpi: 400, sens: 2.5, edpi: 1000, role: "Sniper", country: "🇷🇺" },
  { name: "Skodo", game: "CS2", team: "WOPA", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "SinK", game: "CS2", team: "WOPA", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.35, edpi: 940, role: "Rifler", country: "🇩🇰" },
  { name: "Skejs", game: "CS2", team: "WOPA", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇩🇰" },
  { name: "GA1De", game: "CS2", team: "WOPA", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "thamlike", game: "CS2", team: "WOPA", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 1.23, edpi: 984, role: "Rifler", country: "🇩🇰" },
  { name: "PKL", game: "CS2", team: "2GAME ESPORTS", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "hardzao", game: "CS2", team: "2GAME ESPORTS", mouse: "Razer Deathadder V3 Pro", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "Burmylov", game: "CS2", team: "kONO", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.13, edpi: 904, role: "Rifler", country: "🇺🇦" },
  { name: "zock", game: "CS2", team: "Bounty Hunters", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇺🇾" },
  { name: "KAISER", game: "CS2", team: "Bounty Hunters", mouse: "VAXEE OUTSET AX Wireless", hz: 1000, dpi: 800, sens: 1.52, edpi: 1216, role: "Sniper", country: "🇦🇷" },
  { name: "Tuurtle", game: "CS2", team: "Bounty Hunters", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇧🇷" },
  { name: "fREQ", game: "CS2", team: "Bounty Hunters", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇧🇷" },
  { name: "nyezin", game: "CS2", team: "Bounty Hunters", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "ninjaZ", game: "CS2", team: "Bounty Hunters", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 1600, sens: 0.62, edpi: 1000, role: "Rifler", country: "🇧🇷" },
  { name: "ponter", game: "CS2", team: "Bounty Hunters", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.35, edpi: 540, role: "Rifler", country: "🇧🇷" },
  { name: "zeRRoFIX", game: "CS2", team: "Inner Circle", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇺🇦" },
  { name: "cptkurtka023", game: "CS2", team: "Inner Circle", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇺🇦" },
  { name: "twenty3", game: "CS2", team: "Imperial fe", mouse: "VAXEE XE Wireless", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇷🇺" },
  { name: "ANa", game: "CS2", team: "Imperial fe", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇷🇴" },
  { name: "naz", game: "CS2", team: "ShindeN", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇦🇷" },
  { name: "dea", game: "CS2", team: "Getting Info", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇷🇺" },
  { name: "shane", game: "CS2", team: "Getting Info", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇺🇸" },
  { name: "neaLaN", game: "CS2", team: "Novaq", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇰🇿" },
  { name: "CRUC1AL", game: "CS2", team: "WildLotus", mouse: "ZOWIE EC2-CW", hz: 500, dpi: 400, sens: 2.5, edpi: 1000, role: "Sniper", country: "🇳🇱" },
  { name: "keis", game: "CS2", team: "QMISTRY", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇵🇱" },
  { name: "Masi", game: "CS2", team: "QMISTRY", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇵🇱" },
  { name: "flying", game: "CS2", team: "Wings Up", mouse: "ZOWIE S2", hz: 1000, dpi: 400, sens: 1.55, edpi: 620, role: "Rifler", country: "🇨🇳" },
  { name: "KWERTZZ", game: "CS2", team: "ALGO Esports", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇨🇿" },
  { name: "nukkye", game: "CS2", team: "ALGO Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇱🇹" },
  { name: "szejn", game: "CS2", team: "ALGO Esports", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 3.12, edpi: 1250, role: "Rifler", country: "🇵🇱" },
  { name: "Griller", game: "CS2", team: "ALGO Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.95, edpi: 760, role: "Rifler", country: "🇩🇰" },
  { name: "zewts", game: "CS2", team: "aimclub", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.5, edpi: 800, role: "Rifler", country: "🇷🇴" },
  { name: "Kiy0o", game: "CS2", team: "SkyFury", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.05, edpi: 840, role: "Rifler", country: "🇺🇦" },
  { name: "majky", game: "CS2", team: "SkyFury", mouse: "Wooting 80HE Frost", hz: 1000, dpi: 800, sens: 0.85, edpi: 680, role: "Rifler", country: "🇨🇿" },
  { name: "Keoz", game: "CS2", team: "The Last Resort", mouse: "VAXEE OUTSET AX Wireless Yellow", hz: 1000, dpi: 400, sens: 2.06, edpi: 824, role: "Rifler", country: "🇧🇪" },
  { name: "Vegi", game: "CS2", team: "The Last Resort", mouse: "ZOWIE XL2546K", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇵🇱" },
  { name: "b0denmaster", game: "CS2", team: "The Last Resort", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇸🇪" },
  { name: "b0RUP", game: "CS2", team: "The Last Resort", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "birdfromsky", game: "CS2", team: "The Last Resort", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 0.88, edpi: 704, role: "Rifler", country: "🇩🇰" },
  { name: "yungher", game: "CS2", team: "MIBR fe", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2.6, edpi: 1040, role: "Rifler", country: "🇧🇷" },
  { name: "GaBi", game: "CS2", team: "MIBR fe", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.73, edpi: 584, role: "Rifler", country: "🇧🇷" },
  { name: "Dani", game: "CS2", team: "MIBR fe", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.94, edpi: 752, role: "Rifler", country: "🇧🇷" },
  { name: "poppins", game: "CS2", team: "MIBR fe", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "OLGA", game: "CS2", team: "MIBR fe", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 1.94, edpi: 776, role: "Rifler", country: "🇧🇷" },
  { name: "juho", game: "CS2", team: "fish123", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇫🇮" },
  { name: "smooya", game: "CS2", team: "fish123", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Sniper", country: "🇬🇧" },
  { name: "k1to", game: "CS2", team: "AM Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇩🇪" },
  { name: "delle", game: "CS2", team: "AM Gaming", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 0.69, edpi: 552, role: "Rifler", country: "🇸🇪" },
  { name: "Altekz", game: "CS2", team: "AM Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.44, edpi: 576, role: "Rifler", country: "🇩🇰" },
  { name: "kyuubii", game: "CS2", team: "AM Gaming", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇩🇪" },
  { name: "miwo", game: "CS2", team: "foreverOrgless", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.3, edpi: 480, role: "Rifler", country: "🇲🇪" },
  { name: "innocent", game: "CS2", team: "Venom", mouse: "Lamzu Maya X", hz: 4000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇵🇱" },
  { name: "hfah", game: "CS2", team: "Venom", mouse: "", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇵🇱" },
  { name: "Qlocuu", game: "CS2", team: "Venom", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇵🇱" },
  { name: "Flayy", game: "CS2", team: "Venom", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇵🇱" },
  { name: "b1elany", game: "CS2", team: "Venom", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.4, edpi: 640, role: "Rifler", country: "🇵🇱" },
  { name: "VENO", game: "CS2", team: "Falcons Force", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 2400, sens: 0.42, edpi: 1000, role: "Rifler", country: "🇷🇸" },
  { name: "Olaie", game: "CS2", team: "Falcons Force", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 3200, sens: 0.25, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "grecu", game: "CS2", team: "Falcons Force", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇷🇴" },
  { name: "clockzi", game: "CS2", team: "Falcons Force", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇩🇰" },
  { name: "NucleonZ", game: "CS2", team: "Falcons Force", mouse: "Dark Project Novus SE", hz: 1000, dpi: 800, sens: 1.38, edpi: 1100, role: "Rifler", country: "🇲🇰" },
  { name: "vilga", game: "CS2", team: "NIP Impact", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.35, edpi: 1080, role: "Rifler", country: "🇷🇺" },
  { name: "aiM", game: "CS2", team: "NIP Impact", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1000, sens: 1, edpi: 1000, role: "Rifler", country: "🇬🇧" },
  { name: "Zana", game: "CS2", team: "NIP Impact", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.42, edpi: 1136, role: "Rifler", country: "🇵🇹" },
  { name: "Nayomy", game: "CS2", team: "NIP Impact", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.62, edpi: 496, role: "Rifler", country: "🇳🇱" },
  { name: "Qiyarah", game: "CS2", team: "NIP Impact", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇳🇱" },
  { name: "suns1de", game: "CS2", team: "888aura", mouse: "WLMouse BEAST X Purple", hz: 8000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇺🇦" },
  { name: "TOAO", game: "CS2", team: "Phantom Esports", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇵🇱" },
  { name: "DGL", game: "CS2", team: "Phantom Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Sniper", country: "🇵🇱" },
  { name: "KEi", game: "CS2", team: "Phantom Esports", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "Kylar", game: "CS2", team: "Phantom Esports", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.77, edpi: 708, role: "Rifler", country: "🇵🇱" },
  { name: "Ayteel", game: "CS2", team: "Phantom Esports", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇵🇱" },
  { name: "mynio", game: "CS2", team: "Phantom Esports", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "Kunai", game: "CS2", team: "Phantom Esports", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇵🇱" },
  { name: "stesso", game: "CS2", team: "AaB esport", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.3, edpi: 520, role: "Rifler", country: "🇩🇰" },
  { name: "Queenix", game: "CS2", team: "AaB esport", mouse: "ZOWIE EC2-DW", hz: 4000, dpi: 400, sens: 2.25, edpi: 900, role: "Rifler", country: "🇩🇰" },
  { name: "Mol011", game: "CS2", team: "AaB esport", mouse: "Logitech G Pro X Superlight", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "Viggo", game: "CS2", team: "AaB esport", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇩🇰" },
  { name: "Maze", game: "CS2", team: "AaB esport", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇩🇰" },
  { name: "bekker", game: "CS2", team: "AaB esport", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "n1Xen", game: "CS2", team: "AaB esport", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.43, edpi: 1140, role: "Rifler", country: "🇩🇰" },
  { name: "Goosebreeder", game: "CS2", team: "FlyQuest Red", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.6, edpi: 960, role: "Rifler", country: "🇨🇦" },
  { name: "nython", game: "CS2", team: "Galorys", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Sniper", country: "🇧🇷" },
  { name: "DeStiNy", game: "CS2", team: "Galorys", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "MarkE", game: "CS2", team: "Skinrave Esports", mouse: "Ninjutso Sora V2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇲🇽" },
  { name: "Cryptic", game: "CS2", team: "Skinrave Esports", mouse: "Pulsar X2 V2", hz: 1000, dpi: 1600, sens: 0.44, edpi: 708, role: "Rifler", country: "🇺🇸" },
  { name: "Walco", game: "CS2", team: "Skinrave Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.55, edpi: 560, role: "Rifler", country: "🇨🇦" },
  { name: "junior", game: "CS2", team: "Skinrave Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 3.1, edpi: 1240, role: "Sniper", country: "🇺🇸" },
  { name: "cxzi", game: "CS2", team: "Marsborne", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.75, edpi: 600, role: "Rifler", country: "🇺🇸" },
  { name: "Wolfy", game: "CS2", team: "Marsborne", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.85, edpi: 740, role: "Sniper", country: "🇸🇪" },
  { name: "motm", game: "CS2", team: "Marsborne", mouse: "VAXEE XE Yellow", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇺🇸" },
  { name: "freshie", game: "CS2", team: "SportsBetExpert", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇨🇦" },
  { name: "buster", game: "CS2", team: "ALLINNERS", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇰🇿" },
  { name: "ICY", game: "CS2", team: "ALLINNERS", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇰🇿" },
  { name: "OWNER", game: "CS2", team: "Basement Boys", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇺🇦" },
  { name: "tatazin", game: "CS2", team: "Vasco Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "mawth", game: "CS2", team: "Vasco Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "n1cks", game: "CS2", team: "Vasco Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇧🇷" },
  { name: "aliStair", game: "CS2", team: "THUNDER dOWNUNDER", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 1.9, edpi: 760, role: "Sniper", country: "🇦🇺" },
  { name: "Liazz", game: "CS2", team: "THUNDER dOWNUNDER", mouse: "ZOWIE EC2-CW", hz: 500, dpi: 800, sens: 0.95, edpi: 760, role: "Rifler", country: "🇦🇺" },
  { name: "dexter", game: "CS2", team: "THUNDER dOWNUNDER", mouse: "VAXEE OUTSET AX Wireless", hz: 4000, dpi: 1600, sens: 0.65, edpi: 1040, role: "Rifler", country: "🇦🇺" },
  { name: "Lack1", game: "CS2", team: "WHITEBIRD", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 400, sens: 1.37, edpi: 548, role: "Rifler", country: "🇰🇿" },
  { name: "NickelBack", game: "CS2", team: "WHITEBIRD", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "El1an", game: "CS2", team: "WHITEBIRD", mouse: "VAXEE NP-01S Yellow", hz: 500, dpi: 3200, sens: 0.45, edpi: 1440, role: "Sniper", country: "🇷🇺" },
  { name: "Forester", game: "CS2", team: "WHITEBIRD", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.6, edpi: 480, role: "Rifler", country: "🇷🇺" },
  { name: "Sdaim", game: "CS2", team: "Team Nemesis", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇺🇦" },
  { name: "SELLTER", game: "CS2", team: "Team Nemesis", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇷🇺" },
  { name: "synyx", game: "CS2", team: "ARCRED", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇺🇦" },
  { name: "Raijin", game: "CS2", team: "ARCRED", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇷🇺" },
  { name: "kreaz", game: "CS2", team: "Fingers Crossed", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.4, edpi: 560, role: "Rifler", country: "🇸🇪" },
  { name: "oskar", game: "CS2", team: "Fingers Crossed", mouse: "Razer DeathAdder Chroma", hz: 1000, dpi: 400, sens: 3.5, edpi: 1400, role: "Sniper", country: "🇨🇿" },
  { name: "HS", game: "CS2", team: "Prestige", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇪🇪" },
  { name: "Folke", game: "CS2", team: "Prestige", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇩🇰" },
  { name: "AmaNEk", game: "CS2", team: "MINLATE", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.55, edpi: 1240, role: "Sniper", country: "🇫🇷" },
  { name: "SBT", game: "CS2", team: "MINLATE", mouse: "VAXEE E1 Wireless", hz: 2000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇫🇷" },
  { name: "sk1tt", game: "CS2", team: "MINLATE", mouse: "VAXEE XE V2", hz: 4000, dpi: 800, sens: 0.85, edpi: 680, role: "Rifler", country: "🇵🇱" },
  { name: "ex1st", game: "CS2", team: "MINLATE", mouse: "ZOWIE EC3-DW Glossy", hz: 2000, dpi: 400, sens: 1.75, edpi: 700, role: "Rifler", country: "🇵🇱" },
  { name: "Rutk0", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.65, edpi: 1320, role: "Rifler", country: "🇸🇰" },
  { name: "hasteka", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇲🇳" },
  { name: "sLowi", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 3.2, edpi: 1280, role: "Sniper", country: "🇫🇮" },
  { name: "asran", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇵🇱" },
  { name: "amster", game: "CS2", team: "Free Agent", mouse: "ZOWIE XL2566K", hz: 1000, dpi: 800, sens: 1.35, edpi: 1080, role: "Rifler", country: "🇺🇦" },
  { name: "DD", game: "CS2", team: "Free Agent", mouse: "ZOWIE S2 Divina", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇨🇳" },
  { name: "wiz", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Sniper", country: "🇺🇸" },
  { name: "kinqie", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇷🇺" },
  { name: "Smithzz", game: "CS2", team: "Free Agent", mouse: "VAXEE OUTSET AX Yellow", hz: 1000, dpi: 400, sens: 1.88, edpi: 752, role: "Rifler", country: "🇫🇷" },
  { name: "JUGi", game: "CS2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 700, sens: 0.8, edpi: 560, role: "Rifler", country: "🇩🇰" },
  { name: "poizon", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Sniper", country: "🇧🇬" },
  { name: "leman", game: "CS2", team: "Free Agent", mouse: "ZOWIE S2 Divina", hz: 1000, dpi: 400, sens: 3, edpi: 1200, role: "Rifler", country: "🇵🇱" },
  { name: "jedqr", game: "CS2", team: "Free Agent", mouse: "ZOWIE ZA11-B", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇵🇱" },
  { name: "rox", game: "CS2", team: "Free Agent", mouse: "VAXEE ZYGEN NP-01S Glossy", hz: 1000, dpi: 800, sens: 2.2, edpi: 1760, role: "Rifler", country: "🇦🇷" },
  { name: "phaze", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇪🇬" },
  { name: "pHoonyJ", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇨🇳" },
  { name: "ROGA", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.39, edpi: 1112, role: "Rifler", country: "🇭🇷" },
  { name: "Sukker", game: "CS2", team: "Free Agent", mouse: "", hz: 1000, dpi: 400, sens: 3.05, edpi: 1220, role: "Rifler", country: "🇩🇰" },
  { name: "zehN", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇫🇮" },
  { name: "ottoNd", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.77, edpi: 708, role: "Sniper", country: "🇫🇮" },
  { name: "Airax", game: "CS2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 1.18, edpi: 940, role: "Rifler", country: "🇫🇮" },
  { name: "Dimaoneshot", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇷🇺" },
  { name: "AJTT", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇨🇿" },
  { name: "mertz", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇩🇰" },
  { name: "joel", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.1, edpi: 840, role: "Sniper", country: "🇸🇪" },
  { name: "sense", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇳🇴" },
  { name: "BøghmagiC", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇩🇰" },
  { name: "kolor", game: "CS2", team: "Free Agent", mouse: "ZOWIE S1", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Sniper", country: "🇭🇺" },
  { name: "xsepower", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 500, dpi: 400, sens: 2.2, edpi: 880, role: "Sniper", country: "🇷🇺" },
  { name: "Hatz", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇦🇺" },
  { name: "prt", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "lollipop21k", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇧🇾" },
  { name: "es3tag", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Sniper", country: "🇩🇰" },
  { name: "supra", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇪🇪" },
  { name: "0SAMAS", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 3200, sens: 1.5, edpi: 4800, role: "Rifler", country: "🇵🇸" },
  { name: "farlig", game: "CS2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇩🇰" },
  { name: "Python", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-C", hz: 1000, dpi: 400, sens: 1.15, edpi: 460, role: "Sniper", country: "🇫🇷" },
  { name: "PANIX", game: "CS2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇩🇪" },
  { name: "JUST", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇵🇹" },
  { name: "Jyo", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇪🇪" },
  { name: "pr", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.58, edpi: 632, role: "Rifler", country: "🇵🇹" },
  { name: "red", game: "CS2", team: "Free Agent", mouse: "VAXEE OUTSET AX", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇩🇪" },
  { name: "Robiin", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇸🇪" },
  { name: "mir", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Rifler", country: "🇷🇺" },
  { name: "Byali", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 4000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇵🇱" },
  { name: "shushan", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇮🇱" },
  { name: "OKOLICIOUZ", game: "CS2", team: "Free Agent", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 450, sens: 1.55, edpi: 698, role: "Rifler", country: "🇵🇱" },
  { name: "skywhywalker", game: "CS2", team: "Free Agent", mouse: "Ninjutso Sora V2", hz: 1000, dpi: 1600, sens: 1.25, edpi: 2000, role: "Rifler", country: "🇷🇺" },
  { name: "Thomas", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-C", hz: 1000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇬🇧" },
  { name: "Chawzyyy", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.68, edpi: 544, role: "Rifler", country: "🇸🇪" },
  { name: "kressy", game: "CS2", team: "Free Agent", mouse: "ZOWIE S1", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇩🇪" },
  { name: "PerX", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.85, edpi: 680, role: "Rifler", country: "🇩🇪" },
  { name: "maNkz", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇩🇰" },
  { name: "poka", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 3200, sens: 0.21, edpi: 680, role: "Rifler", country: "🇷🇺" },
  { name: "aristo", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇨🇳" },
  { name: "NEKIZ", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.6, edpi: 1040, role: "Rifler", country: "🇧🇷" },
  { name: "SHiNE", game: "CS2", team: "Free Agent", mouse: "ZOWIE S1", hz: 1000, dpi: 800, sens: 0.79, edpi: 632, role: "Rifler", country: "🇸🇪" },
  { name: "sL1m3", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.75, edpi: 600, role: "Sniper", country: "🇩🇰" },
  { name: "zAAz", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC3-DW", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇱🇧" },
  { name: "Goofy", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇵🇱" },
  { name: "HuNt3rz", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇦🇹" },
  { name: "oxygeN", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.55, edpi: 620, role: "Rifler", country: "🇧🇬" },
  { name: "SPELLAN", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "Rifler", country: "🇧🇬" },
  { name: "ANeraX", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.92, edpi: 736, role: "Rifler", country: "🇵🇱" },
  { name: "ADDICT", game: "CS2", team: "Free Agent", mouse: "VAXEE OUTSET AX Wireless", hz: 1000, dpi: 400, sens: 1.41, edpi: 564, role: "Rifler", country: "🇦🇺" },
  { name: "kwezz", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 3.09, edpi: 1236, role: "Rifler", country: "🇩🇰" },
  { name: "BluePho3nix", game: "CS2", team: "Free Agent", mouse: "ZOWIE XL2566K", hz: 4000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇮🇱" },
  { name: "AMSALEM", game: "CS2", team: "Free Agent", mouse: "Wooting 80HE Frost", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇮🇱" },
  { name: "REDSTAR", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇧🇬" },
  { name: "mantuu", game: "CS2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Sniper", country: "🇵🇱" },
  { name: "HEAP", game: "CS2", team: "Free Agent", mouse: "VAXEE ZYGEN NP-01S V2 Wireless Deep", hz: 1000, dpi: 400, sens: 1.45, edpi: 580, role: "Rifler", country: "🇸🇪" },
  { name: "Topa", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇺🇦" },
  { name: "Kyojin", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇫🇷" },
  { name: "FoG", game: "CS2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 1.2, edpi: 480, role: "Rifler", country: "🇩🇪" },
  { name: "DeathZz", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.25, edpi: 900, role: "Rifler", country: "🇪🇸" },
  { name: "fino", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇸🇰" },
  { name: "TIMhehe", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇸🇪" },
  { name: "Furlan", game: "CS2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇵🇱" },
  { name: "keiz", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.8, edpi: 920, role: "Rifler", country: "🇧🇷" },
  { name: "leo_drk", game: "CS2", team: "Free Agent", mouse: "Pulsar Xlite Wireless", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇧🇷" },
  { name: "mchk", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 2000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇵🇱" },
  { name: "Xicoz", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.7, edpi: 1120, role: "Rifler", country: "🇲🇰" },
  { name: "discoStar", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 0.75, edpi: 600, role: "Rifler", country: "🇵🇱" },
  { name: "maty", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇱🇹" },
  { name: "hazr", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇦🇺" },
  { name: "s-chilla", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇺🇦" },
  { name: "sh3nanigan", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 8000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇵🇱" },
  { name: "dycha", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2 Tyloo", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇵🇱" },
  { name: "kadziu", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "Stewie2k", game: "CS2", team: "Free Agent", mouse: "VAXEE XE V2 Lake", hz: 4000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇺🇸" },
  { name: "aidKiT", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.45, edpi: 720, role: "Sniper", country: "🇲🇰" },
  { name: "DEPRESHN", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇭🇷" },
  { name: "Brehze", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 3, edpi: 1200, role: "Rifler", country: "🇺🇸" },
  { name: "zecco", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.6, edpi: 960, role: "Rifler", country: "🇷🇸" },
  { name: "kroK", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.85, edpi: 680, role: "Rifler", country: "🇩🇰" },
  { name: "Nodios", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.51, edpi: 604, role: "Rifler", country: "🇩🇰" },
  { name: "fer", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC1-CW", hz: 1000, dpi: 400, sens: 2.1, edpi: 840, role: "Rifler", country: "🇧🇷" },
  { name: "shox", game: "CS2", team: "Free Agent", mouse: "ZOWIE S2-DW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇫🇷" },
  { name: "tudsoN", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro 2 LIGHTSPEED", hz: 4000, dpi: 1600, sens: 0.5, edpi: 800, role: "Sniper", country: "🇵🇱" },
  { name: "meztal", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.08, edpi: 432, role: "Rifler", country: "🇮🇱" },
  { name: "cJ dA K1nG", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇺🇸" },
  { name: "snav", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Rifler", country: "🇺🇸" },
  { name: "Jerry", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇷🇺" },
  { name: "Infinite", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇺🇸" },
  { name: "mwlky", game: "CS2", team: "Free Agent", mouse: "ZOWIE S2-DW", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Rifler", country: "🇵🇱" },
  { name: "flamie", game: "CS2", team: "Free Agent", mouse: "VAXEE XE-S Wireless", hz: 2000, dpi: 800, sens: 0.74, edpi: 592, role: "Rifler", country: "🇷🇺" },
  { name: "jmqa", game: "CS2", team: "Free Agent", mouse: "Lamzu Maya X", hz: 1000, dpi: 800, sens: 1.35, edpi: 1080, role: "Sniper", country: "🇷🇺" },
  { name: "sterling", game: "CS2", team: "Free Agent", mouse: "ZOWIE S2 Divina", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Sniper", country: "🇳🇿" },
  { name: "Surreal", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇬🇧" },
  { name: "almazer", game: "CS2", team: "Free Agent", mouse: "WLMouse BEAST X Mini", hz: 1000, dpi: 400, sens: 2.9, edpi: 1160, role: "Rifler", country: "🇷🇺" },
  { name: "ISSAA", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇯🇴" },
  { name: "floppy", game: "CS2", team: "Free Agent", mouse: "Lamzu Maya", hz: 8000, dpi: 1600, sens: 0.6, edpi: 960, role: "Rifler", country: "🇺🇸" },
  { name: "LUCAS1", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.2, edpi: 880, role: "Rifler", country: "🇧🇷" },
  { name: "facecrack", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC3-CW", hz: 1000, dpi: 400, sens: 1.73, edpi: 690, role: "Rifler", country: "🇷🇺" },
  { name: "Nicks", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "Jonji", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇨🇦" },
  { name: "choiv7", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇷🇸" },
  { name: "andr1x", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 1.15, edpi: 920, role: "Rifler", country: "🇷🇸" },
  { name: "sNx", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.78, edpi: 712, role: "Rifler", country: "🇵🇱" },
  { name: "awzek", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.59, edpi: 636, role: "Rifler", country: "🇬🇷" },
  { name: "baz", game: "CS2", team: "Free Agent", mouse: "Ninjutso Sora V2", hz: 1000, dpi: 800, sens: 1.18, edpi: 944, role: "Rifler", country: "🇺🇦" },
  { name: "nexa", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.25, edpi: 1000, role: "Rifler", country: "🇷🇸" },
  { name: "degster", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 2.75, edpi: 1100, role: "Sniper", country: "🇷🇺" },
  { name: "devoduvek", game: "CS2", team: "Free Agent", mouse: "VAXEE XE Wireless", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇫🇷" },
  { name: "JACKZ", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 1.66, edpi: 664, role: "Rifler", country: "🇫🇷" },
  { name: "SIXER", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 4000, dpi: 800, sens: 0.8, edpi: 640, role: "Sniper", country: "🇫🇷" },
  { name: "mhL", game: "CS2", team: "Free Agent", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Sniper", country: "🇵🇱" },
  { name: "reversive", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC1-CW", hz: 1000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇦🇷" },
  { name: "righi", game: "CS2", team: "Free Agent", mouse: "VAXEE OUTSET AX Wireless", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇦🇷" },
  { name: "XotiC", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇺🇸" },
  { name: "Magisk", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "nawwk", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 2.7, edpi: 1080, role: "Sniper", country: "🇸🇪" },
  { name: "hyped", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Sniper", country: "🇩🇪" },
  { name: "volt", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 1600, sens: 0.5, edpi: 800, role: "Rifler", country: "🇷🇴" },
  { name: "CeRq", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2 RED V2", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Sniper", country: "🇧🇬" },
  { name: "hampus", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder Elite", hz: 1000, dpi: 400, sens: 1.67, edpi: 668, role: "Rifler", country: "🇸🇪" },
  { name: "syrsoN", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 2000, dpi: 1600, sens: 0.92, edpi: 1472, role: "Sniper", country: "🇩🇪" },
  { name: "phr", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇵🇱" },
  { name: "myltsi", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇫🇮" },
  { name: "Sobol", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇵🇱" },
  { name: "rallen", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 1600, sens: 1.2, edpi: 1920, role: "Rifler", country: "🇵🇱" },
  { name: "shz", game: "CS2", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.25, edpi: 500, role: "Rifler", country: "🇧🇷" },
  { name: "Banjo", game: "CS2", team: "Free Agent", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇫🇮" },
  { name: "FinigaN", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇷🇺" },
  { name: "paz", game: "CS2", team: "Free Agent", mouse: "Pulsar Xlite V3 Es", hz: 4000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇹🇷" },
  { name: "S3NSEY", game: "CS2", team: "Free Agent", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇦🇹" },
  { name: "SENER1", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 3, edpi: 1200, role: "Rifler", country: "🇽🇰" },
  { name: "stavn", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇩🇰" },
  { name: "Luken", game: "CS2", team: "Free Agent", mouse: "VAXEE ZYGEN NP-01S Wireless", hz: 4000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇦🇷" },
  { name: "Kristou", game: "CS2", team: "Free Agent", mouse: "ZOWIE EC2-B", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇩🇰" },
  { name: "puni", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇧🇷" },
  { name: "AW", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇷🇺" },
  { name: "day0s", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 1.8, edpi: 720, role: "Sniper", country: "🇫🇷" },
  { name: "Q-Q", game: "CS2", team: "Free Agent", mouse: "ZOWIE XL2546K", hz: 1000, dpi: 800, sens: 0.9, edpi: 720, role: "Rifler", country: "🇩🇰" },
  { name: "CacaNito", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇲🇰" },
  { name: "anarkez", game: "CS2", team: "Free Agent", mouse: "Pulsar ZywOo The Chosen Mouse", hz: 1000, dpi: 500, sens: 3, edpi: 1500, role: "Sniper", country: "🇮🇱" },
  { name: "Freakazoid", game: "CS2", team: "Free Agent", mouse: "VAXEE XE V2", hz: 2000, dpi: 800, sens: 0.82, edpi: 660, role: "Rifler", country: "🇺🇸" },
  { name: "pr1metapz", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 2.4, edpi: 960, role: "Rifler", country: "🇩🇪" },
  { name: "Fessor", game: "CS2", team: "Free Agent", mouse: "Lamzu Maya X", hz: 4000, dpi: 400, sens: 1.6, edpi: 640, role: "Rifler", country: "🇩🇰" },
  { name: "STYKO", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.8, edpi: 640, role: "Rifler", country: "🇸🇰" },
  { name: "D0cC", game: "CS2", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇳🇱" },
  { name: "nocries", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇲🇳" },
  { name: "ToM223", game: "CS2", team: "Free Agent", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Rifler", country: "🇵🇱" },
  { name: "Laski", game: "CS2", team: "Content", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 0.8, edpi: 636, role: "Rifler", country: "🇺🇸" },
  { name: "JASONR", game: "CS2", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.92, edpi: 736, role: "Rifler", country: "🇨🇦" },
  { name: "n0thing", game: "CS2", team: "Content", mouse: "Logitech G100S Custom", hz: 500, dpi: 1600, sens: 0.5, edpi: 800, role: "Rifler", country: "🇺🇸" },
  { name: "hyper", game: "CS2", team: "Content", mouse: "ZOWIE EC2-DW", hz: 2000, dpi: 1600, sens: 1.22, edpi: 1952, role: "Rifler", country: "🇵🇱" },
  { name: "FlipiN", game: "CS2", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Rifler", country: "🇪🇸" },
  { name: "Thour", game: "CS2", team: "Content", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 1.7, edpi: 680, role: "Rifler", country: "🇮🇳" },
  { name: "pashaBiceps", game: "CS2", team: "Content", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇵🇱" },
  { name: "v!NCHENSO7", game: "CS2", team: "Content", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Rifler", country: "🇪🇸" },
  { name: "FURIOUSSS", game: "CS2", team: "Content", mouse: "Razer DeathAdder V4 Pro", hz: 8000, dpi: 400, sens: 2.5, edpi: 1000, role: "Rifler", country: "🇹🇷" },
  { name: "GeT_RiGhT", game: "CS2", team: "Content", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 400, sens: 2.9, edpi: 1160, role: "Rifler", country: "🇸🇪" },
  { name: "fANDER", game: "CS2", team: "Content", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 2, edpi: 800, role: "Rifler", country: "🇷🇺" },
  { name: "Znorux", game: "CS2", team: "Content", mouse: "NZXT Lift 2 Symm", hz: 1000, dpi: 1600, sens: 0.5, edpi: 800, role: "Rifler", country: "🇲🇽" },
  { name: "ErycTriceps", game: "CS2", team: "Content", mouse: "Endgame Gear XM2w 4k v2", hz: 1000, dpi: 400, sens: 1.88, edpi: 752, role: "Rifler", country: "🇱🇹" },
  { name: "jL", game: "CS2", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1, edpi: 800, role: "Rifler", country: "🇱🇹" },
  { name: "ren", game: "CS2", team: "Content", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 2000, dpi: 800, sens: 0.7, edpi: 560, role: "Rifler", country: "🇳🇴" },
  { name: "brax", game: "CS2", team: "Content", mouse: "Razer DeathAdder V3 Pro", hz: 1000, dpi: 400, sens: 1.5, edpi: 600, role: "Rifler", country: "🇺🇸" },
  { name: "f0rest", game: "CS2", team: "Content", mouse: "Xtrfy MZ1 Wireless", hz: 1000, dpi: 400, sens: 3.5, edpi: 1400, role: "Rifler", country: "🇸🇪" },
  { name: "DiMKE", game: "CS2", team: "Retired", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 1.8, edpi: 720, role: "Rifler", country: "🇷🇸" },
  // ─── APEX LEGENDS: 56 players from prosettings.net (verified Feb 2026) ───
  { name: "dooplex", game: "Apex", team: "TSM", mouse: "Logitech G303", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Fragger", country: "🇺🇸" },
  { name: "chocoTaco", game: "Apex", team: "TSM", mouse: "VAXEE XE Wireless", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Fragger", country: "🇺🇸" },
  { name: "Crylix", game: "Apex", team: "TSM", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Fragger", country: "🇯🇵" },
  { name: "Genburten", game: "Apex", team: "100 Thieves", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Fragger", country: "🇦🇺" },
  { name: "ImperialHal", game: "Apex", team: "Falcons Esports", mouse: "FinalMouse Starlight Pro", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Fragger", country: "🇺🇸" },
  { name: "Yuki", game: "Apex", team: "Alliance", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Fragger", country: "🇬🇧" },
  { name: "Hakis", game: "Apex", team: "Alliance", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 1600, sens: 0.8, edpi: 1280, role: "Fragger", country: "🇸🇪" },
  { name: "Rogue", game: "Apex", team: "Team Liquid", mouse: "Alienware Pro Wireless Gaming Mouse", hz: 1000, dpi: 400, sens: 1.9, edpi: 760, role: "Fragger", country: "🇨🇦" },
  { name: "Zer0", game: "Apex", team: "Team Liquid", mouse: "Finalmouse Ultralight X Large", hz: 1000, dpi: 1600, sens: 0.6, edpi: 960, role: "Fragger", country: "🇦🇺" },
  { name: "Lou", game: "Apex", team: "Virtus.pro", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Fragger", country: "🇺🇸" },
  { name: "YukaF", game: "Apex", team: "Fnatic", mouse: "Endgame Gear OP1w 4K", hz: 1000, dpi: 1600, sens: 0.54, edpi: 864, role: "Fragger", country: "🇯🇵" },
  { name: "Ftyan", game: "Apex", team: "PULVEREX", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Fragger", country: "🇯🇵" },
  { name: "Selly", game: "Apex", team: "Crazy Raccoon", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Fragger", country: "🇰🇷" },
  { name: "Ras", game: "Apex", team: "Crazy Raccoon", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1200, sens: 1, edpi: 1200, role: "Fragger", country: "🇰🇷" },
  { name: "lyr1c", game: "Apex", team: "XSET", mouse: "Lamzu Maya X", hz: 1000, dpi: 1600, sens: 0.6, edpi: 960, role: "Fragger", country: "🇺🇸" },
  { name: "9impulse", game: "Apex", team: "Supernova", mouse: "ZOWIE FK2-DW", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇧🇾" },
  { name: "Hardecki", game: "Apex", team: "Supernova", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇷🇺" },
  { name: "Dropped", game: "Apex", team: "Grow Gaming", mouse: "Ninjutso Sora V2", hz: 1000, dpi: 400, sens: 2.2, edpi: 880, role: "Fragger", country: "🇺🇸" },
  { name: "Senoxe", game: "Apex", team: "Free Agent", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇨🇦" },
  { name: "xaniya", game: "Apex", team: "Free Agent", mouse: "G-Wolves Hati S+ 4K", hz: 1000, dpi: 1600, sens: 0.7, edpi: 1120, role: "Fragger", country: "🇷🇺" },
  { name: "ParkHa", game: "Apex", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 2.5, edpi: 1000, role: "Fragger", country: "🇰🇷" },
  { name: "Roieee", game: "Apex", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 400, sens: 2.8, edpi: 1120, role: "Fragger", country: "🇹🇼" },
  { name: "Shiv", game: "Apex", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Fragger", country: "🇬🇧" },
  { name: "Crust", game: "Apex", team: "Free Agent", mouse: "Finalmouse Starlight-12 Hades", hz: 1000, dpi: 400, sens: 2.3, edpi: 920, role: "Fragger", country: "🇨🇦" },
  { name: "Reps", game: "Apex", team: "Free Agent", mouse: "Logitech G305", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "Fragger", country: "🇺🇸" },
  { name: "ojrein", game: "Apex", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.8, edpi: 1440, role: "Fragger", country: "🇷🇺" },
  { name: "ChaoticMuch", game: "Apex", team: "Free Agent", mouse: "Logitech G502 X", hz: 1000, dpi: 2850, sens: 2.75, edpi: 7838, role: "Fragger", country: "🇬🇧" },
  { name: "Albralelie", game: "Apex", team: "Free Agent", mouse: "HITSCAN Hyperlight", hz: 8000, dpi: 800, sens: 1.4, edpi: 1120, role: "Fragger", country: "🇺🇸" },
  { name: "ZachMazer", game: "Apex", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.9, edpi: 1520, role: "Fragger", country: "🇺🇸" },
  { name: "Patiphan", game: "Apex", team: "Free Agent", mouse: "Endgame Gear XM1R", hz: 1000, dpi: 1400, sens: 0.75, edpi: 1050, role: "Fragger", country: "🇹🇭" },
  { name: "Nocturnal", game: "Apex", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "Fragger", country: "🇺🇸" },
  { name: "SkittleCakes", game: "Apex", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 1600, sens: 2.7, edpi: 4320, role: "Fragger", country: "🇺🇸" },
  { name: "esdesu", game: "Apex", team: "Free Agent", mouse: "G-Wolves Hati S+ 4K", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇷🇺" },
  { name: "taskmast33r", game: "Apex", team: "Free Agent", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 800, sens: 1.4, edpi: 1120, role: "Fragger", country: "🇷🇺" },
  { name: "Gnaske", game: "Apex", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Fragger", country: "🇩🇰" },
  { name: "Ye Qiu", game: "Apex", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 1.4, edpi: 1120, role: "Fragger", country: "🇫🇷" },
  { name: "Monsoon", game: "Apex", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.8, edpi: 640, role: "Fragger", country: "🇺🇸" },
  { name: "LiNkzr", game: "Apex", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Fragger", country: "🇫🇮" },
  { name: "oraxe", game: "Apex", team: "Content", mouse: "ZOWIE EC2-C", hz: 1000, dpi: 800, sens: 1.8, edpi: 1440, role: "Fragger", country: "🇫🇷" },
  { name: "taxi2g", game: "Apex", team: "Content", mouse: "Lamzu Thorn", hz: 1000, dpi: 1600, sens: 0.43, edpi: 693, role: "Fragger", country: "🇩🇰" },
  { name: "Noko", game: "Apex", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.35, edpi: 1080, role: "Fragger", country: "🇺🇸" },
  { name: "Leamonhead", game: "Apex", team: "Content", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇺🇸" },
  { name: "rpr", game: "Apex", team: "Content", mouse: "Lamzu Atlantis Mini", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇭🇷" },
  { name: "sweet", game: "Apex", team: "Content", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 800, sens: 1.35, edpi: 1080, role: "Fragger", country: "🇺🇸" },
  { name: "Diegosaurs", game: "Apex", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 500, dpi: 3200, sens: 0.69, edpi: 2208, role: "Fragger", country: "🇺🇸" },
  { name: "Apryze", game: "Apex", team: "Content", mouse: "Pulsar X2 V2", hz: 1000, dpi: 1600, sens: 0.7, edpi: 1120, role: "Fragger", country: "🇺🇸" },
  { name: "Faide", game: "Apex", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1700, sens: 0.8, edpi: 1360, role: "Fragger", country: "🇺🇸" },
  { name: "HAL", game: "Apex", team: "Content", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "Fragger", country: "🇮🇹" },
  { name: "Stormen", game: "Apex", team: "Content", mouse: "Lamzu Maya X", hz: 1000, dpi: 1600, sens: 0.65, edpi: 1040, role: "Fragger", country: "🇸🇪" },
  { name: "Mande", game: "Apex", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "Fragger", country: "🇩🇰" },
  { name: "HisWattson", game: "Apex", team: "Content", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 1.54, edpi: 1232, role: "Fragger", country: "🇺🇸" },
  { name: "KaronPe", game: "Apex", team: "Content", mouse: "VGN Dragonfly MOBA", hz: 1000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇰🇷" },
  { name: "Vooshii", game: "Apex", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 3, edpi: 1200, role: "Fragger", country: "🇫🇷" },
  { name: "Hiarka", game: "Apex", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.6, edpi: 480, role: "Fragger", country: "🇵🇹" },
  { name: "Uxako", game: "Apex", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 1.2, edpi: 960, role: "Fragger", country: "🇪🇸" },
  { name: "iiTzTimmy", game: "Apex", team: "Content", mouse: "SONY INZONE Mouse-A", hz: 1000, dpi: 1800, sens: 0.9, edpi: 1620, role: "Fragger", country: "🇺🇸" },
  // ─── VALORANT: 565 players from prosettings.net (verified Feb 2026) ───
  { name: "hfmi0dzjc9z7", game: "Valorant", team: "Edward Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.36, edpi: 290, role: "Duelist", country: "🇨🇳" },
  { name: "Smoggy", game: "Valorant", team: "Edward Gaming", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.31, edpi: 248, role: "Duelist", country: "🇨🇳" },
  { name: "CB", game: "Valorant", team: "Edward Gaming", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 284, role: "Duelist", country: "🇨🇳" },
  { name: "ZmjjKK", game: "Valorant", team: "Edward Gaming", mouse: "VAXEE ZYGEN NP-01S V2 Wireless", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇳" },
  { name: "nobody", game: "Valorant", team: "Edward Gaming", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 800, sens: 0.26, edpi: 208, role: "Duelist", country: "🇨🇳" },
  { name: "CHICHOO", game: "Valorant", team: "Edward Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.21, edpi: 168, role: "Duelist", country: "🇨🇳" },
  { name: "Boo", game: "Valorant", team: "Team Heretics", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.29, edpi: 232, role: "Duelist", country: "🇱🇹" },
  { name: "benjyfishy", game: "Valorant", team: "Team Heretics", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 800, sens: 0.28, edpi: 226, role: "Duelist", country: "🇬🇧" },
  { name: "RieNs", game: "Valorant", team: "Team Heretics", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇹🇷" },
  { name: "SirMaza", game: "Valorant", team: "Team Heretics", mouse: "VAXEE XE Wireless Yellow", hz: 1000, dpi: 400, sens: 0.5, edpi: 200, role: "Duelist", country: "🇪🇸" },
  { name: "Wo0t", game: "Valorant", team: "Team Heretics", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 500, sens: 0.5, edpi: 250, role: "Duelist", country: "🇹🇷" },
  { name: "ComeBack", game: "Valorant", team: "Team Heretics", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇹🇷" },
  { name: "Karon", game: "Valorant", team: "Gen.G", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "Foxy9", game: "Valorant", team: "Gen.G", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇰🇷" },
  { name: "Lakia", game: "Valorant", team: "Gen.G", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇰🇷" },
  { name: "t3xture", game: "Valorant", team: "Gen.G", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇰🇷" },
  { name: "ZynX", game: "Valorant", team: "Gen.G", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇰🇷" },
  { name: "spikeziN", game: "Valorant", team: "Leviatan", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇧🇷" },
  { name: "Sato", game: "Valorant", team: "Leviatan", mouse: "VAXEE ZYGEN NP-01S V2 Wireless", hz: 4000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇧🇷" },
  { name: "pxs", game: "Valorant", team: "Leviatan", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "kiNgg", game: "Valorant", team: "Leviatan", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇱" },
  { name: "Shanks", game: "Valorant", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 800, sens: 0.22, edpi: 176, role: "Duelist", country: "🇨🇦" },
  { name: "JonahP", game: "Valorant", team: "G2 Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 400, sens: 0.5, edpi: 200, role: "Duelist", country: "🇨🇦" },
  { name: "leaf", game: "Valorant", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2c", hz: 2000, dpi: 1600, sens: 0.08, edpi: 128, role: "Duelist", country: "🇺🇸" },
  { name: "jawgemo", game: "Valorant", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.12, edpi: 184, role: "Duelist", country: "🇰🇭" },
  { name: "trent", game: "Valorant", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 1600, sens: 0.16, edpi: 256, role: "Duelist", country: "🇺🇸" },
  { name: "valyn", game: "Valorant", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2 Cyan", hz: 1000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇺🇸" },
  { name: "babybay", game: "Valorant", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "Alfajer", game: "Valorant", team: "Fnatic", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 0.45, edpi: 180, role: "Duelist", country: "🇹🇷" },
  { name: "PROD", game: "Valorant", team: "Fnatic", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.52, edpi: 416, role: "Duelist", country: "🇺🇸" },
  { name: "crashies", game: "Valorant", team: "Fnatic", mouse: "Fnatic x Lamzu Maya X 8K", hz: 8000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "kaajak", game: "Valorant", team: "Fnatic", mouse: "WLMouse BEAST X", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇵🇱" },
  { name: "Boaster", game: "Valorant", team: "Fnatic", mouse: "ATK Blazing Sky F1", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇬🇧" },
  { name: "Lothar", game: "Valorant", team: "DRX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇵🇱" },
  { name: "free1ng", game: "Valorant", team: "DRX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "HYUNMIN", game: "Valorant", team: "DRX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "BeYN", game: "Valorant", team: "DRX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "MaKo", game: "Valorant", team: "DRX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.48, edpi: 192, role: "Duelist", country: "🇰🇷" },
  { name: "Flicker", game: "Valorant", team: "DRX", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "johnqt", game: "Valorant", team: "Sentinels", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇲🇦" },
  { name: "tarik", game: "Valorant", team: "Sentinels", mouse: "Finalmouse Ultralight X Large", hz: 1000, dpi: 800, sens: 0.47, edpi: 377, role: "Duelist", country: "🇺🇸" },
  { name: "aceu", game: "Valorant", team: "Sentinels", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇺🇸" },
  { name: "cortezia", game: "Valorant", team: "Sentinels", mouse: "ZOWIE S2-DW", hz: 4000, dpi: 800, sens: 0.14, edpi: 112, role: "Duelist", country: "🇧🇷" },
  { name: "reduxx", game: "Valorant", team: "Sentinels", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇺🇸" },
  { name: "N4RRATE", game: "Valorant", team: "Sentinels", mouse: "Pulsar TenZ Signature Edition", hz: 1000, dpi: 1600, sens: 0.16, edpi: 256, role: "Duelist", country: "🇺🇸" },
  { name: "Kyu", game: "Valorant", team: "Sentinels", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇨🇦" },
  { name: "cgrs", game: "Valorant", team: "Paper Rex", mouse: "Pulsar X2", hz: 1000, dpi: 400, sens: 0.66, edpi: 264, role: "Duelist", country: "🇹🇭" },
  { name: "f0rsakeN", game: "Valorant", team: "Paper Rex", mouse: "Pulsar Susanto-X", hz: 4000, dpi: 800, sens: 0.65, edpi: 516, role: "Duelist", country: "🇮🇩" },
  { name: "something", game: "Valorant", team: "Paper Rex", mouse: "Lamzu Maya X", hz: 4000, dpi: 800, sens: 0.58, edpi: 464, role: "Duelist", country: "🇷🇺" },
  { name: "d4v41", game: "Valorant", team: "Paper Rex", mouse: "Fnatic x Lamzu Maya X 8K", hz: 1000, dpi: 1600, sens: 0.13, edpi: 208, role: "Duelist", country: "🇲🇾" },
  { name: "Jinggg", game: "Valorant", team: "Paper Rex", mouse: "G-Wolves Hati S+ 4K", hz: 2000, dpi: 1600, sens: 0.2, edpi: 312, role: "Duelist", country: "🇸🇬" },
  { name: "lidyuh", game: "Valorant", team: "100 Thieves", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇺🇸" },
  { name: "Nadeshot", game: "Valorant", team: "100 Thieves", mouse: "G-Wolves Hati S+ 4K", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇺🇸" },
  { name: "Asuna", game: "Valorant", team: "100 Thieves", mouse: "Razer DeathAdder V2", hz: 1000, dpi: 1400, sens: 0.26, edpi: 364, role: "Duelist", country: "🇺🇸" },
  { name: "Cryocells", game: "Valorant", team: "100 Thieves", mouse: "Lamzu Maya X Purple Shadow", hz: 8000, dpi: 800, sens: 0.16, edpi: 128, role: "Duelist", country: "🇺🇸" },
  { name: "bang", game: "Valorant", team: "100 Thieves", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇺🇸" },
  { name: "timotino", game: "Valorant", team: "100 Thieves", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 226, role: "Duelist", country: "🇨🇦" },
  { name: "mimi", game: "Valorant", team: "G2 Gozen", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇩🇰" },
  { name: "cauanzin", game: "Valorant", team: "LOUD", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.12, edpi: 192, role: "Duelist", country: "🇧🇷" },
  { name: "RobbieBk", game: "Valorant", team: "LOUD", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇳🇱" },
  { name: "pANcada", game: "Valorant", team: "LOUD", mouse: "Pulsar ZywOo The Chosen Mouse", hz: 1000, dpi: 1600, sens: 0.14, edpi: 224, role: "Duelist", country: "🇧🇷" },
  { name: "Lukxo", game: "Valorant", team: "LOUD", mouse: "Pulsar X2H", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇧🇷" },
  { name: "Virtyy", game: "Valorant", team: "LOUD", mouse: "Pulsar X2 CrazyLight", hz: 1000, dpi: 800, sens: 0.39, edpi: 312, role: "Duelist", country: "🇩🇴" },
  { name: "xeus", game: "Valorant", team: "FUT Esports", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇹🇷" },
  { name: "qRaxs", game: "Valorant", team: "FUT Esports", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 0.6, edpi: 480, role: "Duelist", country: "🇹🇷" },
  { name: "MrFalin", game: "Valorant", team: "FUT Esports", mouse: "VAXEE ZYGEN NP-01S V2 Wireless Deep", hz: 1000, dpi: 800, sens: 0.42, edpi: 336, role: "Duelist", country: "🇹🇷" },
  { name: "AtaKaptan", game: "Valorant", team: "FUT Esports", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇹🇷" },
  { name: "yetujey", game: "Valorant", team: "FUT Esports", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 800, sens: 0.7, edpi: 560, role: "Duelist", country: "🇹🇷" },
  { name: "xccurate", game: "Valorant", team: "T1", mouse: "Pulsar Susanto-X", hz: 2000, dpi: 400, sens: 0.59, edpi: 236, role: "Duelist", country: "🇮🇩" },
  { name: "Carpe", game: "Valorant", team: "T1", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 900, sens: 0.23, edpi: 211, role: "Duelist", country: "🇰🇷" },
  { name: "iZu", game: "Valorant", team: "T1", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 0.33, edpi: 261, role: "Duelist", country: "🇰🇷" },
  { name: "Munchkin", game: "Valorant", team: "T1", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇰🇷" },
  { name: "BuZz", game: "Valorant", team: "T1", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "Meteor", game: "Valorant", team: "T1", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇰🇷" },
  { name: "stax", game: "Valorant", team: "T1", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.21, edpi: 172, role: "Duelist", country: "🇰🇷" },
  { name: "Less", game: "Valorant", team: "KRÜ Esports", mouse: "Logitech G Pro 2 LIGHTSPEED", hz: 4000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇧🇷" },
  { name: "mwzera", game: "Valorant", team: "KRÜ Esports", mouse: "VAXEE XE-S Wireless", hz: 2000, dpi: 800, sens: 0.36, edpi: 288, role: "Duelist", country: "🇧🇷" },
  { name: "silentzz", game: "Valorant", team: "KRÜ Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "Saadhak", game: "Valorant", team: "KRÜ Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇦🇷" },
  { name: "ponix", game: "Valorant", team: "KRÜ Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.34, edpi: 272, role: "Duelist", country: "🇨🇱" },
  { name: "ethos", game: "Valorant", team: "NRG", mouse: "Lamzu Maya X", hz: 2000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "s0m", game: "Valorant", team: "NRG", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 0.8, edpi: 320, role: "Duelist", country: "🇺🇸" },
  { name: "Ethan", game: "Valorant", team: "NRG", mouse: "Lamzu Paro", hz: 1000, dpi: 400, sens: 0.58, edpi: 232, role: "Duelist", country: "🇺🇸" },
  { name: "brawk", game: "Valorant", team: "NRG", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "mada", game: "Valorant", team: "NRG", mouse: "ZOWIE S2-DW", hz: 1000, dpi: 800, sens: 0.37, edpi: 296, role: "Duelist", country: "🇨🇦" },
  { name: "Keiko", game: "Valorant", team: "NRG", mouse: "WLMouse Beast X Max Tempered", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇬🇧" },
  { name: "sarah", game: "Valorant", team: "Shopify Rebellion", mouse: "Razer Viper Mini Signature Edition", hz: 8000, dpi: 1600, sens: 0.13, edpi: 208, role: "Duelist", country: "🇨🇦" },
  { name: "meL", game: "Valorant", team: "Shopify Rebellion", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.32, edpi: 257, role: "Duelist", country: "🇺🇸" },
  { name: "Laz", game: "Valorant", team: "ZETA DIVISION", mouse: "VAXEE NP-01S Ergo", hz: 4000, dpi: 1600, sens: 0.14, edpi: 218, role: "Duelist", country: "🇯🇵" },
  { name: "Xdll", game: "Valorant", team: "ZETA DIVISION", mouse: "Razer Viper V3 Hyperspeed", hz: 4000, dpi: 800, sens: 0.23, edpi: 188, role: "Duelist", country: "🇯🇵" },
  { name: "SugarZ3ro", game: "Valorant", team: "ZETA DIVISION", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.23, edpi: 180, role: "Duelist", country: "🇯🇵" },
  { name: "Mendo", game: "Valorant", team: "Team Liquid", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 450, sens: 0.55, edpi: 248, role: "Duelist", country: "🇸🇪" },
  { name: "nAts", game: "Valorant", team: "Team Liquid", mouse: "ZOWIE U2-DW", hz: 1000, dpi: 800, sens: 0.49, edpi: 392, role: "Duelist", country: "🇷🇺" },
  { name: "bizerra", game: "Valorant", team: "Team Liquid", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.26, edpi: 208, role: "Duelist", country: "🇧🇷" },
  { name: "joojina", game: "Valorant", team: "Team Liquid", mouse: "Lamzu Thorn", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "ShahZaM", game: "Valorant", team: "Team Liquid", mouse: "TEEVOLUTION Terra", hz: 1000, dpi: 800, sens: 0.27, edpi: 212, role: "Duelist", country: "🇺🇸" },
  { name: "frttt", game: "Valorant", team: "Team Liquid", mouse: "ZOWIE EC2", hz: 1000, dpi: 1600, sens: 0.76, edpi: 1208, role: "Duelist", country: "🇧🇷" },
  { name: "purp0", game: "Valorant", team: "Team Liquid", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇷🇺" },
  { name: "MiniBoo", game: "Valorant", team: "Team Liquid", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇱🇹" },
  { name: "Wayne", game: "Valorant", team: "Team Liquid", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 800, sens: 0.43, edpi: 344, role: "Duelist", country: "🇸🇬" },
  { name: "kamo", game: "Valorant", team: "Team Liquid", mouse: "ATK Dragonfly A9", hz: 2000, dpi: 500, sens: 0.48, edpi: 240, role: "Duelist", country: "🇵🇱" },
  { name: "tteuw", game: "Valorant", team: "MIBR", mouse: "Logitech G402", hz: 1000, dpi: 2000, sens: 0.38, edpi: 750, role: "Duelist", country: "🇧🇷" },
  { name: "nzr", game: "Valorant", team: "MIBR", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇦🇷" },
  { name: "Sacy", game: "Valorant", team: "MIBR", mouse: "Logitech G Pro X Superlight", hz: 2000, dpi: 800, sens: 0.48, edpi: 384, role: "Duelist", country: "🇧🇷" },
  { name: "Mazino", game: "Valorant", team: "MIBR", mouse: "Logitech G703", hz: 1000, dpi: 1600, sens: 0.17, edpi: 272, role: "Duelist", country: "🇨🇱" },
  { name: "Verno", game: "Valorant", team: "MIBR", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 3200, sens: 0.04, edpi: 128, role: "Duelist", country: "🇺🇸" },
  { name: "aspas", game: "Valorant", team: "MIBR", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "tex", game: "Valorant", team: "MIBR", mouse: "ZOWIE U2-DW", hz: 2000, dpi: 800, sens: 0.22, edpi: 176, role: "Duelist", country: "🇩🇪" },
  { name: "Zekken", game: "Valorant", team: "MIBR", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇺🇸" },
  { name: "Knight", game: "Valorant", team: "Bilibili Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.17, edpi: 272, role: "Duelist", country: "🇨🇳" },
  { name: "rushia", game: "Valorant", team: "Bilibili Gaming", mouse: "Finalmouse Ultralight X Small", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇳" },
  { name: "Levius", game: "Valorant", team: "Bilibili Gaming", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇨🇳" },
  { name: "nephh", game: "Valorant", team: "Bilibili Gaming", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇸🇬" },
  { name: "whzy", game: "Valorant", team: "Bilibili Gaming", mouse: "Logitech G Pro X Superlight 2c", hz: 4000, dpi: 1600, sens: 0.24, edpi: 389, role: "Duelist", country: "🇨🇳" },
  { name: "Elite", game: "Valorant", team: "Karmine Corp", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇹🇷" },
  { name: "Lewn", game: "Valorant", team: "Karmine Corp", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇹🇷" },
  { name: "Suygetsu", game: "Valorant", team: "Karmine Corp", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇷🇺" },
  { name: "Sheydos", game: "Valorant", team: "Karmine Corp", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 400, sens: 0.83, edpi: 332, role: "Duelist", country: "🇷🇺" },
  { name: "Life", game: "Valorant", team: "FunPlus Phoenix", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇳" },
  { name: "BerLIN", game: "Valorant", team: "FunPlus Phoenix", mouse: "ZOWIE S2-DW", hz: 4000, dpi: 800, sens: 0.41, edpi: 328, role: "Duelist", country: "🇹🇼" },
  { name: "AAAAY", game: "Valorant", team: "FunPlus Phoenix", mouse: "ZOWIE S2-DW", hz: 4000, dpi: 800, sens: 0.21, edpi: 171, role: "Duelist", country: "🇨🇳" },
  { name: "sScary", game: "Valorant", team: "FunPlus Phoenix", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 1600, sens: 0.18, edpi: 288, role: "Duelist", country: "🇹🇭" },
  { name: "Haodong", game: "Valorant", team: "Titan Esports Club", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 0.69, edpi: 276, role: "Duelist", country: "🇨🇳" },
  { name: "TvirusLuke", game: "Valorant", team: "Titan Esports Club", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.48, edpi: 388, role: "Duelist", country: "🇹🇼" },
  { name: "Abo", game: "Valorant", team: "Titan Esports Club", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇨🇳" },
  { name: "Cyvoph", game: "Valorant", team: "Team Vitality", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇫🇷" },
  { name: "Sayonara", game: "Valorant", team: "Team Vitality", mouse: "Lamzu Maya X", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇲🇩" },
  { name: "Jamppi", game: "Valorant", team: "Team Vitality", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 800, sens: 0.42, edpi: 336, role: "Duelist", country: "🇫🇮" },
  { name: "PROFEK", game: "Valorant", team: "Team Vitality", mouse: "ASUS ROG Harpe Ace 2 Yellow", hz: 1000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇵🇱" },
  { name: "Derke", game: "Valorant", team: "Team Vitality", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 0.74, edpi: 296, role: "Duelist", country: "🇫🇮" },
  { name: "UNFAKE", game: "Valorant", team: "Team Vitality", mouse: "ASUS ROG Harpe Ace 2 Yellow", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇵🇱" },
  { name: "Chronicle", game: "Valorant", team: "Team Vitality", mouse: "ATK Dragonfly A9", hz: 1000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇷🇺" },
  { name: "Fizzy", game: "Valorant", team: "MOUZ", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 0.12, edpi: 192, role: "Duelist", country: "🇵🇹" },
  { name: "Crazyface", game: "Valorant", team: "Natus Vincere", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇹🇼" },
  { name: "ANGE1", game: "Valorant", team: "Natus Vincere", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.5, edpi: 400, role: "Duelist", country: "🇺🇦" },
  { name: "sociablEE", game: "Valorant", team: "Natus Vincere", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇹🇷" },
  { name: "Shao", game: "Valorant", team: "Natus Vincere", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇷🇺" },
  { name: "hiro", game: "Valorant", team: "Natus Vincere", mouse: "Razer Viper V4 Pro", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇳🇱" },
  { name: "Filu", game: "Valorant", team: "Natus Vincere", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 4000, dpi: 1600, sens: 0.14, edpi: 216, role: "Duelist", country: "🇵🇱" },
  { name: "lucks", game: "Valorant", team: "FURIA", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.08, edpi: 128, role: "Duelist", country: "🇧🇷" },
  { name: "alym", game: "Valorant", team: "FURIA", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.24, edpi: 196, role: "Duelist", country: "🇺🇸" },
  { name: "nerve", game: "Valorant", team: "FURIA", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.23, edpi: 181, role: "Duelist", country: "🇺🇸" },
  { name: "artzin", game: "Valorant", team: "FURIA", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.23, edpi: 368, role: "Duelist", country: "🇧🇷" },
  { name: "koalanoob", game: "Valorant", team: "FURIA", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 785, sens: 0.28, edpi: 217, role: "Duelist", country: "🇨🇦" },
  { name: "Xeppaa", game: "Valorant", team: "Cloud9", mouse: "ZOWIE EC2-C", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇺🇸" },
  { name: "v1c", game: "Valorant", team: "Cloud9", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "penny", game: "Valorant", team: "Cloud9", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇨🇦" },
  { name: "Zellsis", game: "Valorant", team: "Cloud9", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 800, sens: 0.21, edpi: 172, role: "Duelist", country: "🇺🇸" },
  { name: "OXY", game: "Valorant", team: "Cloud9", mouse: "Razer Viper Mini", hz: 4000, dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇺🇸" },
  { name: "Brave", game: "Valorant", team: "Eternal Fire", mouse: "Endgame Gear XM2we", hz: 1000, dpi: 400, sens: 0.85, edpi: 340, role: "Duelist", country: "🇹🇷" },
  { name: "Izzy", game: "Valorant", team: "Eternal Fire", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.51, edpi: 202, role: "Duelist", country: "🇹🇷" },
  { name: "delz1k", game: "Valorant", team: "9z Team", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.72, edpi: 288, role: "Duelist", country: "🇨🇱" },
  { name: "NagZet", game: "Valorant", team: "9z Team", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 0.58, edpi: 232, role: "Duelist", country: "🇨🇱" },
  { name: "Klaus", game: "Valorant", team: "9z Team", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 1600, sens: 0.36, edpi: 576, role: "Duelist", country: "🇦🇷" },
  { name: "Tacolilla", game: "Valorant", team: "9z Team", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.47, edpi: 376, role: "Duelist", country: "🇨🇱" },
  { name: "COLDFISH", game: "Valorant", team: "TyLoo", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇨🇳" },
  { name: "Scales", game: "Valorant", team: "TyLoo", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇨🇳" },
  { name: "splash", game: "Valorant", team: "TyLoo", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇮🇩" },
  { name: "SLOWLY", game: "Valorant", team: "TyLoo", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.16, edpi: 251, role: "Duelist", country: "🇨🇳" },
  { name: "reazy", game: "Valorant", team: "S2G", mouse: "Xtrfy M4 Wireless", hz: 1000, dpi: 800, sens: 0.22, edpi: 176, role: "Duelist", country: "🇹🇷" },
  { name: "batujnax", game: "Valorant", team: "S2G", mouse: "Lamzu Maya Doodle", hz: 2000, dpi: 400, sens: 0.7, edpi: 280, role: "Duelist", country: "🇹🇷" },
  { name: "Luzuh", game: "Valorant", team: "Ovation Esports", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.54, edpi: 216, role: "Duelist", country: "🇬🇧" },
  { name: "Russ", game: "Valorant", team: "Velocity Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.38, edpi: 304, role: "Duelist", country: "🇬🇧" },
  { name: "xffero", game: "Valorant", team: "Rex Regum Qeon", mouse: "G-Wolves Hati S+ 4K", hz: 1000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇮🇩" },
  { name: "Monyet", game: "Valorant", team: "Rex Regum Qeon", mouse: "VAXEE NP-01S", hz: 1000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇮🇩" },
  { name: "crazyguy", game: "Valorant", team: "Rex Regum Qeon", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.24, edpi: 196, role: "Duelist", country: "🇻🇳" },
  { name: "Jemkin", game: "Valorant", team: "Rex Regum Qeon", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇷🇺" },
  { name: "Kushy", game: "Valorant", team: "Rex Regum Qeon", mouse: "Razer Viper V4 Pro", hz: 2000, dpi: 1600, sens: 0.14, edpi: 224, role: "Duelist", country: "🇮🇩" },
  { name: "maestr0", game: "Valorant", team: "TBK Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 3200, sens: 0.13, edpi: 416, role: "Duelist", country: "🇧🇷" },
  { name: "d3ffo", game: "Valorant", team: "BOOM Esports", mouse: "VAXEE ZYGEN NP-01", hz: 1000, dpi: 800, sens: 0.41, edpi: 325, role: "Duelist", country: "🇷🇺" },
  { name: "glovee", game: "Valorant", team: "Galakticos", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇹🇷" },
  { name: "Fit1nho", game: "Valorant", team: "Barca Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇪🇸" },
  { name: "juicy", game: "Valorant", team: "Wolves Esports", mouse: "Finalmouse Ultralight X Medium", hz: 4000, dpi: 800, sens: 0.34, edpi: 276, role: "Duelist", country: "🇸🇬" },
  { name: "SiuFatBB", game: "Valorant", team: "Wolves Esports", mouse: "VAXEE ZYGEN NP-01S V2 Wireless", hz: 4000, dpi: 800, sens: 0.21, edpi: 168, role: "Duelist", country: "🇭🇰" },
  { name: "Spring", game: "Valorant", team: "Wolves Esports", mouse: "VAXEE ZYGEN NP-01S V2 Wireless Deep", hz: 4000, dpi: 1600, sens: 0.19, edpi: 304, role: "Duelist", country: "🇹🇼" },
  { name: "yosemite", game: "Valorant", team: "Wolves Esports", mouse: "G-Wolves Hati S+ 4K", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇨🇳" },
  { name: "Jesse", game: "Valorant", team: "Twisted Minds", mouse: "VAXEE ZYGEN NP-01S V2 Wireless Deep", hz: 4000, dpi: 800, sens: 0.35, edpi: 277, role: "Duelist", country: "🇨🇿" },
  { name: "stavros", game: "Valorant", team: "ALTERNATE aTTaX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.19, edpi: 304, role: "Duelist", country: "🇩🇪" },
  { name: "Jini", game: "Valorant", team: "ALTERNATE aTTaX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇩🇪" },
  { name: "AdrianL", game: "Valorant", team: "ALTERNATE aTTaX", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇩🇪" },
  { name: "xanarchy", game: "Valorant", team: "ALTERNATE aTTaX", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.43, edpi: 346, role: "Duelist", country: "🇩🇪" },
  { name: "BennY", game: "Valorant", team: "ALTERNATE aTTaX", mouse: "Razer Viper Mini Signature Edition", hz: 4000, dpi: 800, sens: 0.32, edpi: 252, role: "Duelist", country: "🇩🇪" },
  { name: "7ssk7", game: "Valorant", team: "KPI Gaming", mouse: "Finalmouse Ultralight X Medium", hz: 4000, dpi: 1600, sens: 0.11, edpi: 176, role: "Duelist", country: "🇧🇾" },
  { name: "keloqz", game: "Valorant", team: "Mandatory", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.44, edpi: 176, role: "Duelist", country: "🇫🇷" },
  { name: "TakaS", game: "Valorant", team: "Mandatory", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.48, edpi: 192, role: "Duelist", country: "🇫🇷" },
  { name: "Shin", game: "Valorant", team: "Mandatory", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 0.53, edpi: 210, role: "Duelist", country: "🇫🇷" },
  { name: "nataNk", game: "Valorant", team: "Mandatory", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇫🇷" },
  { name: "kAdavra", game: "Valorant", team: "Mandatory", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.41, edpi: 332, role: "Duelist", country: "🇫🇷" },
  { name: "RgLM", game: "Valorant", team: "RED Canids", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "B1sk", game: "Valorant", team: "UCAM Esports Club", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.47, edpi: 376, role: "Duelist", country: "🇷🇺" },
  { name: "JohnOlsen", game: "Valorant", team: "FULL SENSE", mouse: "HITSCAN Hyperlight", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇹🇭" },
  { name: "LAMMYSNAX", game: "Valorant", team: "FULL SENSE", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.24, edpi: 195, role: "Duelist", country: "🇹🇭" },
  { name: "Crws", game: "Valorant", team: "FULL SENSE", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇹🇭" },
  { name: "JitBoyS", game: "Valorant", team: "FULL SENSE", mouse: "Pulsar Susanto-X", hz: 1000, dpi: 800, sens: 0.5, edpi: 400, role: "Duelist", country: "🇹🇭" },
  { name: "Primmie", game: "Valorant", team: "FULL SENSE", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇹🇭" },
  { name: "JessieVash", game: "Valorant", team: "Team Secret", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 800, sens: 0.42, edpi: 336, role: "Duelist", country: "🇵🇭" },
  { name: "aplycs", game: "Valorant", team: "Team Secret", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 0.1, edpi: 152, role: "Duelist", country: "🇲🇾" },
  { name: "ZesBeeW", game: "Valorant", team: "Team Secret", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.63, edpi: 252, role: "Duelist", country: "🇸🇬" },
  { name: "Sylvan", game: "Valorant", team: "Team Secret", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇰🇷" },
  { name: "kellyS", game: "Valorant", team: "Team Secret", mouse: "Pulsar eS FS-1", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇵🇭" },
  { name: "Hals", game: "Valorant", team: "FENNEL", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.28, edpi: 221, role: "Duelist", country: "🇯🇵" },
  { name: "MrTenzouEz", game: "Valorant", team: "FENNEL", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 0.41, edpi: 164, role: "Duelist", country: "🇯🇵" },
  { name: "GON", game: "Valorant", team: "FENNEL", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.08, edpi: 128, role: "Duelist", country: "🇯🇵" },
  { name: "Aace", game: "Valorant", team: "FENNEL", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.32, edpi: 128, role: "Duelist", country: "🇯🇵" },
  { name: "Deryeon", game: "Valorant", team: "Global Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.13, edpi: 208, role: "Duelist", country: "🇸🇬" },
  { name: "Autumn", game: "Valorant", team: "Global Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.11, edpi: 181, role: "Duelist", country: "🇦🇺" },
  { name: "PatMen", game: "Valorant", team: "Global Esports", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇵🇭" },
  { name: "SerialKiller", game: "Valorant", team: "Fokus Clan", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.06, edpi: 88, role: "Duelist", country: "🇱🇻" },
  { name: "Kuba", game: "Valorant", team: "Fokus Clan", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇩🇪" },
  { name: "Vince", game: "Valorant", team: "CGN Esports", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇩🇪" },
  { name: "Zyppan", game: "Valorant", team: "CGN Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇸🇪" },
  { name: "kovaQ", game: "Valorant", team: "CGN Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.5, edpi: 200, role: "Duelist", country: "🇨🇭" },
  { name: "liazzi", game: "Valorant", team: "Corinthians", mouse: "VAXEE XE Wireless", hz: 4000, dpi: 800, sens: 0.6, edpi: 480, role: "Duelist", country: "🇧🇷" },
  { name: "Tkzin", game: "Valorant", team: "Corinthians", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇧🇷" },
  { name: "Shionxy", game: "Valorant", team: "Corinthians", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇧🇷" },
  { name: "Pollo", game: "Valorant", team: "Corinthians", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.8, edpi: 1280, role: "Duelist", country: "🇧🇷" },
  { name: "Shniider", game: "Valorant", team: "Team RA'AD", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇪🇬" },
  { name: "Shalaby", game: "Valorant", team: "Team RA'AD", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇪🇬" },
  { name: "Skanoodles", game: "Valorant", team: "Team RA'AD", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.36, edpi: 288, role: "Duelist", country: "🇪🇬" },
  { name: "jzz", game: "Valorant", team: "Los Grandes", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇧🇷" },
  { name: "mazin", game: "Valorant", team: "Los Grandes", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇧🇷" },
  { name: "Magnum", game: "Valorant", team: "Enterprise Esports", mouse: "Lamzu Maya X Purple Shadow", hz: 1000, dpi: 400, sens: 0.24, edpi: 97, role: "Duelist", country: "🇨🇿" },
  { name: "Yuicaw", game: "Valorant", team: "JD Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.21, edpi: 172, role: "Duelist", country: "🇹🇼" },
  { name: "coconut", game: "Valorant", team: "JD Gaming", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇭🇰" },
  { name: "Kenkayyy", game: "Valorant", team: "MIBR Academy", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "Teddy", game: "Valorant", team: "MIBR Academy", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇧🇷" },
  { name: "neth", game: "Valorant", team: "Crazy Raccoon", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇯🇵" },
  { name: "beyAz", game: "Valorant", team: "Gentle Mates", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.12, edpi: 195, role: "Duelist", country: "🇫🇷" },
  { name: "Minny", game: "Valorant", team: "Gentle Mates", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇿" },
  { name: "starxo", game: "Valorant", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.39, edpi: 312, role: "Duelist", country: "🇵🇱" },
  { name: "Click", game: "Valorant", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇩🇪" },
  { name: "bipo", game: "Valorant", team: "Gentle Mates", mouse: "Pulsar X2 CrazyLight", hz: 4000, dpi: 800, sens: 0.39, edpi: 312, role: "Duelist", country: "🇮🇹" },
  { name: "marteen", game: "Valorant", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 1600, sens: 0.06, edpi: 96, role: "Duelist", country: "🇨🇿" },
  { name: "Meddo", game: "Valorant", team: "GODSENT", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇸🇪" },
  { name: "Jremy", game: "Valorant", team: "REJECT", mouse: "Pulsar X2 V2", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇵🇭" },
  { name: "Dep", game: "Valorant", team: "REJECT", mouse: "Razer Viper V3 Pro Sentinels Edition", hz: 1000, dpi: 800, sens: 0.19, edpi: 152, role: "Duelist", country: "🇯🇵" },
  { name: "Meiy", game: "Valorant", team: "DetonatioN FocusMe", mouse: "Razer Viper V4 Pro", hz: 4000, dpi: 800, sens: 0.17, edpi: 140, role: "Duelist", country: "🇯🇵" },
  { name: "bao", game: "Valorant", team: "Evil Geniuses", mouse: "WLMouse BEAST X", hz: 4000, dpi: 1600, sens: 0.16, edpi: 256, role: "Duelist", country: "🇻🇳" },
  { name: "C0M", game: "Valorant", team: "Evil Geniuses", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "okeanos", game: "Valorant", team: "Evil Geniuses", mouse: "Lamzu Maya X", hz: 8000, dpi: 1600, sens: 0.09, edpi: 144, role: "Duelist", country: "🇻🇳" },
  { name: "supamen", game: "Valorant", team: "Evil Geniuses", mouse: "ATK Blazing Sky F1", hz: 2000, dpi: 800, sens: 0.28, edpi: 227, role: "Duelist", country: "🇺🇸" },
  { name: "dgzin", game: "Valorant", team: "Evil Geniuses", mouse: "ZOWIE EC2-DW Glossy", hz: 2000, dpi: 400, sens: 0.25, edpi: 100, role: "Duelist", country: "🇧🇷" },
  { name: "Loita", game: "Valorant", team: "BBL Esports", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇹🇷" },
  { name: "lovers rock", game: "Valorant", team: "BBL Esports", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 1600, sens: 0.13, edpi: 205, role: "Duelist", country: "🇹🇷" },
  { name: "Rosé", game: "Valorant", team: "BBL Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇹🇷" },
  { name: "Lar0k", game: "Valorant", team: "BBL Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇹🇷" },
  { name: "Rossy", game: "Valorant", team: "Team Envy", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.15, edpi: 248, role: "Duelist", country: "🇺🇸" },
  { name: "BabyJ", game: "Valorant", team: "Team Envy", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 1600, sens: 0.1, edpi: 157, role: "Duelist", country: "🇺🇸" },
  { name: "keznit", game: "Valorant", team: "Team Envy", mouse: "Lamzu Maya X Purple Shadow", hz: 2000, dpi: 800, sens: 0.35, edpi: 277, role: "Duelist", country: "🇨🇱" },
  { name: "Demon1", game: "Valorant", team: "Team Envy", mouse: "ASUS ROG Harpe Ace 2", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "Eggster", game: "Valorant", team: "Team Envy", mouse: "Lamzu Maya X", hz: 1000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇺🇸" },
  { name: "Poppin", game: "Valorant", team: "Team Envy", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 3200, sens: 0.04, edpi: 144, role: "Duelist", country: "🇺🇸" },
  { name: "canezerra", game: "Valorant", team: "Team Envy", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "Fisker", game: "Valorant", team: "NOEZ FOXX", mouse: "ZOWIE EC2-C", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇯🇵" },
  { name: "tixx", game: "Valorant", team: "JiJieHao", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 224, role: "Duelist", country: "🇦🇺" },
  { name: "Francis", game: "Valorant", team: "Nongshim RedForce", mouse: "Lamzu Maya X", hz: 1000, dpi: 800, sens: 0.39, edpi: 312, role: "Duelist", country: "🇰🇷" },
  { name: "Dambi", game: "Valorant", team: "Nongshim RedForce", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇰🇷" },
  { name: "Rb", game: "Valorant", team: "Nongshim RedForce", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.7, edpi: 280, role: "Duelist", country: "🇰🇷" },
  { name: "Xross", game: "Valorant", team: "Nongshim RedForce", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "Ivy", game: "Valorant", team: "Nongshim RedForce", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇰🇷" },
  { name: "vo0kashu", game: "Valorant", team: "Dragon Ranger Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.21, edpi: 169, role: "Duelist", country: "🇷🇺" },
  { name: "Nicc", game: "Valorant", team: "Dragon Ranger Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇹🇼" },
  { name: "Enzo", game: "Valorant", team: "Joblife", mouse: "Lamzu Inca", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇫🇷" },
  { name: "Doma", game: "Valorant", team: "Joblife", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇭🇷" },
  { name: "runneR", game: "Valorant", team: "Joblife", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.44, edpi: 176, role: "Duelist", country: "🇲🇰" },
  { name: "chiwa", game: "Valorant", team: "Joblife", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇷🇺" },
  { name: "Seoldam", game: "Valorant", team: "Riddle Order", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 232, role: "Duelist", country: "🇰🇷" },
  { name: "JoXJo", game: "Valorant", team: "Riddle Order", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.35, edpi: 284, role: "Duelist", country: "🇰🇷" },
  { name: "stev0rr", game: "Valorant", team: "Eintracht Frankfurt", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇩🇪" },
  { name: "azury", game: "Valorant", team: "Eintracht Frankfurt", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇩🇪" },
  { name: "Felix", game: "Valorant", team: "Eintracht Frankfurt", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.34, edpi: 272, role: "Duelist", country: "🇩🇪" },
  { name: "ec1s", game: "Valorant", team: "Maryville Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇺🇸" },
  { name: "geeza", game: "Valorant", team: "Maryville Esports", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇺🇸" },
  { name: "Ange", game: "Valorant", team: "Maryville Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.16, edpi: 256, role: "Duelist", country: "🇨🇦" },
  { name: "stellar", game: "Valorant", team: "YFP Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇺🇸" },
  { name: "jakee", game: "Valorant", team: "YFP Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.21, edpi: 172, role: "Duelist", country: "🇺🇸" },
  { name: "bdog", game: "Valorant", team: "YFP Gaming", mouse: "Razer Viper V3 Pro Sentinels Edition", hz: 1000, dpi: 1600, sens: 0.12, edpi: 187, role: "Duelist", country: "🇺🇸" },
  { name: "Flickless", game: "Valorant", team: "GIANTX", mouse: "Pulsar TenZ Signature Edition", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇧🇪" },
  { name: "ara", game: "Valorant", team: "GIANTX", mouse: "Lamzu Maya X", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇷🇴" },
  { name: "tomaszy", game: "Valorant", team: "GIANTX", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.63, edpi: 252, role: "Duelist", country: "🇵🇹" },
  { name: "Cloud", game: "Valorant", team: "GIANTX", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇷🇺" },
  { name: "westside", game: "Valorant", team: "GIANTX", mouse: "Pulsar X2 CrazyLight", hz: 4000, dpi: 1600, sens: 0.12, edpi: 192, role: "Duelist", country: "🇵🇱" },
  { name: "GRUBINHO", game: "Valorant", team: "GIANTX", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 216, role: "Duelist", country: "🇵🇱" },
  { name: "Reita", game: "Valorant", team: "Murash Gaming", mouse: "VAXEE ZYGEN NP-01S Wireless", hz: 1000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇯🇵" },
  { name: "TENNN", game: "Valorant", team: "Murash Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.29, edpi: 230, role: "Duelist", country: "🇯🇵" },
  { name: "SyouTa", game: "Valorant", team: "Murash Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 284, role: "Duelist", country: "🇯🇵" },
  { name: "Riza", game: "Valorant", team: "Xipto Esports", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.11, edpi: 176, role: "Duelist", country: "🇲🇾" },
  { name: "Hakka", game: "Valorant", team: "NEXGA", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇲🇾" },
  { name: "SHINSEI", game: "Valorant", team: "Kizuna Esports", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1000, sens: 0.35, edpi: 350, role: "Duelist", country: "🇸🇬" },
  { name: "miya", game: "Valorant", team: "DRX Changers", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇯🇵" },
  { name: "SereNa", game: "Valorant", team: "DRX Changers", mouse: "Razer Viper Mini Signature Edition", hz: 8000, dpi: 800, sens: 0.45, edpi: 356, role: "Duelist", country: "🇰🇷" },
  { name: "v1nNy", game: "Valorant", team: "Elevate", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇧🇷" },
  { name: "Dzii", game: "Valorant", team: "LAZE", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.28, edpi: 220, role: "Duelist", country: "🇸🇬" },
  { name: "LuoK1ng", game: "Valorant", team: "Trace Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇨🇳" },
  { name: "biank", game: "Valorant", team: "Trace Esports", mouse: "VAXEE XE V2", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇨🇳" },
  { name: "FengF", game: "Valorant", team: "Trace Esports", mouse: "Ninjutso X VAXEE Sora", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇨🇳" },
  { name: "deLb", game: "Valorant", team: "Trace Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.21, edpi: 165, role: "Duelist", country: "🇮🇩" },
  { name: "Viva", game: "Valorant", team: "Trace Esports", mouse: "VAXEE XE V2", hz: 1000, dpi: 800, sens: 0.28, edpi: 228, role: "Duelist", country: "🇨🇳" },
  { name: "Pkm", game: "Valorant", team: "T1 Academy", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.17, edpi: 264, role: "Duelist", country: "🇰🇷" },
  { name: "pryze", game: "Valorant", team: "2GAME ESPORTS", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.27, edpi: 240, role: "Duelist", country: "🇧🇷" },
  { name: "lz", game: "Valorant", team: "2GAME ESPORTS", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "frz", game: "Valorant", team: "2GAME ESPORTS", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇧🇷" },
  { name: "ambitioN", game: "Valorant", team: "2GAME ESPORTS", mouse: "Razer DeathAdder V4 Pro", hz: 8000, dpi: 1600, sens: 0.09, edpi: 144, role: "Duelist", country: "🇧🇷" },
  { name: "gobera", game: "Valorant", team: "2GAME ESPORTS", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇧🇷" },
  { name: "Lsn", game: "Valorant", team: "All Gamers", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 600, sens: 0.33, edpi: 196, role: "Duelist", country: "🇨🇳" },
  { name: "K1ra", game: "Valorant", team: "All Gamers", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇨🇳" },
  { name: "happywei", game: "Valorant", team: "XLG Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.71, edpi: 570, role: "Duelist", country: "🇹🇼" },
  { name: "Lysoar", game: "Valorant", team: "XLG Esports", mouse: "Razer DeathAdder V4 Pro", hz: 8000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇨🇳" },
  { name: "Rarga", game: "Valorant", team: "XLG Esports", mouse: "WLMouse BEAST X Mini", hz: 4000, dpi: 1600, sens: 0.35, edpi: 560, role: "Duelist", country: "🇷🇺" },
  { name: "nightz", game: "Valorant", team: "Cubert Academy", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇺🇸" },
  { name: "infiltrator", game: "Valorant", team: "Winthrop University", mouse: "Razer Viper V3 Pro Sentinels Edition", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇻🇳" },
  { name: "governor", game: "Valorant", team: "Winthrop University", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 1200, sens: 0.4, edpi: 480, role: "Duelist", country: "🇺🇸" },
  { name: "David", game: "Valorant", team: "ShindeN", mouse: "Lamzu Maya X", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇱" },
  { name: "vaiZ", game: "Valorant", team: "ShindeN", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇨🇱" },
  { name: "snw", game: "Valorant", team: "ShindeN", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "Vera", game: "Valorant", team: "Motiv Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.15, edpi: 246, role: "Duelist", country: "🇸🇬" },
  { name: "sushiboys", game: "Valorant", team: "Motiv Esports", mouse: "VAXEE ZYGEN NP-01S Wireless", hz: 1000, dpi: 800, sens: 0.37, edpi: 296, role: "Duelist", country: "🇹🇭" },
  { name: "Alexy", game: "Valorant", team: "Falcons Vega", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇵🇭" },
  { name: "enerii", game: "Valorant", team: "Falcons Vega", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇮🇩" },
  { name: "Kamiyu", game: "Valorant", team: "Falcons Vega", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.16, edpi: 254, role: "Duelist", country: "🇵🇭" },
  { name: "Athan", game: "Valorant", team: "DRX Academy", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.45, edpi: 180, role: "Duelist", country: "🇰🇷" },
  { name: "Yong", game: "Valorant", team: "DRX Academy", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇰🇷" },
  { name: "Moco", game: "Valorant", team: "FENNEL Female", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 227, role: "Duelist", country: "🇯🇵" },
  { name: "YuRinChi", game: "Valorant", team: "FENNEL Female", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇯🇵" },
  { name: "suzu", game: "Valorant", team: "FENNEL Female", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 224, role: "Duelist", country: "🇯🇵" },
  { name: "DeNaro", game: "Valorant", team: "2GAME ESPORTS Academy", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 0.52, edpi: 208, role: "Duelist", country: "🇧🇷" },
  { name: "Zanatsu", game: "Valorant", team: "Stellae Gaming", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "sw", game: "Valorant", team: "Stellae Gaming", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇧🇷" },
  { name: "Tisora", game: "Valorant", team: "Stellae Gaming", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇧🇷" },
  { name: "Siduzord", game: "Valorant", team: "Stellae Gaming", mouse: "Razer DeathAdder V4 Pro", hz: 2000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "guuih", game: "Valorant", team: "Stellae Gaming", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 0.23, edpi: 184, role: "Duelist", country: "🇧🇷" },
  { name: "bstrdd", game: "Valorant", team: "MIBR fe", mouse: "Pulsar X2 CrazyLight", hz: 2000, dpi: 800, sens: 0.29, edpi: 232, role: "Duelist", country: "🇨🇱" },
  { name: "kon4n", game: "Valorant", team: "Team Solid", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.44, edpi: 352, role: "Duelist", country: "🇧🇷" },
  { name: "RAAFA", game: "Valorant", team: "Team Solid", mouse: "Razer DeathAdder V4 Pro", hz: 4000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "havoc", game: "Valorant", team: "Team Solid", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.33, edpi: 264, role: "Duelist", country: "🇧🇷" },
  { name: "nevoy", game: "Valorant", team: "Team Solid", mouse: "Logitech G Pro X Superlight 2", hz: 8000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇧🇷" },
  { name: "Ezeir", game: "Valorant", team: "NOVA Esports", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇨🇳" },
  { name: "Guang", game: "Valorant", team: "NOVA Esports", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 800, sens: 0.42, edpi: 336, role: "Duelist", country: "🇨🇳" },
  { name: "Obone", game: "Valorant", team: "NOVA Esports", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 400, sens: 0.3, edpi: 120, role: "Duelist", country: "🇨🇳" },
  { name: "shirazi", game: "Valorant", team: "NOVA Esports", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇵🇭" },
  { name: "heybay", game: "Valorant", team: "NOVA Esports", mouse: "VAXEE ZYGEN NP-01S V2 Wireless Deep", hz: 4000, dpi: 1600, sens: 0.09, edpi: 142, role: "Duelist", country: "🇭🇰" },
  { name: "monk", game: "Valorant", team: "NOVA Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.79, edpi: 629, role: "Duelist", country: "🇨🇳" },
  { name: "S1Mon", game: "Valorant", team: "Any Questions Gaming", mouse: "Lamzu Thorn", hz: 1000, dpi: 800, sens: 0.43, edpi: 344, role: "Duelist", country: "🇹🇼" },
  { name: "cNed", game: "Valorant", team: "PCIFIC Esports", mouse: "ZOWIE U2", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇹🇷" },
  { name: "seven", game: "Valorant", team: "PCIFIC Esports", mouse: "PMM Zen 8K Mini (Viper V3 Pro Mod)", hz: 1000, dpi: 1600, sens: 0.14, edpi: 216, role: "Duelist", country: "🇲🇽" },
  { name: "al0rante", game: "Valorant", team: "PCIFIC Esports", mouse: "WLMouse BEAST X", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇩🇪" },
  { name: "Rawkus", game: "Valorant", team: "Free Agent", mouse: "FinalMouse Starlight Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇺🇸" },
  { name: "disk0", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.53, edpi: 210, role: "Duelist", country: "🇦🇺" },
  { name: "Texta", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro Gaming Mouse", hz: 1000, dpi: 400, sens: 0.7, edpi: 280, role: "Duelist", country: "🇦🇺" },
  { name: "v1xen", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇧🇷" },
  { name: "RECIDENT", game: "Valorant", team: "Free Agent", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇮🇱" },
  { name: "BraveAF", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.79, edpi: 314, role: "Duelist", country: "🇷🇺" },
  { name: "PoPiFresH", game: "Valorant", team: "Free Agent", mouse: "VAXEE OUTSET AX Funspark", hz: 1000, dpi: 800, sens: 0.39, edpi: 312, role: "Duelist", country: "🇪🇸" },
  { name: "Wardell", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.69, edpi: 261, role: "Duelist", country: "🇨🇦" },
  { name: "koldamenta", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇪🇸" },
  { name: "TS", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.58, edpi: 233, role: "Duelist", country: "🇰🇷" },
  { name: "clear", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Hyperspeed", hz: 1000, dpi: 1600, sens: 0.12, edpi: 192, role: "Duelist", country: "🇵🇭" },
  { name: "bryce", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇸🇬" },
  { name: "roxie", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇱🇹" },
  { name: "wLn", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.5, edpi: 400, role: "Duelist", country: "🇪🇬" },
  { name: "Ender", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇸🇬" },
  { name: "AslaN", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇩🇪" },
  { name: "FirstLove", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 1600, sens: 0.25, edpi: 400, role: "Duelist", country: "🇸🇬" },
  { name: "GatsH", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇫🇷" },
  { name: "KRYPTIX", game: "Valorant", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 0.47, edpi: 188, role: "Duelist", country: "🇬🇧" },
  { name: "eko", game: "Valorant", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇰🇷" },
  { name: "H1ber", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.67, edpi: 268, role: "Duelist", country: "🇫🇮" },
  { name: "astr0", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.33, edpi: 264, role: "Duelist", country: "🇵🇭" },
  { name: "Apoth", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇨🇦" },
  { name: "Wailers", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 8000, dpi: 1600, sens: 0.12, edpi: 200, role: "Duelist", country: "🇫🇷" },
  { name: "baddyG", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.33, edpi: 264, role: "Duelist", country: "🇵🇱" },
  { name: "ceNder", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.35, edpi: 140, role: "Duelist", country: "🇱🇹" },
  { name: "k1Ng", game: "Valorant", team: "Free Agent", mouse: "VAXEE E1 Wireless", hz: 1000, dpi: 400, sens: 0.38, edpi: 152, role: "Duelist", country: "🇰🇷" },
  { name: "Yassa", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇪🇬" },
  { name: "fiveK", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 4000, dpi: 400, sens: 0.48, edpi: 194, role: "Duelist", country: "🇰🇷" },
  { name: "Yacine", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇸🇪" },
  { name: "wippie", game: "Valorant", team: "Free Agent", mouse: "ZOWIE EC1-CW", hz: 1000, dpi: 1600, sens: 0.46, edpi: 736, role: "Duelist", country: "🇷🇺" },
  { name: "misu", game: "Valorant", team: "Free Agent", mouse: "Lamzu Atlantis Mini", hz: 4000, dpi: 1600, sens: 0.16, edpi: 256, role: "Duelist", country: "🇺🇸" },
  { name: "Sevkaan", game: "Valorant", team: "Free Agent", mouse: "WLMouse BEAST X Silver", hz: 8000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇩🇪" },
  { name: "jcStani", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇺🇸" },
  { name: "murizzz", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇧🇷" },
  { name: "dicey", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V3 Pro", hz: 4000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇺🇸" },
  { name: "Rap1d", game: "Valorant", team: "Free Agent", mouse: "Finalmouse Ultralight X Medium", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇰🇷" },
  { name: "Goaster", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇫🇷" },
  { name: "Drone", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.34, edpi: 251, role: "Duelist", country: "🇺🇸" },
  { name: "BORKUM", game: "Valorant", team: "Free Agent", mouse: "Pulsar X2H Mini", hz: 1000, dpi: 400, sens: 0.65, edpi: 260, role: "Duelist", country: "🇵🇭" },
  { name: "ChAlalala", game: "Valorant", team: "Free Agent", mouse: "ZOWIE FK1", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇹🇭" },
  { name: "memset", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.39, edpi: 156, role: "Duelist", country: "🇫🇷" },
  { name: "AsLanM4shadoW", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.45, edpi: 180, role: "Duelist", country: "🇹🇷" },
  { name: "jannyXD", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 400, sens: 0.52, edpi: 208, role: "Duelist", country: "🇵🇹" },
  { name: "iDex", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇧🇪" },
  { name: "jonba", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇪🇸" },
  { name: "Kongared", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.48, edpi: 388, role: "Duelist", country: "🇹🇭" },
  { name: "allow", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.23, edpi: 187, role: "Duelist", country: "🇰🇷" },
  { name: "qw1", game: "Valorant", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇹🇷" },
  { name: "ChiaWei", game: "Valorant", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 1600, sens: 0.11, edpi: 176, role: "Duelist", country: "🇹🇼" },
  { name: "Sher1o", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇪🇬" },
  { name: "szimpli", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇭🇺" },
  { name: "Foxar", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 4000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇰🇷" },
  { name: "kayle", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇲🇾" },
  { name: "Mojo", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 0.3, edpi: 480, role: "Duelist", country: "🌐" },
  { name: "aduka", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 0.21, edpi: 336, role: "Duelist", country: "🇲🇾" },
  { name: "shiba", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.3, edpi: 480, role: "Duelist", country: "🇸🇬" },
  { name: "joshh", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.38, edpi: 304, role: "Duelist", country: "🇸🇬" },
  { name: "ESMONDE", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.26, edpi: 208, role: "Duelist", country: "🇸🇬" },
  { name: "Reverie", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇸🇬" },
  { name: "Kairo", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇸🇬" },
  { name: "SeoeuN", game: "Valorant", team: "Free Agent", mouse: "", hz: 8000, dpi: 800, sens: 0.38, edpi: 304, role: "Duelist", country: "🇰🇷" },
  { name: "Aika", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇯🇵" },
  { name: "YuRiHaNa", game: "Valorant", team: "Free Agent", mouse: "", hz: 1000, dpi: 400, sens: 0.56, edpi: 226, role: "Duelist", country: "🇰🇷" },
  { name: "Healing", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.34, edpi: 274, role: "Duelist", country: "🇰🇷" },
  { name: "lenne", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇸🇬" },
  { name: "RockeT", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇪🇬" },
  { name: "Eren", game: "Valorant", team: "Free Agent", mouse: "Ninjutso X VAXEE Sora", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇨🇳" },
  { name: "AC", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V3 Pro", hz: 8000, dpi: 400, sens: 0.65, edpi: 260, role: "Duelist", country: "🇨🇳" },
  { name: "Bunt", game: "Valorant", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 800, sens: 0.31, edpi: 250, role: "Duelist", country: "🇨🇳" },
  { name: "aproto", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.31, edpi: 248, role: "Duelist", country: "🇺🇸" },
  { name: "russ", game: "Valorant", team: "Free Agent", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇹🇷" },
  { name: "Kanpeki", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇺🇸" },
  { name: "Will", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇨🇦" },
  { name: "b0i", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.47, edpi: 752, role: "Duelist", country: "🇺🇸" },
  { name: "Victor", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.28, edpi: 220, role: "Duelist", country: "🇺🇸" },
  { name: "Bazzi", game: "Valorant", team: "Free Agent", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 1600, sens: 0.17, edpi: 272, role: "Duelist", country: "🇰🇷" },
  { name: "Midi", game: "Valorant", team: "Free Agent", mouse: "WLMouse BEAST X Mini Magnesium", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇨🇳" },
  { name: "adverso", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.5, edpi: 200, role: "Duelist", country: "🇨🇱" },
  { name: "Marved", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇨🇦" },
  { name: "GodDead", game: "Valorant", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 1600, sens: 0.16, edpi: 256, role: "Duelist", country: "🇰🇷" },
  { name: "gtnziN", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.58, edpi: 232, role: "Duelist", country: "🇧🇷" },
  { name: "fl1pzjder", game: "Valorant", team: "Free Agent", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 400, sens: 0.53, edpi: 214, role: "Duelist", country: "🇮🇩" },
  { name: "ardiis", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇱🇻" },
  { name: "Redgar", game: "Valorant", team: "Free Agent", mouse: "Pulsar Xlite V3 Es", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇷🇺" },
  { name: "garnetS", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.5, edpi: 400, role: "Duelist", country: "🇹🇭" },
  { name: "Alone", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇪🇬" },
  { name: "seb", game: "Valorant", team: "Free Agent", mouse: "Xtrfy M4 Miami", hz: 1000, dpi: 400, sens: 0.42, edpi: 168, role: "Duelist", country: "🇺🇸" },
  { name: "ZexRow", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇺🇸" },
  { name: "ZachaREEE", game: "Valorant", team: "Free Agent", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 800, sens: 0.52, edpi: 416, role: "Duelist", country: "🇺🇸" },
  { name: "ngiN", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.24, edpi: 195, role: "Duelist", country: "🇹🇷" },
  { name: "Thwifo", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇺🇸" },
  { name: "psalm", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.34, edpi: 272, role: "Duelist", country: "🇺🇸" },
  { name: "foxz", game: "Valorant", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 800, sens: 0.49, edpi: 392, role: "Duelist", country: "🇹🇭" },
  { name: "Corey", game: "Valorant", team: "Free Agent", mouse: "Endgame Gear XM2we", hz: 1000, dpi: 800, sens: 0.49, edpi: 389, role: "Duelist", country: "🇺🇸" },
  { name: "mindfreak", game: "Valorant", team: "Free Agent", mouse: "VAXEE ZYGEN NP-01S Wireless", hz: 2000, dpi: 400, sens: 0.42, edpi: 168, role: "Duelist", country: "🇮🇩" },
  { name: "LOGAN", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.17, edpi: 140, role: "Duelist", country: "🇫🇷" },
  { name: "Subroza", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.28, edpi: 222, role: "Duelist", country: "🇨🇦" },
  { name: "mta", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇨🇱" },
  { name: "bes", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.28, edpi: 227, role: "Duelist", country: "🇵🇭" },
  { name: "zap", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.12, edpi: 192, role: "Duelist", country: "🇧🇷" },
  { name: "Trick", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.3, edpi: 244, role: "Duelist", country: "🇺🇸" },
  { name: "yay", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.38, edpi: 304, role: "Duelist", country: "🇺🇸" },
  { name: "BCJ", game: "Valorant", team: "Free Agent", mouse: "Fnatic x Lamzu Thorn", hz: 1000, dpi: 800, sens: 0.37, edpi: 296, role: "Duelist", country: "🇺🇸" },
  { name: "Shyy", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇨🇱" },
  { name: "soulcas", game: "Valorant", team: "Free Agent", mouse: "Lamzu Atlantis Mini Pro", hz: 4000, dpi: 1600, sens: 0.12, edpi: 194, role: "Duelist", country: "🇬🇧" },
  { name: "trexx", game: "Valorant", team: "Free Agent", mouse: "G-Wolves Hati-M White Sapphire Stardust", hz: 1000, dpi: 800, sens: 0.23, edpi: 181, role: "Duelist", country: "🇷🇺" },
  { name: "Mistic", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇬🇧" },
  { name: "xms", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇫🇷" },
  { name: "pAura", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇹🇷" },
  { name: "Melser", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.56, edpi: 224, role: "Duelist", country: "🇨🇱" },
  { name: "Sayaplayer", game: "Valorant", team: "Free Agent", mouse: "HITSCAN Hyperlight", hz: 1000, dpi: 1000, sens: 0.34, edpi: 339, role: "Duelist", country: "🇰🇷" },
  { name: "AvovA", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.17, edpi: 264, role: "Duelist", country: "🇩🇰" },
  { name: "mitch", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 8000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇺🇸" },
  { name: "Zeek", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇵🇱" },
  { name: "Kiles", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.43, edpi: 345, role: "Duelist", country: "🇺🇦" },
  { name: "curry", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.12, edpi: 192, role: "Duelist", country: "🇺🇸" },
  { name: "Zest", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Hyperspeed", hz: 1000, dpi: 400, sens: 0.56, edpi: 224, role: "Duelist", country: "🇰🇷" },
  { name: "hoody", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.63, edpi: 251, role: "Duelist", country: "🇫🇮" },
  { name: "neT", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 1600, sens: 0.11, edpi: 176, role: "Duelist", country: "🇺🇸" },
  { name: "SEIDER", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇩🇰" },
  { name: "paTiTek", game: "Valorant", team: "Free Agent", mouse: "WLMouse BEAST X", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇵🇱" },
  { name: "Boostio", game: "Valorant", team: "Free Agent", mouse: "Lamzu Maya X", hz: 8000, dpi: 800, sens: 0.23, edpi: 186, role: "Duelist", country: "🇺🇸" },
  { name: "Dispenser", game: "Valorant", team: "Free Agent", mouse: "VAXEE ZYGEN NP-01", hz: 1000, dpi: 450, sens: 0.44, edpi: 198, role: "Duelist", country: "🇵🇭" },
  { name: "exy", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.5, edpi: 201, role: "Duelist", country: "🇰🇷" },
  { name: "Esperanza", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇰🇷" },
  { name: "SuperBusS", game: "Valorant", team: "Free Agent", mouse: "Corsair M75 Air", hz: 1000, dpi: 800, sens: 0.29, edpi: 232, role: "Duelist", country: "🇹🇭" },
  { name: "PTC", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇹🇭" },
  { name: "MONSTEERR", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇨🇿" },
  { name: "gMd", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇨🇦" },
  { name: "NaturE", game: "Valorant", team: "Free Agent", mouse: "WLMouse BEAST X Silver", hz: 1000, dpi: 800, sens: 0.51, edpi: 406, role: "Duelist", country: "🇺🇸" },
  { name: "luckeRRR", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 8000, dpi: 800, sens: 0.39, edpi: 312, role: "Duelist", country: "🇩🇪" },
  { name: "Turko", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇹🇷" },
  { name: "Suggest", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇰🇷" },
  { name: "nico", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.4, edpi: 160, role: "Duelist", country: "🇩🇪" },
  { name: "Moothie", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Hyperspeed", hz: 1000, dpi: 400, sens: 0.45, edpi: 180, role: "Duelist", country: "🇰🇷" },
  { name: "hype", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇱🇹" },
  { name: "HyP", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 3200, sens: 0.09, edpi: 278, role: "Duelist", country: "🇫🇷" },
  { name: "Yurii", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇪🇸" },
  { name: "falltw", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 0.38, edpi: 302, role: "Duelist", country: "🇷🇺" },
  { name: "iluri", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇫🇮" },
  { name: "MOJJ", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.6, edpi: 240, role: "Duelist", country: "🇹🇷" },
  { name: "Obnoks", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.33, edpi: 131, role: "Duelist", country: "🇩🇪" },
  { name: "murii", game: "Valorant", team: "Free Agent", mouse: "G-Wolves Hati S+ 4K", hz: 1000, dpi: 800, sens: 0.38, edpi: 300, role: "Duelist", country: "🇩🇪" },
  { name: "DaviH", game: "Valorant", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇵🇹" },
  { name: "elllement", game: "Valorant", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 1600, sens: 0.22, edpi: 352, role: "Duelist", country: "🇷🇸" },
  { name: "QutionerX", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 0.21, edpi: 171, role: "Duelist", country: "🇹🇷" },
  { name: "Kicks", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇪🇪" },
  { name: "OLIZERA", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇵🇹" },
  { name: "aNguiSt", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 2000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇬🇧" },
  { name: "Rico", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇰🇷" },
  { name: "icy", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 1600, sens: 0.15, edpi: 248, role: "Duelist", country: "🇺🇸" },
  { name: "ban", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇰🇷" },
  { name: "TheBigFiz", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.41, edpi: 164, role: "Duelist", country: "🇫🇷" },
  { name: "Akumaaaaaaa", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.8, edpi: 320, role: "Duelist", country: "🇫🇷" },
  { name: "Ache", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 1600, sens: 0.17, edpi: 272, role: "Duelist", country: "🇯🇵" },
  { name: "Dingwei", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 1600, sens: 0.12, edpi: 187, role: "Duelist", country: "🇹🇼" },
  { name: "Shion7", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇨🇳" },
  { name: "ninebody", game: "Valorant", team: "Free Agent", mouse: "VAXEE XE-S Wireless", hz: 1000, dpi: 800, sens: 0.45, edpi: 360, role: "Duelist", country: "🇨🇳" },
  { name: "kawaii", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 500, sens: 0.1, edpi: 50, role: "Duelist", country: "🇨🇳" },
  { name: "CLZ", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇯🇵" },
  { name: "flyuh", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.36, edpi: 290, role: "Duelist", country: "🇺🇸" },
  { name: "Jinboong", game: "Valorant", team: "Free Agent", mouse: "VAXEE ZYGEN NP-01S Wireless", hz: 4000, dpi: 800, sens: 0.3, edpi: 240, role: "Duelist", country: "🇰🇷" },
  { name: "TZH", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇳" },
  { name: "XiYiJi", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇨🇳" },
  { name: "tdawgg", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 232, role: "Duelist", country: "🇺🇸" },
  { name: "Guardy", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 0.14, edpi: 224, role: "Duelist", country: "🇪🇸" },
  { name: "Pika", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 8000, dpi: 1600, sens: 0.18, edpi: 288, role: "Duelist", country: "🇦🇷" },
  { name: "ZachKappa", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇬🇧" },
  { name: "Pa1nt", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.15, edpi: 248, role: "Duelist", country: "🇺🇸" },
  { name: "Paincakes", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 0.29, edpi: 232, role: "Duelist", country: "🇺🇸" },
  { name: "spaz", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.41, edpi: 328, role: "Duelist", country: "🇺🇸" },
  { name: "Estrella", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.55, edpi: 220, role: "Duelist", country: "🇰🇷" },
  { name: "Lime", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 1600, sens: 0.17, edpi: 274, role: "Duelist", country: "🇬🇧" },
  { name: "Miko", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇰🇷" },
  { name: "R4M", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.38, edpi: 304, role: "Duelist", country: "🇯🇵" },
  { name: "VASQUEZ", game: "Valorant", team: "Free Agent", mouse: "ZOWIE U2-DW", hz: 4000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇹🇷" },
  { name: "YamZzi", game: "Valorant", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 2000, dpi: 400, sens: 0.52, edpi: 208, role: "Duelist", country: "🇰🇷" },
  { name: "miNt", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2c", hz: 4000, dpi: 1600, sens: 0.18, edpi: 288, role: "Duelist", country: "🇰🇷" },
  { name: "Block", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇪🇬" },
  { name: "Persia", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.27, edpi: 216, role: "Duelist", country: "🇰🇷" },
  { name: "Surf", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.14, edpi: 232, role: "Duelist", country: "🇹🇭" },
  { name: "Khalil", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 0.21, edpi: 336, role: "Duelist", country: "🇧🇷" },
  { name: "Zander", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 4000, dpi: 1600, sens: 0.08, edpi: 128, role: "Duelist", country: "🇨🇦" },
  { name: "HUYNH", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.32, edpi: 256, role: "Duelist", country: "🇨🇦" },
  { name: "xenom", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 800, sens: 0.22, edpi: 176, role: "Duelist", country: "🇧🇷" },
  { name: "Sayf", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇸🇪" },
  { name: "MOLSI", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.16, edpi: 256, role: "Duelist", country: "🇵🇱" },
  { name: "heat", game: "Valorant", team: "Free Agent", mouse: "Pulsar X2H Es", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "tuyz", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 8000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇧🇷" },
  { name: "florescent", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 1600, sens: 0.17, edpi: 280, role: "Duelist", country: "🇨🇦" },
  { name: "AwayK", game: "Valorant", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 1600, sens: 0.05, edpi: 80, role: "Duelist", country: "🇰🇷" },
  { name: "d3mur", game: "Valorant", team: "Free Agent", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 4000, dpi: 800, sens: 0.25, edpi: 200, role: "Duelist", country: "🇹🇷" },
  { name: "bucher", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.2, edpi: 160, role: "Duelist", country: "🇩🇪" },
  { name: "derrek", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 800, sens: 0.34, edpi: 272, role: "Duelist", country: "🇺🇸" },
  { name: "lowel", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 0.57, edpi: 226, role: "Duelist", country: "🇪🇸" },
  { name: "neptuNo", game: "Valorant", team: "Free Agent", mouse: "Lamzu Atlantis Mini", hz: 1000, dpi: 800, sens: 0.28, edpi: 224, role: "Duelist", country: "🇪🇸" },
  { name: "Moose", game: "Valorant", team: "Free Agent", mouse: "Lamzu Maya X", hz: 8000, dpi: 800, sens: 0.33, edpi: 264, role: "Duelist", country: "🇨🇦" },
  { name: "Ambi", game: "Valorant", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.41, edpi: 164, role: "Duelist", country: "🇨🇿" },
  { name: "n1zzy", game: "Valorant", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 4000, dpi: 800, sens: 0.67, edpi: 533, role: "Duelist", country: "🇻🇳" },
  { name: "XAROLA", game: "Valorant", team: "Content", mouse: "Razer Deathadder V3 Pro", hz: 4000, dpi: 1600, sens: 0.2, edpi: 320, role: "Duelist", country: "🇧🇷" },
  { name: "Hiko", game: "Valorant", team: "Content", mouse: "WLMouse BEAST X Mini", hz: 1000, dpi: 1600, sens: 0.36, edpi: 576, role: "Duelist", country: "🇺🇸" },
  { name: "Doenmo", game: "Valorant", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.29, edpi: 230, role: "Duelist", country: "🇰🇷" },
  { name: "L1NK", game: "Valorant", team: "Content", mouse: "VAXEE XE Wireless", hz: 1000, dpi: 800, sens: 0.24, edpi: 192, role: "Duelist", country: "🇬🇧" },
  { name: "Fragstube", game: "Valorant", team: "Content", mouse: "NZXT Lift Elite", hz: 1000, dpi: 800, sens: 0.31, edpi: 251, role: "Duelist", country: "🇩🇪" },
  { name: "aco", game: "Valorant", team: "Content", mouse: "Lamzu Atlantis", hz: 1000, dpi: 400, sens: 0.8, edpi: 320, role: "Duelist", country: "🇯🇵" },
  { name: "Surugamonkey", game: "Valorant", team: "Content", mouse: "Corsair M75 Wireless", hz: 1000, dpi: 1600, sens: 0.18, edpi: 283, role: "Duelist", country: "🇯🇵" },
  { name: "takej", game: "Valorant", team: "Content", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 1600, sens: 0.15, edpi: 240, role: "Duelist", country: "🇯🇵" },
  { name: "sinatraa", game: "Valorant", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 0.39, edpi: 310, role: "Duelist", country: "🇺🇸" },
  { name: "Dizzy", game: "Valorant", team: "Content", mouse: "Endgame Gear OP1 8k", hz: 2000, dpi: 800, sens: 0.35, edpi: 280, role: "Duelist", country: "🇺🇸" },
  { name: "xand", game: "Valorant", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 0.25, edpi: 400, role: "Duelist", country: "🇧🇷" },
  { name: "Vorwenn", game: "Valorant", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 0.4, edpi: 320, role: "Duelist", country: "🇪🇸" },
  { name: "Kyedae", game: "Valorant", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 0.12, edpi: 192, role: "Duelist", country: "🇨🇦" },
  { name: "Drakonz", game: "Valorant", team: "Content", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 0.35, edpi: 275, role: "Duelist", country: "🇧🇷" },
  { name: "zombs", game: "Valorant", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 0.54, edpi: 216, role: "Duelist", country: "🇺🇸" },
  { name: "Horcus", game: "Valorant", team: "Content", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 800, sens: 0.32, edpi: 252, role: "Duelist", country: "🇪🇸" },
  { name: "aimdll", game: "Valorant", team: "Content", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.47, edpi: 188, role: "Duelist", country: "🇹🇷" },
  { name: "TenZ", game: "Valorant", team: "Content", mouse: "Pulsar TenZ Signature Edition", hz: 1000, dpi: 1600, sens: 0.1, edpi: 160, role: "Duelist", country: "🇨🇦" },
  { name: "iNTRO", game: "Valorant", team: "Retired", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 0.43, edpi: 173, role: "Duelist", country: "🇰🇷" },
  // ─── FORTNITE: 262 players from prosettings.net (verified Feb 2026) ───
  { name: "Bucke", game: "Fortnite", team: "Dignitas", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 12, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "OliverOG", game: "Fortnite", team: "Dignitas", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.6, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Khanada", game: "Fortnite", team: "Dignitas", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Cooper", game: "Fortnite", team: "Dignitas", mouse: "WLMouse YING", hz: 1000, dpi: 1600, sens: 2.9, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "TaySon", game: "Fortnite", team: "Falcons Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇸🇮" },
  { name: "Japko", game: "Fortnite", team: "Falcons Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 12, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Peterbot", game: "Fortnite", team: "Falcons Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇭🇺" },
  { name: "pollofn", game: "Fortnite", team: "Falcons Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇲🇽" },
  { name: "ilyynina", game: "Fortnite", team: "XSET", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Veno", game: "Fortnite", team: "XSET", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "MrSavage", game: "Fortnite", team: "XSET", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 9.1, edpi: null, role: "Solo", country: "🇳🇴" },
  { name: "Batman Bugha", game: "Fortnite", team: "XSET", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 5.7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Clix", game: "Fortnite", team: "XSET", mouse: "Finalmouse Ultralight X", hz: 1000, dpi: 800, sens: 8.7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Muz", game: "Fortnite", team: "XSET", mouse: "Lamzu Maya X", hz: 1000, dpi: 1600, sens: 3.5, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Kjaer", game: "Fortnite", team: "Manchester City Esports", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 6.5, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "cold", game: "Fortnite", team: "Twisted Minds", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Nikof", game: "Fortnite", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 4.5, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Gotaga", game: "Fortnite", team: "Gentle Mates", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 400, sens: 16, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Vanyak3kk", game: "Fortnite", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 7.1, edpi: null, role: "Solo", country: "🇺🇦" },
  { name: "Merstach", game: "Fortnite", team: "Gentle Mates", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 3.3, edpi: null, role: "Solo", country: "🇱🇻" },
  { name: "MariusCOW", game: "Fortnite", team: "Gentle Mates", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7.2, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Queasy", game: "Fortnite", team: "Team Vitality", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇷🇸" },
  { name: "Swizzy", game: "Fortnite", team: "Team Vitality", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.5, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "vicotryona", game: "Fortnite", team: "BIG", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 5, edpi: null, role: "Solo", country: "🇦🇹" },
  { name: "Volko", game: "Fortnite", team: "BIG", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7.7, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Malibuca", game: "Fortnite", team: "BIG", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 1600, sens: 4, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "Eomzo", game: "Fortnite", team: "Elite Esports", mouse: "Finalmouse Ultralight X Prophecy Clix Small", hz: 1000, dpi: 800, sens: 6.6, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Hris", game: "Fortnite", team: "BK ROG Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 8.2, edpi: null, role: "Solo", country: "🇲🇰" },
  { name: "kurtz", game: "Fortnite", team: "w7m esports", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 4.5, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Pulga", game: "Fortnite", team: "w7m esports", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 3200, sens: 14, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Clone", game: "Fortnite", team: "KPI Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 4.7, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Jannis", game: "Fortnite", team: "CGN Esports", mouse: "Corsair Sabre v2 Pro", hz: 1000, dpi: 800, sens: 6.6, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Koyota", game: "Fortnite", team: "ZETA DIVISION", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇯🇵" },
  { name: "Vadeal", game: "Fortnite", team: "Wave Esports", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Rezon ay", game: "Fortnite", team: "Wave Esports", mouse: "Corsair M55 RGB Pro", hz: 1000, dpi: 1600, sens: 2.6, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Pumpkin", game: "Fortnite", team: "JFT Esports", mouse: "Lamzu Maya X", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "LOLiTO FDEZ", game: "Fortnite", team: "Giants", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 9.2, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Jesse", game: "Fortnite", team: "X2 Twins", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 12, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Jordan", game: "Fortnite", team: "X2 Twins", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 5.7, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Hamlinz", game: "Fortnite", team: "NRG", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 10.1, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Ritual", game: "Fortnite", team: "Gen.G", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.4, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "CouRage", game: "Fortnite", team: "100 Thieves", mouse: "Razer DeathAdder V2", hz: 1000, dpi: 800, sens: 9, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Momsy", game: "Fortnite", team: "Solary", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 4, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Eclipse27", game: "Fortnite", team: "FLC", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "F1N4IK", game: "Fortnite", team: "FLC", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 2.7, edpi: null, role: "Solo", country: "🇺🇦" },
  { name: "Rabbit", game: "Fortnite", team: "Fractious Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 8.2, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Volx", game: "Fortnite", team: "PWR", mouse: "ZOWIE U2-DW", hz: 1000, dpi: 800, sens: 4.5, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "resignz", game: "Fortnite", team: "PWR", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.3, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "anon", game: "Fortnite", team: "PWR", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.1, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Worthy", game: "Fortnite", team: "PWR", mouse: "ZOWIE U2", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "alex", game: "Fortnite", team: "PWR", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Flickzy", game: "Fortnite", team: "Team Aight", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 3.3, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Hijoe", game: "Fortnite", team: "Team Aight", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.5, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Laizen", game: "Fortnite", team: "Paps Esport", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 8.3, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "GMoney", game: "Fortnite", team: "2AM Esports", mouse: "Alienware AW2725DF", hz: 1000, dpi: 1600, sens: 3.2, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Kchorro", game: "Fortnite", team: "2AM Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 12, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Avivv", game: "Fortnite", team: "2AM Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.9, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Piz", game: "Fortnite", team: "Samsung Morning Stars", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "Sky", game: "Fortnite", team: "Atlantic", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 5.5, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Scroll", game: "Fortnite", team: "Atlantic", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Snayzy", game: "Fortnite", team: "Team Havok", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6.8, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "IDROP", game: "Fortnite", team: "Team Havok", mouse: "FinalMouse Starlight Pro", hz: 1000, dpi: 1600, sens: 5, edpi: null, role: "Solo", country: "🇳🇴" },
  { name: "Pixie", game: "Fortnite", team: "Team Havok", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "Wox", game: "Fortnite", team: "Team Havok", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.6, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "pixx", game: "Fortnite", team: "Team Havok", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 6.9, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Vergo", game: "Fortnite", team: "Witness The Journey", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 4.1, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Kami", game: "Fortnite", team: "Al Qadsiah Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 9, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "cxltures", game: "Fortnite", team: "Xen", mouse: "Xtrfy M42 Wireless", hz: 1000, dpi: 800, sens: 7.2, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Fazer", game: "Fortnite", team: "ShindeN", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇦🇷" },
  { name: "Hero", game: "Fortnite", team: "Al Ula", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 9, edpi: null, role: "Solo", country: "🇸🇦" },
  { name: "Adapter", game: "Fortnite", team: "Al Ula", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 9, edpi: null, role: "Solo", country: "🇸🇦" },
  { name: "FKS", game: "Fortnite", team: "Al Ula", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇸🇦" },
  { name: "Stryker", game: "Fortnite", team: "Gremio Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 9, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Stizo", game: "Fortnite", team: "GameWard", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Emad", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 6.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Chapix", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 3.7, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "MackWood", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 8.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "nosh", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Commandment", game: "Fortnite", team: "Free Agent", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Stompy", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇦🇹" },
  { name: "LuLuzito", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 400, sens: 12, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "letw1k3", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 4.5, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "blackoutz", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 4800, sens: 1, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Lixium", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 4.4, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Skvii", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1200, sens: 3.3, edpi: null, role: "Solo", country: "🇷🇸" },
  { name: "Mesportt", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "vaxsr", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Chimperatie", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7.2, edpi: null, role: "Solo", country: "🇦🇱" },
  { name: "spitflow", game: "Fortnite", team: "Free Agent", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 800, sens: 10, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Rabid", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "Jeyy", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 4.5, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Dukez", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.5, edpi: null, role: "Solo", country: "🇲🇽" },
  { name: "Ryux", game: "Fortnite", team: "Free Agent", mouse: "SteelSeries Rival 310", hz: 1000, dpi: 400, sens: 9, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Rehx", game: "Fortnite", team: "Free Agent", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Deyy", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 9, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "H1ghsky1", game: "Fortnite", team: "Free Agent", mouse: "SteelSeries Aerox 3 Wireless", hz: 1000, dpi: 800, sens: 8.4, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "AstroSMZ", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 6.5, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "Adn", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 4.8, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "Jelty", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇲🇽" },
  { name: "edsonmalado", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 8.5, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Chap", game: "Fortnite", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 6, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Wheat", game: "Fortnite", team: "Free Agent", mouse: "WLMouse BEAST X Silver", hz: 1000, dpi: 1600, sens: 5.5, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "Flikk", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 7.1, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Miro", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.5, edpi: null, role: "Solo", country: "🇳🇱" },
  { name: "Waiz", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "klownski", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.2, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "Tinka", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Bloomy", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "Zara", game: "Fortnite", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 10.2, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "bevvys", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper Mini", hz: 1000, dpi: 800, sens: 4.7, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "Germán62hz", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 600, sens: 28, edpi: null, role: "Solo", country: "🇦🇷" },
  { name: "Arc", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.1, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "Kwanti", game: "Fortnite", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 6.6, edpi: null, role: "Solo", country: "🇻🇳" },
  { name: "JulianCoM", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.8, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Toose", game: "Fortnite", team: "Free Agent", mouse: "Pulsar X2 Mini", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "Nebs", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "Yasir", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 4, edpi: null, role: "Solo", country: "🇲🇽" },
  { name: "kaykywhale", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 8.2, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Leleo", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 9.3, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Thiefs", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 7.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Nate Hill", game: "Fortnite", team: "Free Agent", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Endretta", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper Mini", hz: 1000, dpi: 400, sens: 10.6, edpi: null, role: "Solo", country: "🇳🇴" },
  { name: "Marksman", game: "Fortnite", team: "Free Agent", mouse: "Logitech G403 HERO", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Anas", game: "Fortnite", team: "Free Agent", mouse: "HyperX Pulsefire Haste", hz: 1000, dpi: 1450, sens: 5, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Cented", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 7.2, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Aspect", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.5, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Andilex", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 700, sens: 9, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "pgod", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇵🇪" },
  { name: "Refsgaard", game: "Fortnite", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 6.9, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Shamokiy", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 3.5, edpi: null, role: "Solo", country: "🇧🇾" },
  { name: "Robban", game: "Fortnite", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 3, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "vexi", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Thiagin", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 3.4, edpi: null, role: "Solo", country: "🇦🇷" },
  { name: "Vortexia", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 2.7, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "deymo", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "czb", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "sanjog", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 5.4, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Werex", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 9.5, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Skailer", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.5, edpi: null, role: "Solo", country: "🇨🇿" },
  { name: "Ucra", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.8, edpi: null, role: "Solo", country: "🇺🇦" },
  { name: "Kovaak", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 10.1, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Stormyrite", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 7.5, edpi: null, role: "Solo", country: "🇺🇦" },
  { name: "Arrow", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Hyperspeed", hz: 1000, dpi: 800, sens: 4.8, edpi: null, role: "Solo", country: "🌐" },
  { name: "Fnajen", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "Felipersa", game: "Fortnite", team: "Free Agent", mouse: "Razer DeathAdder V3", hz: 1000, dpi: 3850, sens: 1, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Sandrinho", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇵🇹" },
  { name: "Mojak", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 5.6, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Kyry", game: "Fortnite", team: "Free Agent", mouse: "Razer DeathAdder V3 HyperSpeed", hz: 1000, dpi: 1600, sens: 4, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "Asa", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇦🇹" },
  { name: "Mappi", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 3, edpi: null, role: "Solo", country: "🇸🇪" },
  { name: "L0WK3Y", game: "Fortnite", team: "Free Agent", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 800, sens: 5.9, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "1LUSHA", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 7.3, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "27twi", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 600, sens: 6, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "KramSu", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 33.6, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Ardi", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.3, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "P1NG", game: "Fortnite", team: "Free Agent", mouse: "Razer DeathAdder V3 Pro", hz: 1000, dpi: 800, sens: 5, edpi: null, role: "Solo", country: "🇺🇦" },
  { name: "Kiro", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇳🇱" },
  { name: "Gabzera", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 2.5, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Mikson", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 8.5, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Bugha", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "kombek", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 4.2, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Phzin", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Oatley", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Th0masHD", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 5, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Vaske1x", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇷🇸" },
  { name: "SEYYTO", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Reet", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Marco", game: "Fortnite", team: "Free Agent", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 1600, sens: 6.4, edpi: null, role: "Solo", country: "🇫🇮" },
  { name: "PodaSai", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 2.5, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "artskill", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 1600, sens: 6.4, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Noahreyli", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 11, edpi: null, role: "Solo", country: "🇨🇭" },
  { name: "Calc", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 7.8, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Snacky", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 4.7, edpi: null, role: "Solo", country: "🇲🇽" },
  { name: "Chico", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6.2, edpi: null, role: "Solo", country: "🇧🇦" },
  { name: "Ajerss", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6.6, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Kirwa", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 10, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "nickzrr", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 1600, sens: 7, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "KBR", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Lequy", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.6, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "cyrzr", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 8, edpi: null, role: "Solo", country: "🇲🇽" },
  { name: "Seeyun", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 8.6, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "QnDx", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 9.5, edpi: null, role: "Solo", country: "🌐" },
  { name: "Doniee", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "TruleX", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 12.3, edpi: null, role: "Solo", country: "🇷🇸" },
  { name: "noaggs", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1200, sens: 5.2, edpi: null, role: "Solo", country: "🇨🇭" },
  { name: "J4vix", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper 8KHz", hz: 1000, dpi: 800, sens: 6.2, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Rad3on", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 5, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "juu", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "DeATH", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇩🇴" },
  { name: "npen", game: "Fortnite", team: "Free Agent", mouse: "Flick Fire", hz: 1000, dpi: 1600, sens: 3.2, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "916Gon", game: "Fortnite", team: "Free Agent", mouse: "Endgame Gear OP1w 4K", hz: 1000, dpi: 1600, sens: 4, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Demus", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 7.3, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Phantom2x", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇸🇦" },
  { name: "kayd", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 9.7, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "Layn", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 2.9, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Velo", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "Cazi", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 5, edpi: null, role: "Solo", country: "🇳🇿" },
  { name: "Setty", game: "Fortnite", team: "Free Agent", mouse: "WLMouse BEAST X", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Predage", game: "Fortnite", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.9, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "Pxlarized", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 4.6, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Jarko", game: "Fortnite", team: "Free Agent", mouse: "Corsair Sabre v2 Pro", hz: 1000, dpi: 800, sens: 5, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Ricbor", game: "Fortnite", team: "Free Agent", mouse: "Corsair Sabre v2 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "AsianJeff", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "K1NG", game: "Fortnite", team: "Free Agent", mouse: "WLMouse BEAST X", hz: 1000, dpi: 800, sens: 8.6, edpi: null, role: "Solo", country: "🇦🇷" },
  { name: "acorn", game: "Fortnite", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 3.3, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Sceptic", game: "Fortnite", team: "Content", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 800, sens: 8.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Milan", game: "Fortnite", team: "Content", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 800, sens: 8.8, edpi: null, role: "Solo", country: "🇳🇱" },
  { name: "Pate1k", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6.3, edpi: null, role: "Solo", country: "🇳🇴" },
  { name: "Marz", game: "Fortnite", team: "Content", mouse: "Razer DeathAdder Elite", hz: 1000, dpi: 800, sens: 8.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Animal", game: "Fortnite", team: "Content", mouse: "FinalMouse Air58 Ninja CBR", hz: 1000, dpi: 400, sens: 12.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Dakotaz", game: "Fortnite", team: "Content", mouse: "Logitech G502 HERO", hz: 1000, dpi: 2400, sens: 6.7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Skram", game: "Fortnite", team: "Content", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇩🇰" },
  { name: "Sharshock", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇧🇷" },
  { name: "Jur3ky", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 2000, sens: 4, edpi: null, role: "Solo", country: "🇭🇷" },
  { name: "Kiryache32", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "clarityG", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6.3, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Avxry", game: "Fortnite", team: "Content", mouse: "FinalMouse Ultralight Phantom", hz: 1000, dpi: 800, sens: 7.3, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Tfue", game: "Fortnite", team: "Content", mouse: "FinalMouse Starlight Pro", hz: 1000, dpi: 400, sens: 7.1, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Kinstaar", game: "Fortnite", team: "Content", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 400, sens: 14, edpi: null, role: "Solo", country: "🇨🇭" },
  { name: "Punisher", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 13, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "Stretch", game: "Fortnite", team: "Content", mouse: "FinalMouse Ultralight Phantom", hz: 1000, dpi: 400, sens: 12.6, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "72hrs", game: "Fortnite", team: "Content", mouse: "ZOWIE S2 Divina", hz: 1000, dpi: 400, sens: 13, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "itsJerian", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6.2, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "KenBeans", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 3.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Megga", game: "Fortnite", team: "Content", mouse: "SteelSeries Rival 3", hz: 1000, dpi: 1600, sens: 2.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "MehDitDonc", game: "Fortnite", team: "Content", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: 7.5, edpi: null, role: "Solo", country: "🇫🇷" },
  { name: "DrLupo", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "aqua", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 5.8, edpi: null, role: "Solo", country: "🇦🇹" },
  { name: "FadedPigeon47", game: "Fortnite", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.2, edpi: null, role: "Solo", country: "🇷🇴" },
  { name: "Typical Gamer", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Reverse2k", game: "Fortnite", team: "Content", mouse: "FinalMouse Air58 Ninja CBR", hz: 1000, dpi: 800, sens: 11.2, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Zayt", game: "Fortnite", team: "Content", mouse: "ZOWIE FK1+-B Divina", hz: 1000, dpi: 800, sens: 3.3, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Kreo", game: "Fortnite", team: "Content", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 7.5, edpi: null, role: "Solo", country: "🇭🇰" },
  { name: "Unknown", game: "Fortnite", team: "Content", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 400, sens: 11.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "DiegoGB", game: "Fortnite", team: "Content", mouse: "Glorious Model O", hz: 1000, dpi: 800, sens: 12, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "MarkiLokuras", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1150, sens: 12, edpi: null, role: "Solo", country: "🇪🇸" },
  { name: "Teeqzy", game: "Fortnite", team: "Content", mouse: "WLMouse BEAST X Mini", hz: 1000, dpi: 400, sens: 12, edpi: null, role: "Solo", country: "🇧🇪" },
  { name: "Fresh", game: "Fortnite", team: "Content", mouse: "FinalMouse Air58 Ninja CBR", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "POW3R", game: "Fortnite", team: "Content", mouse: "VAXEE ZYGEN NP-01", hz: 1000, dpi: 400, sens: 11.6, edpi: null, role: "Solo", country: "🇮🇹" },
  { name: "Jacob", game: "Fortnite", team: "Content", mouse: "SteelSeries Aerox 5 Wireless", hz: 1000, dpi: 800, sens: 8.7, edpi: null, role: "Solo", country: "🇵🇱" },
  { name: "Raider464", game: "Fortnite", team: "Content", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 400, sens: 16, edpi: null, role: "Solo", country: "🇩🇪" },
  { name: "Myth", game: "Fortnite", team: "Content", mouse: "Logitech G703", hz: 1000, dpi: 700, sens: 3.1, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Wraxx", game: "Fortnite", team: "Content", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇨🇿" },
  { name: "Nick Eh 30", game: "Fortnite", team: "Content", mouse: "Razer Viper Mini", hz: 1000, dpi: 2000, sens: 10, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Ninja", game: "Fortnite", team: "Content", mouse: "Finalmouse Ultralight X Prophecy Clix Small", hz: 1000, dpi: 800, sens: 5.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Sommerset", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "MOTOR", game: "Fortnite", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇹🇷" },
  { name: "Ceice", game: "Fortnite", team: "Content", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 8, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "HaloBT", game: "Fortnite", team: "Content", mouse: "Logitech G502 X", hz: 1000, dpi: 200, sens: 17, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "McCreamy", game: "Fortnite", team: "Content", mouse: "Razer DeathAdder Elite", hz: 1000, dpi: 400, sens: 13, edpi: null, role: "Solo", country: "🇦🇺" },
  { name: "Zemie", game: "Fortnite", team: "Content", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 5.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "EpikWhale", game: "Fortnite", team: "Content", mouse: "Endgame Gear XM2we", hz: 1000, dpi: 800, sens: 7, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Stable Ronaldo", game: "Fortnite", team: "Content", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 800, sens: 5.2, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Replays", game: "Fortnite", team: "Content", mouse: "Glorious Model O", hz: 1000, dpi: 1200, sens: 10, edpi: null, role: "Solo", country: "🇨🇦" },
  { name: "Martoz", game: "Fortnite", team: "Content", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇳🇱" },
  { name: "SypherPK", game: "Fortnite", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 16, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Mongraal", game: "Fortnite", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1600, sens: 3.2, edpi: null, role: "Solo", country: "🇬🇧" },
  { name: "premfn", game: "Fortnite", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6.4, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Jamside", game: "Fortnite", team: "Content", mouse: "Logitech G502 Wireless", hz: 1000, dpi: 800, sens: 7.3, edpi: null, role: "Solo", country: "🇷🇺" },
  { name: "Riversan", game: "Fortnite", team: "Retired", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 6.5, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "Dubs", game: "Fortnite", team: "Retired", mouse: "FinalMouse Air58 Ninja CBB", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇺🇸" },
  { name: "nyhrox", game: "Fortnite", team: "Retired", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: null, role: "Solo", country: "🇳🇴" },
  // ─── LOL: 92 players from prosettings.net (verified Feb 2026) ───
  { name: "Hylissang", game: "LoL", team: "Team Vitality", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇧🇬" },
  { name: "Carzzy", game: "LoL", team: "Team Vitality", mouse: "Razer Basilisk V3 Pro", hz: 1000, dpi: 1900, sens: null, edpi: null, role: "Mid", country: "🇨🇿" },
  { name: "Larssen", game: "LoL", team: "Natus Vincere", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 3200, sens: null, edpi: null, role: "Mid", country: "🇸🇪" },
  { name: "Caps", game: "LoL", team: "G2 Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 3200, sens: null, edpi: null, role: "Mid", country: "🇩🇰" },
  { name: "BrokenBlade", game: "LoL", team: "G2 Esports", mouse: "Corsair MM300", hz: 1000, dpi: 2400, sens: null, edpi: null, role: "Mid", country: "🇩🇪" },
  { name: "Hans Sama", game: "LoL", team: "G2 Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1400, sens: null, edpi: null, role: "Mid", country: "🇫🇷" },
  { name: "CoreJJ", game: "LoL", team: "Team Liquid", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 1500, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Morgan", game: "LoL", team: "Team Liquid", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1400, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "JoJo", game: "LoL", team: "FURIA", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 850, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "Guigo", game: "LoL", team: "FURIA", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 1500, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "Tutsz", game: "LoL", team: "FURIA", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 1500, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "Tatu", game: "LoL", team: "FURIA", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 850, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "Ayu", game: "LoL", team: "FURIA", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "Zven", game: "LoL", team: "Cloud9", mouse: "HyperX Fury S Speed Edition", hz: 1000, dpi: 2400, sens: null, edpi: null, role: "Mid", country: "🇩🇰" },
  { name: "Upset", game: "LoL", team: "Fnatic", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 2100, sens: null, edpi: null, role: "Mid", country: "🇩🇪" },
  { name: "Bin", game: "LoL", team: "Bilibili Gaming", mouse: "SteelSeries Rival 310", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇨🇳" },
  { name: "shad0w", game: "LoL", team: "Bilibili Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇮🇹" },
  { name: "Beichuan", game: "LoL", team: "Bilibili Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇨🇳" },
  { name: "Knight", game: "LoL", team: "Bilibili Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇨🇳" },
  { name: "ON", game: "LoL", team: "Bilibili Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇨🇳" },
  { name: "Viper", game: "LoL", team: "Bilibili Gaming", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Pyosik", game: "LoL", team: "Kwangdong Freecs", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Bulldog", game: "LoL", team: "Kwangdong Freecs", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "DuDu", game: "LoL", team: "Kwangdong Freecs", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1050, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "deokdam", game: "LoL", team: "Kwangdong Freecs", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Peter", game: "LoL", team: "Kwangdong Freecs", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Clozer", game: "LoL", team: "Kwangdong Freecs", mouse: "ROCCAT Kone Pure Ultra", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Zeus", game: "LoL", team: "Hanwha Life Esports", mouse: "Razer Deathadder V2 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Zeka", game: "LoL", team: "Hanwha Life Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 650, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Delight", game: "LoL", team: "Hanwha Life Esports", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 750, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Gumayusi", game: "LoL", team: "Hanwha Life Esports", mouse: "Corsair Sabre V2 Pro CF", hz: 1000, dpi: 900, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "PowerOfEvil", game: "LoL", team: "Eintracht Spandau", mouse: "Logitech G903", hz: 1000, dpi: 2200, sens: null, edpi: null, role: "Mid", country: "🇩🇪" },
  { name: "Czekolad", game: "LoL", team: "Barca Esports", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 3000, sens: null, edpi: null, role: "Mid", country: "🇵🇱" },
  { name: "Quad", game: "LoL", team: "FlyQuest", mouse: "RTX 4070 Ti Super", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Massu", game: "LoL", team: "FlyQuest", mouse: "RTX 4070 Ti Super", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇨🇦" },
  { name: "Busio", game: "LoL", team: "FlyQuest", mouse: "RTX 4070 Ti Super", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇺🇸" },
  { name: "frosty", game: "LoL", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 2100, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "Curse", game: "LoL", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1680, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "Kaze", game: "LoL", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇦🇷" },
  { name: "Rabelo", game: "LoL", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "fNb", game: "LoL", team: "RED Canids", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 1580, sens: null, edpi: null, role: "Mid", country: "🇧🇷" },
  { name: "White", game: "LoL", team: "Unicorns of Love", mouse: "Razer Basilisk V3 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇫🇷" },
  { name: "Alvaro", game: "LoL", team: "KOI", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇪🇸" },
  { name: "supa", game: "LoL", team: "KOI", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇪🇸" },
  { name: "Elyoya", game: "LoL", team: "KOI", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 1000, sens: null, edpi: null, role: "Mid", country: "🇪🇸" },
  { name: "Myrwn", game: "LoL", team: "KOI", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇪🇸" },
  { name: "Nisqy", game: "LoL", team: "Karmine Corp", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇧🇪" },
  { name: "Lucid", game: "LoL", team: "Dplus KIA", mouse: "Logitech G Pro 2 LIGHTSPEED", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Beryl", game: "LoL", team: "Dplus KIA", mouse: "Logitech G403 HERO", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Showmaker", game: "LoL", team: "Dplus KIA", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 2500, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Siwoo", game: "LoL", team: "Dplus KIA", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Kaiwing", game: "LoL", team: "Keyd Stars", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇹🇼" },
  { name: "HongQ", game: "LoL", team: "JD Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇹🇼" },
  { name: "Eika", game: "LoL", team: "Gentle Mates", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇫🇷" },
  { name: "Tactical", game: "LoL", team: "Luminosity", mouse: "Logitech G703", hz: 1000, dpi: 2100, sens: null, edpi: null, role: "Mid", country: "🇺🇸" },
  { name: "Keria", game: "LoL", team: "T1", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Faker", game: "LoL", team: "T1", mouse: "Razer Viper V4 Pro", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "PerfecT", game: "LoL", team: "KT Rolster", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Cuzz", game: "LoL", team: "KT Rolster", mouse: "Logitech G305", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Aiming", game: "LoL", team: "KT Rolster", mouse: "Logitech G903", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Pollu", game: "LoL", team: "KT Rolster", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1200, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Zanzarah", game: "LoL", team: "Eintracht Frankfurt", mouse: "Logitech G703", hz: 1000, dpi: 1300, sens: null, edpi: null, role: "Mid", country: "🇷🇺" },
  { name: "Fresskowy", game: "LoL", team: "KOI Fenix", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 900, sens: null, edpi: null, role: "Mid", country: "🇵🇱" },
  { name: "Rekkles", game: "LoL", team: "Los Ratones", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇸🇪" },
  { name: "Doggo", game: "LoL", team: "CTBC Flying Oyster", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 900, sens: null, edpi: null, role: "Mid", country: "🇹🇼" },
  { name: "Driver", game: "LoL", team: "CTBC Flying Oyster", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 2000, sens: null, edpi: null, role: "Mid", country: "🇹🇼" },
  { name: "Rest", game: "LoL", team: "CTBC Flying Oyster", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇹🇼" },
  { name: "Croco", game: "LoL", team: "BRION", mouse: "Logitech G305", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "HamBak", game: "LoL", team: "BRION", mouse: "Logitech G305", hz: 1000, dpi: 1150, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Bull", game: "LoL", team: "BRION", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1450, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "BioPanther", game: "LoL", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇦🇺" },
  { name: "Slayder", game: "LoL", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇹🇼" },
  { name: "Luon", game: "LoL", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1000, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Whynot", game: "LoL", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1150, sens: null, edpi: null, role: "Mid", country: "🇳🇿" },
  { name: "JimieN", game: "LoL", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 2400, sens: null, edpi: null, role: "Mid", country: "🇹🇼" },
  { name: "Selfmade", game: "LoL", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Mid", country: "🇵🇱" },
  { name: "Kaiser", game: "LoL", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 3000, sens: null, edpi: null, role: "Mid", country: "🇩🇪" },
  { name: "Wunder", game: "LoL", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1800, sens: null, edpi: null, role: "Mid", country: "🇩🇰" },
  { name: "Stixxay", game: "LoL", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇺🇸" },
  { name: "Jankos", game: "LoL", team: "Free Agent", mouse: "Logitech G703", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇵🇱" },
  { name: "Ragner", game: "LoL", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇹🇷" },
  { name: "kamilius", game: "LoL", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇸🇰" },
  { name: "BAO", game: "LoL", team: "Free Agent", mouse: "Logitech G402", hz: 1000, dpi: 640, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Mikyx", game: "LoL", team: "Free Agent", mouse: "Logitech G703", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇸🇮" },
  { name: "Odoamne", game: "LoL", team: "Free Agent", mouse: "Corsair M65 RGB Elite", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇷🇴" },
  { name: "Inspired", game: "LoL", team: "Free Agent", mouse: "RTX 4070 Ti Super", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇵🇱" },
  { name: "Trymbi", game: "LoL", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 2000, sens: null, edpi: null, role: "Mid", country: "🇵🇱" },
  { name: "Impact", game: "LoL", team: "Free Agent", mouse: "Razer BlackShark V2", hz: 1000, dpi: 1000, sens: null, edpi: null, role: "Mid", country: "🇰🇷" },
  { name: "Patrik", game: "LoL", team: "Free Agent", mouse: "HyperX Fury S Speed Edition", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇨🇿" },
  { name: "Abbedagge", game: "LoL", team: "Free Agent", mouse: "Logitech G903", hz: 1000, dpi: 1900, sens: null, edpi: null, role: "Mid", country: "🇩🇪" },
  { name: "Elk", game: "LoL", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇨🇳" },
  { name: "Optimus", game: "LoL", team: "Content", mouse: "Corsair Sabre v2 Pro", hz: 1000, dpi: 1600, sens: null, edpi: null, role: "Mid", country: "🇻🇳" },
  // ─── MARVEL RIVALS: 21 players from prosettings.net (verified Feb 2026) ───
  { name: "Cloakzy", game: "Marvel Rivals", team: "Complexity", mouse: "Razer Viper Mini", hz: 1000, dpi: 800, sens: 1.3, edpi: 1040, role: "DPS", country: "🇺🇸" },
  { name: "Primmie", game: "Marvel Rivals", team: "FULL SENSE", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 4.5, edpi: 3600, role: "DPS", country: "🇹🇭" },
  { name: "Sernik", game: "Marvel Rivals", team: "QMISTRY", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 2, edpi: 1600, role: "DPS", country: "🇵🇱" },
  { name: "Hqrdest", game: "Marvel Rivals", team: "Team Peps", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 1600, sens: 1.26, edpi: 2016, role: "DPS", country: "🇫🇷" },
  { name: "Linepro", game: "Marvel Rivals", team: "ZERO.PERCENT", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 1.56, edpi: 1248, role: "DPS", country: "🇪🇸" },
  { name: "Among", game: "Marvel Rivals", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 778, sens: 2.16, edpi: 1680, role: "DPS", country: "🇵🇹" },
  { name: "JcQk", game: "Marvel Rivals", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 1600, sens: 0.75, edpi: 1200, role: "DPS", country: "🇵🇱" },
  { name: "Knuten", game: "Marvel Rivals", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 1.1, edpi: 880, role: "DPS", country: "🇩🇰" },
  { name: "ducky1", game: "Marvel Rivals", team: "Free Agent", mouse: "SteelSeries Rival 3", hz: 1000, dpi: 1600, sens: 0.8, edpi: 1280, role: "DPS", country: "🇬🇧" },
  { name: "Lugia", game: "Marvel Rivals", team: "Free Agent", mouse: "Razer Basilisk V3 Pro", hz: 1000, dpi: 1600, sens: 1.5, edpi: 2400, role: "DPS", country: "🇬🇧" },
  { name: "Wyni", game: "Marvel Rivals", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1050, sens: 1.8, edpi: 1890, role: "DPS", country: "🇪🇸" },
  { name: "ErrorTerror", game: "Marvel Rivals", team: "Free Agent", mouse: "Razer DeathAdder V2", hz: 1000, dpi: 1200, sens: 1.68, edpi: 2016, role: "DPS", country: "🇵🇹" },
  { name: "emongg", game: "Marvel Rivals", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 7.17, edpi: 2868, role: "DPS", country: "🇺🇸" },
  { name: "bogur", game: "Marvel Rivals", team: "Content", mouse: "WLMouse BEAST X Silver", hz: 1000, dpi: 800, sens: 3, edpi: 2400, role: "DPS", country: "🇧🇬" },
  { name: "Seagull", game: "Marvel Rivals", team: "Content", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 1600, sens: 0.89, edpi: 1424, role: "DPS", country: "🇺🇸" },
  { name: "Kenzo", game: "Marvel Rivals", team: "Content", mouse: "Pulsar X2 V2 Mini", hz: 1000, dpi: 800, sens: 1.5, edpi: 1200, role: "DPS", country: "🇸🇪" },
  { name: "dafran", game: "Marvel Rivals", team: "Content", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 562, sens: 3.2, edpi: 1800, role: "DPS", country: "🇩🇰" },
  { name: "sinatraa", game: "Marvel Rivals", team: "Content", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 2.25, edpi: 1800, role: "DPS", country: "🇺🇸" },
  { name: "Necros", game: "Marvel Rivals", team: "Content", mouse: "Corsair Sabre v2 Pro", hz: 1000, dpi: 3200, sens: 0.75, edpi: 2400, role: "DPS", country: "🇷🇸" },
  { name: "shroud", game: "Marvel Rivals", team: "Content", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 1600, sens: 1, edpi: 1600, role: "DPS", country: "🇨🇦" },
  { name: "TenZ", game: "Marvel Rivals", team: "Content", mouse: "Pulsar TenZ Signature Edition", hz: 1000, dpi: 1600, sens: 0.48, edpi: 768, role: "DPS", country: "🇨🇦" },
  // ─── PUBG: 61 players from prosettings.net (verified Feb 2026) ───
  { name: "Shrimzy", game: "PUBG", team: "Falcons Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 33, edpi: null, role: "Fragger", country: "🇺🇸" },
  { name: "Kickstart", game: "PUBG", team: "Falcons Esports", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 30, edpi: null, role: "Fragger", country: "🇺🇸" },
  { name: "hwinn", game: "PUBG", team: "Falcons Esports", mouse: "ZOWIE EC3-DW", hz: 1000, dpi: 950, sens: 30, edpi: null, role: "Fragger", country: "🇺🇸" },
  { name: "TGLTN", game: "PUBG", team: "Falcons Esports", mouse: "VAXEE XE V2", hz: 1000, dpi: 800, sens: 32, edpi: null, role: "Fragger", country: "🇦🇺" },
  { name: "Gustav", game: "PUBG", team: "FaZe Clan", mouse: "SteelSeries Prime Mini Wireless", hz: 1000, dpi: 800, sens: 32, edpi: null, role: "Fragger", country: "🇩🇰" },
  { name: "Fexx", game: "PUBG", team: "FaZe Clan", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 50, edpi: null, role: "Fragger", country: "🇬🇧" },
  { name: "Jeemzz", game: "PUBG", team: "FaZe Clan", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 30, edpi: null, role: "Fragger", country: "🇳🇴" },
  { name: "mxey", game: "PUBG", team: "FaZe Clan", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 35, edpi: null, role: "Fragger", country: "🇫🇮" },
  { name: "Insight", game: "PUBG", team: "Aurora", mouse: "ZOWIE EC2", hz: 1000, dpi: 1600, sens: 15, edpi: null, role: "Fragger", country: "🇦🇺" },
  { name: "ibiza", game: "PUBG", team: "Virtus.pro", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 29, edpi: null, role: "Fragger", country: "🇳🇱" },
  { name: "luke12", game: "PUBG", team: "Team Liquid", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 15, edpi: null, role: "Fragger", country: "🇦🇺" },
  { name: "aLOW", game: "PUBG", team: "Team Liquid", mouse: "ZOWIE EC1-B", hz: 1000, dpi: 400, sens: 56, edpi: null, role: "Fragger", country: "🇺🇸" },
  { name: "Bestoloch", game: "PUBG", team: "BetBoom Team", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 35, edpi: null, role: "Fragger", country: "🇷🇺" },
  { name: "ADOUZ1E", game: "PUBG", team: "BetBoom Team", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 400, sens: 45, edpi: null, role: "Fragger", country: "🇷🇺" },
  { name: "Fludd", game: "PUBG", team: "BESTIA", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 1600, sens: 8, edpi: null, role: "Fragger", country: "🇦🇺" },
  { name: "Himass", game: "PUBG", team: "Anyone's Legend", mouse: "Logitech G703", hz: 1000, dpi: 400, sens: 33, edpi: null, role: "Fragger", country: "🇻🇳" },
  { name: "Taikonn", game: "PUBG", team: "Anyone's Legend", mouse: "Corsair M75 Wireless", hz: 1000, dpi: 400, sens: 30, edpi: null, role: "Fragger", country: "🇻🇳" },
  { name: "Marcelek", game: "PUBG", team: "PolishPower", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 43, edpi: null, role: "Fragger", country: "🇵🇱" },
  { name: "Uncivil", game: "PUBG", team: "Nootropic", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 40, edpi: null, role: "Fragger", country: "🇺🇸" },
  { name: "lionkk", game: "PUBG", team: "Petrichor Road", mouse: "ZOWIE FK2", hz: 1000, dpi: 400, sens: 50, edpi: null, role: "Fragger", country: "🇨🇳" },
  { name: "Aixleft", game: "PUBG", team: "Petrichor Road", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 50, edpi: null, role: "Fragger", country: "🇨🇳" },
  { name: "Kemba7", game: "PUBG", team: "Exhalation", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 40, edpi: null, role: "Fragger", country: "🇷🇺" },
  { name: "SviTT", game: "PUBG", team: "Attack All Around", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 55, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "vanOtica", game: "PUBG", team: "Attack All Around", mouse: "", hz: 1000, dpi: 800, sens: 1.2, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "Eaddy", game: "PUBG", team: "Buriram United", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: 30, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "RossitedJR", game: "PUBG", team: "Theeraton Five", mouse: "ZOWIE FK2", hz: 1000, dpi: 400, sens: 50, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "Ma4nn", game: "PUBG", team: "From The Future", mouse: "Roccat Kone Pro Air", hz: 1000, dpi: 800, sens: 38, edpi: null, role: "Fragger", country: "🇮🇩" },
  { name: "xmpl", game: "PUBG", team: "Twisted Minds", mouse: "Ninjutso Sora V2", hz: 1000, dpi: 400, sens: 46, edpi: null, role: "Fragger", country: "🇷🇺" },
  { name: "BatulinS", game: "PUBG", team: "Twisted Minds", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 1600, sens: 22, edpi: null, role: "Fragger", country: "🇷🇺" },
  { name: "xxxLu", game: "PUBG", team: "Four Angry Men", mouse: "", hz: 1000, dpi: 400, sens: 40, edpi: null, role: "Fragger", country: "🇨🇳" },
  { name: "CRAZY112", game: "PUBG", team: "Four Angry Men", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 45, edpi: null, role: "Fragger", country: "🇨🇳" },
  { name: "J4nku2of", game: "PUBG", team: "Made In Thailand", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 50, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "FLASH", game: "PUBG", team: "FULL SENSE", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 400, sens: 44, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "LongSkr", game: "PUBG", team: "Edward Gaming", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 48, edpi: null, role: "Fragger", country: "🇨🇳" },
  { name: "Pio", game: "PUBG", team: "Gen.G", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 45, edpi: null, role: "Fragger", country: "🇰🇷" },
  { name: "Braexco", game: "PUBG", team: "Acend", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 35, edpi: null, role: "Fragger", country: "🇩🇪" },
  { name: "rustyzera", game: "PUBG", team: "Free Agent", mouse: "SteelSeries Aerox 3 Wireless", hz: 1000, dpi: 400, sens: 41, edpi: null, role: "Fragger", country: "🇧🇷" },
  { name: "Keenan", game: "PUBG", team: "Free Agent", mouse: "Finalmouse Ultralight 2", hz: 1000, dpi: 1600, sens: 35, edpi: null, role: "Fragger", country: "🇨🇦" },
  { name: "Jowman", game: "PUBG", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 50, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "Hwan2da", game: "PUBG", team: "Free Agent", mouse: "ZOWIE EC2-A", hz: 1000, dpi: 800, sens: 30, edpi: null, role: "Fragger", country: "🇨🇳" },
  { name: "Adam", game: "PUBG", team: "Free Agent", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 1000, sens: 45, edpi: null, role: "Fragger", country: "🇨🇦" },
  { name: "Thenderlost", game: "PUBG", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 50, edpi: null, role: "Fragger", country: "🇹🇷" },
  { name: "SKUIJKE", game: "PUBG", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 44, edpi: null, role: "Fragger", country: "🇫🇮" },
  { name: "Under", game: "PUBG", team: "Free Agent", mouse: "ZOWIE FK1-B", hz: 1000, dpi: 800, sens: 32, edpi: null, role: "Fragger", country: "🇰🇷" },
  { name: "Menteul", game: "PUBG", team: "Free Agent", mouse: "ZOWIE EC2-A", hz: 1000, dpi: 800, sens: 33, edpi: null, role: "Fragger", country: "🇰🇷" },
  { name: "Sambty", game: "PUBG", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 30, edpi: null, role: "Fragger", country: "🇫🇮" },
  { name: "Noardra", game: "PUBG", team: "Free Agent", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 800, sens: 38, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "Conaxy", game: "PUBG", team: "Free Agent", mouse: "Logitech G203", hz: 1000, dpi: 400, sens: 45, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "ceh9", game: "PUBG", team: "Free Agent", mouse: "ZOWIE FK1-B", hz: 1000, dpi: 800, sens: 30, edpi: null, role: "Fragger", country: "🇷🇺" },
  { name: "DUCKMANZ", game: "PUBG", team: "Free Agent", mouse: "ZOWIE FK2", hz: 1000, dpi: 400, sens: 45, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "alya", game: "PUBG", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 42, edpi: null, role: "Fragger", country: "🇷🇺" },
  { name: "Aitzy", game: "PUBG", team: "Free Agent", mouse: "ZOWIE EC2-A", hz: 1000, dpi: 800, sens: 25, edpi: null, role: "Fragger", country: "🇳🇴" },
  { name: "Inonix", game: "PUBG", team: "Free Agent", mouse: "ROCCAT Kone Pure Ultra", hz: 1000, dpi: 1600, sens: 16, edpi: null, role: "Fragger", country: "🇰🇷" },
  { name: "Nourinz", game: "PUBG", team: "Free Agent", mouse: "FinalMouse Starlight-12", hz: 1000, dpi: 400, sens: 55, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "SILERZZ", game: "PUBG", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 31, edpi: null, role: "Fragger", country: "🇧🇪" },
  { name: "BreaK", game: "PUBG", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 48, edpi: null, role: "Fragger", country: "🇬🇧" },
  { name: "DanucD", game: "PUBG", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 49, edpi: null, role: "Fragger", country: "🇱🇻" },
  { name: "WackyJacky101", game: "PUBG", team: "Content", mouse: "SteelSeries Prime", hz: 1000, dpi: 800, sens: 24, edpi: null, role: "Fragger", country: "🇩🇰" },
  { name: "Julio", game: "PUBG", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 45, edpi: null, role: "Fragger", country: "🇹🇭" },
  { name: "Mellman", game: "PUBG", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 37, edpi: null, role: "Fragger", country: "🇬🇪" },
  { name: "Mixigaming", game: "PUBG", team: "Content", mouse: "Corsair Sabre v2 Pro", hz: 1000, dpi: 800, sens: 35, edpi: null, role: "Fragger", country: "🇻🇳" },
  // ─── R6 SIEGE: 88 players from prosettings.net (verified Feb 2026) ───
  { name: "Yuzus", game: "R6 Siege", team: "Falcons Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 12, edpi: 1, role: "Fragger", country: "🇬🇧" },
  { name: "Solotov", game: "R6 Siege", team: "Falcons Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 12, edpi: 1, role: "Fragger", country: "🇹🇷" },
  { name: "LikEfac", game: "R6 Siege", team: "Falcons Esports", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 400, sens: 9, edpi: 36, role: "Fragger", country: "🇫🇷" },
  { name: "BriD", game: "R6 Siege", team: "Falcons Esports", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 6, edpi: 0, role: "Fragger", country: "🇫🇷" },
  { name: "Shaiiko", game: "R6 Siege", team: "Falcons Esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 12, edpi: 1, role: "Fragger", country: "🇫🇷" },
  { name: "Cyber", game: "R6 Siege", team: "FaZe Clan", mouse: "VAXEE XE V2", hz: 1000, dpi: 800, sens: 10, edpi: 80, role: "Fragger", country: "🇧🇷" },
  { name: "soulz1", game: "R6 Siege", team: "FaZe Clan", mouse: "Pulsar Xlite V4", hz: 1000, dpi: 400, sens: 8, edpi: 32, role: "Fragger", country: "🇧🇷" },
  { name: "VITAKING", game: "R6 Siege", team: "FaZe Clan", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 8, edpi: 32, role: "Fragger", country: "🇧🇷" },
  { name: "cameram4n", game: "R6 Siege", team: "G2 Esports", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 600, sens: 8, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Alem4o", game: "R6 Siege", team: "G2 Esports", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 400, sens: 12, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Doki", game: "R6 Siege", team: "G2 Esports", mouse: "Logitech G Pro X2 SUPERSTRIKE", hz: 1000, dpi: 400, sens: 12, edpi: 1, role: "Fragger", country: "🇬🇧" },
  { name: "karzheka", game: "R6 Siege", team: "Virtus.pro", mouse: "Razer Viper Ultimate", hz: 500, dpi: 1600, sens: 32, edpi: 1, role: "Fragger", country: "🇪🇪" },
  { name: "P4sh4", game: "R6 Siege", team: "Virtus.pro", mouse: "Lamzu Atlantis", hz: 1000, dpi: 800, sens: 6, edpi: 1, role: "Fragger", country: "🇷🇺" },
  { name: "dan", game: "R6 Siege", team: "Virtus.pro", mouse: "WLMouse BEAST X Silver", hz: 1000, dpi: 1600, sens: 5, edpi: 2, role: "Fragger", country: "🇷🇺" },
  { name: "Always", game: "R6 Siege", team: "Virtus.pro", mouse: "Ninjutso Sora V2", hz: 1000, dpi: 400, sens: 10, edpi: 40, role: "Fragger", country: "🇷🇺" },
  { name: "ShepparD", game: "R6 Siege", team: "Virtus.pro", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 9, edpi: 1, role: "Fragger", country: "🇷🇺" },
  { name: "Nesk", game: "R6 Siege", team: "Team Liquid", mouse: "VAXEE ZYGEN NP-01 Wireless", hz: 1000, dpi: 800, sens: 5, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "FelipoX", game: "R6 Siege", team: "FURIA", mouse: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 400, sens: 10, edpi: 0, role: "Fragger", country: "🇧🇷" },
  { name: "nade", game: "R6 Siege", team: "FURIA", mouse: "Finalmouse Ultralight X Small", hz: 1000, dpi: 400, sens: 10, edpi: 40, role: "Fragger", country: "🇧🇷" },
  { name: "jv92", game: "R6 Siege", team: "FURIA", mouse: "Logitech G Pro X Superlight 2c", hz: 2000, dpi: 400, sens: 10, edpi: 0, role: "Fragger", country: "🇧🇷" },
  { name: "Herdsz", game: "R6 Siege", team: "FURIA", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 12, edpi: 48, role: "Fragger", country: "🇧🇷" },
  { name: "Kheyze", game: "R6 Siege", team: "FURIA", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 11, edpi: 44, role: "Fragger", country: "🇧🇷" },
  { name: "pino", game: "R6 Siege", team: "Ninjas in Pyjamas", mouse: "VAXEE ZYGEN NP-01", hz: 1000, dpi: 800, sens: 6, edpi: 48, role: "Fragger", country: "🇧🇷" },
  { name: "LeonGids", game: "R6 Siege", team: "Fnatic", mouse: "Fnatic X Lamzu Maya 8K", hz: 1000, dpi: 800, sens: 7, edpi: 1, role: "Fragger", country: "🇬🇧" },
  { name: "Deapek", game: "R6 Siege", team: "Fnatic", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 5, edpi: 1, role: "Fragger", country: "🇳🇱" },
  { name: "Kendrew", game: "R6 Siege", team: "Wolves Esports", mouse: "Logitech G703", hz: 1000, dpi: 400, sens: 9, edpi: 1, role: "Fragger", country: "🇬🇧" },
  { name: "Tyrant", game: "R6 Siege", team: "Wolves Esports", mouse: "Razer Viper V2 Pro", hz: 4000, dpi: 400, sens: 7, edpi: 1, role: "Fragger", country: "🇬🇧" },
  { name: "volpz", game: "R6 Siege", team: "w7m esports", mouse: "Logitech G Pro X Superlight 2", hz: 4000, dpi: 400, sens: 10, edpi: 40, role: "Fragger", country: "🇧🇷" },
  { name: "Paluh", game: "R6 Siege", team: "w7m esports", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 10, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Anitun", game: "R6 Siege", team: "CYCLOPS athlete gaming", mouse: "Logitech G Pro X Superlight 2 SE", hz: 4000, dpi: 800, sens: 7, edpi: 56, role: "Fragger", country: "🇯🇵" },
  { name: "Yoggah", game: "R6 Siege", team: "Oxygen Esports", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 400, sens: 8, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "GMZ", game: "R6 Siege", team: "Oxygen Esports", mouse: "ZOWIE EC2-C", hz: 1000, dpi: 400, sens: 90, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Lagonis", game: "R6 Siege", team: "Wildcard Gaming", mouse: "ZOWIE EC2-CW", hz: 1000, dpi: 400, sens: 9, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Kyno", game: "R6 Siege", team: "M80", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 400, sens: 8, edpi: 32, role: "Fragger", country: "🇧🇷" },
  { name: "Hotancold", game: "R6 Siege", team: "M80", mouse: "Finalmouse Ultralight X Medium", hz: 1000, dpi: 800, sens: 6, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "Virtue", game: "R6 Siege", team: "Team BDS", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 12, edpi: 48, role: "Fragger", country: "🇦🇺" },
  { name: "P4", game: "R6 Siege", team: "Team BDS", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 11, edpi: 1, role: "Fragger", country: "🇫🇷" },
  { name: "Bullet1", game: "R6 Siege", team: "Dplus KIA", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 10, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Fresnel", game: "R6 Siege", team: "Dplus KIA", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 8, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Levy", game: "R6 Siege", team: "Dplus KIA", mouse: "ZOWIE ZA13-DW", hz: 4000, dpi: 800, sens: 9, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Faallz", game: "R6 Siege", team: "Dplus KIA", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 800, sens: 6, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Mity", game: "R6 Siege", team: "Dplus KIA", mouse: "VAXEE ZYGEN NP-01S V2 Wireless", hz: 1000, dpi: 400, sens: 9, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "supr", game: "R6 Siege", team: "Shopify Rebellion", mouse: "Finalmouse Starlight-12 Hades", hz: 1000, dpi: 400, sens: 8, edpi: 0, role: "Fragger", country: "🇺🇸" },
  { name: "Canadian", game: "R6 Siege", team: "Shopify Rebellion", mouse: "Razer DeathAdder V4 Pro", hz: 1000, dpi: 800, sens: 4, edpi: 1, role: "Fragger", country: "🇨🇦" },
  { name: "Ambi", game: "R6 Siege", team: "Shopify Rebellion", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 800, sens: 12, edpi: 2, role: "Fragger", country: "🇺🇸" },
  { name: "Rexen", game: "R6 Siege", team: "Shopify Rebellion", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 6, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "Spoit", game: "R6 Siege", team: "Shopify Rebellion", mouse: "Lamzu Inca", hz: 2000, dpi: 1600, sens: 55, edpi: 1, role: "Fragger", country: "🇸🇪" },
  { name: "Fultz", game: "R6 Siege", team: "Spacestation Gaming", mouse: "Logitech G Pro X Superlight 2", hz: 1000, dpi: 400, sens: 9, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "Benjamaster", game: "R6 Siege", team: "Spacestation Gaming", mouse: "ZOWIE EC2-DW", hz: 1000, dpi: 800, sens: 6, edpi: 48, role: "Fragger", country: "🇩🇰" },
  { name: "SHA77E", game: "R6 Siege", team: "HEROIC", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 12, edpi: 0, role: "Fragger", country: "🇫🇮" },
  { name: "njr", game: "R6 Siege", team: "DarkZero Esports", mouse: "Razer Viper V3 Pro", hz: 2000, dpi: 800, sens: 12, edpi: 2, role: "Fragger", country: "🇺🇸" },
  { name: "CTZN", game: "R6 Siege", team: "DarkZero Esports", mouse: "Razer DeathAdder V4 Pro", hz: 8000, dpi: 400, sens: 12, edpi: 1, role: "Fragger", country: "🇬🇧" },
  { name: "SpiriTz", game: "R6 Siege", team: "DarkZero Esports", mouse: "FinalMouse UltralightX Competition", hz: 1000, dpi: 400, sens: 9, edpi: 0, role: "Fragger", country: "🇨🇦" },
  { name: "Nafe", game: "R6 Siege", team: "DarkZero Esports", mouse: "Lamzu Maya", hz: 2000, dpi: 400, sens: 64, edpi: 256, role: "Fragger", country: "🇬🇧" },
  { name: "Hungry", game: "R6 Siege", team: "Geekay Esports", mouse: "Razer Viper V3 Pro", hz: 500, dpi: 400, sens: 9, edpi: 1, role: "Fragger", country: "🇩🇪" },
  { name: "Jigsaw", game: "R6 Siege", team: "Chiefs", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 90, edpi: 1, role: "Fragger", country: "🇦🇺" },
  { name: "Odah", game: "R6 Siege", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 2000, dpi: 800, sens: 800, edpi: 13, role: "Fragger", country: "🇦🇺" },
  { name: "Quiz", game: "R6 Siege", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 1000, dpi: 400, sens: 10, edpi: 40, role: "Fragger", country: "🇦🇺" },
  { name: "Brendo", game: "R6 Siege", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2c", hz: 1000, dpi: 400, sens: 10, edpi: 0, role: "Fragger", country: "🇦🇺" },
  { name: "Sageon", game: "R6 Siege", team: "Chiefs", mouse: "Logitech G Pro X Superlight 2c", hz: 8000, dpi: 400, sens: 12, edpi: 0, role: "Fragger", country: "🇦🇺" },
  { name: "risze", game: "R6 Siege", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: 4, edpi: 32, role: "Fragger", country: "🇧🇪" },
  { name: "Prano", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 7, edpi: 1, role: "Fragger", country: "🇩🇪" },
  { name: "Scyther", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 500, dpi: 400, sens: 12, edpi: 1, role: "Fragger", country: "🇷🇺" },
  { name: "Elemzje", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 7, edpi: 1, role: "Fragger", country: "🇫🇷" },
  { name: "Renshiro", game: "R6 Siege", team: "Free Agent", mouse: "Razer DeathAdder Elite", hz: 1000, dpi: 800, sens: 7, edpi: 56, role: "Fragger", country: "🇫🇷" },
  { name: "Neonical", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 6, edpi: 0, role: "Fragger", country: "🇬🇧" },
  { name: "Kantoraketti", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: 5, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "Cryn", game: "R6 Siege", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 10, edpi: 1, role: "Fragger", country: "🇩🇪" },
  { name: "Muzi", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper Mini Signature Edition", hz: 1000, dpi: 400, sens: 7, edpi: 1, role: "Fragger", country: "🇧🇷" },
  { name: "Kayak", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 7, edpi: 28, role: "Fragger", country: "🇬🇧" },
  { name: "LuKid", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: 16, edpi: 3, role: "Fragger", country: "🇧🇷" },
  { name: "Geometrics", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G203", hz: 1000, dpi: 800, sens: 6, edpi: 0, role: "Fragger", country: "🇲🇽" },
  { name: "BiBooAF", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 7, edpi: 56, role: "Fragger", country: "🇫🇷" },
  { name: "xS3xyCake", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 800, sens: 16, edpi: 3, role: "Fragger", country: "🇧🇷" },
  { name: "Shiinka", game: "R6 Siege", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 400, sens: 11, edpi: 1, role: "Fragger", country: "🇫🇷" },
  { name: "T3b", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 10, edpi: 40, role: "Fragger", country: "🇮🇹" },
  { name: "MentalistC", game: "R6 Siege", team: "Free Agent", mouse: "ZOWIE S2 Divina", hz: 1000, dpi: 400, sens: 91, edpi: 1, role: "Fragger", country: "🇨🇳" },
  { name: "Merc", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 80, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "UUNO", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G Pro X Superlight", hz: 500, dpi: 400, sens: 11, edpi: 1, role: "Fragger", country: "🇫🇮" },
  { name: "neLo", game: "R6 Siege", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 4000, dpi: 400, sens: 10, edpi: 1, role: "Fragger", country: "🇭🇷" },
  { name: "BlackRay", game: "R6 Siege", team: "Free Agent", mouse: "Logitech G Pro X Superlight 2 Dex", hz: 4000, dpi: 400, sens: 9, edpi: 36, role: "Fragger", country: "🇯🇵" },
  { name: "Panbazou", game: "R6 Siege", team: "Free Agent", mouse: "ZOWIE ZA13-DW", hz: 2000, dpi: 1600, sens: 3, edpi: 48, role: "Fragger", country: "🇺🇸" },
  { name: "Whiteshark67", game: "R6 Siege", team: "Content", mouse: "ZOWIE EC2-B", hz: 1000, dpi: 400, sens: 10, edpi: 1, role: "Fragger", country: "🇫🇷" },
  { name: "KingGeorge", game: "R6 Siege", team: "Content", mouse: "Corsair SABRE RGB Pro", hz: 1000, dpi: 800, sens: 15, edpi: 2, role: "Fragger", country: "🇺🇸" },
  { name: "MacieJay", game: "R6 Siege", team: "Content", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 400, sens: 11, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "Athieno", game: "R6 Siege", team: "Content", mouse: "ZOWIE U2", hz: 1000, dpi: 800, sens: 76, edpi: 1, role: "Fragger", country: "🇻🇳" },
  { name: "oozie", game: "R6 Siege", team: "Content", mouse: "Razer Viper V3 Pro", hz: 1000, dpi: 400, sens: 88, edpi: 1, role: "Fragger", country: "🇺🇸" },
  { name: "Pengu", game: "R6 Siege", team: "Content", mouse: "Pulsar X2 CrazyLight", hz: 1000, dpi: 1600, sens: 2, edpi: 1, role: "Fragger", country: "🇩🇰" },
  // ─── DOTA 2: 43 players from prosettings.net (verified Feb 2026) ───
  { name: "Seleri", game: "Dota 2", team: "MOUZ", mouse: "Razer DeathAdder V2", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇳🇱" },
  { name: "Yatoro", game: "Dota 2", team: "Team Spirit", mouse: "Logitech G Pro Wireless", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇺🇦" },
  { name: "Collapse", game: "Dota 2", team: "Team Spirit", mouse: "Logitech G203", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇷🇺" },
  { name: "cr1t-", game: "Dota 2", team: "Falcons Esports", mouse: "Razer DeathAdder Elite", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇩🇰" },
  { name: "Nightfall", game: "Dota 2", team: "Aurora", mouse: "Razer Gigantus", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇷🇺" },
  { name: "TORONTOTOKYO", game: "Dota 2", team: "Aurora", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇷🇺" },
  { name: "BOOM", game: "Dota 2", team: "Natus Vincere", mouse: "Razer Deathadder V2 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇨🇿" },
  { name: "qojqva", game: "Dota 2", team: "Team Liquid", mouse: "Razer Deathadder V2 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇩🇪" },
  { name: "Nisha", game: "Dota 2", team: "Team Liquid", mouse: "Corsair MM350 Champion Series", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇵🇱" },
  { name: "miCKe", game: "Dota 2", team: "Team Liquid", mouse: "HyperX Fury S Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇪" },
  { name: "Boxi", game: "Dota 2", team: "Team Liquid", mouse: "HyperX Fury S Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇪" },
  { name: "iNSaNiA", game: "Dota 2", team: "Team Liquid", mouse: "HyperX Fury S Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇪" },
  { name: "Dendi", game: "Dota 2", team: "B8 Esports", mouse: "HyperX Pulsefire Dart", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇺🇦" },
  { name: "CTOMAHEH1", game: "Dota 2", team: "B8 Esports", mouse: "Razer DeathAdder V2", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇧🇬" },
  { name: "gpk", game: "Dota 2", team: "BetBoom Team", mouse: "Razer Viper Ultimate", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇷🇺" },
  { name: "Save-", game: "Dota 2", team: "BetBoom Team", mouse: "Logitech G640 Original", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇲🇩" },
  { name: "Saksa", game: "Dota 2", team: "Tundra Esports", mouse: "SteelSeries Prime", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇲🇰" },
  { name: "Whitemon", game: "Dota 2", team: "Tundra Esports", mouse: "Logitech G203", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇮🇩" },
  { name: "y'", game: "Dota 2", team: "PSG.LGD", mouse: "SteelSeries Sensei RAW", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇨🇳" },
  { name: "Dy", game: "Dota 2", team: "Xtreme Gaming", mouse: "Razer DeathAdder V2", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇨🇳" },
  { name: "KuroKy", game: "Dota 2", team: "Nigma Galaxy", mouse: "ZOWIE EC2", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇩🇪" },
  { name: "YapzOr", game: "Dota 2", team: "Team Secret", mouse: "Logitech G640 Original", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇯🇴" },
  { name: "Puppey", game: "Dota 2", team: "Team Secret", mouse: "SteelSeries Rival 300", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇪🇪" },
  { name: "JT-", game: "Dota 2", team: "Invictus Gaming", mouse: "SteelSeries Sensei RAW", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇲🇾" },
  { name: "skem", game: "Dota 2", team: "OG Esports", mouse: "Logitech G Pro X Superlight", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇵🇭" },
  { name: "Yopaj", game: "Dota 2", team: "OG Esports", mouse: "Logitech G203", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇵🇭" },
  { name: "iceiceice", game: "Dota 2", team: "Bleed eSports", mouse: "Razer Viper Mini", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇬" },
  { name: "PlayHard-", game: "Dota 2", team: "Free Agent", mouse: "Logitech G203", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇵🇭" },
  { name: "ponlo", game: "Dota 2", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇬" },
  { name: "kaka", game: "Dota 2", team: "Free Agent", mouse: "SteelSeries Sensei RAW", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇨🇳" },
  { name: "Handsken", game: "Dota 2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇪" },
  { name: "chYuan", game: "Dota 2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇲🇾" },
  { name: "s4", game: "Dota 2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇪" },
  { name: "charlie", game: "Dota 2", team: "Free Agent", mouse: "Razer Viper V2 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇪" },
  { name: "Leostyle-", game: "Dota 2", team: "Free Agent", mouse: "ZOWIE EC2", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇵🇪" },
  { name: "Mjz", game: "Dota 2", team: "Free Agent", mouse: "ZOWIE EC2", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇵🇪" },
  { name: "abed", game: "Dota 2", team: "Free Agent", mouse: "Razer Deathadder V2 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇵🇭" },
  { name: "Shad", game: "Dota 2", team: "Free Agent", mouse: "Razer Deathadder V3 Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇳🇱" },
  { name: "DM", game: "Dota 2", team: "Free Agent", mouse: "HyperX Fury S Pro", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇷🇺" },
  { name: "Erika", game: "Dota 2", team: "Free Agent", mouse: "HyperX Cloud Alpha", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇨🇳" },
  { name: "23savage", game: "Dota 2", team: "Free Agent", mouse: "Corsair M75 Air", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇹🇭" },
  { name: "MidOne", game: "Dota 2", team: "Content", mouse: "SteelSeries Prime", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇲🇾" },
  { name: "AdmiralBulldog", game: "Dota 2", team: "Content", mouse: "Razer Mamba Wireless", hz: 1000, dpi: 800, sens: null, edpi: null, role: "Carry", country: "🇸🇪" },
];

// Merge: extendedPlayers that don't duplicate proPlayers names
const allPlayers = [...proPlayers.map(p => ({ ...p, hasProfile: true })), ...extendedPlayers.filter(ep => !proPlayers.find(pp => pp.name === ep.name && pp.game === ep.game)).map(p => ({ ...p, hasProfile: false }))];

const brandMarketShare = [
  { name: "Razer", share: 38, mice: 42, founded: 2005, hq: "San Francisco, USA" },
  { name: "Logitech", share: 35, mice: 38, founded: 1981, hq: "Lausanne, Switzerland" },
  { name: "Zowie", share: 9, mice: 18, founded: 2008, hq: "Taipei, Taiwan" },
  { name: "Vaxee", share: 5, mice: 6, founded: 2020, hq: "Taipei, Taiwan" },
  { name: "Finalmouse", share: 3, mice: 8, founded: 2014, hq: "Irvine, USA" },
  { name: "Pulsar", share: 2, mice: 12, founded: 2020, hq: "Seoul, South Korea" },
  { name: "Lamzu", share: 2, mice: 10, founded: 2022, hq: "Hong Kong" },
  { name: "WLMouse", share: 1, mice: 3, founded: 2024, hq: "China" },
  { name: "Corsair", share: 1, mice: 10, founded: 1994, hq: "Milpitas, USA" },
  { name: "SteelSeries", share: 1, mice: 15, founded: 2001, hq: "Copenhagen, Denmark" },
  { name: "Endgame", share: 1, mice: 5, founded: 2019, hq: "Hamburg, Germany" },
  { name: "Other", share: 2, mice: 80, founded: null, hq: null }
];

const gameBreakdown = [
  { game: "CS2", icon: "💥", players: 817, topMice: [
    { name: "Logitech G Pro X Superlight 2", pct: 23 }, { name: "Razer Viper V3 Pro", pct: 15 }, { name: "Logitech G Pro X Superlight", pct: 10 }, { name: "Razer DeathAdder V4 Pro", pct: 9 }, { name: "Razer Deathadder V3 Pro", pct: 4 }],
    topBrands: [{ name: "Logitech", pct: 38 }, { name: "Razer", pct: 30 }, { name: "Zowie", pct: 16 }, { name: "Vaxee", pct: 7 }],
    avgWeight: 60, avgEdpi: 859, wirelessPct: 79, avgDpi: 656, avgPollRate: 1715 },
  { game: "Valorant", icon: "🎯", players: 566, topMice: [
    { name: "Razer Viper V3 Pro", pct: 30 }, { name: "Logitech G Pro X Superlight", pct: 10 }, { name: "Logitech G Pro X Superlight 2", pct: 9 }, { name: "Razer DeathAdder V4 Pro", pct: 6 }, { name: "Razer Deathadder V3 Pro", pct: 5 }],
    topBrands: [{ name: "Razer", pct: 51 }, { name: "Logitech", pct: 24 }, { name: "Vaxee", pct: 5 }, { name: "Lamzu", pct: 5 }],
    avgWeight: 57, avgEdpi: 252, wirelessPct: 77, avgDpi: 977, avgPollRate: 2011 },
  { game: "Fortnite", icon: "🏗️", players: 262, topMice: [
    { name: "Razer Viper V3 Pro", pct: 33 }, { name: "Logitech G Pro X Superlight", pct: 16 }, { name: "Logitech G Pro X Superlight 2", pct: 11 }, { name: "Razer Viper V2 Pro", pct: 4 }, { name: "Logitech G Pro Wireless", pct: 3 }],
    topBrands: [{ name: "Razer", pct: 48 }, { name: "Logitech", pct: 32 }, { name: "Finalmouse", pct: 8 }, { name: "WLMouse", pct: 2 }],
    avgWeight: 57, avgEdpi: null, wirelessPct: 70, avgDpi: 993, avgPollRate: 1000 },
  { game: "LoL", icon: "⚔️", players: 93, topMice: [
    { name: "Logitech G Pro X Superlight 2", pct: 20 }, { name: "Logitech G Pro X Superlight", pct: 14 }, { name: "Logitech G Pro Wireless", pct: 8 }, { name: "Razer Viper V3 Pro", pct: 6 }, { name: "Razer Viper V2 Pro", pct: 5 }],
    topBrands: [{ name: "Logitech", pct: 63 }, { name: "Razer", pct: 24 }, { name: "Other", pct: 5 }, { name: "Corsair", pct: 4 }],
    avgWeight: 62, avgEdpi: null, wirelessPct: 56, avgDpi: 1443, avgPollRate: 1000 },
  { game: "R6 Siege", icon: "🏰", players: 89, topMice: [
    { name: "Razer Viper V3 Pro", pct: 15 }, { name: "Logitech G Pro X Superlight 2", pct: 12 }, { name: "Logitech G Pro X Superlight", pct: 11 }, { name: "Razer DeathAdder V4 Pro", pct: 6 }, { name: "Logitech G Pro X Superlight 2 Dex", pct: 6 }],
    topBrands: [{ name: "Logitech", pct: 37 }, { name: "Razer", pct: 33 }, { name: "Zowie", pct: 10 }, { name: "Finalmouse", pct: 6 }],
    avgWeight: 59, avgEdpi: 163, wirelessPct: 69, avgDpi: 600, avgPollRate: 1500 },
  { game: "PUBG", icon: "🪖", players: 61, topMice: [
    { name: "Logitech G Pro X Superlight", pct: 36 }, { name: "Logitech G Pro Wireless", pct: 7 }, { name: "Razer Viper V3 Pro", pct: 5 }, { name: "ZOWIE FK2", pct: 5 }, { name: "ZOWIE EC2-A", pct: 5 }],
    topBrands: [{ name: "Logitech", pct: 54 }, { name: "Zowie", pct: 18 }, { name: "Razer", pct: 8 }, { name: "SteelSeries", pct: 5 }],
    avgWeight: 61, avgEdpi: null, wirelessPct: 59, avgDpi: 720, avgPollRate: 1000 },
  { game: "Apex", icon: "🔺", players: 56, topMice: [
    { name: "Razer Viper V3 Pro", pct: 16 }, { name: "Logitech G Pro X Superlight", pct: 11 }, { name: "Logitech G Pro X Superlight 2", pct: 11 }, { name: "Razer Deathadder V3 Pro", pct: 5 }, { name: "Razer Viper Ultimate", pct: 4 }],
    topBrands: [{ name: "Logitech", pct: 29 }, { name: "Razer", pct: 29 }, { name: "Finalmouse", pct: 13 }, { name: "Lamzu", pct: 7 }],
    avgWeight: 58, avgEdpi: 1274, wirelessPct: 61, avgDpi: 1010, avgPollRate: 1438 },
  { game: "Dota 2", icon: "🗡️", players: 43, topMice: [
    { name: "HyperX Fury S Pro", pct: 9 }, { name: "Razer Deathadder V3 Pro", pct: 9 }, { name: "Razer DeathAdder V2", pct: 7 }, { name: "Razer Deathadder V2 Pro", pct: 7 }, { name: "Logitech G203", pct: 7 }],
    topBrands: [{ name: "Razer", pct: 44 }, { name: "Logitech", pct: 19 }, { name: "HyperX", pct: 14 }, { name: "SteelSeries", pct: 12 }],
    avgWeight: 65, avgEdpi: null, wirelessPct: 28, avgDpi: 800, avgPollRate: 1000 },
  { game: "Marvel Rivals", icon: "🦸", players: 21, topMice: [
    { name: "Logitech G Pro X Superlight 2", pct: 19 }, { name: "Razer Viper V3 Pro", pct: 10 }, { name: "Razer Deathadder V3 Pro", pct: 10 }, { name: "Logitech G Pro X Superlight", pct: 10 }, { name: "Razer Viper Mini", pct: 5 }],
    topBrands: [{ name: "Logitech", pct: 38 }, { name: "Razer", pct: 33 }, { name: "Pulsar", pct: 10 }, { name: "SteelSeries", pct: 5 }],
    avgWeight: 65, avgEdpi: 1767, wirelessPct: 62, avgDpi: 1180, avgPollRate: 1000 },
  { game: "Overwatch 2", icon: "🛡️", players: 16, topMice: [
    { name: "Razer Viper V3 Pro", pct: 44 }, { name: "Logitech G Pro X Superlight 2", pct: 44 }, { name: "Razer DeathAdder V3 Pro", pct: 13 }],
    topBrands: [{ name: "Razer", pct: 56 }, { name: "Logitech", pct: 44 }],
    avgWeight: 58, avgEdpi: 3275, wirelessPct: 100, avgDpi: 800, avgPollRate: 4000 },
  { game: "Deadlock", icon: "🔒", players: 15, topMice: [
    { name: "Logitech G Pro X Superlight 2", pct: 47 }, { name: "Razer Viper V3 Pro", pct: 40 }, { name: "Logitech G Pro X Superlight", pct: 7 }, { name: "Razer DeathAdder V3 Pro", pct: 7 }],
    topBrands: [{ name: "Logitech", pct: 53 }, { name: "Razer", pct: 47 }],
    avgWeight: 58, avgEdpi: 853, wirelessPct: 100, avgDpi: 667, avgPollRate: 3800 },
  { game: "Call of Duty", icon: "🔫", players: 8, topMice: [
    { name: "Razer Viper V3 Pro", pct: 50 }, { name: "Logitech G Pro X Superlight 2", pct: 25 }, { name: "Razer DeathAdder V3 Pro", pct: 25 }],
    topBrands: [{ name: "Razer", pct: 75 }, { name: "Logitech", pct: 25 }],
    avgWeight: 58, avgEdpi: 4430, wirelessPct: 100, avgDpi: 800, avgPollRate: 4000 },
  { game: "Rocket League", icon: "🚀", players: 1, topMice: [
    { name: "Logitech G Pro X Superlight 2", pct: 100 }],
    topBrands: [{ name: "Logitech", pct: 100 }],
    avgWeight: 60, avgEdpi: null, wirelessPct: 100, avgDpi: 800, avgPollRate: 1000 },
];

const weightTrend = [
  { year: "2018", avgWeight: 95, lightest: 68, heaviest: 120 },
  { year: "2019", avgWeight: 85, lightest: 58, heaviest: 110 },
  { year: "2020", avgWeight: 75, lightest: 47, heaviest: 100 },
  { year: "2021", avgWeight: 68, lightest: 42, heaviest: 95 },
  { year: "2022", avgWeight: 62, lightest: 38, heaviest: 85 },
  { year: "2023", avgWeight: 58, lightest: 36, heaviest: 80 },
  { year: "2024", avgWeight: 52, lightest: 30, heaviest: 75 },
  { year: "2025", avgWeight: 48, lightest: 28, heaviest: 70 },
];

const pollingTrend = [
  { year: "2018", avg: 500, max: 1000 },
  { year: "2019", avg: 750, max: 1000 },
  { year: "2020", avg: 1000, max: 1000 },
  { year: "2021", avg: 1000, max: 2000 },
  { year: "2022", avg: 1000, max: 4000 },
  { year: "2023", avg: 1500, max: 4000 },
  { year: "2024", avg: 3000, max: 8000 },
  { year: "2025", avg: 5000, max: 8000 },
];

const wirelessTrend = [
  { year: "2017", wireless: 5, wired: 95 },
  { year: "2018", wireless: 12, wired: 88 },
  { year: "2019", wireless: 25, wired: 75 },
  { year: "2020", wireless: 42, wired: 58 },
  { year: "2021", wireless: 58, wired: 42 },
  { year: "2022", wireless: 72, wired: 28 },
  { year: "2023", wireless: 82, wired: 18 },
  { year: "2024", wireless: 89, wired: 11 },
  { year: "2025", wireless: 93, wired: 7 },
];

const priceTrend = [
  { year: "2017", avg: 70, flagship: 100, budget: 40 },
  { year: "2018", avg: 85, flagship: 130, budget: 45 },
  { year: "2019", avg: 95, flagship: 150, budget: 50 },
  { year: "2020", avg: 105, flagship: 160, budget: 55 },
  { year: "2021", avg: 115, flagship: 170, budget: 50 },
  { year: "2022", avg: 120, flagship: 160, budget: 60 },
  { year: "2023", avg: 130, flagship: 170, budget: 65 },
  { year: "2024", avg: 140, flagship: 180, budget: 70 },
  { year: "2025", avg: 145, flagship: 190, budget: 75 },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const GlowText = ({ children, color = "#00ff6a", size = "text-5xl", className = "" }) => (
  <span className={`${size} font-black tracking-tight ${className}`} style={{
    color,
    textShadow: `0 0 20px ${color}40, 0 0 60px ${color}20`,
  }}>{children}</span>
);

const StatBox = ({ label, value, unit = "", color = "#00ff6a" }) => (
  <div className="flex flex-col items-center p-4 rounded-xl" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
    <div className="text-3xl font-black" style={{ color }}>{value}<span className="text-lg opacity-70">{unit}</span></div>
    <div className="text-xs uppercase tracking-widest mt-1 opacity-50">{label}</div>
  </div>
);

const SectionTitle = ({ children, sub, color = "#00ff6a" }) => (
  <div className="mb-8 mt-16">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
      <h2 className="text-3xl font-black uppercase tracking-wide" style={{ color }}>{children}</h2>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${color}, transparent)` }} />
    </div>
    {sub && <p className="text-center text-sm opacity-40 tracking-wide">{sub}</p>}
  </div>
);

const MouseCard = ({ mouse, onClick, isSelected }) => {
  const brandCol = BRAND_COLORS[mouse.brand] || "#888";
  return (
    <div
      onClick={() => onClick(mouse)}
      className="relative cursor-pointer rounded-2xl p-5 transition-all duration-300 group"
      style={{
        background: isSelected ? `${brandCol}15` : `linear-gradient(135deg, #0d0d0d, #1a1a1a)`,
        border: isSelected ? `2px solid ${brandCol}` : `1px solid #ffffff10`,
        transform: isSelected ? "scale(1.02)" : "scale(1)",
        boxShadow: isSelected ? `0 0 40px ${brandCol}20` : "none",
      }}
    >
      <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${brandCol}20`, color: brandCol }}>
        #{mice.indexOf(mouse) + 1}
      </div>
      <div className="mb-3 h-16 flex items-center">
        {MOUSE_IMAGE_URLS[mouse.name] ? (
          <img src={MOUSE_IMAGE_URLS[mouse.name]}
            alt={mouse.name} className="max-h-16 object-contain" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
            onError={e => { e.target.style.display = "none"; e.target.nextElementSibling.style.display = "block"; }} />
        ) : null}
        <span style={{ display: MOUSE_IMAGE_URLS[mouse.name] ? "none" : "block", fontSize: "2.5rem" }}>{mouse.image}</span>
      </div>
      <div className="text-base font-bold mb-0.5" style={{ color: brandCol }}>{mouse.name}</div>
      <div className="text-xs opacity-40 mb-3">{mouse.brand}</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between"><span className="opacity-40">Weight</span><span className="font-bold">{mouse.weight}g</span></div>
        <div className="flex justify-between"><span className="opacity-40">Poll</span><span className="font-bold">{mouse.pollingRate >= 1000 ? `${mouse.pollingRate / 1000}K` : mouse.pollingRate}Hz</span></div>
        <div className="flex justify-between"><span className="opacity-40">Price</span><span className="font-bold">{"$"}{mouse.price}</span></div>
        <div className="flex justify-between"><span className="opacity-40">Pro %</span><span className="font-bold" style={{ color: brandCol }}>{mouse.proUsage}%</span></div>
      </div>
      <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${mouse.rating * 10}%`, background: `linear-gradient(to right, ${brandCol}80, ${brandCol})` }} />
      </div>
      <div className="text-right text-xs mt-1 opacity-40">{mouse.rating}/10</div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs" style={{ background: "#0a0a0aee", border: "1px solid #ffffff15" }}>
      <div className="font-bold mb-1 opacity-60">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="opacity-50">{p.name}:</span>
          <span className="font-bold" style={{ color: p.color }}>{typeof p.value === 'number' && p.name?.toLowerCase().includes('usage') ? `${p.value}%` : p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function EsportsMice() {
  const [selectedMouse, setSelectedMouse] = useState(mice[0]);
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['overview','mice','rankings','sensors','players','games','brands','trends','compare'].includes(hash) ? hash : 'overview';
  });
  useEffect(() => { window.location.hash = activeTab; }, [activeTab]);
  const [sortBy, setSortBy] = useState("proUsage");
  const [filterBrand, setFilterBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [compareList, setCompareList] = useState([mice[0], mice[1]]);
  const [heroAnim, setHeroAnim] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [gameFilter, setGameFilter] = useState("All");
  const [playerSort, setPlayerSort] = useState({ key: null, dir: "asc" });
  const [rankingSort, setRankingSort] = useState({ key: "proUsage", dir: "desc" });
  const [sensorSort, setSensorSort] = useState({ key: "totalUsage", dir: "desc" });
  const [sensorGameFilter, setSensorGameFilter] = useState("All");
  const [compareSensor1, setCompareSensor1] = useState(null);
  const [compareSensor2, setCompareSensor2] = useState(null);

  useEffect(() => { setTimeout(() => setHeroAnim(true), 100); }, []);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sortedMice = [...mice]
    .filter(m => filterBrand === "All" || m.brand === filterBrand)
    .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "proUsage") return b.proUsage - a.proUsage;
      if (sortBy === "weight") return a.weight - b.weight;
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "pollingRate") return b.pollingRate - a.pollingRate;
      return 0;
    });

  const radarData = selectedMouse ? [
    { stat: "Lightness", value: Math.max(0, 100 - selectedMouse.weight), fullMark: 100 },
    { stat: "Sensor", value: Math.min(100, (selectedMouse.dpi / 44000) * 100), fullMark: 100 },
    { stat: "Poll Rate", value: (selectedMouse.pollingRate / 8000) * 100, fullMark: 100 },
    { stat: "Pro Usage", value: selectedMouse.proUsage * 4, fullMark: 100 },
    { stat: "Rating", value: selectedMouse.rating * 10, fullMark: 100 },
    { stat: "Value", value: Math.max(0, 100 - (selectedMouse.price / 2)), fullMark: 100 },
  ] : [];

  const usedByPros = proPlayers.filter(p => p.mouse === selectedMouse?.name);

  const topBrands = Object.entries(
    mice.reduce((acc, m) => { acc[m.brand] = (acc[m.brand] || 0) + m.proUsage; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]);

  const proUsageChart = (() => {
    const counts = {};
    allPlayers.forEach(p => { counts[p.mouse] = (counts[p.mouse] || 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([name, count]) => {
        const m = mice.find(mm => mm.name === name || name.includes(mm.name) || mm.name.includes(name) || mm.name.toLowerCase() === name.toLowerCase());
        let fill = m ? (BRAND_COLORS[m.brand] || "#888") : "#888";
        if (!m) {
          const n = name.toLowerCase();
          if (n.includes("zowie") || n.startsWith("ec") || n.startsWith("fk") || n.startsWith("za") || n.startsWith("s2") || n.startsWith("u2")) fill = BRAND_COLORS["Zowie"];
          else if (n.includes("razer") || n.includes("viper") || n.includes("deathadder") || n.includes("basilisk")) fill = BRAND_COLORS["Razer"];
          else if (n.includes("logitech") || n.includes("g pro")) fill = BRAND_COLORS["Logitech"];
          else if (n.includes("finalmouse") || n.includes("ultralight") || n.includes("starlight")) fill = BRAND_COLORS["Finalmouse"];
          else if (n.includes("vaxee") || n.includes("zygen") || n.includes("np-01") || n.includes("outset")) fill = BRAND_COLORS["Vaxee"];
          else if (n.includes("lamzu") || n.includes("maya") || n.includes("atlantis")) fill = BRAND_COLORS["Lamzu"];
          else if (n.includes("pulsar") || n.includes("xlite")) fill = BRAND_COLORS["Pulsar"];
          else if (n.includes("steelseries") || n.includes("aerox") || n.includes("rival")) fill = BRAND_COLORS["SteelSeries"];
          else if (n.includes("corsair") || n.includes("sabre")) fill = BRAND_COLORS["Corsair"];
        }
        return { name: name.replace(/(Logitech |Razer |Finalmouse |ZOWIE |Zowie )/, ""), usage: parseFloat((count / allPlayers.length * 100).toFixed(1)), fill };
      });
  })();

  const pieData = brandMarketShare.filter(b => b.name !== "Other").map(b => ({
    name: b.name, value: b.share, fill: BRAND_COLORS[b.name] || "#888"
  }));
  pieData.push({ name: "Other", value: (brandMarketShare.find(b => b.name === "Other") || { share: 3 }).share, fill: "#333" });

  const tabs = [
    { id: "overview", label: "Overview", icon: Home, color: "#00ff6a" },
    { id: "mice", label: "All Mice", icon: Mouse, color: "#c084fc" },
    { id: "rankings", label: "Rankings", icon: Trophy, color: "#d4af37" },
    { id: "sensors", label: "Sensors", icon: Cpu, color: "#10b981" },
    { id: "players", label: "Pro Players", icon: Users, color: "#00b4ff" },
    { id: "games", label: "Games", icon: Gamepad2, color: "#ff4655" },
    { id: "brands", label: "Brands", icon: Building2, color: "#f59e0b" },
    { id: "trends", label: "Trends", icon: TrendingUp, color: "#f472b6" },
    { id: "compare", label: "Compare", icon: GitCompare, color: "#8b5cf6" },
  ];

  const allBrands = ["All", ...new Set(mice.map(m => m.brand))];

  return (
    <div className="min-h-screen text-white" style={{ background: "#050505", fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700;800&family=Space+Grotesk:wght@400;500;700&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />

      {/* ─── HERO ─── */}
      <header className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, #00ff6a08 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 100%, #00b4ff06 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, #ff3c3c04 0%, transparent 70%)"
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, #ffffff03 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, #ffffff03 50px)`,
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🖱️</span>
              <span style={{ fontFamily: "Orbitron", fontSize: 14, letterSpacing: 6, color: "#00ff6a" }}>ESPORTSMICE</span>
              <span className="text-xs opacity-20">.com</span>
            </div>
            <div className="flex gap-4 text-xs opacity-40">
              <span>{allPlayers.length}+ Pros Tracked</span>
              <span>·</span>
              <span>{new Set(mice.map(m => m.brand)).size}+ Mouse Brands</span>
              <span>·</span>
              <span>{new Set(allPlayers.map(p=>p.game)).size} Major Games</span>
            </div>
          </div>

          <div className="text-center" style={{ transition: "all 1s ease", opacity: heroAnim ? 1 : 0, transform: heroAnim ? "translateY(0)" : "translateY(30px)" }}>
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest opacity-30">The Definitive Guide to</span>
            </div>
            <h1 style={{ fontFamily: "Orbitron", fontSize: 56, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1 }}>
              <span style={{ color: "#fff" }}>PRO </span>
              <span style={{ color: "#00ff6a", textShadow: "0 0 40px #00ff6a30" }}>ESPORTS</span>
              <br />
              <span style={{ color: "#fff" }}>GAMING </span>
              <span style={{ color: "#00b4ff", textShadow: "0 0 40px #00b4ff30" }}>MICE</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm opacity-40 leading-relaxed">
              Comprehensive data on every mouse used by professional players across CS2, Valorant, League of Legends, Dota 2, Fortnite, Call of Duty, Overwatch 2, Apex Legends, Rainbow Six Siege, and Rocket League. Rankings, specs, comparisons, and settings  -  all in one place.
            </p>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            {[
              { val: `${allPlayers.length}`, label: "Pro Players" },
              { val: `${mice.length}`, label: "Mouse Models" },
              { val: `${new Set(allPlayers.map(p=>p.game)).size}`, label: "Major Games" },
              { val: `${Math.max(...mice.map(m => m.proUsage))}%`, label: "Top Mouse Share" },
            ].map((s, i) => (
              <div key={i} className="text-center" style={{ transition: `all 0.8s ease ${i * 0.15}s`, opacity: heroAnim ? 1 : 0 }}>
                <div className="text-2xl font-black" style={{ fontFamily: "Orbitron", color: i % 2 === 0 ? "#00ff6a" : "#00b4ff" }}>{s.val}</div>
                <div className="text-xs opacity-30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ─── NAV TABS ─── */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: "#050505ee", borderColor: "#ffffff0a", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto py-2">
          {tabs.map(t => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
            <button key={t.id} onClick={() => { setActiveTab(t.id); if (t.id === "players") setSelectedPlayer(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200"
              style={{
                background: isActive ? `${t.color}15` : "transparent",
                border: isActive ? `1px solid ${t.color}30` : "1px solid transparent",
                boxShadow: isActive ? `0 0 12px ${t.color}15` : "none",
              }}>
              <span className="flex items-center gap-1.5">
                <Icon size={14} strokeWidth={2.5} style={{ color: t.color }} />
                <span style={{ color: isActive ? t.color : "#ffffff50" }}>{t.label}</span>
              </span>
            </button>
            );
          })}
        </div>
      </nav>

      {/* ─── CONTENT ─── */}
      <main className="max-w-7xl mx-auto px-6 pb-20">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            <SectionTitle color="#00ff6a" sub={`Based on data from ${allPlayers.length} professional esports players across ${new Set(allPlayers.map(p=>p.game)).size} major titles`}>Mouse Usage by Professional Players</SectionTitle>
            <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
              <ResponsiveContainer width="100%" height={360}>
                <BarChart data={proUsageChart} margin={{ top: 10, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="name" tick={{ fill: "#ffffff40", fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="usage" radius={[6, 6, 0, 0]} name="Pro Usage" label={{ position: "top", fill: "#ffffff60", fontSize: 10, formatter: (v) => `${v}%` }}>
                    {proUsageChart.map((entry, i) => <Cell key={i} fill={entry.fill} fillOpacity={0.8} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ── QUICK INSIGHTS ── */}
            {(() => {
              const mouseCounts = {};
              allPlayers.forEach(p => { mouseCounts[p.mouse] = (mouseCounts[p.mouse] || 0) + 1; });
              const topMouseEntry = Object.entries(mouseCounts).sort((a,b) => b[1]-a[1])[0];
              const allEdpis = allPlayers.filter(p => p.edpi > 0 && p.edpi < 50000).map(p => p.edpi);
              const avgEdpi = allEdpis.length ? Math.round(allEdpis.reduce((a,b) => a+b, 0) / allEdpis.length) : 0;
              const wirelessCount = allPlayers.filter(p => { const m = mice.find(mm => mm.name === p.mouse || p.mouse.includes(mm.name)); return m?.connectivity === "Wireless"; }).length;
              const wirelessPct = Math.round(wirelessCount / allPlayers.length * 100);
              const lightest = [...mice].sort((a,b) => a.weight - b.weight)[0];
              const avgDpi = Math.round(allPlayers.reduce((a,p) => a + p.dpi, 0) / allPlayers.length);
              return (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-6">
                {[
                  { label: "Most Used Mouse", value: topMouseEntry[0].replace(/(Logitech |Razer )/, ""), sub: `${Math.round(topMouseEntry[1]/allPlayers.length*100)}% of pros`, color: "#00ff6a", icon: "👑" },
                  { label: "Avg Pro eDPI", value: avgEdpi, sub: allEdpis.length + " players tracked", color: "#ff4655", icon: "🎯" },
                  { label: "Wireless Adoption", value: `${wirelessPct}%`, sub: "of tracked pros", color: "#00b4ff", icon: "📡" },
                  { label: "Lightest Mouse", value: `${lightest.weight}g`, sub: lightest.name.replace(/(WLMouse |Finalmouse )/, ""), color: "#f472b6", icon: "🪶" },
                  { label: "Avg Pro DPI", value: avgDpi, sub: "across all games", color: "#d4af37", icon: "⚙️" },
                ].map((card, i) => (
                  <div key={i} className="rounded-xl p-4 text-center transition-all hover:scale-[1.02]" style={{ background: `${card.color}06`, border: `1px solid ${card.color}12` }}>
                    <div className="text-lg mb-1">{card.icon}</div>
                    <div className="text-lg font-black" style={{ color: card.color }}>{card.value}</div>
                    <div className="text-xs opacity-50 mt-0.5">{card.label}</div>
                    <div style={{ fontSize: 9 }} className="opacity-25 mt-1">{card.sub}</div>
                  </div>
                ))}
              </div>
              );
            })()}

            <SectionTitle color="#d4af37" sub="Select any mouse to see detailed performance radar and specs">Featured Mouse Spotlight</SectionTitle>
              <div className="rounded-2xl p-5 mb-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                {/* Brand filter + mouse selector */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["All", ...new Set(mice.map(m => m.brand))].map(b => (
                    <button key={b} onClick={() => setFilterBrand(b)}
                      className="px-2.5 py-1 rounded-full text-xs font-bold transition-all"
                      style={{
                        background: filterBrand === b ? (BRAND_COLORS[b] || "#fff") : "#ffffff06",
                        color: filterBrand === b ? "#000" : "#ffffff30",
                        border: filterBrand === b ? "none" : "1px solid #ffffff08",
                        fontSize: 10,
                      }}>
                      {b}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[...mice].filter(m => m.proUsage >= 1).sort((a, b) => b.proUsage - a.proUsage).filter(m => filterBrand === "All" || m.brand === filterBrand).map(m => (
                    <button key={m.id} onClick={() => setSelectedMouse(m)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap hover:scale-[1.03]"
                      style={{
                        background: selectedMouse?.id === m.id ? BRAND_COLORS[m.brand] : "#ffffff06",
                        color: selectedMouse?.id === m.id ? "#000" : "#ffffff40",
                        border: selectedMouse?.id === m.id ? "none" : "1px solid #ffffff08",
                        fontSize: 10,
                      }}>
                      {m.name.replace(/(Logitech |Razer |Finalmouse |Lamzu |Pulsar |SteelSeries |Corsair |Endgame Gear |ASUS |Ninjutso |WLMouse |Sony |Zowie )/, "")}
                    </button>
                  ))}
                </div>
                {selectedMouse && (() => {
                  const brandCol = BRAND_COLORS[selectedMouse.brand];
                  const imgUrl = MOUSE_IMAGE_URLS[selectedMouse.name];
                  return (
                  <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Mouse image */}
                    <div className="flex flex-col items-center justify-center rounded-xl p-4" style={{ background: `${brandCol}06`, border: `1px solid ${brandCol}12` }}>
                      {imgUrl ? (
                        <img src={imgUrl} alt={selectedMouse.name} className="max-h-48 object-contain mb-3 rounded-lg" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}
                          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                      ) : null}
                      <div className={imgUrl ? "hidden" : "flex"} style={{ width: 180, height: 160, alignItems: "center", justifyContent: "center", background: `${brandCol}10`, borderRadius: 16 }}>
                        <span className="text-7xl">{selectedMouse.image}</span>
                      </div>
                      <div className="text-xl font-black mt-2 text-center" style={{ color: brandCol }}>{selectedMouse.name}</div>
                      <div className="text-xs opacity-40 text-center">{selectedMouse.brand} · {selectedMouse.shape} · {selectedMouse.connectivity}</div>
                    </div>

                    {/* Center: Radar chart */}
                    <div className="flex flex-col items-center justify-center">
                      <ResponsiveContainer width="100%" height={240}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#ffffff10" />
                          <PolarAngleAxis dataKey="stat" tick={{ fill: "#ffffff50", fontSize: 11 }} />
                          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                          <Radar name={selectedMouse.name} dataKey="value" stroke={brandCol} fill={brandCol} fillOpacity={0.2} strokeWidth={2.5} dot={{ r: 4, fill: brandCol, strokeWidth: 0 }} />
                        </RadarChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-4 gap-2 w-full mt-2">
                        <StatBox label="Weight" value={selectedMouse.weight} unit="g" color={brandCol} />
                        <StatBox label="DPI" value={selectedMouse.dpi >= 1000 ? `${(selectedMouse.dpi / 1000).toFixed(0)}K` : selectedMouse.dpi} color={brandCol} />
                        <StatBox label="Poll Rate" value={selectedMouse.pollingRate >= 1000 ? `${selectedMouse.pollingRate / 1000}K` : selectedMouse.pollingRate} unit="Hz" color={brandCol} />
                        <StatBox label="Price" value={`$${selectedMouse.price}`} color={brandCol} />
                      </div>
                      <a href={`https://amazon.com/s?k=${encodeURIComponent(selectedMouse.name)}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-black transition-all mt-2"
                        style={{ background: brandCol, color: "#000" }}>
                        🛒 Buy on Amazon
                      </a>
                    </div>

                    {/* Right: Pro users */}
                    <div>
                      <div className="text-xs uppercase tracking-widest opacity-30 mb-3">Notable Pro Users</div>
                      {usedByPros.length > 0 ? (
                        <div className="space-y-2">
                          {usedByPros.slice(0, 3).map((p, i) => {
                            const gameColors = { CS2: "#ff8c00", Valorant: "#ff4655", "League of Legends": "#c89b3c", LoL: "#c89b3c", Fortnite: "#4c7bd9", "Dota 2": "#e74c3c", "R6 Siege": "#4a86c8", "Call of Duty": "#5cb85c" };
                            const gc = gameColors[p.game] || "#888";
                            return (
                              <button key={i} onClick={() => { setSelectedPlayer(p); setActiveTab("players"); }}
                                className="w-full flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all hover:scale-[1.02] text-left"
                                style={{ background: `${gc}08`, border: `1px solid ${gc}15` }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${gc}15` }}>
                                  {p.country}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-black">{p.name}</div>
                                  <div className="text-xs opacity-40">{p.team} · <span style={{ color: gc }}>{p.game}</span> · {p.role}</div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-xs font-bold">{p.dpi} DPI</div>
                                  <div className="text-xs opacity-30">{p.edpi ? `${p.edpi} eDPI` : ""}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-xs opacity-20 py-8 text-center">No tracked pros currently using this mouse</div>
                      )}
                    </div>
                  </div>

                  {/* ── Mouse Description ── */}
                  {MOUSE_DESCRIPTIONS[selectedMouse.name] && (() => {
                    const desc = MOUSE_DESCRIPTIONS[selectedMouse.name];
                    const brandCol = BRAND_COLORS[selectedMouse.brand];
                    const parts = [];
                    
                    if (desc.highlights && desc.highlights.length > 0) {
                      // Sort highlights by position in text
                      const sorted = [...desc.highlights]
                        .map(h => ({ h, idx: desc.text.indexOf(h) }))
                        .filter(x => x.idx !== -1)
                        .sort((a, b) => a.idx - b.idx);
                      
                      let cursor = 0;
                      sorted.forEach(({ h, idx }) => {
                        if (idx > cursor) parts.push({ text: desc.text.slice(cursor, idx), highlight: false });
                        parts.push({ text: h, highlight: true });
                        cursor = idx + h.length;
                      });
                      if (cursor < desc.text.length) parts.push({ text: desc.text.slice(cursor), highlight: false });
                    } else {
                      parts.push({ text: desc.text, highlight: false });
                    }

                    return (
                      <div className="rounded-xl p-5 mt-4" style={{ background: `${brandCol}05`, border: `1px solid ${brandCol}10` }}>
                        <div className="text-xs uppercase tracking-widest opacity-30 mb-2">About this mouse</div>
                        <p className="text-sm leading-relaxed opacity-60">
                          {parts.map((p, i) => p.highlight ? (
                            <span key={i} className="font-bold opacity-100" style={{ color: brandCol }}>{p.text}</span>
                          ) : (
                            <span key={i}>{p.text}</span>
                          ))}
                        </p>
                      </div>
                    );
                  })()}

                  {/* ── Deep Dive Stats Panel ── */}
                  {(() => {
                    const mousePlayers = allPlayers.filter(p => p.mouse && (p.mouse === selectedMouse.name || p.mouse.includes(selectedMouse.name.split(" ").slice(-2).join(" "))));
                    const totalTracked = allPlayers.length;
                    const marketShare = totalTracked > 0 ? ((mousePlayers.length / totalTracked) * 100).toFixed(1) : 0;
                    
                    const gameDistro = {};
                    mousePlayers.forEach(p => { gameDistro[p.game] = (gameDistro[p.game] || 0) + 1; });
                    const topGames = Object.entries(gameDistro).sort((a, b) => b[1] - a[1]);
                    const gcols = { CS2: "#ff8c00", Valorant: "#ff4655", LoL: "#c89b3c", Fortnite: "#4c7bd9", "Overwatch 2": "#f99e1a", Apex: "#dc2626", "Dota 2": "#e74c3c", "R6 Siege": "#4a86c8", "Rocket League": "#1a9fff", "Call of Duty": "#5cb85c", "Marvel Rivals": "#ed1d24", PUBG: "#f2a900", Deadlock: "#8b5cf6" };

                    const dpiCounts = {};
                    mousePlayers.forEach(p => { if (p.dpi) dpiCounts[p.dpi] = (dpiCounts[p.dpi] || 0) + 1; });
                    const topDpi = Object.entries(dpiCounts).sort((a, b) => b[1] - a[1]);

                    const edpis = mousePlayers.filter(p => p.edpi && p.edpi > 0).map(p => p.edpi);
                    const avgEdpi = edpis.length > 0 ? Math.round(edpis.reduce((a, b) => a + b, 0) / edpis.length) : null;
                    const minEdpi = edpis.length > 0 ? Math.min(...edpis) : null;
                    const maxEdpi = edpis.length > 0 ? Math.max(...edpis) : null;

                    const countryCounts = {};
                    mousePlayers.forEach(p => { if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1; });
                    const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

                    const teamCounts = {};
                    mousePlayers.forEach(p => { if (p.team && p.team !== "Content" && p.team !== "Inactive") teamCounts[p.team] = (teamCounts[p.team] || 0) + 1; });
                    const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

                    const allMouseCounts = {};
                    allPlayers.forEach(p => { if (p.mouse) allMouseCounts[p.mouse] = (allMouseCounts[p.mouse] || 0) + 1; });
                    const ranked = Object.entries(allMouseCounts).sort((a, b) => b[1] - a[1]);
                    const rank = ranked.findIndex(([name]) => name === selectedMouse.name || name.includes(selectedMouse.name.split(" ").slice(-2).join(" "))) + 1;

                    const competitors = mice.filter(m => m.id !== selectedMouse.id && m.shape === selectedMouse.shape && m.connectivity === selectedMouse.connectivity)
                      .sort((a, b) => b.proUsage - a.proUsage).slice(0, 3);

                    if (mousePlayers.length === 0) return <div className="mt-4 rounded-lg p-6 text-center text-xs opacity-20" style={{ background: "#ffffff04" }}>No tracked players found for this mouse in our database</div>;

                    return (
                      <div className="mt-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${brandCol}12` }}>
                        <div className="px-4 py-3 flex items-center gap-2" style={{ background: `${brandCol}08`, borderBottom: `1px solid ${brandCol}10` }}>
                          <span>📊</span>
                          <span className="text-xs font-black uppercase tracking-widest" style={{ color: brandCol }}>Deep Dive</span>
                          <span className="text-xs opacity-30">·</span>
                          <span className="text-xs opacity-40">{selectedMouse.name} across {totalTracked.toLocaleString()} tracked pros</span>
                        </div>

                        <div className="p-4" style={{ background: "#0a0a0a" }}>
                          {/* Key metrics row */}
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                            {[
                              { label: "Pro Users", value: mousePlayers.length, icon: "👤" },
                              { label: "Market Share", value: `${marketShare}%`, icon: "📈" },
                              { label: "Popularity Rank", value: rank > 0 ? `#${rank}` : " - ", icon: "🏆" },
                              { label: "Avg eDPI", value: avgEdpi || " - ", icon: "🎯" },
                              { label: "Games Present", value: topGames.length, icon: "🎮" },
                            ].map((stat, idx) => (
                              <div key={idx} className="rounded-lg p-3 text-center" style={{ background: "#ffffff05" }}>
                                <div className="text-lg mb-0.5">{stat.icon}</div>
                                <div className="text-lg font-black" style={{ color: brandCol }}>{stat.value}</div>
                                <div style={{ fontSize: 10 }} className="opacity-30">{stat.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* 3-column detail grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* Game Popularity */}
                            <div className="rounded-lg p-3" style={{ background: "#ffffff04" }}>
                              <div className="text-xs opacity-30 mb-2.5 font-bold uppercase tracking-wider">🎮 Game Breakdown</div>
                              <div className="space-y-2">
                                {topGames.slice(0, 5).map(([game, count]) => (
                                  <div key={game}>
                                    <div className="flex justify-between text-xs mb-0.5">
                                      <span className="font-bold" style={{ color: gcols[game] || "#888" }}>{game}</span>
                                      <span className="opacity-50">{count} players · {((count / mousePlayers.length) * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                                      <div className="h-full rounded-full transition-all" style={{ width: `${(count / topGames[0][1]) * 100}%`, background: gcols[game] || "#888", opacity: 0.7 }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* DPI + eDPI */}
                            <div className="rounded-lg p-3" style={{ background: "#ffffff04" }}>
                              <div className="text-xs opacity-30 mb-2.5 font-bold uppercase tracking-wider">⚙️ Settings Profile</div>
                              <div className="text-xs opacity-30 mb-1.5">Most Common DPI</div>
                              <div className="space-y-1.5 mb-3">
                                {topDpi.slice(0, 3).map(([dpi, count]) => (
                                  <div key={dpi} className="flex items-center gap-2">
                                    <span className="text-xs font-black w-12" style={{ color: brandCol }}>{dpi}</span>
                                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                                      <div className="h-full rounded-full" style={{ width: `${(count / topDpi[0][1]) * 100}%`, background: brandCol, opacity: 0.6 }} />
                                    </div>
                                    <span className="text-xs opacity-40 w-14 text-right">{((count / mousePlayers.length) * 100).toFixed(0)}%</span>
                                  </div>
                                ))}
                              </div>
                              {avgEdpi && (
                                <div>
                                  <div className="text-xs opacity-30 mb-1.5">eDPI Range</div>
                                  <div className="flex items-center gap-1 text-xs">
                                    <span className="opacity-50">{minEdpi}</span>
                                    <div className="flex-1 h-2 rounded-full relative overflow-hidden" style={{ background: "#ffffff08" }}>
                                      <div className="absolute h-full rounded-full" style={{ left: `${Math.max(0, ((avgEdpi - minEdpi) / (maxEdpi - minEdpi || 1)) * 100 - 5)}%`, width: "10%", background: brandCol, opacity: 0.8 }} />
                                    </div>
                                    <span className="opacity-50">{maxEdpi}</span>
                                  </div>
                                  <div className="text-center text-xs mt-1"><span className="font-black" style={{ color: brandCol }}>{avgEdpi}</span> <span className="opacity-30">avg</span></div>
                                </div>
                              )}
                            </div>

                            {/* Regions + Teams */}
                            <div className="rounded-lg p-3" style={{ background: "#ffffff04" }}>
                              <div className="text-xs opacity-30 mb-2.5 font-bold uppercase tracking-wider">🌍 Demographics</div>
                              <div className="text-xs opacity-30 mb-1.5">Top Regions</div>
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {topCountries.map(([flag, count]) => (
                                  <span key={flag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs" style={{ background: `${brandCol}10` }}>
                                    <span>{flag}</span>
                                    <span className="font-bold" style={{ color: brandCol }}>{count}</span>
                                  </span>
                                ))}
                              </div>
                              {topTeams.length > 0 && (
                                <div>
                                  <div className="text-xs opacity-30 mb-1.5">Top Teams Using This Mouse</div>
                                  <div className="space-y-1.5">
                                    {topTeams.map(([team, count]) => (
                                      <div key={team} className="flex justify-between items-center text-xs">
                                        <span className="opacity-60 truncate">{team}</span>
                                        <span className="font-black px-2 py-0.5 rounded" style={{ color: brandCol, background: `${brandCol}10` }}>{count}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Competitors row */}
                          {competitors.length > 0 && (
                            <div className="mt-3 rounded-lg p-3" style={{ background: "#ffffff04" }}>
                              <div className="text-xs opacity-30 mb-2 font-bold uppercase tracking-wider">🔄 Similar Mice ({selectedMouse.shape} · {selectedMouse.connectivity})</div>
                              <div className="flex flex-wrap gap-2">
                                {competitors.map(c => {
                                  const cc = BRAND_COLORS[c.brand] || "#888";
                                  return (
                                    <button key={c.id} onClick={() => setSelectedMouse(c)}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all hover:scale-105"
                                      style={{ background: `${cc}08`, border: `1px solid ${cc}15` }}>
                                      {MOUSE_IMAGE_URLS[c.name] ? <img src={MOUSE_IMAGE_URLS[c.name]} alt="" className="h-6 object-contain" /> : <span>{c.image}</span>}
                                      <div>
                                        <div className="font-bold" style={{ color: cc }}>{c.name.replace(c.brand + " ", "")}</div>
                                        <div className="opacity-40">{c.weight}g · {c.sensor} · {"$"}{c.price}</div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  </>
                  );
                })()}
              </div>


          </div>
        )}

        {/* ── GAMES TAB ── */}
        {activeTab === "games" && (
          <div>
            <SectionTitle color="#ff3c3c" sub="Complete mouse, brand, and settings breakdown for every major esports title">Game Profiles</SectionTitle>
            <div className="space-y-8">
              {gameBreakdown.map((g, i) => {
                const gameColors = { CS2: "#ff8c00", Valorant: "#ff4655", LoL: "#c89b3c", Fortnite: "#4c7bd9", "Overwatch 2": "#f99e1a", Apex: "#dc2626", "Dota 2": "#e74c3c", "R6 Siege": "#4a86c8", "Rocket League": "#1a9fff", "Call of Duty": "#5cb85c", "Marvel Rivals": "#ed1d24", PUBG: "#f2a900", Deadlock: "#8b5cf6" };
                const col = gameColors[g.game] || "#888";
                const medals = ["🥇", "🥈", "🥉", "4.", "5."];
                return (
                  <div key={i} className="rounded-2xl p-6" style={{ background: `${col}06`, border: `1px solid ${col}12` }}>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      {GAME_IMAGE_URLS[g.game] ? <img src={GAME_IMAGE_URLS[g.game]} alt={g.game} className="h-8 w-8 object-contain" /> : <span className="text-3xl">{g.icon}</span>}
                      <div className="flex-1">
                        <div className="text-xl font-black" style={{ color: col }}>{g.game}</div>
                        <div className="text-xs opacity-30">{g.players} pros tracked</div>
                      </div>
                      <div className="flex gap-3">
                        {[{ label: "Avg Weight", val: `${g.avgWeight}g` }, { label: "Avg DPI", val: g.avgDpi }, { label: "Avg Poll Rate", val: `${g.avgPollRate >= 1000 ? `${(g.avgPollRate/1000).toFixed(1)}K` : g.avgPollRate}Hz` }, { label: "Wireless", val: `${g.wirelessPct}%` }].concat(g.avgEdpi ? [{ label: "Avg eDPI", val: g.avgEdpi }] : []).map((s, si) => (
                          <div key={si} className="text-center px-3 py-2 rounded-lg" style={{ background: `${col}10` }}>
                            <div className="text-xs font-black" style={{ color: col }}>{s.val}</div>
                            <div className="text-xs opacity-25" style={{ fontSize: 9 }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* Left: Top 5 mice with bars */}
                      <div>
                        <div className="text-xs uppercase tracking-widest opacity-30 mb-3">Top 5 Mice</div>
                        <div className="space-y-2">
                          {g.topMice.map((m, mi) => (
                            <div key={mi} className="flex items-center gap-2">
                              <span className="w-5 text-center text-xs">{medals[mi]}</span>
                              <div className="flex-1">
                                <div className="flex justify-between text-xs mb-0.5">
                                  <span className={mi === 0 ? "font-black" : mi < 3 ? "font-bold" : "opacity-60"}>{m.name}</span>
                                  <span className="font-black" style={{ color: mi === 0 ? col : undefined, opacity: mi === 0 ? 1 : 0.5 }}>{m.pct}%</span>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(m.pct / g.topMice[0].pct) * 100}%`, background: mi === 0 ? col : `${col}40`, opacity: mi === 0 ? 1 : 0.6 + (0.4 * (1 - mi / 5)) }} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Game analysis */}
                      {GAME_DESCRIPTIONS[g.game] && (
                        <div className="lg:col-span-2">
                          <p className="text-sm leading-relaxed opacity-45 px-1">{GAME_DESCRIPTIONS[g.game]}</p>
                        </div>
                      )}
                      {/* Right: Brand split with bars */}
                      <div>
                        <div className="text-xs uppercase tracking-widest opacity-30 mb-3">Brand Split</div>
                        <div className="space-y-2">
                          {g.topBrands.map((b, bi) => (
                            <div key={bi} className="flex items-center gap-2">
                              <div className="w-16 text-xs font-bold truncate" style={{ color: BRAND_COLORS[b.name] || "#888" }}>{b.name}</div>
                              <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                                <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700" style={{ width: `${b.pct}%`, background: `${BRAND_COLORS[b.name] || "#888"}30` }}>
                                  <span className="text-xs font-bold" style={{ color: BRAND_COLORS[b.name] || "#888", fontSize: 9 }}>{b.pct}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-xs opacity-30">Other</div>
                            <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                              <div className="h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${100 - g.topBrands.reduce((a, b) => a + b.pct, 0)}%`, background: "#ffffff08" }}>
                                <span className="text-xs opacity-30" style={{ fontSize: 9 }}>{100 - g.topBrands.reduce((a, b) => a + b.pct, 0)}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <SectionTitle color="#c084fc" sub="How mouse preferences differ across esports  -  weight, sensitivity, and brand loyalty visualized">Game × Mouse DNA</SectionTitle>
            {(() => {
              const gameProfiles = [
                { game: "CS2", color: "#ff8c00", icon: "💥", players: proPlayers.filter(p => p.game === "CS2"), desc: "Low sens, precision-first. Pros favor safe shapes and proven wireless tech." },
                { game: "Valorant", color: "#ff4655", icon: "🎯", players: proPlayers.filter(p => p.game === "Valorant"), desc: "Ultra-low eDPI kings. Massive arm movements, ultralight mice dominate." },
                { game: "LoL", color: "#c89b3c", icon: "⚔️", players: allPlayers.filter(p => p.game === "LoL"), desc: "High DPI, fast cursor. Ergonomic shapes preferred for long sessions." },
                { game: "Dota 2", color: "#e74c3c", icon: "🛡️", players: proPlayers.filter(p => p.game === "Dota 2"), desc: "Comfort over weight. Moderate sensitivity, ergonomic mice popular." },
                { game: "Call of Duty", color: "#5cb85c", icon: "🔫", players: proPlayers.filter(p => p.game === "Call of Duty"), desc: "Medium-high sens for fast tracking. Lightweight wireless is standard." },
                { game: "R6 Siege", color: "#4a86c8", icon: "🏰", players: proPlayers.filter(p => p.game === "R6 Siege"), desc: "Precision angles meet fast peeks. Mid-range eDPI, reliable shapes." },
              ];
              return (
                <div className="space-y-4">
                  {gameProfiles.filter(g => g.players.length >= 2).map((gp, gi) => {
                    const avgWeight = Math.round(gp.players.reduce((a, p) => { const m = mice.find(mm => mm.name === p.mouse); return a + (m?.weight || 60); }, 0) / gp.players.length);
                    const avgEdpi = gp.players.filter(p => p.edpi).length > 0 ? Math.round(gp.players.filter(p => p.edpi).reduce((a, p) => a + p.edpi, 0) / gp.players.filter(p => p.edpi).length) : null;
                    const avgDpi = Math.round(gp.players.reduce((a, p) => a + p.dpi, 0) / gp.players.length);
                    const brandCounts = {};
                    gp.players.forEach(p => { const m = mice.find(mm => mm.name === p.mouse); if (m) brandCounts[m.brand] = (brandCounts[m.brand] || 0) + 1; });
                    const topBrand = Object.entries(brandCounts).sort((a, b) => b[1] - a[1])[0];
                    const wirelessPct = Math.round((gp.players.filter(p => { const m = mice.find(mm => mm.name === p.mouse); return m?.connectivity === "Wireless"; }).length / gp.players.length) * 100);
                    const symPct = Math.round((gp.players.filter(p => { const m = mice.find(mm => mm.name === p.mouse); return m?.shape === "Symmetrical"; }).length / gp.players.length) * 100);
                    return (
                      <div key={gi} className="rounded-2xl p-6 transition-all" style={{ background: `${gp.color}06`, border: `1px solid ${gp.color}15` }}>
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-56 flex-shrink-0">
                            <div className="flex items-center gap-3 mb-2">
                              {GAME_IMAGE_URLS[gp.game] ? <img src={GAME_IMAGE_URLS[gp.game]} alt={gp.game} className="h-8 w-8 object-contain" /> : <span className="text-3xl">{gp.icon}</span>}
                              <div>
                                <div className="text-xl font-black" style={{ color: gp.color }}>{gp.game}</div>
                                <div className="text-xs opacity-30">{gp.players.length} pros sampled</div>
                              </div>
                            </div>
                            <p className="text-xs opacity-35 leading-relaxed mb-4">{gp.desc}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs"><span className="opacity-40">Avg DPI</span><span className="font-bold" style={{ color: gp.color }}>{avgDpi}</span></div>
                              {avgEdpi && <div className="flex justify-between text-xs"><span className="opacity-40">Avg eDPI</span><span className="font-bold" style={{ color: gp.color }}>{avgEdpi}</span></div>}
                              <div className="flex justify-between text-xs"><span className="opacity-40">Avg Mouse Weight</span><span className="font-bold" style={{ color: gp.color }}>{avgWeight}g</span></div>
                              {topBrand && <div className="flex justify-between text-xs"><span className="opacity-40">Top Brand</span><span className="font-bold" style={{ color: BRAND_COLORS[topBrand[0]] }}>{topBrand[0]}</span></div>}
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1"><span className="opacity-30">Wireless</span><span className="opacity-30">Wired</span></div>
                              <div className="h-5 rounded-full overflow-hidden flex" style={{ background: "#ffffff06" }}>
                                <div className="h-full rounded-l-full flex items-center justify-center text-xs font-black transition-all duration-700" style={{ width: `${wirelessPct}%`, background: `${gp.color}50`, color: gp.color }}>{wirelessPct}%</div>
                                <div className="h-full rounded-r-full flex items-center justify-center text-xs font-bold opacity-30" style={{ width: `${100 - wirelessPct}%` }}>{100 - wirelessPct}%</div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1"><span className="opacity-30">Symmetrical</span><span className="opacity-30">Ergonomic</span></div>
                              <div className="h-5 rounded-full overflow-hidden flex" style={{ background: "#ffffff06" }}>
                                <div className="h-full rounded-l-full flex items-center justify-center text-xs font-black transition-all duration-700" style={{ width: `${symPct}%`, background: `${gp.color}40`, color: gp.color }}>{symPct}%</div>
                                <div className="h-full rounded-r-full flex items-center justify-center text-xs font-bold opacity-30" style={{ width: `${100 - symPct}%` }}>{100 - symPct}%</div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1"><span className="opacity-30">Ultralight (&lt;50g)</span><span className="opacity-30">Heavy (80g+)</span></div>
                              <div className="h-8 rounded-full relative overflow-hidden" style={{ background: "linear-gradient(to right, #00ff6a15, #ff444415)" }}>
                                {gp.players.map((p, pi) => {
                                  const m = mice.find(mm => mm.name === p.mouse);
                                  const w = m?.weight || 60;
                                  const pos = Math.min(95, Math.max(5, ((w - 30) / 60) * 100));
                                  return (
                                    <div key={pi} className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                                      style={{ left: `${pos}%`, transform: `translateX(-50%) translateY(-50%)`, background: gp.color, color: "#000", fontSize: 8, zIndex: 10 - pi, boxShadow: `0 0 8px ${gp.color}60` }}
                                      title={`${p.name}: ${w}g`}>
                                      {w}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            {avgEdpi && (
                              <div>
                                <div className="flex justify-between text-xs mb-1"><span className="opacity-30">Low eDPI (precise)</span><span className="opacity-30">High eDPI (fast)</span></div>
                                <div className="h-8 rounded-full relative overflow-hidden" style={{ background: "linear-gradient(to right, #3b82f615, #f59e0b15)" }}>
                                  {gp.players.filter(p => p.edpi).map((p, pi) => {
                                    const maxE = gp.game === "LoL" || gp.game === "Dota 2" ? 25000 : 2000;
                                    const pos = Math.min(95, Math.max(5, (p.edpi / maxE) * 100));
                                    return (
                                      <div key={pi} className="absolute top-1/2 w-5 h-5 rounded-full flex items-center justify-center font-bold"
                                        style={{ left: `${pos}%`, transform: `translateX(-50%) translateY(-50%)`, background: gp.color, color: "#000", fontSize: 7, zIndex: 10 - pi, boxShadow: `0 0 8px ${gp.color}60` }}
                                        title={`${p.name}: ${p.edpi} eDPI`}>
                                        {p.edpi}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="lg:w-48 flex-shrink-0">
                            <div className="text-xs uppercase tracking-widest opacity-20 mb-3">Players</div>
                            <div className="space-y-2">
                              {gp.players.map((p, pi) => {
                                const pm = mice.find(mm => mm.name === p.mouse);
                                return (
                                  <div key={pi} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all" style={{ background: "#ffffff04", border: "1px solid #ffffff06" }}
                                    onClick={() => { setSelectedPlayer(p); setActiveTab("players"); }}>
                                    <span className="text-sm">{p.country}</span>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-bold truncate">{p.name}</div>
                                      <div className="text-xs opacity-25 truncate">{pm?.name.replace(/(Logitech |Razer |Finalmouse |Lamzu |Zowie )/, "") || p.mouse}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}


        {/* ── RANKINGS TAB ── */}
        {activeTab === "rankings" && (
          <div>
            <SectionTitle color="#00ff6a" sub="Sort and filter to find the perfect esports mouse">Complete Mouse Rankings</SectionTitle>
            <div className="flex flex-wrap gap-3 mb-6">
              <input
                type="text" placeholder="Search mice..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm outline-none flex-1 min-w-48"
                style={{ background: "#0a0a0a", border: "1px solid #ffffff15", color: "#fff" }}
              />
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm cursor-pointer"
                style={{ background: "#0a0a0a", border: "1px solid #ffffff15", color: "#fff" }}>
                <option value="proUsage">Pro Usage %</option>
                <option value="weight">Weight (Light→Heavy)</option>
                <option value="price">Price (Low→High)</option>
                <option value="rating">Rating</option>
                <option value="pollingRate">Polling Rate</option>
              </select>
              <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm cursor-pointer"
                style={{ background: "#0a0a0a", border: "1px solid #ffffff15", color: "#fff" }}>
                {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #ffffff08" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#0a0a0a" }}>
                    {[
                      { key: null, label: "#" },
                      { key: "name", label: "Mouse" },
                      { key: "brand", label: "Brand" },
                      { key: "weight", label: "Weight" },
                      { key: "sensor", label: "Sensor" },
                      { key: "pollingRate", label: "Poll Rate" },
                      { key: "shape", label: "Shape" },
                      { key: "price", label: "Price" },
                      { key: "proUsage", label: "Pro %" },
                      { key: "rating", label: "Rating" },
                    ].map(h => (
                      <th key={h.label} className={`px-4 py-3 text-left text-xs uppercase tracking-wider font-bold ${h.key ? "cursor-pointer select-none hover:opacity-80" : ""}`}
                        style={{ color: rankingSort.key === h.key ? "#00ff6a" : "#ffffff30" }}
                        onClick={() => { if (h.key) setRankingSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: typeof sortedMice[0]?.[h.key] === "string" ? "asc" : "desc" }); }}>
                        {h.label}{rankingSort.key === h.key ? (rankingSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...sortedMice].sort((a, b) => {
                    if (!rankingSort.key) return 0;
                    const k = rankingSort.key;
                    let av = a[k], bv = b[k];
                    if (typeof av === "string") return rankingSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
                    return rankingSort.dir === "asc" ? av - bv : bv - av;
                  }).map((m, i) => {
                    const col = BRAND_COLORS[m.brand] || "#888";
                    return (
                      <tr key={m.id} className="cursor-pointer transition-all" onClick={() => { setSelectedMouse(m); setActiveTab("overview"); }}
                        style={{ borderBottom: "1px solid #ffffff05", background: i % 2 === 0 ? "#050505" : "#080808" }}
                        onMouseEnter={e => e.currentTarget.style.background = `${col}08`}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#050505" : "#080808"}>
                        <td className="px-4 py-3 font-black opacity-20">{i + 1}</td>
                        <td className="px-4 py-3 font-bold" style={{ color: col }}>{MOUSE_IMAGE_URLS[m.name] ? <img src={MOUSE_IMAGE_URLS[m.name]} alt="" className="inline h-5 mr-2 object-contain" /> : <span className="mr-2">{m.image}</span>}{m.name}</td>
                        <td className="px-4 py-3 opacity-50">{m.brand}</td>
                        <td className="px-4 py-3 font-bold">{m.weight}g</td>
                        <td className="px-4 py-3 opacity-50 text-xs">{m.sensor}</td>
                        <td className="px-4 py-3">{m.pollingRate >= 1000 ? `${m.pollingRate / 1000}K` : m.pollingRate}Hz</td>
                        <td className="px-4 py-3 opacity-50">{m.shape}</td>
                        <td className="px-4 py-3 font-bold">{"$"}{m.price}</td>
                        <td className="px-4 py-3 font-black" style={{ color: col }}>{m.proUsage}%</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                              <div className="h-full rounded-full" style={{ width: `${m.rating * 10}%`, background: col }} />
                            </div>
                            <span className="text-xs opacity-50">{m.rating}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ALL MICE TAB ── */}
        {activeTab === "mice" && (
          <div>
            <SectionTitle color="#c084fc" sub="Click any mouse for detailed breakdown">Mouse Showcase Gallery</SectionTitle>
            <div className="flex flex-wrap gap-3 mb-6">
              <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm outline-none flex-1 min-w-48" style={{ background: "#0a0a0a", border: "1px solid #ffffff15", color: "#fff" }} />
              <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm cursor-pointer" style={{ background: "#0a0a0a", border: "1px solid #ffffff15", color: "#fff" }}>
                {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedMice.map(m => (
                <MouseCard key={m.id} mouse={m} onClick={(mouse) => { setSelectedMouse(mouse); setActiveTab("overview"); }} isSelected={selectedMouse?.id === m.id} />
              ))}
            </div>
          </div>
        )}

        {/* ── PRO PLAYER PROFILE VIEW ── */}
        {activeTab === "players" && selectedPlayer && (() => {
          const p = selectedPlayer;
          const gameColors = { CS2: "#ff8c00", Valorant: "#ff4655", "League of Legends": "#c89b3c", LoL: "#c89b3c", Fortnite: "#4c7bd9", "Dota 2": "#e74c3c", "R6 Siege": "#4a86c8", "Rocket League": "#1a9fff", "Call of Duty": "#5cb85c", "Marvel Rivals": "#ed1d24", PUBG: "#f2a900", Deadlock: "#8b5cf6" };
          const gc = gameColors[p.game] || "#888";
          const currentMouseData = mice.find(m => m.name === p.mouse);
          const brandCol = currentMouseData ? BRAND_COLORS[currentMouseData.brand] : "#888";
          return (
            <div>
              <button onClick={() => setSelectedPlayer(null)} className="mt-8 mb-4 flex items-center gap-2 text-sm opacity-40 hover:opacity-80 transition-all">
                ← Back to all players
              </button>
              {/* Header */}
              <div className="rounded-2xl p-8 mb-6" style={{ background: `linear-gradient(135deg, ${gc}10, #0a0a0a)`, border: `1px solid ${gc}25` }}>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="text-6xl">{p.country}</div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest opacity-30 mb-1">{p.role} · {p.team}</div>
                    <h2 className="text-4xl font-black mb-1" style={{ fontFamily: "Orbitron", color: gc }}>{p.name}</h2>
                    <div className="text-sm opacity-50 mb-3">{p.fullName} · Age {p.age}</div>
                    <p className="text-sm opacity-50 leading-relaxed max-w-2xl">{p.bio}</p>
                    <div className="flex gap-3 mt-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${gc}20`, color: gc }}>{p.game}</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: "#ffffff08", color: "#fff" }}>{p.team}</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: "#ffffff08", color: "#fff" }}>{p.role}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 min-w-48">
                    <StatBox label="DPI" value={p.dpi} color={gc} />
                    <StatBox label="Sens" value={p.sens ?? " - "} color={gc} />
                    <StatBox label="eDPI" value={p.edpi ?? " - "} color={gc} />
                    <StatBox label="Age" value={p.age} color={gc} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Achievements */}
                <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                  <div className="text-xs uppercase tracking-widest opacity-30 mb-4">🏆 Top Achievements</div>
                  <div className="space-y-2">
                    {p.achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: i < 3 ? `${gc}08` : "#ffffff04", border: i < 3 ? `1px solid ${gc}15` : "1px solid #ffffff06" }}>
                        <span className="text-sm mt-0.5">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "▸"}</span>
                        <span className="text-sm" style={{ color: i < 3 ? gc : "#ffffffa0" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mouse History + Current Setup */}
                <div className="space-y-6">
                  {/* Current Mouse */}
                  <div className="rounded-2xl p-6" style={{ background: `${brandCol}08`, border: `1px solid ${brandCol}20` }}>
                    <div className="text-xs uppercase tracking-widest opacity-30 mb-4">🖱️ Current Mouse</div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{currentMouseData?.image || "🖱️"}</span>
                      <div>
                        <div className="text-xl font-black" style={{ color: brandCol }}>{p.mouse}</div>
                        <div className="text-xs opacity-40">{currentMouseData?.brand} · {currentMouseData?.weight}g · {currentMouseData?.shape} · {currentMouseData?.connectivity}</div>
                      </div>
                    </div>
                    {currentMouseData && (
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="text-center p-2 rounded-lg" style={{ background: "#ffffff06" }}>
                          <div className="text-xs opacity-30">Weight</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentMouseData.weight}g</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#ffffff06" }}>
                          <div className="text-xs opacity-30">Sensor</div>
                          <div className="text-xs font-bold" style={{ color: brandCol }}>{currentMouseData.sensor}</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#ffffff06" }}>
                          <div className="text-xs opacity-30">Poll Rate</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentMouseData.pollingRate >= 1000 ? `${currentMouseData.pollingRate/1000}K` : currentMouseData.pollingRate}Hz</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#ffffff06" }}>
                          <div className="text-xs opacity-30">Price</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{"$"}{currentMouseData.price}</div>
                        </div>
                      </div>
                    )}
                    <a href={`https://amazon.com/s?k=${encodeURIComponent(p.mouse)}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all"
                      style={{ background: brandCol, color: "#000" }}>
                      🛒 Buy {p.mouse.split(" ").slice(-3).join(" ")} on Amazon
                    </a>
                  </div>

                  {/* Mouse History Timeline */}
                  <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                    <div className="text-xs uppercase tracking-widest opacity-30 mb-4">📜 Mouse History</div>
                    <div className="space-y-0">
                      {p.mouseHistory.map((mh, i) => {
                        const histMouse = mice.find(m => m.name === mh.mouse);
                        const hCol = histMouse ? BRAND_COLORS[histMouse.brand] : "#555";
                        return (
                          <div key={i} className="flex items-center gap-4 relative">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full z-10" style={{ background: i === 0 ? hCol : "#333", border: i === 0 ? `2px solid ${hCol}` : "2px solid #555", boxShadow: i === 0 ? `0 0 12px ${hCol}40` : "none" }} />
                              {i < p.mouseHistory.length - 1 && <div className="w-0.5 h-10" style={{ background: "#ffffff10" }} />}
                            </div>
                            <div className="flex-1 py-2">
                              <div className="text-sm font-bold" style={{ color: i === 0 ? hCol : "#ffffff60" }}>{mh.mouse}</div>
                              <div className="text-xs opacity-30">{mh.period}</div>
                            </div>
                            {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${hCol}20`, color: hCol }}>Current</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Other players from same game */}
              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest opacity-30 mb-4">Other {p.game} Players</div>
                <div className="flex flex-wrap gap-3">
                  {proPlayers.filter(op => op.game === p.game && op.name !== p.name).map((op, i) => (
                    <button key={i} onClick={() => setSelectedPlayer(op)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{ background: "#0a0a0a", border: "1px solid #ffffff10" }}>
                      <span>{op.country}</span>
                      <span>{op.name}</span>
                      <span className="opacity-30">({op.team})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── PRO PLAYERS LIST TAB ── */}
        {activeTab === "players" && !selectedPlayer && (() => {
          const gameColors = { CS2: "#ff8c00", Valorant: "#ff4655", "League of Legends": "#c89b3c", LoL: "#c89b3c", Fortnite: "#4c7bd9", "Dota 2": "#e74c3c", "R6 Siege": "#4a86c8", "Rocket League": "#1a9fff", "Call of Duty": "#5cb85c", "Overwatch 2": "#f99e1a", Apex: "#dc2626", "Marvel Rivals": "#ed1d24", PUBG: "#f2a900", Deadlock: "#8b5cf6" };
          const allGames = ["All", ...new Set(allPlayers.map(p => p.game))];
          const filteredPlayers = allPlayers
            .filter(p => gameFilter === "All" || p.game === gameFilter)
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.team.toLowerCase().includes(searchQuery.toLowerCase()) || p.mouse.toLowerCase().includes(searchQuery.toLowerCase()));
          const sortedPlayers = [...filteredPlayers].sort((a, b) => {
            if (!playerSort.key) return 0;
            const k = playerSort.key;
            let av = a[k], bv = b[k];
            if (av == null) av = k === "name" || k === "game" || k === "team" || k === "mouse" || k === "role" ? "" : -Infinity;
            if (bv == null) bv = k === "name" || k === "game" || k === "team" || k === "mouse" || k === "role" ? "" : -Infinity;
            if (typeof av === "string") { return playerSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av); }
            return playerSort.dir === "asc" ? av - bv : bv - av;
          });
          const sortHeaders = [
            { key: null, label: "" },
            { key: "name", label: "Player" },
            { key: "game", label: "Game" },
            { key: "team", label: "Team" },
            { key: "mouse", label: "Mouse" },
            { key: "hz", label: "Hz" },
            { key: "dpi", label: "DPI" },
            { key: "sens", label: "Sens" },
            { key: "edpi", label: "eDPI" },
            { key: "role", label: "Role" },
          ];
          return (
          <div>
            <SectionTitle color="#00b4ff" sub={`${allPlayers.length} players across ${new Set(allPlayers.map(p=>p.game)).size} games  -  click starred players for full profiles`}>Pro Player Settings Database</SectionTitle>
            {/* Player quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {(() => {
                const fp = gameFilter === "All" ? allPlayers : allPlayers.filter(p => p.game === gameFilter);
                const mc = {}; fp.forEach(p => { mc[p.mouse] = (mc[p.mouse] || 0) + 1; });
                const topM = Object.entries(mc).sort((a,b) => b[1]-a[1])[0];
                const edpis = fp.filter(p => p.edpi > 0 && p.edpi < 50000).map(p => p.edpi);
                const avgE = edpis.length ? Math.round(edpis.reduce((a,b) => a+b,0)/edpis.length) : 0;
                const countries = new Set(fp.map(p => p.country)).size;
                const teams = new Set(fp.filter(p => p.team !== "Content" && p.team !== "Free Agent" && p.team !== "Inactive" && p.team !== "Retired").map(p => p.team)).size;
                return [
                  { label: "Top Mouse", value: topM ? topM[0].replace(/(Logitech |Razer )/, "") : "-", color: "#00ff6a" },
                  { label: "Avg eDPI", value: avgE || "-", color: "#ff4655" },
                  { label: "Countries", value: countries, color: "#00b4ff" },
                  { label: "Active Teams", value: teams, color: "#d4af37" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center" style={{ background: `${s.color}06`, border: `1px solid ${s.color}10` }}>
                    <div className="text-sm font-black" style={{ color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 10 }} className="opacity-30 mt-0.5">{s.label}</div>
                  </div>
                ));
              })()}
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <input type="text" placeholder="Search player, team, or mouse..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm outline-none flex-1 min-w-48" style={{ background: "#0a0a0a", border: "1px solid #ffffff15", color: "#fff" }} />
              <select value={gameFilter} onChange={e => setGameFilter(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm cursor-pointer" style={{ background: "#0a0a0a", border: "1px solid #ffffff15", color: "#fff" }}>
                {allGames.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <div className="flex items-center gap-2 text-xs opacity-40 px-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /> = Full profile available
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #ffffff08", maxHeight: 600 }}>
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr style={{ background: "#0a0a0a" }}>
                    {sortHeaders.map(h => (
                      <th key={h.label || "_star"} className={`px-3 py-3 text-left text-xs uppercase tracking-wider font-bold ${h.key ? "cursor-pointer select-none hover:opacity-80" : ""}`}
                        style={{ color: playerSort.key === h.key ? "#00b4ff" : "#ffffff30" }}
                        onClick={() => { if (h.key) setPlayerSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: "asc" }); }}>
                        {h.label}{playerSort.key === h.key ? (playerSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.map((p, i) => {
                    const gc = gameColors[p.game] || "#888";
                    const profilePlayer = p.hasProfile ? proPlayers.find(pp => pp.name === p.name && pp.game === (p.game)) || proPlayers.find(pp => pp.name === p.name) : null;
                    return (
                      <tr key={`${p.name}-${p.game}-${i}`}
                        className={`transition-all ${p.hasProfile ? "cursor-pointer" : ""}`}
                        onClick={() => { if (profilePlayer) { setSelectedPlayer(profilePlayer); } }}
                        style={{ borderBottom: "1px solid #ffffff05", background: i % 2 === 0 ? "#050505" : "#080808" }}
                        onMouseEnter={e => e.currentTarget.style.background = `${gc}08`}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#050505" : "#080808"}>
                        <td className="px-3 py-2.5 text-center">{p.hasProfile ? <span title="Full profile available" style={{ color: "#d4af37" }}>★</span> : <span className="opacity-10">·</span>}</td>
                        <td className="px-3 py-2.5 font-bold text-white whitespace-nowrap">{p.country} {p.name}</td>
                        <td className="px-3 py-2.5 font-bold whitespace-nowrap" style={{ color: gc }}>{p.game}</td>
                        <td className="px-3 py-2.5 opacity-50 whitespace-nowrap">{p.team}</td>
                        <td className="px-3 py-2.5 text-xs whitespace-nowrap" style={{ color: "#ffffff80" }}>{p.mouse}</td>
                        <td className="px-3 py-2.5 text-xs">{p.hz ? `${p.hz >= 1000 ? `${p.hz/1000}K` : p.hz}` : " - "}</td>
                        <td className="px-3 py-2.5">{p.dpi}</td>
                        <td className="px-3 py-2.5">{p.sens ?? " - "}</td>
                        <td className="px-3 py-2.5 font-bold" style={{ color: p.edpi ? (p.edpi < 400 ? "#ff4444" : p.edpi < 1000 ? "#ffaa00" : p.edpi < 5000 ? "#44ff44" : "#44ddff") : "#666" }}>{p.edpi ?? " - "}</td>
                        <td className="px-3 py-2.5 opacity-50 text-xs">{p.role}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-center text-xs opacity-20 mt-3">{filteredPlayers.length} players shown · Data sourced from prosettings.net and community research</div>

            <SectionTitle color="#ff4655" sub="Distribution of sensitivity settings across all tracked players">eDPI Distribution by Game</SectionTitle>
            <div className="rounded-xl p-4 mb-4" style={{ background: "#ff465508", border: "1px solid #ff465512" }}>
              <div className="text-xs opacity-50 leading-relaxed">
                <span className="font-bold" style={{ color: "#ff4655" }}>Sample Size Notice:</span> These distributions are based on our database of <span className="font-bold text-white">{allPlayers.filter(p => p.edpi).length}</span> players with confirmed eDPI data out of <span className="font-bold text-white">{allPlayers.length}</span> total tracked players. Games with fewer than 3 players with eDPI data are excluded. PUBG uses a unique sensitivity system and does not have standardized eDPI values. Larger samples produce more reliable distributions.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* OVERALL eDPI chart first */}
              {(() => {
                const allWithEdpi = allPlayers.filter(p => p.edpi);
                const total = allWithEdpi.length;
                if (total < 3) return null;
                const ranges = [
                  { range: "< 300", count: allWithEdpi.filter(p => p.edpi < 300).length },
                  { range: "300-500", count: allWithEdpi.filter(p => p.edpi >= 300 && p.edpi < 500).length },
                  { range: "500-700", count: allWithEdpi.filter(p => p.edpi >= 500 && p.edpi < 700).length },
                  { range: "700-900", count: allWithEdpi.filter(p => p.edpi >= 700 && p.edpi < 900).length },
                  { range: "900-1200", count: allWithEdpi.filter(p => p.edpi >= 900 && p.edpi < 1200).length },
                  { range: "1200-2000", count: allWithEdpi.filter(p => p.edpi >= 1200 && p.edpi < 2000).length },
                  { range: "2000-3000", count: allWithEdpi.filter(p => p.edpi >= 2000 && p.edpi < 3000).length },
                  { range: "3000+", count: allWithEdpi.filter(p => p.edpi >= 3000).length },
                ];
                const avgEdpi = Math.round(allWithEdpi.reduce((a, p) => a + p.edpi, 0) / total);
                const medianEdpi = allWithEdpi.map(p => p.edpi).sort((a, b) => a - b)[Math.floor(total / 2)];
                const minEdpi = Math.min(...allWithEdpi.map(p => p.edpi));
                const maxEdpi = Math.max(...allWithEdpi.map(p => p.edpi));
                return (
                  <div className="rounded-2xl p-5 md:col-span-2" style={{ background: "#0a0a0a", border: "1px solid #ffffff15" }}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-lg font-black" style={{ color: "#f472b6" }}>🌐 All Games  -  Overall eDPI Distribution</div>
                      <div className="px-2.5 py-1 rounded text-xs font-bold" style={{ background: "#f472b615", color: "#f472b6" }}>n = {total}</div>
                    </div>
                    <div className="flex gap-5 mb-3 text-xs opacity-40">
                      <span>Mean: <span className="font-bold text-white">{avgEdpi}</span></span>
                      <span>Median: <span className="font-bold text-white">{medianEdpi}</span></span>
                      <span>Min: <span className="font-bold text-white">{minEdpi}</span></span>
                      <span>Max: <span className="font-bold text-white">{maxEdpi}</span></span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={ranges}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff06" />
                        <XAxis dataKey="range" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                        <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]} fillOpacity={0.8} name="Players">
                          {ranges.map((r, ri) => <Cell key={ri} fill={r.count === Math.max(...ranges.map(x => x.count)) ? "#f472b6" : "#f472b640"} />)}
                        </Bar>
                        <Tooltip content={<CustomTooltip />} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {ranges.map((r, ri) => (
                        <div key={ri} className="text-xs opacity-30">
                          {r.range}: <span className="font-bold" style={{ color: r.count === Math.max(...ranges.map(x => x.count)) ? "#f472b6" : "#ffffff60" }}>{Math.round((r.count / total) * 100)}%</span> <span className="opacity-50">({r.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              {/* Per-game eDPI charts */}
              {(() => {
                const gcMap = { CS2: "#ff8c00", Valorant: "#ff4655", "R6 Siege": "#4a86c8", "Call of Duty": "#5cb85c", Fortnite: "#4c7bd9", "League of Legends": "#c89b3c", LoL: "#c89b3c", "Overwatch 2": "#f99e1a", Apex: "#dc2626", "Dota 2": "#e74c3c", "Rocket League": "#1a9fff", "Marvel Rivals": "#ed1d24", Deadlock: "#8b5cf6", PUBG: "#f2a900" };
                const gamesList = [...new Set(allPlayers.map(p => p.game))];
                return gamesList.map(game => {
                  const gamePlayers = allPlayers.filter(p => p.game === game && p.edpi);
                  if (gamePlayers.length < 3) return null;
                  const total = gamePlayers.length;
                  // adaptive ranges based on game genre
                  const isHighSens = ["Overwatch 2", "Marvel Rivals", "Fortnite"].includes(game);
                  const ranges = isHighSens ? [
                    { range: "< 1000", count: gamePlayers.filter(p => p.edpi < 1000).length },
                    { range: "1000-2000", count: gamePlayers.filter(p => p.edpi >= 1000 && p.edpi < 2000).length },
                    { range: "2000-3000", count: gamePlayers.filter(p => p.edpi >= 2000 && p.edpi < 3000).length },
                    { range: "3000-4000", count: gamePlayers.filter(p => p.edpi >= 3000 && p.edpi < 4000).length },
                    { range: "4000+", count: gamePlayers.filter(p => p.edpi >= 4000).length },
                  ] : [
                    { range: "< 400", count: gamePlayers.filter(p => p.edpi < 400).length },
                    { range: "400-600", count: gamePlayers.filter(p => p.edpi >= 400 && p.edpi < 600).length },
                    { range: "600-800", count: gamePlayers.filter(p => p.edpi >= 600 && p.edpi < 800).length },
                    { range: "800-1000", count: gamePlayers.filter(p => p.edpi >= 800 && p.edpi < 1000).length },
                    { range: "1000+", count: gamePlayers.filter(p => p.edpi >= 1000).length },
                  ];
                  const avgEdpi = Math.round(gamePlayers.reduce((a, p) => a + p.edpi, 0) / total);
                  const minEdpi = Math.min(...gamePlayers.map(p => p.edpi));
                  const maxEdpi = Math.max(...gamePlayers.map(p => p.edpi));
                  const gc = gcMap[game] || "#888";
                  return (
                    <div key={game} className="rounded-2xl p-5" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-lg font-black" style={{ color: gc }}>{game}</div>
                        <div className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: `${gc}15`, color: gc }}>n = {total}</div>
                      </div>
                      <div className="flex gap-4 mb-3 text-xs opacity-40">
                        <span>Avg: <span className="font-bold text-white">{avgEdpi}</span></span>
                        <span>Min: <span className="font-bold text-white">{minEdpi}</span></span>
                        <span>Max: <span className="font-bold text-white">{maxEdpi}</span></span>
                      </div>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={ranges}>
                          <XAxis dataKey="range" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                          <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} />
                          <Bar dataKey="count" fill={gc} radius={[4, 4, 0, 0]} fillOpacity={0.7} name="Players" />
                          <Tooltip content={<CustomTooltip />} />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ranges.map((r, ri) => (
                          <div key={ri} className="text-xs opacity-30">
                            {r.range}: <span className="font-bold" style={{ color: r.count === Math.max(...ranges.map(x => x.count)) ? gc : "#ffffff60" }}>{total > 0 ? Math.round((r.count / total) * 100) : 0}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }).filter(Boolean);
              })()}
            </div>
          </div>
          );
        })()}

        {/* ── BRANDS TAB ── */}
        {activeTab === "brands" && (
          <div>
            <SectionTitle color="#d4af37" sub="From industry giants to boutique innovators  -  the companies shaping competitive gaming">Mouse Manufacturer Profiles</SectionTitle>
            <div className="space-y-5">
              {[
                { name: "Razer", icon: "🐍", desc: "Razer is the undisputed king of esports peripherals in 2025-2026, commanding over 34% of the professional mouse market. Founded in 2005 in San Francisco by Min-Liang Tan and Robert Krakoff, Razer grew from a niche gaming startup into a $2 billion global empire. Their philosophy of designing peripherals 'by gamers, for gamers' has been validated by decades of tournament dominance. The Razer DeathAdder, first released in 2006, became arguably the most popular gaming mouse shape ever made  -  its ergonomic right-hand design has been iterated on for nearly 20 years and cloned by dozens of competitors. The Viper line, launched in 2019, marked Razer's pivot toward symmetrical ultralight designs that would eventually conquer the FPS scene. The Viper V3 Pro, released in 2024, achieved what no Razer mouse had before: it became the single most-used mouse in professional esports, overtaking Logitech's long-standing Superlight dynasty. With its 54g weight, Focus Pro 35K sensor, and 8KHz polling, the V3 Pro represents the culmination of everything Razer has learned from sponsoring hundreds of pro teams. Razer's optical switch technology, introduced with the Viper in 2019, was a genuine industry innovation  -  eliminating debounce delay entirely and setting a new standard for click latency that others have been chasing ever since.",
                  achievements: ["#1 most-used mouse in pro esports (Viper V3 Pro, 2024-Present)", "Invented optical mouse switches  -  eliminating debounce delay industry-wide", "DeathAdder line: most iconic ergonomic gaming mouse shape in history (2006-Present)"],
                  flagships: ["Viper V3 Pro", "DeathAdder V3 Pro", "Viper V3 HyperSpeed"] },
                { name: "Logitech", icon: "🎯", desc: "Logitech is the Swiss-born giant that essentially invented the modern esports mouse category. Founded in 1981 in Lausanne, Switzerland, Logitech has been manufacturing mice longer than most gaming companies have existed. Their gaming division, Logitech G, has produced some of the most legendary peripherals in competitive history. The original G Pro Wireless, released in 2018, was a watershed moment  -  it was the first wireless mouse to be genuinely competitive with wired options, and it single-handedly convinced the professional scene that wireless was viable for tournament play. The G Pro X Superlight, released in 2020 at just 63g, then became the most dominant mouse in esports history, used by an estimated 25% of all professional FPS players at its peak. For nearly four years (2020-2024), no other mouse came close to the Superlight's market dominance. The HERO sensor, developed entirely in-house, represents one of the most impressive engineering feats in the peripheral industry  -  delivering zero smoothing, zero acceleration, and class-leading power efficiency that enables the battery life their wireless mice are famous for. Logitech's Lightspeed wireless technology set the gold standard for low-latency wireless, and their newest Lightforce hybrid switches offered the best of both optical speed and mechanical feel. In 2025, they pushed boundaries again with the G Pro X2 Superstrike and its revolutionary HITS haptic inductive trigger system  -  replacing mechanical switches entirely with magnetic induction for tunable actuation, rapid trigger, and haptic feedback. It's the most technologically advanced mouse ever made.",
                  achievements: ["Held #1 pro mouse position for 4 consecutive years (G Pro X Superlight, 2020-2024)", "Pioneered viable wireless esports mice  -  the G Pro Wireless converted the entire pro scene (2018)", "HITS technology in G Pro X2 Superstrike: first magnetic induction switches in a gaming mouse (2025)"],
                  flagships: ["G Pro X2 Superstrike", "G Pro X Superlight 2", "G Pro X Superlight"] },
                { name: "Zowie", icon: "🔴", desc: "Zowie occupies a sacred place in esports history as the brand that understood competitive players before anyone else did. Founded in 2008 in Taiwan and later acquired by BenQ, Zowie built its entire identity around one principle: plug-and-play simplicity with no software required. While other brands chased RGB lighting and app ecosystems, Zowie focused relentlessly on shape, ergonomics, and reliable performance. The EC series, inspired by the legendary Microsoft IntelliMouse Explorer 3.0, became the gold standard for ergonomic gaming mice throughout the 2010s. At the peak of CS:GO's competitive era (2014-2019), Zowie mice were used by an estimated 40-50% of all professional Counter-Strike players  -  a level of dominance that may never be matched. Players like s1mple, NiKo, coldzera, and device all built their legacies on Zowie shapes. The FK series pioneered the low-profile ambidextrous shape that would later inspire the Viper line and countless others. Zowie's approach to DPI adjustment via a physical button on the bottom of the mouse, and their refusal to require driver software, earned them a cult following among purists. Though their market share has declined in the wireless era, their recent CW (wireless) versions of classic shapes like the EC2-CW prove they can adapt while maintaining their identity. Every serious mouse enthusiast owes something to Zowie  -  they proved that shape and feel matter more than spec sheets.",
                  achievements: ["Dominated CS:GO pro scene with ~45% market share (2014-2019)  -  highest single-brand dominance ever", "EC2 shape: the most cloned ergonomic mouse design in gaming history", "Pioneered the 'no-software, plug-and-play' philosophy for esports peripherals"],
                  flagships: ["EC2-CW", "EC2-DW", "FK2-CW"] },
                { name: "Finalmouse", icon: "⭐", desc: "Finalmouse is the most polarizing and arguably the most influential boutique brand in gaming mouse history. Founded in 2014 in Irvine, California, Finalmouse didn't just enter the ultralight market  -  they created it. The original Ultralight Pro, released in 2018, shocked the industry at 67g with its honeycomb shell design, a concept so successful that virtually every major manufacturer copied it within two years. Finalmouse then pushed further with the Air58 (58g) and the legendary Starlight-12, which used a magnesium alloy shell to hit 42g while maintaining structural rigidity  -  a feat that seemed impossible at the time. Their limited-drop business model, where mice sell out in minutes and resell for 3-5x retail, has created a secondary market unlike anything else in peripherals. The UltralightX, released in 2024, represented a more accessible direction with wider availability while still pushing technical boundaries with 8KHz polling and a sub-45g weight. TenZ, arguably the most popular Valorant player in the world, has been a devoted Finalmouse user and ambassador, lending the brand enormous visibility in the FPS community. Love them or hate them, Finalmouse forced the entire industry to take weight seriously  -  before them, 80-100g was considered 'normal' for a gaming mouse.",
                  achievements: ["Invented the ultralight honeycomb mouse category  -  copied by every major brand (2018)", "Starlight-12: first magnesium alloy gaming mouse, hit 42g and shattered weight records (2021)", "Created the most valuable secondary market in peripherals  -  Starlight mice resold for $300-$500+"],
                  flagships: ["UltralightX", "Starlight-12", "ULX Prophecy"] },
                { name: "Lamzu", icon: "🌙", desc: "Lamzu is the scrappy Hong Kong startup that proved you don't need decades of history to make a world-class mouse. Founded in 2022, Lamzu burst onto the scene with the Atlantis  -  a 55g wireless mouse that reviewers immediately praised for its build quality, sensor performance, and value proposition. In an era where established brands were charging $150+, Lamzu delivered comparable or superior quality at $80-$100, disrupting the pricing hierarchy that Razer and Logitech had established. The Atlantis Mini refined the formula further with a smaller form factor that became a favorite among claw-grip players. But it was the Maya X in 2025 that truly elevated Lamzu's reputation  -  ScreaM, legendary for having the best aim in FPS history, chose the Maya X as his primary mouse, instantly giving Lamzu credibility that money can't buy. Lamzu's secret sauce is their willingness to listen to the enthusiast community: they iterate rapidly based on feedback, offer multiple grip-optimized shapes, and maintain aggressive pricing without cutting corners on sensor or wireless implementation. In just three years, they've gone from unknown to a brand that established players genuinely fear. They represent the best of the new wave of mouse companies  -  passionate, community-driven, and uncompromising on quality.",
                  achievements: ["Disrupted the premium mouse market with flagship quality at $80-$100 (2022-Present)", "ScreaM  -  'the human aimbot'  -  chose Maya X as his primary mouse (2025)", "Fastest-growing mouse brand in esports, from zero to top-6 market share in under 3 years"],
                  flagships: ["Maya X", "Atlantis Mini", "Inca"] },
                { name: "Pulsar", icon: "💫", desc: "Pulsar is the South Korean engineering powerhouse that has been quietly pushing the absolute boundaries of what a gaming mouse can be. Founded in 2020 in Seoul, Pulsar entered a crowded market but immediately differentiated itself with obsessive weight optimization and innovative materials. The X2 series became their flagship, delivering sub-55g weights with a comfortable egg-shaped design that works for multiple grip styles. The X2 Mini pushed further into the sub-48g territory while maintaining wireless capability and premium build quality. Pulsar's approach to mouse design is distinctly Korean  -  meticulous, detail-oriented, and focused on measurable performance metrics rather than marketing hype. Their mice consistently appear in top-10 lists from every major peripheral reviewer, and they've built a devoted following among aim trainers and competitive players who prioritize raw performance over brand prestige. The X2F introduced an even more refined sensor implementation and improved wireless stability that put it on par with mice costing twice as much. Pulsar also produces some of the best glass mousepads in the industry, showing they understand the full ecosystem of competitive aiming. They may not have the marketing budget of Razer or Logitech, but among the enthusiast community, Pulsar is spoken about with a reverence usually reserved for much older brands.",
                  achievements: ["X2 series: consistently rated top-3 in value across all major peripheral review outlets", "Pioneered sub-48g wireless gaming mice with the X2 Mini without sacrificing build quality", "Built a devoted competitive aim-trainer community following  -  top choice among Kovaak's players"],
                  flagships: ["X2F", "X2H", "X2 Mini"] },
                { name: "SteelSeries", icon: "🦅", desc: "SteelSeries is one of the true OGs of esports peripherals, founded in 2001 in Copenhagen, Denmark  -  making them older than Razer in the competitive gaming space. Before Razer, before Logitech G, SteelSeries was already sponsoring professional teams and designing mice specifically for tournament play. The Sensei, released in 2011, was a landmark ambidextrous mouse that became a staple in competitive CS 1.6 and early CS:GO, and its shape continues to influence designs today. The Rival 300 was another iconic shape that helped define the ergonomic gaming mouse category. SteelSeries has always been known for their software ecosystem  -  SteelSeries Engine (now GG) was one of the first unified peripheral management platforms and remains one of the most polished. The Aerox line represented their push into the ultralight wireless space, and while they haven't recaptured their early-2010s dominance, they remain a trusted name with a loyal pro following, particularly in the Nordic esports scene where they're headquartered. Their consistent presence at major tournaments and long-term team sponsorships have made the SteelSeries logo one of the most recognized symbols in competitive gaming.",
                  achievements: ["One of the first companies to design mice specifically for esports (2001)", "Sensei: defined the ambidextrous esports mouse shape for a generation (2011)", "Pioneered unified peripheral software management with SteelSeries Engine"],
                  flagships: ["Aerox 5 Wireless", "Prime Wireless", "Rival 5"] },
                { name: "Corsair", icon: "⚓", desc: "Corsair is a peripheral powerhouse that has historically been known for keyboards, cases, and RAM, but their mouse division has been making serious strides in the competitive space. Founded in 1994 in Fremont, California, Corsair has the engineering depth and manufacturing scale that few companies can match. Their entry into the ultralight esports market came with the M75 Air, which impressed with 8KHz polling, a solid sensor, and competitive weight at an accessible price point. The Sabre RGB Pro earned respect as a reliable workhorse for FPS players, and the M75 Wireless expanded their offering for those who wanted more battery life and versatility. Corsair's iCUE software, while sometimes criticized for its complexity, offers one of the most comprehensive customization suites in the industry. Their acquisition of Elgato and SCUF has also positioned them as a full-ecosystem gaming company. While they're still building their reputation in the pure esports mouse space compared to Razer and Logitech, Corsair's R&D resources and brand recognition mean they're always a few iterations away from producing a category-defining product.",
                  achievements: ["M75 Air: brought 8KHz polling to a competitive price point for mainstream adoption", "iCUE ecosystem: one of the most comprehensive peripheral customization platforms", "Built a full gaming ecosystem through strategic acquisitions (Elgato, SCUF, Origin PC)"],
                  flagships: ["M75 Air", "Sabre RGB Pro", "M75 Wireless"] },
                { name: "Endgame Gear", icon: "🇩🇪", desc: "Endgame Gear is the German precision-engineering brand that approaches mouse design with the meticulousness you'd expect from the country that gave us Porsche and Leica. Founded in Germany, Endgame Gear made their name with the XM1  -  a mouse that was designed from the ground up based on feedback from professional CS:GO players, resulting in one of the most praised click feel and cable implementations in the industry. The XM1 was widely considered to have the best stock mouse cable ever made at the time of release. The OP1 8K pushed the brand into the high-polling-rate wireless space, delivering clean sensor performance and thoughtful ergonomics. Endgame Gear's mice are characterized by their no-nonsense approach: clean aesthetics, excellent switch and cable choices, and shapes refined through extensive pro feedback. They don't chase gimmicks or RGB  -  they focus on the fundamentals that competitive players actually care about. Their community engagement is also notably strong, with direct developer interaction on forums and rapid iteration based on user feedback.",
                  achievements: ["XM1: widely considered to have the best stock mouse cable in the industry at launch", "OP1 8K: showcased German precision engineering in the 8KHz wireless era", "Known for the cleanest stock switch implementation and click feel among enthusiast brands"],
                  flagships: ["OP1 8K", "XM2w", "OP1we"] },
                { name: "ASUS", icon: "🦁", desc: "ASUS's Republic of Gamers (ROG) division has been producing gaming peripherals since 2006, but their mouse lineup has recently taken a dramatic leap forward with the Harpe Ace series. ASUS brings something no other mouse manufacturer can  -  they design and fabricate their own chips, giving them unique integration capabilities between sensor, MCU, and wireless implementation. The ROG Harpe Ace Extreme, at just 47g with a carbon fiber composite shell, represents one of the most technically ambitious mice ever made. ASUS used their semiconductor expertise to create custom wireless solutions that deliver rock-solid connectivity. The ROG Gladius III and Keris lines served as more accessible entry points, while the Harpe Ace pushed into the ultralight enthusiast space. ASUS's advantage is their vertically integrated supply chain  -  when you control the silicon, the firmware, and the manufacturing, you can optimize in ways that companies buying off-the-shelf components simply cannot. As they continue to invest in their peripheral division, ASUS has the potential to become a top-3 esports mouse brand within the next few years.",
                  achievements: ["ROG Harpe Ace Extreme: 47g carbon fiber composite  -  lightest premium wireless mouse from a major brand", "Only mouse manufacturer that designs custom silicon for sensor and wireless integration", "ROG ecosystem integration: seamless cross-device syncing across the broadest peripheral lineup"],
                  flagships: ["ROG Harpe Ace Extreme", "ROG Gladius III", "ROG Keris"] },
                { name: "WLMouse", icon: "🐉", desc: "WLMouse is the newest and most radical disruptor in the gaming mouse industry. This crowd-funded brand achieved what no established manufacturer could  -  a production wireless gaming mouse weighing just 30 grams with the Beast X. To put that in perspective, 30g is lighter than most AA batteries. The Beast X launched as a community-funded project and became an instant sensation, selling out repeatedly and generating a secondary market reminiscent of Finalmouse's early days. WLMouse achieved this extreme weight through a combination of innovative shell design, aggressive material choices, and a willingness to sacrifice features that heavier mice include. The Beast X proved that the theoretical floor for a functional wireless gaming mouse was much lower than anyone thought possible. While 30g may be too light for many players  -  some prefer the stability and control that comes with a bit more mass  -  the Beast X expanded everyone's understanding of what's achievable. WLMouse represents the bleeding edge of mouse engineering, and their success has pushed even established brands to reconsider their weight targets.",
                  achievements: ["Beast X: world's lightest production wireless gaming mouse at 30g  -  a record that still stands", "Proved crowd-funded mouse brands can compete with established manufacturers", "Shifted the entire industry's weight targets downward  -  50g is now 'normal' partly because of WLMouse"],
                  flagships: ["Beast X", "Beast X Mini"] },
              ].map((brand, i) => {
                const col = BRAND_COLORS[brand.name] || "#888";
                const brandMice = mice.filter(m => m.brand === brand.name);
                const totalUsage = brandMice.reduce((acc, m) => acc + m.proUsage, 0);
                return (
                  <div key={i} className="rounded-2xl p-6 transition-all" style={{ background: `${col}06`, border: `1px solid ${col}12` }}>
                    <div className="flex items-center gap-4 mb-4">
                      {BRAND_IMAGE_URLS[brand.name] ? <img src={BRAND_IMAGE_URLS[brand.name]} alt={brand.name} className="h-10 w-10 object-contain" /> : <span className="text-4xl">{brand.icon}</span>}
                      <div className="flex-1">
                        <div className="text-2xl font-black" style={{ color: col }}>{brand.name}</div>
                        <div className="text-xs opacity-30">{totalUsage}% total pro usage · {brandMice.length} model{brandMice.length !== 1 ? "s" : ""} in database</div>
                      </div>
                      <div className="flex gap-2">
                        {brand.flagships.map((f, j) => (
                          <span key={j} className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${col}15`, color: col }}>{f}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm opacity-45 leading-relaxed mb-5">{brand.desc}</p>
                    <div className="rounded-xl p-4" style={{ background: `${col}08`, border: `1px solid ${col}10` }}>
                      <div className="text-xs uppercase tracking-widest opacity-30 mb-3">Key Achievements</div>
                      <div className="space-y-2">
                        {brand.achievements.map((a, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <span className="text-xs mt-0.5">{j === 0 ? "🏆" : j === 1 ? "⭐" : "🎯"}</span>
                            <span className="text-xs leading-relaxed" style={{ color: j === 0 ? col : "#ffffffa0" }}>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TRENDS TAB ── */}
        {activeTab === "trends" && (
          <div>
            <SectionTitle color="#f472b6" sub="How esports mice have evolved over the years">Industry Trends & Evolution</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Average Mouse Weight Over Time (grams)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={weightTrend}>
                    <defs>
                      <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff6a" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00ff6a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                    <XAxis dataKey="year" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} unit="g" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="avgWeight" stroke="#f472b6" fill="url(#wg1)" strokeWidth={2} name="Avg Weight" />
                    <Area type="monotone" dataKey="lightest" stroke="#00ff6a" fill="url(#wg2)" strokeWidth={2} name="Lightest" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Polling Rate Evolution (Hz)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={pollingTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                    <XAxis dataKey="year" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 10, opacity: 0.5 }} />
                    <Line type="monotone" dataKey="max" stroke="#00ff6a" strokeWidth={2} dot={{ r: 3, fill: "#00ff6a" }} name="Max Available" />
                    <Line type="monotone" dataKey="avg" stroke="#00b4ff" strokeWidth={2} dot={{ r: 3, fill: "#00b4ff" }} name="Average" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <SectionTitle color="#06b6d4" sub="Which grip styles dominate the professional scene">Pro Mouse Shape Breakdown</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Shape Distribution Among Pros</div>
                {(() => {
                  const shapeCounts = {};
                  allPlayers.forEach(p => {
                    const m = mice.find(mm => mm.name === p.mouse || p.mouse.includes(mm.name));
                    if (m) shapeCounts[m.shape] = (shapeCounts[m.shape] || 0) + 1;
                  });
                  const total = Object.values(shapeCounts).reduce((a, b) => a + b, 0);
                  const shapeData = Object.entries(shapeCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({
                    name, value: parseFloat((count / total * 100).toFixed(1)),
                    fill: name === "Symmetrical" ? "#06b6d4" : name === "Ergonomic" ? "#f472b6" : "#d4af37"
                  }));
                  return (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={shapeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} strokeWidth={0}
                          label={({ name, value }) => `${name}: ${value}%`}>
                          {shapeData.map((s, i) => <Cell key={i} fill={s.fill} fillOpacity={0.7} />)}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">DPI Distribution Across All Pros</div>
                {(() => {
                  const dpiRanges = [
                    { range: "< 400", min: 0, max: 400, color: "#ff4444" },
                    { range: "400-600", min: 400, max: 600, color: "#ff8c00" },
                    { range: "600-800", min: 600, max: 800, color: "#d4af37" },
                    { range: "800-1000", min: 800, max: 1000, color: "#00ff6a" },
                    { range: "1000-1600", min: 1000, max: 1600, color: "#00b4ff" },
                    { range: "1600+", min: 1600, max: 999999, color: "#8b5cf6" },
                  ];
                  const data = dpiRanges.map(r => ({
                    range: r.range,
                    players: allPlayers.filter(p => p.dpi >= r.min && p.dpi < r.max).length,
                    fill: r.color,
                    pct: parseFloat((allPlayers.filter(p => p.dpi >= r.min && p.dpi < r.max).length / allPlayers.length * 100).toFixed(1))
                  }));
                  return (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                        <XAxis dataKey="range" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                        <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="players" radius={[6, 6, 0, 0]} name="Players">
                          {data.map((d, i) => <Cell key={i} fill={d.fill} fillOpacity={0.7} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Wireless vs Wired Adoption in Pro Esports (%)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={wirelessTrend}>
                    <defs>
                      <linearGradient id="wlg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff6a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00ff6a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wlg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff3c3c" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#ff3c3c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                    <XAxis dataKey="year" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} unit="%" domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 10, opacity: 0.5 }} />
                    <Area type="monotone" dataKey="wireless" stroke="#00ff6a" fill="url(#wlg1)" strokeWidth={2} name="Wireless %" />
                    <Area type="monotone" dataKey="wired" stroke="#ff3c3c" fill="url(#wlg2)" strokeWidth={2} name="Wired %" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Mouse Price Evolution (USD)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={priceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                    <XAxis dataKey="year" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} unit="$" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 10, opacity: 0.5 }} />
                    <Line type="monotone" dataKey="flagship" stroke="#d4af37" strokeWidth={2} dot={{ r: 3, fill: "#d4af37" }} name="Flagship" />
                    <Line type="monotone" dataKey="avg" stroke="#00b4ff" strokeWidth={2} dot={{ r: 3, fill: "#00b4ff" }} name="Average" />
                    <Line type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#10b981" }} name="Budget" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                (() => {
                  const lightest = [...mice].sort((a, b) => a.weight - b.weight)[0];
                  const mostPopular = [...mice].sort((a, b) => b.proUsage - a.proUsage)[0];
                  const highestPolling = Math.max(...mice.map(m => m.pollingRate));
                  const cheapest = [...mice].sort((a, b) => a.price - b.price)[0];
                  return [
                    { label: "Lightest Mouse", value: lightest.name, sub: `${lightest.weight}g`, color: "#f472b6" },
                    { label: "Most Popular", value: mostPopular.name, sub: `${mostPopular.proUsage}% pro share`, color: "#00ff6a" },
                    { label: "Highest Polling", value: `${(highestPolling/1000).toFixed(0)},000 Hz`, sub: `${mice.filter(m => m.pollingRate === highestPolling).length} mice`, color: "#00b4ff" },
                    { label: "Most Affordable", value: cheapest.name, sub: `$${cheapest.price}`, color: "#ffd700" },
                  ];
                })()
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: `${s.color}06`, border: `1px solid ${s.color}15` }}>
                  <div className="text-xs uppercase tracking-widest opacity-30 mb-2">{s.label}</div>
                  <div className="text-sm font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs opacity-40 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* ── Brand Dominance Race ── */}
            <SectionTitle color="#d4af37" sub="How the top brands stack up across every major metric">Brand Performance Scorecard</SectionTitle>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #ffffff08" }}>
              {(() => {
                const topBrandNames = ["Razer", "Logitech", "Zowie", "Vaxee", "Finalmouse", "Pulsar", "Lamzu"];
                const brandStats = topBrandNames.map(brand => {
                  const brandMice = mice.filter(m => m.brand === brand);
                  const guessBrand = (mouse) => {
                    const n = mouse.toLowerCase();
                    if (n.includes("razer") || n.includes("viper") || n.includes("deathadder") || n.includes("basilisk")) return "Razer";
                    if (n.includes("logitech") || n.includes("g pro") || n.includes("g502") || n.includes("g303") || n.includes("g203") || n.includes("gpro") || n.includes("g703")) return "Logitech";
                    if (n.includes("zowie") || n.startsWith("ec") || n.startsWith("fk") || n.startsWith("za") || n.startsWith("s2") || n.startsWith("u2")) return "Zowie";
                    if (n.includes("vaxee") || n.includes("zygen") || n.includes("np-01") || n.includes("outset")) return "Vaxee";
                    if (n.includes("finalmouse") || n.includes("ultralight") || n.includes("starlight")) return "Finalmouse";
                    if (n.includes("pulsar") || n.includes("xlite") || n.includes("x2")) return "Pulsar";
                    if (n.includes("lamzu") || n.includes("atlantis") || n.includes("maya")) return "Lamzu";
                    return null;
                  };
                  const brandPlayers = allPlayers.filter(p => {
                    const m = mice.find(mm => mm.name === p.mouse || p.mouse.includes(mm.name));
                    const detected = m ? m.brand : guessBrand(p.mouse);
                    return detected === brand;
                  });
                  const avgWeight = brandMice.length ? Math.round(brandMice.reduce((a, m) => a + m.weight, 0) / brandMice.length) : 0;
                  const avgPrice = brandMice.length ? Math.round(brandMice.reduce((a, m) => a + m.price, 0) / brandMice.length) : 0;
                  const maxPoll = brandMice.length ? Math.max(...brandMice.map(m => m.pollingRate)) : 0;
                  const proShare = Math.round(brandPlayers.length / allPlayers.length * 100);
                  const avgRating = brandMice.length ? (brandMice.reduce((a, m) => a + m.rating, 0) / brandMice.length).toFixed(1) : 0;
                  const mouseCount = brandMice.length;
                  return { brand, avgWeight, avgPrice, maxPoll, proShare, avgRating, mouseCount };
                });
                const headers = ["Brand", "Models", "Pro Share", "Avg Weight", "Avg Price", "Max Poll", "Avg Rating"];
                return (
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "#0a0a0a" }}>
                        {headers.map(h => (
                          <th key={h} className="px-4 py-3 text-xs uppercase tracking-widest font-bold text-left" style={{ color: "#ffffff30" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {brandStats.map((b, i) => (
                        <tr key={b.brand} style={{ background: i % 2 === 0 ? "#050505" : "#080808", borderBottom: "1px solid #ffffff05" }}>
                          <td className="px-4 py-3 font-black" style={{ color: BRAND_COLORS[b.brand] }}>{b.brand}</td>
                          <td className="px-4 py-3 opacity-60">{b.mouseCount}</td>
                          <td className="px-4 py-3 font-bold" style={{ color: b.proShare >= 30 ? "#00ff6a" : b.proShare >= 10 ? "#d4af37" : "#ffffff60" }}>{b.proShare}%</td>
                          <td className="px-4 py-3 opacity-60">{b.avgWeight}g</td>
                          <td className="px-4 py-3 opacity-60">${b.avgPrice}</td>
                          <td className="px-4 py-3 opacity-60">{b.maxPoll >= 1000 ? `${b.maxPoll/1000}K` : b.maxPoll}Hz</td>
                          <td className="px-4 py-3 font-bold" style={{ color: b.avgRating >= 9 ? "#00ff6a" : b.avgRating >= 8.5 ? "#d4af37" : "#ffffff60" }}>{b.avgRating}/10</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()}
            </div>

            {/* ── Technology Adoption ── */}
            <SectionTitle color="#8b5cf6" sub="How quickly pros adopt new peripheral technology">Technology Adoption Snapshot</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Polling Rate Tiers (Mice in DB)</div>
                {(() => {
                  const tiers = [
                    { label: "1KHz (Standard)", min: 0, max: 1500, color: "#ff4444" },
                    { label: "4KHz (High)", min: 1500, max: 5000, color: "#d4af37" },
                    { label: "8KHz (Ultra)", min: 5000, max: 99999, color: "#00ff6a" },
                  ];
                  return (
                    <div className="space-y-3">
                      {tiers.map((t, i) => {
                        const count = mice.filter(m => m.pollingRate >= t.min && m.pollingRate < t.max).length;
                        const pct = Math.round(count / mice.length * 100);
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-bold" style={{ color: t.color }}>{t.label}</span>
                              <span className="opacity-50">{count} mice ({pct}%)</span>
                            </div>
                            <div className="h-3 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `${t.color}60` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Top Sensors by Mouse Count</div>
                {(() => {
                  const sensorCounts = {};
                  mice.forEach(m => { sensorCounts[m.sensor] = (sensorCounts[m.sensor] || 0) + 1; });
                  const top5 = Object.entries(sensorCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
                  const colors = ["#00ff6a", "#00b4ff", "#f472b6", "#d4af37", "#8b5cf6"];
                  return (
                    <div className="space-y-3">
                      {top5.map(([sensor, count], i) => (
                        <div key={sensor}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-bold" style={{ color: colors[i] }}>{sensor}</span>
                            <span className="opacity-50">{count} mice</span>
                          </div>
                          <div className="h-3 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                            <div className="h-full rounded-full" style={{ width: `${(count / top5[0][1]) * 100}%`, background: `${colors[i]}60` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-sm font-bold mb-4 opacity-60">Weight Class Distribution</div>
                {(() => {
                  const classes = [
                    { label: "Ultralight (< 45g)", min: 0, max: 45, color: "#00ff6a" },
                    { label: "Featherweight (45-55g)", min: 45, max: 55, color: "#06b6d4" },
                    { label: "Lightweight (55-65g)", min: 55, max: 65, color: "#00b4ff" },
                    { label: "Midweight (65-80g)", min: 65, max: 80, color: "#d4af37" },
                    { label: "Standard (80g+)", min: 80, max: 999, color: "#f472b6" },
                  ];
                  return (
                    <div className="space-y-3">
                      {classes.map((c, i) => {
                        const count = mice.filter(m => m.weight >= c.min && m.weight < c.max).length;
                        const pct = Math.round(count / mice.length * 100);
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-bold" style={{ color: c.color }}>{c.label}</span>
                              <span className="opacity-50">{count} ({pct}%)</span>
                            </div>
                            <div className="h-3 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `${c.color}60` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* ── eDPI by Game ── */}
            <SectionTitle color="#ff3c3c" sub="How sensitivity preferences vary across competitive titles">Average eDPI by Game</SectionTitle>
            <div className="rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={gameBreakdown.filter(g => g.avgEdpi && g.players >= 10).map(g => ({
                  game: g.game,
                  avgEdpi: g.avgEdpi,
                  fill: { CS2: "#ff8c00", Valorant: "#ff4655", Apex: "#dc2626", "R6 Siege": "#4a86c8", "Overwatch 2": "#f99e1a", "Marvel Rivals": "#ed1d24", Deadlock: "#8b5cf6", "Call of Duty": "#5cb85c" }[g.game] || "#888"
                }))} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                  <XAxis dataKey="game" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#ffffff40", fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgEdpi" name="Avg eDPI" radius={[6, 6, 0, 0]}>
                    {gameBreakdown.filter(g => g.avgEdpi && g.players >= 10).map((g, i) => (
                      <Cell key={i} fill={{ CS2: "#ff8c00", Valorant: "#ff4655", Apex: "#dc2626", "R6 Siege": "#4a86c8", "Overwatch 2": "#f99e1a", "Marvel Rivals": "#ed1d24", Deadlock: "#8b5cf6", "Call of Duty": "#5cb85c" }[g.game] || "#888"} fillOpacity={0.6} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="text-xs text-center opacity-25 mt-2">Games with fewer than 10 tracked players or no eDPI data excluded</div>
            </div>
          </div>
        )}

        {/* ── SENSORS TAB ── */}
        {activeTab === "sensors" && (() => {
          const sensorData = mice.map(m => ({
            sensor: m.sensor,
            brand: m.brand,
            name: m.name,
            dpi: m.dpi,
            pollingRate: m.pollingRate,
            weight: m.weight,
            proUsage: m.proUsage,
            price: m.price,
          }));
          // Build sensor profiles
          const sensorMap = {};
          mice.forEach(m => {
            if (!sensorMap[m.sensor]) sensorMap[m.sensor] = { sensor: m.sensor, mice: [], totalUsage: 0, avgDpi: 0, avgPolling: 0, avgWeight: 0, avgPrice: 0, brands: new Set() };
            sensorMap[m.sensor].mice.push(m);
            sensorMap[m.sensor].totalUsage += m.proUsage;
            sensorMap[m.sensor].brands.add(m.brand);
          });
          const sensorProfiles = Object.values(sensorMap).map(s => {
            const sensorMouseNames = s.mice.map(m => m.name);
            const playerCount = allPlayers.filter(p => p.mouse && sensorMouseNames.some(mn => p.mouse === mn || p.mouse.includes(mn.split(" ").slice(-2).join(" ")))).length;
            return {
            ...s,
            mouseCount: s.mice.length,
            playerCount,
            avgDpi: Math.round(s.mice.reduce((a, m) => a + m.dpi, 0) / s.mice.length),
            avgPolling: Math.round(s.mice.reduce((a, m) => a + m.pollingRate, 0) / s.mice.length),
            avgWeight: Math.round(s.mice.reduce((a, m) => a + m.weight, 0) / s.mice.length * 10) / 10,
            avgPrice: Math.round(s.mice.reduce((a, m) => a + m.price, 0) / s.mice.length),
            brandList: [...s.brands].join(", "),
            topMouse: s.mice.sort((a, b) => b.proUsage - a.proUsage)[0]?.name || "",
          }});

          // Sensor usage by game
          const gameColors = { CS2: "#ff8c00", Valorant: "#ff4655", "League of Legends": "#c89b3c", LoL: "#c89b3c", Fortnite: "#4c7bd9", "Dota 2": "#e74c3c", "R6 Siege": "#4a86c8", "Rocket League": "#1a9fff", "Call of Duty": "#5cb85c", "Overwatch 2": "#f99e1a", Apex: "#dc2626", "Marvel Rivals": "#ed1d24", PUBG: "#f2a900", Deadlock: "#8b5cf6" };
          const allGamesForSensor = ["All", ...new Set(allPlayers.map(p => p.game))];
          const sensorByGame = {};
          allPlayers.forEach(p => {
            const m = mice.find(mm => mm.name === p.mouse);
            if (!m) return;
            const game = p.game;
            if (!sensorByGame[game]) sensorByGame[game] = {};
            sensorByGame[game][m.sensor] = (sensorByGame[game][m.sensor] || 0) + 1;
          });

          // Sort sensor profiles
          const sortedSensors = [...sensorProfiles].sort((a, b) => {
            if (!sensorSort.key) return 0;
            const k = sensorSort.key;
            let av = a[k], bv = b[k];
            if (typeof av === "string") return sensorSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
            return sensorSort.dir === "asc" ? (av || 0) - (bv || 0) : (bv || 0) - (av || 0);
          });

          const sensorHeaders = [
            { key: "sensor", label: "Sensor" },
            { key: "mouseCount", label: "Mice" },
            { key: "totalUsage", label: "Pro Usage %" },
            { key: "brandList", label: "Brands" },
            { key: "topMouse", label: "Top Mouse" },
            { key: "avgDpi", label: "Avg DPI" },
            { key: "avgPolling", label: "Avg Poll" },
            { key: "avgWeight", label: "Avg Weight" },
            { key: "avgPrice", label: "Avg Price" },
          ];

          // Overall top sensor
          const topSensor = sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage)[0];

          return (
          <div>
            <SectionTitle color="#10b981" sub="Comprehensive breakdown of every sensor powering pro esports mice">Mouse Sensor Analytics</SectionTitle>

            {/* Top sensor highlight */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "#10b98108", border: "1px solid #10b98115" }}>
              <div className="flex items-center gap-4 mb-4">
                <img src="/images/mice/focus-pro-35k.png" alt="Focus Pro 35K" className="h-12 object-contain" style={{ filter: "drop-shadow(0 4px 12px rgba(16,185,129,0.3))" }} />
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-30">Most Popular Sensor in Esports</div>
                  <div className="text-2xl font-black" style={{ color: "#10b981" }}>{topSensor?.sensor}</div>
                  <div className="text-xs opacity-40">{topSensor?.totalUsage}% combined pro usage · Found in {topSensor?.mouseCount} mouse model{topSensor?.mouseCount !== 1 ? "s" : ""} · Used by {topSensor?.brandList}</div>
                </div>
              </div>
            </div>

            {/* Sensor overview cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).slice(0, 4).map((s, i) => {
                const colors = ["#10b981", "#00b4ff", "#f59e0b", "#ef4444"];
                return (
                  <div key={i} className="rounded-xl p-4" style={{ background: `${colors[i]}08`, border: `1px solid ${colors[i]}12` }}>
                    <div className="text-xs opacity-30 mb-1">#{i + 1} Most Used</div>
                    <div className="text-sm font-black mb-1" style={{ color: colors[i] }}>{s.sensor}</div>
                    <div className="text-2xl font-black">{s.totalUsage}%</div>
                    <div className="text-xs opacity-40 mt-1">{s.mouseCount} mice use this sensor:</div>
                    <div className="text-xs opacity-50 mt-0.5 leading-relaxed">{s.mice.map(m => m.name.replace(m.brand + " ", "")).join(", ")}</div>
                    <div className="text-xs font-bold mt-1.5" style={{ color: colors[i] }}>{s.playerCount} pro players</div>
                  </div>
                );
              })}
            </div>

            {/* Sensor table */}
            <div className="text-xs uppercase tracking-widest opacity-30 mb-3 mt-8">All Sensors  -  Click Headers to Sort</div>
            <div className="overflow-x-auto rounded-2xl mb-8" style={{ border: "1px solid #ffffff08" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#0a0a0a" }}>
                    {sensorHeaders.map(h => (
                      <th key={h.label} className="px-4 py-3 text-left text-xs uppercase tracking-wider font-bold cursor-pointer select-none hover:opacity-80"
                        style={{ color: sensorSort.key === h.key ? "#10b981" : "#ffffff30" }}
                        onClick={() => setSensorSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: typeof sensorProfiles[0]?.[h.key] === "string" ? "asc" : "desc" })}>
                        {h.label}{sensorSort.key === h.key ? (sensorSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedSensors.map((s, i) => (
                    <tr key={s.sensor} style={{ borderBottom: "1px solid #ffffff05", background: i % 2 === 0 ? "#050505" : "#080808" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#10b98108"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#050505" : "#080808"}>
                      <td className="px-4 py-3 font-black" style={{ color: "#10b981" }}>{s.sensor}</td>
                      <td className="px-4 py-3 font-bold">{s.mouseCount}</td>
                      <td className="px-4 py-3 font-black">{s.totalUsage}%</td>
                      <td className="px-4 py-3 text-xs opacity-50">{s.brandList}</td>
                      <td className="px-4 py-3 text-xs">{s.topMouse}</td>
                      <td className="px-4 py-3">{s.avgDpi >= 1000 ? `${(s.avgDpi/1000).toFixed(0)}K` : s.avgDpi}</td>
                      <td className="px-4 py-3">{s.avgPolling >= 1000 ? `${(s.avgPolling/1000).toFixed(1)}K` : s.avgPolling}Hz</td>
                      <td className="px-4 py-3">{s.avgWeight}g</td>
                      <td className="px-4 py-3">{"$"}{s.avgPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Which mice use each sensor */}
            <SectionTitle color="#00b4ff" sub="Every mouse in our database grouped by sensor">Mice by Sensor</SectionTitle>
            <div className="space-y-4 mb-8">
              {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map((s, si) => (
                <div key={s.sensor} className="rounded-xl p-4" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-black" style={{ color: "#10b981" }}>{s.sensor}</div>
                      <div className="text-xs opacity-30">{s.totalUsage}% pro usage</div>
                    </div>
                    <div className="text-xs opacity-30">{s.mouseCount} model{s.mouseCount !== 1 ? "s" : ""}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.mice.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                      <button key={mi} onClick={() => { setSelectedMouse(m); setActiveTab("overview"); }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all hover:scale-105"
                        style={{ background: `${BRAND_COLORS[m.brand]}12`, border: `1px solid ${BRAND_COLORS[m.brand]}20`, color: BRAND_COLORS[m.brand] }}>
                        {MOUSE_IMAGE_URLS[m.name] ? <img src={MOUSE_IMAGE_URLS[m.name]} alt="" className="inline h-4 mr-1 object-contain" /> : m.image} {m.name} <span className="opacity-40">({m.proUsage}%)</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sensor popularity by game */}
            <SectionTitle color="#f59e0b" sub="Which sensors dominate in each esports title">Sensor Popularity by Game</SectionTitle>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {allGamesForSensor.map(g => (
                <button key={g} onClick={() => setSensorGameFilter(g)}
                  className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: sensorGameFilter === g ? (gameColors[g] || "#10b981") : "#ffffff06",
                    color: sensorGameFilter === g ? "#000" : "#ffffff40",
                    border: sensorGameFilter === g ? "none" : "1px solid #ffffff08",
                  }}>
                  {g}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(sensorGameFilter === "All" ? Object.keys(sensorByGame) : [sensorGameFilter]).filter(g => sensorByGame[g]).map(game => {
                const gc = gameColors[game] || "#888";
                const entries = Object.entries(sensorByGame[game]).sort((a, b) => b[1] - a[1]);
                const total = entries.reduce((a, e) => a + e[1], 0);
                return (
                  <div key={game} className="rounded-xl p-4" style={{ background: `${gc}06`, border: `1px solid ${gc}12` }}>
                    <div className="text-sm font-black mb-3" style={{ color: gc }}>{game}</div>
                    <div className="space-y-2">
                      {entries.slice(0, 5).map(([sensor, count], ei) => (
                        <div key={sensor} className="flex items-center gap-2">
                          <div className="w-28 text-xs font-bold truncate" style={{ color: ei === 0 ? gc : "#ffffff60" }}>{sensor}</div>
                          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(count / entries[0][1]) * 100}%`, background: ei === 0 ? gc : `${gc}40` }} />
                          </div>
                          <div className="text-xs font-bold w-12 text-right" style={{ color: ei === 0 ? gc : "#ffffff40" }}>{Math.round((count / total) * 100)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sensor specs comparison */}
            <SectionTitle color="#c084fc" sub="Technical specifications compared across all sensors">Sensor Spec Comparison</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-5" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-xs uppercase tracking-widest opacity-30 mb-4">Max DPI by Sensor</div>
                <div className="space-y-2">
                  {sensorProfiles.sort((a, b) => b.avgDpi - a.avgDpi).map((s, i) => (
                    <div key={s.sensor} className="flex items-center gap-2">
                      <div className="w-28 text-xs font-bold truncate">{s.sensor}</div>
                      <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                        <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                          style={{ width: `${(s.avgDpi / 44000) * 100}%`, background: i === 0 ? "#c084fc30" : "#ffffff08" }}>
                          <span className="text-xs font-bold" style={{ color: i === 0 ? "#c084fc" : "#ffffff40", fontSize: 9 }}>{s.avgDpi >= 1000 ? `${(s.avgDpi/1000).toFixed(0)}K` : s.avgDpi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-xs uppercase tracking-widest opacity-30 mb-4">Avg Polling Rate by Sensor</div>
                <div className="space-y-2">
                  {sensorProfiles.sort((a, b) => b.avgPolling - a.avgPolling).map((s, i) => (
                    <div key={s.sensor} className="flex items-center gap-2">
                      <div className="w-28 text-xs font-bold truncate">{s.sensor}</div>
                      <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#ffffff06" }}>
                        <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                          style={{ width: `${(s.avgPolling / 8000) * 100}%`, background: i === 0 ? "#10b98130" : "#ffffff08" }}>
                          <span className="text-xs font-bold" style={{ color: i === 0 ? "#10b981" : "#ffffff40", fontSize: 9 }}>{s.avgPolling >= 1000 ? `${(s.avgPolling/1000).toFixed(1)}K` : s.avgPolling}Hz</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sensor Comparison Tool */}
            <SectionTitle color="#f59e0b" sub="Select two sensors to compare specs, usage, and popularity head-to-head">Sensor vs Sensor Comparison</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs uppercase tracking-widest opacity-30 mb-2">Sensor A</div>
                <select value={compareSensor1 || ""} onChange={e => setCompareSensor1(e.target.value || null)}
                  className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer font-bold"
                  style={{ background: "#0a0a0a", border: `1px solid ${compareSensor1 ? "#f59e0b30" : "#ffffff15"}`, color: compareSensor1 ? "#f59e0b" : "#fff" }}>
                  <option value="">Select sensor...</option>
                  {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map(s => (
                    <option key={s.sensor} value={s.sensor}>{s.sensor} ({s.totalUsage}% usage)</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest opacity-30 mb-2">Sensor B</div>
                <select value={compareSensor2 || ""} onChange={e => setCompareSensor2(e.target.value || null)}
                  className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer font-bold"
                  style={{ background: "#0a0a0a", border: `1px solid ${compareSensor2 ? "#00b4ff30" : "#ffffff15"}`, color: compareSensor2 ? "#00b4ff" : "#fff" }}>
                  <option value="">Select sensor...</option>
                  {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map(s => (
                    <option key={s.sensor} value={s.sensor}>{s.sensor} ({s.totalUsage}% usage)</option>
                  ))}
                </select>
              </div>
            </div>

            {compareSensor1 && compareSensor2 ? (() => {
              const s1 = sensorProfiles.find(s => s.sensor === compareSensor1);
              const s2 = sensorProfiles.find(s => s.sensor === compareSensor2);
              if (!s1 || !s2) return null;
              const c1 = "#f59e0b", c2 = "#00b4ff";
              const compareRows = [
                { label: "Pro Usage", v1: `${s1.totalUsage}%`, v2: `${s2.totalUsage}%`, n1: s1.totalUsage, n2: s2.totalUsage, higher: "more" },
                { label: "Mouse Models", v1: s1.mouseCount, v2: s2.mouseCount, n1: s1.mouseCount, n2: s2.mouseCount, higher: "more" },
                { label: "Avg DPI", v1: s1.avgDpi >= 1000 ? `${(s1.avgDpi/1000).toFixed(0)}K` : s1.avgDpi, v2: s2.avgDpi >= 1000 ? `${(s2.avgDpi/1000).toFixed(0)}K` : s2.avgDpi, n1: s1.avgDpi, n2: s2.avgDpi, higher: "more" },
                { label: "Avg Poll Rate", v1: `${s1.avgPolling >= 1000 ? `${(s1.avgPolling/1000).toFixed(1)}K` : s1.avgPolling}Hz`, v2: `${s2.avgPolling >= 1000 ? `${(s2.avgPolling/1000).toFixed(1)}K` : s2.avgPolling}Hz`, n1: s1.avgPolling, n2: s2.avgPolling, higher: "more" },
                { label: "Avg Weight", v1: `${s1.avgWeight}g`, v2: `${s2.avgWeight}g`, n1: s1.avgWeight, n2: s2.avgWeight, higher: "less" },
                { label: "Avg Price", v1: `$${s1.avgPrice}`, v2: `$${s2.avgPrice}`, n1: s1.avgPrice, n2: s2.avgPrice, higher: "less" },
                { label: "Brands", v1: s1.brandList, v2: s2.brandList, n1: 0, n2: 0, higher: "none" },
                { label: "Top Mouse", v1: s1.topMouse, v2: s2.topMouse, n1: 0, n2: 0, higher: "none" },
              ];
              const s1Wins = compareRows.filter(r => r.higher !== "none" && ((r.higher === "more" && r.n1 > r.n2) || (r.higher === "less" && r.n1 < r.n2))).length;
              const s2Wins = compareRows.filter(r => r.higher !== "none" && ((r.higher === "more" && r.n2 > r.n1) || (r.higher === "less" && r.n2 < r.n1))).length;
              return (
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #ffffff08" }}>
                  <div className="grid grid-cols-3" style={{ background: "#0a0a0a" }}>
                    <div className="p-4 text-center">
                      <div className="text-lg font-black" style={{ color: c1 }}>{s1.sensor}</div>
                      <div className="text-xs opacity-30">{s1.brandList}</div>
                      <div className="text-2xl font-black mt-1" style={{ color: s1Wins > s2Wins ? c1 : "#ffffff20" }}>{s1Wins}</div>
                      <div className="text-xs opacity-20">wins</div>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center">
                      <div className="text-xl font-black opacity-20">VS</div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-lg font-black" style={{ color: c2 }}>{s2.sensor}</div>
                      <div className="text-xs opacity-30">{s2.brandList}</div>
                      <div className="text-2xl font-black mt-1" style={{ color: s2Wins > s1Wins ? c2 : "#ffffff20" }}>{s2Wins}</div>
                      <div className="text-xs opacity-20">wins</div>
                    </div>
                  </div>
                  {compareRows.map((row, ri) => {
                    const winner = row.higher === "none" ? "none" : row.higher === "more" ? (row.n1 > row.n2 ? "s1" : row.n2 > row.n1 ? "s2" : "tie") : (row.n1 < row.n2 ? "s1" : row.n2 < row.n1 ? "s2" : "tie");
                    return (
                      <div key={ri} className="grid grid-cols-3" style={{ background: ri % 2 === 0 ? "#050505" : "#080808", borderTop: "1px solid #ffffff05" }}>
                        <div className="p-3 text-center">
                          <span className="text-sm font-bold" style={{ color: winner === "s1" ? c1 : "#ffffff60" }}>{row.v1}</span>
                          {winner === "s1" && <span className="ml-1 text-xs" style={{ color: c1 }}>✓</span>}
                        </div>
                        <div className="p-3 text-center">
                          <span className="text-xs uppercase tracking-wider opacity-30">{row.label}</span>
                          {row.higher !== "none" && row.n1 !== row.n2 && (
                            <div className="flex items-center gap-1 justify-center mt-1">
                              <div className="h-1.5 rounded-full" style={{ width: `${Math.min((row.n1 / Math.max(row.n1, row.n2)) * 40, 40)}px`, background: winner === "s1" ? c1 : `${c1}40` }} />
                              <div className="h-1.5 rounded-full" style={{ width: `${Math.min((row.n2 / Math.max(row.n1, row.n2)) * 40, 40)}px`, background: winner === "s2" ? c2 : `${c2}40` }} />
                            </div>
                          )}
                        </div>
                        <div className="p-3 text-center">
                          {winner === "s2" && <span className="mr-1 text-xs" style={{ color: c2 }}>✓</span>}
                          <span className="text-sm font-bold" style={{ color: winner === "s2" ? c2 : "#ffffff60" }}>{row.v2}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="grid grid-cols-2" style={{ background: "#0a0a0a", borderTop: "1px solid #ffffff08" }}>
                    <div className="p-4">
                      <div className="text-xs uppercase tracking-widest opacity-20 mb-2">Mice with {s1.sensor}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {s1.mice.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                          <button key={mi} onClick={() => { setSelectedMouse(m); setActiveTab("overview"); }}
                            className="px-2 py-1 rounded text-xs font-bold cursor-pointer transition-all hover:scale-105"
                            style={{ background: `${c1}12`, color: c1 }}>{MOUSE_IMAGE_URLS[m.name] ? <img src={MOUSE_IMAGE_URLS[m.name]} alt="" className="inline h-4 mr-1 object-contain" /> : m.image} {m.name.replace(/(Logitech |Razer |Finalmouse |Lamzu |Pulsar |SteelSeries |Corsair |Endgame Gear |ASUS |WLMouse |Zowie )/, "")}</button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs uppercase tracking-widest opacity-20 mb-2">Mice with {s2.sensor}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {s2.mice.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                          <button key={mi} onClick={() => { setSelectedMouse(m); setActiveTab("overview"); }}
                            className="px-2 py-1 rounded text-xs font-bold cursor-pointer transition-all hover:scale-105"
                            style={{ background: `${c2}12`, color: c2 }}>{MOUSE_IMAGE_URLS[m.name] ? <img src={MOUSE_IMAGE_URLS[m.name]} alt="" className="inline h-4 mr-1 object-contain" /> : m.image} {m.name.replace(/(Logitech |Razer |Finalmouse |Lamzu |Pulsar |SteelSeries |Corsair |Endgame Gear |ASUS |WLMouse |Zowie )/, "")}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="rounded-2xl p-8 text-center" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                <div className="text-3xl mb-2 opacity-20">🔬 ⚡ 🔬</div>
                <div className="text-sm opacity-30">Select two sensors above to compare them head-to-head</div>
              </div>
            )}
          </div>
          );
        })()}

        {/* ── COMPARE TAB ── */}
        {activeTab === "compare" && (
          <div>
            <SectionTitle color="#8b5cf6" sub="Select two mice to compare specs side-by-side">Mouse Comparison Tool</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[0, 1].map(idx => (
                <div key={idx}>
                  <select
                    value={compareList[idx]?.id || ""}
                    onChange={e => {
                      const m = mice.find(m => m.id === parseInt(e.target.value));
                      const newList = [...compareList];
                      newList[idx] = m;
                      setCompareList(newList);
                    }}
                    className="w-full px-4 py-3 rounded-xl text-sm font-bold mb-4"
                    style={{ background: "#0a0a0a", border: `1px solid ${BRAND_COLORS[compareList[idx]?.brand] || "#333"}40`, color: BRAND_COLORS[compareList[idx]?.brand] || "#fff" }}
                  >
                    {mice.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  {compareList[idx] && (
                    <div className="rounded-2xl p-5 text-center" style={{ background: `${BRAND_COLORS[compareList[idx].brand]}08`, border: `1px solid ${BRAND_COLORS[compareList[idx].brand]}20` }}>
                      {MOUSE_IMAGE_URLS[compareList[idx].name] ? <img src={MOUSE_IMAGE_URLS[compareList[idx].name]} alt={compareList[idx].name} className="h-16 mx-auto mb-3 object-contain" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }} /> : <span className="text-5xl block mb-3">{compareList[idx].image}</span>}
                      <div className="text-xl font-black" style={{ color: BRAND_COLORS[compareList[idx].brand] }}>{compareList[idx].name}</div>
                      <div className="text-xs opacity-30 mt-1">{compareList[idx].brand}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {compareList[0] && compareList[1] && (() => {
              const specs = [
                { label: "Weight", key: "weight", unit: "g", lower: true },
                { label: "Price", key: "price", unit: "$", lower: true, prefix: "$" },
                { label: "Sensor", key: "sensor", unit: "" },
                { label: "Max DPI", key: "dpi", unit: "" },
                { label: "Polling Rate", key: "pollingRate", unit: " Hz" },
                { label: "Shape", key: "shape", unit: "" },
                { label: "Connectivity", key: "connectivity", unit: "" },
                { label: "Switches", key: "switches", unit: "" },
                { label: "Pro Usage", key: "proUsage", unit: "%", lower: false },
                { label: "Rating", key: "rating", unit: "/10", lower: false },
              ];
              const c0 = BRAND_COLORS[compareList[0].brand];
              const c1 = BRAND_COLORS[compareList[1].brand];
              let wins0 = 0, wins1 = 0;
              specs.forEach(spec => {
                const v0 = compareList[0][spec.key], v1 = compareList[1][spec.key];
                if (typeof v0 === "number") {
                  const w = spec.lower ? (v0 < v1 ? 0 : v0 > v1 ? 1 : -1) : (v0 > v1 ? 0 : v0 < v1 ? 1 : -1);
                  if (w === 0) wins0++; else if (w === 1) wins1++;
                }
              });
              const verdictColor = wins0 > wins1 ? c0 : wins1 > wins0 ? c1 : "#888";
              const verdictName = wins0 > wins1 ? compareList[0].name : wins1 > wins0 ? compareList[1].name : null;
              return (
              <div>
                {/* Verdict banner */}
                <div className="rounded-xl p-4 mb-6 text-center" style={{ background: `${verdictColor}08`, border: `1px solid ${verdictColor}20` }}>
                  <div className="text-xs uppercase tracking-widest opacity-40 mb-1">Spec Comparison Verdict</div>
                  <div className="text-lg font-black" style={{ color: verdictColor }}>
                    {verdictName ? `${verdictName} wins ${Math.max(wins0, wins1)}-${Math.min(wins0, wins1)}` : `Tied ${wins0}-${wins1}`}
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="text-xs" style={{ color: c0 }}>● {compareList[0].name.replace(/(Logitech |Razer )/, "")}: {wins0} wins</span>
                    <span className="text-xs" style={{ color: c1 }}>● {compareList[1].name.replace(/(Logitech |Razer )/, "")}: {wins1} wins</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #ffffff08" }}>
                  {specs.map((spec, i) => {
                    const v0 = compareList[0][spec.key];
                    const v1 = compareList[1][spec.key];
                    const isNum = typeof v0 === "number";
                    const winner = !isNum ? null : spec.lower ? (v0 < v1 ? 0 : v0 > v1 ? 1 : null) : (v0 > v1 ? 0 : v0 < v1 ? 1 : null);
                    return (
                      <div key={i} className="grid grid-cols-3 items-center" style={{ background: i % 2 === 0 ? "#050505" : "#080808", borderBottom: "1px solid #ffffff05" }}>
                        <div className="px-4 py-3 text-right font-bold text-sm" style={{ color: winner === 0 ? c0 : "#ffffff80" }}>
                          {spec.prefix}{v0}{typeof v0 === "number" ? spec.unit : ""} {winner === 0 && "✓"}
                        </div>
                        <div className="px-4 py-3 text-center text-xs uppercase tracking-widest opacity-30">{spec.label}</div>
                        <div className="px-4 py-3 text-left font-bold text-sm" style={{ color: winner === 1 ? c1 : "#ffffff80" }}>
                          {winner === 1 && "✓ "}{spec.prefix}{v1}{typeof v1 === "number" ? spec.unit : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-2xl p-6" style={{ background: "#0a0a0a", border: "1px solid #ffffff08" }}>
                  <div className="text-sm font-bold mb-4 opacity-60 text-center">Performance Radar Overlay</div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={[
                      { stat: "Lightness", a: Math.max(0, 100 - compareList[0].weight), b: Math.max(0, 100 - compareList[1].weight) },
                      { stat: "Sensor", a: (compareList[0].dpi / 44000) * 100, b: (compareList[1].dpi / 44000) * 100 },
                      { stat: "Poll Rate", a: (compareList[0].pollingRate / 8000) * 100, b: (compareList[1].pollingRate / 8000) * 100 },
                      { stat: "Pro Usage", a: compareList[0].proUsage * 4, b: compareList[1].proUsage * 4 },
                      { stat: "Rating", a: compareList[0].rating * 10, b: compareList[1].rating * 10 },
                      { stat: "Value", a: Math.max(0, 100 - (compareList[0].price / 2)), b: Math.max(0, 100 - (compareList[1].price / 2)) },
                    ]}>
                      <PolarGrid stroke="#ffffff10" />
                      <PolarAngleAxis dataKey="stat" tick={{ fill: "#ffffff40", fontSize: 10 }} />
                      <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                      <Radar name={compareList[0].name} dataKey="a" stroke={BRAND_COLORS[compareList[0].brand]} fill={BRAND_COLORS[compareList[0].brand]} fillOpacity={0.15} strokeWidth={2} />
                      <Radar name={compareList[1].name} dataKey="b" stroke={BRAND_COLORS[compareList[1].brand]} fill={BRAND_COLORS[compareList[1].brand]} fillOpacity={0.15} strokeWidth={2} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {compareList.map((m, idx) => (
                    <a key={idx} href={`https://amazon.com/s?k=${encodeURIComponent(m.name)}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all text-center"
                      style={{ background: BRAND_COLORS[m.brand], color: "#000" }}>
                      🛒 Buy {m.name.split(" ").slice(-2).join(" ")}  -  {"$"}{m.price}
                    </a>
                  ))}
                </div>
              </div>
            )})()}
          </div>
        )}

      </main>

      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "#00ff6a", color: "#000", boxShadow: "0 4px 20px #00ff6a40" }}>
          ▲
        </button>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="border-t py-12 px-6" style={{ borderColor: "#ffffff08", background: "#030303" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🖱️</span>
                <span style={{ fontFamily: "Orbitron", fontSize: 12, letterSpacing: 4, color: "#00ff6a" }}>ESPORTSMICE</span>
              </div>
              <p className="text-xs opacity-30 leading-relaxed">{`The definitive resource for professional esports mice. Data from ${allPlayers.length}+ pro players across ${new Set(allPlayers.map(p=>p.game)).size} major competitive titles.`}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest opacity-30 mb-3">Games</div>
              <div className="space-y-2 text-xs">
                {["Counter-Strike 2", "Valorant", "League of Legends", "Dota 2", "Fortnite", "Call of Duty", "Overwatch 2", "Apex Legends", "R6 Siege", "Rocket League", "Marvel Rivals", "PUBG", "Deadlock"].map(g => {
                  const gameColors = { "Counter-Strike 2": "#ff8c00", Valorant: "#ff4655", "League of Legends": "#c89b3c", LoL: "#c89b3c", "Dota 2": "#e74c3c", Fortnite: "#4c7bd9", "Call of Duty": "#5cb85c", "Overwatch 2": "#f99e1a", "Apex Legends": "#dc2626", "R6 Siege": "#4a86c8", "Rocket League": "#1a9fff", "Marvel Rivals": "#ed1d24", PUBG: "#f2a900", Deadlock: "#8b5cf6" };
                  return <div key={g} className="cursor-pointer hover:opacity-80 transition-all" style={{ color: gameColors[g] || "#888" }} onClick={() => setActiveTab("games")}>{g}</div>;
                })}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest opacity-30 mb-3">Top Brands</div>
              <div className="space-y-2 text-xs">
                {["Razer", "Logitech", "Zowie", "Finalmouse", "Lamzu", "Pulsar"].map(b => (
                  <div key={b} className="cursor-pointer hover:opacity-80 transition-all" style={{ color: BRAND_COLORS[b] }} onClick={() => setActiveTab("brands")}>{b}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest opacity-30 mb-3">Resources</div>
              <div className="space-y-2 text-xs">
                {[{ label: "Mouse Rankings", tab: "rankings" }, { label: "Pro Settings DB", tab: "players" }, { label: "Comparison Tool", tab: "compare" }, { label: "Brand Profiles", tab: "brands" }, { label: "Weight Trends", tab: "trends" }, { label: "All Mice", tab: "mice" }].map(r => (
                  <div key={r.label} className="cursor-pointer hover:opacity-80 transition-all opacity-50 hover:opacity-70" onClick={() => setActiveTab(r.tab)}>{r.label}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex justify-between items-center text-xs opacity-20" style={{ borderColor: "#ffffff08" }}>
            <span>© 2026 EsportsMice.com  -  All rights reserved</span>
            <span>As an Amazon Associate, EsportsMice earns from qualifying purchases</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
