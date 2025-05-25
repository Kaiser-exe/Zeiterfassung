import db from '../utils/db';

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event)

    await db.query(`
        INSERT INTO user (us_fName, us_lName, us_userName, us_password, us_entry, us_vacation, us_timeComp)
        VALUES (${requestBody.firstName}, ${requestBody.lastName}, ${requestBody.userName},
                ${requestBody.password},
                ${requestBody.entry}, ${requestBody.vacation}, ${requestBody.timeComp})
    `)

    for (const expect of requestBody.expected) {
        await db.query(`
            INSERT INTO expected (ex_hours, we_id)
            VAlUES (${expect.hours}, ${expect.weekday})
        `)
    }

    const lastUserId = (await db.query(`
        SELECT AUTO_INCREMENT
        FROM information_schema.tables
        WHERE table_name = 'user'
    `))[0].data.value[0]

    const lastExpectedIds = (await db.query(`
        SELECT AUTO_INCREMENT
        FROM information_schema.tables
        WHERE table_name = 'expected'
    `))[0].data.value[0]

    let count = lastExpectedIds - 1 - requestBody.expected.length

    while (count < lastExpectedIds) {
        await db.query(`
            INSERT INTO user_expected (us_id, ex_id)
            VAlUES (${lastUserId - 1}, ${count})
        `)

        count++
    }
})