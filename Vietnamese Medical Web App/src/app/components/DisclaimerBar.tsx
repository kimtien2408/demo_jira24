import { AlertCircle } from "lucide-react";

interface DisclaimerBarProps {
  text?: string;
  variant?: "bottom" | "inline";
}

export function DisclaimerBar({
  text = "Kết quả chỉ mang tính tham khảo. Vui lòng tham khảo ý kiến bác sĩ hoặc dược sĩ trước khi sử dụng thuốc.",
  variant = "inline",
}: DisclaimerBarProps) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg ${variant === "bottom" ? "fixed bottom-0 left-0 right-0 z-40 rounded-none border-t" : ""}`}
      style={{
        backgroundColor: "#FFFBEB",
        borderLeft: "4px solid #F59E0B",
        border: variant === "bottom" ? "none" : undefined,
        borderTop: variant === "bottom" ? "1px solid #F3D77B" : undefined,
        borderLeftWidth: variant === "bottom" ? "0" : "4px",
        borderLeftColor: variant === "bottom" ? "transparent" : "#F59E0B",
        borderLeftStyle: "solid",
      }}
    >
      <AlertCircle size={16} style={{ color: "#92400E", flexShrink: 0, marginTop: 2 }} />
      <p style={{ color: "#92400E", fontSize: "0.8rem", fontStyle: "italic", margin: 0 }}>
        {text}
      </p>
    </div>
  );
}
