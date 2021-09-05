import { useEffect } from "react"
import { useForm } from "react-hook-form"

import RHmachine from "context/RHmachine"
import { useMachine } from '@xstate/react'

import Chismoso from "./Chismoso"
import { useMemo } from "react/cjs/react.development"


const InputSalidas = () => {

  const [state, send] = useMachine(RHmachine)
  const { register, handleSubmit, watch, reset } = useForm()
  

  const { listEmployees, listDeptos } = state.context
  const codigoWatch = watch("codigo")
  const employee = watch('employee')

  const onSubmit = (data) => {

      const payload = {
        empleado: data.codigo,
        destino: data.destino,
        nameEmployee: data.employee
      }

      send('POST_SALIDA_EMPLOYEE', { data: payload })
      reset()
  }

  useEffect(() => {
    send('GET_ALL_ACTIVE_REG')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (state.matches('newSalida')){
      reset()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  useEffect(() => {
    send('GET_INFO_DATA')
  }, [send])
 
  const departametSelected = useMemo(() => {

    const card =  listDeptos.length > 0 && 
    Object
      .values(listDeptos)
      .filter(card => card._id === codigoWatch )
    return  Array.isArray(card) && card[0]?.title
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigoWatch])

  return (
  <>
    <div className="salidas__container__input">
      <div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input 
            placeholder="Ingrese el codigo de la tarjeta" 
            {...register('codigo', { required: true })}
            />
        </label>
        {
          state.matches('success') &&
          <p className="input__depto__selected">{ departametSelected }</p>
        }
        { 

          <div 
            hidden={!departametSelected}
          >
          <label>Seleccione un colaborador:
            <input 
              list="employees" 
              name="employees" 
              {...register('employee', { required: true })}
            />
            </label>
          <datalist 
            id="employees"
            >
            {
              Object.values(listEmployees)
                .map(employee => <option key={employee._id}>{employee.nombre}</option>)
            }
          </datalist>
          </div>          
  
        }
        {
          employee && 
          <input 
            placeholder="Añadir Destino" 
            {...register('destino', { required: true })}
            />
        }
        <div style={{ marginBottom: '20px' }}></div>
        <button type="submit">Marcar Salida</button>
      </form>
    </div>
    <div style={{ marginBottom: '20px' }}></div>
    <Chismoso 
      state={state}
      send={send}
      chismosData={state.context.chismoso}
    />
  </>
  
  )
}

export default InputSalidas
