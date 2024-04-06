import cls from './UserInfoModal.module.scss';
import { IUserInfoChangeProps } from '@features/user/lib';
import Close from '@assets/icons/close.svg';
import { classNames } from '@shared/lib';
import { useEffect, useRef } from 'react';
import { UserChangeForm, UserInfoForm } from '@features/user/ui';

export const UserInfoModal = ({ isOpen, handleChange }: IUserInfoChangeProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        handleChange();
    };
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (e.target === wrapperRef.current) {
            handleChange();
        }
    };
    useEffect(() => {
        const handleEscKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleChange();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKeyPress);
        } else {
            document.removeEventListener('keydown', handleEscKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [isOpen, handleChange]);

    return (
        <div
            ref={wrapperRef}
            className={classNames(
                cls.wrapper,
                {
                    [cls.hidden]: !isOpen,
                },
                [],
            )}
        >
            <div onClick={handleWrapperClick} className={cls.body}>
                <span
                    onClick={() => {
                        handleClick();
                    }}
                    className={cls.close}
                >
                    <Close />
                </span>
                <UserInfoForm />
            </div>
        </div>
    );
};
