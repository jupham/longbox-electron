import React, { Component } from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';

const Import: React.FunctionComponent = () => {
    return (
        <div style={{width: '100%'}}>
            <Menu>
                <Menu.Item name='editorials'>
                    <Input
                        placeholder='Path to Comics...'
                        action='Choose Directory'
                    />
                </Menu.Item>
                <Menu.Item position='right'>Find Comics</Menu.Item>
            </Menu>
        </div>
    );
};

export default Import;
