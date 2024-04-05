import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { RegisterProps, useRegister } from '@features/auth/lib';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import cls from './RegisterForm.module.scss';
import { Button, Heading, Input, Link, Paragraph } from '@shared/ui';

export const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
        watch,
    } = useForm<RegisterProps>();
    const { registerTrigger, isLoading } = useRegister();
    const login = register('login', {
        required: 'Логин обязателен',
        minLength: {
            value: 4,
            message: 'Логин должен содержать как минимум 4 символа',
        },
        maxLength: {
            value: 20,
            message: 'Логин должен содержать не более 20 символов',
        },
    });

    const email = register('email', {
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
    const repeatPassword = register('repeatPassword', {
        required: 'Повторите пароль',
        validate: (val: string) => {
            if (watch('password') !== val) {
                return 'Пароли не совпадают';
            }
        },
    });

    const submit: SubmitHandler<RegisterProps> = (data: RegisterProps) => {
        registerTrigger(data);
    };
    const errorSubmit: SubmitErrorHandler<RegisterProps> = (data) => {
        console.log(data);
        console.log('error');
    };

    return (
        <form className={cls.form} onSubmit={handleSubmit(submit, errorSubmit)}>
            <Heading color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                Регистрация
            </Heading>
            <div className={cls.wrapper}>
                <Controller
                    name="login"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.login,
                                },
                                [],
                            )}
                            type="text"
                            label="Логин"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="login"
                            register={login}
                        />
                    )}
                />
                {errors.login && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.login.message}
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
                            label="Email"
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
            <div className={cls.button}>
                <Button disabled={isLoading} type="submit" size={SizeEnum.H3} color={ColorEnum.PRIMARY}>
                    Отправить
                </Button>
            </div>
            <div className={cls.link}>
                <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H5}>
                    Есть аккаунт?&nbsp;
                    <Link size={SizeEnum.H5} color={ColorEnum.PRIMARY} to={'/auth/login'}>
                        Войти
                    </Link>
                </Paragraph>
            </div>
        </form>
    );
};
