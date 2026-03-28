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

export default function RadarChart({ dimensionScores }: RadarChartProps) {
  const data = DIMENSIONS.map((dim) => ({
    dimension: dim.name.replace(" & ", "\n& "),
    score: dimensionScores[dim.key],
    fullMark: 5,
  }));

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#243352" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "#C5CDD8", fontSize: 11, fontFamily: "Arial" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: "#8A95A8", fontSize: 10 }}
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
