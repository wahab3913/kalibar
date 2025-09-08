'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

type SeriesPoint = {
  name: string;
  value: number;
};

interface LatestChartProps {
  title?: string;
  xAxisLabels?: string[];
  series?: SeriesPoint[];
}

export default function LatestChart({
  title = 'Latest Metrics',
  xAxisLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 200 },
    { name: 'Wed', value: 150 },
    { name: 'Thu', value: 80 },
    { name: 'Fri', value: 70 },
    { name: 'Sat', value: 110 },
    { name: 'Sun', value: 130 },
  ],
}: LatestChartProps) {
  const lineColor = '#2563eb';
  const areaTop = 'rgba(37, 99, 235, 0.25)';
  const areaBottom = 'rgba(37, 99, 235, 0.02)';

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: title,
      left: 'left',
      textStyle: {
        color: '#0f172a',
        fontSize: 14,
        fontWeight: 600,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: { left: 8, right: 8, bottom: 8, top: 36, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisLabels,
      axisLine: { lineStyle: { color: 'rgba(0,0,0,0.3)' } },
      axisLabel: { color: 'rgba(0,0,0,0.6)' },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.08)' } },
      axisLabel: { color: 'rgba(0,0,0,0.6)' },
    },
    series: [
      {
        name: 'Value',
        type: 'line',
        smooth: true,
        showSymbol: false,
        emphasis: { focus: 'series' },
        data: series.map((p) => p.value),
        lineStyle: { width: 3, color: lineColor },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: areaTop },
              { offset: 1, color: areaBottom },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: 280, width: '100%' }}
      />
    </div>
  );
}
