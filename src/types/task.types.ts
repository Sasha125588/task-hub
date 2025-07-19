export type TaskStatuses = 'not-started' | 'completed' | 'in-progress'

export const StatusFilter = ['all', 'not-started', 'completed', 'in-progress'] as const

export type TStatusFilter = (typeof StatusFilter)[number]

export type TaskSortType = 'asc' | 'desc'
