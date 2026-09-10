import { 
    CircleCheck, 
    CalendarDays, 
    MapPin, 
    Armchair, 
    Ticket, 
    House, 
    Download 
} from "lucide-react"; 
 
import { getMoviedetails,IMAGE_BASE_URL } from "../services/tmdb"; 
import { useEffect, useState, useRef } from "react"; 
import { QRCodeSVG } from "qrcode.react"; 
import photo from "../assets/photo.png"; 
import { useNavigate } from "react-router-dom"; 
import html2canvas from "html2canvas"; 
import toast from "react-hot-toast";
import BookingStepper from "../components/BookingStepper";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage"

const Confirmation = () => { 
    const ticketRef = useRef(null); 
    const x = useNavigate(); 
 
    const [currentTicket, setCurrentTicket] = useState(null); 
    const [movieDetails, setMovieDetails] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const booking = localStorage.getItem("booking");

    let bookinginfo = null;

    try {
        bookinginfo = booking ? JSON.parse(booking) : null;
    }
    catch (error) {
        console.error("Error parsing booking data:", error);
        bookinginfo = null;
    }

    const bookingkey = bookinginfo?.bookingId;

    let selectedSeats = [];

    try {
        const savedSeats = localStorage.getItem(
            `selectedseats_${bookingkey}`
        );

        selectedSeats = savedSeats ? JSON.parse(savedSeats) : [];

        if (!Array.isArray(selectedSeats)) {
            selectedSeats = [];
        }
    }
    catch (error) {
        console.error("Error parsing selected seats:", error);
        selectedSeats = [];
    }
 
    const totalFood = Number( 
        localStorage.getItem(`totalfoods_${bookingkey}`) || 0 
    ); 

    const downloadTicket = async () => {
        try {
            const canvas = await html2canvas(ticketRef.current, {
                backgroundColor: "#6F2335",
                useCORS: true,
                scale: 2,

                onclone: (clonedDoc) => {
                    const ticket = clonedDoc.querySelector("#cinebook-ticket");

                    if (!ticket) {
                        throw new Error("Ticket element not found");
                    }

                    const elements = ticket.querySelectorAll("*");

                    elements.forEach((element) => {
                        const computed = clonedDoc.defaultView.getComputedStyle(element);

                        if (
                            computed.color.includes("oklab") ||
                            computed.color.includes("oklch")
                        ) {
                            element.style.color = "#FFFFFF";
                        }

                        if (
                            computed.backgroundColor.includes("oklab") ||
                            computed.backgroundColor.includes("oklch")
                        ) {
                            element.style.backgroundColor = "rgba(255,255,255,0.2)";
                        }

                        if (
                            computed.borderColor.includes("oklab") ||
                            computed.borderColor.includes("oklch")
                        ) {
                            element.style.borderColor = "rgba(169,216,232,0.25)";
                        }

                        if (
                            computed.boxShadow.includes("oklab") ||
                            computed.boxShadow.includes("oklch")
                        ) {
                            element.style.boxShadow = "0 10px 30px rgba(111,35,53,0.4)";
                        }
                    });

                    const hiddenElements = clonedDoc.querySelectorAll(
                        ".download-hide-icon, .download-hide"
                    );

                    hiddenElements.forEach((element) => {
                        element.style.display = "none";
                    });
                }
            });

            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = "CineBook-Ticket.png";
            link.click();

        } catch (error) {
            console.error("Error downloading ticket:", error);
            toast.error("Failed to download ticket");
        }
    };

    const getDetails = async () => {
        if (!bookinginfo?.movieid) {
            setLoading(false);
            return;
        }

        try {
            const res = await getMoviedetails(bookinginfo.movieid); 
            setMovieDetails(res); 
        }
        catch(error){
            setError(error);
        }
        finally{
            setLoading(false);
        }
    }; 
 
    useEffect(() => { 
        getDetails(); 
    }, [bookinginfo?.movieid]); 

    useEffect(() => { 
 
        if (!movieDetails || !bookinginfo || !bookingkey) return; 

        let oldTickets = [];

        try {
            const savedTickets = localStorage.getItem("tickets");

            if (savedTickets) {
                oldTickets = JSON.parse(savedTickets);
            }

            if (!Array.isArray(oldTickets)) {
                throw new Error("Invalid tickets data");
            }
        }
        catch (error) {
            console.error("Error parsing tickets data:", error);
            setError(error);
            return;
        }
 
        const alreadyExists = oldTickets.some( 
            ticket => 
                ticket.bookingId === bookinginfo.bookingId 
        ); 
 
        if (alreadyExists) { 
 
            const existingTicket = oldTickets.find( 
                ticket => 
                    ticket.bookingId === bookinginfo.bookingId 
            ); 
 
            setCurrentTicket(existingTicket); 
 
            return; 
        } 
 
        const newTicket = { 
            bookingId: bookinginfo.bookingId, 
            movieId: bookinginfo.movieid, 
            movieTitle: movieDetails.title, 
            poster: movieDetails.poster_path, 
            cinema: bookinginfo.cinema, 
            day: bookinginfo.day, 
            time: bookinginfo.time, 
            seats: selectedSeats, 
            foodTotal: totalFood, 
            totalPrice: 
                selectedSeats.length * 150 + totalFood 
        }; 
 
        setCurrentTicket(newTicket); 
 
        const updatedTickets = [ 
            ...oldTickets, 
            newTicket 
        ]; 
 
        try {
            localStorage.setItem( 
                "tickets", 
                JSON.stringify(updatedTickets) 
            ); 
        }
        catch (error) {
            console.error("Error saving ticket:", error);
            setError(error);
        }

    }, [movieDetails, bookinginfo?.bookingId]); 

    const clearBookingData = () => {
        localStorage.removeItem(
            `selectedseats_${bookingkey}`
        );

        localStorage.removeItem(
            `seats_${bookingkey}`
        );

        localStorage.removeItem(
            `totalfoods_${bookingkey}`
        );

        localStorage.removeItem(
            `paymentmethod_${bookingkey}`
        );

        localStorage.removeItem("booking");

        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(`totalcount_${bookingkey}_`)) {
                localStorage.removeItem(key);
            }
        });
    };

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const handleBack = () => {
            clearBookingData();
            x("/");
        };

        window.addEventListener("popstate", handleBack);

        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, []);

    if (!bookinginfo || !bookingkey) {
        return <ErrorMessage />;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    return ( 
        <>
            <BookingStepper currentstep={3}/>

            <div className="lg:w-[80%] w-[100%] mx-auto flex flex-col gap-5 my-8"> 
 
                <div className="flex flex-col gap-2 items-center"> 
 
                    <CircleCheck 
                        size={70} 
                        className="text-[var(--color-accent)] " 
                    /> 
 
                    <h2 className="font-extrabold text-2xl sm:text-3xl"> 
                        Your Booking is Confirmed! 
                    </h2> 
 
                    <h2 className="text-sm sm:text-md"> 
                        Thank you for choosing CineBook, Enjoy your movie! 
                    </h2> 
 
                </div> 

                <div 
                    ref={ticketRef} 
                    id="cinebook-ticket" 
                    className=" 
                        lg:w-[70%]
                        w-[90%] 
                        mx-auto 
                        bg-[var(--color-accent-dark)] 
                        p-6 
                        rounded-2xl 
                        border 
                        border-[rgba(169,216,232,0.25)] 
                        shadow-[0_10px_30px_rgba(111,35,53,0.4)] 
                        text-white 
                        flex 
                        flex-col 
                        gap-4 
                        mt-5 
                        relative 
                    " 
                > 
                   
                    <button 
                        onClick={downloadTicket} 
                        className=" 
                            download-hide 
                            p-2 
                            rounded-lg 
                            hover:bg-white/10 
                            transition 
                            cursor-pointer 
                            absolute 
                            top-4 
                            right-4 
                        " 
                    > 
                        <Download size={22} /> 
                    </button> 

                    <div className="flex flex-col gap-2"> 
 
                        <div className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-0"> 
 
                            <div className="flex gap-3 sm:gap-5 flex-1 min-w-0"> 
 
                                {movieDetails && ( 
                                    <img 
                                        src={`${IMAGE_BASE_URL}/w200${movieDetails.poster_path}`}
                                        className="h-40 sm:h-60 w-24 sm:w-32 object-cover" 
                                    /> 
                                )} 
 
                                <div className="flex flex-col gap-4">

                                    <div className="flex flex-col gap-3"> 
 
                                        <h2 className="text-lg sm:text-2xl font-bold"> 
                                            {movieDetails?.title} 
                                        </h2> 
 
                                        <div className=" 
                                            flex 
                                            flex-wrap 
                                            gap-2 
                                            text-[var(--color-blue)] 
                                            text-sm 
                                            max-w-full 
                                        "> 
                                            {movieDetails?.genres.map( 
                                                (genre) => ( 
                                                    <h2 key={genre.id}> 
                                                        {genre.name} 
                                                    </h2> 
                                                ) 
                                            )} 
                                        </div> 
 
                                    </div> 

                                    <div className="flex gap-3"> 
 
                                        <div className=" 
                                            download-hide-icon 
                                            w-5 
                                            h-5 
                                            shrink-0 
                                            flex 
                                            items-center 
                                            justify-center 
                                        "> 
                                            <CalendarDays size={20} className="mt-2 text-[var(--color-blue)]"/> 
                                        </div> 
 
                                        <div className="flex flex-col gap-1"> 
 
                                            <h2 className=" 
                                                text-md 
                                                whitespace-nowrap 
                                            "> 
                                                {currentTicket?.day && 
                                                    new Date( 
                                                        currentTicket.day 
                                                    ).toLocaleDateString( 
                                                        "en-GB", 
                                                        { 
                                                            day: "numeric", 
                                                            month: "long", 
                                                            year: "numeric" 
                                                        } 
                                                    ) 
                                                } 
                                            </h2> 
 
                                            <h2 className=" 
                                                text-[var(--color-blue)] 
                                                text-sm 
                                            "> 
                                                {currentTicket?.time} 
                                            </h2> 
 
                                        </div> 
 
                                    </div> 

                                    <div className="flex gap-3 items-center"> 
 
                                        <div className=" 
                                            download-hide-icon 
                                            w-5 
                                            h-5 
                                            shrink-0 
                                            flex 
                                            items-center 
                                            justify-center 
                                        "> 
                                            <MapPin size={20} className="text-[var(--color-blue)]" /> 
                                        </div> 
 
                                        <h2 className="text-md"> 
                                            {currentTicket?.cinema} 
                                        </h2> 
 
                                    </div> 

                                    <div className="flex gap-3 items-center"> 
 
                                        <div className=" 
                                            download-hide-icon 
                                            w-5 
                                            h-5 
                                            shrink-0 
                                            flex 
                                            items-center 
                                            justify-center 
                                        "> 
                                            <Armchair size={20} className="text-[var(--color-blue)]" /> 
                                        </div> 
 
                                        <h2 className="text-md"> 
                                            Seats:{" "} 
                                            {currentTicket?.seats?.join(",")} 
                                        </h2> 
 
                                    </div> 
 
                                </div> 
 
                            </div> 

                            <div className=" 
                                w-full
                                h-px
                                lg:w-px
                                lg:h-60
                                bg-white/20
                                my-4
                                lg:my-0
                                lg:mx-5
                                xl:mx-10
                            "></div> 

                            <div className=" 
                                flex 
                                flex-col 
                                gap-2 
                                items-center 
                            "> 
 
                                <div className=" 
                                    bg-white 
                                    p-4 
                                    rounded-lg 
                                "> 
 
                                    <QRCodeSVG 
                                        value={JSON.stringify({ 
                                            bookingId: currentTicket?.bookingId, 
                                            movieId: currentTicket?.movieId, 
                                            cinema: currentTicket?.cinema, 
                                            day: currentTicket?.day, 
                                            time: currentTicket?.time, 
                                            seats: currentTicket?.seats 
                                        })} 
                                        size={100} 
                                    /> 
 
                                </div> 
 
                                <h2 className=" 
                                    w-[180px] 
                                    text-sm 
                                    text-[var(--color-blue)] 
                                    text-center 
                                "> 
                                    Show this QR code at the cinema entrance 
                                </h2> 
 
                            </div> 
 
                        </div> 
 
                    </div> 

                    <div className=" 
                        h-px 
                        w-full 
                        bg-white/20 
                    "></div> 

                    <div className="flex flex-col gap-3"> 
                        <div className=" 
                            flex 
                            w-full 
                            justify-between 
                        "> 
 
                            <h2 className=" 
                                text-sm 
                                text-[var(--color-blue)] 
                            "> 
                                {currentTicket?.seats?.length} × Ticket 
                            </h2> 
 
                            <h2 className=" 
                                text-sm 
                                text-[var(--color-blue)] 
                            "> 
                                EGP{" "} 
                                {currentTicket?.seats?.length * 150} 
                            </h2> 
 
                        </div>

                        {Number(currentTicket?.foodTotal || 0) > 0 && ( 
                            <div className="flex w-full justify-between"> 
                                <h2 className="text-sm text-[var(--color-blue)]"> 
                                    Food & Drinks 
                                </h2> 
 
                                <h2 className="text-sm text-[var(--color-blue)]"> 
                                    EGP {currentTicket.foodTotal} 
                                </h2> 
                            </div> 
                        )} 
 
                        <div className=" 
                            h-px 
                            w-full 
                            bg-white/20 
                        "></div> 
 
                        <div className=" 
                            flex 
                            w-full 
                            justify-between 
                        "> 
 
                            <h2 className="text-lg"> 
                                Total 
                            </h2> 
 
                            <h2 className="text-lg text-[var(--color-blue)]"> 
                                EGP{" "} 
                                {currentTicket?.totalPrice} 
                            </h2> 
 
                        </div> 
 
                        <div className=" 
                            flex
                            flex-col items-center sm:flex-row 
                            gap-2 
                            mt-7 
                        "> 
 
                            <button 
                                onClick={() => x("/tickets")} 
                                className=" 
                                    download-hide 
                                    w-full sm:w-[50%]
                                    flex 
                                    items-center 
                                    justify-center 
                                    gap-2 
                                    bg-[var(--color-blue)] 
                                    text-[var(--color-accent-dark)] 
                                    px-6 
                                    py-3 
                                    rounded-xl 
                                    font-semibold 
                                    transition-all 
                                    duration-300 
                                    hover:bg-[var(--color-blue-dark)] 
                                    shadow-[0_0_20px_rgba(169,216,232,0.2)] 
                                    hover:cursor-pointer 
                                " 
                            > 
                                <Ticket size={20} /> 
                                View My Tickets 
                            </button> 
 
                            <button 
                                onClick={() =>{
                                    clearBookingData()
                                    x("/")
                                }} 
                                className=" 
                                    download-hide 
                                    w-full sm:w-[50%] 
                                    flex 
                                    items-center 
                                    justify-center 
                                    gap-2 
                                    border 
                                    border-[rgba(169,216,232,0.3)] 
                                    bg-white/10 
                                    text-white 
                                    px-6 
                                    py-3 
                                    rounded-xl 
                                    font-semibold 
                                    transition-all 
                                    duration-300 
                                    hover:bg-[var(--color-accent)] 
                                    hover:cursor-pointer 
                                "
                            > 
                                <House size={20} /> 
                                Back To Home 
                            </button> 
 
                        </div> 
 
                    </div> 
 
                </div> 

                <div className=" 
                    flex 
                    gap-2 
                    justify-center 
                    items-center 
                "> 
 
                    <img 
                        src={photo} 
                        className="h-15 w-15" 
                    /> 
 
                    <div className="flex flex-col gap-2"> 
 
                        <h2 className=" 
                            text-xl 
                            text-center sm:text-left
                            font-bold 
                        "> 
                            Enjoy the show! 
                        </h2> 
 
                        <h2 className=" 
                            text-[var(--color-muted)] 
                        "> 
                            Great stories, Bigger on the big screen. 
                        </h2> 
 
                    </div> 
 
                </div> 
 
            </div> 
        </>
    ); 
}; 
 
export default Confirmation;