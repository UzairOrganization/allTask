"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import Header from "@/components/Header/index";

const ProfessionalProfileHeader = () => {
    const { isAuthenticated, isProfessionalAuhtenticated } = useSelector(state => state.auth)

    

    return (
        <>
            {(isAuthenticated || (!isAuthenticated && !isProfessionalAuhtenticated)) && <Header />}
            {isProfessionalAuhtenticated && <ProfessionalHeader />}
        </>
    )
}

export default ProfessionalProfileHeader
