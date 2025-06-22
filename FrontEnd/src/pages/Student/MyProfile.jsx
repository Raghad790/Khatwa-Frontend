import UserProfile from "../../components/ui/User/UserProfile";
import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import Sidebar from "../../components/ui/SideBar/SideBar";


function MyProfile() {

    return (
        <>
            <Header />
            <Sidebar />
            <UserProfile />
            <Footer />
        </>
)

}


export default MyProfile;