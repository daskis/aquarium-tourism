export interface AuthProps {
    username: string;
    password: string;
}

export interface LoginProps extends AuthProps {}

export interface RegisterProps extends AuthProps {
    email: string;
    repeatPassword: string;
}

export interface ResponseProps {
    accessToken: string;
}
