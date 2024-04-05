import { Container } from '@shared/lib/utils';
import cls from './Auth.module.scss';
import { Button, Link } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

export const Auth = () => {
    return (
        <Container className={cls.wrapper}>
            <div className={cls.buttons}>
                <Link size={SizeEnum.H2} color={ColorEnum.LIGHT} to={'/auth/login'}>
                    <Button size={SizeEnum.H2} color={ColorEnum.PRIMARY}>
                        Войти
                    </Button>
                </Link>
                <Link size={SizeEnum.H2} color={ColorEnum.LIGHT} to={'/auth/login'}>
                    <Button size={SizeEnum.H2} color={ColorEnum.SECONDARY}>
                        Зарегистрироваться
                    </Button>
                </Link>
            </div>
        </Container>
    );
};
