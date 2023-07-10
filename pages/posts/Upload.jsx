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

                    console.log({ imageUploaded })
                    console.log({ formData });

                    const response = await fetch('/api/image-descriptions', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        console.log({ response });
                        throw new Error('An error occurred while fetching image descriptions');
                    }

                    console.log('Upload useEffect');
                    console.log({ response });

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
            console.log(' - Introduzco datos en SQL...');
            await axios.post('/api/db-insert', response);
            router.push('/');
        } catch (error) {
            console.error('Error inserting survey responses:', error);
            router.push('/');
        }
    }

    return (
        <Layout>
            {!imageUploaded ? <h1>Pruébalo</h1> : null}
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
                    <h5>No tengas miedo</h5>
                </div>
            )}
        </Layout>
    );
}
