import db from '../utils/db';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        const insertUserSql = `
            INSERT INTO \`user\` (us_fName, us_lName, us_userName, us_password, us_entry, us_vacation, us_timeComp)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        const insertUserParams = [
            body.firstName,
            body.lastName,
            body.userName,
            body.password,
            body.entry,
            body.vacation,
            body.timeComp
        ]

        const userResult = await db.query(insertUserSql, insertUserParams)

        const insertExpectSql = `
            INSERT INTO expected (ex_hours, we_id)
            VALUES (?, ?)
        `

        for (const expect of body.expected) {
            const expectParams = [expect.hours, expect.weekday]
            const result = await db.query(insertExpectSql, expectParams)
        }

        const lastUserId = (await db.query(`
            SELECT AUTO_INCREMENT
            FROM information_schema.tables
            WHERE table_name = 'user'
        `))[0][1].AUTO_INCREMENT

        console.log(lastUserId)

        const lastExpectedId = (await db.query(`
            SELECT AUTO_INCREMENT
            FROM information_schema.tables
            WHERE table_name = 'expected'
        `))[0][0].AUTO_INCREMENT

        console.log(lastExpectedId)

        let count = lastExpectedId - 1 - body.expected.length

        const insertUserExpectSql = `
            INSERT INTO user_expected (us_id, ex_id)
            VALUES (?, ?)
        `

        while (count < lastExpectedId) {
            const userExpectParams = [lastUserId - 1, count]
            await db.query(insertUserExpectSql, userExpectParams)

            count++
        }

        return {success: true}

    } catch (err) {
        console.error('Full server error:', err)
        throw createError({
            statusCode: 500,
            statusMessage: 'Unhandled server error',
            data: err.message
        })
    }
})