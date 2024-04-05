export interface AuthProps {
    emailOrLogin: string;
    password: string;
}

export interface LoginProps extends AuthProps {}

export interface RegisterProps extends Omit<AuthProps, 'emailOrLogin'> {
    email: string;
    login: string;
    repeatPassword: string;
}

export interface ResponseProps {
    accessToken: string;
}
