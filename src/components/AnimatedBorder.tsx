import { useRef, useState, useEffect } from 'react';

interface AnimatedBorderProps {
  borderRadius?: number;
  strokeColor?: string;
  cornerColor?: string;
  className?: string;
}

export default function AnimatedBorder({
  borderRadius = 18,
  strokeColor = 'rgba(218, 165, 32, 0.25)',
  cornerColor = 'rgba(218, 165, 32, 0.5)',
  className = '',
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { w, h } = size;
  const r = Math.min(borderRadius, w / 2, h / 2);
  const cs = 22; // corner accent size
  const p = 3; // padding from edge

  // Calculate perimeter for dash animation
  const perimeter = w > 0 && h > 0
    ? 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r
    : 0;

  return (
    <div ref={containerRef} className={`kriss-border-container ${className}`}>
      {w > 0 && h > 0 && (
        <svg
          className="kriss-border-svg"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          width={w}
          height={h}
        >
          {/* Main animated dashed border */}
          <rect
            className="kriss-border-rect"
            x={p}
            y={p}
            width={w - p * 2}
            height={h - p * 2}
            rx={r}
            ry={r}
            style={{
              stroke: strokeColor,
              strokeDasharray: `${perimeter * 0.02} ${perimeter * 0.01}`,
              strokeDashoffset: perimeter * 0.3,
            }}
          />

          {/* Corner accents */}
          <path
            className="kriss-border-corner"
            d={`M ${p + cs} ${p} L ${p + r} ${p} Q ${p} ${p} ${p} ${p + r} L ${p} ${p + cs}`}
            fill="none"
            style={{ stroke: cornerColor }}
          />
          <path
            className="kriss-border-corner"
            d={`M ${w - p - cs} ${p} L ${w - p - r} ${p} Q ${w - p} ${p} ${w - p} ${p + r} L ${w - p} ${p + cs}`}
            fill="none"
            style={{ stroke: cornerColor }}
          />
          <path
            className="kriss-border-corner"
            d={`M ${w - p} ${h - p - cs} L ${w - p} ${h - p - r} Q ${w - p} ${h - p} ${w - p - r} ${h - p} L ${w - p - cs} ${h - p}`}
            fill="none"
            style={{ stroke: cornerColor }}
          />
          <path
            className="kriss-border-corner"
            d={`M ${p} ${h - p - cs} L ${p} ${h - p - r} Q ${p} ${h - p} ${p + r} ${h - p} L ${p + cs} ${h - p}`}
            fill="none"
            style={{ stroke: cornerColor }}
          />
        </svg>
      )}
    </div>
  );
}
