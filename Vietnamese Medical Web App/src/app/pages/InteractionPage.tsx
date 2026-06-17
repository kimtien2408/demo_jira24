import { useState } from "react";
import { Plus, X, AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";
import { DisclaimerBar } from "../components/DisclaimerBar";

const drugOptions = ["Aspirin", "Warfarin", "Metformin", "Lisinopril", "Atorvastatin", "Amoxicillin", "Omeprazole", "Simvastatin", "Clopidogrel", "Metoprolol", "Amlodipine", "Furosemide"];

type InteractionLevel = "dangerous" | "moderate" | "safe";

interface Interaction {
  drugA: string;
  drugB: string;
  level: InteractionLevel;
  reason: string;
  recommendation: string;
}

const interactionData: Interaction[] = [
  { drugA: "Aspirin", drugB: "Warfarin", level: "dangerous", reason: "Tăng nguy cơ xuất huyết nghiêm trọng do ức chế kết tập tiểu cầu và kháng đông đồng thời.", recommendation: "Tránh kết hợp. Nếu bắt buộc, theo dõi INR chặt chẽ." },
  { drugA: "Aspirin", drugB: "Clopidogrel", level: "moderate", reason: "Tăng nguy cơ chảy máu nhưng có thể được chỉ định trong một số hội chứng mạch vành cấp.", recommendation: "Chỉ dùng theo chỉ định bác sĩ tim mạch. Theo dõi dấu hiệu xuất huyết." },
  { drugA: "Warfarin", drugB: "Atorvastatin", level: "moderate", reason: "Atorvastatin có thể tăng tác dụng chống đông của Warfarin, làm tăng INR.", recommendation: "Kiểm tra INR thường xuyên hơn khi bắt đầu hoặc thay đổi liều Atorvastatin." },
  { drugA: "Metformin", drugB: "Furosemide", level: "moderate", reason: "Furosemide có thể tăng nồng độ Metformin trong máu, tăng nguy cơ nhiễm toan lactic.", recommendation: "Theo dõi chức năng thận và điều chỉnh liều nếu cần." },
  { drugA: "Lisinopril", drugB: "Furosemide", level: "safe", reason: "Kết hợp thường được dùng trong suy tim, tuy nhiên theo dõi huyết áp và điện giải.", recommendation: "Theo dõi huyết áp và kali máu định kỳ." },
  { drugA: "Simvastatin", drugB: "Amlodipine", level: "moderate", reason: "Amlodipine ức chế chuyển hóa Simvastatin, tăng nguy cơ bệnh cơ (myopathy).", recommendation: "Giới hạn liều Simvastatin ≤ 20mg/ngày khi dùng cùng Amlodipine." },
];

const levelConfig = {
  dangerous: { label: "Nguy hiểm", icon: XCircle, bg: "#FEECEC", text: "#B71C1C", border: "#F5C6C6" },
  moderate: { label: "Trung bình", icon: AlertTriangle, bg: "#FEF9EC", text: "#7B4F00", border: "#F7E6B0" },
  safe: { label: "An toàn", icon: CheckCircle, bg: "#EBF5EB", text: "#1B5E20", border: "#B8DFB8" },
};

export function InteractionPage() {
  const [inputValue, setInputValue] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [results, setResults] = useState<Interaction[]>([]);
  const [checked, setChecked] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (v: string) => {
    setInputValue(v);
    if (v.length > 0) {
      setSuggestions(drugOptions.filter(d => d.toLowerCase().includes(v.toLowerCase()) && !selectedDrugs.includes(d)));
    } else {
      setSuggestions([]);
    }
  };

  const addDrug = (drug: string) => {
    if (!selectedDrugs.includes(drug) && selectedDrugs.length < 8) {
      setSelectedDrugs([...selectedDrugs, drug]);
      setChecked(false);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const removeDrug = (drug: string) => {
    setSelectedDrugs(selectedDrugs.filter(d => d !== drug));
    setChecked(false);
  };

  const checkInteractions = () => {
    const found: Interaction[] = [];
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = i + 1; j < selectedDrugs.length; j++) {
        const a = selectedDrugs[i], b = selectedDrugs[j];
        const match = interactionData.find(
          r => (r.drugA === a && r.drugB === b) || (r.drugA === b && r.drugB === a)
        );
        if (match) found.push(match);
        else found.push({ drugA: a, drugB: b, level: "safe", reason: "Không có tương tác đáng kể được ghi nhận.", recommendation: "Có thể dùng kết hợp theo liều thông thường." });
      }
    }
    setResults(found);
    setChecked(true);
  };

  const dangerCount = results.filter(r => r.level === "dangerous").length;
  const moderateCount = results.filter(r => r.level === "moderate").length;

  return (
    <div className="min-h-screen bg-background py-8 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <h1 className="text-foreground" style={{ fontWeight: 700 }}>Kiểm tra tương tác thuốc</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-12">Thêm các thuốc đang dùng để kiểm tra tương tác</p>
        </div>

        {/* Input */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm mb-6">
          <label className="text-sm text-muted-foreground mb-2 block" style={{ fontWeight: 500 }}>Nhập tên thuốc</label>
          <div className="relative flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={e => handleInputChange(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && suggestions[0]) addDrug(suggestions[0]); }}
                placeholder="Tìm kiếm thuốc (vd: Aspirin, Metformin…)"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
                  {suggestions.slice(0, 5).map(s => (
                    <button
                      key={s}
                      onClick={() => addDrug(s)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted text-foreground border-b border-border last:border-0"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => { if (inputValue && drugOptions.includes(inputValue)) addDrug(inputValue); else if (suggestions[0]) addDrug(suggestions[0]); }}
              className="px-4 py-2.5 bg-secondary text-primary rounded-lg text-sm hover:bg-accent transition-colors flex items-center gap-1.5"
              style={{ fontWeight: 600 }}
            >
              <Plus size={16} /> Thêm
            </button>
          </div>

          {/* Selected drug chips */}
          {selectedDrugs.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 500 }}>Thuốc đã chọn ({selectedDrugs.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedDrugs.map(drug => (
                  <div
                    key={drug}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm"
                    style={{ backgroundColor: "#EBF1F8", borderColor: "#1F5C99", color: "#1F5C99" }}
                  >
                    <span style={{ fontWeight: 500 }}>{drug}</span>
                    <button onClick={() => removeDrug(drug)} className="hover:opacity-70">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick add */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Thêm nhanh:</p>
            <div className="flex flex-wrap gap-2">
              {drugOptions.filter(d => !selectedDrugs.includes(d)).slice(0, 6).map(d => (
                <button key={d} onClick={() => addDrug(d)} className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-secondary text-muted-foreground hover:text-primary border border-border transition-colors">
                  + {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Check button */}
        <button
          disabled={selectedDrugs.length < 2}
          onClick={checkInteractions}
          className="w-full py-3 rounded-xl text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#1F5C99", fontWeight: 700, fontSize: "1rem" }}
        >
          Kiểm tra tương tác ({selectedDrugs.length < 2 ? "cần ít nhất 2 thuốc" : `${selectedDrugs.length * (selectedDrugs.length - 1) / 2} cặp`})
        </button>

        {/* Results */}
        {checked && results.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Kết quả kiểm tra</h2>
              <div className="flex gap-2">
                {dangerCount > 0 && <span className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: "#FEECEC", color: "#B71C1C", fontWeight: 600 }}>{dangerCount} nguy hiểm</span>}
                {moderateCount > 0 && <span className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: "#FEF9EC", color: "#7B4F00", fontWeight: 600 }}>{moderateCount} trung bình</span>}
              </div>
            </div>
            <div className="space-y-3">
              {results.map((r, i) => {
                const cfg = levelConfig[r.level];
                const Icon = cfg.icon;
                return (
                  <div key={i} className="bg-card rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: cfg.border }}>
                    <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: cfg.bg }}>
                      <div className="flex items-center gap-2">
                        <Icon size={16} style={{ color: cfg.text }} />
                        <span style={{ fontWeight: 700, color: cfg.text, fontSize: "0.95rem" }}>
                          {r.drugA} + {r.drugB}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: cfg.text, color: "white", fontWeight: 600 }}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-foreground mb-3">{r.reason}</p>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted">
                        <span className="text-xs text-muted-foreground" style={{ fontWeight: 600, flexShrink: 0 }}>💡 Khuyến nghị:</span>
                        <span className="text-xs text-foreground">{r.recommendation}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <DisclaimerBar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
