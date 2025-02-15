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
    PASSWORD_TEXT,
    BUTTON_TEXT,
    IS_NOT_EXIST_ACCOUNT,
    REGISTER_LINK_TEXT,
    ENTER_BUTTON_TEXT,
}=Templates

export default function LoginForm() {

    const [form] = Form.useForm<LoginFormData>();

    const {email, password} = Form.useWatch(({email, password})=>({email, password}), form)?? {
        email:'',
        password:''
    };

    const isErrorEmail=useMemo(()=>{
        return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email);
    },[email]);

    const onFinish = useCallback((values:LoginFormData) => {
        console.log(values);
    }, []);

    return(
        <>
            <Form className="container" onFinish={onFinish} layout='vertical' form={form}>
                <Flex vertical gap={10}>
                    <Text className="title_auth">
                        {ENTER_BUTTON_TEXT}
                    </Text>
                    <TextField
                        errorText={IS_ERROR_EMAIL_TEXT}
                        name='email'
                        label={EMAIL_TEXT}
                        isError={isErrorEmail}
                    />
                    <TextField
                        errorText={IS_ERROR_PASSWORD_TEXT}
                        name='password'
                        label={PASSWORD_TEXT}
                        isPassword
                        isError={password?.length ===0}
                    />
                    <Button
                        title={BUTTON_TEXT}
                        type='primary'
                        htmlType='submit'
                        size='large'
                    />
                    <Flex gap={10}>
                        <Text className="text_strong">
                            {IS_NOT_EXIST_ACCOUNT}
                        </Text>
                        <Link href='/auth/register' className="link_strong">
                            {REGISTER_LINK_TEXT}
                        </Link>
                    </Flex>
                </Flex>
            </Form>
        </>
    );
};







