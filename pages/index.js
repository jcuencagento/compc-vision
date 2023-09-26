import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
          // Code that needs to run only on the browser
            const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

            if (isMobile) {
                console.log('Running on a mobile device');
            } else {
                console.log('Running on a desktop browser');
            }
        }
    }, []);

    const handleMail = () => {
        swal({
            title: 'Contacto',
            text: '100384012@alumnos.uc3m'
        });
    };

    return (
        <div className={styles.pageWrapper}>
            <Head>
                <title>Vision Computer</title>
                <link rel="icon" href="/img/eye.ico" />
            </Head>
            <nav className={styles.header}>
                <div className={styles.headerCenter}>
                    <a className={styles.inicio} href="/" />
                    <a href="/survey/Survey">Encuesta</a>
                    <a href="/posts/Upload">Pruébalo</a>
                    <a href="#">Computer Vision</a>
                    <a href="/info/termsConditions">Términos</a>
                </div>
                <div className={styles.headerIcons}>
                    <a href="https://github.com/jcuencagento" />
                    <a href="https://www.linkedin.com/in/javiercuencagento/" />
                    <a href="#" onClick={handleMail} />
                </div>
            </nav>
            <div className={styles.outerSquare}>
            <div className={styles.grid}>
                <Link href="/survey/Survey" className={styles.card}>
                    <div className={styles.cardImage}>
                        <img src="/img/encuesta.png" alt="Survey Icon" />
                    </div>
                    <h3>Encuesta</h3>
                    <p>Compara y elige la mejor descripción de algunas imágenes aleatorias.</p>
                </Link>
                <Link href="/posts/Upload" className={styles.card}>
                    <div className={styles.cardImage}>
                        <img src="/img/pruebalo.jpg" alt="Upload Icon" />
                    </div>
                    <h3>Pruébalo</h3>
                    <p>Muestra una foto cualquiera y mira las descripciones hechas por computer vision.</p>
                </Link>
                <Link href="/info/infoVision" className={styles.card}>
                    <div className={styles.cardImage}>
                        <img src="/img/compvision.jpg" alt="Info Icon" />
                    </div>
                    <h3>Computer Vision</h3>
                    <p>Conoce un poco más sobre el mundo de visión por ordenador y la inteligencia artificial.</p>
                </Link>
                <div className={styles.card}>
                <div className={styles.footer}>
                    <p>Made by <span className={styles.name}>Javier Cuenca Gento</span> for 
                        <a href='https://www.uc3m.es/Home'> UC3M</a></p>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}
