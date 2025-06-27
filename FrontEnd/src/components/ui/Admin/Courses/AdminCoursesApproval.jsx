import React, { useEffect, useState } from "react";
import styles from "./AdminCoursesApproval.module.css";
import { CheckCircle, XCircle } from "lucide-react";

const AdminCoursesApproval = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingCourses();
    }, []);

    const fetchPendingCourses = async () => {
        try {
            const res = await fetch("/api/admin/courses/pending");
            const data = await res.json();
            if (!Array.isArray(data)) {
                setCourses([]);
                return;
            }
            setCourses(data);
        } catch  (err){
            setCourses([]);
           console.error(err); 
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await fetch(`/api/admin/courses/${id}/approve`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });
            setCourses(prev => prev.filter(course => course.id !== id));
        } catch(err){ console.error(err); }
    };

    const handleReject = async (id) => {
        try {
            await fetch(`/api/admin/courses/${id}/reject`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });
            setCourses(prev => prev.filter(course => course.id !== id));
        } catch (err) { console.error(err); }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.badge}>Khatwa Admin</span>
                <h2 className={styles.title}>Pending Course Submissions</h2>
                <p className={styles.subtitle}>Review and manage all submitted courses before they go live on Khatwa.</p>
            </div>

            {loading ? (
                <div className={styles.loader}><span className={styles.loadingSpinner}></span> Loading...</div>
            ) : courses.length === 0 ? (
                <div className={styles.emptyState}>
                    <img src="/empty-approval.svg" alt="No pending courses" className={styles.emptyImg} />
                    <p className={styles.emptyText}>No pending courses to review.</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Instructor</th>
                                <th>Category</th>
                                <th className={styles.actionsCol}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={course.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className={styles.courseTitle}>
                                            <span className={styles.courseIcon}></span>
                                            {course.title}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.instructorName}>{course.instructor_name}</span>
                                    </td>
                                    <td>
                                        <span className={styles.category}>{course.category_name}</span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleApprove(course.id)}
                                            className={styles.approveBtn}
                                            title="Approve"
                                        >
                                            <CheckCircle size={18} />
                                            <span className={styles.btnText}>Approve</span>
                                        </button>
                                        <button
                                            onClick={() => handleReject(course.id)}
                                            className={styles.rejectBtn}
                                            title="Reject"
                                        >
                                            <XCircle size={18} />
                                            <span className={styles.btnText}>Reject</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesApproval;




// import React, { useEffect, useState } from "react";
// import styles from "./AdminCoursesApproval.module.css";
// import { CheckCircle, XCircle } from "lucide-react";

// const AdminCoursesApproval = () => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true); 
    
//     useEffect(() => {
//         fetchPendingCourses();
//     }, []);

//     const fetchPendingCourses = async () => {
//         try {
//             const res = await fetch("/api/admin/courses/pending");
//             const data = await res.json();
//             console.log("Fetched pending courses:", data);
//             // Ensure it's an array, fallback to empty array

//             if (!Array.isArray(data)) {
//                 console.error("Expected array but got:", data);
//                 setCourses([]); // fallback to empty
//                 return;
//             }
//             setCourses(data);
//         } catch (err) {
//             console.error("Failed to fetch pending courses:", err);
//             setCourses([]); // fallback
//         } finally {
//             setLoading(false);
//         }
//     };



//     const handleApprove = async (id) => {
//         try {
//             await fetch(`/api/admin/courses/${id}/approve`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//             });
//             setCourses(prev => prev.filter(course => course.id !== id));
//         } catch (err) {
//             console.error("Error approving course:", err);
//         }
//     };

//     const handleReject = async (id) => {
//         try {
//             await fetch(`/api/admin/courses/${id}/reject`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//             });
//             setCourses(prev => prev.filter(course => course.id !== id));
//         } catch (err) {
//             console.error("Error rejecting course:", err);
//         }
//     };
    
//     return (
//         <div className={styles.container}>
//             <h2>Pending Course Submissions</h2>

//             {loading ? (
//                 <p>Loading...</p>
//             ) : courses.length === 0 ? (
//                 <p>No pending courses to review.</p>
//             ) : (
//                 <table className={styles.table}>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Title</th>
//                             <th>Instructor</th>
//                             <th>Category</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {courses.map((course, index) => (
//                             <tr key={course.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{course.title}</td>
//                                 <td>{course.instructor_name}</td>
//                                 <td>{course.category_name}</td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleApprove(course.id)}
//                                         className={styles.approveBtn}
//                                     >
//                                         Approve
//                                     </button>
//                                     <button
//                                         onClick={() => handleReject(course.id)}
//                                         className={styles.rejectBtn}
//                                     >
//                                         Reject
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );

// };

// export default AdminCoursesApproval;
