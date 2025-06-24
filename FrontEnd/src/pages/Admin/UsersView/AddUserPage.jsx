import AddUser from "../../../components/ui/Admin/Users/AddUsers";
import Header from "../../../components/layout/AdminLayout/header";
import Footer from "../../../components/layout/AdminLayout/footer";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";


function AddUsersPage() {

    return (<>
        <Header />
        <AdminSidebar />
        <AddUser />
        <Footer />
    </>)
}

export default AddUsersPage;

