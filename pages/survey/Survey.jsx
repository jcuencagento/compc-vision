import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/layout';
import styles from '../../styles/Survey.module.css';
import axios from 'axios';

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
        <div className={styles.outerSquare}>
        <div className={styles.grid}>
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
                        onClick={() => handleAnswer(option, step.image_name, step.category)}
                        disabled={step[option + '_desc'].startsWith('Error')}
                        >
                        {step[option + '_desc']}
                    </button>
                ))}
                <button className={styles.buttonOpt} onClick={() => handleAnswer(
                    'none', step.image_name, step.category
                )}>
                    No me convence ninguna opción
                </button>
            </div>
            <div className={styles.buttons}>
                <button className={styles.buttonFinish} onClick={handleFinish}>
                    Finalizar encuesta
                </button>
            </div>
            <div className={styles.footer}>
                <p>Made by <span className={styles.name}>Javier Cuenca Gento</span> for 
                <a href='https://www.uc3m.es/Home'> UC3M</a></p>
            </div>
        </div>
        </div>
    );

export default function Survey({ shuffledImageDescriptions }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [finish, setFinish] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [surveyResponses, setSurveyResponses] = useState([]);

    const handleAnswer = async (answer, image_name, category) => {
        const response = {
            image_name,
            category,
            selection: answer
        };

        setSurveyResponses((prevResponses) => [...prevResponses, response]);

        if (currentStep < shuffledImageDescriptions.length - 2) {
            setCurrentStep(currentStep + 1);
        } else {
            try {
                await axios.post('/api/db-insert', surveyResponses);
                swal('Wow, más de 200 imágenes respondidas!');
                setFinish(true);
                router.push('/');
            } catch (error) {
                console.error('Error inserting survey responses:', error);
                setFinish(true);
                router.push('/');
            }
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
        .then(async (willDelete) => {
            if (willDelete) {
                if (!currentStep === 0) {
                    swal("Terminado... Gracias!", {
                        buttons: false,
                        timer: 1500
                    });

                    setFinish(true);
                    router.push('/');
                }

                swal("Terminado... Gracias!", {
                    buttons: false,
                    timer: 3000
                });

                try {
                    console.log(' - Introduzco datos en SQL...');
                    await axios.post('/api/db-insert', surveyResponses);
                    setFinish(true);
                    router.push('/');
                } catch (error) {
                    console.error('Error inserting survey responses:', error);
                    setFinish(true);
                    router.push('/');
                }
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

