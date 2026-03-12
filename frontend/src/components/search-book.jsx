import { React, useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import styles from "../styles/searchBook.module.css";
import { fetchBooksByQuery } from "../services/googleBooksApi";
import { useNavigate } from "react-router-dom";

export default function SearchBook() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceTimer = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        // debounce — wait 400ms after user stops typing before fetching
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(async () => {
            setLoading(true);
            try {
                const books = await fetchBooksByQuery(query, { maxResults: 6 });
                const unique = books.filter((book, index, self) =>
                    index === self.findIndex((b) => b.id === book.id)
                );
                setResults(unique);
                setShowDropdown(true);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(debounceTimer.current);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setShowDropdown(false);
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }

    function handleSelect(book) {
        setShowDropdown(false);
        setQuery("");
        navigate(`/aboutBook?id=${book.id}&q=${encodeURIComponent(query)}`);
    }

    return (
        <div className={styles.search_wrapper}>
            <div className={styles.search_book}>
                <CiSearch className={styles.placeholder_search} />
                <input
                    className={styles.search_bar}
                    type="text"
                    placeholder="Enter book name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                />
                <button type="button" className={styles.search_button} onClick={handleSubmit}>
                    <CiSearch />
                </button>
            </div>

            {showDropdown && (
                <ul className={styles.dropdown}>
                    {loading && <li className={styles.dropdown_status}>Searching...</li>}
                    {!loading && results.length === 0 && (
                        <li className={styles.dropdown_status}>No results found</li>
                    )}
                    {!loading && results.map((book) => (
                        <li
                            key={book.id}
                            className={styles.dropdown_item}
                            onMouseDown={() => handleSelect(book)}
                        >
                            {book.image && (
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className={styles.dropdown_image}
                                />
                            )}
                            <div className={styles.dropdown_info}>
                                <span className={styles.dropdown_name}>{book.name}</span>
                                <span className={styles.dropdown_author}>
                                    {book.authors?.join(", ") || "Unknown Author"}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}