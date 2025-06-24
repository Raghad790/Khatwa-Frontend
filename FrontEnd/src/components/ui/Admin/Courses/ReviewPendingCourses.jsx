import React, { useEffect, useState } from "react";
import styles from "./ReviewPendingCourses.module.css";

const ReviewPendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  const fetchPendingCourses = async () => {
    try {
      const res = await fetch("/api/courses/pending");
      const data = await res.json();

      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setCourses([]);
      }
    } catch (err) {
      console.error("Failed to fetch pending courses:", err);
      setCourses([]); // fallback empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id, isApproved) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/courses/${id}/review`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved }),
      });

      if (res.ok) {
        setCourses((prev) => prev.filter((course) => course.id !== id));
      } else {
        console.error("Failed to update course status");
      }
    } catch (err) {
      console.error("Review error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Course Submissions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No pending courses to review.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>Category</th>
                <th>Date Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>{course.title}</td>
                  <td>{course.instructor_name}</td>
                  <td>{course.category_name || "Uncategorized"}</td>
                  <td>{new Date(course.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleReview(course.id, true)}
                      disabled={updatingId === course.id}
                      className={styles.approveBtn}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(course.id, false)}
                      disabled={updatingId === course.id}
                      className={styles.rejectBtn}
                    >
                      Reject
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

export default ReviewPendingCourses;



// import React, { useEffect, useState } from "react";
// import styles from "./ReviewPendingCourses.module.css";

// const ReviewPendingCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);

//   useEffect(() => {
//     fetchPendingCourses();
//   }, []);

//   const fetchPendingCourses = async () => {
//     try {
//       const res = await fetch("/api/courses/pending");
//       const data = await res.json();

//       if (Array.isArray(data)) {
//         setCourses(data);
//       } else {
//         console.error("Fetched data is not an array:", data);
//         setCourses([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch pending courses:", err);
//       setCourses([]); // fallback empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReview = async (id, isApproved) => {
//     setUpdatingId(id);
//     try {
//       const res = await fetch(`/api/courses/${id}/review`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isApproved }),
//       });

//       if (res.ok) {
//         setCourses((prev) => prev.filter((course) => course.id !== id));
//       } else {
//         console.error("Failed to update course status");
//       }
//     } catch (err) {
//       console.error("Review error:", err);
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Pending Course Submissions</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : courses.length === 0 ? (
//         <p>No pending courses to review.</p>
//       ) : (
//         <div className={styles.tableWrapper}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Instructor</th>
//                 <th>Category</th>
//                 <th>Date Submitted</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((course, index) => (
//                 <tr key={course.id}>
//                   <td>{index + 1}</td>
//                   <td>{course.title}</td>
//                   <td>{course.instructor_name}</td>
//                   <td>{course.category_name || "Uncategorized"}</td>
//                   <td>{new Date(course.created_at).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       onClick={() => handleReview(course.id, true)}
//                       disabled={updatingId === course.id}
//                       className={styles.approveBtn}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReview(course.id, false)}
//                       disabled={updatingId === course.id}
//                       className={styles.rejectBtn}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewPendingCourses;
