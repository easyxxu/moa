"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Scale,
  Tick,
  TooltipItem,
  ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProp {
  chartTitle: string;
  labels: string[];
}

interface LineChartProps extends ChartProp {
  totalPriceData: number[];
}

export function LineChart({
  chartTitle,
  labels,
  totalPriceData,
}: LineChartProps) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        align: "start",
        text: chartTitle,
        font: { family: "Pretendard", size: 20, weight: 500 },
        color: "black",
      },
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<"line">[]) => {
            return context[0].label + "월";
          },
          label: (context: TooltipItem<"line">) => {
            return context.formattedValue + "원";
          },
        },
        backgroundColor: "#797979",
      },
    },
    scales: {
      x: {
        afterTickToLabelConversion: function (scaleInstance: Scale) {
          scaleInstance.ticks.forEach((tick: Tick) => {
            if (typeof tick.label === "string") {
              tick.label = parseInt(tick.label.split("-")[1]) + "월";
            }
          });
        },
      },
      y: {
        afterDataLimits: (scale: Scale) => {
          scale.max = scale.max * 1.5;
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "2024",
        data: totalPriceData,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

interface BarChartProps extends ChartProp {
  totalCountData: number[];
}

export function BarChart({
  chartTitle,
  labels,
  totalCountData,
}: BarChartProps) {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        align: "start",
        text: chartTitle,
        font: {
          family: "Pretendard",
          size: 20,
          weight: 500,
        },
        color: "black",
      },
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<"bar">[]) => {
            return context[0].label + "월";
          },
          label: (context: TooltipItem<"bar">) => {
            return context.formattedValue + "건";
          },
        },
        backgroundColor: "#797979",
      },
    },
    scales: {
      x: {
        afterTickToLabelConversion: function (scaleInstance: Scale) {
          scaleInstance.ticks.forEach((tick: Tick) => {
            if (typeof tick.label === "string") {
              tick.label = parseInt(tick.label.split("-")[1]) + "월";
            }
          });
        },
      },
      y: {
        afterDataLimits: (scale: Scale) => {
          scale.max = scale.max * 1.5;
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        // label: "2024",
        data: totalCountData,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
