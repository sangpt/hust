import React from 'react';
import { DatePicker } from 'antd';
// import { BrowserRouter } from 'react-router-dom';
// import 'antd/dist/antd.css';
import MainLayout from './Layout/MainLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './routes/dashboard';
import { router } from './Layout/config';

const {
    home,
    socialNetworks, sponsors, introductContent,
    staffs, policies, terms,
    intent, recruitment,
  } = router;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <MainLayout>
            <Switch>
              <Route exact path={home} component={Dashboard} />
            </Switch>
          </MainLayout>
        </Switch>
      </BrowserRouter>
    )
  }
}

function test(date, dateString) {
  console.log(date);
  console.log(dateString);
}

export default App;
