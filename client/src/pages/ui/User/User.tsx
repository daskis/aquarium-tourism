import cls from './User.module.scss';
import { UserCard, UserTabs } from '@features/user/ui';
import { Container } from '@shared/lib';
import { Outlet } from 'react-router-dom';

export const User = () => {
    return (
        <div className={cls.wrapper}>
            <Container>
                <UserCard />
                <UserTabs />
                <Outlet />
            </Container>
        </div>
    );
};
