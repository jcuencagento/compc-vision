import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import styles from '../../styles/Survey.module.css';
import stylesUtils from '../../styles/utils.module.css';
import ImageUpload from '../../components/imageupload';
import swal from 'sweetalert';
import Loader from '../../components/loader';
import ErrorAnimation from '../../components/erroranimation';
import axios from 'axios';

export default function Upload() {
    const router = useRouter();
    const [errorRequest, setErrorRequest] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageDescriptions, setImageDescriptions] = useState({});

    useEffect(() => {
        const fetchImageDescriptions = async () => {
            if (imageUploaded) {
                try {
                    setUploading(true);
                    const formData = new FormData();
                    formData.append('image', imageUploaded);
                    const response = await fetch('/api/image-descriptions', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('An error occurred while fetching image descriptions');
                    }

                    const data = await response.json();
                    setUploading(false);
                    setImageDescriptions(data);
                } catch (error) {
                    setErrorRequest(true);
                    console.error(error);
                }
            }
        };

        fetchImageDescriptions();
    }, [imageUploaded]);

    const handleAnswer = async (answer) => {
        const response = [{
            image_name: 'uploaded-pic.jpg',
            category: 'uploaded',
            selection: answer
        }];

        swal("Muchas gracias... Puede probar de nuevo cuando quiera!", {
            buttons: false,
            timer: 2000
        });

        try {
            await axios.post('/api/db-insert', response);
            router.push('/');
        } catch (error) {
            console.error('Error inserting survey responses:', error);
            router.push('/');
        }
    }

    return (
        <Layout>
        <div className={styles.outerSquare}>
        <div className={styles.grid}>
            <ImageUpload onImageUpload={setImageUploaded} />
            {imageUploaded ?
                (Object.keys(imageDescriptions).length === 0 || uploading ? (
                    errorRequest ? ( <ErrorAnimation /> ) : ( <Loader /> )
                ) : (
                    <div className={styles.options}>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('aws')}
                            disabled={imageDescriptions.aws_description.startsWith('Error')}>
                            {imageDescriptions.aws_description}
                        </button>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('azure')}
                            disabled={imageDescriptions.azure_description.startsWith('Error')}>
                            {imageDescriptions.azure_description}
                        </button>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('google')}
                            disabled={imageDescriptions.google_description.startsWith('Error')}>
                            {imageDescriptions.google_description}
                        </button>
                        <button className={styles.buttonOpt} onClick={() => handleAnswer('none')}>
                            No me convence ninguna opción
                        </button>
                    </div>
                )
            ) : (
                <div>
                    <h5>Prueba en primera persona como funcionan y como responden las APIs de visión por ordenador de las empresas más reconocidas.</h5>
                </div>
            )}
            <div className={styles.footer}>
                <p>Made by <span className={styles.name}>Javier Cuenca Gento</span> for 
                <a href='https://www.uc3m.es/Home'> UC3M</a></p>
            </div>
        </div>
        </div>
        </Layout>
    );
}
