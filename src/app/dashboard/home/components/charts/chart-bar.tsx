'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartBarProps {
  data: { name: string; value: number }[];
}

export function ChartBar({ data }: ChartBarProps) {
  return (
    <div className="w-full h-60">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}