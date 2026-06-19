function StadiumBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050a08]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <radialGradient id="flood1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8f4ff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#bcd9f0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#bcd9f0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flood2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eaf6ff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#a8cfe8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a8cfe8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="playerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dceeff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#dceeff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#02060a" />
            <stop offset="55%" stopColor="#040d10" />
            <stop offset="100%" stopColor="#06150f" />
          </linearGradient>
          <linearGradient id="pitch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d2418" />
            <stop offset="50%" stopColor="#081c12" />
            <stop offset="100%" stopColor="#03110a" />
          </linearGradient>
          <linearGradient id="beam1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dceeff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#dceeff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1200" height="700" fill="url(#sky)" />
        <rect x="0" y="430" width="1200" height="270" fill="url(#pitch)" />

        <g opacity="0.5">
          <line x1="0" y1="460" x2="1200" y2="460" stroke="#0f3322" strokeWidth="1" />
          <line x1="0" y1="500" x2="1200" y2="500" stroke="#0a2818" strokeWidth="1" />
          <line x1="0" y1="550" x2="1200" y2="550" stroke="#0a2818" strokeWidth="1" />
          <line x1="0" y1="610" x2="1200" y2="610" stroke="#06200f" strokeWidth="1" />
          <line x1="0" y1="680" x2="1200" y2="680" stroke="#04160c" strokeWidth="1" />
        </g>

        <g opacity="0.06">
          <rect x="0" y="430" width="150" height="270" fill="#5fae7a" />
          <rect x="300" y="430" width="150" height="270" fill="#5fae7a" />
          <rect x="600" y="430" width="150" height="270" fill="#5fae7a" />
          <rect x="900" y="430" width="150" height="270" fill="#5fae7a" />
        </g>

        <ellipse cx="600" cy="640" rx="260" ry="22" fill="none" stroke="#16442c" strokeWidth="1.5" opacity="0.6" />
        <line x1="600" y1="430" x2="600" y2="700" stroke="#16442c" strokeWidth="1.5" opacity="0.5" />

        <polygon points="115,40 95,420 230,420 175,40" fill="url(#beam1)" />
        <polygon points="1085,40 1105,420 970,420 1025,40" fill="url(#beam1)" />

        <g>
          <rect x="105" y="380" width="6" height="60" fill="#020503" />
          <rect x="95" y="365" width="26" height="20" rx="2" fill="#0a0a0a" />
          <circle cx="108" cy="375" r="22" fill="url(#flood1)" />
          <circle cx="108" cy="375" r="6" fill="#f4faff" />
        </g>
        <g>
          <rect x="1089" y="380" width="6" height="60" fill="#020503" />
          <rect x="1079" y="365" width="26" height="20" rx="2" fill="#0a0a0a" />
          <circle cx="1092" cy="375" r="22" fill="url(#flood2)" />
          <circle cx="1092" cy="375" r="6" fill="#f4faff" />
        </g>

        <ellipse cx="108" cy="440" rx="70" ry="14" fill="#dceeff" opacity="0.06" />
        <ellipse cx="1092" cy="440" rx="70" ry="14" fill="#dceeff" opacity="0.05" />

        <ellipse cx="600" cy="450" rx="220" ry="160" fill="url(#playerGlow)" />

        <ellipse cx="598" cy="608" rx="34" ry="9" fill="#000000" opacity="0.45" />

        <g strokeLinecap="round" fill="none">
          <circle cx="592" cy="430" r="16" fill="#161616" />
          <path d="M592 446 L588 480 L584 520" stroke="#1a1a1a" strokeWidth="13" />
          <path d="M588 480 L612 470 L630 450" stroke="#1d1d1d" strokeWidth="12" />
          <path d="M588 480 L566 492 L548 486" stroke="#1d1d1d" strokeWidth="12" />
          <path d="M584 520 L568 555 L556 588" stroke="#1a1a1a" strokeWidth="14" />
          <path d="M584 520 L606 548 L598 590" stroke="#1a1a1a" strokeWidth="14" />
          <ellipse cx="551" cy="592" rx="13" ry="7" fill="#101010" />
          <ellipse cx="600" cy="596" rx="13" ry="7" fill="#101010" />
        </g>

        <circle cx="540" cy="600" r="11" fill="#d8d4c4" opacity="0.92" />
        <path d="M533 597 L547 597 M536 593 L536 607 M544 593 L544 607" stroke="#3a3830" strokeWidth="1" opacity="0.5" />

        <ellipse cx="600" cy="0" rx="600" ry="380" fill="#bcd9f0" opacity="0.03" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/65" />
    </div>
  );
}

export default StadiumBackground;