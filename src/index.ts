import {createAddon, MovieItem, runCli} from '@mediaurl/sdk';
import {catalogs} from './data/catalogs';
import {movies} from './data/movies';

const addon = createAddon({
    id: 'dailymotion_addon',
    name: 'Dailymotion',
    version: '1.0.0',
    itemTypes: ['movie'],
    triggers: ['name', 'id'],
    icon: 'http://static1.dmcdn.net/images/dailymotion-logo-ogtag.png.v2889585078f8ced02',
    catalogs
});

addon.registerActionHandler('catalog', async (input, _) => {
    let items: MovieItem[] = movies.filter(movie => movie.ids.catalogId.split('_')[0] === input.catalogId);
    items = items.map(item => {
        const {type, ids, images, name} = item;
        return {type, ids, images, name};
    });

    return {nextCursor: null, items};
});

addon.registerActionHandler('item', async (input, _) => {
    return <MovieItem>movies.find(item => item.ids.id === input.ids.id);
});

addon.registerActionHandler('source', async (input, _) => {
    const item = movies.find(item => item.ids.id === input.ids.id);

    if (item) {
        const {sources} = item;
        return sources || null;
    }

    return null;
});

runCli([addon]);
