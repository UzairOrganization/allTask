import LoginWrapper from "@/ClientWapper/LoginWrapper";

export const metadata = {
    title: "Login - Alltasko",
    icons: {
        icon: "/assets/imgs/logo/logo.ico",
        shortcut: "/assets/imgs/favicon.ico",
    }
}
const Login = () => {
    return (
        <>
            <LoginWrapper />
        </>
    );
};

export default Login;
