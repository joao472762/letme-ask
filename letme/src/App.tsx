import { Home } from './pages/Home';
import {NewRoom}  from './pages/newRoom'

import {Route, BrowserRouter} from 'react-router-dom'

import {AuthContextProvider} from './contexts/authContext'

function App() {
  
  return(
    <BrowserRouter>
      <AuthContextProvider>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' component={NewRoom}/>
      </AuthContextProvider>  
    </BrowserRouter>
  );

}

export default App;
