import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loader from '../../components/loader'
import Message from '../../components/message'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/users-api-slice'

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({})

  const [deleteUser] = useDeleteUserMutation()

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id)
        toast.success('User Deleted')
        refetch()
      } catch (err) {
        // @ts-ignore
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {/* @ts-ignore */}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <LinkContainer
                        to={`/admin/user/${user._id}/edit`}
                        style={{ marginRight: '10px' }}
                      >
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
