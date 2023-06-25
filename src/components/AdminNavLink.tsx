import { useRouter } from 'next/router'
 
function AdminNavLink({ children, href }: { children: React.ReactNode, href: string }) {
  const router = useRouter()
  const style = {
    borderLeft: router.asPath.includes(href) ? "2px solid #a78bfa" : "2px solid transparent",
    color: router.asPath === href ? "#a78bfa" : "#fff",
  }
 
  const handleClick = (e: React.MouseEvent) => {
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