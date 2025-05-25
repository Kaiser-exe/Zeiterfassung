import db from '../utils/db';

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event)

    await db.query(`
        INSERT INTO worked (wo_startTime, wo_endTime, wo_break, ab_id, us_id)
        VALUES (${requestBody.startTime}, ${requestBody.endTime}, ${requestBody.break},
                ${requestBody.absenceId},
                ${requestBody.userId})
    `)
})