"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { FaHtml5, FaCss3Alt, FaReact, FaPython, FaPhp, FaAndroid, FaGithub, FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { SiJavascript, SiPostgresql, SiMysql } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
interface PathPoint {
  x: number;
  y: number;
}

interface FrostFeather {
  x: number;
  y: number;
  tx: number;
  ty: number;
}

// Struktur Cabang Retakan Es (Persis dari HTML asli user)
class CrackBranch {
  x: number;
  y: number;
  startX: number;
  startY: number;
  angle: number;
  targetLength: number;
  currentLength: number;
  thickness: number;
  depth: number;
  finished: boolean;
  path: PathPoint[];
  frostFeathers: FrostFeather[];
  speed: number;

  constructor(x: number, y: number, angle: number, length: number, thickness: number, depth = 0, speed?: number) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.angle = angle;
    this.targetLength = length;
    this.currentLength = 0;
    this.thickness = thickness;
    this.depth = depth;
    this.finished = false;
    this.path = [{ x, y }];
    this.frostFeathers = [];
    this.speed = speed ?? (Math.random() * 7 + 9);
  }

  step(cracksList: CrackBranch[], playAudioFn?: (vol: number) => void) {
    if (this.finished) return;

    if (Math.random() < 0.15 && playAudioFn) {
      playAudioFn(Math.max(0.05, 0.35 - this.depth * 0.08));
    }

    const stepSize = Math.min(this.speed, this.targetLength - this.currentLength);
    this.currentLength += stepSize;

    this.angle += (Math.random() - 0.5) * 0.5;

    this.x += Math.cos(this.angle) * stepSize;
    this.y += Math.sin(this.angle) * stepSize;
    this.path.push({ x: this.x, y: this.y });

    if (Math.random() < 0.6) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const featherAngle = this.angle + (side * Math.PI) / 2 + (Math.random() - 0.5) * 0.6;
      const featherLen = Math.random() * 7 + 2;
      this.frostFeathers.push({
        x: this.x,
        y: this.y,
        tx: this.x + Math.cos(featherAngle) * featherLen,
        ty: this.y + Math.sin(featherAngle) * featherLen,
      });
    }

    if (this.depth < 6 && Math.random() < 0.09 && this.currentLength > 15) {
      const branchAngle = this.angle + (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 0.7);
      const branchLen = this.targetLength * (0.4 + Math.random() * 0.5);
      cracksList.push(new CrackBranch(this.x, this.y, branchAngle, branchLen, this.thickness * 0.7, this.depth + 1, this.speed * 0.88));
    }

    if (this.currentLength >= this.targetLength) {
      this.finished = true;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.path.length < 2) return;

    // 1. Gambar kristal beku (frost needles - mint green)
    if (this.frostFeathers.length > 0) {
      context.strokeStyle = "rgba(205, 255, 235, 0.85)";
      context.lineWidth = 0.9;
      context.beginPath();
      for (let i = 0; i < this.frostFeathers.length; i++) {
        const f = this.frostFeathers[i];
        context.moveTo(f.x, f.y);
        context.lineTo(f.tx, f.ty);
      }
      context.stroke();
    }

    // Reuse a single Path2D for all 3 crack passes (glow, crevice, highlight)
    const p = new Path2D();
    p.moveTo(this.path[0].x, this.path[0].y);
    for (let i = 1; i < this.path.length; i++) {
      p.lineTo(this.path[i].x, this.path[i].y);
    }

    // 2. Emerald crack glow aura (cahaya retakan es hijau)
    context.strokeStyle = "rgba(52, 211, 153, 0.45)";
    context.lineWidth = Math.max(2.5, this.thickness * 2.2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke(p);

    // 3. Garis bayangan celah retakan (Deep forest / emerald crevice)
    context.strokeStyle = "rgba(10, 48, 38, 0.9)";
    context.lineWidth = Math.max(1.2, this.thickness);
    context.stroke(p);

    // 4. Garis kilauan es hijau cerah (Bright mint/jade specular highlight)
    context.strokeStyle = "rgba(225, 255, 240, 0.95)";
    context.lineWidth = Math.max(0.6, this.thickness * 0.65);
    context.stroke(p);
  }
}

// Sparkle (Kilauan cahaya bintang - Green Crystal Sparkle - Hardware Optimized)
class Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  phase: "in" | "out";

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 12 + 8;
    this.alpha = 0;
    this.phase = "in";
  }

  update() {
    if (this.phase === "in") {
      this.alpha += 0.04;
      if (this.alpha >= 1) this.phase = "out";
    } else {
      this.alpha -= 0.03;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.alpha <= 0) return;
    context.save();
    context.translate(this.x, this.y);

    // Brilliant crystal star core (without heavy CPU shadowBlur)
    context.fillStyle = `rgba(220, 255, 240, ${this.alpha})`;
    context.beginPath();
    for (let i = 0; i < 4; i++) {
      context.rotate(Math.PI / 2);
      context.lineTo(this.size, 0);
      context.lineTo(this.size * 0.2, this.size * 0.2);
    }
    context.closePath();
    context.fill();

    // Fast soft emerald ambient core
    context.fillStyle = `rgba(52, 211, 153, ${this.alpha * 0.35})`;
    context.beginPath();
    context.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}

interface PetalItem {
  id: number;
  startX: string;
  endX: string;
  dur: string;
  del: string;
  scale: number;
  rot: string;
}

const PETAL_ITEMS: PetalItem[] = [
  { id: 1, startX: "6vw", endX: "18vw", dur: "11s", del: "0s", scale: 0.45, rot: "320deg" },
  { id: 2, startX: "24vw", endX: "14vw", dur: "13.5s", del: "1.8s", scale: 0.58, rot: "-280deg" },
  { id: 3, startX: "42vw", endX: "56vw", dur: "10.2s", del: "3.5s", scale: 0.38, rot: "400deg" },
  { id: 4, startX: "62vw", endX: "50vw", dur: "12.8s", del: "0.8s", scale: 0.52, rot: "260deg" },
  { id: 5, startX: "78vw", endX: "90vw", dur: "11.6s", del: "2.6s", scale: 0.42, rot: "-340deg" },
  { id: 6, startX: "92vw", endX: "76vw", dur: "14.4s", del: "4.8s", scale: 0.54, rot: "380deg" },
  { id: 7, startX: "16vw", endX: "28vw", dur: "13.2s", del: "6.2s", scale: 0.4, rot: "290deg" },
  { id: 8, startX: "34vw", endX: "22vw", dur: "11.8s", del: "7.4s", scale: 0.48, rot: "-310deg" },
  { id: 9, startX: "50vw", endX: "66vw", dur: "12.4s", del: "8.2s", scale: 0.44, rot: "360deg" },
  { id: 10, startX: "72vw", endX: "60vw", dur: "13.8s", del: "9.1s", scale: 0.5, rot: "-250deg" },
  { id: 11, startX: "84vw", endX: "96vw", dur: "10.5s", del: "3.2s", scale: 0.36, rot: "310deg" },
  { id: 12, startX: "46vw", endX: "36vw", dur: "15.1s", del: "1.2s", scale: 0.55, rot: "-380deg" },
];

interface TechStackItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "mobile" | "desktop";
  role: string;
  logo: React.ReactNode;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  color: string;
}

const STACK_TABS = [
  { id: "all", label: "All", icon: "❖" },
  { id: "frontend", label: "Frontend", icon: "◫" },
  { id: "backend", label: "Backend", icon: "☵" },
  { id: "database", label: "Database", icon: "⛁" },
  { id: "mobile", label: "Mobile", icon: "📱" },
  { id: "desktop", label: "Desktop", icon: "🖥" },
] as const;

