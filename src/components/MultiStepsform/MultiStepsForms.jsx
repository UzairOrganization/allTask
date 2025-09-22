'use client'
import ProgressBar from "./ProgressBar"
import StageOne from "./StageOne"
import StageTwo from "./StageTwo"
import StageThree from "./StageThree"
import StageFour from "./StageFour"
import StageFive from "./StageFive"
import { toast, Toaster } from "sonner"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { API } from "@/lib/data-service"
import { useRouter } from "next/navigation"
import axios from "axios"

const MultiStepsForm = ({ questions, serviceProviders }) => {
    const navigation = useRouter()
    const { user } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({})
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const [formConfig, setFormConfig] = useState(null)
    const [categoryHierarchy, setCategoryHierarchy] = useState()
    const [availableProviders, setAvailableProviders] = useState()
    const [categoryPricing, setCategoryPricing] = useState()
    const [componentLoading, setComponentLoading] = useState(false)
    const finalFormData = new FormData()
    
    useEffect(() => {
        const storedProviders = JSON.parse(localStorage.getItem('availableProviders') || '[]');
        const storedCategoryHierarchy = JSON.parse(localStorage.getItem('categoryHierarchy') || '{}');
        setAvailableProviders(storedProviders);
        setCategoryHierarchy(storedCategoryHierarchy);
    }, []);

    useEffect(() => {
        const fetchCategoryPricing = async () => {
            try {
                setLoading(true)
                const response = axios.get(`${API}/api/category/get-category-pricing`, categoryHierarchy?.category)
                setCategoryPricing((await response).data.pricing)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching category pricing:", error)
                setLoading(false)
            }
        }

        const fetchFormConfig = async () => {
            try {
                const response = await axios.get(`${API}/api/leads/getFormConfig/${categoryHierarchy?.category}`)
                if (response.data.success) {
                    setFormConfig(response.data.data)
                    setLoading(false)
                } else {
                    console.error("Form configuration not found")
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error fetching form config:", error)
                setLoading(false)
            }
        }

        if (categoryHierarchy) {
            fetchFormConfig()
            // fetchCategoryPricing()
        }
    }, [categoryHierarchy])

    const next = () => setStep(prev => prev + 1)
    const back = () => setStep(prev => prev - 1)

    const handleFormDataUpdate = (newData) => {
        setFormData(prev => ({
            ...prev,
            ...newData
        }))
    }

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return (
                    <StageOne
                        finalFormData={finalFormData}
                        formConfig={formConfig}
                        next={next}
                        back={back}
                        setFormData={handleFormDataUpdate}
                    />
                )
            case 2:
                return (
                    <StageTwo
                        finalFormData={finalFormData}
                        formData={formData}
                        setFormData={handleFormDataUpdate}
                        next={next}
                        back={back}
                    />
                )
            case 3:
                return (
                    <StageThree
                        finalFormData={finalFormData}
                        formData={formData}
                        setFormData={handleFormDataUpdate}
                        next={next}
                        back={back}
                    />
                )
            case 4:
                return (
                    <StageFour
                        finalFormData={finalFormData}
                        formData={formData}
                        availableProviders={availableProviders}
                        setFormData={handleFormDataUpdate}
                        next={next}
                        back={back}
                    />
                )
            case 5:
                return (
                    <StageFive
                        Toaster={Toaster}
                        formData={formData}
                        back={back}
                        onSubmit={handleFinalSubmit}
                        componentLoading={componentLoading}
                    />
                )
            default:
                return <StageOne formConfig={formConfig} next={next} back={back} setFormData={handleFormDataUpdate} />
        }
    }

    const handleFinalSubmit = async () => {
        try {
            setComponentLoading(true)
            const finalFormData = new FormData();

            // Append category-related fields
            finalFormData.append("serviceType", categoryHierarchy.category);
            finalFormData.append("serviceTypeSubCategory", categoryHierarchy.subcategory);
            finalFormData.append("serviceTypeSubSubCategory", categoryHierarchy.subSubcategory);

            // finalFormData.append("customer", user ? user._id : null)

            Object.keys(formData.customerDetails).forEach((key) => {
                finalFormData.append(`customerDetails.${key}`, formData.customerDetails[key]);
            });

            // Append questions array properly
            if (Array.isArray(formData.questions)) {
                formData.questions.forEach((question, index) => {
                    finalFormData.append(`questions[${index}][questionText]`, question.questionText);
                    finalFormData.append(`questions[${index}][answer]`, question.answer);
                });
            }

            // Handle the rest of formData
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "customerDetails" || key === "questions") return;

                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        if (item?.file) {
                            finalFormData.append("photos", item.file, item.name);
                        } else {
                            finalFormData.append(key, item);
                        }
                    });
                } else {
                    finalFormData.append(key, value);
                }
            });

            // Submit to backend
            const response = await axios.post(`${API}/api/leads/createLead`, finalFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success("Your Request has been submitted!", {
                    description: "Our professionals will contact you shortly!",
                    duration: 6000,
                    position: "bottom-left",
                    style: { color: "green" }
                });

                setTimeout(() => {
                    setComponentLoading(false)
                    navigation.push("/")
                }, 2000)
            } else {
                console.error("Form submission failed:", response.data.message);
                setComponentLoading(false)
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setComponentLoading(false)
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007D63] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading form...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6">
                    <ProgressBar steps={step} total={5} />
                    <div className="mt-6">
                        {renderCurrentStep()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiStepsForm