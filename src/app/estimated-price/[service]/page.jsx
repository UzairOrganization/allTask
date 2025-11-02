const { default: ServiceSelectionForm } = require("./ClientWrapper")
export async function generateMetadata({ params }) {
    const { service } = params;
    const decodedSerivce = decodeURIComponent(service);
    return {
        title: `${decodedSerivce} - Alltasko Service Estimation`,
        // You can add more fields like description, openGraph, etc.
    };
}
const page = ()=>{
    return(
        <ServiceSelectionForm/>
    )
}
export default page