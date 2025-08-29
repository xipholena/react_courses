import React from 'react';
import {Course} from "./types";
import CourseList from "./components/CourseList";
import "./styles.css"

const courses: Course[] = [
    {
        id: 1,
        title: 'React для початківців',
        description: 'Основи React і компоненти.',
        videoUrl: 'https://www.youtube.com/watch?v=xUTJeJNqtYs',
        price: 500,
    },
    {
        id: 2,
        title: 'TypeScript в React',
        description: 'Поглиблене використання TypeScript у React.',
        videoUrl: 'https://www.youtube.com/watch?v=YxS-kd2sY5s',
        price: 700,
    },
];
const App = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold underline">Список курсів</h1>
        <CourseList courses={courses} />
    </div>
  );
};

export default App;