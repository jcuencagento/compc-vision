import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import styles from '../../styles/Survey.module.css';
import stylesUtils from '../../styles/utils.module.css';
import ImageUpload from '../../components/imageupload';
import swal from 'sweetalert';
import Loader from '../../components/loader';

export default function Upload() {
    const router = useRouter();
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

        swal("Muchas gracias... Puede probar de nuevo cuando quiera!");
        //sendResponsesPruebalo(chosen_aws, chosen_google, chosen_azure, chosen_none);
        router.push('/');
    }

    return (
        <Layout>
            {!imageUploaded ? <h1>Pruébalo</h1> : null}
            <ImageUpload onImageUpload={setImageUploaded} />
            {imageUploaded ?
                (Object.keys(imageDescriptions).length === 0 || uploading ? (
                    <Loader />
                ) : (
                    <div className={styles.options}>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('Opt1')}>
                            {imageDescriptions.aws_description || 'Fallo de AWS'}
                        </button>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('Opt2')}>
                            {imageDescriptions.azure_description || 'Fallo de AZURE'}
                        </button>
                        <button
                            className={styles.buttonOpt}
                            onClick={() => handleAnswer('Opt3')}>
                            {imageDescriptions.google_description || 'Fallo de GOOGLE'}
                        </button>
                        <button className={styles.buttonOpt} onClick={() => handleAnswer('None')}>
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
