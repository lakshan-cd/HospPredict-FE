import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const invoices = [
    {
      indicator: "Inflation",
      date: "2025-01-01",
      value: "2.5%",
      impact: "Positive",
    },
    {
      indicator: "GDP Growth",
      date: "2025-01-01",
      value: "2.5%",
      impact: "Positive",
    },
    {
      indicator: "Unemployment Rate",
      date: "2025-01-01",
      value: "3.5%",
      impact: "Negative",
    },
    {
      indicator: "Interest Rates",
      date: "2025-01-01",
      value: "2.5%",
      impact: "Positive",
    },
  ]
  
  export function EconomicIndicators() {
    return (
      <Table>
        <TableCaption>A list of Indicators and their impact.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Indicator</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-right">Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.indicator}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.value}</TableCell>
              <TableCell className="text-right">{invoice.impact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  