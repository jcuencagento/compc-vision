import styles from '../styles/utils.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import swal from 'sweetalert';

const MyHeader = () =>  {
    const router = useRouter();
    const isHomePage = router.pathname === '/' || router.pathname === '/survey/Survey';

    const handleAyuda = () => {
        swal({
            title: 'Ayuda',
            text: 'Se puede comenzar y terminar la encuesta en cualquier momento, pero si recarga la página durante la encuesta se perderían las respuestas y se comenzaría de nuevo. Ningún dato personal ni imágenes son guardados en la parte de Pruébalo!',
            icon: 'info'
        });
    };

    return (
        <div className={styles.headercontent}>
            <Link href="https://github.com/jcuencagento">
                <Image
                priority
                src="/img/me.jpeg"
                className={styles.borderCircle}
                height={40}
                width={40}
                alt="Me"
            />
            </Link>
            <h1>Computer Vision Web!</h1>
			{isHomePage ? (
                <div className={styles.headerHelp}>
                    <img
                        src="/img/help.png"
                        alt="Help"
                        onClick={handleAyuda}
                        className={styles.helpIcon}
                    />
                    <h3 onClick={handleAyuda}>Ayuda</h3>
                </div>
            ) : (
                <div className={styles.headerHelp}>
                    <img
                        src="/img/home.png"
                        alt="Home"
                        className={styles.helpIcon}
                    />
                    <Link href="/">
                        <h3>Inicio</h3>
                    </Link>
                </div>
            )}
        </div>
      );
}

export default MyHeader;