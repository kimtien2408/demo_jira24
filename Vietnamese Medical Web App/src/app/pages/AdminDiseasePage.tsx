import { useState } from "react";
import { Save, X, EyeOff, Shield } from "lucide-react";

export function AdminDiseasePage() {
  const [form, setForm] = useState({
    name: "Đái tháo đường type 2",
    group: "Nội tiết",
    icd10: "E11",
    status: true,
    description: "Đái tháo đường type 2 (ĐTĐ type 2) là bệnh lý rối loạn chuyển hóa mãn tính đặc trưng bởi tình trạng tăng glucose máu mạn tính do hậu quả của đề kháng insulin và thiếu hụt tiết insulin tương đối. Đây là loại đái tháo đường phổ biến nhất, chiếm khoảng 90-95% tổng số ca mắc đái tháo đường.",
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 style={{ fontWeight: 700, fontSize: "1.3rem" }}>Chỉnh sửa bệnh nền</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: "#B71C1C", fontWeight: 700 }}>ADMIN</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield size={15} className="text-primary" />
            Quản lý bệnh · MB06
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-5">
          <h2 style={{ fontWeight: 700 }}>Thông tin bệnh nền</h2>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Tên bệnh</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Nhóm bệnh</label>
              <select
                value={form.group}
                onChange={e => setForm({ ...form, group: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {["Nội tiết", "Tim mạch", "Hô hấp", "Tiêu hóa", "Thần kinh", "Cơ xương khớp", "Thận - Tiết niệu"].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Mã ICD-10</label>
              <input
                type="text"
                value={form.icd10}
                onChange={e => setForm({ ...form, icd10: e.target.value })}
                placeholder="vd: E11, I10, J45…"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
            <div>
              <p className="text-sm" style={{ fontWeight: 600 }}>Trạng thái hiển thị</p>
              <p className="text-xs text-muted-foreground">{form.status ? "Bệnh đang được hiển thị công khai trong hệ thống" : "Bệnh đã bị ẩn"}</p>
            </div>
            <button
              onClick={() => setForm({ ...form, status: !form.status })}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ backgroundColor: form.status ? "#1F5C99" : "#A0B4C8" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                style={{ left: form.status ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Mô tả bệnh</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={7}
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Related drugs preview */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block" style={{ fontWeight: 500 }}>Thuốc chống chỉ định liên quan</label>
            <div className="flex flex-wrap gap-2">
              {["Metformin", "Glyburide", "Glipizide", "Pioglitazone", "Rosiglitazone"].map(d => (
                <span key={d} className="px-3 py-1 rounded-full text-xs border" style={{ backgroundColor: "#FEECEC", color: "#B71C1C", borderColor: "#F5C6C6", fontWeight: 500 }}>
                  {d}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">5 thuốc được gắn với bệnh này. Quản lý qua trang chỉnh sửa thuốc.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity" style={{ fontWeight: 700 }}>
            <Save size={16} /> Lưu bệnh nền
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors" style={{ fontWeight: 500 }}>
            <X size={16} /> Huỷ
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border rounded-xl text-destructive hover:bg-red-50 transition-colors ml-auto" style={{ borderColor: "#B71C1C", fontWeight: 500 }}>
            <EyeOff size={16} /> Ẩn bệnh này
          </button>
        </div>
      </div>
    </div>
  );
}
