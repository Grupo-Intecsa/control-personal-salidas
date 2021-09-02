import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import RHmachine from "context/RHmachine"
import { useMachine } from '@xstate/react'

import Chismoso from "./Chismoso"


const InputSalidas = () => {

  const [state, send] = useMachine(RHmachine)

  const { register, handleSubmit, watch, reset } = useForm()
  const [deptoSelect, setDeptoSelect] = useState(undefined)
  const [inputEmployee, setInputEmployee] = useState(false)

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

  const codigoSelect = (codigo) => {
    const select = Object
      .values(listDeptos)
      .filter(depto => depto._id === codigo)
      .map(depto => depto.title)

      return select
  }

  useEffect(() => {
    if(state.matches('success')){
      setDeptoSelect(codigoSelect(codigoWatch))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigoWatch])

  useEffect(() => {
    if (deptoSelect?.length > 0){
      setInputEmployee(true)
    } else {
      setInputEmployee(false)
    }
  }, [deptoSelect])

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
          codigoWatch.length > 6 &&
          <p 
            className="input__depto__selected"
          >{ deptoSelect }
          </p>

        }
        { 

          <div 
            hidden={!inputEmployee}
          >
          <label>Seleccione un colaborador:
            <input 
              list="employees" 
              name="employees" 
              {...register('employee')}
            />
            </label>
          <datalist 
            id="employees"
            >
            {
              Object.values(listEmployees)
                .map(employee => <option>{employee.nombre}</option>)
            }
          </datalist>
          </div>          
  
        }
        {
          employee && 
          <input 
            placeholder="Añadir Destino" 
            {...register('destino')}
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
