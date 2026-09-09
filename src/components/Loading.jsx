import { ClipLoader } from "react-spinners";
const Loading = () => {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <ClipLoader color="#8F3045" size={40} />
        </div>
    )
}
export default Loading;