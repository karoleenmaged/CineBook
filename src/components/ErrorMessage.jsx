const ErrorMessage = () => {
    return (
        <div className="w-full min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-dark)]">
                Something went wrong
            </h2>

            <p className="text-[var(--color-muted)] mt-2">
                We couldn't load this page. Please try again later.
            </p>
        </div>
    )
}

export default ErrorMessage;