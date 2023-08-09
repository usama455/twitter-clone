import React from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import axios from "axios";

// import { useDispatch } from "react-redux";
// import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

// import { useNavigate } from "react-router-dom";
import { SigninHook } from "./SigninHook";

const Signin = () => {
    const {
        formType,
        hidePassword,
        setHidePassword,
        handleSignUp,
        handleLogin,
        handleFormTypeChange,
        handleFormValueUpdate
    } = SigninHook();


    //   const [username, setUsername] = useState("");
    //   const [password, setPassword] = useState("");
    //   const [email, setEmail] = useState("");

    //   const dispatch = useDispatch();
    //   const navigate = useNavigate();

    //   const handleLogin = async (e) => {
    //     e.preventDefault();
    //     dispatch(loginStart());
    //     try {
    //       const res = await axios.post("/auth/signin", { username, password });
    //       dispatch(loginSuccess(res.data));
    //       navigate("/");
    //     } catch (err) {
    //       dispatch(loginFailed());
    //     }
    //   };

    //   const handleSignup = async (e) => {
    //     e.preventDefault();
    //     dispatch(loginStart());

    //     try {
    //       const res = await axios.post("/auth/signup", {
    //         username,
    //         email,
    //         password,
    //       });
    //       dispatch(loginSuccess(res.data));
    //       navigate("/");
    //     } catch (err) {
    //       dispatch(loginFailed());
    //     }
    //   };

    return (
        <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 relative">
            {formType === 'login' ?
                <>
                    <h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>

                    <input
                        onChange={(e) => handleFormValueUpdate('userName', e.target.value)}
                        type="text"
                        placeholder="username"
                        className="text-xl py-2 rounded-full px-4"
                    />
                    <input
                        onChange={(e) => handleFormValueUpdate('password', e.target.value)}
                        type={hidePassword ? 'password' : 'text'}
                        placeholder="password"
                        className="text-xl py-2 rounded-full px-4"
                    />
                    {/* Toggle password visibility */}
                    <div
                        className="icon_button absolute right-[45px] top-[215px]"
                        onClick={() => setHidePassword(!hidePassword)}
                    >
                        {!hidePassword ? (
                            <VisibilityIcon className="h-6 font-extralight" />
                        ) : (
                            <VisibilityOffIcon className="h-6 font-extralight" />
                        )}
                    </div>
                    <button
                        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                        onClick={(e) => handleLogin(e)}
                    >
                        Sign in
                    </button>

                    <p className="text-center text-xl">Don't have an account?</p>
                    <button onClick={(e) => handleFormTypeChange(e, 'signup')}>Signup</button>
                </> :

                <>
                    <h2 className="text-3xl font-bold text-center">Create New Twitter Account</h2>

                    <input
                        onChange={(e) => handleFormValueUpdate('userName', e.target.value)}
                        type="text"
                        placeholder="username"
                        className="text-xl py-2 rounded-full px-4"
                    />
                    <input
                        onChange={(e) => handleFormValueUpdate('email', e.target.value)}
                        type="email"
                        placeholder="email"
                        required
                        className="text-xl py-2 rounded-full px-4"
                    />
                    <input
                        onChange={(e) => handleFormValueUpdate('password', e.target.value)}
                        type="password"
                        placeholder="password"
                        className="text-xl py-2 rounded-full px-4"
                    />

                    <button
                        onClick={handleSignUp}
                        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                        type="submit"
                    >
                        Sign up
                    </button>


                    <p className="text-center text-xl">Already have an account?</p>
                    <button onClick={(e) => handleFormTypeChange(e, 'login')}>Login</button>
                </>

            }

        </form>
    );
};

export default Signin;