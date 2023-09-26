import Layout from '../../components/layout';
import styles from '../../styles/Info.module.css';

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
            <div className={styles.footer}>
                <p>Made by <span className={styles.name}>Javier Cuenca Gento</span> for 
                <a href='https://www.uc3m.es/Home'> UC3M</a></p>
            </div>
        </Layout>
    );
}
