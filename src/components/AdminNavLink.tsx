import { useRouter } from 'next/router'
 
function AdminNavLink({ children, href }) {
  const router = useRouter()
  const style = {
    borderLeft: router.asPath === href ? "2px solid #a78bfa" : "2px solid transparent",
    color: router.asPath === href ? "#a78bfa" : "#fff",
  }
 
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
 
  return (
    <a className='py-3 px-5 block w-full transition duration-150' href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
 
export default AdminNavLink