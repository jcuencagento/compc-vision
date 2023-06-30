import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Error.module.css';

const Custom404 = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 6000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.page404}>
            <div className={styles.text}>
                <h1>ERROR 404</h1>
                <h2>¡Te equivocaste de página!</h2>
                <hr></hr>
                <hr></hr>
                <hr></hr>
                <a href='/'>
                    <h3>Redirigiendo a Inicio de nuevo...</h3>
                </a>
            </div>
            <div className={styles.astronaut}>
                <img src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" alt="" className={styles.src} />
            </div>
        </div>
    );
};

export default Custom404;