const TECH_STACK_ITEMS: TechStackItem[] = [
  {
    id: "html5",
    name: "HTML5",
    category: "frontend",
    role: "Semantic Web Standard",
    logo: <FaHtml5 size={40} className="text-[#e34f26]" />,
    orbitRadius: 130,
    orbitAngle: 0,
    orbitSpeed: 25,
    color: "#e34f26",
  },
  {
    id: "css3",
    name: "CSS3",
    category: "frontend",
    role: "Modern Styling & Layouts",
    logo: <FaCss3Alt size={40} className="text-[#1572b6]" />,
    orbitRadius: 130,
    orbitAngle: 120,
    orbitSpeed: 25,
    color: "#1572b6",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    role: "Interactive Web Logic",
    logo: <SiJavascript size={36} className="text-[#F7DF1E]" />,
    orbitRadius: 130,
    orbitAngle: 240,
    orbitSpeed: 25,
    color: "#F7DF1E",
  },
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    role: "Component UI Architecture",
    logo: <FaReact size={40} className="text-[#61DAFB]" />,
    orbitRadius: 210,
    orbitAngle: 0,
    orbitSpeed: 40,
    color: "#61DAFB",
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    role: "Server-Side Engineering",
    logo: <FaPhp size={40} className="text-[#777BB4]" />,
    orbitRadius: 210,
    orbitAngle: 90,
    orbitSpeed: 40,
    color: "#777BB4",
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    role: "Scripting & Backend APIs",
    logo: <FaPython size={40} className="text-[#3776AB]" />,
    orbitRadius: 210,
    orbitAngle: 180,
    orbitSpeed: 40,
    color: "#3776AB",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    role: "Relational SQL Database",
    logo: <SiPostgresql size={38} className="text-[#336791]" />,
    orbitRadius: 210,
    orbitAngle: 270,
    orbitSpeed: 40,
    color: "#336791",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    role: "Relational Database Management",
    logo: <SiMysql size={42} className="text-[#00758F]" />,
    orbitRadius: 290,
    orbitAngle: 0,
    orbitSpeed: 55,
    color: "#00758F",
  },
  {
    id: "android-studio",
    name: "Android Studio",
    category: "mobile",
    role: "Native Android Development",
    logo: <FaAndroid size={40} className="text-[#3DDC84]" />,
    orbitRadius: 290,
    orbitAngle: 120,
    orbitSpeed: 55,
    color: "#3DDC84",
  },
  {
    id: "csharp",
    name: "C#",
    category: "desktop",
    role: "Enterprise Systems & .NET",
    logo: <TbBrandCSharp size={38} className="text-[#9B4F96]" />,
    orbitRadius: 290,
    orbitAngle: 240,
    orbitSpeed: 55,
    color: "#9B4F96",
  },
];

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  development: string;
  role: string;
  stack: string[];
  description: string;
  image: string;
  stats?: { label: string; value: string }[];
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "manajemen-sapras",
    title: "AMS - Manajemen SarPras",
    subtitle: "SISTEM INVENTARIS & LOGISTIK (CRUD)",
    category: "DESKTOP APPLICATION",
    year: "2026",
    development: "Personal",
    role: "Desktop Application Developer",
    stack: ["C#", ".NET", "Windows Forms", "MySQL", "CRUD Operations"],
    description: "Aplikasi desktop manajemen sarana dan prasarana (SarPras) sekolah berbasis sistem CRUD lengkap. Mengelola data master barang, siswa, guru, kelas, dan petugas, serta mencatat aktivitas operasional harian seperti peminjaman, pengembalian, permintaan, pembelian, laporan aktivitas & kerusakan barang, serta fitur backup dan restore database.",
    image: "/assets/projects/manajemen_sarpras.png",
    stats: [
      { label: "Materi Utama", value: "CRUD (Create, Read, Update, Delete)" },
      { label: "Modul Sistem", value: "Master Data & Logistik SarPras" },
    ],
  },
  {
    id: "value-akun",
    title: "Value Akun Game",
    subtitle: "ASSAULT RIFLE & ASSET VALUATION (LOOPING)",
    category: "DESKTOP APPLICATION",
    year: "2026",
    development: "Personal",
    role: "Desktop Developer & Algorithm Logic",
    stack: ["C#", ".NET", "Windows Forms", "Algoritma Looping"],
    description: "Aplikasi desktop penaksir dan penghitung estimasi nilai valuasi akun game (katalog koleksi senjata Assault Rifle & Evo Gun). Mengimplementasikan algoritma perulangan (looping) untuk memproses iterasi checklist skin senjata yang dipilih, kalkulasi dinamis berdasarkan tingkatan level (Lv. 6 / Lv. 7), dan penghitungan total harga akun secara real-time.",
    image: "/assets/projects/value_akun.png",
    stats: [
      { label: "Materi Utama", value: "Looping & Algoritma Iterasi" },
      { label: "Koleksi Item", value: "Assault Rifle Evo Skins" },
    ],
  },
  {
    id: "tmii-web",
    title: "Portal Edukasi Wisata TMII",
    subtitle: "TAMAN MINI INDONESIA INDAH WEB EXPLORER",
    category: "WEB APPLICATION",
    year: "2025",
    development: "Team (Kelompok 9)",
    role: "Frontend Web Developer",
    stack: ["HTML5", "CSS3", "JavaScript", "Google Maps Embed", "Responsive Web"],
    description: "Website portal edukasi dan pariwisata kebudayaan Taman Mini Indonesia Indah (TMII) sebagai proyek akhir semester kelompok SMKN 8 Jakarta. Menyajikan direktori lengkap anjungan budaya nusantara, wahana rekreasi, profil sejarah, integrasi peta interaktif lokasi, serta dokumentasi pembelajaran luar kelas bagi siswa.",
    image: "/assets/projects/tmii_web.png",
    stats: [
      { label: "Fokus Proyek", value: "Eksplorasi Budaya TMII" },
      { label: "Kolaborasi", value: "Kelompok 9 SMKN 8" },
    ],
  },
  {
    id: "budaya-betawi",
    title: "Profil Budaya Betawi",
    subtitle: "WARISAN ADAT, KULINER & TRADISI JAKARTA",
    category: "WEB APPLICATION",
    year: "2026",
    development: "Personal",
    role: "Frontend Web Developer",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design"],
    description: "Website profil dan eksplorasi kebudayaan Betawi karya Arga Fabian Gibran. Menjelaskan kekayaan warisan budaya Jakarta secara interaktif dan mendalam, mencakup rumah tradisional (Rumah Kebaya), pakaian adat resmi Betawi, aneka ragam makanan khas (Kerak Telor & Soto Betawi), seni tarian tradisional (Tari Yapong), kesenian Ondel-Ondel, hingga galeri dokumentasi budaya Betawi.",
    image: "/assets/projects/budaya_betawi.png",
    stats: [
      { label: "Materi Budaya", value: "Rumah Adat, Pakaian, Tarian & Kuliner" },
      { label: "Fitur Web", value: "Katalog Ragam Budaya & Galeri" },
    ],
  },
  {
    id: "nexus-finance",
    title: "Nexus Finance Dashboard",
    subtitle: "FINANCIAL ANALYTICS & CASH FLOW PLATFORM",
    category: "WEB APPLICATION",
    year: "2026",
    development: "Personal",
    role: "Fullstack / Frontend Developer",
    stack: ["TypeScript", "HTML5", "CSS3", "React / Next.js", "Chart.js", "REST API"],
    description: "Web dashboard analitik dan manajemen finansial modern dengan antarmuka dark mode futuristik. Menghadirkan visualisasi grafik arus kas mingguan (pemasukan vs pengeluaran), ringkasan saldo total real-time, pencatatan transaksi cepat (Add Transaction), riwayat kas, dan arsitektur kode modular berbasis TypeScript.",
    image: "/assets/projects/dashboard_finance.png",
    stats: [
      { label: "Teknologi", value: "TypeScript & Modular UI" },
      { label: "Fitur Utama", value: "Cash Flow & Financial Analytics" },
    ],
  },
];


// Progressive Text Styling for ARGA FABIAN GIBRAN on Heavenly Cloud Background:
// 1. 0% - 30%: Sangat samar-samar menyatu dengan awan putih (soft faint cloud slate tint, subtle blur)
// 2. 30% - 65%: Mulai lebih jelas terlihat secara halus (transisi dari slate lembut ke abu-abu netral)
// 3. 65% - 90%: Menggelap secara bertahap menuju arang gelap (charcoal)
// 4. 90% - 100%: Menjadi Hitam Pekat (#000000) dengan pinggiran berkilau (radiant shimmering halo)
const getTextStyle = (val: number): React.CSSProperties => {
  if (val < 30) {
    // Stage 1: Samar-samar menyatu dengan awan putih
    const ratio = Math.max(0, val / 30);
    const opacity = (0.2 + ratio * 0.2).toFixed(2); // 0.20 -> 0.40
    const blur = (2.5 - ratio * 1.0).toFixed(1); // 2.5px -> 1.5px
    return {
      color: `rgba(165, 190, 205, ${opacity})`,
      textShadow: "none",
      filter: `blur(${blur}px)`,
      transform: "translate(-50%, -50%)",
    };
  } else if (val < 65) {
    // Stage 2: Bertahap makin jelas, abu-abu lembut ke abu-abu gelap
    const ratio = (val - 30) / 35;
    const r = Math.round(165 - ratio * 85); // 165 -> 80
    const g = Math.round(190 - ratio * 95); // 190 -> 95
    const b = Math.round(205 - ratio * 95); // 205 -> 110
    const a = (0.4 + ratio * 0.4).toFixed(2); // 0.40 -> 0.80
    const blur = (1.5 - ratio * 1.5).toFixed(1); // 1.5px -> 0px
    return {
      color: `rgba(${r}, ${g}, ${b}, ${a})`,
      textShadow: "none",
      filter: blur > "0.1" ? `blur(${blur}px)` : "none",
      transform: "translate(-50%, -50%)",
    };
  } else if (val < 92) {
    // Stage 3: Menggelap mulus menuju hampir hitam pekat
    const ratio = (val - 65) / 27;
    const c = Math.round(80 - ratio * 70); // 80 -> 10
    const a = (0.8 + ratio * 0.18).toFixed(2); // 0.80 -> 0.98
    const glow = Math.round(ratio * 6);
    return {
      color: `rgba(${c}, ${c}, ${c}, ${a})`,
      textShadow: glow > 1 ? `0 0 ${glow}px rgba(255, 255, 255, ${ratio * 0.4})` : "none",
      filter: "none",
      transform: "translate(-50%, -50%)",
    };
  } else {
    // Stage 4: 92% - 100% -> Hitam Pekat (#000000) dengan pinggiran berkilau (radiant shimmering halo)
    const ratio = (val - 92) / 8;
    const g1 = Math.round(3 + ratio * 4); // 3 -> 7
    const g2 = Math.round(10 + ratio * 15); // 10 -> 25
    const g3 = Math.round(22 + ratio * 28); // 22 -> 50
    return {
      color: "#000000",
      textShadow: `0 0 ${g1}px #ffffff, 0 0 ${g2}px rgba(255, 255, 255, 0.95), 0 0 ${g3}px rgba(180, 230, 255, ${0.75 + ratio * 0.25}), 0 0 ${g3 + 20}px rgba(255, 255, 255, ${0.5 + ratio * 0.4})`,
      filter: `drop-shadow(0 0 ${Math.round(4 + ratio * 8)}px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 1px rgba(0, 0, 0, 0.75))`,
      transform: ratio > 0.8 ? "translate(-50%, -50%) scale(1.025)" : "translate(-50%, -50%) scale(1.0)",
    };
  }
};

