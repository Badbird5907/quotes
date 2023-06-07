'use client'

import React from 'react';
import {Avatar} from "@nextui-org/react";
const ClientAvatar = (props:
    React.ComponentProps<typeof Avatar>
) => {
    return (
        <Avatar {...props} />
    );
};

export default ClientAvatar;