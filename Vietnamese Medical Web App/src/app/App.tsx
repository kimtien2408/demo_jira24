import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { InteractionPage } from "./pages/InteractionPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminDrugPage } from "./pages/AdminDrugPage";
import { AdminDiseasePage } from "./pages/AdminDiseasePage";
import { ResultsPage } from "./pages/ResultsPage";
import { DashboardPage } from "./pages/DashboardPage";

type Page = "home" | "interaction" | "register" | "profile" | "admin-drug" | "admin-disease" | "results" | "dashboard";
type Role = "guest" | "patient" | "doctor" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [userRole, setUserRole] = useState<Role>("guest");

  const handleNavigate = (page: Page) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} userRole={userRole} />

      {/* Role switcher for demo */}
      <div className="bg-primary/5 border-b border-border px-4 py-2 flex items-center gap-3 flex-wrap">
        <span className="text-xs text-muted-foreground" style={{ fontWeight: 600 }}>Demo vai trò:</span>
        {(["guest", "patient", "doctor", "admin"] as Role[]).map(r => (
          <button
            key={r}
            onClick={() => setUserRole(r)}
            className="px-3 py-1 rounded-full text-xs transition-colors"
            style={userRole === r
              ? { backgroundColor: "#1F5C99", color: "white", fontWeight: 700 }
              : { backgroundColor: "white", color: "#5A6B80", border: "1px solid rgba(31,92,153,0.2)" }
            }
          >
            {r === "guest" ? "Khách" : r === "patient" ? "Bệnh nhân" : r === "doctor" ? "Bác sĩ" : "Admin"}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">· Trang:</span>
        {([
          ["home", "MB01 Tra cứu"],
          ["interaction", "MB02 Tương tác"],
          ["register", "MB03 Đăng ký"],
          ["profile", "MB04 Hồ sơ"],
          ["admin-drug", "MB05 Thuốc"],
          ["admin-disease", "MB06 Bệnh"],
          ["results", "MB07 Kết quả"],
          ["dashboard", "MB08 Dashboard"],
        ] as [Page, string][]).map(([p, label]) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className="px-3 py-1 rounded-full text-xs transition-colors"
            style={currentPage === p
              ? { backgroundColor: "#1B5E20", color: "white", fontWeight: 700 }
              : { backgroundColor: "white", color: "#5A6B80", border: "1px solid rgba(27,94,32,0.2)" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {currentPage === "home" && <HomePage onViewResults={() => setCurrentPage("results")} />}
      {currentPage === "interaction" && <InteractionPage />}
      {currentPage === "register" && <RegisterPage onNavigateLogin={() => setCurrentPage("home")} />}
      {currentPage === "profile" && <ProfilePage />}
      {currentPage === "admin-drug" && <AdminDrugPage />}
      {currentPage === "admin-disease" && <AdminDiseasePage />}
      {currentPage === "results" && <ResultsPage />}
      {currentPage === "dashboard" && <DashboardPage />}
    </div>
  );
}
