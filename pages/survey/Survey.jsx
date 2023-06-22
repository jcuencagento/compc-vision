import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/layout';
import styles from '../../styles/Survey.module.css';

export default function Survey() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [finish, setFinish] = useState(false);
    let chosen_aws = 0;
    let chosen_google = 0;
    let chosen_azure = 0;
    let chosen_none = 0;

    //Esto vendrá de csv
    const steps = [
      { image: '/images/0be3797d3d.jpg', opt1: 'Hola', opt2: 'Adios', opt3: 'Yeahh' },
      { image: '/images/0dbf839301.jpg',  opt1: 'Mono', opt2: 'Monaco', opt3: 'Gorilin' },
      { image: '/images/0ee903ea13.jpg', opt1: 'Si', opt2: 'No', opt3: 'Claro' },
      { image: '/images/1b0b0b614b.jpg',  opt1: 'Ciervo', opt2: 'Madridista', opt3: 'Perro' },
      { image: '/images/0be3797d3d.jpg', opt1: 'Hola', opt2: 'Adios', opt3: 'Yeahh' },
      { image: '/images/0dbf839301.jpg',  opt1: 'Mono', opt2: 'Monaco', opt3: 'Gorilin' },
      { image: '/images/0be3797d3d.jpg', opt1: 'Hola', opt2: 'Adios', opt3: 'Yeahh' },
      { image: '/images/0dbf839301.jpg',  opt1: 'Mono', opt2: 'Monaco', opt3: 'Gorilin' },
      // Add more steps as needed
    ];

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

        if (currentStep < steps.length - 2) {
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
        const step = steps[currentStep];

        return (
            <div>
                <Image
                    className={styles.image}
                    priority
                    src={step.image}
                    height={144}
                    width={144}
                    alt="Survey Image"
                />
                <div className={styles.options}>
                    <button
                        className={styles.buttonOpt}
                        onClick={() => handleAnswer('Opt1')}>
                        {step.opt1}
                    </button>
                    <button
                        className={styles.buttonOpt}
                        onClick={() => handleAnswer('Opt2')}>
                        {step.opt2}
                    </button>
                    <button
                        className={styles.buttonOpt}
                        onClick={() => handleAnswer('Opt3')}>
                        {step.opt3}
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
