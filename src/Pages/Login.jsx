import { useEffect, useState, useRef } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import './../Login.css'
import useToggle from '../hooks/useToggle';
import { HiMiniExclamationCircle } from "react-icons/hi2";
import Users from '../database/Users'
import { ToastContainer, toast } from 'react-toastify'
import { axios } from '../api/axios'

const Login = () => {
    const [showPassword, setShowPassword] = useToggle();
    const userRef = useRef(null);

    //Username
    const [user, setUser] = useState('');
    const [userMissing, setUserMissing] = useState(false);
    
    //Password
    const [pwd, setPwd] = useState('')
    const [pwdMissing, setPwdMissing] = useState(false);

    //Verification
    const [missing, setMissing] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        // if (user === '') setUserMissing(true)
        // if (pwd === '') setPwdMissing(true)
        setUserMissing(user === '' ? true : false)
        setPwdMissing(pwd === '' ? true : false)
        console.log('useEffect is fired')
    }, [user, pwd])

    const notify = () => toast("Wow so easy!");
    const missingMsg = ({ closeToast, toastProps }) => (
        <div>
            You must provide both username and password
            <button onClick={closeToast}>Close</button>
        </div>
    );
    const notFoundMsg = ({closeToast, toast}) => (
        <div>
            User not found
            <button onClick={closeToast}>Close</button>
        </div>
    )
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userMissing)
        if (userMissing || pwdMissing) {
            console.log('firing')
            toast(missingMsg, {position: 'top-center'})
            return
        } 
        console.log(`Username: ${user}, Password: ${pwd}`)
        const foundUser = Users.find(users => { return users.user === user && users.pwd === pwd})
        
        
        if(!foundUser) {
            toast(notFoundMsg, {position: 'top-center'})
        } else {
            console.log('user found')
            await axios.get('/')
        }
    }

    

    return (
        <div className="LoginPage">
            <ToastContainer />
            <div className="LoginForm">
                <h1>Login</h1>
                <form onSubmit={(e) => handleSubmit}>
                    <label htmlFor="Username">Username</label>
                    <input 
                        type="text"
                        ref={userRef}
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        required
                    />
                    {userMissing && <span className='Missing'>
                        <HiMiniExclamationCircle /> Username is required
                    </span> }
                    
                    <label htmlFor="Password">Password</label>
                    <div className="PasswordInput">
                        <input 
                            type={`${!showPassword ? 'text' : 'pwd'}`} 
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}
                            required
                        />
                        <span onClick={setShowPassword} className="PasswordIcon">
                            {!showPassword ? 
                                <FaRegEye size={20} /> :
                                <FaRegEyeSlash size={20} />}
                        </span>
                    </div>
                    {pwdMissing && <span className='Missing'>
                        <HiMiniExclamationCircle /> Password is required
                    </span> }
                
                    
                    <button onClick={handleSubmit} type="submit">Login</button>
                </form>
            </div>
        </div>

  )
}

export default Login