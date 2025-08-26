import Service from "@/ClientWapper/Service"
export async function generateMetadata({ params }) {
    const { name } = params;
    const decodedName = decodeURIComponent(name);
    return {
        title: `${decodedName} - Alltasko Services`,
        icons: {
            icon: "/assets/images/resource/jpeg-03.ico",
            shortcut: "/assets/images/resource/jpeg-03.ico",
        },
        // You can add more fields like description, openGraph, etc.
    };
}
const Page = ({ params }) => {
    return (
        <>
            <Service name={params.name} />
        </>
    )
}
export default Page