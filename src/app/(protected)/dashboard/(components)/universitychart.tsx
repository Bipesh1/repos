"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { getActiveUniversities } from "../../actions/university"
import { useEffect, useState } from "react"



const chartConfig = {
  universities: {
    label: "Universities",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function UniversityChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActiveUniversities();
        const universities= response.data || []
        // Transform data: count universities per country
        const countryCounts = universities.reduce((acc:any, uni:any) => {
          const countryName = uni.country?.name || "Unknown"; // Handle missing country
          acc[countryName] = (acc[countryName] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Convert to chart format and sort by count (descending)
        const formattedData = Object.entries(countryCounts)
          .map(([country, count]) => ({
            country,
            universities: count
          }))
          .sort((a:any, b:any) => b.universities - a.universities);

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading university data...</div>;

  return (
    <div className="min-h-[200px] max-w-[500px] ">
      <h2 className="mb-4 text-lg ">Universities by Country</h2>
      <ChartContainer config={chartConfig}>
        <BarChart 
          width={500} 
          height={300} 
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="country"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.length > 6 ? `${value.slice(0, 6)}...` : value}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />} 
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />
          <Bar 
            barSize={30} 
            dataKey="universities" 
            fill="#2563eb" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}