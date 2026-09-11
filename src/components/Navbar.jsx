import { Clapperboard, Search, CircleUser, Menu } from "lucide-react"; 
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react"; 
 
const Navbar = () => { 
    const x=useNavigate()
    const [isOpen, setIsOpen] = useState(false); 
    const [isLoggedIn,setIsLoggedIn]=useState(()=>{
        return localStorage.getItem('isLoggedIn')==='true'
    })
    const navLinkStyles = ({ isActive }) => 
        isActive 
            ? "md:px-2 px-1 text-[var(--color-accent)]" 
            : "md:px-2 px-1 text-[var(--color-text)]"; 
            useEffect(()=>{
                const updateLoginStatus=()=>{
                    setIsLoggedIn(localStorage.getItem('isLoggedIn')==='true')
                }
                    window.addEventListener('LoginStatusChanged',updateLoginStatus)
                    return()=>{
                        window.removeEventListener('LoginStatusChanged',updateLoginStatus)
                    }
            },[])
    return ( 
<div className="w-full relative h-[60px] bg-[var(--color-card)] border-b border-[rgba(120,191,213,0.25)] shadow-[0_4px_20px_rgba(120,191,213,0.15)]"> 
            <div className="w-[90%] py-4 md:w-[95%] md:py-4 lg:py-2.5 mx-auto flex justify-between"> 
 
                <Link className="flex items-center gap-2" to="/"> 
                    <Clapperboard 
                        size={25} 
                        className="text-[var(--color-blue-dark)]" 
                    /> 
 
                    <h2 className="font-bold text-[var(--color-text)]"> 
                        CineBook 
                    </h2> 
                </Link> 
 
                <div className="hidden md:flex items-center gap-2 lg:p-2 bg-[var(--color-bg)] p-1 rounded-4xl border border-[rgba(120,191,213,0.2)]"> 
 
                    <NavLink to="/" className={navLinkStyles}> 
                        Home 
                    </NavLink> 
 
                    <NavLink to="/movies" className={navLinkStyles}> 
                        Movies 
                    </NavLink> 
                    {isLoggedIn&&
                    <NavLink to="/tickets" className={navLinkStyles}>
                        My Tickets
                     </NavLink>
}
 
                </div> 
 
                <div className="flex items-center gap-4"> 
 
                    <Menu 
                        className="md:hidden text-[var(--color-blue-dark)]" 
                        size={25} 
                        onClick={() => setIsOpen(!isOpen)} 
                    /> 
 
                    {isOpen && ( 
                        <div className="top-full w-full right-0 mt-2 absolute flex flex-col gap-2 p-3 rounded-xl bg-[var(--color-card)] border border-[rgba(120,191,213,0.25)] md:hidden z-50"> 
 
                            <NavLink to="/" className={navLinkStyles}> 
                                Home 
                            </NavLink> 
 
                            <NavLink to="/movies" className={navLinkStyles}> 
                                Movies 
                            </NavLink> 
                            {isLoggedIn&&
                            <NavLink to="/tickets" className={navLinkStyles}> 
                                My Tickets 
                            </NavLink>}
                            {
    isLoggedIn&&<button className="p-2 rounded-2xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] cursor-pointer text-white" onClick={()=>{
        localStorage.removeItem('isLoggedIn')
        window.dispatchEvent(new Event('LoginStatusChanged'))
    }}>
        LogOut
    </button>
}
{
    !isLoggedIn&&<div className="flex flex-col gap-2">
        <button onClick={()=>x("/signup")} className="p-2 rounded-2xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] cursor-pointer text-white">Sign Up</button>
        <button onClick={()=>x("/login")} className="p-2 rounded-2xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] cursor-pointer text-white">Login</button>
    </div>
}
                        </div> 
                    )}
                    {isLoggedIn&&
                    <Link to="/profile"> 
                        <CircleUser className="text-[var(--color-blue-dark)]" /> 
                    </Link> 
}
{
    isLoggedIn&&<button className="hidden md:flex p-2 rounded-2xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] cursor-pointer text-white" onClick={()=>{
        localStorage.removeItem('isLoggedIn')
        window.dispatchEvent(new Event('LoginStatusChanged'))
        x("/")
    }}>
        LogOut
    </button>
}
{
    !isLoggedIn&&<div className="gap-2 hidden items-center md:flex">
        <button onClick={()=>x("/signup")} className="p-2 rounded-2xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] cursor-pointer text-white">Sign Up</button>
        <button onClick={()=>x("/login")} className="p-2 rounded-2xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] cursor-pointer text-white">Login</button>
    </div>
}
                </div> 
 
            </div> 
        </div> 
    ); 
}; 
 
export default Navbar;