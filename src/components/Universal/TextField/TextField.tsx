"use client"

import { Input, Form } from "antd";

const { Item } = Form;
const { Password } = Input;

interface TextFieldProps {
    name:string,
    status?:any,
    label:string,
    errorText?:string,
    isError?:boolean,
    isPassword?:boolean,
    isRequired?:boolean,
    onChange?:(e: any) => void,
    onFocus?:(e: any) => void,
    onBlur?:(e: any) => void,
    fontWeight?:number,
};

const TextField=({
    name,
    status,
    label,
    errorText,
    isError,
    isPassword=false,
    isRequired=true,
    onChange,
    onFocus,
    onBlur,
    fontWeight
    }:TextFieldProps) => {
    return(
        <Item
            style={{fontWeight:`${fontWeight}`, marginBottom: isError ? 25 : 5}}
            label={label}
            name={name}
            rules={[
                {
                    required: isRequired,
                    message: errorText,
                    type:'string',
                    validator(_: any, value: any) {
                        if(isError || (isRequired && !value)){
                            return Promise.reject(errorText);
                        }
                        return Promise.resolve();
                    }
                },
            ]}
        >
            {isPassword?
                <Password size="large" status={status} onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>
                :
                <Input size="large" status={status} onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>
            }
        </Item>
    )
};

export default TextField;