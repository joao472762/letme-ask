import { Home } from './pages/Home';
import {NewRoom}  from './pages/newRoom'

import {Route, BrowserRouter,Switch} from 'react-router-dom'

import {AuthContextProvider} from './contexts/authContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/adminRoom';

function App() {
  
  return(
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' component={NewRoom}/>
          <Route path='/rooms/:id' component={Room}/>
          <Route path='/admin/:id' component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>  
    </BrowserRouter>
  );

}

export default App;
