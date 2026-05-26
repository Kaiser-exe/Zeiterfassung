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
  hours: number
  weekday: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  entry: Date
  departure?: Date
  newVac: number
  useVac: number
  timeComp: number
  worked: Worked[]
  expected: Expected[]
}

export type AdminOverview = {
  id: number
  firstName: string
  lastName: string
  users: User[]
}
