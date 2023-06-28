import React from 'react';

const Error = () => {
    return <>
        <style jsx>{`
            .error_animation {
                position: relative;
                width: 100px;
                height: 100px;
            }

            .error_animation:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 140px;
                height: 140px;
                background-image: url('/img/error.png');
                background-repeat: no-repeat;
                background-size: contain;
                animation: error_animation 1.5s linear infinite;
            }

            .error_animation span {
                position: absolute;
                top: 120%;
                left: 50%;
                transform: translateX(-50%);
                width: 800px;
                font-size: 20px;
                color: #000;
                font-weight: bold;
                text-align: center;
                animation: text_animation 1s linear infinite;
            }

            @keyframes error_animation {
                0% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.4); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }

            @media (max-width: 600px) {
                .error_animation {
                    position: relative;
                    width: 90px;
                    height: 90px;
                }

                .error_animation:before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 120px;
                    height: 120px;
                    background-image: url('/img/error.png');
                    background-repeat: no-repeat;
                    background-size: contain;
                    animation: error_animation 1.5s linear infinite;
                }

                .error_animation span {
                    position: absolute;
                    top: 120%;
                    transform: translateX(-50%);
                    width: 300px;
                    font-size: 18px;
                    color: #000;
                    font-weight: bold;
                    text-align: center;
                    animation: text_animation 1s linear infinite;
                }

                @keyframes error_animation {
                    0% { transform: translate(-50%, -50%) scale(0.8); }
                    50% { transform: translate(-50%, -50%) scale(1.2); }
                    100% { transform: translate(-50%, -50%) scale(0.8); }
                }
            }
        `}</style>
        <div className="error_animation">
            <span>Error en alguna API... Pruebe de nuevo más adelante.</span>
        </div>
    </>
};

export default Error;