import UserProfileWrapper from "@/ClientWapper/UserProfileWrapper"
import Header from "@/components/Header/index"

export const metadata = {
    title: "Profile - Alltasko"
}
const page = () => {
    return (
        <>
            <Header />
            <UserProfileWrapper />
        </>
    )
}
export default page

