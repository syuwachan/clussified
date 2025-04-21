import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

export default function useSession() {
	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getSession = async () => {
			const { data, error } = await supabase.auth.getUser()
			if (data?.user) setUser(data.user)
			setLoading(false)
		}

		getSession()

		const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
			setUser(session?.user || null)
		})

		return () => {
			listener.subscription.unsubscribe()
		}
	}, [])

	return { user, loading }
}