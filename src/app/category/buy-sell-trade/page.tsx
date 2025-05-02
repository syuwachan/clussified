'use client';

import Header from '@/components/Header'
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./Card.css";
import { Button } from '@/components/ui/button';

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

	return (
		<>
			<Header />


			<div className="card-container">
				<div className="card-image-container">
					<img className="card-image" src="/image/car.png" title="Corvette C7" />
				</div>
				<div className="card-content">
					<div className="card-header">
						<p className="card-tag">
							Car
						</p>
						<div className="card-title">Corvette C7</div>
					</div>
					<div className="card-author">
						<div className="author-info">
							<div>
								<p className="">author Name</p>
								<p className="author-name">Sui</p>
							</div>
							<div>
								<p className="">Date</p>
								<p className="author-date">01 Apr, 2025</p>
							</div>
							<div>
								<p className="">Location</p>
								<p className="author-location">Tokyo</p>
							</div>
						</div>
					</div>
				</div>
				<div className='card-info__container'>
					<button className="btn-view-detail">
						View Detail
					</button>
				</div>
			</div>
		</>
	);
} 