'use client'
import {useCallback, useMemo} from 'react';
import { Flex, Form } from 'antd';
import Link from "next/link";
import TextField from '@/components/Universal/TextField/TextField';
import Text from '@/components/Universal/Text/Text';
import Button from '@/components/Universal/Button/Button';
import {LoginFormData} from "@/app/auth/login/Types";
import { Templates } from './Templates';
import "@/app/auth/auth.css";


const {
    IS_ERROR_EMAIL_TEXT,
    IS_ERROR_PASSWORD_TEXT,
    EMAIL_TEXT,
    PASSWORD_TEXT
}=Templates


export default function Login() {

    const onFinish = useCallback((values:LoginFormData) => {
        console.log(values);
    }, []);

    const [form] = Form.useForm<LoginFormData>();

    const {email, password} = Form.useWatch(({email, password})=>({email, password}), form)?? {
        email:'',
        password:''
    };

    const isErrorEmail=useMemo(()=>{
        return /^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/.test(email);
    },[email]);

    return(
        <>
            <Form className="container" onFinish={onFinish} layout='vertical' form={form}>
                <Flex vertical gap={10}>
                    <Text className="title_auth">
                        Войти
                    </Text>
                    <TextField
                        errorText={IS_ERROR_EMAIL_TEXT}
                        name='email'
                        type='email'
                        label={EMAIL_TEXT}
                        isError={isErrorEmail}
                    />
                    <TextField
                        errorText={IS_ERROR_PASSWORD_TEXT}
                        name='password'
                        label={PASSWORD_TEXT}
                        isPassword
                        isError={password?.length ==0}
                    />
                    <Button
                        title='Войти'
                        type='primary'
                        htmlType='submit'
                        size='large'
                    />
                    <Flex gap={10}>
                        <Text className="text_strong">
                            У вас нет аккаунта?
                        </Text>
                        <Link href='/auth/register' className="link_strong">
                            Зарегистрироваться
                        </Link>
                    </Flex>
                </Flex>
            </Form>
        </>
    );
};







