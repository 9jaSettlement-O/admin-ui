export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center font-bold ${className ?? ""}`}>
      <span style={{ color: "#C9343A" }} className="whitespace-nowrap">
        9JA SETTLEMENT
      </span>
    </div>
  );
}
