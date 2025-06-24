import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CourseSearch.module.css';

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
            const res = await fetch(`/api/course/search?keyword=${encodeURIComponent(val)}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const text = await res.text();
            let data = {};
            try {
                data = JSON.parse(text);
            } catch {
                setResults([]);
                setShowDropdown(true);
                return;
            }

            setResults(Array.isArray(data?.data) ? data.data : []);
            setShowDropdown(true);

        } catch {
            setResults([]);
            setShowDropdown(true);
            // Optionally show error to user
            // console.error("Search failed:", err);
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
                placeholder=" Search courses by title..."
                className={style.searchCours}
                value={query}
                onChange={handleSearch}
                onFocus={() => query && results.length && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
                autoComplete="off"
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
                                onMouseDown={() => goToCourse(course.id)} // Use onMouseDown for better UX
                                tabIndex={0}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') goToCourse(course.id);
                                }}
                                role="option"
                                aria-selected="false"
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