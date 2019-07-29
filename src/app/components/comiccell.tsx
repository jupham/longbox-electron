import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Comic } from '../entity/comic';

interface IComicCell {
    comic: Comic
}

const ComicCell: React.FunctionComponent<IComicCell> = ({ comic }) => {
    return (
        <Card>
            <Image src='http://via.placeholder.com/300'/>
            <Card.Content>
                <Card.Header>{comic.name}</Card.Header>
            </Card.Content>
        </Card>
    );
}

export default ComicCell;