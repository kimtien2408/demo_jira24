import { useState } from "react";
import { Plus, Trash2, Save, X, EyeOff, Shield } from "lucide-react";

interface ContraRow {
  id: number;
  disease: string;
  severity: string;
  reason: string;
  alternative: string;
}

export function AdminDrugPage() {
  const [form, setForm] = useState({
    name: "Warfarin",
    activeIngredient: "Warfarin Sodium",
    group: "Chống đông máu",
    status: true,
    description: "Warfarin là thuốc chống đông máu dạng uống, được sử dụng để ngăn ngừa và điều trị huyết khối tĩnh mạch, thuyên tắc phổi, và để phòng ngừa đột quỵ và đau tim ở những bệnh nhân có rung nhĩ hoặc van tim nhân tạo.",
    sideEffects: "Xuất huyết (nội và ngoại), bầm tím, chảy máu nướu răng, tiểu máu, phân đen; hiếm gặp: hoại tử da, hội chứng ngón tím.",
  });

  const [contraRows, setContraRows] = useState<ContraRow[]>([
    { id: 1, disease: "Thai kỳ", severity: "Tuyệt đối", reason: "Gây dị tật thai nhi, đặc biệt tam cá nguyệt đầu", alternative: "Heparin tiêm dưới da" },
    { id: 2, disease: "Xuất huyết nội sọ", severity: "Tuyệt đối", reason: "Tăng nguy cơ chảy máu não đe doạ tính mạng", alternative: "Không có thuốc thay thế tương đương" },
    { id: 3, disease: "Loét tiêu hóa đang hoạt động", severity: "Tuyệt đối", reason: "Nguy cơ xuất huyết tiêu hóa nghiêm trọng", alternative: "Heparin với liều điều chỉnh" },
    { id: 4, disease: "Suy gan nặng", severity: "Tương đối", reason: "Giảm tổng hợp yếu tố đông máu, khó điều chỉnh liều", alternative: "Heparin phân tử thấp" },
  ]);

  const [nextId, setNextId] = useState(5);

  const addRow = () => {
    setContraRows([...contraRows, { id: nextId, disease: "", severity: "Tương đối", reason: "", alternative: "" }]);
    setNextId(nextId + 1);
  };

  const removeRow = (id: number) => setContraRows(contraRows.filter(r => r.id !== id));

  const updateRow = (id: number, field: keyof ContraRow, value: string) => {
    setContraRows(contraRows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 style={{ fontWeight: 700, fontSize: "1.3rem" }}>Chỉnh sửa thông tin thuốc</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: "#B71C1C", fontWeight: 700 }}>ADMIN</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield size={15} className="text-primary" />
            Quản lý thuốc · MB05
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Left column */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 style={{ fontWeight: 700 }}>Thông tin cơ bản</h2>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Tên thuốc</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Hoạt chất</label>
              <input type="text" value={form.activeIngredient} onChange={e => setForm({ ...form, activeIngredient: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Nhóm thuốc</label>
              <select value={form.group} onChange={e => setForm({ ...form, group: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                {["Chống đông máu", "Hạ đường huyết", "Kháng sinh", "Hạ mỡ máu", "Chống viêm không steroid", "Ức chế men chuyển", "Ức chế bơm proton"].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
              <div>
                <p className="text-sm" style={{ fontWeight: 600 }}>Trạng thái hiển thị</p>
                <p className="text-xs text-muted-foreground">{form.status ? "Đang hiển thị công khai" : "Đã ẩn"}</p>
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
          </div>

          {/* Right column */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 style={{ fontWeight: 700 }}>Mô tả & Tác dụng phụ</h2>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Mô tả thuốc</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Tác dụng phụ</label>
              <textarea value={form.sideEffects} onChange={e => setForm({ ...form, sideEffects: e.target.value })} rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
          </div>
        </div>

        {/* Contraindications table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm mb-5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 style={{ fontWeight: 700 }}>Danh sách chống chỉ định</h2>
            <button
              onClick={addRow}
              className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-primary rounded-xl text-sm hover:bg-accent transition-colors"
              style={{ fontWeight: 600 }}
            >
              <Plus size={15} /> Thêm hàng
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground" style={{ fontWeight: 600, minWidth: 150 }}>Bệnh nền</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground" style={{ fontWeight: 600, minWidth: 130 }}>Mức độ</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground" style={{ fontWeight: 600, minWidth: 200 }}>Lý do</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground" style={{ fontWeight: 600, minWidth: 180 }}>Thuốc thay thế</th>
                  <th className="px-4 py-3" style={{ minWidth: 48 }}></th>
                </tr>
              </thead>
              <tbody>
                {contraRows.map((row, i) => (
                  <tr key={row.id} className={`border-t border-border ${i % 2 === 1 ? "bg-muted/20" : ""}`}>
                    <td className="px-3 py-2">
                      <input type="text" value={row.disease} onChange={e => updateRow(row.id, "disease", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </td>
                    <td className="px-3 py-2">
                      <select value={row.severity} onChange={e => updateRow(row.id, "severity", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Tuyệt đối</option>
                        <option>Tương đối</option>
                        <option>An toàn</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input type="text" value={row.reason} onChange={e => updateRow(row.id, "reason", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </td>
                    <td className="px-3 py-2">
                      <input type="text" value={row.alternative} onChange={e => updateRow(row.id, "alternative", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </td>
                    <td className="px-3 py-2">
                      <button onClick={() => removeRow(row.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity" style={{ fontWeight: 700 }}>
            <Save size={16} /> Lưu thuốc
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors" style={{ fontWeight: 500 }}>
            <X size={16} /> Huỷ
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border rounded-xl text-destructive hover:bg-red-50 transition-colors ml-auto" style={{ borderColor: "#B71C1C", fontWeight: 500 }}>
            <EyeOff size={16} /> Ẩn thuốc này
          </button>
        </div>
      </div>
    </div>
  );
}
