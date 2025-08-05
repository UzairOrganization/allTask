import UserChatPage from "@/ClientWapper/UserChatPageWrapper"
import Header from "@/components/Header"

export const metadata = {
  title: "User Chat - Alltasko"
}
const page = () => {
  return (
    <>
      <Header />
      <UserChatPage />
    </>
  )
}
export default page