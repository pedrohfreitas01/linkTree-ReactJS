import { createBrowserRouter } from 'react-router-dom'


import Home from './Pages/Home'
import Login from './Pages/Login'
import Socials from './Pages/Socials'
import Admin from './Pages/admin'
import { PrivateRoute } from './routes/Private'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin/social",
    element: <Socials />
  },
  {
    path: "/admin",
    element: <PrivateRoute><Admin /></PrivateRoute>
  }
])

export { router }