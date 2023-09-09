const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {

    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        setVisibility(visibility)
        console.log(visibility);
    }, [visibility])

    function isVisible() {
        setVisibility(!visibility)
    }

    return <header className="app-header">
        <Link to="/">
            <h3>Appsus</h3>
        </Link>

        <button className="nav-btn" onClick={() => isVisible()}><i className="fa-solid fa-bars"></i> </button>

        {/* <button className="nav-btn" onClick={() => isVisible()}>
            <i class="fa-solid fa-ellipsis-vertical"></i>
            <i class="fa-solid fa-ellipsis-vertical"></i>
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </button> */}

        {visibility && <nav className="main-nav">
            <NavLink to="/"><i className="fa-solid fa-house"></i></NavLink>
            <NavLink to="/about"><i className="fa-solid fa-info"></i></NavLink>
            <NavLink to="/mail"><i className="fa-solid fa-envelope"></i></NavLink>
            <NavLink to="/note"><i className="fa-solid fa-file"></i></NavLink>
        </nav>}
    </header>
}
