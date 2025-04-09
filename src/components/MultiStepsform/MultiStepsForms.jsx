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

import API from "@/redux/api"
import { useRouter } from "next/navigation"

const MultiStepsForm = ({ questions, serviceProviders }) => {
    const navigation = useRouter()
    const [formData, setFormData] = useState({})
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const [formConfig, setFormConfig] = useState(null)
    const [categoryHierarchy, setCategoryHierarchy] = useState()
    const [availableProviders, setAvailableProviders] = useState()
    const finalFormData = new FormData()
    useEffect(() => {
        const storedProviders = JSON.parse(localStorage.getItem('availableProviders') || '[]');
        const storedCategoryHierarchy = JSON.parse(localStorage.getItem('categoryHierarchy') || '{}');

        setAvailableProviders(storedProviders);
        setCategoryHierarchy(storedCategoryHierarchy);
    }, []);

    useEffect(() => {

        // Check if the code is running on the client-side  


        const fetchFormConfig = async () => {
            try {
                const response = await API.get(`/api/leads/getFormConfig/${categoryHierarchy?.category}`)
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
                    />
                )
            default:
                return <StageOne formConfig={formConfig} next={next} back={back} setFormData={handleFormDataUpdate} />
        }
    }

    const handleFinalSubmit = async () => {
        try {
            const finalFormData = new FormData();

            // Append category-related fields to finalFormData
            finalFormData.append("serviceType", categoryHierarchy.category);
            finalFormData.append("serviceTypeSubCategory", categoryHierarchy.subcategory);
            finalFormData.append("serviceTypeSubSubCategory", categoryHierarchy.subSubcategory);

            // Ensure customerDetails are only added once
            Object.keys(formData.customerDetails).forEach((key) => {
                finalFormData.append(`customerDetails.${key}`, formData.customerDetails[key]);
            });

            // Loop through the main formData and append to finalFormData
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // If the value is an array, handle each item separately
                    value.forEach((item, index) => {
                        if (item.file) {
                            // If the item is a file, append it with a specific name (like photos)
                            finalFormData.append("photos", item.file, item.name);
                        } else {
                            // Append other values as they are (e.g., serviceProvider)
                            finalFormData.append(key, item);
                        }
                    });
                }

                else {
                    // For simple values, just append them
                    finalFormData.append(key, value);
                }
            });

            // To check that the data has been copied correctly


            // Make the POST request with FormData
            const response = await API.post('/api/leads/createLead', finalFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success("Your Request has been submitted!", {
                    description: "Our professionals will contact you shortly!",
                    duration: 6000,
                    position: "bottom-left",
                    style: {
                        color: "green"
                    }
                });
                setTimeout(() => {
                    navigation.push("/")
                }, [4000])
            } else {
                console.error("Form submission failed:", response.data.message);
                // Handle failure here
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    if (loading) {
        return <div className="text-center py-8">Loading form...</div>
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <ProgressBar steps={step} total={5} />
            {renderCurrentStep()}
        </div>
    )
}

export default MultiStepsForm