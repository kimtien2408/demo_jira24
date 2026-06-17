import { useState } from "react";
import { Search, Filter, ChevronDown, FileText } from "lucide-react";
import { SeverityBadge } from "../components/SeverityBadge";
import { DisclaimerBar } from "../components/DisclaimerBar";

type Severity = "absolute" | "relative" | "safe";

const mockDrugs = [
  { id: 1, name: "Aspirin", activeIngredient: "Acid Acetylsalicylic", group: "Chống viêm không steroid", severity: "absolute" as Severity, conditions: ["Loét dạ dày", "Rối loạn đông máu", "Hen suyễn"] },
  { id: 2, name: "Metformin", activeIngredient: "Metformin HCl", group: "Hạ đường huyết", severity: "relative" as Severity, conditions: ["Suy thận", "Suy gan", "Suy tim sung huyết"] },
  { id: 3, name: "Warfarin", activeIngredient: "Warfarin Sodium", group: "Chống đông máu", severity: "absolute" as Severity, conditions: ["Thai kỳ", "Xuất huyết nội sọ", "Loét tiêu hóa"] },
  { id: 4, name: "Atorvastatin", activeIngredient: "Atorvastatin Calcium", group: "Hạ mỡ máu", severity: "relative" as Severity, conditions: ["Bệnh gan hoạt động", "Mang thai", "Đang cho bú"] },
  { id: 5, name: "Amoxicillin", activeIngredient: "Amoxicillin Trihydrate", group: "Kháng sinh", severity: "safe" as Severity, conditions: [] },
  { id: 6, name: "Lisinopril", activeIngredient: "Lisinopril Dihydrate", group: "Ức chế men chuyển", severity: "absolute" as Severity, conditions: ["Thai kỳ", "Phù mạch", "Tăng kali máu"] },
  { id: 7, name: "Omeprazole", activeIngredient: "Omeprazole", group: "Ức chế bơm proton", severity: "safe" as Severity, conditions: [] },
  { id: 8, name: "Simvastatin", activeIngredient: "Simvastatin", group: "Hạ mỡ máu", severity: "relative" as Severity, conditions: ["Suy thận nặng", "Dùng cùng cyclosporin"] },
];

const diseaseGroups = ["Tất cả bệnh nền", "Tim mạch", "Nội tiết", "Hô hấp", "Tiêu hóa", "Thần kinh"];
const drugGroups = ["Tất cả nhóm thuốc", "Kháng sinh", "Hạ đường huyết", "Chống viêm không steroid", "Chống đông máu", "Hạ mỡ máu", "Ức chế men chuyển"];
const severityLevels = ["Tất cả mức độ", "Tuyệt đối", "Tương đối", "An toàn"];

interface HomePageProps {
  onViewResults: () => void;
}

