import { Plus, Minus } from "lucide-react"; 
 
const FoodCard = ({ 
    title, 
    img, 
    price, 
    id, 
    count, 
    handlecount 
}) => { 
 
    return ( 
        <div className="flex flex-col gap-3 w-[100%]"> 
 
            <img 
                src={img} 
                alt={title} 
                className="h-60 sm:h-70 w-full object-cover" 
            /> 
 
            <h2>{title}</h2> 
 
            <h2>EGP {price}</h2> 
 
            <div className="flex w-full justify-between"> 
 
                <button 
                    className="bg-[var(--color-accent)] p-1 rounded-xl hover:bg-[var(--color-accent-dark)] hover:cursor-pointer" 
                    onClick={() => handlecount(id, "+")} 
                > 
                    <Plus size={20} /> 
                </button> 
 
                <span className="text-lg"> 
                    {count} 
                </span> 
 
                <button 
                    className="bg-[var(--color-accent)] p-1 rounded-xl hover:bg-[var(--color-accent-dark)] hover:cursor-pointer" 
                    onClick={() => handlecount(id, "-")} 
                > 
                    <Minus size={20} /> 
                </button> 
 
            </div> 
 
        </div> 
    ); 
}; 
 
export default FoodCard;