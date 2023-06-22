import styles from '../styles/utils.module.css';
import Image from 'next/image'

const Profile = () => {
    return (
        <div>
        <section className={styles.headingMd}>
            <Image
                priority
                src="/img/gabi.jpeg"
                className={styles.borderCircle}
                height={144}
                width={144}
                alt="Personal profile photo"
            />
            <h1 className={styles.heading2Xl}>Javier Cuenca Gento</h1>
            <h6>Ingeniero en Tecnologías de Telecomunicaciones</h6>
            <p>Trabajo de Fin de Grado en la Universidad Carlos III de Madrid.</p>
        </section>
        </div>
    );
};

export default Profile;