import MysqlStore from './mysql.store.js';
import RedisStore from './redis.store.js';
import AppStore from './app.store.js';
export default {
    modules: {
        MStore: MysqlStore,
        RStore: RedisStore,
        AStore: AppStore,
    }
}