import React, { useState } from 'react';
import { Input, Label, Image, Menu, Sidebar, Icon, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const LeftNav: React.FunctionComponent = ({ children }) => {
    return (
        <div style={{ height: '100vh' }}>

            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    icon='labeled'
                    inverted
                    vertical
                    visible={true}
                    width='thin'
                >
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
                </Sidebar>

                <Sidebar.Pusher>
                    {children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
}

export default LeftNav