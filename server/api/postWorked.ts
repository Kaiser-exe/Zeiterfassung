import db from '../utils/db';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        const sql = `
            INSERT INTO worked (wo_startTime, wo_endTime, wo_break, ab_id, us_id)
            VALUES (?, ?, ?, ?, ?)
        `

        const params = [
            body.startTime,
            body.endTime,
            body.break,
            body.absence,
            body.id
        ]

        const result = await db.query(sql, params)

        return {success: true, result}

    } catch (error) {
        console.error('Error inserting worked row:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Database insert failed',
            data: error.message
        })
    }
})