import {React, useEffect, useRef, useState} from "react";
import { CiSearch } from "react-icons/ci";
import styles from "../styles/searchBook.module.css";
import { useNavigate } from "react-router-dom";
import { fetchBooksByQuery  } from "../services/googleBooksApi";

export default function SearchBook() {

    const [ query, setQuery ] = useState("");
    const [ preview, setPreview ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ showDropDown, setShowDropDown ] = useState(false);
    const navigate = useNavigate();
    const debounceTimer = useRef(null);

    useEffect(() => {
        if (query.trim().length < 2) {
            setPreview([]);
            setShowDropDown(false);
            return;
        }

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(async () => {
            setLoading(true);
            const results = await fetchBooksByQuery(query, { maxResults: 5 });
            setPreview(results);
            setShowDropDown(true);
            setLoading(false);
        }, 400);

        return () => clearTimeout(debounceTimer.current);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (! query.trim()) return;
        setShowDropDown(false);
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    const handleChange = async(e) => {
        setQuery(e.target.value);
    }

    const handleSelectBook = (bookId) => {
        setShowDropDown(false);
        navigate(`/book/${bookId}`);
    };

    return(
        <div className={styles.search_container}>
            <CiSearch className={styles.placeholder_search}/>
            <form className={styles.search_book} onSubmit={handleSubmit}>
                <input 
                    className={styles.search_bar}
                    type="text"
                    placeholder="Enter book name..."
                    value={query}
                    onChange={handleChange}
                    onBlur={() => setTimeout(() => setShowDropDown(false), 150)}
                    onFocus={() => preview.length > 0 && setShowDropDown(true)}
                />
                <button type="submit" className={styles.search_button}><CiSearch /></button>
            </form>

            {showDropDown && (
                <div className={styles.dropdown}>
                    {loading && <p>Loading...</p>}
                    {preview.map((book) => {
                        return (<div key={book.id} onClick={() => handleSelectBook(book.id)} className={styles.dropdown_item}>
                            {book.thumbnail && <img src={book.thumbnail} alt={book.title} width={30} />}
                            <div>
                                <p>{book.title}</p>
                                <small>{book.authors}</small>
                            </div>
                        </div>)
                    })}
                    <div className="see-all" onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}>
                        See all results for "{query}" →
                    </div>
                </div>
            )}
        </div>
    )
}