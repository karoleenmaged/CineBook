import { Navigate } from "react-router-dom"

const ProtectedRoute=({children})=>{
    const loggedin=localStorage.getItem('isLoggedIn')
    if(loggedin==='true'){
        return children
    }else{
        return <Navigate to="/login"></Navigate>
    }
}
export default ProtectedRoute