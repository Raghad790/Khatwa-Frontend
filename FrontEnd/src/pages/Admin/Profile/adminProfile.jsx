import UserProfile from "../../../components/ui/User/UserProfile";
import Footer from "../../../components/layout/AdminLayout/footer";
import Header from "../../../components/layout/AdminLayout/header";
import Sidebar from "../../../components/ui/SideBar/AdminSideBar";


function AdminProfile() {

    return (
        <>
            <Header />
            <Sidebar />
            <UserProfile />
            <Footer />
        </>
    )

}


export default AdminProfile;