import AdminUsersTable from "../../../components/ui/Admin/Users/Viewusers";
import Header from "../../../components/layout/AdminLayout/header";
import Footer from "../../../components/layout/AdminLayout/footer";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";


function ViewUsers() {

    return (<>
        <Header />
        <AdminSidebar />
        <AdminUsersTable/>
        <Footer />
    </>)
}

export default ViewUsers;

