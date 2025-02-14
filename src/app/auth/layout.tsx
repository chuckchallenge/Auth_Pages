'use client'

import './auth.css';
import React from "react";
import { Flex } from 'antd';

export default function AuthLayout({ children }: React.PropsWithChildren) {
    return (
        <>
            <Flex className="page page_auth" justify='space-evenly'>
                {children}
            </Flex>
        </>
    );
}
