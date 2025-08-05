import ProfessionalChatPage from "@/ClientWapper/ProfessionalChatPageWrapper"
import ProfessionalHeader from "@/components/Professionals/ProfessionalHeader"



export const metadata = {
    title: "Professional Chats - Alltasko"
}
const page = () => {
    return (
        <>
            <ProfessionalHeader />
            <ProfessionalChatPage />
        </>
    )
}
export default page