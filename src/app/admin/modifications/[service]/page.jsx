'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Plus, Trash2, ArrowLeft, Loader2, Pencil, Save, X } from 'lucide-react'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { API } from '@/lib/data-service'
import { Badge } from '@/components/ui/badge'
import AdminHeader from '@/components/AdminHeader'

const ServiceManagementPage = () => {
    const params = useParams()
    const router = useRouter()
    const serviceName = decodeURIComponent(params.service)
    const [subServices, setSubServices] = useState([])
    const [newSubService, setNewSubService] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`${API}/api/services/services/${serviceName}`)
                if (!response.ok) throw new Error('Service not found')
                const data = await response.json()
                setSubServices(data.subServices.map(sub => ({
                    name: sub,
                    isEditing: false,
                    tempName: sub
                })))
            } catch (error) {
                toast.error('Failed to load service')
            } finally {
                setIsLoading(false)
            }
        }

        fetchService()
    }, [serviceName])

    const handleAddSubService = async () => {
        if (!newSubService.trim()) {
            toast.warning('Please enter a subservice name')
            return
        }

        try {
            setIsSubmitting(true)
            const response = await fetch(`${API}/api/services/${serviceName}/subservices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newSubService.trim() }),
            })

            if (!response.ok) throw new Error('Failed to add subservice')

            const updatedService = await response.json()
            setSubServices(updatedService.subServices.map(sub => ({
                name: sub,
                isEditing: false,
                tempName: sub
            })))
            setNewSubService('')
            toast.success('Subservice added successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEditToggle = (index) => {
        const updated = [...subServices]
        updated[index].isEditing = !updated[index].isEditing
        updated[index].tempName = updated[index].name
        setSubServices(updated)
    }

    const handleEditChange = (index, value) => {
        const updated = [...subServices]
        updated[index].tempName = value
        setSubServices(updated)
    }

    const handleSaveEdit = async (index) => {
        const newName = subServices[index].tempName.trim()
        if (!newName) {
            toast.warning('Subservice name cannot be empty')
            return
        }

        try {
            setIsSubmitting(true)
            const response = await fetch(`${API}/api/services/${serviceName}/subservices`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldName: subServices[index].name,
                    newName
                }),
            })

            if (!response.ok) throw new Error('Failed to update subservice')

            const updatedService = await response.json()
            setSubServices(updatedService.subServices.map(sub => ({
                name: sub,
                isEditing: false,
                tempName: sub
            })))
            toast.success('Subservice updated successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (subServiceName) => {
        try {
            setIsSubmitting(true)
            const response = await fetch(`${API}/api/services/${serviceName}/subservices`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: subServiceName }),
            })

            if (!response.ok) throw new Error('Failed to delete subservice')

            const updatedService = await response.json()
            setSubServices(updatedService.subServices.map(sub => ({
                name: sub,
                isEditing: false,
                tempName: sub
            })))
            toast.success('Subservice deleted successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-green-700" />
            </div>
        )
    }

    return (
        <>
            <AdminHeader />
            <div className="container mx-auto py-8">
                <Button
                    variant="ghost"
                    className="mb-6"
                    onClick={() => router.push("/admin/modifications")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <Card className="border-green-700">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-green-700">
                            Manage Service: {serviceName}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-6">
                            {/* Existing Subservices */}
                            <div>
                                <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Current Subservices
                                </Label>
                                <div className="space-y-3">
                                    {subServices.length === 0 ? (
                                        <p className="text-gray-500">No subservices found</p>
                                    ) : (
                                        subServices.map((subService, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                {subService.isEditing ? (
                                                    <>
                                                        <Input
                                                            value={subService.tempName}
                                                            onChange={(e) => handleEditChange(index, e.target.value)}
                                                            className="flex-1"
                                                        />
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => handleSaveEdit(index)}
                                                            disabled={isSubmitting}
                                                        >
                                                            <Save className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => handleEditToggle(index)}
                                                            disabled={isSubmitting}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Badge variant="outline" className="flex-1 justify-start px-4 py-2">
                                                            {subService.name}
                                                        </Badge>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => handleEditToggle(index)}
                                                            disabled={isSubmitting}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(subService.name)}
                                                            disabled={isSubmitting}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Add New Subservice */}
                            <div>
                                <Label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Add New Subservice
                                </Label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        value={newSubService}
                                        onChange={(e) => setNewSubService(e.target.value)}
                                        placeholder="Enter new subservice name"
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleAddSubService}
                                        disabled={isSubmitting || !newSubService.trim()}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ServiceManagementPage