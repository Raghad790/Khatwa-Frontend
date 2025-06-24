import Footer from "../../../components/layout/AdminLayout/footer";
import AdminHeader from "../../../components/layout/AdminLayout/header";
import ViewCategories from "../../../components/ui/Categories/ViewCategories";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";

function AdminViewCategories() {
    return (
        <>
            <AdminHeader />
            <AdminSidebar />
            <ViewCategories/>
            <Footer />
        </>
    )

}

export default AdminViewCategories;
