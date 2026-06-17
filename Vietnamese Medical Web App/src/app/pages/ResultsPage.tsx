import { useState } from "react";
import { ChevronDown, ChevronUp, Bookmark, ExternalLink, Info } from "lucide-react";
import { SeverityBadge } from "../components/SeverityBadge";
import { DisclaimerBar } from "../components/DisclaimerBar";

type Severity = "absolute" | "relative" | "safe";

const results = [
  {
    id: 1,
    name: "Warfarin",
    severity: "absolute" as Severity,
    activeIngredient: "Warfarin Sodium",
    group: "Chống đông máu",
    reason: "Warfarin có khả năng gây dị dạng thai nhi nghiêm trọng, đặc biệt trong 3 tháng đầu thai kỳ (hội chứng Warfarin bào thai), và tăng nguy cơ xuất huyết cho cả mẹ và thai nhi.",
    alternative: "Heparin không phân đoạn hoặc Heparin phân tử thấp (LMWH)",
    saved: false,
  },
  {
    id: 2,
    name: "Aspirin (liều cao)",
    severity: "absolute" as Severity,
    activeIngredient: "Acid Acetylsalicylic",
    group: "Chống viêm không steroid (NSAID)",
    reason: "Liều cao aspirin có thể gây đóng sớm ống động mạch thai nhi trong tam cá nguyệt thứ ba, và tăng nguy cơ chảy máu cho cả mẹ và thai nhi khi sinh.",
    alternative: "Paracetamol (liều thấp nhất hiệu quả), tham khảo bác sĩ",
    saved: false,
  },
  {
    id: 3,
    name: "Methotrexate",
    severity: "absolute" as Severity,
    activeIngredient: "Methotrexate",
    group: "Điều trị miễn dịch / Ung thư",
    reason: "Methotrexate là thuốc có khả năng gây quái thai mạnh, gây sảy thai, và gây ra các dị dạng bẩm sinh nghiêm trọng. Tuyệt đối không dùng trong thai kỳ.",
    alternative: "Sulfasalazine, Hydroxychloroquine (trong trường hợp viêm khớp)",
    saved: false,
  },
  {
    id: 4,
    name: "Lisinopril",
    severity: "absolute" as Severity,
    activeIngredient: "Lisinopril Dihydrate",
    group: "Ức chế men chuyển (ACE Inhibitors)",
    reason: "Thuốc ức chế men chuyển gây độc tính thận nặng cho thai nhi từ tam cá nguyệt thứ hai trở đi, có thể gây thiểu ối, suy thận và tử vong thai nhi.",
    alternative: "Methyldopa, Labetalol (kiểm soát huyết áp an toàn trong thai kỳ)",
    saved: true,
  },
  {
    id: 5,
    name: "Atorvastatin",
    severity: "relative" as Severity,
    activeIngredient: "Atorvastatin Calcium",
    group: "Hạ mỡ máu (Statin)",
    reason: "Statin ức chế tổng hợp cholesterol cần thiết cho phát triển não và hệ thần kinh của thai nhi. Nguy cơ chưa được xác định đầy đủ nhưng nên tránh khi không cần thiết.",
    alternative: "Ngừng thuốc trong thai kỳ; tái dùng sau sinh nếu đang cho bú đã dừng",
    saved: false,
  },
];

export function ResultsPage() {
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);
  const [savedIds, setSavedIds] = useState<number[]>([4]);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Page title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 style={{ fontWeight: 700, fontSize: "1.3rem" }}>Thai kỳ (Mang thai)</h1>
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "#FEECEC", color: "#B71C1C", fontWeight: 700 }}>
              {results.length} thuốc CCI
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Danh sách thuốc chống chỉ định với bệnh nền / tình trạng: <strong>Thai kỳ</strong>
          </p>
        </div>

        {/* Results */}
        <div className="space-y-3 mb-6">
          {results.map(r => {
            const expanded = expandedIds.includes(r.id);
            const saved = savedIds.includes(r.id);
            return (
              <div key={r.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => toggleExpand(r.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <span className="text-foreground" style={{ fontWeight: 700, fontSize: "1rem" }}>{r.name}</span>
                    </div>
                    <SeverityBadge severity={r.severity} />
                  </div>
                  {expanded ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
                </button>

                {/* Body */}
                {expanded && (
                  <div className="px-5 pb-5">
                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5" style={{ fontWeight: 500 }}>Hoạt chất</p>
                          <p className="text-sm text-foreground">{r.activeIngredient}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5" style={{ fontWeight: 500 }}>Nhóm thuốc</p>
                          <p className="text-sm text-foreground">{r.group}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1" style={{ fontWeight: 500 }}>Lý do chống chỉ định</p>
                        <p className="text-sm text-foreground leading-relaxed">{r.reason}</p>
                      </div>
                      <div className="p-3 rounded-xl" style={{ backgroundColor: "#EBF5EB", border: "1px solid #B8DFB8" }}>
                        <p className="text-xs mb-1" style={{ color: "#1B5E20", fontWeight: 600 }}>Thuốc thay thế được khuyến nghị:</p>
                        <p className="text-sm" style={{ color: "#1B5E20" }}>{r.alternative}</p>
                      </div>
                      {/* Footer actions */}
                      <div className="flex gap-2 pt-1">
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-primary rounded-xl text-sm hover:bg-accent transition-colors" style={{ fontWeight: 600 }}>
                          <ExternalLink size={14} /> Xem chi tiết
                        </button>
                        <button
                          onClick={() => toggleSave(r.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm border transition-colors"
                          style={{
                            backgroundColor: saved ? "#EBF1F8" : "transparent",
                            color: saved ? "#1F5C99" : "#5A6B80",
                            borderColor: saved ? "#1F5C99" : "rgba(31,92,153,0.2)",
                            fontWeight: 600,
                          }}
                        >
                          <Bookmark size={14} fill={saved ? "#1F5C99" : "none"} />
                          {saved ? "Đã lưu" : "Lưu vào hồ sơ"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-xl mb-4" style={{ backgroundColor: "#FEF9EC", border: "1px solid #F7E6B0" }}>
          <Info size={16} style={{ color: "#7B4F00", flexShrink: 0, marginTop: 2 }} />
          <p style={{ color: "#7B4F00", fontSize: "0.82rem" }}>
            Danh sách này dựa trên dữ liệu y văn và hướng dẫn điều trị cập nhật. Bác sĩ có thể cân nhắc sử dụng một số thuốc ở trên trong những trường hợp đặc biệt với giám sát chặt chẽ.
          </p>
        </div>

        <DisclaimerBar />
      </div>
    </div>
  );
}
