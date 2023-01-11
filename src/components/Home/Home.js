import React from "react";
import styles from "./Home.module.scss";
import Search from "../Search/Search";
import CategoriesList from "../Categories/CategoriesList";
import Card from "../Products/Card";
import { useState } from "react";
//import cars from '../../db/cars.json';
import { useEffect , useRef } from "react";
import Spinner from "../Atom/Spinner/Spinner";
import { format, parseISO } from "date-fns";
import {ip} from "../IP/IpConstante";

function Home() {
  //GUARDAMOS LA LISTA DE AUTOS SEGÚN CORRESPONDA
  const [carsList, setCarsList] = useState([]);
  const [titleList, setTitleList] = useState("");
  const [loading, setLonding] = useState(true);
  const productsRef = useRef(null);

  //FUNCION PARA IR A PRODUCTOS
  const scrollProducts = (e) => {
    e.current.scrollIntoView({
      behavior: 'smooth',
    });
  };


  //FUNCION PARA TRAER 8 AUTOS RANDOM
  useEffect(() => {
    getCarsRandom();
  }, []);

  const getCarsRandom = () => {
    //setCarsList(cars.cars)
    setTitleList("Recomendados");
    fetch(`${ip}/products/random`)
      .then((res) => res.json())
      .then((result) => {
        setCarsList(result);
        setLonding(false);
        
      });
  };

  //FUNCION PARA TRAER AUTOS SEGUN CATEGORIA
  const getCarsByCategory = (category) => {
    //const carCategory = cars.cars.filter(car => car.category === category);
    //setCarsList(carCategory)
    if(category){
      setTitleList("Autos de categoria " + category.category);

      fetch(`${ip}/products/category/${category.id}`)
        .then((res) => res.json())
        .then((result) => {
          setCarsList(result);
        });
    }
    
  };

  //FUNCION PARA TRAER AUTOS POR CIUDAD
  const getCarsByCity = (city) => {
    //const carsCity = cars.cars.filter(car => car.location === city )
    //setCarsList(carsCity)
    if(city){
      setTitleList("Autos de " + city.city);
    
      fetch(`${ip}/products/city/${city.id}`)
      .then((res) => res.json())
      .then((result) => {
        setCarsList(result);
      });
    }
    
  };


  //FUNCION PARA TRAER AUTOS POR FECHA 
  const getCarsByDate = (state) => {
    if(state){
      const startDate= state[0].startDate.toISOString();
      const startDateF=format(parseISO(startDate),"yyyy-MM-dd");
      const endDate= state[0].endDate.toISOString();
      const endDateF=format(parseISO(endDate),"yyyy-MM-dd");
      setTitleList("Autos desde " + startDateF + " hasta " + endDateF);
      fetch(`${ip}/products/datesAvailables?start_date=${startDateF}&end_date=${endDateF}`)
        .then((res) => res.json())
        .then((result) => {
          setCarsList(result);
          console.log("por fecha", result)
        });
    }
  };

  // FUNCION PARA TRAER AUTOS POR FECHA Y CIUDAD
  const getCarsByDateAndCity = (state,city) => {
    if(state && city){
      const startDate= state[0].startDate.toISOString();
      const startDateF=format(parseISO(startDate),"yyyy-MM-dd");
      const endDate= state[0].endDate.toISOString();
      const endDateF=format(parseISO(endDate),"yyyy-MM-dd");

      setTitleList("Autos en "+ city.city + " desde " + startDateF + " hasta " + endDateF);
      fetch(`${ip}/products/datesAndCityAvailables?start_date=${startDateF}&end_date=${endDateF}&city_id=${city.id}`)
        .then((res) => res.json())
        .then((result) => {
          setCarsList(result);
          console.log("por fecha y ciudad" , result)
        });
    }
  };


  return (
    <div className={styles.body}>
      <section className={styles.search}>
        <h1 className={styles.title}> Alquiler de autos en Argentina </h1>
        <h4 className={styles.sub_title}> Las mejores ofertas </h4>
        <Search onClikCategoryScroll={() => scrollProducts(productsRef)} cityAndDateChange={getCarsByDateAndCity} cityChange={getCarsByCity} dateChange={getCarsByDate} />
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <CategoriesList onClikCategoryScroll={() => scrollProducts(productsRef)} categoryChange={getCarsByCategory} />
          <div className={styles.cards_container} ref={productsRef}>
            <Card carsSelected={carsList} title={titleList} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
