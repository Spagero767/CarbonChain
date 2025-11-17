import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { carbonCredits } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function CreditsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Carbon Credits</h1>
        <p className="text-muted-foreground">Track and manage all carbon credits in your portfolio.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Credit Ledger</CardTitle>
          <CardDescription>A complete record of your owned carbon credits.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Credit ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Vintage</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Amount (tCO₂e)</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead>Retired Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carbonCredits.map((credit) => (
                <TableRow key={credit.id}>
                  <TableCell className="font-medium">{credit.id}</TableCell>
                  <TableCell>{credit.projectName}</TableCell>
                  <TableCell>{credit.vintage}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      credit.status === 'Retired' ? 'destructive' 
                      : credit.status === 'For Sale' ? 'secondary'
                      : 'default'
                    }
                    className={cn(
                        credit.status === 'Issued' && 'bg-primary/20 text-primary border-primary/40 hover:bg-primary/30',
                        credit.status === 'For Sale' && 'bg-accent/50 text-accent-foreground border-accent/40 hover:bg-accent/60',
                        credit.status === 'Retired' && 'bg-destructive/20 text-destructive border-destructive/40 hover:bg-destructive/30',
                    )}
                    >
                      {credit.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{credit.amount.toLocaleString()}</TableCell>
                  <TableCell>{credit.issuedDate}</TableCell>
                  <TableCell>{credit.retiredDate || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
