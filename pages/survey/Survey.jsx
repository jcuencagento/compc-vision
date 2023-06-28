import { useState } from 'react';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/layout';
import styles from '../../styles/Survey.module.css';

export default function Survey({ shuffledImageDescriptions }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [finish, setFinish] = useState(false);
    let chosen_aws = 0;
    let chosen_google = 0;
    let chosen_azure = 0;
    let chosen_none = 0;
    const handleAnswer = (answer) => {
        // Handle the selected answer
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

        if (currentStep < shuffledImageDescriptions.length - 2) {
            setCurrentStep(currentStep + 1);
        } else {
            swal("Wow, más de 200 imágenes respondidas!");
            setFinish(true);
            //sendResponses(chosen_aws, chosen_google, chosen_azure, chosen_none);
            router.push('/');
        }
    };

    const handleFinish = () => {
        swal({
            title: "¿Terminar ya?",
            text: "Puede finalizar la encuesta y volver a ella cuando desee.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Terminado... Gracias!");
                setFinish(true);
                //sendResponses(chosen_aws, chosen_google, chosen_azure, chosen_none);
                router.push('/');
            } else {
                swal("Continúe!");
            }
        });
    };

    const renderCurrentStep = () => {
        const step = shuffledImageDescriptions[currentStep];
        return (
            <div>
                <Image
                    className={styles.image}
                    priority
                    src={'/images/'+step.image_name}
                    height={144}
                    width={144}
                    alt="Survey Image"
                />
                <div className={styles.options}>
                    <button
                        className={styles.buttonOpt}
                        onClick={() => handleAnswer('Opt1')}>
                        {step.google_desc}
                    </button>
                    <button
                        className={styles.buttonOpt}
                        onClick={() => handleAnswer('Opt2')}>
                        {step.aws_desc}
                    </button>
                    <button
                        className={styles.buttonOpt}
                        onClick={() => handleAnswer('Opt3')}>
                        {step.azure_desc}
                    </button>
                    <button className={styles.buttonOpt} onClick={() => handleAnswer('None')}>
                        No me convence ninguna opción
                    </button>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.buttonFinish} onClick={handleFinish}>
                        Finalizar encuesta!
                    </button>
                </div>
            </div>
        );
    };

    return (
      <Layout>
        {finish ? null : renderCurrentStep()}
      </Layout>
    );
};

export async function getStaticProps() {
    const { shuffleArray } = await import('../../public/utils');
    const imageDescriptions = await import('../../public/image_descriptions.json');
    const shuffledImageDescriptions = shuffleArray(imageDescriptions.default);
    return {
        props: {
            shuffledImageDescriptions
        }
    };
}

