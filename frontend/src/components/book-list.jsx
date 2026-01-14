import styles from "../styles/mainPage.module.css"

export default function BookList({name, image, rating}) {
    return(
        <article className={styles.book_card}>
            <img className={styles.book_img} src={image} alt={name} />
            <h2 className={styles.book_name}>{name}</h2>
            <div className={styles.book_rating}>{rating}</div>
        </article>
    )
}