const SeatGrid = ({ seats, rows, selectseat }) => {

    if (!Array.isArray(seats) || !Array.isArray(rows) || typeof selectseat !== "function") {
        return (
            <div className="w-full min-h-[300px] flex justify-center items-center">
                <p className="text-[var(--color-accent-dark)] font-bold">
                    Unable to load seats.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full items-center">

            <div className="w-[80%] sm:w-[80%] lg:w-[75%] mx-auto flex flex-col items-center mb-3">

                <div className="
                    w-[90%] lg:w-[75%]
                    h-2
                    rounded-[50%]
                    bg-[#159FEF]/80
                    shadow-[0_0_30px_rgba(21,159,239,0.6)]
                " />

                <span className="
                    mt-2
                    text-sm
                    tracking-[6px]
                    text-[var(--color-muted)]
                    font-extrabold
                ">
                    SCREEN
                </span>

            </div>

            <div className="flex flex-col gap-6 mx-auto max-w-full">

                {
                    rows.map((row) =>
                        <div
                            key={row}
                            className="flex gap-1.5 sm:gap-3 items-center"
                        >

                            <h2 className="font-bold w-5 text-center">
                                {row}
                            </h2>

                            {
                                seats
                                    .filter((seat) => seat.row === row)
                                    .map((seat) =>
                                        <div
                                            key={seat.id}
                                            className="group relative"
                                        >

                                            <div
                                                className={`lg:w-10 lg:h-10 w-6 h-6 sm:w-7 sm:h-7 rounded-md ${
                                                    seat.status === "available"
                                                        ? "bg-[#159FEF] cursor-pointer"
                                                        : seat.status === "selected"
                                                        ? "bg-green-500 cursor-pointer"
                                                        : "bg-gray-200 cursor-not-allowed"
                                                }`}
                                                onClick={() => selectseat(seat)}
                                            ></div>

                                            <span className="
                                                absolute bottom-full left-1/2 -translate-x-1/2
                                                opacity-0 group-hover:opacity-100
                                                transition-opacity pointer-events-none
                                            ">
                                                {seat.id}
                                            </span>

                                        </div>
                                    )
                            }

                        </div>
                    )
                }

            </div>

            <div className="flex justify-center gap-6 mt-4 text-sm flex-wrap">

                <div className="flex gap-2 justify-between items-center">
                    <div className="bg-[#159FEF] h-5 w-5 rounded-lg"></div>
                    <h2 className="font-bold">:available</h2>
                </div>

                <div className="flex gap-2 justify-between items-center">
                    <div className="bg-gray-200 h-5 w-5 rounded-lg"></div>
                    <h2 className="font-bold">:occupied</h2>
                </div>

                <div className="flex gap-2 justify-between items-center">
                    <div className="bg-green-500 h-5 w-5 rounded-lg"></div>
                    <h2 className="font-bold">:selected</h2>
                </div>

            </div>

        </div>
    )
}

export default SeatGrid;