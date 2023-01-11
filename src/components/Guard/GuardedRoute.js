import React from 'react';
import { useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

const GuardedRoute= ({ children, role }) => {
  const currentRole = localStorage.getItem('role');
  const navigate = useNavigate();
  
  //console.log(role)

  useEffect( () => {
    if(!role.includes(currentRole)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "No tienes permiso",
        confirmButtonColor: '#F0572D',
        color: '#191B1D'
    })
      navigate('/');
    }
    
  }, [currentRole, role, navigate])

  if(!currentRole){
    return null;
  } 

  return (
    <>
      {children}
    </>
  )
}

export default GuardedRoute;

