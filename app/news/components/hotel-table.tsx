import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Star } from "lucide-react";

const HotelsTable = ({hotels}: {hotels: {id: string, name: string}[]}) => {
    return (
        <>
        <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Available Hotel Companies
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead>Company Name</TableHead>
                                            <TableHead className="w-[100px]">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {hotels.map((hotel, index) => (
                                            <TableRow key={hotel.id} className="">
                                                <TableCell className="font-mono text-sm">
                                                    {hotel.id}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {hotel.name}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                                        <Star className="w-3 h-3 mr-1" />
                                                        Active
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
        </>
    )
}
export default HotelsTable;