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
      date: "2025-01-01",
      isStockMarketUpOrDown: "Up",
      news: "New CEO will be appointed",
      impact: "Positive",
    },
    {
      date: "2025-01-01",
      isStockMarketUpOrDown: "Down",
      news: "New CEO will be appointed",
      impact: "Positive",
    },
    {
      date: "2025-01-01",
      isStockMarketUpOrDown: "Up",
      news: "New CEO will be appointed",
      impact: "Negative",
    },
    {
      date: "2025-01-01",
      isStockMarketUpOrDown: "Up",
      news: "New CEO will be appointed",
      impact: "Positive",
    },
    {
      date: "2025-01-01",
      isStockMarketUpOrDown: "Up",
      news: "New CEO will be appointed",
      impact: "Positive",
    },
    {
      date: "2025-01-01",
      isStockMarketUpOrDown: "Up",
      news: "New CEO will be appointed",
      impact: "Positive",
    },
    {
      date: "2025-01-01",
      isStockMarketUpOrDown: "Up",
      news: "New CEO will be appointed",
      impact: "Positive",
    },
  ]
  
  export function NewsTable() {
    return (
      <Table>
        <TableCaption>A list of News and their impact.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="w-[100px]">Stock</TableHead>
            <TableHead className="">News</TableHead> 
            <TableHead className="">Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice,index) => (
            <TableRow key={index}>
              <TableCell>{invoice.date}</TableCell>
              <TableCell className="font-medium">{invoice.isStockMarketUpOrDown}</TableCell>
              <TableCell>{invoice.news}</TableCell>
              <TableCell className="text-right">{invoice.impact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  