// Copyright (c) 2025 Raj 
// See LICENSE for details.

export function FestivalFlags() {
  const colors = ["#ff4d4f", "#40a9ff", "#73d13d", "#9254de", "#ffd666"]

  return (
    <div className="absolute top-0 w-full overflow-hidden">
      {[0, 1].map(row => (
        <div key={row} className="flag-row" style={{ top: row * 70 }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              className="flag"
              style={{ color: colors[i % colors.length] }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
