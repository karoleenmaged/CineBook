import { CircleCheck, Circle } from "lucide-react";

const BookingStepper=({currentstep})=>{
    const steps=[
        "Seats",
        "Food & Drinks",
        "Payment",
        "Confirmation"
    ]

    return(
        <div className="w-full h-15 bg-[var(--color-bg)] flex items-center justify-center overflow-hidden">

            <div className="flex items-center justify-center w-full px-1 sm:px-2">

                {
                    steps.map((step,index)=>
                        <div className="flex items-center min-w-0" key={index}>

                            {
                                index<currentstep ? (
                                    <CircleCheck
                                        size={16}
                                        className="text-[var(--color-accent-dark)] sm:size-[18px]"
                                    />
                                ) : (
                                    index===currentstep ? (
                                        <Circle
                                            size={16}
                                            className="bg-[var(--color-accent-dark)] rounded-full shrink-0 sm:size-[18px]"
                                        />
                                    ) : (
                                        <Circle
                                            size={16}
                                            className="rounded-full shrink-0 sm:size-[18px]"
                                        />
                                    )
                                )
                            }

                            <h2 className="text-xs sm:text-sm lg:text-base whitespace-nowrap">
                                {step}
                            </h2>

                            {
                                index<3 &&
                                <div className="w-3 sm:w-6 lg:w-10 h-px bg-[var(--color-muted)]"></div>
                            }

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default BookingStepper;