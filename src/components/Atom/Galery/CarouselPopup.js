import React  from 'react';
import {useState} from 'react';
import styles from './Carousel.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';


function CarouselPopup({images, count}) {
    const [indexSelected, setIndexSelected] = useState(0);

    const countStyle = {
        position: "absolute",
        fontSize: "16px",
        bottom: "0",
        top: "430px",
        left: "300px",
        color: "#191B1D"
    }


    const clickImage = (index) => {
        setIndexSelected(index);
        
    }

    return (
        <div data-testid="carousel_container" className={styles.carousel_container} >
            <p style={countStyle}> {`${indexSelected + 1} / ${count}`}</p>
            <Carousel 
                showArrows={true} 
                showIndicators={false}
                thumbWidth="100px"
                infiniteLoop={true}
                showStatus={false}
                onChange={clickImage}
            >
                {images.map((img , index) => {
                    img.index=index
                    return <img src={img.url} alt={img.title} key={img.id}/>
                })}
                
            </Carousel> 
        </div>
    );
}

export default CarouselPopup;