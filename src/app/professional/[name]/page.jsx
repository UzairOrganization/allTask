import ProfessionalProfileWrapper from "@/ClientWapper/ProfessionalProfileWrappper";
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader";
import { API } from "@/lib/data-service"
import axios from "axios"

const Page = async ({ params }) => {
    const { name } = params;


    return (
        <>
            <ProfessionalHeader />
            <ProfessionalProfileWrapper
                name={name}
            />
        </>
    );

};

export default Page;