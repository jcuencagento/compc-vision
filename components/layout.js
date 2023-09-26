import Head from 'next/head';
import styles from './layout.module.css';

export default function Layout({ children }) {
    const handleMail = () => {
        swal({
            title: 'Contacto',
            text: 'Estudiante: 100384012@alumnos.uc3m\nProfesional: jcuencagento@gmail.com'
        });
    };

    return (
        <div className={styles.main}>
             <Head>
                <title>Vision Computer</title>
                <link rel="icon" href="/img/eye.ico" />
            </Head>
            <nav className={styles.header}>
                <div className={styles.headerCenter}>
                    <a className={styles.inicio} href="/" />
                    <a href="/survey/Survey">Encuesta</a>
                    <a href="/posts/Upload">Pruébalo</a>
                    <a href="/info/infoVision">Computer Vision</a>
                    <a href="/info/termsConditions">Términos</a>
                </div>
                <div className={styles.headerIcons}>
                    <a href="https://github.com/jcuencagento" />
                    <a href="https://www.linkedin.com/in/javiercuencagento/" />
                    <a href="#" onClick={handleMail} />
                </div>
            </nav>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}

