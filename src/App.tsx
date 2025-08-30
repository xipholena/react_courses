import React from 'react';
import CourseList from "./courses/components/CourseList";
import {ThemeProvider} from "@emotion/react";
import {theme} from "./theme";
import {courses} from "./mocks";



const App = () => {
  return (
      <ThemeProvider theme={theme}>
          <div>
              <h1 className="text-3xl font-bold underline">Список курсів</h1>
              <CourseList courses={courses} />
          </div>
      </ThemeProvider>

  );
};

export default App;