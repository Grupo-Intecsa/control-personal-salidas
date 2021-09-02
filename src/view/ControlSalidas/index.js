import InputSalidas from "components/InputSalidas"

const ControlSalidas = () => {

  return(
    <div className="control__salidas__view">
      <h1>Control de Salidas</h1>
      <section>
        <button disabled={true}>Buscar Registro</button>
      </section>
      
      <section>
        <InputSalidas/>
      </section>
    </div>
  )
}

export default ControlSalidas