import { Clapperboard } from "lucide-react"; 
import { Link } from "react-router-dom"; 
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6"; 

const Footer=()=>{ 
    return( 
        <div className="w-[100%] min-h-[250px] bg-gradient-to-r from-[var(--color-accent-dark)] via-[var(--color-accent)] to-[var(--color-blue-dark)]"> 
            <div className="w-[90%] sm:w-[80%] mx-auto py-16 flex flex-col justify-between items-center space-y-4"> 
                 
                <div className="flex items-center gap-2"> 
                    <Clapperboard size={25} className="text-[var(--color-blue)]"/> 
                    <h2 className="font-bold text-white">CineBook</h2> 
                </div> 

                <p className="text-white/80">
                    Your movie night starts here.
                </p> 

                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 w-full lg:w-[50%] text-white"> 
                    <Link className="hover:text-[var(--color-blue)]" to="/movies">
                        Movies
                    </Link> 

                    <Link className="hover:text-[var(--color-blue)]" to="/movies">
                       Book Ticket
                    </Link>

                    <Link className="hover:text-[var(--color-blue)]" to="/profile">
                      Profile
                    </Link> 
                </div> 

                <div className="flex justify-between gap-3"> 
                     
                    <FaInstagram 
                        className="w-9 h-9 p-2 rounded-full bg-white/10 border border-[var(--color-blue)] text-[var(--color-blue)] cursor-pointer hover:bg-[var(--color-blue)] hover:text-[var(--color-accent-dark)] transition-all duration-200"
                    /> 

                    <FaFacebookF 
                        className="w-9 h-9 p-2 rounded-full bg-white/10 border border-[var(--color-blue)] text-[var(--color-blue)] cursor-pointer hover:bg-[var(--color-blue)] hover:text-[var(--color-accent-dark)] transition-all duration-200"
                    /> 

                    <FaXTwitter 
                        className="w-9 h-9 p-2 rounded-full bg-white/10 border border-[var(--color-blue)] text-[var(--color-blue)] cursor-pointer hover:bg-[var(--color-blue)] hover:text-[var(--color-accent-dark)] transition-all duration-200"
                    /> 

                </div> 

                <div className="h-[1px] w-[100%] bg-white/20"></div> 

                <p className="text-white/70">
                    © 2026 CineBook All rights reserved. 
                </p> 

            </div> 
        </div> 
    ) 
} 

export default Footer;