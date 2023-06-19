'use client'

import { Suspense } from 'react'
import { In, useEvoluError } from '../components/In'
import styles from './page.module.css'

export default function Home() {
	const error = useEvoluError()

	return (
		<main className={styles.main}>
			<Suspense fallback={<></>}>
				<In />
			</Suspense>
			{error && (
				<>
					<h2>Error</h2>
					<pre>{JSON.stringify(error, null, 2)}</pre>
				</>
			)}
		</main>
	)
}
