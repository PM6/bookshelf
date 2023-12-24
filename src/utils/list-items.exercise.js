import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client'
import {setQueryDataForBook} from './books'

const queryName = 'list-items'

function useListItems(user) {
  const {data: listItems} = useQuery({
    queryKey: queryName,
    queryFn: () =>
      client(queryName, {token: user.token}).then(data => data.listItems),
    config: {
      onSuccess(listItems) {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
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

function useUpdateListItem(user, options) {
  return useMutation(
    updates =>
      client(`${queryName}/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    {...defaultMutationOptions, ...options},
  )
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({id}) =>
      client(`${queryName}/${id}`, {method: 'DELETE', token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

function useCreateListItem(user, options) {
  return useMutation(
    ({bookId}) => client(queryName, {data: {bookId}, token: user.token}),
    {...defaultMutationOptions, ...options},
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
