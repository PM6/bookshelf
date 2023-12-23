import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client'

const queryName = 'list-items'

function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: queryName,
    queryFn: () =>
      client(queryName, {token: user.token}).then(data => data.listItems),
  })
  return listItems ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId) ?? null
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries(queryName),
}

function useUpdateListItem(user) {
  return useMutation(
    updates =>
      client(`${queryName}/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    defaultMutationOptions,
  )
}

function useRemoveListItem(user) {
  return useMutation(
    ({id}) =>
      client(`${queryName}/${id}`, {method: 'DELETE', token: user.token}),
    defaultMutationOptions,
  )
}

function useCreateListItem(user) {
  return useMutation(
    ({bookId}) => client(queryName, {data: {bookId}, token: user.token}),
    defaultMutationOptions,
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
