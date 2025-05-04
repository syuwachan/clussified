'use client';

import Header from '@/components/Header'
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';

export default function buyselltrade() {
	const [isClient, setIsClient] = useState(false);
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (isClient && !user) {
			router.push('/login');
		}
	}, [isClient, user, router]);

	if (!isClient) {
		return null;
	}

	const handleViewDetail = () => {
		console.log('View detail clicked');
	};

	return (
		<>
			<Header />
			<Card
				title="BNR32"
				tag="Car"
				authorName="Sui"
				date="01 May, 2025"
				location="Tokyo,Japan"
				images={['/image/car1.png', '/image/car2.png', '/image/car3.png']}
				onViewDetail={handleViewDetail}
			/>
		</>
	);
} 