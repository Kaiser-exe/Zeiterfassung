import db from '../utils/db';

export default defineEventHandler(async (event) => {
    const [users] = await db.query(`SELECT *
                                    FROM weekday`);

    return users
})