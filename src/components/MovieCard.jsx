import { IMAGE_BASE_URL } from "../services/tmdb"; 
import { Link, useNavigate } from "react-router-dom"; 
 
const MovieCard = ({  
    children,  
    certification,  
    style,  
    imageStyle,  
    contentStyle,  
    titleStyle,  
    related,  
    buttonStyle,
    upcoming
}) => {
    const x = useNavigate(); 
 
    const language = { 
        en: "English", 
        ko: "Korean", 
        ja: "Japanese", 
        fr: "French" ,
        id:"Indonesia"
    }; 
 
    return ( 
        <div 
            className={` 
                w-[100%] 
                h-[100%] 
                flex 
                flex-col 
                gap-5 
                ${style} 
            `} 
        > 
 
            <img 
                src={`${IMAGE_BASE_URL}/w500${children.poster_path}`} 
                className={` 
                    object-cover 
                    rounded-lg 
                    ${imageStyle || "w-full aspect-[2/3]"} 
                `} 
            /> 
 
            <div 
                className={` 
                    flex 
                    flex-col 
                    gap-4 
                    ${contentStyle} 
                `} 
            > 
 
                <Link to={`/movies/${children.id}`}
                state={{ upcoming: upcoming }}
                    className={` 
                        hover:text-[var(--color-accent)] 
                        font-extrabold 
                        w-fit 
                        text-base 
                        h-[40px] 
                        ${titleStyle} 
                    `} 
                > 
                    {children.title} 
                </Link> 
 
                {certification && ( 
                    <h2 className=" 
                        w-[60px] 
                        h-[60px] 
                        rounded-full 
                        p-4 
                        border 
                        border-[var(--color-blue-dark)] 
                    "> 
                        {certification}+ 
                    </h2> 
                )} 
 
                {!related && ( 
                    <h2 className=" 
                        font-bold 
                        text-xs 
                        sm:text-sm 
                        text-[var(--color-muted)] 
                    "> 
                        Language: 
                        {language[children.original_language] || 
                            children.original_language} 
                    </h2> 
                )} 
 
            </div> 
 
            <button 
                className={` 
                    bg-[var(--color-accent)] 
                    text-lg 
                    font-bold 
                    rounded-lg 
                    w-full 
                    sm:w-fit 
                    px-2 
                    py-1 
                    text-white 
                    hover:bg-[var(--color-accent-dark)] 
                    transition-all 
                    duration-200 
                    cursor-pointer 
                    ${buttonStyle} 
                `} 
                onClick={() => x(`/movies/${children.id}`, { 
    state: { upcoming: upcoming } 
})}
            > 
                {related ? "Showtimes" : "Show Details"} 
            </button> 
 
        </div> 
    ); 
}; 
 
export default MovieCard;