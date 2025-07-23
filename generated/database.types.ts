export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
	// Allows to automatically instanciate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '12.2.3 (519615d)'
	}
	public: {
		Tables: {
			account: {
				Row: {
					accessToken: string | null
					accessTokenExpiresAt: string | null
					accountId: string
					createdAt: string
					id: string
					idToken: string | null
					password: string | null
					providerId: string
					refreshToken: string | null
					refreshTokenExpiresAt: string | null
					scope: string | null
					updatedAt: string
					userId: string
				}
				Insert: {
					accessToken?: string | null
					accessTokenExpiresAt?: string | null
					accountId: string
					createdAt: string
					id: string
					idToken?: string | null
					password?: string | null
					providerId: string
					refreshToken?: string | null
					refreshTokenExpiresAt?: string | null
					scope?: string | null
					updatedAt: string
					userId: string
				}
				Update: {
					accessToken?: string | null
					accessTokenExpiresAt?: string | null
					accountId?: string
					createdAt?: string
					id?: string
					idToken?: string | null
					password?: string | null
					providerId?: string
					refreshToken?: string | null
					refreshTokenExpiresAt?: string | null
					scope?: string | null
					updatedAt?: string
					userId?: string
				}
				Relationships: [
					{
						foreignKeyName: 'account_userId_fkey'
						columns: ['userId']
						isOneToOne: false
						referencedRelation: 'user'
						referencedColumns: ['id']
					}
				]
			}
			channels: {
				Row: {
					created_at: string
					created_by: string
					id: string
					slug: string
				}
				Insert: {
					created_at?: string
					created_by: string
					id: string
					slug: string
				}
				Update: {
					created_at?: string
					created_by?: string
					id?: string
					slug?: string
				}
				Relationships: [
					{
						foreignKeyName: 'channels_user_id_fkey'
						columns: ['created_by']
						isOneToOne: false
						referencedRelation: 'user'
						referencedColumns: ['id']
					}
				]
			}
			messages: {
				Row: {
					channel_id: string
					id: string
					inserted_at: string
					message: string
					user_id: string
				}
				Insert: {
					channel_id: string
					id: string
					inserted_at?: string
					message: string
					user_id: string
				}
				Update: {
					channel_id?: string
					id?: string
					inserted_at?: string
					message?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'messages_channel_id_fkey'
						columns: ['channel_id']
						isOneToOne: false
						referencedRelation: 'channels'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'messages_user_id_fkey'
						columns: ['user_id']
						isOneToOne: false
						referencedRelation: 'user'
						referencedColumns: ['id']
					}
				]
			}
			session: {
				Row: {
					createdAt: string
					expiresAt: string
					id: string
					ipAddress: string | null
					token: string
					updatedAt: string
					userAgent: string | null
					userId: string
				}
				Insert: {
					createdAt: string
					expiresAt: string
					id: string
					ipAddress?: string | null
					token: string
					updatedAt: string
					userAgent?: string | null
					userId: string
				}
				Update: {
					createdAt?: string
					expiresAt?: string
					id?: string
					ipAddress?: string | null
					token?: string
					updatedAt?: string
					userAgent?: string | null
					userId?: string
				}
				Relationships: [
					{
						foreignKeyName: 'session_userId_fkey'
						columns: ['userId']
						isOneToOne: false
						referencedRelation: 'user'
						referencedColumns: ['id']
					}
				]
			}
			sub_tasks: {
				Row: {
					created_at: string | null
					description: string | null
					id: string
					status: string
					task_id: string
					title: string
					updated_at: string | null
				}
				Insert: {
					created_at?: string | null
					description?: string | null
					id: string
					status: string
					task_id: string
					title: string
					updated_at?: string | null
				}
				Update: {
					created_at?: string | null
					description?: string | null
					id?: string
					status?: string
					task_id?: string
					title?: string
					updated_at?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'sub_tasks_task_id_fkey'
						columns: ['task_id']
						isOneToOne: false
						referencedRelation: 'tasks'
						referencedColumns: ['id']
					}
				]
			}
			tasks: {
				Row: {
					attachments: number | null
					comments: number | null
					created_at: string | null
					due_date: string
					end_time: string | null
					icon_name: string
					id: string
					links: number | null
					progress: number | null
					start_time: string | null
					status: string
					title: string
					updated_at: string | null
				}
				Insert: {
					attachments?: number | null
					comments?: number | null
					created_at?: string | null
					due_date: string
					end_time?: string | null
					icon_name: string
					id: string
					links?: number | null
					progress?: number | null
					start_time?: string | null
					status: string
					title: string
					updated_at?: string | null
				}
				Update: {
					attachments?: number | null
					comments?: number | null
					created_at?: string | null
					due_date?: string
					end_time?: string | null
					icon_name?: string
					id?: string
					links?: number | null
					progress?: number | null
					start_time?: string | null
					status?: string
					title?: string
					updated_at?: string | null
				}
				Relationships: []
			}
			user: {
				Row: {
					createdAt: string
					email: string
					emailVerified: boolean
					id: string
					image: string | null
					name: string
					updatedAt: string
				}
				Insert: {
					createdAt: string
					email: string
					emailVerified: boolean
					id: string
					image?: string | null
					name: string
					updatedAt: string
				}
				Update: {
					createdAt?: string
					email?: string
					emailVerified?: boolean
					id?: string
					image?: string | null
					name?: string
					updatedAt?: string
				}
				Relationships: []
			}
			verification: {
				Row: {
					createdAt: string | null
					expiresAt: string
					id: string
					identifier: string
					updatedAt: string | null
					value: string
				}
				Insert: {
					createdAt?: string | null
					expiresAt: string
					id: string
					identifier: string
					updatedAt?: string | null
					value: string
				}
				Update: {
					createdAt?: string | null
					expiresAt?: string
					id?: string
					identifier?: string
					updatedAt?: string | null
					value?: string
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R
			}
			? R
			: never
		: never

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I
			}
			? I
			: never
		: never

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U
			}
			? U
			: never
		: never

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema['Enums']
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never

export const Constants = {
	public: {
		Enums: {}
	}
} as const
