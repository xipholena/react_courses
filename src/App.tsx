import React from 'react';
import CourseList from "./courses/components/CourseList";
import {css, ThemeProvider} from "@emotion/react";
import {AppTheme, theme} from "./theme";
import {courses} from "./mocks";
import {Provider} from "react-redux";
import {store} from "./store";
import Navbar from "./common/components/Navbar";
import "./global.css"

const title  = (theme: AppTheme) => css({
    padding: theme.spacing*2,
    textAlign: "center",
    color: theme.colors.secondary.teal
})

const App = () => {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <div>
                  <Navbar/>
                  <h1 css={title}>Список курсів</h1>
                  <CourseList courses={courses} />
              </div>
          </Provider>
      </ThemeProvider>

  );
};

export default App;