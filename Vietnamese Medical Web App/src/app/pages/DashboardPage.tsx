import { useState } from "react";
import { Search, Users, Pill, HeartPulse, TrendingUp, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const generateDailyData = (days: number) => {
  const data = [];
  const now = new Date(2026, 5, 10);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    data.push({
      date: `${d.getDate()}/${d.getMonth() + 1}`,
      searches: Math.floor(Math.random() * 300 + (isWeekend ? 80 : 180)),
    });
  }
  return data;
};

const data30 = generateDailyData(30);
const data7 = data30.slice(-7);
const data90 = (() => {
  const d = [];
  for (let i = 0; i < 3; i++) {
    d.push({ date: `T${i + 4}`, searches: Math.floor(Math.random() * 7000 + 5000) });
  }
  return d;
})();

const topDrugs = [
  { rank: 1, name: "Warfarin", count: 1842, group: "Chống đông máu" },
  { rank: 2, name: "Aspirin", count: 1674, group: "Chống viêm NSAID" },
  { rank: 3, name: "Metformin", count: 1523, group: "Hạ đường huyết" },
  { rank: 4, name: "Lisinopril", count: 1289, group: "Ức chế men chuyển" },
  { rank: 5, name: "Atorvastatin", count: 1102, group: "Hạ mỡ máu" },
];

const rankColors = ["#1F5C99", "#2D7AC5", "#4A90D9", "#6BAEE6", "#8EC5F0"];

type Range = "7" | "30" | "90";

export function DashboardPage() {
  const [range, setRange] = useState<Range>("30");

  const chartData = range === "7" ? data7 : range === "30" ? data30 : data90;
  const totalSearches = range === "7" ? data7.reduce((s, d) => s + d.searches, 0) : range === "30" ? data30.reduce((s, d) => s + d.searches, 0) : 62847;

  const stats = [
    { label: "Lượt tra cứu", value: totalSearches.toLocaleString("vi-VN"), sub: `${range === "7" ? "7 ngày" : range === "30" ? "30 ngày" : "3 tháng"} qua`, icon: Search, color: "#1F5C99", bg: "#EBF1F8" },
    { label: "Người dùng mới", value: "342", sub: "Tuần này", icon: Users, color: "#1B5E20", bg: "#EBF5EB" },
    { label: "Tổng số thuốc", value: "1,284", sub: "Đang hoạt động", icon: Pill, color: "#7B4F00", bg: "#FEF9EC" },
    { label: "Tổng số bệnh nền", value: "287", sub: "Đã phân loại", icon: HeartPulse, color: "#B71C1C", bg: "#FEECEC" },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <h1 style={{ fontWeight: 700, fontSize: "1.3rem" }}>Dashboard Quản trị</h1>
              <p className="text-muted-foreground text-xs">Cập nhật lúc 08:30 · 10/06/2026</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: "#B71C1C", fontWeight: 700 }}>ADMIN</span>
          </div>
          {/* Date range */}
          <div className="flex gap-1 p-1 bg-muted rounded-xl">
            {[{ label: "7 ngày", val: "7" }, { label: "30 ngày", val: "30" }, { label: "3 tháng", val: "90" }].map(({ label, val }) => (
              <button
                key={val}
                onClick={() => setRange(val as Range)}
                className="px-4 py-1.5 rounded-lg text-sm transition-colors"
                style={range === val ? { backgroundColor: "white", color: "#1F5C99", fontWeight: 700, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" } : { color: "#5A6B80" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
            <div key={label} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
              </div>
              <p style={{ fontSize: "1.8rem", fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
              <p className="text-sm text-foreground mt-1" style={{ fontWeight: 600 }}>{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Bar chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontWeight: 700 }}>Lượt tra cứu theo ngày</h2>
              <span className="text-xs text-muted-foreground">{range === "7" ? "7 ngày qua" : range === "30" ? "30 ngày qua" : "3 tháng qua"}</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,92,153,0.08)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#5A6B80" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#5A6B80" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid rgba(31,92,153,0.15)", borderRadius: "12px", fontSize: "13px" }}
                  labelStyle={{ fontWeight: 700, color: "#0D1B2A" }}
                  formatter={(value) => [`${value} lượt`, "Tra cứu"]}
                />
                <Bar dataKey="searches" fill="#1F5C99" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top drugs */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Shield size={16} className="text-primary" />
              <h2 style={{ fontWeight: 700 }}>Top 5 thuốc tra nhiều nhất</h2>
            </div>
            <div className="space-y-3">
              {topDrugs.map(({ rank, name, count, group }) => (
                <div key={rank} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: rankColors[rank - 1], fontSize: "0.75rem", fontWeight: 800 }}
                  >
                    {rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate" style={{ fontWeight: 600 }}>{name}</p>
                    <p className="text-xs text-muted-foreground truncate">{group}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-primary" style={{ fontWeight: 700 }}>{count.toLocaleString("vi-VN")}</p>
                    <p className="text-xs text-muted-foreground">lượt</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini bar visualization */}
            <div className="mt-5 pt-4 border-t border-border space-y-2">
              {topDrugs.map(({ rank, name, count }) => (
                <div key={rank}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{name}</span>
                    <span className="text-xs" style={{ color: rankColors[rank - 1], fontWeight: 600 }}>{((count / topDrugs[0].count) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(count / topDrugs[0].count) * 100}%`, backgroundColor: rankColors[rank - 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
