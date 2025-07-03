'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, Search, Trash2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { API } from '@/lib/data-service'
import { format } from 'date-fns';
import AdminHeader from '@/components/AdminHeader'
import Link from 'next/link'
export default function ProfessionalsPage() {
    const [professionals, setProfessionals] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [selectedAccountStatus, setSelectedAccountStatus] = useState('');
    const [holdReason, setHoldReason] = useState(professionals?.resaonOfHold);
    const [isRejectSelected, setIsRejectedSelected] = useState(false)
    const [rejectedReason, setRejectedReason] = useState(professionals?.reasonOfRejection)
    const limit = 10

    const fetchProfessionals = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API}/api/admin/getAllProfessionals`, {
                params: {
                    page: currentPage,
                    limit,
                    search: searchTerm
                }
            })
            setProfessionals(response.data.data.providers)
            setTotalPages(response.data.data.pagination.totalPages)
            setTotalCount(response.data.data.pagination.totalProviders)
        } catch (error) {
            toast.error('Failed to fetch professionals')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProfessionals()
        }, 500)

        return () => clearTimeout(timer)
    }, [currentPage, searchTerm])

    const deleteProfessional = async (id) => {
        try {
            await axios.delete(`${API}/api/admin/deleteProfessional/${id}`)
            toast.success('Professional deleted successfully')
            fetchProfessionals()
        } catch (error) {
            toast.error('Failed to delete professional')
        }
    }

    const updateVerificationStatus = async (id, status, reason) => {
        try {
            await axios.put(`${API}/api/admin/updateVerificationStatus/${id}`, {
                status,
                reasonOfRejection: reason
            })
            toast.success(`Verification status updated to ${status}`)
            fetchProfessionals()
        } catch (error) {
            toast.error('Failed to update verification status')
        }
    }

    const updateAccountStatus = async (id, status, reason) => {
        try {
            console.log("Sending:", {
                accountStatus: status,
                reasonOfHold: reason
            });
            await axios.put(`${API}/api/admin/updateAccountStatus/${id}`, {
                accountStatus: status,
                reasonOfHold: reason
            })
            toast.success(`Account status updated to ${status}`)
            fetchProfessionals()
        } catch (error) {
            toast.error('Failed to update account status')
        }
    }

    const StatusBadge = ({ status }) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
            case 'pending':
                return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
            case 'rejected':
                return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
            case 'working':
                return <Badge className="bg-blue-500 hover:bg-blue-600">Active</Badge>
            case 'on_hold':
                return <Badge className="bg-orange-500 hover:bg-orange-600">On Hold</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }
    const formatDate = (date) => {
        if (!date) return "N/A"; // Handle null/undefined

        // If already a Date object, use it directly
        const parsedDate = date instanceof Date ? date : new Date(date);


        // Check if valid
        return isNaN(parsedDate.getTime())
            ? "N/A"
            : format(parsedDate, 'MM/dd/yyyy');
    };
    return (
        <>
            <AdminHeader />
            <div className="container mx-auto max-w-6xl py-8">
                <Toaster /> {/* Add Toaster component at the root */}

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Manage Professionals</h1>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search professionals..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Verification</TableHead>
                                        <TableHead>Account Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {professionals.map((professional) => (
                                        <TableRow key={professional._id}>
                                            <TableCell>
                                                <Link href={`/professionals${professional.name}`} target='_blank'>
                                                    {professional.name}
                                                </Link>

                                            </TableCell>
                                            <TableCell>{professional.email}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={professional.status} />
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={professional.accountStatus} />
                                            </TableCell>

                                            <TableCell className="text-right space-x-2">
                                                {/* Verification Status Dialog */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            Verify
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Update Verification Status</DialogTitle>
                                                            <DialogDescription>
                                                                Current status: {professional.status}
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <div className="space-y-6">
                                                            {/* Document Viewer Section */}
                                                            {professional.verificationDocument && (
                                                                <div className="border rounded-lg p-4">
                                                                    <h3 className="font-medium mb-2">Verification Documents</h3>
                                                                    <div className="h-96">
                                                                        <iframe
                                                                            src={`${API}${professional.verificationDocument}`}
                                                                            className="w-full h-full border rounded"
                                                                            title="Verification Document"
                                                                        />
                                                                        <div className="mt-2 flex justify-end">
                                                                            <Button asChild variant="outline" size="sm">
                                                                                <a
                                                                                    href={`${API}${professional.verificationDocument}`}
                                                                                    download
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    Download Document
                                                                                </a>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Status Update Section */}
                                                            <div className="space-y-4">
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        if (value === 'rejected') {
                                                                            setIsRejectedSelected(true);
                                                                        } else {
                                                                            updateVerificationStatus(professional._id, value);
                                                                            setIsRejectedSelected(false); // Reset when selecting other options
                                                                        }
                                                                    }}
                                                                    defaultValue={professional.status}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select status" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="approved">
                                                                            <div className="flex items-center">
                                                                                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                                                                Approve
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value="rejected">
                                                                            <div className="flex items-center">
                                                                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                                                                Reject
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value="pending">
                                                                            <div className="flex items-center">
                                                                                <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                                                                                Pending
                                                                            </div>
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>

                                                                {isRejectSelected && (
                                                                    <>
                                                                        <Input
                                                                            placeholder="Reason for rejection"
                                                                            defaultValue={professional.reasonOfRejection}
                                                                            onChange={(e) => {
                                                                                setRejectedReason(e.target.value)
                                                                            }}
                                                                            value={rejectedReason}
                                                                        />
                                                                        <div className=' flex justify-end'>
                                                                            <Button onClick={() => updateVerificationStatus(professional?._id, 'rejected', rejectedReason)} variant={"ghost"} className={"border bg-black text-white cursor-pointer"}>Submit</Button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Account Status Dialog */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            Account
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Update Account Status</DialogTitle>
                                                            <DialogDescription>
                                                                Current status: {professional.accountStatus}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <Select
                                                                onValueChange={(value) => {
                                                                    // Just track the selected value, don't submit yet
                                                                    setSelectedAccountStatus(value);
                                                                }}
                                                                defaultValue={professional.accountStatus}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="working">
                                                                        <div className="flex items-center">
                                                                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                                                            Active
                                                                        </div>
                                                                    </SelectItem>
                                                                    <SelectItem value="on_hold">
                                                                        <div className="flex items-center">
                                                                            <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                                                                            On Hold
                                                                        </div>
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>

                                                            {selectedAccountStatus === 'on_hold' && (
                                                                <>
                                                                    <Input
                                                                        placeholder="Reason for hold"
                                                                        value={holdReason}
                                                                        onChange={(e) => setHoldReason(e.target.value)}
                                                                    />
                                                                    <div className='flex justify-end'>
                                                                        <Button
                                                                            onClick={() => {
                                                                                updateAccountStatus(
                                                                                    professional._id,
                                                                                    selectedAccountStatus,
                                                                                    holdReason
                                                                                );
                                                                            }}
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {selectedAccountStatus !== 'on_hold' && (
                                                                <div className='flex justify-end'>
                                                                    <Button
                                                                        onClick={() => {
                                                                            updateAccountStatus(
                                                                                professional._id,
                                                                                selectedAccountStatus,
                                                                                null // No reason needed for active status
                                                                            );
                                                                        }}
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Delete Dialog */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone. This will permanently delete the professional.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() => deleteProfessional(professional._id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination className="mt-6">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                if (currentPage > 1) setCurrentPage(currentPage - 1)
                                            }}
                                            isActive={currentPage > 1}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setCurrentPage(page)
                                                }}
                                                isActive={page === currentPage}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                                            }}
                                            isActive={currentPage < totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}

                        <div className="mt-4 text-sm text-muted-foreground">
                            Showing {(currentPage - 1) * limit + 1}-
                            {Math.min(currentPage * limit, totalCount)} of {totalCount} professionals
                        </div>
                    </>
                )}
            </div>
        </>
    )
}