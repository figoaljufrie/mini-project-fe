'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

interface ChartRadialProps {
  value: number; // percentage
}

export function ChartRadial({ value }: ChartRadialProps) {
  const data = [{ name: 'Progress', value, fill: '#3b82f6' }];

  return (
    <div className="w-full h-40">
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={50}
            background
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-center font-medium mt-2">{value}%</p>
    </div>
  );
}