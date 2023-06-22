import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import styles from '../../styles/Survey.module.css';
import ImageUpload from '../../components/imageupload';
import swal from 'sweetalert';

export default function Upload() {
    const router = useRouter();
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageDescriptions, setImageDescriptions] = useState({});

    useEffect(() => {
        const fetchImageDescriptions = async () => {
            if (imageUploaded) {
                try {
                    const response = await fetch('/api/image-descriptions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ image: '/images/0ee903ea13.jpg' })
                    });

                    if (!response.ok) {
                        console.log({ response });
                        throw new Error('An error occurred while fetching image descriptions');
                    }

                    const data = await response.json();

                    swal(`Results: ${data.aws_description}, ${data.google_description}, ${data.azure_description}`);
                    setImageDescriptions(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchImageDescriptions();
    }, [imageUploaded]);

    let chosen_aws = 0;
    let chosen_google = 0;
    let chosen_azure = 0;
    let chosen_none = 0;
    const handleAnswer = (answer) => {
        switch (answer) {
            case 'aws':
                chosen_aws ++;
                break;

            case 'google':
                chosen_google ++;
                break;

            case 'azure':
                chosen_azure ++;
                break;

            default:
                chosen_none ++;
                break;
        }

        swal("Muchas gracias!");
        //sendResponsesPruebalo(chosen_aws, chosen_google, chosen_azure, chosen_none);
        router.push('/');
    }

    return (
        <Layout>
            {!imageUploaded ? <h1>Pruébalo</h1> : null}
            <ImageUpload onImageUpload={setImageUploaded} />
            {imageUploaded ?
                (Object.entries(imageDescriptions).length === 1 ? (
                    <h4>Cargando....</h4>
                ) : (
                    <div className={styles.options}>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('Opt1')}>
                            {imageDescriptions.aws_description || 'AWS'}
                        </button>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('Opt2')}>
                            {imageDescriptions.azure_description || 'AZURE'}
                        </button>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('Opt3')}>
                            {imageDescriptions.google_description || 'GOOGLE'}
                        </button>
                        <button className={styles.buttonOpt} onClick={() => handleAnswer('None')}>
                            No me convence ninguna opción
                        </button>
                    </div>
                )
            ) : (
                <h5>No tengas miedo</h5>
            )}
        </Layout>
    );
}
