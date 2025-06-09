import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function UploadImages() {
	const [images, setImages] = useState<string[]>([])
	const supabase = createClientComponentClient()

	return (
		<div>
			{/* <input type="file" onChange={handleImageChange} /> */}
		</div>
	)
}