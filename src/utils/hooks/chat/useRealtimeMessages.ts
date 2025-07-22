'use client'

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { Database } from "../../../../generated/database.types"
import { getMessages } from "@/utils/api"

export const useRealtimeMessages = (channelId: string) => {
    const supabase = createClient()
    const [messages, setMessages] = useState<Database["public"]["Tables"]["messages"]["Row"][]>([])

    useEffect(() => {
        const getInitialMessages = async () => {
            const data = await getMessages(channelId)
            if (data) {
                setMessages(data)
            }
        }
        getInitialMessages()
        
    }, [messages])

    useEffect(() => {
        const messageListener = supabase
            .channel('public:messages')
            .on(
                'postgres_changes',
                { 
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                payload => setMessages(messages => [...messages, payload.new as Database["public"]["Tables"]["messages"]["Row"]])
            )
            .subscribe()

        return () => {
            supabase.removeChannel(messageListener)
        }
    }, [channelId])

    return messages
}