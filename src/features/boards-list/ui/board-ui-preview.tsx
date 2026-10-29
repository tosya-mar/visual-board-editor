const FILL = "#9991F5";
const STROKE = "#0C084C";
const BG = "#F9EAEA";

function ChunkyCard({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <g>
      <rect
        x={x + 4}
        y={y + 4}
        width={width}
        height={height}
        rx="16"
        fill={FILL}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="16"
        fill={BG}
        stroke={STROKE}
        strokeWidth="5"
      />
      <rect
        x={x + 14}
        y={y + 18}
        width={width * 0.45}
        height="8"
        rx="4"
        fill={FILL}
      />
      <rect
        x={x + 14}
        y={y + 36}
        width={width * 0.7}
        height="6"
        rx="3"
        fill={STROKE}
        opacity="0.2"
      />
      <rect
        x={x + 14}
        y={y + 50}
        width={width * 0.55}
        height="6"
        rx="3"
        fill={STROKE}
        opacity="0.2"
      />
    </g>
  );
}

export function BoardUiPreview() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      <svg
        className="size-full"
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <ChunkyCard x={28} y={28} width={100} height={78} />
        <ChunkyCard x={180} y={40} width={96} height={70} />
        <ChunkyCard x={96} y={118} width={110} height={64} />

        <circle cx="250" cy="150" r="18" fill={FILL} />
        <circle
          cx="246"
          cy="146"
          r="18"
          fill="none"
          stroke={STROKE}
          strokeWidth="5"
        />
      </svg>
    </div>
  );
}
