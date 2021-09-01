import { createMachine, assign } from 'xstate'
import FetchFunction from './FetchFunction'

const getDeptos = () => {
  const query = FetchFunction({
    url: '/rrhh/deptos',
    metohd: 'get'
  })

  return query
}

const getEmployees = () => {
  const query = FetchFunction({
    url: '/rrhh/employees',
    metohd: 'get'
  })

  return query
}

const RHmachine = createMachine({
  id: 'auth',
  initial: "init",
  context: {
    listEmployees: [],
    listDeptos: [],
    errors: []
  },
  states: {
    init: {},
    getEmployees: {
      invoke: {
        src: getEmployees,
        onDone: {
          target: 'getDeptos',
          actions: assign({
            listEmployees: (ctx, evt) => evt.data
          })
        },
        onError: {
          target: 'error',
          actions: assign({
            errors: (evt) =>  evt.data
          })
        }
      }
    },
    getDeptos: {
      invoke: {
        src: getDeptos,
        onDone: {
          target: 'success',
          actions: assign({
            listDeptos: (ctx, evt) => evt.data
          })
        },
        onError: {
          target: 'error',
          actions: assign({
            errors: (evt) =>  evt.data
          })
        }
      }
    },
    success: {},
    error: {}
  },
  on: {
    GET_INFO_DATA: 'getEmployees',
  }
})

export default RHmachine