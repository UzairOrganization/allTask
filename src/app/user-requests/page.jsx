import UserRequestsWrapper from "@/ClientWapper/UserRequestsWrapper";
import Header from "@/components/Header/index";
export const metadata = {
    title: "User Requests"
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