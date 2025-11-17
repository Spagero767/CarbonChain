'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Trees, Users, Leaf, Calendar } from "lucide-react"

const reportData = {
  projectName: "Amazon Rainforest Conservation",
  dateRange: "Jan 2023 - Dec 2023",
  totalReduction: 45000, // tCO2e
  communityImpact: "Funded 3 local schools",
  biodiversityImpact: "Protected 15 endangered species",
  monthlyReduction: [
    { month: "Jan", reduction: 3200 },
    { month: "Feb", reduction: 2800 },
    { month: "Mar", reduction: 4100 },
    { month: "Apr", reduction: 3500 },
    { month: "May", reduction: 4500 },
    { month: "Jun", reduction: 3900 },
    { month: "Jul", reduction: 4200 },
    { month: "Aug", reduction: 4800 },
    { month: "Sep", reduction: 3600 },
    { month: "Oct", reduction: 3900 },
    { month: "Nov", reduction: 4300 },
    { month: "Dec", reduction: 5200 },
  ],
};

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Proof-of-Impact Report</h1>
        <p className="text-muted-foreground">Detailed report on the environmental and social impact of your projects.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{reportData.projectName}</CardTitle>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{reportData.dateRange}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total CO₂e Reduced</CardTitle>
                <Trees className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.totalReduction.toLocaleString()} t</div>
                <p className="text-xs text-muted-foreground">Equivalent to emissions from 9,784 homes' electricity use for one year.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Benefits</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 Schools Funded</div>
                <p className="text-xs text-muted-foreground">Providing education for over 500 children in local communities.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Biodiversity Impact</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 Species Protected</div>
                <p className="text-xs text-muted-foreground">Including the Jaguar, Golden Lion Tamarin, and Giant Otter.</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Verified Carbon Reduction (tCO₂e)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.monthlyReduction}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--primary), 0.1)' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar dataKey="reduction" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
