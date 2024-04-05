import { RegisterForm } from '@features/auth/ui';
import cls from './Register.module.scss';
import { Container } from '@shared/lib';

export const Register = () => {
    return (
        <Container className={cls.wrapper}>
            <RegisterForm />
        </Container>
    );
};
