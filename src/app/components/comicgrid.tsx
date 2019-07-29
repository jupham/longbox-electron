import React, { Component, useState, useEffect } from 'react';
import { Grid, GridRow } from 'semantic-ui-react';
import { Comic } from '../entity/comic';
import ComicCell from './comiccell';
const { ipcRenderer } = require('electron-better-ipc');

const GRID_COLUMNS = 4;

const ComicGrid: React.FunctionComponent = () => {
    const [comics, setComics] = useState(new Array<Comic>());
    const [refreshComics, setRefreshComics] = useState(false);
    useEffect(() => {
        let didCancel = false;

        async function fetchIPCComics() {
            const result = await ipcRenderer.callMain('getComics');

            if (!didCancel) {
                setComics(result);
            }
        }

        fetchIPCComics();
        return () => {didCancel = true}
    }, [refreshComics]);

    let rows: Array<React.ReactElement> = [];
    for(let i = 0; i < comics.length; i = i + 4) {
        let cells: Array<React.ReactElement> = [];

        cells.push(<ComicCell key={comics[i].id}comic={comics[i]} />);

        if (comics.length > i + 1) { cells.push(<ComicCell key={comics[i + 1].id} comic={comics[i + 1]} />); }
        if (comics.length > i + 2) { cells.push(<ComicCell key={comics[i + 2].id} comic={comics[i + 2]} />); }
        if (comics.length > i + 3) { cells.push(<ComicCell key={comics[i + 3].id} comic={comics[i + 3]} />); }

        rows.push(<Grid.Row key={i}>{cells}</Grid.Row>);
    }

    return (
        <Grid columns={4}>
            {rows}
        </Grid>
    )
}

export default ComicGrid;