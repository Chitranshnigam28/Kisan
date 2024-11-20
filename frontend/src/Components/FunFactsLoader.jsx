import React from 'react';

const FunFactsLoader = () => {
    const styles = {
        loaderContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            backgroundColor: "transparent", // Set background color to #689f38
        },
        greenCircleLoader: {
            width: "50px",
            height: "50px",
            border: "6px solid white", // Set loader color to white
            borderRadius: "50%",
            borderTop: "6px solid transparent", // Transparent top for spinning effect
            animation: "spin 1s linear infinite",
        }
    };

    return (
        <div>
            <style>{`
                /* Additional CSS for finer control */
                .loader-container {
                    animation: fade-in 1s ease-in-out;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            <div style={styles.loaderContainer} className="loader-container">
                <div style={styles.greenCircleLoader}></div>
            </div>
        </div>
    );
};

export default FunFactsLoader;
