import { useState } from "react"
import Containers from "./Containers"

const Layout = ({ props }) => {


  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const toogleHAmburger = () => setHamburgerOpen(!hamburgerOpen)

  return (
    <div className="App__container">
        <div className="App__header">
          <nav>

            <div>
              <span 
                onClick={toogleHAmburger}
                className={hamburgerOpen ? "hamburger__button__open hamburger__button" : "hamburger__button"}> 
                <span></span>
                <span></span>
                <span></span>
              </span>
              <a href="/">
                <h1 className="title__ita">Grupo Intecsa</h1>
              </a>
            </div>

            <div>
              <a href="/" className="mr-3">
                Login
              </a>
            </div>
          </nav>
        </div>
        <div className="App__Slidebar" hidden={!hamburgerOpen}>
            {/* logo y pequeño menu de usuario */}
            <nav>
              <button>RRHH</button>
            </nav>
          </div>
        <section className="App__body">
          <Containers {...props} />
        </section>
        <div className="App__footer">

        </div>
    </div>
  )
}

export default Layout
