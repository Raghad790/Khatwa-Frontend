import AdminHeader from "../../../components/layout/AdminLayout/header";
import Footer from "../../../components/layout/AdminLayout/footer";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";
import LearningTip from "../../../components/ui/LearningTip/LearningTip";
import AdminUsageReport from "../../../components/ui/Admin/Reports/AdminUsageReport";

function AdminDashboard() {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <LearningTip />
      <AdminUsageReport />
      <Footer />
    </>
  );
}
export default AdminDashboard;
