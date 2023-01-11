import React from 'react';
import styles from './Caracteristics.module.scss';

function Caracteristics({carTopics}) {



    return (
        <div data-testid="items_container" className={styles.items}>
            <h3> Prestaciones </h3>
            <div data-testid="line" className={styles.line} />
                <ul data-testid="list_container">
                    {carTopics.map((topic) => {
                        return  <li data-testid="list" key={topic.id}> 
                                    <i className={topic.url_icon}> </i> 
                                    {topic.characteristic} 
                                </li>
                    })}
                </ul>
        </div>
    )
}

export default Caracteristics