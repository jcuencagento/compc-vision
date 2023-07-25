/*
    <p className={styles.description}>
        Comparador de <code>{' '}
        <a href="https://cloud.google.com/?hl=es">Google Cloud</a>{' '},{' '}
        <a href="https://azure.microsoft.com/es-es">Microsoft Azure</a>{' '}y{' '}
        <a href="https://aws.amazon.com/es/">Amazon Web Services</a>.</code>
    </p>
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import styles from '../../styles/Info.module.css';

export default function infoVision() {


    return (
        <Layout>
            <h1>Información sobre Computer Vision</h1>
        </Layout>
    );
}
