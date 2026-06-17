import { useState } from "react";
import { Search, User, Menu, X, Shield, ChevronDown } from "lucide-react";

type Page = "home" | "interaction" | "register" | "profile" | "admin-drug" | "admin-disease" | "results" | "dashboard";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userRole: "guest" | "patient" | "doctor" | "admin";
}

export function Navbar({ currentPage, onNavigate, userRole }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { label: "Tra cứu thuốc", page: "home" as Page },
    { label: "Kiểm tra tương tác", page: "interaction" as Page },
    ...(userRole !== "guest" ? [{ label: "Hồ sơ bệnh nhân", page: "profile" as Page }] : []),
    ...(userRole === "admin" ? [
      { label: "Quản lý thuốc", page: "admin-drug" as Page },
      { label: "Dashboard", page: "dashboard" as Page },
    ] : []),
  ];

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-primary" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
              ThuốcAnToàn
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  currentPage === link.page
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {userRole === "guest" ? (
              <button
                onClick={() => onNavigate("register")}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <User size={15} />
                Đăng nhập / Đăng ký
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm" style={{ fontWeight: 600 }}>
                    {userRole === "admin" ? "AD" : userRole === "doctor" ? "BS" : "BN"}
                  </div>
                  <span className="text-sm text-foreground hidden sm:block">
                    {userRole === "admin" ? "Admin" : userRole === "doctor" ? "Bác sĩ" : "Bệnh nhân"}
                  </span>
                  {userRole === "admin" && (
                    <span className="px-2 py-0.5 bg-destructive text-destructive-foreground rounded-full text-xs" style={{ fontWeight: 600 }}>
                      ADMIN
                    </span>
                  )}
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-card rounded-xl shadow-lg border border-border py-1 z-50">
                    <button
                      onClick={() => { onNavigate("profile"); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-foreground"
                    >Hồ sơ cá nhân</button>
                    <button
                      onClick={() => { setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-destructive"
                    >Đăng xuất</button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                currentPage === link.page
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
