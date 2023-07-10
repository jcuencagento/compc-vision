import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import stylesUtils from '../styles/utils.module.css';
import Footer from '../components/footer';
import MyHeader from '../components/myheader';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';

export default function Home() {
    const [showOverlay, setShowOverlay] = useState(false);
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

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    return (
        <div className={styles.outerSquare}>
        <div className={styles.blurOverlay}>
        <main className={styles.innerSquare}>
            <div className={styles.menuIcon} onClick={toggleOverlay}></div>
            <div className={`${styles.overlay} ${showOverlay ? 'visible' : ''}`}>
                <MyHeader />
            </div>
            <div className={styles.grid}>
                <Link href="/survey/Survey" className={styles.card}>
                    <h3>Encuesta &rarr; </h3>
                    <p>Compara y elige la mejor descripción de algunas imágenes.</p>
                </Link>
                <Link href="/posts/Upload" className={styles.card}>
                    <h3>Pruébalo &rarr; </h3>
                    <p>Muestra una foto cualquiera y mira las descripciones hechas por Computer Vision.</p>
                </Link>
            </div>
        </main>
        </div>
        </div>
    )
}
