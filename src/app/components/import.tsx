import React, { useState } from 'react';
import * as electron from 'electron';
import { Menu, Input, Button, Table, Checkbox, Container } from 'semantic-ui-react';
import * as path from 'path';
import * as fstmp from 'fs';
import { string } from 'prop-types';

const fs = fstmp.promises;

const Import: React.FunctionComponent = () => {
    const [comicPath, setComicPath] = useState('');
    const [comicFileList, setComicFileList] = useState(new Array<string>());

    async function getDirectoryPath() {
        let paths = await electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        if (paths) {
            setComicPath(paths[0]);
        }
    }

    async function getComicList() {
        let isDirectory = (await fs.lstat(comicPath)).isDirectory();
        let fileList = new Array<string>();
        console.log(`Scanning Directory ${comicPath}`);
        if (isDirectory) {
            await traverseDirectory(comicPath, fileList);
        } else {
            fileList.push(comicPath);
        }

        console.log('FINISHED');
        setComicFileList(fileList);
    }

    async function traverseDirectory(dir: string, fileList: string[]) {
        console.log(`Traversing Directory ${dir}`);
        let files = await fs.readdir(dir);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fullPath = path.join(dir, file);
            console.log(`Testing file ${fullPath}`);
            let isDirectory = (await fs.lstat(fullPath)).isDirectory();
            if (isDirectory) {
                await traverseDirectory(fullPath, fileList);
            } else {
                let extension = path.extname(file);
                if (extension == '.cbz' || extension == '.cbr') {
                    fileList.push(file);
                }
            }
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <Menu>
                <Menu.Item name='editorials'>
                    <Input placeholder='Path to Comics...' value={comicPath}>
                        <input />
                        <Button onClick={() => getDirectoryPath()}>
                            Choose Directory
                        </Button>
                    </Input>
                </Menu.Item>
                <Menu.Item position='right' onClick={() => getComicList()}>
                    Find Comics
                </Menu.Item>
            </Menu>
            <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing>Import</Table.HeaderCell>
                        <Table.HeaderCell>File</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {comicFileList.map((file) => {
                        return (<Table.Row key='file'>
                            <Table.Cell collapsing>
                                <Checkbox />
                            </Table.Cell>
                            <Table.Cell>
                                {file}
                            </Table.Cell>
                        </Table.Row>)
                    })}
                </Table.Body>
            </Table>
            </Container>
        </div>
    );
};

export default Import;
