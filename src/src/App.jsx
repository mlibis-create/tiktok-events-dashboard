import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 1, name: "CES Sphere Experience", short: "CES", date: "Jan 7", city: "Las Vegas",
    daysAgo: 51, contacts: 12, followedUp: 11, mtgBooked: 4, oppsOpen: 3, cost: 28000,
    owner: "Sophia",
    contacts_list: [
      { name: "Bryan Mitchell",  co: "Diageo",              rep: "Reza",   status: "Opp Open",    days: 0,  opp: "$60K" },
      { name: "Sarah Chen",      co: "Unilever CA",         rep: "Ashley", status: "Opp Open",    days: 0,  opp: "$80K" },
      { name: "Marcus Obi",      co: "Kraft Heinz",         rep: "Mike",   status: "Mtg Booked",  days: 0,  opp: null   },
      { name: "Jennifer Park",   co: "P&G",                 rep: "Mike",   status: "Dead",        days: 51, opp: null   },
      { name: "David Reyes",     co: "Molson Coors",        rep: "Ashley", status: "Followed Up", days: 0,  opp: null   },
      { name: "Priya Nair",      co: "Nestlé",              rep: "Reza",   status: "Opp Open",    days: 0,  opp: "$40K" },
      { name: "Tom Caulfield",   co: "AB InBev",            rep: "Millie", status: "Mtg Booked",  days: 0,  opp: null   },
      { name: "Anna Wu",         co: "Colgate-Palmolive",   rep: "Ashley", status: "Followed Up", days: 0,  opp: null   },
      { name: "Raj Patel",       co: "Unilever US",         rep: "Reza",   status: "Mtg Booked",  days: 0,  opp: null   },
      { name: "Camille Girard",  co: "L'Oréal",             rep: "Millie", status: "Followed Up", days: 0,  opp: null   },
      { name: "Derek Stone",     co: "Kimberly-Clark",      rep: "Mike",   status: "Followed Up", days: 0,  opp: null   },
      { name: "Yuki Tanaka",     co: "Suntory NA",          rep: "Reza",   status: "Opp Open",    days: 0,  opp: null   },  // wait, Reza has Suntory — good
    ],
  },
  {
    id: 2, name: "TikTok Alcohol Summit", short: "Alcohol", date: "Jan 22", city: "New York",
    daysAgo: 36, contacts: 18, followedUp: 14, mtgBooked: 6, oppsOpen: 5, cost: 15000,
    owner: "Alex",
    contacts_list: [
      { name: "Tom Bradley",     co: "Brown-Forman",        rep: "Alex",   status: "Opp Open",    days: 0,  opp: "$75K" },
      { name: "Lisa Nguyen",     co: "Pernod Ricard",       rep: "Millie", status: "Opp Open",    days: 0,  opp: "$55K" },
      { name: "Carlos Mendez",   co: "Bacardi",             rep: "Alex",   status: "Mtg Booked",  days: 0,  opp: null   },
      { name: "Rachel Kim",      co: "Constellation",       rep: "Millie", status: "Followed Up", days: 0,  opp: null   },
      { name: "James Harper",    co: "Heineken",            rep: "Alex",   status: "Dead",        days: 36, opp: null   },
      { name: "Yuki Takeda",     co: "Suntory",             rep: "Millie", status: "Opp Open",    days: 0,  opp: "$90K" },
      { name: "Dana Park",       co: "Moët Hennessy",       rep: "Alex",   status: "Mtg Booked",  days: 0,  opp: null   },
      { name: "Chris Farrow",    co: "Campari Group",       rep: "Mike",   status: "Dead",        days: 36, opp: null   },
      { name: "Simone Bauer",    co: "Beam Suntory",        rep: "Millie", status: "Followed Up", days: 0,  opp: null   },
      { name: "Nathan Cole",     co: "William Grant",       rep: "Alex",   status: "Opp Open",    days: 0,  opp: "$35K" },
      { name: "Amy Voss",        co: "Treasury Wine",       rep: "Ashley", status: "Followed Up", days: 0,  opp: null   },
      { name: "Kevin Park",      co: "E&J Gallo",           rep: "Ashley", status: "Followed Up", days: 0,  opp: null   },
      { name: "Priya Mehta",     co: "Diageo NA",           rep: "Reza",   status: "Mtg Booked",  days: 0,  opp: null   },
      { name: "Luis Ruiz",       co: "Bacardi Canada",      rep: "Reza",   status: "Followed Up", days: 0,  opp: null   },
      { name: "Nadia Osei",      co: "Molson Coors",        rep: "Millie", status: "Opp Open",    days: 0,  opp: "$40K" }, // 15
      { name: "Ben Ashford",     co: "Pabst",               rep: "Mike",   status: "Followed Up", days: 0,  opp: null   },
      { name: "Tara Simmons",    co: "Lagunitas",           rep: "Mike",   status: "Dead",        days: 21, opp: null   },
      { name: "Elsa Dupont",     co: "Rémy Cointreau",      rep: "Ashley", status: "Followed Up", days: 0,  opp: null   },
    ],
  },
  {
    id: 3, name: "NewFronts Shopping Exp.", short: "NewFronts", date: "Mar 25", city: "New York",
    daysAgo: null, contacts: 30, followedUp: null, mtgBooked: null, oppsOpen: null, cost: 22000,
    owner: "Danielle",
    contacts_list: [],
  },
];

