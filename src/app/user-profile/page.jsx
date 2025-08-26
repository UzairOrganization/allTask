import UserProfileWrapper from "@/ClientWapper/UserProfileWrapper"
import Header from "@/components/Header/index"

export const metadata = {
    title: "Profile - Alltasko",
    icons: {
        icon: "/assets/images/resource/jpeg-03.ico",
        shortcut: "/assets/images/resource/jpeg-03.ico",
    },
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

