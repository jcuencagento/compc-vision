/*
    <p className={styles.description}>
        Comparador de <code>{' '}
        <a href="https://cloud.google.com/?hl=es">Google Cloud</a>{' '},{' '}
        <a href="https://azure.microsoft.com/es-es">Microsoft Azure</a>{' '}y{' '}
        <a href="https://aws.amazon.com/es/">Amazon Web Services</a>.</code>
    </p>
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import styles from '../../styles/TermsConds.module.css';

export default function termsConditions() {


    return (
        <Layout>
        <div className={styles.outerSquare}>
        <div className={styles.grid}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img src="/img/data.png" alt="Data Icon" />
                </div>
                <h3>Recolección de datos</h3>
                <p>
                    En este proyecto solo serán recolectados las respuestas dadas a las descripciones de cada imagen.
                    No serán guardados datos de ningún tipo al entrar en la página web.
                    Tampoco serán guardadas ninguna de las imágenes al probar las APIs de Computer Vision en el apartado Pruébalo.
                </p>
            </div>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img src="/img/uc3m.png" alt="UC3M Icon" />
                </div>
                <h3>Objetivo del proyecto</h3>
                <p>
                    El proyecto ha sido desarrollado desde cero por Javier Cuenca Gento para la UC3M.
                    Por tanto el objetivo de este es exclusivamente académico y formativo.
                    El tutor del proyecto ha sido Daniel Díaz Sánchez.
                </p>
            </div>
        </div>
        </div>
        </Layout>
    );
}
