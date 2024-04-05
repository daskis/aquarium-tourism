import { LoginForm } from '@features/auth/ui';
import { Container } from '@shared/lib/utils';
import cls from './Login.module.scss';
export const Login = () => {
    return (
        <Container className={cls.wrapper}>
            <LoginForm />
        </Container>
    );
};
