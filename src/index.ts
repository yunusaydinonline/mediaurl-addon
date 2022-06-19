import {CatalogResponse, createAddon, MovieItem, runCli} from '@mediaurl/sdk';
import DataManager, {VideosReturn} from './DataManager';
import {catalogs} from './data/catalogs';
import {SortingMethod} from './helpers/enums';

const dataManager = DataManager.getInstance();

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
    const {catalogId, cursor, sort, search} = input;
    const {keyword} = catalogs.find(catalog => catalog.id === catalogId)!;

    const params = {
        language: 'en',
        country: 'us',
        fields: 'id,thumbnail_url,title',
        limit: 10
    };

    if (cursor)
        params['page'] = cursor;

    if (Object.values(SortingMethod).includes(sort as unknown as SortingMethod))
        params['sort'] = sort;

    if (search) {
        let searchQuery = search.toLowerCase();
        params['search'] = searchQuery.replace(/ /g, '%20');
    }

    const {page, has_more, items}: VideosReturn = await dataManager.getVideos(keyword, catalogId!, params);
    return {nextCursor: has_more ? page + 1 : null, items};
});

addon.registerActionHandler('item', async (input, _) => {
    const {id, catalogId} = input.ids;
    return <MovieItem>await dataManager.getVideoDetail(id, catalogId);
});

addon.registerActionHandler('source', async (input, _) => {
    const {id, catalogId} = input.ids;
    const item = await dataManager.getVideoDetail(id, catalogId);

    if (item) {
        const {sources} = item;
        return sources || null;
    }

    return null;
});

runCli([addon]);
