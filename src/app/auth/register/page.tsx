'use client'
import { Flex, Form, Space } from 'antd';
import {useCallback, useState, useMemo} from 'react';
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
    IS_HAVE_ACCOUNT,
    EMAIL_TEXT,
    PASSWORD_TEXT,
    LASTNAME_TEXT,
    FIRSTNAME_TEXT,
    FATHERNAME_TEXT,
    CONFIRM_PASSWORD_TEXT,
    CREATE_ACCOUNT_TEXT,
    ENTER_LINK_TEXT,
    PASSWORD_RULES
} = Templates
export default function RegisterForm() {

    const [form] = Form.useForm<RegisterFormData>();

    const {email, password, confirmPassword, lastName, firstName} = Form.useWatch(({email, password, confirmPassword, lastName, firstName,})=>({email, password, confirmPassword, lastName, firstName}), form)?? {
        email:'',
        password:'',
        confirmPassword:'',
        lastName:'',
        firstName:'',
    };

    const isErrorEmail=useMemo(()=>{
        return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email);
    },[email]);

    const isErrorPassword=useMemo(()=>{
        const hasMinLength = password?.length >= 8;
        const hasUpperLetter = /[A-ZА-Я]/.test(password);
        const hasLowerLetter = /[a-zа-я]/.test(password);
        const hasSpecialCharacter = /[#!\$%&^*_+\|=?,\.\/\\]/.test(password);
        return !(hasMinLength && hasUpperLetter && hasUpperLetter && hasLowerLetter && hasSpecialCharacter);

    },[password]);

    const [isVisibleSupportTextPassword, setIsVisibleSupportTextPassword] = useState<boolean>(true);

    const handleInputFocus = () => {
        setIsVisibleSupportTextPassword(true);
    };

    const handleInputBlur = () => {
        setIsVisibleSupportTextPassword(false);
    };

    const onFinish = useCallback((values: RegisterFormData) => {
        console.log(values)
    },[]);

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
                        label={LASTNAME_TEXT}
                        isError={lastName?.length==0}

                    />

                    <TextField
                        errorText={IS_ERROR_FIRSTNAME_TEXT}
                        name='firstName'
                        label={FIRSTNAME_TEXT}
                        isError={firstName?.length==0}
                    />

                    <TextField
                        errorText={IS_ERROR_FATHERNAME_TEXT}
                        name='fatherName'
                        label={FATHERNAME_TEXT}
                        isRequired={false}
                    />

                    <TextField
                        errorText={IS_ERROR_EMAIL_TEXT}
                        name='email'
                        label={EMAIL_TEXT}
                        isError={isErrorEmail}
                    />


                    <TextField
                        errorText={IS_ERROR_STRONGPASSWORD_TEXT}
                        name='password'
                        label={PASSWORD_TEXT}
                        isError={isErrorPassword}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        isPassword
                    />

                    <Space style={{overflow: 'hidden', height: isVisibleSupportTextPassword ? 115 : 0, transition: 'height 0.5s ease-in-out'}}>
                        <Text className="condition_password">
                            {PASSWORD_RULES}
                        </Text>
                    </Space>

                    <TextField
                        errorText={IS_ERROR_CONFIRMPASSWORD_TEXT}
                        name='confirmPassword'
                        label={CONFIRM_PASSWORD_TEXT}
                        isError={confirmPassword!=password}
                        isPassword
                    />

                    <Button
                        title={CREATE_ACCOUNT_TEXT}
                        type='primary'
                        htmlType='submit'
                        size='large'
                    />

                    <Flex gap={10}>
                        <Text className="text_strong">
                            {IS_HAVE_ACCOUNT}
                        </Text>

                        <Link href='/auth/login' className="link_strong">
                            {ENTER_LINK_TEXT}
                        </Link>
                    </Flex>
                </Flex>
            </Form>
        </>
    )
};