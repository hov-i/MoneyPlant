import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import UserAxiosAPI from "../../api/UserAxiosAPI";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


const AvatarButton = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await UserAxiosAPI.getUserInfo();
                if (response.status === 200) {
                    const userName = response.data.name.split(" ")[0];
                    setName(userName);
                }
            } catch (error) {
                console.log('getNameError : '+ error);
            }
        };

        fetchUserName();
    }, []);

    return (
        <>
            {name ? (
                <Avatar {...stringAvatar(name)}/>
            ) : (
                <Avatar
                    sx={{
                        fontWeight: 'bold',
                        fontSize: 13,
                        width: 50,
                        height: 50,
                        margin: 11 / 8 // 1당 8px
                    }}
                    onClick={() => navigate("/login")} />
            )}
        </>
    );
};

// 색상 랜덤하게 바꿔줌
const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        const adjustedValue = Math.max(value, 50); // Minimum threshold (adjust as needed)
        color += `00${adjustedValue.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};


// 배경색을 바꿔줌
const stringAvatar = (name) => {
    if (!name || typeof name !== 'string') {
        return null
    }

    const initials = name
        .split('')
        .map((char) => char.charCodeAt(0))
        .join('')

    return {
        sx: {
            bgcolor: stringToColor(initials),
            fontWeight: 'bold',
            fontSize: 13,
            width: 50,
            height: 50,
            margin: 11 / 8 // 1당 8px
        },
        children: name,
    };
};


export default AvatarButton;