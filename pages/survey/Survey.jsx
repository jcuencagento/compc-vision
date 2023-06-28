import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/layout';
import styles from '../../styles/Survey.module.css';

const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
};

const renderCurrentStep = (step, shuffledOptions, handleAnswer, handleFinish ) =>
    (
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
                {shuffledOptions.map((option) => (
                    <button
                        key={option}
                        className={styles.buttonOpt}
                        onClick={() => handleAnswer(option)}
                        >
                        {step[option + '_desc']}
                    </button>
                ))}
                <button className={styles.buttonOpt} onClick={() => handleAnswer('none')}>
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

export default function Survey({ shuffledImageDescriptions }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [finish, setFinish] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [chosen_aws, setChosenAWS] = useState(0);
    const [chosen_google, setChosenGoogle] = useState(0);
    const [chosen_azure, setChosenAzure] = useState(0);
    const [chosen_none, setChosenNone] = useState(0);

    const handleAnswer = (answer) => {
        console.log(`Un usuario elige ${answer}`)
        switch (answer) {
            case 'aws':
                setChosenAWS(chosen_aws + 1);
                break;

            case 'google':
                setChosenGoogle(chosen_google + 1);
                break;

            case 'azure':
                setChosenAzure(chosen_azure + 1);
                break;

            default:
                setChosenNone(chosen_none + 1);
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
                console.log(' - Usuario sale de la encuesta con estos resultados:');
                console.log(`AWS: ${chosen_aws}, Google: ${chosen_google}, Azure: ${chosen_azure}, ninguno: ${chosen_none},`);
                console.log(' -> Enviando a BBDD...');
                //sendResponses(chosen_aws, chosen_google, chosen_azure, chosen_none);
                router.push('/');
            } else {
                swal("Continúe!");
            }
        });
    };

    useEffect(() => {
        const options = ['google', 'aws', 'azure'];
        const shuffled = shuffleArray(options);
        setShuffledOptions(shuffled);
    }, []);

    const step = shuffledImageDescriptions[currentStep];

    return (
        <Layout>
            {finish ? null : renderCurrentStep(step, shuffledOptions, handleAnswer, handleFinish )}
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