export default function Home() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [counterValue, setCounterValue] = useState(0);
  const [isPhase1Exiting, setIsPhase1Exiting] = useState(false);

  // Phase 3 3D hands & Hold state (Direct Hardware & Raf References)
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const currentTilt = useRef({ x: 0, y: 0 });
  const targetMouseTiltRef = useRef({ x: 0, y: 0 });
  const holdStartTimeRef = useRef(0);
  const isHoldingRef = useRef(false);
  const [isHoldingState, setIsHoldingState] = useState(false);
  const [hasConnected, setHasConnected] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showAboutScreen, setShowAboutScreen] = useState(false);
  const [showHobbyModal, setShowHobbyModal] = useState(false);
  const [activeStackTab, setActiveStackTab] = useState<"all" | "frontend" | "backend" | "database" | "mobile" | "desktop">("all");

  // Basketball shorts video interactive player state (Instagram Reels Style)
  const basketVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1482);
  const [commentsCount] = useState(64);
  const [sharesCount] = useState(28);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  // Section 03 Projects 3D Coverflow state
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS_DATA.length - 1));
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev < PROJECTS_DATA.length - 1 ? prev + 1 : 0));
  };

  const getProjectOffset = (index: number) => {
    let diff = index - currentProjectIndex;
    if (diff > PROJECTS_DATA.length / 2) diff -= PROJECTS_DATA.length;
    if (diff < -PROJECTS_DATA.length / 2) diff += PROJECTS_DATA.length;
    return diff;
  };

  const toggleVideoPlay = () => {
    if (!basketVideoRef.current) return;
    if (basketVideoRef.current.paused) {
      basketVideoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      basketVideoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!basketVideoRef.current) return;
    const nextMuted = !basketVideoRef.current.muted;
    basketVideoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 800);
    } else {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleVideoDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleVideoTimeUpdate = () => {
    if (!basketVideoRef.current) return;
    const cur = basketVideoRef.current.currentTime;
    const dur = basketVideoRef.current.duration || 9;
    setVideoProgress((cur / dur) * 100);
  };

  // Static transparent image sources for seamless 3D layers (Hardware screen blended)
  const greenArmSrc = "/assets/long_green_arm_trans.png";
  const humanArmSrc = "/assets/long_human_arm_trans.png";
  const cloudsSrc = "/assets/heavenly_clouds_trans.png";
  const claspHandshakeSrc = "/assets/clasp_handshake_trans.png";

  // Canvas, audio and Phase 3 direct element DOM refs
  const phase1Ref = useRef<HTMLDivElement | null>(null);

  const dreamscapeBgRef = useRef<HTMLDivElement | null>(null);
  const godRaysRef = useRef<HTMLDivElement | null>(null);
  const armsContainerRef = useRef<HTMLDivElement | null>(null);
  const armsPairRef = useRef<HTMLDivElement | null>(null);
  const leftArmRef = useRef<HTMLDivElement | null>(null);
  const rightArmRef = useRef<HTMLDivElement | null>(null);
  const claspRef = useRef<HTMLDivElement | null>(null);
  const cloudsBlanketRef = useRef<HTMLDivElement | null>(null);
  const cloudsAmbientRef = useRef<HTMLDivElement | null>(null);
  const centerRingRef = useRef<HTMLDivElement | null>(null);
  const svgCircleRef = useRef<SVGCircleElement | null>(null);
  const celestialCardRef = useRef<HTMLDivElement | null>(null);

  const cracksRef = useRef<CrackBranch[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef<boolean>(true);

  // Check URL query parameters on mount to assist instant inspection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("phase") === "3" || params.get("p3")) {
        const timer = setTimeout(() => {
          setPhase(3);
          if (params.get("hold") === "1") {
            targetProgress.current = 1;
            currentProgress.current = 1;
            setHasConnected(true);
          }
          if (params.get("about") === "1") {
            setShowAboutScreen(true);
          }
          if (params.get("hobby") === "1") {
            setShowAboutScreen(true);
            setShowHobbyModal(true);
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Audio helper
  const initAudio = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);



  const playCelestialPulse = useCallback(() => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.6);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.1);
    } catch {
      // ignore
    }
  }, [initAudio]);



  // Transisi Lembut Lapisan Awan (Cloud Dissolve / Parting) ke Page Hold (Phase 3)
  const triggerCloudTransition = useCallback(() => {
    playCelestialPulse();

    // Beri jeda 450ms agar user dapat mengagumi efek nama hitam pekat dengan pinggiran berkilau di atas awan
    setTimeout(() => {
      setIsPhase1Exiting(true);
      // Mount Phase 3 tepat di bawah layer awan yang sedang berparting/fade out
      setPhase(3);

      if (phase1Ref.current) {
        gsap.to(phase1Ref.current, {
          opacity: 0,
          scale: 1.06,
          filter: "blur(10px)",
          duration: 1.25,
          ease: "power2.inOut",
          onComplete: () => {
            setIsPhase1Exiting(false);
          },
        });
      }
    }, 450);
  }, [playCelestialPulse]);

  // ==========================================
  // PHASE 1: Counter 0 -> 100% with Gradual Cloud-to-Glittering Black Name
  // ==========================================
  useEffect(() => {
    if (phase !== 1) return;

    const obj = { val: 0 };
    const counterTl = gsap.to(obj, {
      val: 100,
      duration: 3.2,
      ease: "power2.inOut",
      onUpdate: () => {
        setCounterValue(Math.floor(obj.val));
      },
      onComplete: () => {
        triggerCloudTransition();
      },
    });

    return () => {
      counterTl.kill();
    };
  }, [phase, triggerCloudTransition]);

  // ==========================================
  // PHASE 3: Bulletproof 1-Second Hold Gesture Engine
  // ==========================================
  useEffect(() => {
    if (phase !== 3) return;

    let animFrame: number;

    const onStartHold = (e: MouseEvent | TouchEvent | PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.closest("button") || target.closest("header") || target.closest(".modal-container") || target.closest("a"))) {
        return;
      }
      initAudio();
      if (!hasConnected) {
        holdStartTimeRef.current = performance.now();
        isHoldingRef.current = true;
        setIsHoldingState(true);
      }
    };

    const onEndHold = () => {
      isHoldingRef.current = false;
      setIsHoldingState(false);
      holdStartTimeRef.current = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseTiltRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      };
    };

    // Attach hold listeners on window to ensure it's 100% responsive everywhere
    window.addEventListener("pointerdown", onStartHold);
    window.addEventListener("pointerup", onEndHold);
    window.addEventListener("pointercancel", onEndHold);
    window.addEventListener("touchstart", onStartHold, { passive: true });
    window.addEventListener("touchend", onEndHold);
    window.addEventListener("mousemove", handleMouseMove);

    // Continuous physics update loop for Hands, Parallax & Atmosphere (Direct DOM, Zero React re-renders)
    const updateLoop = () => {
      const now = performance.now();
      if (isHoldingRef.current && !hasConnected) {
        // Harus di-hold terus menerus selama tepat 1 detik (1000ms)!
        const elapsed = now - holdStartTimeRef.current;
        const progress = Math.min(1, Math.max(0, elapsed / 1000));
        targetProgress.current = progress;

        if (elapsed >= 1000 && !hasConnected) {
          setHasConnected(true);
          playCelestialPulse();
          isHoldingRef.current = false;
          setIsHoldingState(false);
          targetProgress.current = 1;
        }
      } else if (!hasConnected) {
        // Jika dilepas sebelum 1.0 detik, progress langsung turun cepat
        targetProgress.current = Math.max(0, targetProgress.current - 0.05);
      }

      // Smooth interpolation for hold progress (0 to 1)
      const prevP = currentProgress.current;
      const nextP = prevP + (targetProgress.current - prevP) * 0.18;
      currentProgress.current = Math.abs(nextP - targetProgress.current) < 0.002 ? targetProgress.current : nextP;
      const p = currentProgress.current;

      // Smooth interpolation for mouse parallax tilt
      currentTilt.current.x += (targetMouseTiltRef.current.x - currentTilt.current.x) * 0.08;
      currentTilt.current.y += (targetMouseTiltRef.current.y - currentTilt.current.y) * 0.08;
      const tx = currentTilt.current.x;
      const ty = currentTilt.current.y;

      // Ultra-efficient Direct DOM transform updates (zero React re-renders, 60-120 FPS):
      if (dreamscapeBgRef.current) {
        dreamscapeBgRef.current.style.transform = `scale(${(1 + p * 0.05).toFixed(4)}) translate3d(${(tx * -0.4).toFixed(1)}px, ${(ty * -0.4).toFixed(1)}px, 0)`;
      }
      if (godRaysRef.current) {
        godRaysRef.current.style.opacity = (0.5 + p * 0.5).toFixed(3);
      }
      if (armsContainerRef.current) {
        armsContainerRef.current.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
      }
      if (armsPairRef.current) {
        armsPairRef.current.style.opacity = Math.max(0, 1 - (p - 0.72) / 0.2).toFixed(3);
      }
      if (leftArmRef.current) {
        leftArmRef.current.style.transform = `rotate(${(-6 + p * 7.5).toFixed(2)}deg) scale(${(0.96 + p * 0.06).toFixed(3)}) translateY(${(p * 2).toFixed(2)}vh)`;
      }
      if (rightArmRef.current) {
        rightArmRef.current.style.transform = `rotate(${(6.5 - p * 8).toFixed(2)}deg) scale(${(0.96 + p * 0.06).toFixed(3)}) translateY(${(-p * 2).toFixed(2)}vh)`;
      }
      if (claspRef.current) {
        claspRef.current.style.opacity = Math.max(0, Math.min(1, (p - 0.72) / 0.2)).toFixed(3);
        claspRef.current.style.transform = `scale(${(1 + p * 0.02).toFixed(3)})`;
      }
      if (cloudsBlanketRef.current) {
        cloudsBlanketRef.current.style.opacity = p > 0.5 ? Math.min(0.86, (p - 0.5) * 2.0).toFixed(3) : "0";
        cloudsBlanketRef.current.style.transform = `scale(${(1.12 - p * 0.08).toFixed(3)}) translateY(${(p > 0.5 ? (1 - p) * 60 : 70).toFixed(1)}px)`;
      }
      if (cloudsAmbientRef.current) {
        cloudsAmbientRef.current.style.opacity = p > 0.5 ? Math.min(0.78, (p - 0.5) * 1.8).toFixed(3) : "0";
      }
      if (svgCircleRef.current) {
        svgCircleRef.current.style.strokeDashoffset = (213 * (1 - p)).toFixed(1);
      }
      if (centerRingRef.current) {
        centerRingRef.current.style.opacity = p >= 0.92 ? "0" : "1";
        centerRingRef.current.style.transform = `scale(${(0.92 + p * 0.28).toFixed(3)})`;
        centerRingRef.current.style.pointerEvents = p >= 0.92 ? "none" : "auto";
      }
      if (celestialCardRef.current) {
        celestialCardRef.current.style.opacity = p >= 0.88 ? "1" : "0";
        celestialCardRef.current.style.transform = `translateY(${p >= 0.88 ? 0 : 30}px) scale(${p >= 0.88 ? 1 : 0.95})`;
        celestialCardRef.current.style.pointerEvents = p >= 0.88 ? "auto" : "none";
      }

      animFrame = requestAnimationFrame(updateLoop);
    };

    animFrame = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("pointerdown", onStartHold);
      window.removeEventListener("pointerup", onEndHold);
      window.removeEventListener("pointercancel", onEndHold);
      window.removeEventListener("touchstart", onStartHold);
      window.removeEventListener("touchend", onEndHold);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [phase, hasConnected, initAudio, playCelestialPulse]);

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none bg-black text-white">
      {/* ========================================================================= */}
      {/* PHASE 1: Loading Screen with Ethereal Clouds & Gradual Shimmering Name */}
      {/* ========================================================================= */}
      {(phase === 1 || isPhase1Exiting) && (
        <div
          id="phase1"
          ref={phase1Ref}
          className="phase-container active"
          style={{
            zIndex: 50,
            pointerEvents: phase === 1 && !isPhase1Exiting ? "auto" : "none",
          }}
        >
          {/* Ethereal Heavenly Cloud Background */}
          <div className="cloud-background-container pointer-events-none">
            <div className="cloud-dreamscape-layer" />
            <div className="cloud-veil-layer" />
            <div className="cloud-ambient-drift" />
          </div>

          {/* Straight, Elegant Symmetrical Serif Name (samar-samar -> netral -> hitam berkilau) */}
          <h1
            id="name-text-phase1"
            className="pointer-events-none"
            style={getTextStyle(counterValue)}
          >
            ARGA FABIAN GIBRAN
          </h1>

          {/* Subtle Minimalist Progress Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
            <span className="text-[12px] tracking-[0.28em] uppercase text-slate-500 font-medium">
              {counterValue}%
            </span>
            <div className="w-24 h-[2px] bg-slate-300/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-800 transition-all duration-100 ease-out"
                style={{ width: `${counterValue}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Subtle Ethereal Veil Flash on Transition */}
      <div
        className={`fixed inset-0 z-[60] pointer-events-none transition-opacity duration-700 ease-out ${
          isPhase1Exiting ? "opacity-35 bg-white" : "opacity-0"
        }`}
      />

      {/* ========================================================================= */}
      {/* PHASE 3: 3D Hands Creation Dreamscape (Picture 3 & 4) */}
      {/* ========================================================================= */}
      {phase === 3 && (
        <div id="phase3" className="phase-container active cursor-grab active:cursor-grabbing">
          {/* 3D Background Dreamscape with Classical Columns & God Rays */}
          <div
            ref={dreamscapeBgRef}
            className="dreamscape-bg-layer will-change-transform"
            style={{
              backgroundImage: "url(/assets/dreamscape_bg.jpg)",
            }}
          />
          <div className="dreamscape-overlay" />
          <div
            ref={godRaysRef}
            className="god-rays-overlay transition-opacity duration-300"
            style={{ opacity: 0.5 }}
          />

          {/* Floating Sakura / Rose Petals - 100% GPU Compositor Animation */}
          {PETAL_ITEMS.map((item) => (
            <img
              key={item.id}
              src="/assets/pink_petal_trans.png"
              alt=""
              className="petal-particle"
              style={{
                width: `${item.scale * 65}px`,
                height: `${item.scale * 65}px`,
                "--start-x": item.startX,
                "--end-x": item.endX,
                "--dur": item.dur,
                "--del": item.del,
                "--rot": item.rot,
              } as React.CSSProperties}
            />
          ))}

          {/* ===================================================================== */}
          {/* THE 3D ARMS & AUTHENTIC CLASPED HANDSHAKE LAYERS */}
          {/* ===================================================================== */}
          <div
            ref={armsContainerRef}
            className="absolute -inset-10 pointer-events-none z-20 overflow-hidden will-change-transform"
          >
            {/* 1. Two Separate Reaching Arms (Creation of Adam Pose -> Reaching forward) */}
            <div
              ref={armsPairRef}
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            >
              {/* Left Arm: Base Permanently Anchored to Left Screen Edge */}
              <div
                ref={leftArmRef}
                className="absolute will-change-transform pointer-events-none"
                style={{
                  top: "14vh",
                  left: "-18vw",
                  width: "76vw",
                  transformOrigin: "23.8% 46%",
                  transform: "rotate(-6deg) scale(0.96)",
                }}
              >
                <img
                  src={greenArmSrc}
                  alt="Creation Left Arm"
                  className="w-full h-auto object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>

              {/* Right Arm: Base Permanently Anchored to Right Screen Edge */}
              <div
                ref={rightArmRef}
                className="absolute will-change-transform pointer-events-none"
                style={{
                  bottom: "-6vh",
                  right: "-18vw",
                  width: "76vw",
                  transformOrigin: "76.2% 72%",
                  transform: "rotate(6.5deg) scale(0.96)",
                }}
              >
                <img
                  src={humanArmSrc}
                  alt="Creation Right Arm"
                  className="w-full h-auto object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>
            </div>

            {/* 2. Authentic Clasped Handshake (Steady & Majestic Clasp) */}
            <div
              ref={claspRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
              style={{
                opacity: 0,
                transform: "scale(1)",
              }}
            >
              <img
                src={claspHandshakeSrc}
                alt="Authentic Clasped Handshake"
                className="w-full h-full object-cover"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
          </div>

          {/* ===================================================================== */}
          {/* HEAVENLY CLOUD BLANKET LAYER (Covers hands when touching, leaves bg visible) */}
          {/* ===================================================================== */}
          <div
            ref={cloudsBlanketRef}
            className="clouds-blanket z-25 pointer-events-none"
            style={{
              backgroundImage: `url(${cloudsSrc})`,
              opacity: 0,
              transform: "scale(1.12) translateY(70px)",
            }}
          />
          <div
            ref={cloudsAmbientRef}
            className="clouds-ambient z-25 pointer-events-none"
            style={{
              opacity: 0,
            }}
          />

          {/* ===================================================================== */}
          {/* CENTER HERO CONTENT & TOUCH / HOLD FINGERTIP GLOW & HANDSHAKE */}
          {/* ===================================================================== */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
            {/* Central Interactive Light Ring / 1-Second Hold Gauge */}
            <div
              ref={centerRingRef}
              className="relative flex flex-col items-center justify-center transition-all duration-300 pointer-events-auto select-none"
              style={{
                opacity: 1,
                transform: "scale(0.92)",
              }}
            >
              {/* Circular Ring Glowing Energy with 1-Second Hold Gauge */}
              <div className="energy-ring flex items-center justify-center relative w-20 h-20">
                {/* SVG circular progress ring for 1-second hold */}
                <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="34"
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.2)"
                    strokeWidth="3.5"
                  />
                  <circle
                    ref={svgCircleRef}
                    cx="50%"
                    cy="50%"
                    r="34"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={213}
                    strokeDashoffset={213}
                    className="transition-all duration-75"
                  />
                </svg>
                <div
                  className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-spin"
                  style={{ animationDuration: "4s" }}
                />
                <div
                  className={`w-8 h-8 rounded-full bg-white shadow-[0_0_25px_#fff] transition-transform duration-200 ${
                    isHoldingState ? "scale-125 shadow-[0_0_35px_#34d399]" : "scale-100"
                  }`}
                />
              </div>

              {/* Hold (1s) Dynamic Instruction Badge */}
              <div className="mt-4 text-center">
                <span
                  className={`font-mono text-xs font-bold tracking-widest px-5 py-1.5 rounded-full backdrop-blur-md shadow-md border transition-all duration-200 ${
                    hasConnected || isHoldingState
                      ? "bg-emerald-600 text-white border-emerald-400 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      : "bg-white/80 text-slate-900 border-white/90"
                  }`}
                >
                  {isHoldingState ? "HOLDING..." : "HOLD (1s)"}
                </span>
              </div>
            </div>

            {/* Celestial Revealed Card inside Clouds (When Hands Shake / Meet) */}
            <div
              ref={celestialCardRef}
              className="absolute transition-all duration-700 pointer-events-auto flex flex-col items-center max-w-lg px-6 text-center"
              style={{
                opacity: 0,
                transform: "translateY(30px) scale(0.95)",
                pointerEvents: "none",
              }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-900 font-bold bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                WEB DEVELOPER
              </span>
              <h2 className="serif-hero-title text-4xl md:text-5xl font-bold text-slate-900 mt-3 drop-shadow-sm font-serif">
                ARGA FABIAN GIBRAN
              </h2>

              <div className="mt-5">
                <button
                  className="px-8 py-3 rounded-full bg-slate-900 text-white text-xs md:text-sm font-bold hover:bg-black hover:scale-105 transition-all shadow-xl cursor-pointer flex items-center gap-2"
                  onClick={() => setShowAboutScreen(true)}
                >
                  About ➔
                </button>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* BESPOKE ABOUT ME PAGE (Seamless Landing Page Atmosphere & Realistic Crown) */}
          {/* ===================================================================== */}
          {showAboutScreen && (
            <div className="fixed inset-0 z-50 overflow-y-auto text-slate-900 animate-in fade-in duration-300 pointer-events-auto">
              {/* Landing Page Background Layer */}
              <div
                className="fixed inset-0 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url('/assets/dreamscape_bg.jpg')` }}
              />
              {/* Soft Frosted Veil for Clear Reading Contrast & Continuity */}
              <div className="fixed inset-0 pointer-events-none bg-white/85 backdrop-blur-md" />

              {/* Main Content Foreground Wrapper */}
              <div className="relative z-10 min-h-screen flex flex-col justify-between">
                {/* Inner Content Container (Full Width Edge-to-Edge: Pojok Kiri & Pojok Kanan) */}
                <div className="w-full px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 pt-8 pb-4">
                  {/* Header: Clean & Minimal Navigation */}
                <header className="flex items-center justify-between pb-6 border-b border-slate-300/60 mb-8 md:mb-10 w-full">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-slate-900 uppercase">
                      ABOUT ME
                    </span>
                  </div>

                  <button
                    onClick={() => setShowAboutScreen(false)}
                    className="px-5 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>✕</span>
                    <span>Tutup</span>
                  </button>
                </header>

                {/* Main 2-Column Split: Bener-bener Pojok Kiri (Picture 1) & Bener-bener Pojok Kanan (Picture 2) */}
                <div id="about-hero" className="relative pt-2 pb-14 w-full">
                  <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 xl:gap-16 w-full">
                    
                    {/* POJOK KIRI: Picture 1 (Bio Narrative & Crown) - Pinned all the way to left edge */}
                    <div className="w-full lg:w-[46%] xl:w-[42%] 2xl:w-[38%] max-w-2xl relative">
                      <div className="relative z-10">
                        {/* Headline */}
                        <h1 className="serif-hero-title text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-950 font-serif leading-tight">
                          Arga Fabian Gibran
                        </h1>
                        <p className="font-mono text-xs md:text-sm uppercase tracking-wider text-emerald-800 font-bold mt-2 mb-6">
                          WEB DEVELOPER
                        </p>

                        {/* Narrative paragraphs */}
                        <div className="relative text-slate-800 text-base sm:text-lg lg:text-[1.1rem] leading-relaxed sm:leading-8 lg:leading-[1.85] space-y-4 sm:space-y-5 font-sans text-justify">
                          {/* Ambient Crown Backdrop Centered in Narrative */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                            <div className="opacity-20 md:opacity-25 floating-crown">
                              <img
                                src="/assets/crown_realistic.png"
                                alt="Realistic Royal Crown"
                                className="w-[240px] sm:w-[300px] md:w-[360px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                              />
                            </div>
                          </div>

                          <p className="relative z-10">
                            Halo! Saya <strong>Arga Fabian Gibran</strong>, seorang Web Developer yang saat ini menempuh pendidikan di <strong>SMKN 8 Jakarta</strong> (Kompetensi Keahlian Rekayasa Perangkat Lunak). Saya memiliki ketertarikan mendalam dan fokus keahlian di bidang <strong>Frontend Development</strong>.
                          </p>
                          <p className="relative z-10">
                            Bagi saya, frontend adalah seni menyatukan estetika visual dengan logika arsitektur kode yang rapi. Saya sangat antusias merancang dan membangun antarmuka web yang tidak hanya intuitif dan responsif di berbagai perangkat, tetapi juga terasa hidup melalui sentuhan interaksi dinamis (*creative micro-interactions*) serta performa kecepatan yang optimal.
                          </p>
                          <p className="relative z-10">
                            Dalam proses eksplorasi teknologi, saya aktif mengembangkan kemampuan pada ekosistem modern seperti <strong>HTML5, CSS3/TailwindCSS, JavaScript, TypeScript, React, dan Next.js</strong>. Selain itu, saya juga dibekali fondasi backend yang solid menggunakan <strong>PHP, Laravel, dan database MySQL</strong>, sehingga mampu memahami alur pengembangan web secara utuh dari pengolahan data hingga tampilan akhir ke pengguna.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* POJOK KANAN: Picture 2 (Stack & Tools) - Pinned all the way to right edge */}
                    <div className="w-full lg:w-[50%] xl:w-[54%] 2xl:w-[58%] flex flex-col items-start lg:items-end w-full relative pt-2 lg:pt-0">
                      <div className="w-full max-w-xl xl:max-w-2xl flex flex-col items-start">
                        {/* Section Title & Subtitle */}
                        <div className="mb-4">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-sans">
                            Stack & Tools
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                            Core technologies and engineering workflows.
                          </p>
                        </div>

                        {/* PICTURE 3: Horizontal Category Tabs ("pindahkan menjadi ke atas aja jangan kebawah urutannya, jadi kesamping") */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 w-full">
                          {STACK_TABS.map((tab) => {
                            const isActive = activeStackTab === tab.id;
                            const count =
                              tab.id === "all"
                                ? TECH_STACK_ITEMS.length
                                : TECH_STACK_ITEMS.filter((item) => item.category === tab.id).length;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveStackTab(tab.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap select-none ${
                                  isActive
                                    ? "bg-slate-950 text-white shadow-md scale-[1.02]"
                                    : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300 shadow-2xs"
                                }`}
                              >
                                <span className="text-sm">{tab.icon}</span>
                                <span>{tab.label}</span>
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                                    isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                                  }`}
                                >
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Orbit Radar Display (Below the horizontal tabs) */}
                        <div className="w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] relative flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full absolute inset-0 flex items-center justify-center scale-[0.65] sm:scale-[0.8] md:scale-[0.9] xl:scale-100">
                            {/* Orbit Rings Background (Subtle dashed celestial paths) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35">
                              <div className="absolute w-[260px] h-[260px] border border-slate-400/60 rounded-full border-dashed animate-[spin_40s_linear_infinite]" />
                              <div className="absolute w-[420px] h-[420px] border border-slate-400/60 rounded-full border-dashed animate-[spin_50s_linear_infinite_reverse]" />
                              <div className="absolute w-[580px] h-[580px] border border-slate-400/60 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
                            </div>

                            {/* Orbiting Items */}
                            <div className="relative w-full h-full flex items-center justify-center">
                              {TECH_STACK_ITEMS.map((item) => {
                                const isActive = activeStackTab === "all" || item.category === activeStackTab;
                                return (
                                  <div
                                    key={item.id}
                                    className={`absolute flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                                      isActive ? "opacity-100 z-30" : "opacity-10 grayscale z-10 scale-75"
                                    }`}
                                    style={{
                                      width: `${item.orbitRadius * 2}px`,
                                      height: `${item.orbitRadius * 2}px`,
                                      animation: `spin-orbit ${item.orbitSpeed}s linear infinite`,
                                    }}
                                  >
                                    <div
                                      style={{
                                        transform: `rotate(${item.orbitAngle}deg) translateY(-${item.orbitRadius}px)`,
                                        position: "absolute",
                                      }}
                                    >
                                      <div
                                        style={{
                                          animation: `counter-spin-orbit ${item.orbitSpeed}s linear infinite`,
                                        }}
                                      >
                                        <div
                                          style={{ transform: `rotate(-${item.orbitAngle}deg)` }}
                                          className="group relative cursor-pointer"
                                        >
                                          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center hover:scale-125 transition-all duration-300 relative group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                                            <div className="transition-transform duration-300 flex items-center justify-center">
                                              {item.logo}
                                            </div>
                                          </div>
                                          
                                          {/* Tooltip */}
                                          <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 bg-slate-950 text-white text-xs sm:text-sm px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xl font-bold pointer-events-none z-50">
                                            {item.name}
                                            <div className="text-[10px] text-slate-400 font-normal mt-0.5">{item.role}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ================================================================ */}
                {/* CELESTIAL CHARACTER LEVITATION & DUAL-PALM TECH STACK SHOWCASE */}
                {/* Matches VD REFERENSI 2.mp4: sleek levitating icon constellations over palms */}
                {/* Crisp HD resolution with perfectly proportioned height and natural alignment */}
                {/* ================================================================ */}
                <div id="character-stack-showcase" className="relative w-full -mt-[100px] sm:-mt-[150px] md:-mt-[200px] lg:-mt-[270px] xl:-mt-[310px] pt-2 pb-16 flex flex-col items-center justify-center select-none overflow-visible z-20">
                  {/* Ambient Halo & Soft Celestial Cloud Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-t from-sky-400/10 via-emerald-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                  {/* Main Interactive Stage with Character & Levitating Stack */}
                  <div className="relative flex items-center justify-center w-full max-w-5xl py-2">
                    
                    {/* Character & Anchored Dual-Palm Floating Clusters Wrapper */}
                    <div className="relative inline-block mx-auto">
                      
                      {/* LEFT PALM FLOATING TECH CLUSTER (Frontend & Mobile) */}
                      {/* Hovering directly above open left palm (x: 11.1%, y: 35.5%) */}
                      <div className="absolute left-[11.1%] top-[35.5%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
                        {/* Palm Energy Aura Glow directly on palm */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 h-20 sm:h-24 bg-sky-400/25 rounded-full blur-lg pointer-events-none animate-pulse" />

                        {/* Compact Levitating Constellation of 5 Tech Icons */}
                        <div className="relative w-24 h-24 sm:w-26 sm:h-26 md:w-28 md:h-28 flex items-center justify-center">
                          {/* 1. React.js (Top Center) */}
                          <div className="group absolute top-0 left-1/2 -translate-x-1/2 animate-[levitate1_3.2s_ease-in-out_infinite] z-20">
                            <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 md:w-9 md:h-9 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <FaReact size={20} className="text-[#00D8FF] group-hover:rotate-45 transition-transform" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              React.js
                            </span>
                          </div>

                          {/* 2. JavaScript (Upper Left) */}
                          <div className="group absolute top-2.5 left-0 animate-[levitate2_3.6s_ease-in-out_infinite_0.3s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <SiJavascript size={16} className="text-[#F7DF1E]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              JavaScript
                            </span>
                          </div>

                          {/* 3. HTML5 (Upper Right) */}
                          <div className="group absolute top-2.5 right-0 animate-[levitate3_4.0s_ease-in-out_infinite_0.6s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <FaHtml5 size={16} className="text-[#E34F26]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              HTML5
                            </span>
                          </div>

                          {/* 4. CSS3 (Lower Left) */}
                          <div className="group absolute bottom-0 left-1 animate-[levitate4_3.5s_ease-in-out_infinite_0.9s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <FaCss3Alt size={16} className="text-[#1572B6]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              CSS3
                            </span>
                          </div>

                          {/* 5. Android (Lower Right) */}
                          <div className="group absolute bottom-0 right-1 animate-[levitate5_3.8s_ease-in-out_infinite_1.2s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <FaAndroid size={16} className="text-[#3DDC84]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              Android
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CENTER CHARACTER (HD clean asset, crisp Retina proportion) */}
                      <div className="relative z-10 flex flex-col items-center">
                        {/* Soft celestial beam from above */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-60 md:w-68 h-72 bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-md pointer-events-none [clip-path:polygon(38%_0%,62%_0%,100%_100%,0%_100%)]" />

                        {/* Perfectly clean character image - Subtle gentle enlargement (+10% DIKIT AJA) */}
                        <img
                          src="/assets/character_arga_clean.png"
                          alt="Arga Fabian Gibran Character"
                          className="h-[400px] sm:h-[440px] md:h-[490px] lg:h-[530px] xl:h-[550px] w-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-[levitate_5s_ease-in-out_infinite]"
                        />

                        {/* Soft cloud mist shadow under white sneakers (intact, uncut shoes) */}
                        <div className="w-52 sm:w-64 md:w-72 h-5 bg-slate-400/20 rounded-full blur-md -mt-2 pointer-events-none" />
                      </div>

                      {/* RIGHT PALM FLOATING TECH CLUSTER (Backend, Database & Desktop) */}
                      {/* Hovering directly above open right palm (x: 88.8%, y: 35.5%) */}
                      <div className="absolute left-[88.8%] top-[35.5%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
                        {/* Palm Energy Aura Glow directly on palm */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 h-20 sm:h-24 bg-purple-400/25 rounded-full blur-lg pointer-events-none animate-pulse" />

                        {/* Compact Levitating Constellation of 5 Tech Icons */}
                        <div className="relative w-24 h-24 sm:w-26 sm:h-26 md:w-28 md:h-28 flex items-center justify-center">
                          {/* 1. Python (Top Center) */}
                          <div className="group absolute top-0 left-1/2 -translate-x-1/2 animate-[levitate1_3.3s_ease-in-out_infinite_0.2s] z-20">
                            <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 md:w-9 md:h-9 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <FaPython size={20} className="text-[#3776AB]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              Python
                            </span>
                          </div>

                          {/* 2. PHP (Upper Left) */}
                          <div className="group absolute top-2.5 left-0 animate-[levitate2_3.7s_ease-in-out_infinite_0.5s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <FaPhp size={18} className="text-[#777BB4]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              PHP
                            </span>
                          </div>

                          {/* 3. MySQL (Upper Right) */}
                          <div className="group absolute top-2.5 right-0 animate-[levitate3_3.9s_ease-in-out_infinite_0.8s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <SiMysql size={18} className="text-[#00758F]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              MySQL
                            </span>
                          </div>

                          {/* 4. PostgreSQL (Lower Left) */}
                          <div className="group absolute bottom-0 left-1 animate-[levitate4_3.6s_ease-in-out_infinite_1.1s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <SiPostgresql size={16} className="text-[#336791]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              PostgreSQL
                            </span>
                          </div>

                          {/* 5. C# (Lower Right) */}
                          <div className="group absolute bottom-0 right-1 animate-[levitate5_4.1s_ease-in-out_infinite_1.4s] z-10">
                            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full bg-white/95 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.1)] border border-slate-200/80 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 cursor-pointer">
                              <TbBrandCSharp size={16} className="text-[#9B4F96]" />
                            </div>
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-50 shadow-md">
                              C# / .NET
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* ================================================================ */}
                {/* SECTION 03: PROJECTS (Divider Line & Title Outside Card) */}
                {/* ================================================================ */}
                <div id="projects" className="pt-10 pb-20 border-t border-slate-300/70">
                  {/* Section Title (Outside Card, matching Stack & Tools) */}
                  <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans">
                        Projects
                      </h2>
                      <p className="text-sm md:text-base text-slate-500 font-sans mt-1.5">
                        Selected case studies and live deployments.
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span className="px-3 py-1 rounded-full border border-slate-300/80 bg-white/70 font-semibold text-slate-700 shadow-sm">
                        03
                      </span>
                      <span>PORTFOLIO SHOWCASE • 2025–2026</span>
                    </div>
                  </div>

                  {/* 3D Coverflow Showcase Card (Framed White Card) */}
                  <div className="relative pt-6 pb-12 px-5 sm:px-8 md:px-12 rounded-3xl bg-white/95 border-2 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden text-slate-900">
                    {/* Subtle Clean Ambient Highlights */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

                    {/* 3D Coverflow Carousel Container */}
                  <div
                    className="relative w-full py-4 sm:py-8 flex items-center justify-center select-none"
                    style={{ perspective: "1100px" }}
                  >
                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePrevProject}
                      aria-label="Previous project"
                      className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>

                    <button
                      onClick={handleNextProject}
                      aria-label="Next project"
                      className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>

                    {/* Cards Track */}
                    <div
                      className="relative w-full max-w-4xl h-[230px] sm:h-[290px] md:h-[350px] flex items-center justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {PROJECTS_DATA.map((proj, i) => {
                        const offset = getProjectOffset(i);
                        const isActive = offset === 0;

                        let transformStr = "";
                        let zIndexVal = 10;
                        let opacityVal = 0;
                        let filterVal = "";

                        if (offset === 0) {
                          transformStr = "translateX(0%) translateZ(60px) rotateY(0deg) scale(1.04)";
                          zIndexVal = 30;
                          opacityVal = 1;
                          filterVal = "drop-shadow(0 25px 40px rgba(15,23,42,0.25))";
                        } else if (offset === -1) {
                          transformStr = "translateX(-65%) translateZ(-35px) rotateY(38deg) scale(0.85)";
                          zIndexVal = 20;
                          opacityVal = 0.85;
                          filterVal = "brightness(0.92) drop-shadow(0 15px 25px rgba(15,23,42,0.15))";
                        } else if (offset === 1) {
                          transformStr = "translateX(65%) translateZ(-35px) rotateY(-38deg) scale(0.85)";
                          zIndexVal = 20;
                          opacityVal = 0.85;
                          filterVal = "brightness(0.92) drop-shadow(0 15px 25px rgba(15,23,42,0.15))";
                        } else {
                          const isRight = offset > 0;
                          transformStr = `translateX(${isRight ? "115%" : "-115%"}) translateZ(-90px) rotateY(${isRight ? "-50deg" : "50deg"}) scale(0.72)`;
                          zIndexVal = 10;
                          opacityVal = 0.45;
                          filterVal = "brightness(0.8) drop-shadow(0 10px 15px rgba(15,23,42,0.1))";
                        }

                        return (
                          <div
                            key={proj.id}
                            onClick={() => {
                              if (isActive) {
                                setSelectedProjectModal(proj);
                              } else {
                                setCurrentProjectIndex(i);
                              }
                            }}
                            className="absolute top-0 w-[260px] sm:w-[340px] md:w-[410px] aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-slate-300 bg-slate-900 transition-all duration-500 ease-out cursor-pointer group shadow-2xl"
                            style={{
                              transform: transformStr,
                              zIndex: zIndexVal,
                              opacity: opacityVal,
                              filter: filterVal,
                              transformOrigin: "center center",
                            }}
                          >
                            {/* Window Header Bar */}
                            <div className="h-6 sm:h-7 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-rose-500" />
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                              </div>
                              <span className="text-[9px] sm:text-[10px] font-mono text-slate-300 truncate max-w-[140px] sm:max-w-[180px]">
                                {proj.subtitle}
                              </span>
                              <div className="w-6" />
                            </div>

                            {/* Project Screenshot / Mockup */}
                            <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-28px)] overflow-hidden bg-slate-950 flex items-center justify-center">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="w-full h-full object-contain sm:object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              />
                              {isActive && (
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-b-2xl pointer-events-none" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dots Pagination Indicator */}
                  <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 mb-4">
                    {PROJECTS_DATA.map((_, dotIdx) => {
                      const isCurrent = dotIdx === currentProjectIndex;
                      return (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentProjectIndex(dotIdx)}
                          className={`transition-all duration-300 rounded-full cursor-pointer ${
                            isCurrent
                              ? "w-8 h-1.5 bg-slate-900 shadow-[0_0_8px_rgba(15,23,42,0.3)]"
                              : "w-2 h-1.5 bg-slate-300 hover:bg-slate-400"
                          }`}
                          aria-label={`Go to project ${dotIdx + 1}`}
                        />
                      );
                    })}
                  </div>

                  {/* Active Project Title & Metadata */}
                  <div className="text-center max-w-xl mx-auto px-4 mt-2 relative z-10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-950 font-sans transition-all duration-300">
                      {PROJECTS_DATA[currentProjectIndex].title}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono tracking-widest text-emerald-700 font-bold uppercase mt-1">
                      {PROJECTS_DATA[currentProjectIndex].category}
                    </div>

                    {/* Metadata 2-Column Table */}
                    <div className="grid grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-1.5 max-w-xs mx-auto text-xs sm:text-sm mt-6 font-mono text-left">
                      <span className="text-slate-500">Year</span>
                      <span className="text-slate-900 text-right font-semibold">{PROJECTS_DATA[currentProjectIndex].year}</span>
                      <span className="text-slate-500">Development</span>
                      <span className="text-slate-900 text-right font-semibold">{PROJECTS_DATA[currentProjectIndex].development}</span>
                    </div>

                    {/* Brief Narrative */}
                    <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed font-sans max-w-lg mx-auto">
                      {PROJECTS_DATA[currentProjectIndex].description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4">
                      {PROJECTS_DATA[currentProjectIndex].stack.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Quick Action Button */}
                    <div className="mt-5">
                      <button
                        onClick={() => setSelectedProjectModal(PROJECTS_DATA[currentProjectIndex])}
                        className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                      >
                        <span>Lihat Detail Project</span>
                        <span className="text-emerald-400">➔</span>
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
                </div>

                {/* ===================================================================== */}
                {/* SECTION 04: REALISTIC FULL-WIDTH ELYSIAN FOOTER (Harmonized with Picture 2) */}
                {/* ===================================================================== */}
                <footer className="w-full relative mt-20 text-white overflow-hidden">
                  {/* Natural Water Ripple Wave Top Divider (matching user's hand-drawn wave across 100% width) */}
                  <div className="w-full overflow-hidden leading-none pointer-events-none -mb-[1px]">
                    <svg
                      viewBox="0 0 1440 95"
                      preserveAspectRatio="none"
                      className="relative block w-full h-12 sm:h-16 md:h-20"
                    >
                      {/* Layer 1: Soft sunlight sky reflection on lake surface */}
                      <path
                        d="M 0,36 C 200,12 400,62 640,32 C 880,8 1080,54 1260,34 C 1360,22 1410,42 1440,36 L 1440,95 L 0,95 Z"
                        fill="rgba(168, 200, 213, 0.35)"
                      />
                      {/* Layer 2: Natural mid-depth lake water reflection */}
                      <path
                        d="M 0,46 C 220,20 440,70 680,38 C 920,14 1120,60 1290,40 C 1370,30 1420,48 1440,44 L 1440,95 L 0,95 Z"
                        fill="rgba(58, 97, 114, 0.65)"
                      />
                      {/* Layer 3: Solid deep lake water base seamlessly connecting into the footer */}
                      <path
                        d="M 0,55 C 240,28 460,78 700,45 C 940,20 1140,66 1310,46 C 1380,36 1420,54 1440,50 L 1440,95 L 0,95 Z"
                        fill="#142c38"
                      />
                      {/* Delicate natural water shimmer crest - soft daylight reflection, not artificial neon */}
                      <path
                        d="M 0,55 C 240,28 460,78 700,45 C 940,20 1140,66 1310,46 C 1380,36 1420,54 1440,50"
                        fill="none"
                        stroke="rgba(235, 246, 250, 0.55)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  {/* Main Footer Body with Real Classical Elysian Backdrop & Deep Lake Water Tint */}
                  <div className="relative w-full overflow-hidden bg-[#142c38] shadow-[0_-20px_50px_rgba(8,18,24,0.4)]">
                    {/* Real Painting Texture Layer from Picture 2 (dreamscape_bg.jpg) */}
                    <div
                      className="absolute inset-0 bg-cover bg-bottom pointer-events-none opacity-30 mix-blend-luminosity"
                      style={{ backgroundImage: `url('/assets/dreamscape_bg.jpg')` }}
                    />

                    {/* Natural Serene Lake Shading (Deep Prussian & Teal Lake Depth) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#142c38]/92 via-[#0f232d]/95 to-[#09161c]/98 pointer-events-none" />

                    {/* Gentle Daylight Filter from the sunlit sky above */}
                    <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#a8c8d5]/15 to-transparent pointer-events-none" />

                    {/* Content Container (Centered & aligned with max-w-6xl grid) */}
                    <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-6 pb-12">
                      {/* Header Row: Identity & School */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6">
                        <div>
                          {/* Natural Frosted Pearl Status Capsule */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3846]/80 border border-[#4d798c]/40 shadow-sm mb-2.5">
                            <span className="w-2 h-2 rounded-full bg-[#a8dbe8] shadow-[0_0_6px_rgba(168,219,232,0.8)]" />
                            <span className="text-[10px] font-mono tracking-widest text-[#d2ebf3] uppercase font-semibold">
                              Get In Touch • Open for Opportunities
                            </span>
                          </div>

                          {/* Name in Classical Warm Ivory White */}
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#f5f9fb] font-sans uppercase drop-shadow-sm">
                            Arga Fabian Gibran
                          </h3>

                          {/* Subtitle in Natural Lake Mist */}
                          <p className="text-xs sm:text-sm text-[#b2d1dd] font-sans mt-1">
                            Web Developer & Frontend Specialist • South Jakarta, Indonesia
                          </p>
                        </div>

                        {/* School Badge with Warm Classical Travertine Finish */}
                        <div className="sm:text-right flex sm:flex-col items-start sm:items-end gap-1.5">
                          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b3846]/90 border border-[#5d8a9d]/50 text-[#e8f4f8] text-[11px] font-mono font-medium shadow-sm">
                            <span>🏛️</span> SMKN 8 Jakarta
                          </span>
                          <span className="text-[11px] text-[#8faec0] font-mono">Rekayasa Perangkat Lunak (RPL)</span>
                        </div>
                      </div>

                      {/* Divider Line: Soft Natural Daylight Ripple */}
                      <div className="w-full h-[1px] bg-gradient-to-r from-[#6e9cb0]/60 via-[#d3e9f2]/30 to-transparent my-4" />

                      {/* Bottom Row: Clickable Social Icons & Copyright */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-2">
                        {/* Social Links Group: Frosted Sea-Glass Stones */}
                        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                          {/* GitHub */}
                          <a
                            href="https://github.com/argafgb"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub: argafgb"
                            className="group w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/40 flex items-center justify-center text-[#e8f4f8] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
                            aria-label="GitHub: argafgb"
                          >
                            <FaGithub size={19} className="transition-transform group-hover:scale-110" />
                          </a>

                          {/* Instagram */}
                          <a
                            href="https://instagram.com/argafgbrn"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram: @argafgbrn"
                            className="group w-10 h-10 rounded-xl bg-white/10 hover:bg-[#d89cb2]/25 border border-white/15 hover:border-[#d89cb2]/50 flex items-center justify-center text-[#e8f4f8] hover:text-[#f8dce5] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
                            aria-label="Instagram: @argafgbrn"
                          >
                            <FaInstagram size={19} className="transition-transform group-hover:scale-110" />
                          </a>

                          {/* TikTok */}
                          <a
                            href="https://www.tiktok.com/@argafg"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="TikTok: @argafg"
                            className="group w-10 h-10 rounded-xl bg-white/10 hover:bg-[#8ec2d6]/25 border border-white/15 hover:border-[#8ec2d6]/50 flex items-center justify-center text-[#e8f4f8] hover:text-[#e0f3f9] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
                            aria-label="TikTok: @argafg"
                          >
                            <FaTiktok size={18} className="transition-transform group-hover:scale-110" />
                          </a>

                          {/* WhatsApp */}
                          <a
                            href="https://wa.me/6289509762380"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp: 089509762380"
                            className="group w-10 h-10 rounded-xl bg-white/10 hover:bg-[#689886]/30 border border-white/15 hover:border-[#7cae9c]/50 flex items-center justify-center text-[#e8f4f8] hover:text-[#daf0e7] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
                            aria-label="WhatsApp: 089509762380"
                          >
                            <FaWhatsapp size={19} className="transition-transform group-hover:scale-110" />
                          </a>

                          {/* Email */}
                          <a
                            href="mailto:28argafabian@gmail.com"
                            title="Email: 28argafabian@gmail.com"
                            className="group w-10 h-10 rounded-xl bg-white/10 hover:bg-[#d8c49e]/25 border border-white/15 hover:border-[#d8c49e]/50 flex items-center justify-center text-[#e8f4f8] hover:text-[#f8f0dc] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm backdrop-blur-md"
                            aria-label="Email: 28argafabian@gmail.com"
                          >
                            <FaEnvelope size={18} className="transition-transform group-hover:scale-110" />
                          </a>
                        </div>

                        {/* Right info */}
                        <div className="text-center sm:text-right text-[11px] font-mono text-[#8faec0]">
                          <div>Designed & Engineered with Elysian Classical Aesthetics</div>
                          <div className="text-[#6c8b9d] mt-0.5">© 2026 Arga Fabian Gibran. All rights reserved.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* HOBBY SHOWCASE MODAL (Shorts Video on Left, Action Photo on Right) */}
          {/* ===================================================================== */}
          {showHobbyModal && (
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-8 animate-in fade-in duration-300 pointer-events-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowHobbyModal(false);
              }}
            >
              <div className="relative w-full max-w-3xl bg-slate-950 text-white rounded-3xl border border-white/15 p-5 md:p-6 shadow-2xl flex flex-col overflow-hidden">
                {/* Ambient Subtle Glow */}
                <div className="absolute -top-28 -left-28 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-28 -right-28 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Modal Header: Clean without extra subtitles */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏀</span>
                    <h3 className="text-base md:text-lg font-bold tracking-tight text-white font-sans">
                      Hobi • Basketball
                    </h3>
                  </div>

                  <button
                    onClick={() => setShowHobbyModal(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-all cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* 2-Column Content: Instagram Reel (Left) & Pure Clean Photo (Right) */}
                <div className="relative z-10 flex flex-col md:flex-row gap-5 md:gap-7 items-center justify-center my-auto">
                  {/* Left Column: Authentic Instagram Reels Player */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-[260px] sm:w-[275px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20 relative bg-black flex items-center justify-center group select-none cursor-pointer"
                      onClick={toggleVideoPlay}
                      onDoubleClick={handleVideoDoubleClick}
                    >
                      <video
                        ref={basketVideoRef}
                        src="/assets/vd_basket.mp4"
                        autoPlay
                        loop
                        muted={isVideoMuted}
                        playsInline
                        preload="auto"
                        onTimeUpdate={handleVideoTimeUpdate}
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        className="w-full h-full object-cover"
                      />

                      {/* Instagram Double Tap Heart Burst Animation */}
                      {showHeartAnim && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-in zoom-in-50 fade-in duration-200">
                          <svg className="w-20 h-20 fill-rose-500 stroke-white drop-shadow-[0_10px_30px_rgba(244,63,94,0.8)]" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </div>
                      )}

                      {/* Instagram Reels Top Header */}
                      <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-20 pointer-events-none">
                        <div className="flex items-center gap-1 drop-shadow-md">
                          <span className="font-sans font-bold text-sm tracking-tight text-white">Reels</span>
                          <span className="text-[10px] text-white/80">˅</span>
                        </div>

                        {/* Sound Toggle Button (Instagram Style) */}
                        <button
                          onClick={toggleVideoMute}
                          className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xs hover:bg-black/80 cursor-pointer pointer-events-auto transition-transform active:scale-95 shadow-md"
                          title={isVideoMuted ? "Aktifkan suara" : "Matikan suara"}
                        >
                          {isVideoMuted ? (
                            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Instagram Play / Pause Central Indicator */}
                      {!isVideoPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1.5px] z-20 pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-black/50 border border-white/40 flex items-center justify-center text-white text-lg shadow-xl pl-0.5">
                            ▶
                          </div>
                        </div>
                      )}

                      {/* Instagram Reels Right Sidebar Actions */}
                      <div
                        className="absolute bottom-16 right-2 flex flex-col items-center gap-3 z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Like Button */}
                        <button
                          onClick={handleLike}
                          className="flex flex-col items-center cursor-pointer transition-transform active:scale-125 group/btn"
                        >
                          <svg className={`w-6 h-6 drop-shadow-md transition-colors ${
                            isLiked ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-white"
                          }`} viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                          <span className="text-[10px] font-sans font-semibold text-white mt-0.5 drop-shadow-md">
                            {likesCount >= 1000 ? `${(likesCount / 1000).toFixed(1)}k` : likesCount}
                          </span>
                        </button>

                        {/* Comment Button */}
                        <div className="flex flex-col items-center cursor-pointer group/btn">
                          <svg className="w-6 h-6 fill-none stroke-white drop-shadow-md" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-[10px] font-sans font-semibold text-white mt-0.5 drop-shadow-md">
                            {commentsCount}
                          </span>
                        </div>

                        {/* Share / Direct Button */}
                        <div className="flex flex-col items-center cursor-pointer group/btn">
                          <svg className="w-5 h-5 fill-none stroke-white drop-shadow-md" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                          <span className="text-[10px] font-sans font-semibold text-white mt-0.5 drop-shadow-md">
                            {sharesCount}
                          </span>
                        </div>

                        {/* More Options */}
                        <div className="cursor-pointer">
                          <svg className="w-4 h-4 fill-white drop-shadow-md" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="1.8" />
                            <circle cx="6" cy="12" r="1.8" />
                            <circle cx="18" cy="12" r="1.8" />
                          </svg>
                        </div>

                        {/* Spinning Audio Album Disc */}
                        <div className="w-6 h-6 rounded-full border border-white/60 bg-black overflow-hidden flex items-center justify-center animate-spin" style={{ animationDuration: "5s" }}>
                          <img src="/assets/basket_photo.jpg" alt="" className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Instagram Reels Bottom Left Info Overlay */}
                      <div className="absolute bottom-2.5 inset-x-0 px-3 pb-1 pt-6 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none">
                        {/* Profile Row: Avatar, Username, Follow button */}
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full p-[1px] bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 flex items-center justify-center">
                            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                              <img src="/assets/basket_photo.jpg" alt="argafgbrn" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <span className="font-sans font-bold text-xs text-white drop-shadow-md tracking-tight">
                            argafgbrn
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFollowing((prev) => !prev);
                            }}
                            className={`pointer-events-auto text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                              isFollowing
                                ? "bg-white/20 text-white/90"
                                : "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                            }`}
                          >
                            {isFollowing ? "Mengikuti" : "Ikuti"}
                          </button>
                        </div>


                        {/* Music Audio Ticker */}
                        <div className="flex items-center gap-1 mt-1 text-[9px] text-white/85 font-sans drop-shadow-md">
                          <svg className="w-2.5 h-2.5 fill-white shrink-0" viewBox="0 0 24 24">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                          </svg>
                          <span className="truncate">argafgbrn • Audio asli</span>
                        </div>
                      </div>

                      {/* Instagram Reels Progress Bar */}
                      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/25 z-20">
                        <div
                          className="h-full bg-white transition-all duration-100"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pure Clean Basketball Photo (No cluttered text or badges) */}
                  <div className="flex flex-col items-center">
                    <div className="w-[260px] sm:w-[275px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20 relative bg-slate-900 group">
                      <img
                        src="/assets/basket_photo.jpg"
                        alt="Arga Playing Basketball"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* PROJECT DETAIL MODAL */}
          {/* ===================================================================== */}
          {selectedProjectModal && (
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200 pointer-events-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProjectModal(null);
              }}
            >
              <div className="relative w-full max-w-2xl bg-slate-950 text-white rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                      {selectedProjectModal.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                      {selectedProjectModal.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProjectModal(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-all cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Content scrollable */}
                <div className="overflow-y-auto pr-1 space-y-5">
                  {/* Screenshot */}
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-slate-900/90 shadow-lg flex items-center justify-center p-1">
                    <img
                      src={selectedProjectModal.image}
                      alt={selectedProjectModal.title}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Year</span>
                      <p className="text-sm font-bold text-white mt-0.5">{selectedProjectModal.year}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Development</span>
                      <p className="text-sm font-bold text-white mt-0.5">{selectedProjectModal.development}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Role</span>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5">{selectedProjectModal.role}</p>
                    </div>
                  </div>

                  {/* Key Highlights / Stats */}
                  {selectedProjectModal.stats && selectedProjectModal.stats.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProjectModal.stats.map((stat, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-400 uppercase">{stat.label}</span>
                          <span className="text-xs font-bold text-white font-mono">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase mb-1.5">Tentang Project</h4>
                    <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
                      {selectedProjectModal.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectModal.stack.map((st) => (
                        <span key={st} className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Showcase Badge */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
                    <span className="text-base">✨</span>
                    <p className="leading-relaxed">
                      Projek asli portofolio <strong>Arga Fabian Gibran</strong>, menggabungkan penguasaan desktop C# .NET (CRUD & algoritma looping) serta rekayasa web interaktif modern (TypeScript & HTML5/CSS3).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* FULL PORTFOLIO DETAILS MODAL */}
          {/* ===================================================================== */}
          {showPortfolioModal && (
            <div className="modal-container fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300 pointer-events-auto">
              <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/80 overflow-hidden">
                <button
                  onClick={() => setShowPortfolioModal(false)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>

                <div className="mb-6">
                  <span className="text-xs font-mono tracking-widest text-emerald-700 font-bold uppercase bg-emerald-50 px-3 py-1 rounded-full">
                    SMKN 8 JAKARTA
                  </span>
                  <h2 className="serif-hero-title text-4xl md:text-5xl font-bold font-serif mt-3 text-slate-900">
                    ARGA FABIAN GIBRAN
                  </h2>
                  <p className="text-slate-600 text-base mt-1 font-medium">
                    Web Developer • Backend Specialist • Basketball Enthusiast
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 font-mono">CORE STACK</span>
                    <p className="font-bold text-slate-800 mt-1">PHP • Laravel • MySQL</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 font-mono">FRONTEND</span>
                    <p className="font-bold text-slate-800 mt-1">TypeScript • Next.js • Tailwind</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="info-pill !text-xs !py-1.5 !px-3.5 !border-slate-800">
                    REST APIs
                  </span>
                  <span className="info-pill !text-xs !py-1.5 !px-3.5 !border-slate-800">
                    Database Architecture
                  </span>
                  <span className="info-pill !text-xs !py-1.5 !px-3.5 !border-slate-800">
                    3D Interactive Canvas
                  </span>
                  <span className="info-pill !text-xs !py-1.5 !px-3.5 !border-slate-800">
                    Performance Optimization
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setShowPortfolioModal(false);
                      setPhase(1);
                      cracksRef.current = [];
                      targetProgress.current = 0;
                      currentProgress.current = 0;
                      setHasConnected(false);
                      setIsHoldingState(false);
                      isHoldingRef.current = false;
                    }}
                    className="flex-1 py-3.5 rounded-full bg-slate-900 text-white font-semibold hover:bg-black transition-colors cursor-pointer text-sm shadow-md"
                  >
                    Replay Animation ↺
                  </button>
                  <button
                    onClick={() => setShowPortfolioModal(false)}
                    className="px-6 py-3.5 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
