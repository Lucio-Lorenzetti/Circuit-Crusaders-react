import style from './Layout.module.css'

function Layout({ children }) {
    return <div className='style.container'>{children}</div>;
}

export default Layout;