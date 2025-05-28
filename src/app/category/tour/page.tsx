// 'use client';

// import Header from '@/components/Header'
// import useAuth from '@/hooks/useAuth';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function tourPage() {
// 	const [isClient, setIsClient] = useState(false);
// 	const { user } = useAuth();
// 	const router = useRouter();

// 	useEffect(() => {
// 		setIsClient(true);
// 	}, []);

// 	useEffect(() => {
// 		if (isClient && !user) {
// 			router.push('/login');
// 		}
// 	}, [isClient, user, router]);

// 	if (!isClient) {
// 		return null;
// 	}

// 	return (
// 		<>
// 			<Header />
// 			<div>イベントページ</div>
// 		</>
// 	);
// } 