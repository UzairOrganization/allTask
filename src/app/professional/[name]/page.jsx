import ProfessionalProfileWrapper from "@/ClientWapper/ProfessionalProfileWrappper";
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import { API } from "@/lib/data-service"
import axios from "axios"
import ProfessionalProfileHeader from "../ProfessionalProfileHeader";
export async function generateMetadata({ params }) {
    const { name } = params;
    const decodedName = decodeURIComponent(name);
    return {
        title: `${decodedName} - Professional Profile Alltasko`,
        // You can add more fields like description, openGraph, etc.
    };
}
const Page = async ({ params }) => {
    const { name } = params;


    return (
        <>
            <ProfessionalProfileHeader />
            <ProfessionalProfileWrapper
                name={name}
            />
        </>
    );

};

export default Page;