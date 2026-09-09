import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react'; 
const NotFound=()=>{
    return(
        <div className="min-h-[70vh] flex flex-col justify-center items-center text-center gap-2">
            <h2 className="text-6xl font-bold text-[var(--color-accent-dark)]">404</h2>
            <h2>Page Not Found</h2>
            <h2>The page you're looking for doesn't exist.</h2>
            <Link
    to="/"
    className="flex items-center gap-1 mt-4 text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
>
    Back
    <ArrowRight size={18} />
</Link>
        </div>
    )
}
export default NotFound;