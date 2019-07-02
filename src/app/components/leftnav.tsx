import React, { useState } from 'react';
import {
    Input,
    Label,
    Image,
    Menu,
    Sidebar,
    Icon,
    Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LeftNav: React.FunctionComponent = ({ children }) => {
    return (
        <div style={{position: 'fixed'}}>
            <Menu fixed='left' as={Menu} icon='labeled' inverted vertical>
                <Menu.Item as={Link} to='/'>
                    <Icon name='box' />
                    Comics
                </Menu.Item>
                <Menu.Item as={Link} to='/import'>
                    <Icon name='clone outline' />
                    Import
                </Menu.Item>
                <Menu.Item as={Link} to='/settings'>
                    <Icon name='settings' />
                    Settings
                </Menu.Item>
            </Menu>
            <div style={{position: 'absolute', left:'84px', width:'100%'}}>
                {children}
            </div>
        </div>
    );
};

export default LeftNav;
