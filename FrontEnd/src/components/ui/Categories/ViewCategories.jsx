import { useEffect, useState } from "react";
import style from "./ViewCategories.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/Auth/userAuth";

function ViewCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to load categories");
                setCategories(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        if (user?.role === 'instructor') {
            navigate(`/categories-instructor/${categoryId}`);
        } else {
            navigate(`/categories/${categoryId}`);
        }
    };

    if (loading) return <div className={style.loading}>Loading categories...</div>;
    if (error) return <div className={style.error}>Error: {error}</div>;

    return (
        <section className={style.categorySection}>
            <h2 className={style.categoryHeader}>
                <span className={style.gradientText}>🌈 Explore by Category</span>
            </h2>
            <div className={style.grid}>
                {categories.map((cat) => (
                    <div
                        className={style.card}
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        tabIndex={0}
                        role="button"
                        aria-label={`View ${cat.name} category`}
                        onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleCategoryClick(cat.id)}
                    >
                        <span className={style.icon}>📂</span>
                        <h3 className={style.catName}>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ViewCategories;