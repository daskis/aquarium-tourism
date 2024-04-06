import cls from './UserChangeForm.module.scss';
import UserIcon from '@assets/icons/userIcon.svg';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Paragraph } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';

interface IForm {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    phone: string;
    img?: any;
}

export const UserChangeForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<IForm>();

    const submit: SubmitHandler<IForm> = (data: IForm) => {
        console.log(data);
    };
    const errorSubmit: SubmitErrorHandler<IForm> = (data) => {
        console.log(data);
        console.log('error');
    };

    const username = register('username');
    const phone = register('phone');
    const email = register('email');
    const password = register('password');
    const repeatPassword = register('repeatPassword');
    const onSubmit = (data: IForm) => {
        console.log(data);
    };
    return (
        <form className={cls.form} onSubmit={handleSubmit(submit, errorSubmit)}>
            <div className={cls.avatar}>
                <UserIcon />
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.username,
                                },
                                [],
                            )}
                            type="text"
                            label="Логин"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="username"
                            register={username}
                        />
                    )}
                />
                {errors.username && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.username.message}
                    </Paragraph>
                )}
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.email,
                                },
                                [],
                            )}
                            type="email"
                            label="Почта"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="email"
                            register={email}
                        />
                    )}
                />
                {errors.email && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.email.message}
                    </Paragraph>
                )}
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.phone,
                                },
                                [],
                            )}
                            type="text"
                            label="Телефон"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="phone"
                            register={phone}
                        />
                    )}
                />
                {errors.phone && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.phone.message}
                    </Paragraph>
                )}
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.password,
                                },
                                [],
                            )}
                            type="password"
                            label="Пароль"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="password"
                            register={password}
                        />
                    )}
                />
                {errors.password && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.password.message}
                    </Paragraph>
                )}
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="repeatPassword"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.repeatPassword,
                                },
                                [],
                            )}
                            type="password"
                            label="Повторите пароль"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="repeatPassword"
                            register={repeatPassword}
                        />
                    )}
                />
                {errors.repeatPassword && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.repeatPassword.message}
                    </Paragraph>
                )}
            </div>
            <Button type="submit" size={SizeEnum.H3} color={ColorEnum.PRIMARY}>
                Отправить
            </Button>
        </form>
    );
};
