import UserRequestsWrapper from "@/ClientWapper/UserRequestsWrapper";
import Header from "@/components/Header/index";
export const metadata = {
    title: "User Requests",
    icons: {
        icon: "/assets/images/resource/jpeg-03.ico",
        shortcut: "/assets/images/resource/jpeg-03.ico",
    },
}
const page = () => {
    return (
        <>
            <Header />
            <UserRequestsWrapper />
        </>
    )
}
export default page;