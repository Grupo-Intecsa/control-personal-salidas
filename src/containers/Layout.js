import Containers from "./Containers"

const Layout = ({ props }) => {
  return (
    <div className="App__container">
        <div className="App__header">
          <nav className="App__Slidebar">
            <a href="/">
              Home
            </a>
          </nav>
          <div>
            {/* logo y pequeño menu de usuario */}
          </div>
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
