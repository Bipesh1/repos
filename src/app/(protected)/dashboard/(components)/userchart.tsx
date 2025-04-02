"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Text } from "recharts"
import { getActiveStudents } from "../../actions/student"
import { useEffect, useState } from "react"

const chartConfig = {
  students: {
    label: "Total Students",
    color: "#2563eb", // Blue color to match your first chart
  },
} satisfies ChartConfig

export function StudentChart() {
  const [totalStudents, setTotalStudents] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActiveStudents()
        const students = response.data || []
        setTotalStudents(students.length)
      } catch (error) {
        console.error("Error fetching students:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const chartData = [{ name: "Students", students: totalStudents }]

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading student data...</div>

  return (
    <div className="min-h-[200px] max-w-[500px] p-4">
      <h2 className="mb-4 text-lg font-semibold">Total Active Students</h2>
      
      {/* Main container with the count integrated */}
      <div className="relative">
        <ChartContainer config={chartConfig}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="students"
              fill="#2563eb"
              barSize={50}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            
            {/* Count displayed inside chart */}
            <Text
              x={250}
              y={150}
              textAnchor="middle"
              fill="#2563eb"
              fontSize={48}
              fontWeight="bold"
            >
              {totalStudents}
            </Text>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}