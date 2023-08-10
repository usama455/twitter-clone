import React from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SigninHook } from "./SigninHook";

const Signin = () => {
    const {
        formValues,
        formType,
        hidePassword,
        error,
        setHidePassword,
        handleSignUp,
        handleLogin,
        handleFormTypeChange,
        handleFormValueUpdate
    } = SigninHook();
    return (
        <>
            {formType === 'login' ?
                <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 relative">
                    <h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>

                    <input
                        onChange={(e) => handleFormValueUpdate('userName', e.target.value)}
                        type="text"
                        value={formValues.userName}
                        placeholder="username"
                        className="text-xl py-2 rounded-full px-4"
                    />
                    <input
                        onChange={(e) => handleFormValueUpdate('password', e.target.value)}
                        type={hidePassword ? 'password' : 'text'}
                        value={formValues.password}
                        placeholder="password"
                        className="text-xl py-2 rounded-full px-4"
                    />
                    {error.password && error.password !== "" && <p className="text-red-500 text-sm mt-1">Password must be at least 5 characters long</p>
                    }
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

                </form>
                :

                <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 relative">

                    <h2 className="text-3xl font-bold text-center">Create New Twitter Account</h2>

                    <input
                        onChange={(e) => handleFormValueUpdate('userName', e.target.value)}
                        type="text"
                        value={formValues.userName}
                        placeholder="username"
                        className="text-xl py-2 rounded-full px-4"
                    />
                    <input
                        onChange={(e) => handleFormValueUpdate('email', e.target.value)}
                        type="email"
                        value={formValues.email}
                        placeholder="email"
                        required
                        className="text-xl py-2 rounded-full px-4"
                    />
                    {error.email && error.email !== "" && <p className="text-red-500 text-sm mt-1">Invalid email address</p>
                    }
                    <input
                        onChange={(e) => handleFormValueUpdate('password', e.target.value)}
                        type="password"
                        value={formValues.password}
                        placeholder="password"
                        className="text-xl py-2 rounded-full px-4"
                    />
                    {error.password && error.password !== "" && <p className="text-red-500 text-sm mt-1">Password must be at least 5 characters long</p>
                    }
                    <button
                        onClick={handleSignUp}
                        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                        type="submit"
                    >
                        Sign up
                    </button>


                    <p className="text-center text-xl">Already have an account?</p>
                    <button onClick={(e) => handleFormTypeChange(e, 'login')}>Login</button>
                </form>

            }
        </>

    );
};

export default Signin;