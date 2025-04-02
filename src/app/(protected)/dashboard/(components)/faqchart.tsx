"use client"
  
import { ChartConfig, ChartContainer,ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState, useTransition } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { getActiveFaq } from "../../actions/faq"




const chartConfig = {
  faq: {
    label: "faq",
    color: "#2563eb",
  },
} satisfies ChartConfig
 
export function FaqChart() {
    const [pending,startTransition]= useTransition()
    const [length,setLength]= useState<any>(0)
    useEffect(()=>{
        startTransition(async()=>{
            const response= await getActiveFaq()
            setLength(response.data!.length)
        })
    },[])
    
const chartData = [
    { FAQ: "Faq", Numbers: length},
    
  ]
   
  return (
    <div className="min-h-[200px] max-w-[500px]">
    <h2>Total No. Of FAQ</h2>
    <ChartContainer config={chartConfig} >
      <BarChart accessibilityLayer data={chartData}>
      <CartesianGrid vertical={false} />
    <XAxis
      dataKey="FAQ"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="Numbers" barSize={50} fill="var(--color-faq)" radius={4} className="w-10" />
      </BarChart>
    </ChartContainer>
      </div>
  )
}