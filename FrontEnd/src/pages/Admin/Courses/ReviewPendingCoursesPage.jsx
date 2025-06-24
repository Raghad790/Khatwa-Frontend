import Header from "../../../components/layout/AdminLayout/header";
import Footer from "../../../components/layout/AdminLayout/footer";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";
import ReviewPendingCourses from "../../../components/ui/Admin/Courses/ReviewPendingCourses";


function ReviewPendingCoursesPages() {

    return (<>
        <Header />
        <AdminSidebar />
        <ReviewPendingCourses />
        <Footer />
    </>)
}

export default ReviewPendingCoursesPages;

