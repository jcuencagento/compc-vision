import styles from '../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () =>  {
    const handleContacto = () => {
        swal({
            title: 'Contacto',
            text: 'Javier Cuenca Gento. Ingeniero en Tecnologías de Telecomunicaciones.',
            buttons: {
                confirm: "Linkedin",
                roll: {
                text: "Correo UC3M",
                    value: "correo",
                }
            }
          }).then((result) => {
            if (result) {
                if (result === true) {
                    let span = document.createElement("span");
                    span.innerHTML = `<a href="https://es.linkedin.com/in/javiercuencagento">Linkedin 🚀</a>`,
                    span.style.fontSize = "20px";
                    span.style.fontWeight = 600;
                    swal({ content: span });
                } else if (result === 'correo') {
                    let span = document.createElement("span");
                    span.innerHTML = `<p>📨 100384012@alumnos.uc3m.es</p>`,
                    span.style.fontSize = "20px";
                    span.style.fontWeight = 600;
                    swal({ content: span });
                }
            }
          })
    };

    const handleTerms = () => {
        swal({
            title: 'Términos y Condiciones',
            text: 'Trabajo y página web creado únicamente con fines académicos.',
        });
    };

    return (
        <div className={styles.footercontent}>
            <h4 onClick={handleContacto}>Contacto</h4>
            <Link href="https://www.uc3m.es/Home">
                <Image
                priority
                src="/img/uc3m.png"
                className={styles.borderCircle}
                height={40}
                width={40}
                alt="UC3M"
                />
            </Link>
            <h4 onClick={handleTerms}>Términos y Condiciones</h4>
        </div>
    );
}

export default Footer;