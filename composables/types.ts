export type Absence = {
    id: string
    name: string
}

export type Worked = {
    id: number
    startTime: Date
    endTime: Date
    break: number
    absence?: Absence
}

export type Expected = {
    id: number
    hours: string
    weekday: string
}

export type User = {
    id: number
    firstName: string
    lastName: string
    entry: Date
    departure?: Date
    vacation: number
    timeComp: number
    worked: Worked[]
    expected: Expected[]
}

export type AdminOverview = {
    id: number
    name: string
    vacation: number
    timeComp: number
    expected: Expected[]
}