import db from '../utils/db';

export default defineEventHandler(async (event) => {
    const [users] = await db.query(`SELECT *
                                    FROM worked
                                    where us_id = ${event.path.substring(event.path.lastIndexOf('=') + 1)}`);

    return users
})