import React from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SigninHook } from "./SigninHook";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

const Signin = () => {
    const {
        formValues,
        formType,
        hidePassword,
        error,
        loading,
        handleApiErrorClose,
        setHidePassword,
        handleSignUp,
        handleLogin,
        handleFormTypeChange,
        handleFormValueUpdate
    } = SigninHook();
    return (
        <>
            {formType === 'login' ?
                <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 relative"
                    style={{
                        marginTop: "70px",
                        width: "35%"
                    }}
                >
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
                    {loading ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </div>
                        :
                        <button
                            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                            onClick={(e) => handleLogin(e)}
                            disabled={loading}
                        >
                            Sign in
                        </button>}

                    <p className="text-center text-xl">Don't have an account?</p>
                    <button onClick={(e) => handleFormTypeChange(e, 'signup')}
                        style={{
                            border: '1px solid blue',
                            color: 'blue',
                            backgroundColor: 'transparent',
                            padding: '5px 5px',
                            cursor: 'pointer',
                            borderRadius: '10px',
                            outline: 'none',
                        }}
                    >Signup</button>

                </form>
                :

                <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 relative"
                    style={{
                        marginTop: "70px",
                        width: "35%"
                    }}
                >

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
                    }{loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </div> :
                        <button
                            onClick={handleSignUp}
                            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                            type="submit"
                            disabled={loading}
                        >
                            Sign up
                        </button>}


                    <p className="text-center text-xl">Already have an account?</p>
                    <button onClick={(e) => handleFormTypeChange(e, 'login')}
                        style={{
                            border: '1px solid blue',
                            color: 'blue',
                            backgroundColor: 'transparent',
                            padding: '5px 5px',
                            cursor: 'pointer',
                            borderRadius: '10px',
                            outline: 'none',
                        }}
                    >Login</button>
                </form>

            }
            <Snackbar open={error?.api} autoHideDuration={10000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={handleApiErrorClose}>
                <Alert onClose={handleApiErrorClose} severity="error" sx={{ width: '100%' }}>
                    {error?.api}
                </Alert>
            </Snackbar>
        </>

    );
};

export default Signin;