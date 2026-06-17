import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Shield } from "lucide-react";

interface RegisterPageProps {
  onNavigateLogin: () => void;
}

export function RegisterPage({ onNavigateLogin }: RegisterPageProps) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "", role: "patient" });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getPasswordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const pwStrength = getPasswordStrength(form.password);
  const strengthLabels = ["", "Yếu", "Trung bình", "Tốt", "Mạnh"];
  const strengthColors = ["", "#B71C1C", "#7B4F00", "#1B5E20", "#1B5E20"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[480px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-3">
            <Shield size={24} className="text-white" />
          </div>
          <h1 style={{ fontWeight: 700, fontSize: "1.5rem", color: "#0D1B2A" }}>Tạo tài khoản</h1>
          <p className="text-muted-foreground text-sm mt-1">Đăng ký để theo dõi hồ sơ sức khoẻ</p>
        </div>

        {submitted ? (
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <span style={{ fontSize: "2rem" }}>✓</span>
            </div>
            <h2 style={{ fontWeight: 700 }}>Đăng ký thành công!</h2>
            <p className="text-muted-foreground text-sm mt-2 mb-6">Chào mừng bạn đến với ThuốcAnToàn. Hãy đăng nhập để tiếp tục.</p>
            <button
              onClick={onNavigateLogin}
              className="w-full py-3 bg-primary text-white rounded-xl"
              style={{ fontWeight: 700 }}
            >
              Đăng nhập ngay
            </button>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name */}
              <div>
                <label className="text-sm mb-1.5 block" style={{ fontWeight: 600 }}>Họ và tên</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Nguyễn Văn An"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm mb-1.5 block" style={{ fontWeight: 600 }}>Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="text-sm mb-1.5 block" style={{ fontWeight: 600 }}>Vai trò</label>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="patient">Bệnh nhân</option>
                  <option value="doctor">Bác sĩ</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm mb-1.5 block" style={{ fontWeight: 600 }}>Mật khẩu</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Ít nhất 8 ký tự"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          className="h-1.5 flex-1 rounded-full transition-colors"
                          style={{ backgroundColor: i <= pwStrength ? strengthColors[pwStrength] : "#E8EDF4" }}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColors[pwStrength] }}>
                      {strengthLabels[pwStrength]}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="text-sm mb-1.5 block" style={{ fontWeight: 600 }}>Xác nhận mật khẩu</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ borderColor: form.confirmPassword && form.confirmPassword !== form.password ? "#B71C1C" : undefined }}
                  />
                </div>
                {form.confirmPassword && form.confirmPassword !== form.password && (
                  <p className="text-xs mt-1" style={{ color: "#B71C1C" }}>Mật khẩu không khớp</p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a>{" "}
                  và{" "}
                  <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a>
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed || form.password !== form.confirmPassword}
                className="w-full py-3 bg-primary text-white rounded-xl transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontWeight: 700, fontSize: "1rem" }}
              >
                Đăng ký
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-5">
              Đã có tài khoản?{" "}
              <button onClick={onNavigateLogin} className="text-primary hover:underline" style={{ fontWeight: 600 }}>
                Đăng nhập
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
