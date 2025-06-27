import styles from './StepNavigation.module.css';

const steps = ['Course Info', 'Modules', 'Lessons'];

const StepNavigation = ({ currentStep }) => {
    return (
        <div className={styles.container}>
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;

                return (
                    <div key={label} className={styles.stepWrapper}>
                        <div
                            className={`${styles.circle} 
                                ${isCompleted ? styles.completed : ''} 
                                ${isActive ? styles.active : ''}`}
                        >
                            {isCompleted ? '✓' : stepNumber}
                        </div>
                        <span className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}>
                            {label}
                        </span>
                        {index !== steps.length - 1 && (
                            <div className={`${styles.line} ${stepNumber < currentStep ? styles.lineActive : ''}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepNavigation;
