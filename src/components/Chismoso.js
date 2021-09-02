/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

const Chismoso = ({ state, send, chismosData }) => {

  useEffect(() => {
    if (state?.matches('newSalida')){
      send('GET_ALL_ACTIVE_REG')
    }
  }, [state])

  return (
    <div id="chismoso__container">
      <table>
          <thead>
            <th>Colaborador</th>
            <th>Destino</th>
            <th>Salida</th>
            <th>Acciones</th>
          </thead>
          <tbody>
          { 
            Object
              .values(chismosData)
              .map(employee => {
                return (
                  <tr>
                    <td>{employee.nameEmployee}</td>
                    <td>{employee.destino}</td>
                    <td>{employee.createdAt}</td>
                    <td><button>Remover</button></td>
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