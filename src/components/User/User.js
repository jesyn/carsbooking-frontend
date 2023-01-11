import React, { useEffect, useState } from "react";
import styles from "./user.module.scss";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {ip} from "../IP/IpConstante";


function User() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const mailRegExp =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const [typeValue, setTypeValue] = useState("password");
    const [emptyName, setEmptyName] = useState(false);
    const [nameErrorStyle, setNameErrorStyle] = useState(styles.labelNomYApe);
    const [emptylastName, setEmptyLastName] = useState(false);
    const [lastNameErrorStyle, setLastNameErrorStyle] = useState(styles.labelNomYApe);
    const [emptyMail, setEmptyMail]= useState(false);
    const [mailErrorStyle, setMailErrorStyle] = useState("");
    const [emptyPass, setEmptyPass]= useState(false);
    const [passErrorStyle, setPassErrorStyle]= useState("");
    const [emptyPassConfirm, setEmptyPassConfirm] = useState(false);
    const [passConfirmErrorStyle, setPassConfirmErrorStyle] = useState("");
    const [wrongMail, setWrongMail]= useState(false);
    const [noMatchingPass, setNoMatchingPass]= useState(false);
    const [passLengthError, setPassLengthError] = useState(false);
    const role = {
      id: 1, 
      name: 'ROLE_USER'
    }

    function crearCuenta(e) {
      //debugger;
      e.preventDefault();
      
      if(name === "" || lastName === "" || email === "" || password === "" || passConfirm ==="" ){
            switch(""){
              case name:
            setEmptyName(true);
            setNameErrorStyle(styles.input_error);
            break;
            case lastName:
            setEmptyLastName(true);
            setLastNameErrorStyle(styles.input_error);
            break;
            case email:
            setEmptyMail(true);
            setMailErrorStyle(styles.input_error);
            break;
            case password:
            setEmptyPass(true);
            setPassErrorStyle(styles.input_error);
            break;
            default:
            setEmptyPassConfirm(true);
            setPassConfirmErrorStyle(styles.input_error);
            break;
            }
        return;
      }
      
      if (!(mailRegExp.test(email))){
          setEmptyName(false);
          setEmptyLastName(false);
          setEmptyMail(false);
          setEmptyPass(false);
          setEmptyPassConfirm(false);
          setWrongMail(true);
          setMailErrorStyle(styles.input_error);
          
          return;
        } 

      if(password !== passConfirm){
        setEmptyName(false);
        setEmptyLastName(false);
        setEmptyMail(false);
        setEmptyPass(false);
        setEmptyPassConfirm(false);
        setWrongMail(false);
        setNoMatchingPass(true);
        setPassConfirmErrorStyle(styles.input_error);                
          
          return;
      }

      if(password.length < 6){
        
        setEmptyName(false);
        setEmptyLastName(false);
        setEmptyMail(false);
        setEmptyPass(false);
        setEmptyPassConfirm(false);
        setWrongMail(false);
        setNoMatchingPass(false);
        setPassLengthError(true);
        setPassErrorStyle(styles.input_error);
        
        return;
      }
      
      signUp();
    }

    /* useEffect(()=> { 
        localStorage.setItem("users", JSON.stringify(users))
      }, [users]); */
    
      //
      const signUp = () => {
        var url = `${ip}/users`;
        fetch(url, {
          method: "POST",
          body: JSON.stringify({ name, lastname: lastName, email, password, role }),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            //console.log("respuesta segundo then", response);
            if(response.status_code && response.status_code === 400){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.message,
                confirmButtonColor: '#F0572D',
                color: '#191B1D'
            })
            } else{
              navigate('/login');
            }
          })
          
      };

