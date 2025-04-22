
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import { ProfessionalOnboarding } from "@/components/Professionals/ProfessionalOnboarding";
export const metadata ={
    title:"Dashboard - Alltasko"
}
const Page = () => {


    return (
        <>
            <ProfessionalHeader />
            <ProfessionalOnboarding />
        </>
    );
};

export default Page;