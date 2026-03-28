"use client";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { DIMENSIONS } from "@/lib/constants";
import type { DimensionKey } from "@/lib/types";

interface RadarChartProps {
  dimensionScores: Record<DimensionKey, number>;
}

const SHORT_NAMES: Record<DimensionKey, string[]> = {
  data_readiness: ["Data &", "Documents"],
  process_maturity: ["Process", "Maturity"],
  tech_infrastructure: ["Technology"],
  governance_risk: ["Governance", "& Risk"],
  people_culture: ["People &", "Culture"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderAxisTick(props: any) {
  const { payload, x, y, cx, cy } = props;
  const dx = x - cx;
  const dy = y - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nudge = 28;
  const newX = x + (dx / len) * nudge;
  const newY = y + (dy / len) * nudge;

  let anchor: "start" | "middle" | "end" = "middle";
  if (dx > 15) anchor = "start";
  else if (dx < -15) anchor = "end";

  // Look up the wrapped lines
  const key = Object.entries(SHORT_NAMES).find(
    ([, lines]) => lines.join(" ") === payload.value || lines[0] === payload.value
  );
  const lines = key ? key[1] : [payload.value];

  return (
    <text
      x={newX}
      y={newY}
      textAnchor={anchor}
      dominantBaseline="central"
      fill="#C5CDD8"
      fontSize={10}
      fontFamily="Arial"
    >
      {lines.map((line, i) => (
        <tspan x={newX} dy={i === 0 ? 0 : 13} key={i}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default function RadarChart({ dimensionScores }: RadarChartProps) {
  const data = DIMENSIONS.map((dim) => ({
    dimension: SHORT_NAMES[dim.key][0],
    dimensionKey: dim.key,
    score: dimensionScores[dim.key],
    fullMark: 5,
  }));

  return (
    <div className="w-full h-[420px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart
          cx="50%"
          cy="50%"
          outerRadius="65%"
          data={data}
        >
          <PolarGrid stroke="#243352" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={renderAxisTick}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: "#8A95A8", fontSize: 9 }}
            tickCount={6}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#C9953E"
            fill="#C9953E"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
