import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AvatarUser.module.scss";
import SocialMedia from "../SocialMedia/SocialMedia";

function AvatarUser({ closeSesion, closeMenu, user }) {
    const [avatar, setAvatar] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        setRole(localStorage.getItem("role"));
        const incitialName = user.name.charAt(0);
        const incitialLastName = user.lastName.charAt(0);
        setAvatar(incitialName + incitialLastName);
    }, [user]);

    return (
        <>
        <div data-testid="avatar_container" className={styles.avatar_header}>
            <button onClick={closeMenu}> X </button>
            <div className={styles.avatar}>
            <div className={styles.circle}>
                <p className={styles.initials}> {avatar} </p>
            </div>
            </div>
            <h2> Hola, </h2>
            <p> {`${user.name} ${user.lastName}`} </p>
        </div>
        {role === "ROLE_USER" ? (
            <Link to={`/my-bookings`}> {/* /${user.id} */}
            <h3 className={styles.bookings_list}> Mis reservas </h3>
            </Link>
        ) : (
            <Link to={`/post-product`}>
            <h3 className={styles.bookings_list}> Administración </h3>
            </Link>
        )}
        <div className={styles.icons}>
            <div className={styles.avatar_footer}>
            <p>
                {" "}
                ¿Deseas{" "}
                <span role="closeSesion" onClick={closeSesion}>
                {" "}
                cerrar sesión?{" "}
                </span>{" "}
            </p>
            <div className={styles.line} />
            </div>
            <SocialMedia />
        </div>
        </>
    );
}

export default AvatarUser;