export function HomePage({ onViewResults }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [diseaseGroup, setDiseaseGroup] = useState("Tất cả bệnh nền");
  const [drugGroup, setDrugGroup] = useState("Tất cả nhóm thuốc");
  const [severity, setSeverity] = useState("Tất cả mức độ");
  const [searched, setSearched] = useState(false);

  const filtered = mockDrugs.filter(d => {
    const q = query.toLowerCase();
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.activeIngredient.toLowerCase().includes(q) || d.conditions.some(c => c.toLowerCase().includes(q));
    const matchSev = severity === "Tất cả mức độ" ||
      (severity === "Tuyệt đối" && d.severity === "absolute") ||
      (severity === "Tương đối" && d.severity === "relative") ||
      (severity === "An toàn" && d.severity === "safe");
    const matchDrug = drugGroup === "Tất cả nhóm thuốc" || d.group === drugGroup;
    return matchQ && matchSev && matchDrug;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="bg-primary px-4 py-14 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm mb-3 uppercase tracking-widest" style={{ color: "#90C4F0", fontWeight: 600 }}>
            Hệ thống tra cứu thuốc chống chỉ định
          </p>
          <h1 className="text-white mb-2" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.3 }}>
            Thuốc Chống Chỉ Định
          </h1>
          <p className="mb-8" style={{ color: "#B8D9F4", fontSize: "1rem" }}>
            Tra cứu nhanh các thuốc không phù hợp với bệnh nền của bạn
          </p>
          <div className="flex gap-2 bg-white rounded-xl p-2 shadow-lg">
            <Search size={20} className="text-muted-foreground ml-2 self-center flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setSearched(true)}
              placeholder="Nhập tên thuốc hoặc bệnh nền…"
              className="flex-1 outline-none text-foreground bg-transparent"
              style={{ fontSize: "1rem" }}
            />
            <button
              onClick={() => setSearched(true)}
              className="px-5 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ fontWeight: 600 }}
            >
              Tra cứu
            </button>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-3 items-center bg-card rounded-xl p-4 border border-border shadow-sm">
          <Filter size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground" style={{ fontWeight: 500 }}>Lọc theo:</span>
          {[
            { label: "Nhóm bệnh", value: diseaseGroup, options: diseaseGroups, onChange: setDiseaseGroup },
            { label: "Nhóm thuốc", value: drugGroup, options: drugGroups, onChange: setDrugGroup },
            { label: "Mức độ", value: severity, options: severityLevels, onChange: setSeverity },
          ].map(({ label, value, options, onChange }) => (
            <div key={label} className="relative">
              <select
                value={value}
                onChange={e => { onChange(e.target.value); setSearched(true); }}
                className="appearance-none pl-3 pr-8 py-2 bg-input-background rounded-lg text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {options.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          ))}
          <button
            onClick={() => { setQuery(""); setDiseaseGroup("Tất cả bệnh nền"); setDrugGroup("Tất cả nhóm thuốc"); setSeverity("Tất cả mức độ"); setSearched(false); }}
            className="text-sm text-primary hover:underline ml-auto"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4">
        {(searched || query) ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Tìm thấy <strong className="text-foreground">{filtered.length}</strong> kết quả{query && ` cho "${query}"`}
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-5 py-3 text-sm text-muted-foreground" style={{ fontWeight: 600 }}>Tên thuốc</th>
                    <th className="text-left px-5 py-3 text-sm text-muted-foreground" style={{ fontWeight: 600 }}>Hoạt chất</th>
                    <th className="text-left px-5 py-3 text-sm text-muted-foreground" style={{ fontWeight: 600 }}>Nhóm thuốc</th>
                    <th className="text-left px-5 py-3 text-sm text-muted-foreground" style={{ fontWeight: 600 }}>Mức độ</th>
                    <th className="text-left px-5 py-3 text-sm text-muted-foreground" style={{ fontWeight: 600 }}>Bệnh nền chống chỉ định</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((drug, i) => (
                    <tr
                      key={drug.id}
                      className={`border-b border-border hover:bg-muted/50 transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                      onClick={onViewResults}
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-primary" style={{ fontWeight: 600 }}>{drug.name}</span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-foreground">{drug.activeIngredient}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{drug.group}</td>
                      <td className="px-5 py-3.5">
                        <SeverityBadge severity={drug.severity} size="sm" />
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {drug.conditions.length === 0
                            ? <span className="text-sm" style={{ color: "#1B5E20" }}>Không có chống chỉ định</span>
                            : drug.conditions.map(c => (
                              <span key={c} className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground border border-border">{c}</span>
                            ))
                          }
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                          onClick={(e) => { e.stopPropagation(); onViewResults(); }}
                        >
                          <FileText size={13} /> Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                        Không tìm thấy kết quả phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <DisclaimerBar />
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-primary" />
            </div>
            <h3 className="text-foreground mb-2" style={{ fontWeight: 600 }}>Bắt đầu tra cứu</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Nhập tên thuốc hoặc bệnh nền vào ô tìm kiếm để xem các thuốc chống chỉ định
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {["Đái tháo đường", "Cao huyết áp", "Suy thận", "Hen suyễn"].map(cond => (
                <button
                  key={cond}
                  onClick={() => { setQuery(cond); setSearched(true); }}
                  className="px-4 py-3 bg-card border border-border rounded-xl text-sm text-primary hover:border-primary transition-colors"
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky disclaimer */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t border-yellow-200 px-4 py-2 flex items-center gap-2 z-40">
        <span style={{ color: "#92400E", fontSize: "0.78rem", fontStyle: "italic" }}>
          ⚠ Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo bác sĩ hoặc dược sĩ trước khi dùng thuốc.
        </span>
      </div>
    </div>
  );
}
