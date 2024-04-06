import cls from './UserInfoForm.module.scss';
import UserIcon from '@assets/icons/userIcon.svg';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Paragraph } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';

interface IForm {
    firstName: string;
    lastName: string;
    middleName: string;
    passport: string;
    img?: any;
}

export const UserInfoForm = () => {
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

    const firstName = register('firstName');
    const lastName = register('lastName');
    const middleName = register('middleName');
    const passport = register('passport');
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
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.lastName,
                                },
                                [],
                            )}
                            type="text"
                            label="Фамилия"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="lastName"
                            register={lastName}
                        />
                    )}
                />
                {errors.lastName && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.lastName.message}
                    </Paragraph>
                )}
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.firstName,
                                },
                                [],
                            )}
                            type="text"
                            label="Имя"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="firstName"
                            register={firstName}
                        />
                    )}
                />
                {errors.firstName && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.firstName.message}
                    </Paragraph>
                )}
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="middleName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.middleName,
                                },
                                [],
                            )}
                            type="text"
                            label="Отчество"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="middleName"
                            register={middleName}
                        />
                    )}
                />
                {errors.middleName && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.middleName.message}
                    </Paragraph>
                )}
            </div>
            <div className={cls.wrapper}>
                <Controller
                    name="passport"
                    control={control}
                    render={({ field }) => (
                        <Input
                            className={classNames(
                                '',
                                {
                                    [cls.errorInput]: !!errors.passport,
                                },
                                [],
                            )}
                            type="text"
                            label="Серия и номер паспорта"
                            value={field.value}
                            onChange={field.onChange}
                            size={SizeEnum.H3}
                            color={ColorEnum.PRIMARY}
                            name="passport"
                            register={passport}
                        />
                    )}
                />
                {errors.passport && (
                    <Paragraph className={cls.error} size={SizeEnum.H5} color={ColorEnum.DANGER}>
                        {errors.passport.message}
                    </Paragraph>
                )}
            </div>
            <Button type="submit" size={SizeEnum.H3} color={ColorEnum.PRIMARY}>
                Отправить
            </Button>
        </form>
    );
};
