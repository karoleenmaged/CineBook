import { NavLink, Outlet } from "react-router-dom"; 

const Movies=()=>{ 
    return( 
        <div className="pb-20 pt-10"> 

            <div className="relative mt-20 w-[80%] sm:w-[60%] lg:w-[30%] mx-auto bg-[var(--color-bg)] rounded-full p-1 border border-[rgba(120,191,213,0.25)] flex"> 
 
                <NavLink 
                    to="/movies" 
                    end 
                    className={({ isActive }) => 
                        `w-1/2 py-2 text-center rounded-full transition-all duration-300 ${ 
                            isActive 
                                ? "bg-[var(--color-accent)] text-white" 
                                : "text-[var(--color-text)] hover:text-[var(--color-accent)]" 
                        }` 
                    } 
                > 
                    Now Playing 
                </NavLink> 
 
                <NavLink 
                    to="/movies/upcoming" 
                    className={({ isActive }) => 
                        `w-1/2 py-2 text-center rounded-full transition-all duration-300 ${ 
                            isActive 
                                ? "bg-[var(--color-accent)] text-white" 
                                : "text-[var(--color-text)] hover:text-[var(--color-accent)]" 
                        }` 
                    } 
                > 
                    Upcoming 
                </NavLink> 
 
            </div> 
            <Outlet/> 
        </div> 
    ) 
} 

export default Movies