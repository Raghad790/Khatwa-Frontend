import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CourseSearch.module.css'; // replace with actual path

function CourseSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        try {
            const res = await fetch(`/api/course/search?keyword=${val}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Log raw text response before parsing
            const text = await res.text();

            // Now try to parse JSON
            const data = JSON.parse(text);

            setResults(data?.data || []);
            setShowDropdown(true);

        } catch (err) {
            console.error("Search failed:", err);
        }
    };


    const goToCourse = (id) => {
        setQuery('');
        setResults([]);
        setShowDropdown(false);
        navigate(`/courses/${id}`);
    };

    return (
        <div className={style.searchWrapper}>
            <input
                type="search"
                placeholder="🔍 Search courses by title..."
                className={style.searchCours}
                value={query}
                onChange={handleSearch}
                onFocus={() => query && results.length && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            />
            {showDropdown && (
                <ul className={style.searchDropdown}>
                    {results.length === 0 ? (
                        <li className={style.noResult}>No results found</li>
                    ) : (
                        results.map(course => (
                            <li
                                key={course.id}
                                className={style.searchItem}
                                onClick={() => goToCourse(course.id)}
                            >
                                {course.title}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default CourseSearch;
