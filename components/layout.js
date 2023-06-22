import Head from 'next/head';
import styles from './layout.module.css';
import stylesUtils from '../styles/utils.module.css';
import Footer from '../components/footer';
import MyHeader from '../components/myheader';

export default function Layout({ children }) {
    return (
        <div className={styles.main}>
            <Head>
                <title>Vision Computer</title>
                <link rel="icon" href="/img/eye.ico" />
            </Head>
            <header className={stylesUtils.header}>
                <MyHeader />
            </header>
            <div className={styles.container}>
                {children}
            </div>
            <footer className={stylesUtils.footer}>
                <Footer />
            </footer>
        </div>
    );
}

