import  { useState } from "react";
import StepNavigation from "./StepNavigation";
import CourseForm from "./CourseForm";
import ModuleForm from "./ModuleForm";
import LessonFormWithContent from "./LessonForm"; // merged component with lesson + content forms

const steps = [
    { id: 1, title: "Course Details" },
    { id: 2, title: "Add Modules" },
    { id: 3, title: "Add Lessons & Content" }, // Updated step title to reflect merge
];

const CourseWizard = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [courseId, setCourseId] = useState(null);
    const [modules, setModules] = useState([]);
    const [lessons, setLessons] = useState([]);

    
    const fetchModules = async () => {
        if (!courseId) return;
        try {
            const res = await fetch(`/api/courses/${courseId}/modules`);
            const data = await res.json();
            if (res.ok && data.success) {
                setModules(data.data);
            } else {
                console.error("Failed to fetch modules:", data.message);
            }
        } catch (err) {
            console.error("Error fetching modules:", err);
        }
    };

    const handleCourseCreated = (id) => {
        setCourseId(id);
        setCurrentStep(2);
    };

    const handleModuleCreated = async () => {
        await fetchModules(); // Refresh modules after adding
        setCurrentStep(3);
    };

    const handleLessonCreated = (newLessons) => {
        setLessons(newLessons);
        // Since this is the last step, no need to move forward further
    };

    const goToStep = (step) => {
        if (step === 2 && !courseId) return;
        if (step === 3 && (modules.length === 0 || !courseId)) return;
        setCurrentStep(step);
    };

    return (
        <div>
            <StepNavigation steps={steps} currentStep={currentStep} onStepClick={goToStep} />

            {currentStep === 1 && <CourseForm onNext={handleCourseCreated} />}

            {currentStep === 2 && courseId && (
                <ModuleForm courseId={courseId} onNext={handleModuleCreated} />
            )}

            {currentStep === 3 && modules.length > 0 && (
                <LessonFormWithContent modules={modules} onNext={handleLessonCreated} lessons={lessons} />
            )}
        </div>
    );
};

export default CourseWizard;
