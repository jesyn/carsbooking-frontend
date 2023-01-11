import { Link } from 'react-router-dom';
import styles from './Card.module.scss';


function Card({carsSelected, title}) {

    const refresh = () => {
        window.location.reload();
    } 
    if(!carsSelected){
        return null;
    }


    return (
        <div data-testid="cards_container" className={styles.container}>
            <div data-testid="title_container" className={styles.title_container}>
                {carsSelected.length === 0 ? 
                    (<>
                        <h2 className={styles.title}> No tenemos productos disponibles </h2>
                        <p className={styles.refresh_btn + ' ' + (title !== 'Recomendados' ? '': styles.hidden)} onClick={refresh}> X </p> 
                    </>):
                    (<>
                        <h2 id="anclaCategory" className={styles.title}>{title}</h2>
                        <p className={styles.refresh_btn + ' ' + (title !== 'Recomendados' ? '': styles.hidden)} onClick={refresh}> X </p>
                    </>)
                }
            </div>
            <section data-testid="cards_section" className={styles.container_card}>
                {carsSelected.map((car) => {
                    return <article data-testid="card" key={car.id} className={styles.card}>
                                <div className={styles.container_img}>
                                    <img className={styles.card_img} src={car.portada_url} alt={car.brand}></img>
                                </div>
                                <div className={styles.card_info}>
                                    <div className={styles.card_header}>
                                        <h3> {car.category.category} </h3>
                                        <h2> {`${car.brand} - ${car.model}`} </h2>
                                        <h4> <i className={`${styles.icon} fa-solid fa-location-dot`}></i> {car.city.city} <span> MOSTRAR EN MAPA </span> </h4>
                                    </div>
                                    <div >
                                        <p> {car.description} <span> más... </span> </p>
                                        <Link to={`/products/${car.id}`}>
                                            <button className={styles.button}> Ver detalle </button>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                })}
            </section>
        </div>
    )
}

export default Card