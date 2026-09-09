import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

const MyTickets = () => {

    const [tickets, setTickets] = useState(() => {
        try {
            const savedTickets = localStorage.getItem("tickets");

            if (!savedTickets) {
                return [];
            }

            const parsedTickets = JSON.parse(savedTickets);

            if (!Array.isArray(parsedTickets)) {
                throw new Error("Invalid tickets data");
            }

            return parsedTickets;

        } catch (error) {
            console.error("Error loading tickets:", error);
            return null;
        }
    });

    if (tickets === null) {
        return <ErrorMessage />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-8">

            {
                tickets.length > 0 ? (

                    tickets.map((ticket) => (

                        <div
                            key={ticket.bookingId}
                            className="flex flex-col bg-[var(--color-accent-dark)] w-full rounded-2xl text-[var(--color-blue)] p-4"
                        >
                            <h2>{ticket.movieTitle}</h2>
                            <h2>{ticket.cinema}</h2>
                            <h2>{ticket.day}</h2>
                            <h2>{ticket.time}</h2>
                            <h2>EGP {ticket.totalPrice}</h2>
                        </div>

                    ))

                ) : (

                    <div>
                        <h2>No tickets yet</h2>
                    </div>

                )
            }

        </div>
    )
}

export default MyTickets;