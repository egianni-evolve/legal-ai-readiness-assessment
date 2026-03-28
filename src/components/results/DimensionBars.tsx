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

const SHORT_NAMES: Record<DimensionKey, string> = {
  data_readiness: "Data & Documents",
  process_maturity: "Process Maturity",
  tech_infrastructure: "Technology",
  governance_risk: "Governance & Risk",
  people_culture: "People & Culture",
};

export default function DimensionBars({ dimensionScores }: DimensionBarsProps) {
  const data = DIMENSIONS.map((dim) => ({
    name: SHORT_NAMES[dim.key],
    score: dimensionScores[dim.key],
  }));

  return (
    <div className="w-full h-[350px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 50, left: 20, bottom: 5 }}
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
            width={160}
            tick={{ fill: "#C5CDD8", fontSize: 12, fontFamily: "Arial" }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={22}>
            {data.map((entry, index) => (
              <Cell key={index} fill="#C9953E" />
            ))}
            <LabelList
              dataKey="score"
              position="right"
              style={{
                fill: "#C9A84C",
                fontSize: 13,
                fontFamily: "Arial",
                fontWeight: 600,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
