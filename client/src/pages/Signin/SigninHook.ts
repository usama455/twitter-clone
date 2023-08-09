import { useCallback, useState } from "react"
import { UserService } from "../../services/users"


export const SigninHook = () => {
    const [formType, setFormType] = useState<String>("login")
    const [formValues, setFormValeus] = useState<{
        userName: String | null,
        password: String | null,
        email: String | null,
    }>({
        userName: null,
        password: null,
        email: null
    })
    const [hidePassword, setHidePassword] = useState<boolean>(true)

    const handleFormTypeChange = useCallback((type: String) => {
        setFormType(type)
    }, [])

    const handleFormValueUpdate = useCallback((key: any, value: String) => {
        setFormValeus(prevState => ({
            ...prevState,
            [key]: value
        }))
    }, [])

    const handleLogin = useCallback(async (e: any) => {
        try {
            e.preventDefault();
            const response = await UserService.loginUser({ userName: formValues.userName, password: formValues.password })

            console.log("LOGIN", response)
        } catch (err) {
            console.log("Err", err)

        }
    }
        , [formValues])

    return {
        formType,
        formValues,
        hidePassword,
        setHidePassword,
        handleLogin,
        handleFormTypeChange,
        handleFormValueUpdate
    }
}