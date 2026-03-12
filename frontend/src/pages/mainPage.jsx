import React, { useEffect, useState } from "react";
import styles from "../styles/mainPage.module.css";

import BookCard from "../components/book-card";
import SearchBook from "../components/search-book";
import { fetchMainPageBooks, MAIN_PAGE_CATEGORIES } from "../services/pageBookData";

export default function MainPage() {
    const [booksByCategory, setBooksByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        let isMounted = true;

        async function loadBooks() {
            setLoading(true);
            const { booksByCategory: books, errorsByCategory } = await fetchMainPageBooks({
                maxResults: 12,
            });

            if (!isMounted) return;

            setBooksByCategory(books);
            setError(errorsByCategory);
            setLoading(false);
        }

        loadBooks();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <SearchBook />  
            {MAIN_PAGE_CATEGORIES.map((cat) => (
                <section key={cat.key}>
                    <h2 className={styles.title}>{cat.title}</h2>
                    {loading && <p>Loading...</p>}
                    {error[cat.key] && <p>Error: {error[cat.key]}</p>}
                    {!loading && !error[cat.key] && (
                        <section className={styles.book_list}>
                            {(booksByCategory[cat.key] ?? []).map((book) => (
                                <BookCard
                                    id={book.id}
                                    key={book.id}
                                    name={book.name}
                                    image={book.image}
                                    rating={book.rating}
                                    description={book.description}
                                    bookId={book.id}
                                    query={cat.query}
                                />
                            ))}
                        </section>
                    )}
                </section>
            ))}
        </>
    );
}
