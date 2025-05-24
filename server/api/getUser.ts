import db from '../utils/db';

export default defineEventHandler(async (event) => {
    let users = ''
    if (event.path.includes('?')) {
        [users] = await db.query(`SELECT *
                                  FROM user
                                  where us_id = ${event.path.substring(event.path.lastIndexOf('=') + 1)}`);
    } else {
        [users] = await db.query(`SELECT *
                                  FROM user`);
    }

    return users
})