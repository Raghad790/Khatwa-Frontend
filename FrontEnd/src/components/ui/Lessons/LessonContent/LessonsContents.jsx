// components/LessonContent/index.jsx
import React from 'react';
import VideoLesson from './VideoLesson';
import AssignmentLesson from './AssignmentLesson';
import TextLesson from './TextLesson';
import AssignmentSubmission from '../AssignmentSubmission/AssignmentSubmission';
import QuizLesson from './QiuzLesson';

const LessonContent = ({ lesson }) => {
    switch (lesson.content_type) {
        case 'video':
            return <VideoLesson src={lesson.content_url} />;

        case 'assignment':
            return (
                <>
                    <AssignmentLesson src={lesson.content_url} />
                    <AssignmentSubmission lessonId={lesson.id} />
                </>
            );
        case 'quiz':
            return <QuizLesson lessonId={lesson.id} />;  // New quiz handler
        case 'text':
        default:
            return <TextLesson content={lesson.description} />;
    }

};

export default LessonContent;
