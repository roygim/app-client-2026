import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, loginUser, loadUser, logoutUser, addUser, editUser, deleteUser } from "../services/users.services";

function useUsers() {
    const getUserQuery = () => {
        return useQuery({ queryKey: ['users'], queryFn: getUsers, refetchOnWindowFocus: false, retry: 0 })
    }

    const loginUserMutation = () => {
        return useMutation({ mutationFn: loginUser });
    }

    const loadUserMutation = () => {
        return useMutation({ mutationFn: loadUser });
    }

    const logoutUserMutation = () => {
        return useMutation({ mutationFn: logoutUser });
    }

    const addUserMutation = () => {
        return useMutation({ mutationFn: addUser });
    }

    const editUserMutation = () => {
        return useMutation({ mutationFn: editUser });
    }

    const deleteUserMutation = () => {
        return useMutation({ mutationFn: deleteUser });
    }

    return {
        getUserQuery,
        loginUserMutation,
        loadUserMutation,
        logoutUserMutation,
        addUserMutation,
        editUserMutation,
        deleteUserMutation
    }
}

export default useUsers;