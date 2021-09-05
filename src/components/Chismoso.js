/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import DateHook from 'utils/DateHook'

const Chismoso = ({ state, send, chismosData }) => {

  const handleRemoveSalida = (employee) => {
    send('REMOVE_SALIDA', { data: employee })
  }

  useEffect(() => {
    if (state?.matches('newSalida')){
      send('GET_ALL_ACTIVE_REG')
    }
  }, [state])

  return (
    <div id="chismoso__container">
    <h1>Salidas activas</h1>
      <table>
        <tbody>
          <tr>
            <th>Colaborador</th>
            <th>Destino</th>
            <th>Salida</th>
            <th>Acciones</th>
          </tr>
          { 
            state.matches('success') &&
            chismosData.length > 0 &&
            Object
              .values(chismosData)
              .map(employee => {
                return (
                  <tr key={employee._id}>
                    <td>{employee.nameEmployee}</td>
                    <td>{employee.destino}</td>
                    <td>{<DateHook date={employee.createdAt} />}</td>
                    <td><button onClick={() => handleRemoveSalida(employee)}>Remover</button></td>
                  </tr>
                )
              })
          }
          </tbody>
      </table>      
    </div>
  )
}

export default Chismoso