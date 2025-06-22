import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import EnrolledCourses from "../../components/ui/enrollments/EnrolledCourse";
import Sidebar from "../../components/ui/SideBar/SideBar";
export default function MyCourses() {

    return (<>
        <Header />
        <Sidebar />
        <EnrolledCourses />
        <Footer />
    </>)
}