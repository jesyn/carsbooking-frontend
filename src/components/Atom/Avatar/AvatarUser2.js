import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AvatarUser2.module.scss";

function AvatarUser2({ closeSesion, user }) {
    const [avatar, setAvatar] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        setRole(localStorage.getItem("role"));
        const incitialName = user.name.charAt(0);
        const incitialLastName = user.lastName.charAt(0);
        setAvatar(incitialName + incitialLastName);
    }, [user.lastName, user.name]);

    return (
        <>
        <div data-testid="avatar_container" className={styles.avatar_header}>
            {role === "ROLE_USER" ? (
            <div>
                <Link to={`/my-bookings`}> {/* /${user.id} */}
                    <h3 className={styles.bookings_list}> Mis reservas </h3>
                </Link>
            </div>
            ) : (
            <Link to={`/post-product`}>
                <h3 className={styles.bookings_list}> Administración </h3>
            </Link>
            )}
            <div className={styles.v_line}></div>
            <div>
            <div className={styles.circle}>
                <p className={styles.initials}> {avatar} </p>
            </div>
            </div>
            <div className={styles.welcome}>
                <h2> Hola, </h2>
                <p> {`${user.name || ""}   ${user.lastName || ""}  `} </p>
            </div>
            <div>
                <button onClick={closeSesion}> X </button>
            </div>
        </div>
        </>
    );
}

export default AvatarUser2;
