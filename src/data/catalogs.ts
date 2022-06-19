import {CatalogOptions, CatalogFeatures} from '@mediaurl/sdk';
import {SortingMethod} from '../helpers/enums';

const catalogOptions: CatalogOptions = {
    displayName: false,
    shape: 'landscape'
};

const catalogFeatures: CatalogFeatures = {
    sort: [
        {
            id: SortingMethod.RECENT,
            name: 'Recent'
        },
        {
            id: SortingMethod.TRENDING,
            name: 'Trending'
        }
    ],
    search: {
        enabled: true
    }
};

export const catalogs = [
    {
        id: '1',
        name: 'News',
        adult: false,
        options: catalogOptions,
        features: catalogFeatures,
        keyword: 'news'
    },
    {
        id: '2',
        name: 'Sport',
        adult: false,
        options: catalogOptions,
        features: catalogFeatures,
        keyword: 'sport'
    },
    {
        id: '3',
        name: 'Short Films',
        adult: false,
        options: catalogOptions,
        features: catalogFeatures,
        keyword: 'shortfilms'
    },
    {
        id: '4',
        name: 'Video Games',
        adult: false,
        options: catalogOptions,
        features: catalogFeatures,
        keyword: 'videogames',
    },
    {
        id: '5',
        name: 'Music',
        adult: false,
        options: catalogOptions,
        features: catalogFeatures,
        keyword: 'music'
    }
]