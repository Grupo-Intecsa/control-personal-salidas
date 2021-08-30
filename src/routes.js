import Dashboard from 'view/Dashboard'

const routes =  [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', componente: Dashboard },
]

export default routes