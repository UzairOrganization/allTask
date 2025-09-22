import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import { ProfessionalOnboarding } from "@/components/Professionals/ProfessionalOnboarding";

export const metadata = {
    title: "Professional Dashboard - Alltasko"
}


const Page = async () => {

    return (
        <>
            <ProfessionalHeader />
            <ProfessionalOnboarding />
        </>
    );
};

export default Page;