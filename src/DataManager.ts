import {MovieItem} from '@mediaurl/sdk';
import axios from 'axios';

export type VideosReturn = { page: number, has_more: boolean, items: MovieItem[] }

const BASE_URL = 'https://api.dailymotion.com';
const VIDEOS = 'videos';
const VIDEO = 'video';

export default class DataManager {
    private static instance: DataManager;

    static getInstance() {
        if (this.instance)
            return this.instance;

        this.instance = new DataManager();
        return this.instance;
    }

    async getVideos(channel: string, catalogId: string, params: object): Promise<VideosReturn> {
        let url = `${BASE_URL}/${VIDEOS}?channel=${channel}`;
        url = url.replace(/ /g, '%20');

        for (const [key, value] of Object.entries(params)) {
            url = `${url}&${key}=${value}`
        }

        const videosPayload: VideosReturn = {
            page: -1,
            has_more: false,
            items: []
        }

        try {
            const response = await axios.get(url);

            if (response.status === 200) {
                const data = response.data;
                const {list, page, has_more} = data;

                videosPayload.page = page;
                videosPayload.has_more = has_more;
                videosPayload.items = list.map(item => {
                    const {id, thumbnail_url, title} = item;

                    return {
                        type: 'movie',
                        name: title,
                        ids: {catalogId: `${catalogId}_${id}`, id},
                        images: {
                            poster: thumbnail_url,
                        }
                    }
                });
            }

            return videosPayload;
        } catch (_) {
            return videosPayload;
        }
    }

    async getVideoDetail(id: string, catalogId: string): Promise<MovieItem | null> {
        let url = `${BASE_URL}/${VIDEO}/${id}?fields=allow_embed,description,title,embed_url,owner.cover_250_url`;

        try {
            const response = await axios.get(url);

            if (response.status === 200) {
                const data = response.data;
                const {description, title, embed_url} = data;
                const coverUrl = data['owner.cover_250_url'];

                return {
                    type: 'movie',
                    name: title,
                    ids: {catalogId: `${catalogId}_${id}`, id},
                    images: {
                        poster: coverUrl,
                    },
                    description: description,
                    spokenLanguages: ['en'],
                    sources: [{
                        type: 'externalUrl',
                        name: 'External URL',
                        url: embed_url,
                        languages: ['en']
                    }]
                }
            }

            return null;
        } catch (_) {
            return null;
        }
    }
}