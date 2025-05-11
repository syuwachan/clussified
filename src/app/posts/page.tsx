"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AdUploadForm from "@/components/ui/AdUploadForm";
import Header from '@/components/Header';
import SelectCategoryForm from '@/components/ui/SelectCategoryForm';
export default function NewPost() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Header />
			{/* <AdUploadForm /> */}
			<SelectCategoryForm />
		</div>
	);
}
