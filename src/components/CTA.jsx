import { useNavigate } from "react-router-dom"; 
import { ArrowRight } from 'lucide-react'; 

const CTA=()=>{ 
    const x=useNavigate() 

    return( 
        <div className="w-[90%] sm:w-[70%] mx-auto my-24 min-h-[220px] rounded-2xl bg-gradient-to-r from-[var(--color-blue)] to-[var(--color-card)]"> 
            <div className="w-[80%] mx-auto py-10 space-y-4 text-center"> 
                <h2 className="text-xl sm:text-2xl text-[var(--color-text)]">
                    Ready for your next movie night?
                </h2> 

                <p className="text-sm text-[var(--color-muted)]">
                    Find a movie, choose your seats, and enjoy.
                </p> 

                <button 
                    className="bg-[var(--color-accent)] p-2 rounded-2xl cursor-pointer hover:bg-[var(--color-accent-dark)] transition-all duration-200 text-white font-semibold flex mx-auto gap-1 items-center text-lg sm:text-xl" 
                    onClick={()=>x("/movies")}
                >
                    Explore Movies
                    <ArrowRight size={25} className="shrink-0 translate-y-[3px]"/>
                </button> 

            </div> 
        </div> 
    ) 
} 

export default CTA;