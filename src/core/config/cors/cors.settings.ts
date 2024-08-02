import {corsWhiteList} from './cors.whitelist'

export const corsSettings = {
    origin: (origin: string | undefined) => {
        if (corsWhiteList.indexOf(origin as string) !== -1 || !origin) {
            return true
        }
        return false
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
}