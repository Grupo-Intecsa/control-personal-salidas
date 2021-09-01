// privisonal
import ControlSalidas from "view/ControlSalidas"

const Dashboard = () => {

  const Entradas = () => {
    return(
      <div className="acction__card">
        <p>Control de Salidas</p>
      </div>
    )
  }


  return (
    <div id="Dashboard">
      {/* <h1>Bienvenido</h1> */}
      {/* <Entradas /> */}
      <div style={{ marginBottom: '3rem'}}></div>
      <ControlSalidas />
    </div>
  )
}

export default Dashboard