import { useCallback, useEffect, useState } from "react"
import { UserService } from "../../services/users"
import { useNavigate } from "react-router-dom"


export const SigninHook = () => {
    const navigate = useNavigate()
    const [formType, setFormType] = useState<String>("login")
    const [formValues, setFormValues] = useState<{
        userName: String | null,
        password: String | null,
        email: String | null,
    }>({
        userName: null,
        password: null,
        email: null
    })
    const [hidePassword, setHidePassword] = useState<boolean>(true)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormTypeChange = useCallback((e: any, type: String) => {
        e.preventDefault();
        setFormType(type)
        setFormValues({
            userName: null,
            password: null,
            email: null
        })
    }, [])

    const handleFormValueUpdate = useCallback((key: any, value: String) => {
        setFormValues(prevState => ({
            ...prevState,
            [key]: value
        }))
    }, [])

    const handleLogin = useCallback(async (e: any) => {
        try {
            e.preventDefault();
            const response = await UserService.loginUser({ userName: formValues.userName, password: formValues.password })
            if (response && response.data?.data?.token) {
                localStorage.setItem('token', response.data.data.token)
                console.log("NAVIGATING")
                navigate('/')
            }
        } catch (err) {
            console.log("Err", err)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues])
    const handleSignUp = useCallback(async (e: any) => {
        try {
            e.preventDefault();
            const response = await UserService.signupUser({ userName: formValues.userName, password: formValues.password, email: formValues.email })
            console.log(response)
        } catch (err) {
            console.log("Err", err)

        }
    }, [formValues])

    return {
        formType,
        formValues,
        hidePassword,
        handleSignUp,
        setHidePassword,
        handleLogin,
        handleFormTypeChange,
        handleFormValueUpdate
    }
}