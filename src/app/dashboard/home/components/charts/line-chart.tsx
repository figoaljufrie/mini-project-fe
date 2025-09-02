'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartLineProps {
  data: { name: string; value: number }[];
}

export function ChartLine({ data }: ChartLineProps) {
  return (
    <div className="w-full h-60">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}