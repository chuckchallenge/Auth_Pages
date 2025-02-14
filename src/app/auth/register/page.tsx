'use client'

import "@ant-design/v5-patch-for-react-19"
import { Flex, Form, Space } from 'antd';
import {useCallback, useState, useEffect} from 'react';
import Link from 'next/link';
import TextField from '@/components/Universal/TextField/TextField';
import Text from '@/components/Universal/Text/Text';
import Button from '@/components/Universal/Button/Button';
import {RegisterFormData} from "@/app/auth/register/Types";
import {Templates} from "@/app/auth/register/Templates";


const {
    IS_ERROR_EMAIL_TEXT,
    IS_ERROR_CONFIRMPASSWORD_TEXT,
    IS_ERROR_STRONGPASSWORD_TEXT,
    IS_ERROR_LASTNAME_TEXT,
    IS_ERROR_FIRSTNAME_TEXT,
    IS_ERROR_FATHERNAME_TEXT,
    EMAIL_TEXT,
    PASSWORD_TEXT,
    CONFIRM_PASSWORD_TEXT,
} = Templates
export default function Register() {

    const onFinish = useCallback((values: RegisterFormData) => {
        console.log(values)
    },[]);

    const [form] = Form.useForm<RegisterFormData>();
    const validatePassword = (password:string) => {
        const hasMinLength = password.length >= 8;
        const hasUpperLetter = /[A-ZА-Я]/.test(password);
        const hasLowerLetter = /[a-zа-я]/.test(password);
        const hasSpecialCharacter = /[#!\$%&^*_+\|=?,\.\/\\]/.test(password);
        return hasMinLength && hasUpperLetter && hasUpperLetter && hasLowerLetter && hasSpecialCharacter;
    };

    const watchedValues = Form.useWatch([], form);

    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

    useEffect(() => {
        setIsValidEmail(/^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/.test(watchedValues?.email))
    },[watchedValues?.email]);

    useEffect(() => {
        if (typeof watchedValues?.password === 'string')
            setIsValidPassword(validatePassword(watchedValues?.password))
    },[watchedValues?.password]);

    const [isVisibleSupportTextPassword, setIsVisibleSupportTextPassword] = useState<boolean>(false)

    const handleInputFocus = () => {
        setIsVisibleSupportTextPassword(true);
    };

    const handleInputBlur = () => {
        setIsVisibleSupportTextPassword(false);
    };

    const isValidForm =
        watchedValues?.lastName != '' &&
        watchedValues?.firstName != '' &&
        watchedValues?.fatherName != '' &&
        isValidEmail &&
        isValidPassword &&
        watchedValues?.password === watchedValues?.confirmPassword;

    return(
        <>
            <Form className="container" onFinish={onFinish} layout='vertical' form={form}>
                <Flex vertical gap={10}>
                    <Text className="title_auth">
                        Зарегистрироваться
                    </Text>


                    <TextField
                        errorText={IS_ERROR_LASTNAME_TEXT}
                        name='lastName'
                        label='Фамилия'
                    />

                    <TextField
                        errorText={IS_ERROR_FIRSTNAME_TEXT}
                        name='firstName'
                        label='Имя'
                    />

                    <TextField
                        errorText={IS_ERROR_FATHERNAME_TEXT}
                        name='fatherName'
                        label='Отчество'
                    />

                    <TextField
                        errorText={IS_ERROR_EMAIL_TEXT}
                        name='email'
                        type='email'
                        label={EMAIL_TEXT}
                    />

                    <TextField
                        errorText={IS_ERROR_STRONGPASSWORD_TEXT}
                        name='password'
                        label={PASSWORD_TEXT}
                        isPassword
                        condition={validatePassword}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />

                    <Space style={{overflow: 'hidden', height: isVisibleSupportTextPassword ? 115 : 0, transition: 'height 0.5s ease-in-out'}}>
                        <Text className="condition_password">
                            Пароль должен содержать:<br/>
                            - Заглавную букву<br/>
                            - Строчную букву<br/>
                            - Cпециальный символ (- # ! $ % ^ & * _ + | = ? , . / \)<br/>
                            - Минимум 8 знаков
                        </Text>
                    </Space>

                    <TextField
                        errorText={IS_ERROR_CONFIRMPASSWORD_TEXT}
                        name='confirmPassword'
                        label={CONFIRM_PASSWORD_TEXT}
                        isPassword
                        condition={validatePassword}
                        status={watchedValues?.password === watchedValues?.confirmPassword ? '' : 'error'}
                    />

                    <Button
                        title='Создать аккаунт'
                        type='primary'
                        htmlType='submit'
                        size='large'
                        disabled={!isValidForm}
                    />

                    <Flex gap={10}>
                        <Text className="text_strong">
                            Уже есть аккаунт?
                        </Text>

                        <Link href='/auth/login' className="link_strong">
                            Войти
                        </Link>
                    </Flex>
                </Flex>
            </Form>
        </>
    )
};