// pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooksByQuery  } from "../services/googleBooksApi"; 
import BookCard from "../components/book-card";

const PAGE_SIZE = 20;

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // Reset when query changes
    useEffect(() => {
        setBooks([]);
        setPage(0);
        setHasMore(true);
    }, [query]);

    // Fetch when page or query changes
    useEffect(() => {
        if (!query) return;

        async function fetchBooks() {
            setLoading(true);
            const results = await fetchBooksByQuery(query, {
                maxResults: PAGE_SIZE,
                startIndex: page * PAGE_SIZE,
            });

            setBooks((prev) => (page === 0 ? results : [...prev, ...results]));
            setHasMore(results.length === PAGE_SIZE);
            setLoading(false);
        }

        fetchBooks();
    }, [query, page]);

  return (
    <div>
        <h2>Results for "{query}"</h2>

        <div>
        {books.map((book) => (
            <BookCard
                key={book.id}
                id={book.id}
                q={query}
                name={book.name}
                image={book.image}
                description={book.description}
            />
        ))}
        </div>

        {loading && <p>Loading...</p>}

        {!loading && books.length === 0 && (
            <p>No results found for "{query}"</p>
        )}

        {!loading && hasMore && books.length > 0 && (
            <button onClick={() => setPage((p) => p + 1)}>Load more</button>
        )}

        {!loading && !hasMore && books.length > 0 && (
            <p>No more results.</p>
        )}
    </div>
  );
}