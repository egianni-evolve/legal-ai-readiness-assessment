"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { DIMENSIONS } from "@/lib/constants";
import type { DimensionKey } from "@/lib/types";

interface DimensionBarsProps {
  dimensionScores: Record<DimensionKey, number>;
}

export default function DimensionBars({ dimensionScores }: DimensionBarsProps) {
  const data = DIMENSIONS.map((dim) => ({
    name: dim.name,
    score: dimensionScores[dim.key],
  }));

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
        >
          <XAxis
            type="number"
            domain={[0, 5]}
            tick={{ fill: "#8A95A8", fontSize: 11 }}
            tickCount={6}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={170}
            tick={{ fill: "#C5CDD8", fontSize: 12, fontFamily: "Arial" }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={index} fill="#C9953E" />
            ))}
            <LabelList
              dataKey="score"
              position="right"
              style={{ fill: "#C9A84C", fontSize: 13, fontFamily: "Arial", fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
