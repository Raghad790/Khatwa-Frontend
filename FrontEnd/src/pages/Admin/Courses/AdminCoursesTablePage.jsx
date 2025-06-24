import Header from "../../../components/layout/AdminLayout/header";
import Footer from "../../../components/layout/AdminLayout/footer";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";
import AdminCoursesTable from "../../../components/ui/Admin/Courses/AdminCoursesTable";


function AdminCoursesTablePages() {

    return (<>
        <Header />
        <AdminSidebar />
        <AdminCoursesTable />
        <Footer />
    </>)
}

export default AdminCoursesTablePages;

