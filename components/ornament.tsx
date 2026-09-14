/* Subtle Kyrgyz-inspired ornamental divider (decorative). */
export function Ornament({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <svg width="46" height="20" viewBox="0 0 46 20" fill="none" style={{ color }}>
        <path
          d="M23 2c3 3 3 6 0 8-3-2-3-5 0-8Zm0 16c-3-3-3-6 0-8 3 2 3 5 0 8Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <path d="M9 10c4-4 8-4 10 0-2 4-6 4-10 0Z" stroke={color} strokeWidth="1" fill="none" />
        <path d="M37 10c-4-4-8-4-10 0 2 4 6 4 10 0Z" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="23" cy="10" r="1.4" fill={color} />
      </svg>
      <span className="h-px w-10 sm:w-16" style={{ background: `linear-gradient(270deg, transparent, ${color})` }} />
    </div>
  )
}
