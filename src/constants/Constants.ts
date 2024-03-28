export class Constants {
    static BASE_URL = "http://ec2-34-224-222-50.compute-1.amazonaws.com/api/v1"
    static API_KEY = ""
    static CMD_SIGNUP = "signup"
    static CMD_FORGOT_PASSWORD = "forgot-password"
    static OPTION_FILTER = "Filter"
    static OPTION_SELECT_CITY = "Select_City"
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
    static GET_CITIES = '/hospital/cities'
    static GET_HOSPITALS_BY_CITY = '/hospital/city'
}