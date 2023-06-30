import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Error.module.css';

const CustomError = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 6000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.page404}>
            <h1>ERROR </h1>
        </div>
    );
};

export default CustomError;