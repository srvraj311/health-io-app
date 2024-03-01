export class Constants {
    static BASE_URL = "http://192.168.0.110:8080/api/v1"
    static API_KEY = ""
    static CMD_SIGNUP = "signup"
    static CMD_FORGOT_PASSWORD = "forgot-password"
}


export class ApiEndpoints {
    static LOGIN = "/auth/login"
    static LOGOUT = "/auth/logout"
    static USER = "/users"
    static VALIDATE = '/auth/validate'
    static SEND_OTP = '/auth/send_otp'
    static VERIFY_OTP = '/auth/verify_otp'
    static SIGNUP = '/auth/signup'
    static FORGOT_PASSWORD = '/auth/reset-password'
}