import Footer from "../../components/layout/StudentLayout/footer";
import Header from "../../components/layout/StudentLayout/header";
import Recommended from "../../components/ui/Courses/StudentCourse/RecommendedCourses";
import Sidebar from "../../components/ui/SideBar/SideBar";

function RecommendedCourses() {
    return (
        <>
            <Header />
            <Sidebar/>
            <Recommended />
            <Footer />

        </>


    )
}


export default RecommendedCourses