import React from "react";
import "../styles/mainPage.css";
import "../components/navigation-bar";

import BookList from "../components/book-list";
import NavBar from "../components/navigation-bar";
import SideBar from "../components/side-bar";

const books = [ // Books for testing purposes
    { name: "Book 1", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 2", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 3", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 4", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 5", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 6", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 7", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 8", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Book 9", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"}
]

const genres = [
    { name: "Genre 1", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 2", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 3", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 4", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 5", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 6", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 7", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 8", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"},
    { name: "Genre 9", image: "https://placehold.co/300x300", rating: "★ ★ ★ ★ ☆"}
]

export default function MainPage() {
    return(
        <>
            <NavBar />
            <div className="main-page">
                <SideBar />
                <div className="content">
                    <h2>Trending Books</h2>
                    <section className="book-list">
                        {books.map((r,i) => (
                            <BookList
                            key = {i}
                            name = {r.name}
                            image = {r.image}
                            rating = {r.rating} 
                            />
                        ))}
                    </section>

                    <h2>Top Genres</h2>
                    <section className="genre-list">
                        {genres.map((r,i) => (
                            <BookList 
                            key = {i}
                            name = {r.name}
                            image = {r.image}
                            rating = {r.rating}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </>
    )
}


// navbar -
// chat with ai tools
// cart
// profile
//

// sidebar -
// Dashboard
// My Purchases (dream)
// View Carts
// My Reviews
// Global Rankings
// AI Tools