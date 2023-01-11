import React from 'react';
import styles from './Politics.module.scss';

function Politics({rules, insurance, cancellation}) {

    return (
        <>
            <section data-testid="politics" className={styles.politics}>
                    <h3 role="title"> Qué tenés que saber </h3>
                    <div data-testid="line" className={styles.line} />
                    <div data-testid="politics_container" className={styles.politics_container}>
                        <div data-testid="politics_list1" className={styles.politics_list}>
                            <h4 role="rules"> Normas </h4>
                            {rules}
                            {/* <ul> 
                                <li> La tolerancia de la reserva será de una hora. </li>
                                <li> En los casos que soliciten permiso de cruce de frontera, la cobertura mecánica y el acarreo en el exterior serán a cargo del cliente. </li>
                                <li> El permiso debe abonarse por adelantado y en caso de cancelación no correspondería reembolso por este concepto. </li>
                            </ul> */}
                        </div>
                        <div data-testid="politics_list2" className={styles.politics_list}>
                        <h4 role="insurance"> Seguros </h4>
                        {insurance}
                            {/* <ul> 
                                <li> PLUS COVER - Cobertura que reduce 100% la franquicia por daños de colisión </li>
                                <li> FULL COVER - Reduce 100% la franquicia por daños de colisión y vuelco </li>
                            </ul> */}
                        </div>
                        <div data-testid="politics_list3" className={styles.politics_list}>
                        <h4 role="cancellation"> Cancelación </h4>
                        {cancellation}
                            {/* <ul> 
                                <li>  Ante una cancelación o no show de la reserva pre pagada online, se retendrá un 4% + IVA de la misma en concepto de gastos administrativos y se aplicará un cargo por cancelación. </li>
                            </ul> */}
                        </div>
                    </div>
                </section>
        </>
    )
}

export default Politics