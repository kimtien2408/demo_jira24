import { useState } from "react";
import { Save, X, Plus, User, FileText } from "lucide-react";

const conditions = [
  "Đái tháo đường type 2", "Tăng huyết áp", "Bệnh tim mạch", "Suy thận",
  "Suy gan", "Hen suyễn", "COPD", "Loét dạ dày", "Rối loạn mỡ máu",
  "Gout", "Loãng xương", "Động kinh", "Trầm cảm", "Lo âu", "Parkinson",
];

const drugOptions = ["Aspirin", "Metformin", "Lisinopril", "Atorvastatin", "Amoxicillin", "Omeprazole", "Warfarin", "Metoprolol"];

export function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "Nguyễn Thị Lan",
    dob: "1978-04-15",
    gender: "female",
    weight: "62",
    height: "158",
    notes: "",
  });
  const [selectedConditions, setSelectedConditions] = useState<string[]>(["Đái tháo đường type 2", "Tăng huyết áp"]);
  const [medications, setMedications] = useState<string[]>(["Metformin", "Lisinopril"]);
  const [drugInput, setDrugInput] = useState("");
  const [saved, setSaved] = useState(false);

  const bmi = profile.weight && profile.height
    ? (parseFloat(profile.weight) / Math.pow(parseFloat(profile.height) / 100, 2)).toFixed(1)
    : null;

  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: "Thiếu cân", color: "#7B4F00" };
    if (bmi < 25) return { label: "Bình thường", color: "#1B5E20" };
    if (bmi < 30) return { label: "Thừa cân", color: "#7B4F00" };
    return { label: "Béo phì", color: "#B71C1C" };
  };

  const bmiStatus = bmi ? getBmiStatus(parseFloat(bmi)) : null;

  const toggleCondition = (c: string) => {
    setSelectedConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const addMedication = () => {
    if (drugInput && !medications.includes(drugInput)) {
      setMedications([...medications, drugInput]);
      setDrugInput("");
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-primary rounded-2xl p-6 mb-6 text-white flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)", fontSize: "1.5rem", fontWeight: 700 }}>
            NL
          </div>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: "1.3rem" }}>{profile.fullName}</h1>
            <p style={{ color: "#B8D9F4", fontSize: "0.9rem" }}>Bệnh nhân · Cập nhật lần cuối: 10/06/2026</p>
          </div>
        </div>

        {/* Section 1: Personal Info */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-5">
          <div className="flex items-center gap-2 mb-5">
            <User size={18} className="text-primary" />
            <h2 style={{ fontWeight: 700 }}>Thông tin cá nhân</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Họ và tên</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Ngày sinh</label>
              <input
                type="date"
                value={profile.dob}
                onChange={e => setProfile({ ...profile, dob: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Giới tính</label>
              <select
                value={profile.gender}
                onChange={e => setProfile({ ...profile, gender: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Cân nặng (kg)</label>
                <input
                  type="number"
                  value={profile.weight}
                  onChange={e => setProfile({ ...profile, weight: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block" style={{ fontWeight: 500 }}>Chiều cao (cm)</label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={e => setProfile({ ...profile, height: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* BMI Card */}
          {bmi && bmiStatus && (
            <div className="mt-4 p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: "#EBF5EB", border: "1px solid #B8DFB8" }}>
              <div>
                <p className="text-sm" style={{ color: "#1B5E20", fontWeight: 600 }}>Chỉ số BMI</p>
                <p className="text-xs text-muted-foreground">Dựa trên cân nặng và chiều cao</p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: bmiStatus.color, lineHeight: 1 }}>{bmi}</p>
                <p className="text-xs mt-1" style={{ color: bmiStatus.color, fontWeight: 600 }}>{bmiStatus.label}</p>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Conditions */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-5">
          <h2 className="mb-1" style={{ fontWeight: 700 }}>Bệnh nền đang mắc</h2>
          <p className="text-sm text-muted-foreground mb-4">Chọn các bệnh nền của bạn ({selectedConditions.length} đã chọn)</p>
          <div className="flex flex-wrap gap-2">
            {conditions.map(c => (
              <button
                key={c}
                onClick={() => toggleCondition(c)}
                className="px-3 py-1.5 rounded-full text-sm border transition-all"
                style={selectedConditions.includes(c)
                  ? { backgroundColor: "#1F5C99", color: "white", borderColor: "#1F5C99", fontWeight: 500 }
                  : { backgroundColor: "#F0F4FA", color: "#5A6B80", borderColor: "rgba(31,92,153,0.15)" }
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Medications */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-5">
          <h2 className="mb-1" style={{ fontWeight: 700 }}>Thuốc đang sử dụng</h2>
          <p className="text-sm text-muted-foreground mb-4">Danh sách thuốc hiện tại</p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={drugInput}
              onChange={e => setDrugInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addMedication()}
              placeholder="Tìm và thêm thuốc…"
              className="flex-1 px-4 py-2 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={addMedication} className="px-3 py-2 bg-secondary text-primary rounded-xl hover:bg-accent transition-colors">
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {medications.map(m => (
              <div key={m} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm" style={{ backgroundColor: "#EBF1F8", borderColor: "#1F5C99", color: "#1F5C99" }}>
                <span style={{ fontWeight: 500 }}>{m}</span>
                <button onClick={() => setMedications(medications.filter(x => x !== m))} className="hover:opacity-70">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-primary" />
            <h2 style={{ fontWeight: 700 }}>Ghi chú</h2>
          </div>
          <textarea
            value={profile.notes}
            onChange={e => setProfile({ ...profile, notes: e.target.value })}
            placeholder="Ghi chú về tình trạng sức khoẻ, dị ứng thuốc, lịch tái khám…"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontWeight: 700 }}
          >
            <Save size={16} />
            {saved ? "Đã lưu!" : "Lưu hồ sơ"}
          </button>
          <button className="px-6 py-3 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors" style={{ fontWeight: 500 }}>
            Huỷ thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