const REPS = [
  { name: "Ashley Jones", events: 3, contacts: 7,  followedUp: 7,  mtgBooked: 2, oppsOpen: 1, dead: 0 },
  { name: "Reza Ahmadi",  events: 3, contacts: 7,  followedUp: 7,  mtgBooked: 2, oppsOpen: 3, dead: 0 },
  { name: "Alex M.",      events: 2, contacts: 5,  followedUp: 4,  mtgBooked: 2, oppsOpen: 2, dead: 1 },
  { name: "Millie K.",    events: 3, contacts: 8,  followedUp: 8,  mtgBooked: 3, oppsOpen: 3, dead: 0 },
  { name: "Mike Torres",  events: 3, contacts: 6,  followedUp: 4,  mtgBooked: 1, oppsOpen: 1, dead: 2 },
];

// All contacts with no activity > 14 days
const DEAD = [
  { name: "Jennifer Park",  co: "P&G",           rep: "Mike",  event: "CES",         days: 51 },
  { name: "James Harper",   co: "Heineken",       rep: "Alex",  event: "Alcohol",     days: 36 },
  { name: "Chris Farrow",   co: "Campari Group",  rep: "Mike",  event: "Alcohol",     days: 36 },
  { name: "Tara Simmons",   co: "Lagunitas",      rep: "Mike",  event: "Alcohol",     days: 21 },
];

