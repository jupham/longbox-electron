import React, { useState } from 'react';
import * as electron from 'electron';
import "reflect-metadata";
const {ipcRenderer} = require('electron-better-ipc');
import {Comic} from "../entity/comic";
import {
    Menu,
    Input,
    Button,
    Table,
    Checkbox,
    Container,
    Segment,
    Dimmer,
    Loader,
} from 'semantic-ui-react';
import * as path from 'path';
import * as fs from 'fs';

const Import: React.FunctionComponent = () => {
    const [comicPath, setComicPath] = useState('');
    const [comicFileList, setComicFileList] = useState(new Array<{checked: boolean, file: string}>());
    const [loading, setLoading] = useState(false);

    async function getDirectoryPath() {
        let paths = await electron.remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        if (paths) {
            setComicPath(paths[0]);
        }
    }

    const handleChangeCheckbox = (file: string) => {
        setLoading(true);
        setComicFileList(
            comicFileList.map(cf => {
                if (cf.file === file) {
                  return { ...cf, checked: !cf.checked };
                } else {
                  return cf;
                }
              })
        );
        setLoading(false);
    }

    const selectAllComics = () => {
        setLoading(true);
        setComicFileList(
            comicFileList.map(cf => {
                return { ...cf, checked: true };
            })
        );
        setLoading(false);
    }

    const importSelectedComics = async () => {
        setLoading(true);
        let writeComics = new Array<Comic>();
        for(let i = 0; i < comicFileList.length; i++) {
            let comicFile = comicFileList[i];
            if (comicFile.checked) {
                let comic = new Comic();
                comic.filePath = comicFile.file;
                comic.name = path.basename(comic.filePath, path.extname(comicFile.file));
                writeComics.push(comic);
            }
        }
        const result = await ipcRenderer.callMain('storeComic', writeComics);
        console.log(result);
        setLoading(false);
    }

    async function getComicList() {
        setLoading(true);
        let isDirectory = (fs.lstatSync(comicPath)).isDirectory();
        let fileList = new Array<{checked: boolean, file: string}>();
        console.log(`Scanning Directory ${comicPath}`);
        if (isDirectory) {
            await traverseDirectory(comicPath, fileList);
        } else {
            fileList.push({checked: false, file: comicPath});
        }

        console.log('FINISHED');
        setComicFileList(fileList);
        setLoading(false);
    }

    async function traverseDirectory(dir: string, fileList:Array<{checked: boolean, file: string}>) {
        console.log(`Traversing Directory ${dir}`);
        let files = fs.readdirSync(dir);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fullPath = path.join(dir, file);
            console.log(`Testing file ${fullPath}`);
            let isDirectory = (fs.lstatSync(fullPath)).isDirectory();
            if (isDirectory) {
                await traverseDirectory(fullPath, fileList);
            } else {
                let extension = path.extname(file);
                if (extension == '.cbz' || extension == '.cbr') {
                    fileList.push({checked: false, file: file});
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
                <Menu.Item onClick={() => getComicList()}>
                    Find Comics
                </Menu.Item>
                <Menu.Item  onClick={() => selectAllComics()}>
                    Select All
                </Menu.Item>
                <Menu.Item position='right' onClick={() => importSelectedComics()}>
                    Import Selected
                </Menu.Item>
            </Menu>
            <Segment>
                <Dimmer active={loading}>
                    <Loader indeterminate>Preparing Files</Loader>
                </Dimmer>
                <Container>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell collapsing>
                                    Import
                                </Table.HeaderCell>
                                <Table.HeaderCell>File</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {comicFileList.map(file => {
                                return (
                                    <Table.Row key={file.file}>
                                        <Table.Cell collapsing>
                                            <Checkbox checked={file.checked} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                handleChangeCheckbox(file.file);
                                            }} />
                                        </Table.Cell>
                                        <Table.Cell>{file.file}</Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Container>
            </Segment>
        </div>
    );
};

export default Import;
