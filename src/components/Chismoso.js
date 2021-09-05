/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

const Chismoso = ({ state, send, chismosData }) => {

  const handleRemoveSalida = (employee) => {
    console.log(employee)
  }

  useEffect(() => {
    if (state?.matches('newSalida')){
      send('GET_ALL_ACTIVE_REG')
    }
  }, [state])

  return (
    <div id="chismoso__container">
      <table>
        <tbody>
          <tr>
            <th>Colaborador</th>
            <th>Destino</th>
            <th>Salida</th>
            <th>Acciones</th>
          </tr>
          { 
            Object
              .values(chismosData)
              .map(employee => {
                return (
                  <tr>
                    <td>{employee.nameEmployee}</td>
                    <td>{employee.destino}</td>
                    <td>{employee.createdAt}</td>
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