/*     const limpiarFormulario = () => {
      setName("");
      setLastName("");
      setMail("");
      setPassword("");
      setPassConfirm("");
      document.getElementById("registerForm").reset();
    } */

    return (
          <div className={styles.container} >
            <div className={styles.sub_container}>
              <div className={styles.user_h2_container}>
                <h2 className={styles.title_user}>Crear Cuenta</h2>
              </div>
              <form  id="registerForm"  className={styles.form_container}>
                  <div className={styles.nombreCompleto}>
                    <div className={styles.nombre}>
                      <label>Nombre</label>
                      <input className={nameErrorStyle} type="text" id="name" onChange={ (e)=>setName(e.target.value)} onKeyUp={(e)=> setNameErrorStyle(styles.login_input)} required   />
                      {(nameErrorStyle === styles.input_error && emptyName) && <p className={styles.label_error}>Este campo es obligatorio</p>}
                    </div>
                    <div className={styles.apellido}>
                      <label>Apellido</label>
                      <input className={lastNameErrorStyle}type="text" id="lastName" onChange={ (e)=>setLastName(e.target.value)} onKeyUp={(e)=> setLastNameErrorStyle(styles.login_input)} required  />
                      {(lastNameErrorStyle === styles.input_error && emptylastName) && <p className={styles.label_error}>Este campo es obligatorio</p>}
                    </div>
                  </div>
                <div>
                    <label>Correo electrónico</label>
                    <input className={mailErrorStyle} type="email" id="mail" onChange={ (e)=>setMail(e.target.value)} onKeyUp={(e)=> setMailErrorStyle(styles.login_input)} required  />
                    {(mailErrorStyle === styles.input_error && emptyMail) && <p className={styles.label_error}>Este campo es obligatorio</p>}
                    {(mailErrorStyle === styles.input_error && wrongMail) && <p className={styles.label_error}>Ingrese un mail válido.</p>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input className={passErrorStyle} type={typeValue} id="pass1" onChange={ (e)=>setPassword(e.target.value)} onKeyUp={(e)=> setPassErrorStyle(styles.login_input)} required  />
                    <div className={styles.passToggle_container}>
                          <button  id="PasswordToogle"  className={styles.btnEyeContainer} type="button" onClick={()=> typeValue ==="password"? setTypeValue("text"): setTypeValue("password")}>
                            <span className={styles.btnEyeText}>
                                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M23.8537 9.75504C23.7349 9.55692 21.8091 6.40401 18.3755 4.2988L21.3573 1.31699L20.683 0.6427L17.5149 3.81072C15.941 2.99297 14.0954 2.42624 12 2.42624C4.61579 2.42624 0.3255 9.45609 0.146211 9.75504L0 10L0.146211 10.245C0.26501 10.4431 2.19084 13.596 5.6245 15.7012L2.64269 18.683L3.31699 19.3573L6.485 16.1892C8.05894 17.007 9.90452 17.5737 12 17.5737C19.3842 17.5737 23.6744 10.5439 23.8537 10.2449L24 9.99996L23.8537 9.75504ZM6.33574 14.99C3.48 13.297 1.65133 10.7876 1.12324 10C1.94472 8.77482 5.90898 3.37998 12 3.37998C13.7893 3.37998 15.3934 3.84733 16.7898 4.53591L15.3189 6.00683C14.4181 5.25679 13.2612 4.80446 12 4.80446C9.13569 4.80446 6.80498 7.13516 6.80498 10C6.80498 11.261 7.25722 12.4178 8.00712 13.3187L6.33574 14.99ZM15.3144 7.35993C15.8933 8.08517 16.2418 9.002 16.2418 10C16.2418 12.3391 14.3391 14.2419 12 14.2419C11.002 14.2419 10.0853 13.8933 9.36002 13.3143L15.3144 7.35993ZM8.68582 12.6398C8.10708 11.9146 7.75862 10.9979 7.75862 10C7.75862 7.66092 9.66135 5.75815 12 5.75815C12.9981 5.75815 13.9148 6.10675 14.6401 6.68558L8.68582 12.6398ZM12 16.62C10.2107 16.62 8.60669 16.1527 7.2102 15.4641L8.68132 13.993C9.58212 14.7431 10.739 15.1956 12 15.1956C14.8648 15.1956 17.1955 12.8648 17.1955 10C17.1955 8.73888 16.7432 7.58198 15.9932 6.68113L17.6643 5.01004C20.52 6.70302 22.3487 9.21238 22.8768 10C22.0553 11.2252 18.091 16.62 12 16.62Z" fill="#607D8B"/></svg>
                            </span>
                          </button> 
                    </div>
                    {(passErrorStyle === styles.input_error && emptyPass) && <p className={styles.label_error}>Este campo es obligatorio</p>}
                    {(passErrorStyle === styles.input_error && passLengthError) && <p className={styles.label_error}>La contraseña debe tener al menos 6 caracteres</p>}
                      
                </div>
                <div>
                    <label className={styles.p_user}>Confirme contraseña</label>
                    <input className={passConfirmErrorStyle} type="password" id="pass2" onChange={ (e)=>setPassConfirm(e.target.value)} onKeyUp={(e)=> setPassConfirmErrorStyle(styles.login_input)} required  />
                    {(passConfirmErrorStyle === styles.input_error && emptyPassConfirm) && <p className={styles.label_error}>Este campo es obligatorio</p>}
                    {(passConfirmErrorStyle === styles.input_error && noMatchingPass) && <p className={styles.label_error}>Las contraseñas no coinciden</p>}
                </div>
                <div className={styles.btn_container}>
                  <button type="submit" className={styles.btn} onClick={crearCuenta}>Crear Cuenta</button>
                  <p className={styles.p_user}>Ya tienes una cuenta? <span><Link to="/login">Iniciar sesión.</Link></span></p>
                </div>
              </form>
            </div>
          </div>
    );
}

export default User;