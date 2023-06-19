'use client'

import * as Schema from '@effect/schema/Schema'
import * as Evolu from 'evolu'
import { FunctionComponent } from 'react'

const TodoId = Evolu.id('Todo')
type TodoId = Schema.To<typeof TodoId>

const TodoTable = Schema.struct({
	id: TodoId,
	title: Evolu.NonEmptyString1000,
	isCompleted: Evolu.SqliteBoolean,
})
type TodoTable = Schema.To<typeof TodoTable>

const Database = Schema.struct({
	todo: TodoTable,
})

export const {
	useQuery,
	useMutation,
	useOwner,
	useOwnerActions,
	useEvoluError,
} = Evolu.create(Database)

export const In: FunctionComponent = () => {
	const { create } = useMutation()
	const entries = useQuery(
		(database) =>
			database.selectFrom('todo').select(['id', 'title']).orderBy('updatedAt'),
		({ title, ...rest }) => title && { title, ...rest },
	).rows

	return (
		<>
			<button
				type="button"
				onClick={() => {
					create('todo', {
						isCompleted: false,
						title: Schema.parse(Evolu.NonEmptyString1000)(
							`Todo ${new Date().toLocaleTimeString()}`,
						),
					})
				}}
			>
				Add entry
			</button>
			<h2>Entries</h2>
			<pre>{JSON.stringify(entries, null, 2)}</pre>
		</>
	)
}
