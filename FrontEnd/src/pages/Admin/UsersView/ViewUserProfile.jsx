import AdminUsersTable from "../../../components/ui/Admin/Users/Viewusers";
import Header from "../../../components/layout/AdminLayout/header";
import Footer from "../../../components/layout/AdminLayout/footer";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";
import ViewUserProfile from "../../../components/ui/Admin/Users/UserProfile";


function ViewUserProfilePage() {

    return (<>
        <Header />
        <AdminSidebar />
        <ViewUserProfile />
        <Footer />
    </>)
}

export default ViewUserProfilePage;

