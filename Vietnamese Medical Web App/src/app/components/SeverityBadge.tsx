type Severity = "absolute" | "relative" | "safe";

interface SeverityBadgeProps {
  severity: Severity;
  size?: "sm" | "md";
}

const config = {
  absolute: { label: "Tuyệt đối", bg: "#FEECEC", text: "#B71C1C", border: "#F5C6C6" },
  relative: { label: "Tương đối", bg: "#FEF9EC", text: "#7B4F00", border: "#F7E6B0" },
  safe: { label: "An toàn", bg: "#EBF5EB", text: "#1B5E20", border: "#B8DFB8" },
};

export function SeverityBadge({ severity, size = "md" }: SeverityBadgeProps) {
  const { label, bg, text, border } = config[severity];
  return (
    <span
      style={{
        backgroundColor: bg,
        color: text,
        border: `1px solid ${border}`,
        fontSize: size === "sm" ? "0.7rem" : "0.75rem",
        fontWeight: 600,
        padding: size === "sm" ? "1px 8px" : "2px 10px",
        borderRadius: "999px",
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}
