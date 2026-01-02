export default function BookList({name, image, rating}) {
    return(
        <article className="book-card">
            <img className="book-img" src={image} alt={name} />
            <h2 className="book-name">{name}</h2>
            <div className="book-rating">{rating}</div>
        </article>
    )
}