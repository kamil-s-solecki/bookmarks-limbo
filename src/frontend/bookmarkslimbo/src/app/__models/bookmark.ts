import { Tag } from './tag';

export interface Bookmark {
    id?: number;
    link: string;
    title: string;
    description?: string;
    expiration: string;
    tags: Tag[];
}