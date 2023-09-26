import Layout from '../../components/layout';
import styles from '../../styles/Home.module.css';

export default function infoVision() {
    return (
        <Layout>
            <div className={styles.outerSquare}>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardImage}>
                        <img src="/img/tecnicas.jpg" alt="Tecnicas Icon" />
                    </div>
                    <h3>Técnicas de Computer Vision</h3>
                    <p>Reconocimiento facial que te puede hacer el iPhone para desbloquear tu móvil.</p>
                    <p>Otras técnicas son el etiquetado de imágenes, el reconocimiento o el seguimiento de objetos, etc.</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardImage}>
                        <img src="/img/casos.jpg" alt="Casos Icon" />
                    </div>
                    <h3>Casos de uso</h3>
                    <p>Control de tráfico, controles sanitarios, vigilancias de seguridad, etc.</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardImage}>
                        <img src="/img/integracion.jpg" alt="Integracion Icon" />
                    </div>
                    <h3>Integración y precios</h3>
                    <p>Este es un ejemplo de despliegue complejo de una aplicación con AWS.</p>
                    <p>Los precios, aparte de unas 1000 o 5000 imágenes gratuitas son de alrededor de 1$ por cada 1000 imágenes.</p>
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
