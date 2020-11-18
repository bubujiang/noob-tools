import MysqlStore from './mysql.store.js';
import RedisStore from './redis.store.js';
import OtherStore from './other.store.js';
import ServerStore from './server.store.js';
export default {
    modules: {
        MStore: MysqlStore,
        RStore: RedisStore,
        OStore: OtherStore,
        SStore: ServerStore
    }
}