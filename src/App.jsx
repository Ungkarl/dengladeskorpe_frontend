
import { useLocation, useRoutes } from 'react-router-dom'
import './App.css'



import GlobalNavigation from './components/GlobalNavigation/GlobalNavigation'
import GlobalFooter from './components/GlobalFooter/GlobalFooter'





import Frontpage from './pages/frontpage/Frontpage'
import EmployeesPage from './pages/employees/EmployeesPage'
import DishPage from './pages/dish/DishPage'
import BasketPage from './pages/basketPage/BasketPage'
import ContactPage from './pages/contact/ContactPage'
import BackofficePage from './pages/backoffice/BackofficePage'
import SignInPage from './pages/backoffice/signIn/SignInPage.jsx'
import Dashboard from './pages/backoffice/dashboard/Dashboard.jsx'
import EmployeesDashboard from './pages/backoffice/employeesDashboard/employeesDashboard.jsx'
import AddEmployee from './components/BackofficeComponents/Employees/addEmployee/AddEmployee.jsx'
import DeleteEmployee from './components/BackofficeComponents/Employees/DeleteEmployee/DeleteEmployee.jsx'
import UpdateEmployee from './components/BackofficeComponents/Employees/UpdateEmployee/UpdateEmployee.jsx'

import MessagesDashboard from './pages/backoffice/messagesDashboard/MessagesDashboard.jsx'
import DeleteMessage from './components/BackofficeComponents/Messages/DeleteMessage/DeleteMessage.jsx'
import EditMessage from './components/BackofficeComponents/Messages/EditMessage/EditMessage.jsx'


import DishesDashboard from './pages/backoffice/dishesDashboard/DishesDashboard.jsx'
import AddDish from './components/BackofficeComponents/DishesBackoffice/AddDish/AddDish.jsx'
import UpdateDish from './components/BackofficeComponents/DishesBackoffice/UpdateDish/UpdateDish.jsx'
import DeleteDish from './components/BackofficeComponents/DishesBackoffice/DeleteDish/DeleteDish.jsx'



import OrdersDashboard from './pages/backoffice/ordersDashboard/OrdersDashboard.jsx'
import EditOrder from './components/BackofficeComponents/Orders/EditOrder/EditOrder.jsx'
import DeleteOrder from './components/BackofficeComponents/Orders/DeleteOrder/DeleteOrder.jsx'
import { useEffect } from 'react'

function App() {
  const location = useLocation()
  const isBackoffice = location.pathname.includes('backoffice')

  //Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])


  const routes = useRoutes([
    {
      path: '/',
      element: <Frontpage />
    },
    {
      path: '/dish/:id', // Sørg for korrekt dynamisk parameter
      element: <DishPage />
    },
    {
      path: '/employees',
      element: <EmployeesPage />
    },
    {
      path: '/contact',
      element: <ContactPage />
    },
    {
      path: '/basket',
      element: <BasketPage />
    },
    {
      path: '/backoffice',
      element: <BackofficePage />,
      children: [
        {
          path: 'signin', 
          element: <SignInPage />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'dishes',
          element: <DishesDashboard />,
          children: [
            {
              path: 'add',
              element: <AddDish />
            },
            {
              path: 'edit/:id',
              element: <UpdateDish />
            },
            {
              path: 'delete/:id',
              element: <DeleteDish />
            },
          ]
        },
        {
          path: 'messages',
          element: <MessagesDashboard />,
          children: [
            {
              path: 'edit/:id',
              element: <EditMessage />
            },
            {
              path: 'delete/:id',
              element: <DeleteMessage />
            }
          ]
        },
        {
          path: 'employees',
          element: <EmployeesDashboard />,
          children: [
            {
              path: 'add',
              element: <AddEmployee />
            },
            {
              path: 'edit/:id',
              element: <UpdateEmployee />
            },
            {
              path: 'delete/:id',
              element: <DeleteEmployee />
            },
          ]
        },
        {
          path: 'orders',
          element: <OrdersDashboard />,
          children: [
            {
              path: 'edit/:id',
              element: <EditOrder />
            },
            {
              path: 'delete/:id',
              element: <DeleteOrder />
            }
          ]
        }
      ]
    }
  ]);


  return (
    <div className='center-page'>
      {!isBackoffice && <GlobalNavigation />}
      <div className={isBackoffice ? 'page-backoffice' : 'page'} key={location.pathname}>
          {routes}
      </div>
      {!isBackoffice && <GlobalFooter />}
    </div>
  )
}

export default App