// ── Status config ─────────────────────────────────────────────────────────────
const S = {
  "Opp Open":    { label: "Opp Open",    bg: "#DCFCE7", text: "#15803D", dot: "#16A34A" },
  "Mtg Booked":  { label: "Mtg Booked",  bg: "#FEF9C3", text: "#854D0E", dot: "#CA8A04" },
  "Followed Up": { label: "Followed Up", bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  "Dead":        { label: "No Activity", bg: "#FEE2E2", text: "#B91C1C", dot: "#EF4444" },
};

const pct = (a, b) => b ? Math.round((a / b) * 100) : 0;
const fmt = (n) => n >= 1000 ? `$${Math.round(n/1000)}K` : `$${n}`;

// ── Micro components ──────────────────────────────────────────────────────────
const Bar = ({ value, color = "#3B82F6", height = 4 }) => (
  <div style={{ width: "100%", height, background: "#E5E7EB", borderRadius: 999, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(value, 100)}%`, height: "100%", background: color, borderRadius: 999, transition: "width 0.4s ease" }} />
  </div>
);

const Badge = ({ status }) => {
  const cfg = S[status] || S["Followed Up"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: cfg.text, background: cfg.bg, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
      {cfg.label}
    </span>
  );
};

const RepInitial = ({ name, size = 28 }) => {
  const colors = ["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#06B6D4"];
  const i = name.charCodeAt(0) % colors.length;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: colors[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.4, fontWeight: 700, color: "#fff", flexShrink: 0, fontFamily: "inherit" }}>
      {name[0]}
    </div>
  );
};

const Stat = ({ label, value, sub, accent = "#111827" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <span style={{ fontSize: 22, fontWeight: 800, color: accent, letterSpacing: "-0.5px", fontFamily: "'Syne', sans-serif" }}>{value}</span>
    <span style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.6px" }}>{label}</span>
    {sub && <span style={{ fontSize: 10, color: "#9CA3AF" }}>{sub}</span>}
  </div>
);

// ── Slack DM Preview ──────────────────────────────────────────────────────────
const SlackPreview = ({ rep, contacts }) => {
  const [sent, setSent] = useState({});
  const dead = contacts.filter(c => c.status === "Dead");
  const pending = contacts.filter(c => c.status !== "Dead" && c.status !== "Opp Open");

  return (
    <div style={{ background: "#1A1D21", borderRadius: 12, overflow: "hidden", border: "1px solid #2D3139", fontFamily: "monospace" }}>
      {/* Slack chrome */}
      <div style={{ padding: "10px 16px", background: "#19171D", borderBottom: "1px solid #2D3139", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#611f69" }} />
        <span style={{ fontSize: 12, color: "#ABABAD", fontWeight: 600 }}>Slack — Direct Message</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#4A4D52" }}>Events Bot → @{rep.name.split(" ")[0].toLowerCase()}</span>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* Bot message */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#4A154B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>⚡</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>Events Bot</span>
              <span style={{ fontSize: 11, color: "#4A4D52" }}>Mon 8:00 AM</span>
            </div>

            <div style={{ fontSize: 13, color: "#D1D2D3", lineHeight: 1.6, marginBottom: 10 }}>
              👋 Hey <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{rep.name.split(" ")[0]}</span> — weekly event contact check-in.
            </div>

            {dead.length > 0 && (
              <div style={{ background: "#2C1317", border: "1px solid #522", borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#F87171", marginBottom: 8 }}>
                  🔴 No activity logged ({dead.length} contact{dead.length > 1 ? "s" : ""})
                </div>
                {dead.map((c, i) => (
                  <div key={i} style={{ marginBottom: i < dead.length - 1 ? 10 : 0 }}>
                    <div style={{ fontSize: 12, color: "#E5E7EB", marginBottom: 6 }}>
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                      <span style={{ color: "#9CA3AF" }}> · {c.co} · {c.days} days since event</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {["✅ Followed Up", "📅 Mtg Booked", "🔥 Opp Created", "⏭ Snooze 3 days"].map(btn => (
                        <button key={btn} onClick={() => setSent(s => ({ ...s, [`${c.name}-${btn}`]: true }))}
                          style={{ fontSize: 11, padding: "4px 10px", borderRadius: 5, border: sent[`${c.name}-${btn}`] ? "1px solid #22C55E" : "1px solid #374151", background: sent[`${c.name}-${btn}`] ? "#052E16" : "#2D3139", color: sent[`${c.name}-${btn}`] ? "#22C55E" : "#D1D2D3", cursor: "pointer", fontWeight: 600, transition: "all 0.15s" }}>
                          {sent[`${c.name}-${btn}`] ? "✓ Logged" : btn}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pending.length > 0 && (
              <div style={{ background: "#1C2333", border: "1px solid #2D3D5C", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", marginBottom: 6 }}>
                  🔵 In progress ({pending.length})
                </div>
                {pending.slice(0,3).map((c, i) => (
                  <div key={i} style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 3 }}>
                    {c.name} <span style={{ color: "#4B5563" }}>·</span> {c.co} <span style={{ color: "#4B5563" }}>·</span> <span style={{ color: S[c.status]?.text || "#60A5FA" }}>{c.status}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ fontSize: 12, color: "#4A4D52", marginTop: 10 }}>
              🔗 <span style={{ color: "#1D9BD1", cursor: "pointer" }}>View full contact list in Salesforce →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [view, setView] = useState("scorecard"); // scorecard | heatmap | dead | slack
  const [drillEvent, setDrillEvent] = useState(null);
  const [drillRep, setDrillRep] = useState(null);
  const [slackRep, setSlackRep] = useState(REPS[4]); // default Mike (most issues)
  const [actionDone, setActionDone] = useState({});

  const event = drillEvent ? EVENTS.find(e => e.id === drillEvent) : null;

  const totalContacts = EVENTS.reduce((s, e) => s + (e.contacts || 0), 0);
  const totalFollowed = EVENTS.reduce((s, e) => s + (e.followedUp || 0), 0);
  const totalMtg      = EVENTS.reduce((s, e) => s + (e.mtgBooked || 0), 0);
  const totalOpps     = EVENTS.reduce((s, e) => s + (e.oppsOpen || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#111827" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }
        .row-hover:hover { background: #F0F4FF !important; }
        .nav-btn:hover { background: #F3F4F6 !important; }
        .card-hover:hover { box-shadow: 0 4px 20px rgba(59,130,246,0.12) !important; border-color: #BFDBFE !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade { animation: fadeUp 0.25s ease forwards; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .pulse { animation: pulse 1.8s infinite; }
      `}</style>

      {/* ── Top Bar ── */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#2563EB,#0EA5E9)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "Syne,sans-serif" }}>#</div>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 15, color: "#111827" }}>paid</span>
          <span style={{ color: "#D1D5DB", fontSize: 14, margin: "0 2px" }}>×</span>
          <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>TikTok Event Pipeline</span>
          <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: 4 }}>· Sales Leadership</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div className="pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ fontSize: 12, color: "#6B7280" }}>Live · 2026 YTD</span>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 200, background: "#FFFFFF", borderRight: "1px solid #E5E7EB", padding: "20px 0", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ padding: "0 14px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "1px", color: "#9CA3AF", textTransform: "uppercase" }}>Leadership Views</div>
          {[
            { id: "scorecard", icon: "◈", label: "Event Scorecard" },
            { id: "heatmap",   icon: "◉", label: "Rep Heat Map" },
            { id: "dead",      icon: "◎", label: "Dead Contact List" },
            { id: "slack",     icon: "⌁", label: "Slack Preview" },
          ].map(item => (
            <button key={item.id} className="nav-btn" onClick={() => { setView(item.id); setDrillEvent(null); setDrillRep(null); }}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 14px", background: "transparent", border: "none", borderLeft: view === item.id ? "2px solid #2563EB" : "2px solid transparent", color: view === item.id ? "#2563EB" : "#6B7280", fontSize: 13, fontWeight: view === item.id ? 600 : 400, textAlign: "left" }}>
              <span style={{ fontSize: 12 }}>{item.icon}</span>{item.label}
            </button>
          ))}

          <div style={{ padding: "16px 14px 8px", fontSize: 10, fontWeight: 700, letterSpacing: "1px", color: "#9CA3AF", textTransform: "uppercase", marginTop: 8 }}>Events</div>
          {EVENTS.map(e => (
            <button key={e.id} className="nav-btn" onClick={() => { setView("scorecard"); setDrillEvent(e.id); setDrillRep(null); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "transparent", border: "none", borderLeft: drillEvent === e.id ? "2px solid #2563EB" : "2px solid transparent", color: drillEvent === e.id ? "#2563EB" : "#6B7280", fontSize: 12, textAlign: "left" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: e.daysAgo ? "#10B981" : "#D1D5DB", flexShrink: 0 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</span>
            </button>
          ))}
        </div>

        {/* ── Main ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }} className="fade">

          {/* KPI Strip — always visible */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Events Run",      value: EVENTS.filter(e=>e.daysAgo).length, sub: "2026 YTD",          accent: "#2563EB" },
              { label: "Total Contacts",  value: totalContacts,  sub: "across all events",  accent: "#7C3AED" },
              { label: "Follow-Up Rate",  value: `${pct(totalFollowed, totalContacts-30)}%`, sub: "of completed events", accent: totalFollowed/totalContacts > 0.8 ? "#059669" : "#D97706" },
              { label: "Meetings Booked", value: totalMtg, sub: "from event contacts", accent: "#0891B2" },
              { label: "Opps Open",       value: totalOpps, sub: "pipeline in progress",  accent: "#059669" },
            ].map((k, i) => (
              <div key={i} className="card-hover" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px 18px", transition: "all 0.2s" }}>
                <div style={{ height: 3, background: k.accent, borderRadius: 2, marginBottom: 12, opacity: 0.7 }} />
                <Stat {...k} />
              </div>
            ))}
          </div>

          {/* ── VIEW: EVENT SCORECARD ── */}
          {view === "scorecard" && !drillEvent && (
            <>
              <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#111827" }}>Event Scorecard</h2>
                  <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>Click any row to drill into contacts</p>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "2.2fr 0.8fr 0.8fr 1fr 1.2fr 1.2fr 1.2fr 1.2fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                  {["Event","Date","City","Contacts","Followed Up","Mtg Booked","Opps Open","Cost"].map(h => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.7px" }}>{h}</span>
                  ))}
                </div>

                {EVENTS.map((e, i) => {
                  const fuPct = e.followedUp && e.contacts ? pct(e.followedUp, e.contacts) : null;
                  const upcoming = !e.daysAgo;
                  return (
                    <div key={e.id} className="row-hover" onClick={() => setDrillEvent(e.id)}
                      style={{ display: "grid", gridTemplateColumns: "2.2fr 0.8fr 0.8fr 1fr 1.2fr 1.2fr 1.2fr 1.2fr", padding: "15px 20px", borderBottom: i < EVENTS.length - 1 ? "1px solid #F3F4F6" : "none", cursor: "pointer", background: "#fff", alignItems: "center" }}>

                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{e.name}</div>
                        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Owner: {e.owner}</div>
                      </div>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>{e.date}</span>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>{e.city}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{e.contacts}</span>

                      <div>
                        {fuPct !== null ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: fuPct >= 80 ? "#059669" : fuPct >= 60 ? "#D97706" : "#DC2626" }}>{fuPct}%</span>
                            <Bar value={fuPct} color={fuPct >= 80 ? "#10B981" : fuPct >= 60 ? "#F59E0B" : "#EF4444"} />
                          </div>
                        ) : <span style={{ fontSize: 11, color: "#D1D5DB", fontStyle: "italic" }}>Upcoming</span>}
                      </div>

                      <span style={{ fontSize: 14, fontWeight: 700, color: e.mtgBooked ? "#0891B2" : "#D1D5DB" }}>{e.mtgBooked ?? "—"}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: e.oppsOpen ? "#059669" : "#D1D5DB" }}>{e.oppsOpen ?? "—"}</span>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>{fmt(e.cost)}</span>
                    </div>
                  );
                })}

                {/* Totals */}
                <div style={{ display: "grid", gridTemplateColumns: "2.2fr 0.8fr 0.8fr 1fr 1.2fr 1.2fr 1.2fr 1.2fr", padding: "14px 20px", background: "#EFF6FF", borderTop: "1px solid #DBEAFE", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.5px" }}>YTD Total</span>
                  <span /><span />
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>{totalContacts}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>{pct(totalFollowed, totalContacts-30)}%</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0891B2" }}>{totalMtg}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#059669" }}>{totalOpps}</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{fmt(EVENTS.reduce((s,e)=>s+e.cost,0))}</span>
                </div>
              </div>
            </>
          )}

          {/* ── EVENT DRILL-DOWN ── */}
          {view === "scorecard" && drillEvent && event && (
            <>
              <button onClick={() => setDrillEvent(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#6B7280", marginBottom: 20 }}>
                ← Back to Scorecard
              </button>

              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#111827" }}>{event.name}</h2>
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>{event.date} · {event.city} · Owner: {event.owner}</p>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.4fr 1fr 1.2fr 1fr 1.4fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                  {["Contact","Company","Rep Owner","Status","Days Since Event","Linked Opp"].map(h => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.7px" }}>{h}</span>
                  ))}
                </div>

                {event.contacts_list.map((c, i) => (
                  <div key={i} className="row-hover" style={{ display: "grid", gridTemplateColumns: "1.8fr 1.4fr 1fr 1.2fr 1fr 1.4fr", padding: "13px 20px", borderBottom: i < event.contacts_list.length-1 ? "1px solid #F3F4F6" : "none", alignItems: "center", background: c.status === "Dead" ? "#FFFBFB" : "#fff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <RepInitial name={c.name} size={26} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{c.name}</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{c.co}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <RepInitial name={c.rep} size={20} />
                      <span style={{ fontSize: 12, color: "#374151" }}>{c.rep}</span>
                    </div>
                    <Badge status={c.status} />
                    <span style={{ fontSize: 12, fontWeight: c.days > 14 ? 700 : 400, color: c.days > 14 ? "#DC2626" : "#6B7280" }}>
                      {c.days > 0 ? `${c.days}d no activity` : `Active`}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: c.opp ? "#059669" : "#D1D5DB" }}>{c.opp || "—"}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── VIEW: REP HEAT MAP ── */}
          {view === "heatmap" && (
            <>
              <div style={{ marginBottom: 18 }}>
                <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#111827" }}>Rep Heat Map</h2>
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>Your 1:1 coaching agenda — point at the numbers, not the feelings</p>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.8fr 0.8fr 0.8fr 1.2fr 1fr 1fr 1.2fr 1.4fr", padding: "10px 20px", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                  {["Rep","Events","Contacts","Follow-Up %","Mtgs","Opps","Dead Contacts","Status"].map(h => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.7px" }}>{h}</span>
                  ))}
                </div>

                {REPS.sort((a,b) => (b.oppsOpen - a.oppsOpen) || (a.dead - b.dead)).map((rep, i) => {
                  const fuPct = pct(rep.followedUp, rep.contacts);
                  const status = rep.dead > 1 ? "needs-talk" : fuPct < 70 ? "watch" : "on-track";
                  const statusCfg = {
                    "on-track":   { label: "On Track",  bg: "#DCFCE7", color: "#15803D" },
                    "watch":      { label: "Watch",     bg: "#FEF9C3", color: "#92400E" },
                    "needs-talk": { label: "1:1 Needed", bg: "#FEE2E2", color: "#B91C1C" },
                  }[status];

                  return (
                    <div key={i} className="row-hover" style={{ display: "grid", gridTemplateColumns: "1.8fr 0.8fr 0.8fr 1.2fr 1fr 1fr 1.2fr 1.4fr", padding: "15px 20px", borderBottom: i < REPS.length-1 ? "1px solid #F3F4F6" : "none", alignItems: "center", background: status === "needs-talk" ? "#FFFBFB" : "#fff" }}>

                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <RepInitial name={rep.name} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{rep.name}</div>
                          <div style={{ fontSize: 10, color: "#9CA3AF" }}>{rep.contacts} contacts owned</div>
                        </div>
                      </div>

                      <span style={{ fontSize: 13, color: "#374151" }}>{rep.events}</span>
                      <span style={{ fontSize: 13, color: "#374151" }}>{rep.contacts}</span>

                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: fuPct >= 80 ? "#059669" : fuPct >= 60 ? "#D97706" : "#DC2626" }}>{fuPct}%</span>
                        <Bar value={fuPct} color={fuPct >= 80 ? "#10B981" : fuPct >= 60 ? "#F59E0B" : "#EF4444"} />
                      </div>

                      <span style={{ fontSize: 14, fontWeight: 700, color: rep.mtgBooked > 0 ? "#0891B2" : "#D1D5DB" }}>{rep.mtgBooked}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: rep.oppsOpen > 0 ? "#059669" : "#D1D5DB" }}>{rep.oppsOpen}</span>

                      <div>
                        {rep.dead > 0 ? (
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#DC2626" }}>{rep.dead} ⚠</span>
                        ) : (
                          <span style={{ fontSize: 13, color: "#D1D5DB" }}>—</span>
                        )}
                      </div>

                      <span style={{ fontSize: 11, fontWeight: 700, color: statusCfg.color, background: statusCfg.bg, padding: "4px 10px", borderRadius: 999 }}>
                        {statusCfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Coaching prompts */}
              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>1:1 Conversation Starters</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { trigger: "Dead contacts > 1", prompt: "\"You have [X] contacts from [Event] with no activity. Walk me through what happened after the event for each one.\"", color: "#DC2626", bg: "#FEF2F2" },
                    { trigger: "Follow-up < 70%", prompt: "\"Your follow-up rate is [X]%. What's getting in the way of reaching out to the contacts you haven't touched?\"", color: "#D97706", bg: "#FFFBEB" },
                    { trigger: "Mtgs booked = 0", prompt: "\"You followed up but no meetings landed. What objections are you hitting? Let's work on the follow-up message together.\"", color: "#7C3AED", bg: "#F5F3FF" },
                    { trigger: "Strong performer", prompt: "\"You've got [X] opps from events. Which relationship from the last event feels closest to moving forward? What do they need?\"", color: "#059669", bg: "#F0FDF4" },
                  ].map((c, i) => (
                    <div key={i} style={{ background: c.bg, borderRadius: 8, padding: "14px 16px" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: c.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>When: {c.trigger}</div>
                      <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, fontStyle: "italic" }}>{c.prompt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── VIEW: DEAD CONTACT LIST ── */}
          {view === "dead" && (
            <>
              <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#111827" }}>Dead Contact List</h2>
                  <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>This list should be empty. Every row is a relationship going cold right now.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#FEE2E2", padding: "6px 14px", borderRadius: 999 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} className="pulse" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#B91C1C" }}>{DEAD.length} contacts need action</span>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #FCA5A5", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.4fr 1fr 1fr 1fr 1.6fr", padding: "10px 20px", background: "#FEF2F2", borderBottom: "1px solid #FCA5A5" }}>
                  {["Contact","Company","Rep Owner","Event","Days No Activity","Action"].map(h => (
                    <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.7px" }}>{h}</span>
                  ))}
                </div>

                {DEAD.map((c, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1.8fr 1.4fr 1fr 1fr 1fr 1.6fr", padding: "14px 20px", borderBottom: i < DEAD.length-1 ? "1px solid #FEF2F2" : "none", alignItems: "center", background: "#fff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <RepInitial name={c.name} size={26} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{c.name}</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{c.co}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <RepInitial name={c.rep} size={20} />
                      <span style={{ fontSize: 12 }}>{c.rep}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", background: "#F3F4F6", padding: "3px 8px", borderRadius: 4 }}>{c.event}</span>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: c.days > 30 ? "#B91C1C" : "#D97706" }}>{c.days}d</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["Log Activity","Mark Dead"].map(btn => (
                        <button key={btn} onClick={() => setActionDone(s=>({...s,[`${c.name}-${btn}`]:true}))}
                          style={{ fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 6, border: actionDone[`${c.name}-${btn}`] ? "1px solid #10B981" : "1px solid #E5E7EB", background: actionDone[`${c.name}-${btn}`] ? "#DCFCE7" : btn === "Log Activity" ? "#EFF6FF" : "#FEF2F2", color: actionDone[`${c.name}-${btn}`] ? "#059669" : btn === "Log Activity" ? "#2563EB" : "#DC2626", cursor: "pointer" }}>
                          {actionDone[`${c.name}-${btn}`] ? "✓ Done" : btn}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Escalation guide */}
              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>Escalation Protocol</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                  {[
                    { range: "14–21 days", action: "Slack DM fires automatically to rep. Rep updates status or logs activity.", color: "#D97706", bg: "#FEF9C3" },
                    { range: "21–30 days", action: "Second Slack DM fires with escalating message. Appears on this list for manager visibility.", color: "#EA580C", bg: "#FFF7ED" },
                    { range: "30+ days", action: "Flagged in leadership email report. 1:1 conversation required. Rep must formally mark as Dead or explain plan.", color: "#B91C1C", bg: "#FEF2F2" },
                  ].map((e, i) => (
                    <div key={i} style={{ background: e.bg, borderRadius: 8, padding: "14px 16px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: e.color, marginBottom: 6 }}>{e.range}</div>
                      <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{e.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── VIEW: SLACK PREVIEW ── */}
          {view === "slack" && (
            <>
              <div style={{ marginBottom: 18 }}>
                <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#111827" }}>Slack Automation Preview</h2>
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>What each rep receives on Monday morning. Buttons write back to Salesforce.</p>
              </div>

              {/* Rep selector */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                {REPS.map(rep => (
                  <button key={rep.name} onClick={() => setSlackRep(rep)}
                    style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: slackRep.name === rep.name ? "1px solid #2563EB" : "1px solid #E5E7EB", background: slackRep.name === rep.name ? "#EFF6FF" : "#fff", color: slackRep.name === rep.name ? "#2563EB" : "#6B7280", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    <RepInitial name={rep.name} size={18} />
                    {rep.name.split(" ")[0]}
                    {rep.dead > 0 && <span style={{ fontSize: 10, background: "#FEE2E2", color: "#B91C1C", padding: "1px 5px", borderRadius: 999, fontWeight: 700 }}>{rep.dead}</span>}
                  </button>
                ))}
              </div>

              {/* Slack DM */}
              <div style={{ maxWidth: 640 }}>
                <SlackPreview
                  rep={slackRep}
                  contacts={[...EVENTS[0].contacts_list, ...EVENTS[1].contacts_list].filter(c => c.rep === slackRep.name.split(" ")[0] || c.rep === slackRep.name)}
                />
              </div>

              {/* How it works */}
              <div style={{ marginTop: 20, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px", maxWidth: 640 }}>
                <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 14 }}>How It Works</div>
                {[
                  { step: "1", title: "Monday 8am", desc: "Zapier pulls SF report: Campaign Members owned by rep with no activity in 7+ days" },
                  { step: "2", title: "DM Fires",   desc: "Personal Slack DM sent to rep — their contacts only. Not a channel. Their name on it." },
                  { step: "3", title: "Rep Clicks", desc: "One-click buttons update Salesforce Campaign Member Status directly. Rep never opens SF." },
                  { step: "4", title: "You See It", desc: "Status change reflects immediately on the Scorecard and Rep Heat Map. Dead list updates live." },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < 3 ? 14 : 0, alignItems: "flex-start" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#EFF6FF", border: "1px solid #BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#2563EB", flexShrink: 0 }}>{s.step}</div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{s.title} — </span>
                      <span style={{ fontSize: 13, color: "#6B7280" }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
