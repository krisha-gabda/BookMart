import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import placeholder from "../assets/book-img.png";

import styles from "../styles/aboutBook.module.css";
import { fetchAboutBookData } from "../services/pageBookData";

export default function AboutBook() {
    const [searchParams] = useSearchParams();
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [reviews, setReviews] = useState(null);
    const [summary, setSummary] = useState({ average: 0, total: 0, breakdown: {} });
    
    const id = searchParams.get("id");
    const q = searchParams.get("q");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            google_volume_id: book?.id || "",
            quantity,
        };

        if(!payload.google_volume_id) {
            alert("Book ID not found.");
            return;
        }

        try {
            const response = await fetch('http://localhost/bookmart/backend/add_to_cart.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                credentials: "include"
            });

            const result = await response.json();
            if (result.status === "success") {
                alert("Book Successfully Added to Cart.");
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("An error occured. Please try again.");
            console.log(error);
        }
    }

    useEffect(() => {
        async function loadReviews() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost/bookmart/backend/get_reviews.php?google_volume_id=${id}`, {
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    credentials: 'include'
                });

                const result = await response.json();
                if (result.status === "error") {
                    alert("Could not fetch reviews");
                    console.log(result.message);
                } else {
                    if (result.message === "No reviews found") {
                        setReviews(null);
                    } else {
                        setReviews(result.reviews);
                        setSummary(result.summary);
                    }
                }

            } catch (err) {
                alert("An error occured");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        loadReviews();
    }, [id]);

    useEffect(() => {
        async function loadBook() {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchAboutBookData({
                    bookId: searchParams.get("id"),
                    query: searchParams.get("q") || "bestseller",
                });
                setBook(data);
            } catch (err) {
                setError(err.message || "Failed to load book");
            } finally {
                setLoading(false);
            }
        }
        loadBook();
    }, [searchParams]);

    const rating = book?.rating ?? 3.9;
    const bookPrice = rating * 5.5 + 8;
    
    function decreaseQty() {
        setQuantity((prev) => Math.max(1, prev - 1));
    }

    function increaseQty() {
        setQuantity((prev) => Math.min(10, prev + 1));
    }

    return (
        <>
            <div className={styles.content}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                {!loading && !error && !book && <p>No book found.</p>}

                {!loading && !error && book && (
                    <>
                        <form className={styles.about} onSubmit={handleSubmit}>
                            <section className={styles.cover_panel}>
                                <img
                                    src={book.image || placeholder}
                                    alt={book.name}
                                    className={styles.book_image}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = placeholder;
                                    }}
                                />
                            </section>

                            <section className={styles.details_panel}>
                                <p className={styles.breadcrumb}>Books / Product Details</p>
                                <h1 className={styles.title}>{book.name}</h1>
                                <p className={styles.author}>
                                    By{" "}
                                    {book.authors?.length
                                        ? book.authors.join(", ")
                                        : "Unknown Author"}
                                </p>

                                <div className={styles.rating_row}>
                                    <span className={styles.rating_badge}>
                                        {book.rating ?? "N/A"} star
                                    </span>
                                    <span className={styles.rating_text}>Reader Rating</span>
                                </div>

                                <div className={styles.price_row}>
                                    <span className={styles.sale_price}>${bookPrice}</span>
                                </div>

                                <p className={styles.meta}>
                                    Published: {book.publishedDate || "N/A"}
                                </p>

                                <div className={styles.purchase_row}>
                                    <div className={styles.quantity_box}>
                                        <button type="button" onClick={decreaseQty}>
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button type="button" onClick={increaseQty}>
                                            +
                                        </button>
                                    </div>

                                    <button type="submit" className={styles.cart_btn}>
                                        Add to Cart
                                    </button>
                                </div>

                                <div className={styles.description}>
                                    <h2>About this book</h2>
                                    <p dangerouslySetInnerHTML={{ __html: book.description || "No description available." }} />
                                </div>
                                <button
                                    type="button"
                                    className={styles.add_review_btn}
                                    onClick={() => navigate(`/addreview?id=${id}&q=${q}`, {
                                        state: {
                                            bookName: book.name,
                                            bookImage: book.image,
                                            bookAuthor: book.authors?.join(", ") || "Unknown Author"
                                        }
                                    })}
                                >
                                    Add Review
                                </button>
                            </section>
                        </form>
                        <div className={styles.reviews_wrapper} >
                            {!reviews && <p>No reviews found...</p>}
                            {reviews && (
                                <div className={styles.reviews}>
                                    <h2 className={styles.reviews_title}>Reviews</h2>
                                    <div className={styles.summary}>
                                        <div className={styles.summary_left}>
                                            <span className={styles.average}>{summary.average}</span>
                                            <span className={styles.summary_stars}>
                                                {"★".repeat(Math.round(summary.average))}
                                                {"☆".repeat(5 - Math.round(summary.average))}
                                            </span>
                                            <span className={styles.total}>{summary.total} reviews</span>
                                        </div>
                                        <div className={styles.bars}>
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <div key={star} className={styles.bar_row}>
                                                    <span className={styles.bar_num}>{star}</span>
                                                    <div className={styles.bar_track}>
                                                        <div
                                                            className={styles.bar_fill}
                                                            style={{
                                                                width: summary.total > 0
                                                                    ? `${(summary.breakdown[star] / summary.total) * 100}%`
                                                                    : "0%"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.reviews_feed}>
                                        {reviews.map((review, index) => (
                                            <div key={index} className={styles.feed_item}>
                                                <div className={styles.avatar}>
                                                    {review.username.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div className={styles.feed_content}>
                                                    <div className={styles.feed_top}>
                                                        <span className={styles.feed_user}>{review.username}</span>
                                                        <span className={styles.feed_date}>{new Date(review.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className={styles.feed_stars}>
                                                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                                    </div>
                                                    <p className={styles.feed_title}>{review.title}</p>
                                                    <p className={styles.feed_body}>{review.body}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
