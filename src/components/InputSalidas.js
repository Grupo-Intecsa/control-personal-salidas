import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import RHmachine from "context/RHmachine"
import { useMachine } from '@xstate/react'


const InputSalidas = () => {

  const [state, send] = useMachine(RHmachine)

  const { register, handleSubmit, watch } = useForm()
  const [deptoSelect, setDeptoSelect] = useState(undefined)
  const [inputEmployee, setInputEmployee] = useState(false)

  const { listEmployees, listDeptos, errors } = state.context
  const codigoWatch = watch("codigo", { listEmployees, listDeptos, errors })

  const onSubmit = (data) => {
    const selectEployee = Array.isArray(listEmployees) && 
      listEmployees.filter(employee => employee.nombre === data.employee)

      console.log({ selectEployee, data })
  }

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
        <div style={{ marginBottom: '20px' }}></div>
        <button type="submit">Marcar Salida</button>
      </form>
    </div>
  )
}

export default InputSalidas
