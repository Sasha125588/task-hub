import type { Database } from '@generated/database.types'

export type DBUser = Database['public']['Tables']['user']['Row']

export type DBChannel = Database['public']['Tables']['channels']['Row']

export type DBMessage = Database['public']['Tables']['messages']['Row']

export type DBTask = Database['public']['Tables']['tasks']['Row']

export type DBSubTask = Database['public']['Tables']['sub_tasks']['Row']
