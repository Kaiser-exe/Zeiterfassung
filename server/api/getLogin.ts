import db from '../utils/db';

export default defineEventHandler(async (event) => {
    const [users] = await db.query(`SELECT us_username as 'username', us_password as 'password', us_admin as 'admin'
                                    FROM user`);

    return [users];
})