import React from 'react';
import CourseList from "./courses/components/CourseList";
import {ThemeProvider} from "@emotion/react";
import {theme} from "./theme";
import {courses} from "./mocks";
import {Provider} from "react-redux";
import {store} from "./store";

const App = () => {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <div>
                  <h1 className="text-3xl font-bold underline">Список курсів</h1>
                  <CourseList courses={courses} />
              </div>
          </Provider>
      </ThemeProvider>

  );
};

export default App;