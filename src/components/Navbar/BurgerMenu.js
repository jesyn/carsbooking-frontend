
import styles from './Burger.module.scss';


function BurgerMenu() {
    
    return (
        <>
            <button className={styles.burger}>
                <span role="menu_icon" className="material-icons">
                    menu
                </span>
            </button>
        
        </>

    )
}

export default BurgerMenu;