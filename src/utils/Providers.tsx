'use client'
import "@ant-design/v5-patch-for-react-19"
import {AntdRegistry} from "@ant-design/nextjs-registry";
import type {ReactNode} from "react";

export default function Providers({children,}: Readonly<{children: ReactNode; }>){
    return(<AntdRegistry>
        {children}
    </AntdRegistry>);
}

