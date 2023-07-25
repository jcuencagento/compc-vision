import Head from 'next/head';
import styles from './layout.module.css';
import stylesUtils from '../styles/utils.module.css';
import Footer from '../components/footer';
import MyHeader from '../components/myheader';

export default function Layout({ children }) {
    const handleMail = () => {
        swal({
            title: 'Contacto',
            text: 'Estudiante: 100384012@alumnos.uc3m\nProfesional: jcuencagento@gmail.com'
        });
    };

    const handleCompVision = () => {
        swal({
            title: 'No disponible',
            text: 'Disculpe, esta página está en mantenimiento...'
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
                    <a href="#" onClick={handleCompVision}>Computer Vision</a>
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

