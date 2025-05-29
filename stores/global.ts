import {defineStore} from 'pinia'
import type {User, AdminOverview, Expected, Worked} from '../composables/types'

export const useGlobalStore = defineStore('global', () => {
    const userData = ref<User[]>([])
    const overviewData = ref<AdminOverview[]>([])
    const absence = ref([])
    const weekdays = ref([])

    const fetchUser = async (userId: string) => {
        let expectedWeekdays: Expected[] = []
        const workedAbsences: Worked[] = []
        let user = await (await useFetch('/api/getUser', {params: {param1: userId}})).data.value
        const worked = await (await useFetch('/api/getWorked', {params: {param1: userId}})).data.value
        const userExpected = await (await useFetch('/api/getUserExpected', {params: {param1: userId}})).data.value
        const expected = await (await useFetch('/api/getExpected')).data.value
        const absenceTemp = await (await useFetch('/api/getAbsence')).data.value
        const weekdaysTemp = await (await useFetch('/api/getWeekday')).data.value

        userData.value = []

        // match data together onto userData
        if (user) {
            user = user[0]
            for (const expect of expected) {
                expectedWeekdays.push({
                    id: expect.ex_id,
                    hours: expect.ex_hours,
                    weekdays: weekdaysTemp[expect.we_id - 1].we_name
                })
            }

            expectedWeekdays = expectedWeekdays.filter(expectedWeekday => userExpected && userExpected.some(userExpect => userExpect.ex_id === expectedWeekday.id))

            if (worked && absenceTemp) {
                for (const work of worked) {
                    workedAbsences.push({
                        id: work.wo_id,
                        startTime: work.wo_startTime,
                        endTime: work.wo_endTime,
                        break: work.wo_break,
                        absence: work.ab_id ?
                            {
                                id: work.ab_id,
                                name: absenceTemp[work.ab_id - 1].ab_name
                            }
                            : undefined
                    })
                }
            }

            userData.value.push({
                id: user.us_id,
                firstName: user.us_fName,
                lastName: user.us_lName,
                entry: user.us_entry,
                departure: user.us_departure ?? undefined,
                vacation: user.us_vacation,
                timeComp: user.us_timeComp,
                worked: workedAbsences,
                expected: expectedWeekdays
            })
        }
    }

    const fetchAdminOverview = async () => {
        const users = await (await useFetch('/api/getUser')).data.value
        const userExpected = await (await useFetch('/api/getUserExpected')).data.value
        const expected = await (await useFetch('/api/getExpected')).data.value
        const weekdaysTemp = await (await useFetch('/api/getWeekday')).data.value

        overviewData.value = []

        // match data together onto overviewData
        for (const user of users) {
            const expectedWeekdays: Expected[] = []

            if (userExpected) {
                for (const expect of expected.filter(expects => userExpected && userExpected.some(userExpect => expects.ex_id === userExpect.ex_id && userExpect.us_id === user.us_id))) {
                    expectedWeekdays.push({
                        id: expect.ex_id,
                        hours: expect.ex_hours,
                        weekday: weekdaysTemp[expect.we_id - 1].we_name
                    })
                }
            }

            overviewData.value.push({
                id: user.us_id,
                name: `${user.us_fName} ${user.us_lName}`,
                vacation: user.us_vacation,
                timeComp: user.us_timeComp,
                expected: expectedWeekdays,
            })
        }
    }

    const fetchAbsence = async () => {
        absence.value = await (await useFetch('/api/getAbsence')).data.value

        absence.value = absence.value.map(a => a.ab_name)
    }

    const fetchWeekdays = async () => {
        weekdays.value = await (await useFetch('/api/getWeekday')).data.value

        weekdays.value = weekdays.value.map(w => w.we_name)
    }

    const insertUser = async (user: User) => {
        const test = await $fetch('/api/postUser', {
            method: 'post',
            body: user
        })
    }

    const insertWorked = async (worked: Worked[]) => {
        for (const work of worked) {
            await useFetch('/api/postWorked', {method: 'post', body: work})
        }
    }

    return {
        userData,
        overviewData,
        absence,
        weekdays,
        fetchUser,
        fetchAdminOverview,
        fetchAbsence,
        fetchWeekdays,
        insertUser,
        insertWorked
    }
})