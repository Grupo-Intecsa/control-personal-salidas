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

const postSalidaEmployee = (ctx, event) => {
  const mutation = FetchFunction({
    url: '/rrhh/salidasactive',
    metohd: 'post',
    data: event.data
   })

  return mutation 
}

const getAllActiveReg = () => {
  const query = FetchFunction({
    url: '/rrhh/registrosget',
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
    errors: [],
    chismoso: []
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
          target: 'getAllActiveReg',
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
    postSalidaEmployee: {
      invoke: {
        src: postSalidaEmployee,
        onDone: {
          target: 'newSalida',
        },
        onError: {
          target: 'error',
          actions: assign({
            errors: (evt) =>  evt.data
          })
        }
      }
    },
    getAllActiveReg: {
      invoke: {
        src: getAllActiveReg,
        onDone: {
          target: 'success',
          actions: assign({
            chismoso: (ctx, event) => event.data
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
    error: {},
    newSalida: {
      after: {
        3000: { target: 'success' }
      }
    },


  },
  on: {
    GET_INFO_DATA: 'getEmployees',
    POST_SALIDA_EMPLOYEE: 'postSalidaEmployee',
    GET_ALL_ACTIVE_REG: 'getAllActiveReg'
  }
})

export default RHmachine