import React, {useRef, useEffect} from 'react';
import styles from './Galery.module.scss';
//import images from '../../db/images.json';
import { useMediaQuery } from "react-responsive";
import { useState } from 'react';
import PopUp from '../Atom/Galery/PopUp';

function Galery({carPortrait , carImages}) {


    //FUNCION: POPUP
    const [isPopUpOpen, setPopUpIsOpen] = useState(false);
    
    const togglePopUp = () => {
        setPopUpIsOpen(!isPopUpOpen);
    };
    
    //FUNCION: GALERY
    const slideshow = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    //CANTIDAD DE IMAGES E INDICE
    const count = carImages.length;

    //array de imagenes de DB cortar en solo 4 o 5 imagenes 
    const listImgMobile = carImages.slice(0, 5);
    const listImgDesktop = carImages.slice(0, 4);

    const siguiente = () => {
        if(slideshow?.current?.children.length > 0){
            
			// Obtenemos el primer elemento del slideshow.
			const firstElement = slideshow.current.children[0];

			// Establecemos la transicion para el slideshow.
			slideshow.current.style.transition = `${1000}ms ease-out all`;

			const slideWidth = slideshow.current.children[0].offsetWidth;

			// Movemos el slideshow
			slideshow.current.style.transform = `translateX(-${slideWidth}px)`;

			const transicion = () => {
				// Reiniciamos la posicion del Slideshow.
				slideshow.current.style.transition = 'none';
				slideshow.current.style.transform = `translateX(0)`;

				// Tomamos el primer elemento y lo mandamos al final.
				slideshow.current.appendChild(firstElement);

				slideshow.current.removeEventListener('transitionend', transicion);
			}

			// Eventlistener para cuando termina la animacion.
			slideshow.current.addEventListener('transitionend', transicion);

		}
    }

    useEffect( () => {
        setInterval( () => {
            siguiente();
        }, 3000)

    }, [])
    

    return (
            <picture data-testid="galery_container" className={styles.container}>
                    {isPopUpOpen && !isMobile && <PopUp images={carImages} count={count} onRequestClose={togglePopUp} />} 
                    {isMobile ? (
                        <div data-testid="galery_mobile" className={styles.slideshow} ref={slideshow}>
                            {listImgMobile.map((img, index) => {
                                return  <div className={styles.slide} key={img.id}>
                                            <img src={img.url} alt={img.title} />
                                            <div className={styles.slide_count}>
                                                <p> {`${index + 1} / ${count} `}</p>
                                            </div>
                                        </div>
                                        })
                            }
                        </div> 
                        ) : (
                        <div data-testid="galery_desktop" className={styles.galery}>
                            <div data-testid="portrait_container" className={styles.portada}>
                                <img src={carPortrait} alt="imgane portada"/>
                            </div>
                            <div data-testid="images_desktop" className={styles.listImages}>
                                {listImgDesktop.map((img) => {
                                                    return  <div key={img.id} className={styles.images}>
                                                                    <img src={img.url} alt="" />
                                                            </div>
                                    })} 
                            </div>
                            <button onClick={ togglePopUp } > Ver más </button>
                        </div>
                        )
                    }
            </picture>
    )
}

export default Galery