import { useCallback, useEffect, useMemo, useState } from "react"
import { UserService } from "../../services/users"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
// import { loginStart,  } from "../../redux/userSlice"
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

export const SigninHook = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formType, setFormType] = useState<String>("login")
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState<{
        userName: string,
        password: string,
        email: string,
    }>({
        userName: '',
        password: '',
        email: ''
    })
    const [error, setError] = useState({
        userName: "",
        password: "",
        email: "",
        login: ""
    })
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const location = useLocation().pathname;
    useEffect(() => {
        if (localStorage.getItem("token") && location === '/signin') {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const validatePssword = useMemo(() => {
        if (formValues.password && formValues.password.length < 5) {
            setError(prev => ({
                ...prev,
                password: "Password must be greater than 5 characters"
            }))
            return false
        }
        setError(prev => ({
            ...prev,
            password: "",
        }));
        return true
    }, [formValues.password])

    const validateEmail = useMemo(() => {
        if (formType === "signup" && formValues.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formValues.email)) {
            setError(prev => ({
                ...prev,
                email: "Invalid email format"
            }));
            return false;
        }
        setError(prev => ({
            ...prev,
            email: "",
        }));
        return true;
    }, [formType, formValues.email]);


    const handleFormTypeChange = useCallback((e: any, type: String) => {
        e.preventDefault();
        setFormType(type)
        setFormValues(prevValues => ({
            ...prevValues,
            userName: '',
            password: '',
            email: ''
        }))
    }, [])

    const handleFormValueUpdate = useCallback((key: any, value: String) => {
        setFormValues(prevState => ({
            ...prevState,
            [key]: value
        }))
    }, [])

    const handleLogin = useCallback(async (e: any) => {
        try {
            setLoading(true)
            e.preventDefault();
            if (validatePssword) {
                dispatch(loginStart())
                const response = await UserService.loginUser({ userName: formValues.userName, password: formValues.password })
                if (response && response.data?.data?.token) {
                    localStorage.setItem('token', response.data.data.token)
                    localStorage.setItem('currentId', response.data.data._id)
                    dispatch(loginSuccess(response.data.data))
                    setLoading(false)
                    navigate('/')
                } else {
                    setLoading(false)
                    alert("Something went wrong. Try again")
                }
            }
        } catch (err) {
            setLoading(false)
            if (err.response && err.response.status === 401) {
                console.log("Unauthorized: Invalid credentials")
                alert("Invalid credentials. Please check your username and password.")
            } else {
                console.log("An error occurred:", err)
                alert("An error occurred. Please try again later.")
                dispatch(loginFailed())
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues])

    const handleSignUp = useCallback(async (e: any) => {
        try {
            setLoading(true)
            e.preventDefault();
            if (validatePssword && validateEmail) {
                dispatch(loginStart())
                const response = await UserService.signupUser({ userName: formValues.userName, password: formValues.password, email: formValues.email })
                if (response && response.data) {
                    handleLogin(e)
                }
            }
        } catch (err) {
            setLoading(false)
            if (err.response && err.response.status === 400) {
                console.log("Unauthorized: Invalid credentials")
                alert("Invalid credentials.")
            } else {
                console.log("An error occurred:", err)
                alert("Something went wrong.")
                dispatch(loginFailed())
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues])

    const handleLogout = () => {
        dispatch(loginSuccess(null))
        localStorage.removeItem("token")
        localStorage.removeItem("currentId")
        window.location.reload()
    }
    return {
        formType,
        formValues,
        hidePassword,
        error,
        loading,
        setError,
        handleLogout,
        handleSignUp,
        setHidePassword,
        handleLogin,
        handleFormTypeChange,
        handleFormValueUpdate
    }
}