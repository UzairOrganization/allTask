import Header from "@/components/Header";
import MultiStepsForm from "@/components/MultiStepsform/MultiStepsForms";

export const metadata = {
    title: "Request a Service - Alltasko"
}
const page = () => {

    return (
        <>
            <Header />
            < MultiStepsForm />
        </>
    )
}
export default page;