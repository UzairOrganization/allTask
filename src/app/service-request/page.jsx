import Header from "@/components/Header";
import MultiStepsForm from "@/components/MultiStepsform/MultiStepsForms";

export const metadata = {
    title: "Request a Service - Alltasko",
    icons: {
        icon: "/assets/images/resource/jpeg-03.ico",
        shortcut: "/assets/images/resource/jpeg-03.ico",
    },
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