import {CatalogOptions} from '@mediaurl/sdk';

const catalogOptions: CatalogOptions = {
    displayName: false,
    shape: 'landscape'
};

export const catalogs = [
    {
        id: '1',
        name: 'News',
        adult: false,
        options: catalogOptions
    },
    {
        id: '2',
        name: 'Sports',
        adult: false,
        options: catalogOptions
    }
]