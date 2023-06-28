import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import stylesUtils from '../styles/utils.module.css';
import Footer from '../components/footer';
import MyHeader from '../components/myheader';
import { useEffect } from 'react';
import Layout from '../components/layout';

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

    return (
        <Layout>
        <div className={styles.main}>
        <main className={styles.container}>
            <p className={styles.description}>
                Comparador de las <code>APIs</code> de reconocimiento de imágenes de las empresas
                punteras en inteligencia artificial y tecnología como<code>{' '}
                <a href="https://cloud.google.com/?hl=es">Google Cloud</a>{' '},{' '}
                <a href="https://azure.microsoft.com/es-es">Microsoft Azure</a>{' '}y{' '}
                <a href="https://aws.amazon.com/es/">Amazon Web Services</a>.</code>
            </p>
            <div className={styles.grid}>
                <Link href="/survey/Survey" className={styles.card}>
                    <h3>Encuesta! &rarr;  🧑‍💻</h3>
                    <p>Compara y elige la mejor descripción de algunas imágenes.</p>
                </Link>
                <Link href="/posts/Upload" className={styles.card}>
                    <h3>Pruébalo! &rarr; 🤳</h3>
                    <p>Muestra una foto cualquiera y mira las descripciones hechas por Computer Vision.</p>
                </Link>
            </div>
        </main>
        </div>
        </Layout>
    )
}
