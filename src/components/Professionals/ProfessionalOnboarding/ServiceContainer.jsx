'use client'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Plus, Trash2, ChevronDown, ChevronUp, Check } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner"
import axios from "axios"
import { API } from "@/lib/data-service"
import { checkProviderAuthStatus } from "@/redux/slices/authSlice"

export function ServicesContainer() {
    const dispatch = useDispatch()
    const { provider } = useSelector(state => state.auth)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [categoriesLoading, setCategoriesLoading] = useState(true)
    const [formData, setFormData] = useState({
        category: '',
        serviceRadius: '120',
        postalCode: '',
        subcategories: []
    })
    const [selectedCategoryData, setSelectedCategoryData] = useState(null)

    // Initialize form data after mount
    useEffect(() => {
        if (provider?.postalCode) {
            setFormData(prev => ({
                ...prev,
                postalCode: provider.postalCode
            }))
        }
    }, [provider?.postalCode])

    // Fetch available categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true)
                const response = await axios.get(`${API}/api/category/categories`)
                setCategories(response.data || [])
            } catch (error) {
                toast.error("Failed to fetch categories")
                setCategories([])
            } finally {
                setCategoriesLoading(false)
            }
        }
        fetchCategories()
    }, [])

    const handleAddService = async () => {
        if (!formData.category || formData.subcategories.length === 0) {
            toast.error("Please select at least one category and subcategory");
            return;
        }

        // Validate required fields
        if (!formData.postalCode || !formData.serviceRadius) {
            toast.error("Please fill in all required fields (Postal Code and Service Radius)");
            return;
        }
        // Convert serviceRadius to number
        const serviceRadius = Number(formData.serviceRadius) || 120;
        const postalCode = (formData.postalCode) || provider.postalCode

        try {
            setLoading(true);


            const serviceData = {
                category: formData.category,
                postalCode: postalCode,
                serviceRadius: serviceRadius, // Ensure it's a number
                subcategories: formData.subcategories.map(sub => ({
                    subcategory: sub.subcategory,
                    subSubcategories: sub.subSubcategories || []
                }))
            };
            console.log(serviceData);

            const promise = await axios.put(
                `${API}/api/service-provider/add-more-category/${provider._id}`,
                {
                    selectedCategories: [serviceData],
                    // Add this to tell backend to only validate new entries
                    validateOnlyNew: true
                },
                { withCredentials: true }
            );

            toast.promise(promise, {
                loading: 'Adding service...',
                success: () => {
                    setOpenAddDialog(false);
                    // Reset form after successful submission
                    setFormData({
                        category: '',
                        serviceRadius: 30,
                        postalCode: provider?.postalCode || '',
                        subcategories: []
                    });
                    dispatch(checkProviderAuthStatus())
                    setSelectedCategoryData(null);
                    return "Service added successfully";
                },
                error: (error) => {
                    return error.response?.data?.message || "Failed to add service";
                }
            });

            await promise;
        } catch (error) {
            console.error("Error adding service:", error);
            toast.error("An error occurred while adding the service");
        } finally {
            setLoading(false);
        }
    };

    const toggleSubcategory = (subcategory) => {
        setFormData(prev => {
            const exists = prev.subcategories.some(sc => sc.subcategory === subcategory.subcategory)
            if (exists) {
                return {
                    ...prev,
                    subcategories: prev.subcategories.filter(sc => sc.subcategory !== subcategory.subcategory)
                }
            } else {
                return {
                    ...prev,
                    subcategories: [
                        ...prev.subcategories,
                        {
                            subcategory: subcategory.subcategory,
                            subSubcategories: subcategory.subSubcategories || []
                        }
                    ]
                }
            }
        })
    }

    const toggleSubSubcategory = (subcategoryName, subSubcategory) => {
        setFormData(prev => {
            const newSubcategories = prev.subcategories.map(sc => {
                if (sc.subcategory === subcategoryName) {
                    const exists = sc.subSubcategories.includes(subSubcategory)
                    return {
                        ...sc,
                        subSubcategories: exists
                            ? sc.subSubcategories.filter(ssc => ssc !== subSubcategory)
                            : [...sc.subSubcategories, subSubcategory]
                    }
                }
                return sc
            })
            return { ...prev, subcategories: newSubcategories }
        })
    }

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value
        // Reset subcategories when category changes
        setFormData({
            category: newCategory,
            serviceRadius: formData.serviceRadius,
            postalCode: formData.postalCode,
            subcategories: []
        })

        // Fetch subcategories for the new category
        if (newCategory) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API}/api/category/sub-cat/${newCategory}`)
                    setSelectedCategoryData(response.data)
                } catch (error) {
                    console.error("Error fetching sub-category data:", error)
                    setSelectedCategoryData(null)
                }
            }
            fetchData()
        } else {
            setSelectedCategoryData(null)
        }
    }

    return (
        <>
            <Card className="border h-[400px] overflow-y-scroll border-gray-200 rounded-lg shadow-sm lg:col-span-2">
                <Toaster />
                <CardHeader className="border-b border-gray-200 flex flex-row justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Services</h2>
                        <p className="text-gray-600 text-sm">You'll receive leads in these categories</p>
                    </div>
                    <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="bg-green-700 hover:bg-green-800">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Service
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Add New Service</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 py-4">
                                {/* Category Selection */}
                                <div className="space-y-2">
                                    <Label>Service Category</Label>
                                    {categoriesLoading ? (
                                        <div className="h-10 w-full rounded-md bg-gray-100 animate-pulse"></div>
                                    ) : (
                                        <select
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.category}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">Select a category</option>
                                            {categories?.map((category) => (
                                                <option key={category._id} value={category.category}>
                                                    {category.category}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {/* Service Radius */}
                                <div className="space-y-2">
                                    <Label>Service Radius (meters)</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={formData.serviceRadius}
                                        onChange={(e) => setFormData({ ...formData, serviceRadius: e.target.value })}

                                    />
                                </div>

                                {/* Postal Code */}
                                <div className="space-y-2">
                                    <Label>Postal Code</Label>
                                    <Input
                                        value={formData.postalCode}
                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    />
                                </div>

                                {/* Subcategories */}
                                {selectedCategoryData && (
                                    <div className="space-y-4">
                                        <Label>Select Subcategories</Label>
                                        <div className="space-y-2">
                                            {selectedCategoryData.map((subcategory) => (
                                                <div key={subcategory.subcategory} className="border rounded-lg overflow-hidden">
                                                    <button
                                                        type="button"
                                                        className={`w-full flex items-center justify-between p-3 ${formData.subcategories.some(sc => sc.subcategory === subcategory.subcategory)
                                                            ? 'bg-green-50'
                                                            : 'bg-white'
                                                            }`}
                                                        onClick={() => toggleSubcategory(subcategory)}
                                                    >
                                                        <span className="font-medium">{subcategory.subcategory}</span>
                                                        {formData.subcategories.some(sc => sc.subcategory === subcategory.subcategory) ? (
                                                            <Check className="h-5 w-5 text-green-600" />
                                                        ) : (
                                                            <Plus className="h-5 w-5 text-gray-400" />
                                                        )}
                                                    </button>

                                                    {subcategory.subSubcategories?.length > 0 &&
                                                        formData.subcategories.some(sc => sc.subcategory === subcategory.subcategory) && (
                                                            <div className="p-3 bg-gray-50 border-t">
                                                                <Label className="block mb-2">Specific Services</Label>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {subcategory.subSubcategories.map((subSub) => (
                                                                        <Button
                                                                            key={subSub}
                                                                            type="button"
                                                                            variant={
                                                                                formData.subcategories.find(sc => sc.subcategory === subcategory.subcategory)
                                                                                    ?.subSubcategories.includes(subSub)
                                                                                    ? 'default'
                                                                                    : 'outline'
                                                                            }
                                                                            size="sm"
                                                                            onClick={() => toggleSubSubcategory(subcategory.subcategory, subSub)}
                                                                        >
                                                                            {subSub}
                                                                        </Button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setOpenAddDialog(false)
                                            // Reset form when closing dialog
                                            setFormData({
                                                category: '',
                                                serviceRadius: 30,
                                                postalCode: provider?.postalCode || '',
                                                subcategories: []
                                            })
                                            setSelectedCategoryData(null)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-green-700 hover:bg-green-800"
                                        onClick={handleAddService}
                                        disabled={loading || !formData.category || formData.subcategories.length === 0}
                                    >
                                        {loading ? 'Adding...' : 'Add Service'}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent className="p-6">
                    {provider?.selectedCategories?.length > 0 ? (
                        <div className="space-y-2">
                            {provider.selectedCategories.map((category, index) => (
                                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">{category.category}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {category.serviceRadius} meter radius • {category.postalCode}
                                            </p>
                                            {category.subcategories?.length > 0 && (
                                                <div className="mt-3 space-y-3">
                                                    {category.subcategories.map((subcategory, i) => (
                                                        <div key={i}>
                                                            <p className="font-medium text-gray-700">{subcategory.subcategory}</p>
                                                            {subcategory.subSubcategories?.length > 0 && (
                                                                <div className="mt-2 flex flex-wrap gap-2">
                                                                    {subcategory.subSubcategories.map((subSub, j) => (
                                                                        <Badge key={j} variant="outline" className="text-gray-700">
                                                                            {subSub}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Dialog open={openRemoveDialog} onOpenChange={setOpenRemoveDialog}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedService(category)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Remove Service</DialogTitle>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <p>Are you sure you want to remove this service?</p>
                                                    <div className="mt-4 flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setOpenRemoveDialog(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={async () => {
                                                                try {
                                                                    await axios.delete(`${API}/api/service-provider/delete-single-category/${provider._id}`, {
                                                                        data: {
                                                                            category: selectedService.category
                                                                        },
                                                                        withCredentials: true
                                                                    });
                                                                    dispatch(checkProviderAuthStatus())
                                                                    toast.success("Service removed successfully")
                                                                    setOpenRemoveDialog(false)
                                                                } catch (error) {
                                                                    toast.error(error.response?.data?.message || "Failed to remove service")
                                                                }
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No services added yet</p>
                            <Button
                                variant="link"
                                className="text-green-700 mt-2"
                                onClick={() => setOpenAddDialog(true)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add your first service
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card >
        </>
    )
}