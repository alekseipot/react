import React from 'react';
import {Route,Switch} from 'react-router-dom'
import QuizList from "./conteiners/QuizList/QuizList";
import QuizCreator from "./conteiners/QuizCreator/QuizCreator";
import Auth from "./conteiners/Auth/Auth";
import Layout from "./hoc/Layout/Layout";

import Quiz from "./conteiners/Quiz/Quiz";
function App() {
  return (
      <Layout>
          <Switch>
              <Route path='/auth' component={Auth}/>
              <Route path='/quiz-creator' component={QuizCreator}/>
              <Route path='/quiz/:id' component={Quiz}/>
              <Route path='/' component={QuizList}/>
          </Switch>
      </Layout>
  );
}

export default App;
