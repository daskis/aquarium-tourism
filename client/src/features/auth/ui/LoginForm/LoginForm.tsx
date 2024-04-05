import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { LoginProps, useLogin } from '@features/auth/lib';
import { Button, Heading, Input, Link, Paragraph } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import cls from './LoginForm.module.scss';

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<LoginProps>();

    const { loginTrigger, isLoading } = useLogin();
    const emailOrLogin = register('emailOrLogin', {
        required: 'Почта обязательна',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Введите корректный адрес электронной почты',
        },
    });

    const password = register('password', {
        required: 'Пароль обязателен',
        minLength: {
            value: 6,
            message: 'Пароль должен содержать как минимум 6 символов',
        },
        maxLength: {
            value: 20,
            message: 'Пароль должен содержать не более 20 символов',
        },
    });

    const submit: SubmitHandler<LoginProps> = (data: LoginProps) => {
        loginTrigger(data);
    };
    const errorSubmit: SubmitErrorHandler<LoginProps> = (data) => {
        console.log(data);
        console.log('error');
    };

    return (
        <form className={cls.form} onSubmit={handleSubmit(submit, errorSubmit)}>
            <Heading color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                Авторизация
            </Heading>
            <div className={cls.wrapper}>
                <Controller
                    name="emailOrLogin"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.emailOrLogin,
                                },
                                [],
                            )}
                            type="text"
                            label="Почта или логин"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="login"
                            register={emailOrLogin}
                        />
                    )}
                />
                {errors.emailOrLogin && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.emailOrLogin.message}
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
            <div className={cls.button}>
                <Button disabled={isLoading} type="submit" size={SizeEnum.H3} color={ColorEnum.PRIMARY}>
                    Отправить
                </Button>
            </div>
            <div className={cls.link}>
                <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H5}>
                    Нет аккаунта?&nbsp;
                    <Link size={SizeEnum.H5} color={ColorEnum.PRIMARY} to={'/auth/register'}>
                        Создать
                    </Link>
                </Paragraph>
            </div>
        </form>
    );
};
