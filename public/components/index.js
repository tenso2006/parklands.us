import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { Router, Route, browserHistory, IndexRoute} from 'react-router';

import Signin from './authPages/signin.js';
import Signup from './authPages/signup.js';
import UserTimeline from './userTimeline/user_timeline.js';
import Landing from './landing/Landing.js';
import Snp from './snp/Snp.js'
import NotAPark from './snp/NotAPark.js'
import UserFeed from './userFeed/user_Feed.js'

const app = document.getElementById('app');

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Landing} />
      <Route path='signin' component={Signin} />
      <Route path='signup' component={Signup} />
      <Route path='usertimeline' component={UserTimeline} />
      <Route path='userfeed' component={UserFeed} />
      <Route path='park/:parkName' component={Snp} />
      <Route path='notavalidpark/:parkName' component={NotAPark}/>
    </Route>

  </Router>), app);
