import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import { ProfessionalOnboarding } from "@/components/Professionals/ProfessionalOnboarding";
import { Suspense } from "react";

export const metadata = {
    title: "Professional Dashboard - Alltasko"
}


const Page = async () => {

    return (
        <Suspense   fallback={<div>Loading dashboard...</div>}>
            <ProfessionalHeader />
            <ProfessionalOnboarding />
        </Suspense>
    );
};

export default Page;