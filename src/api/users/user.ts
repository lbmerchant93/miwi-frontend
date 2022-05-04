import { useQuery, useMutation } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';

const userDocument = gql`
    query User($id: String) {
        user (where: { id: $id } ) {
            id
            email
            displayName
            expectedDueDate
        }
    }
`;

export const useUser = (id: string | undefined, displayName: string | null) => {
    return useQuery(['user', displayName], async () => {
        const { user } = await request({
            url: endpoint,
            document: userDocument,
            variables: { id }
        });
        return user;
    }, {
        enabled: id !== undefined && id !== null && id !== ''
    })
}

const loginUserDocument = gql`
    mutation loginUser($data: UserLoginInputData!){
        loginUser(
            data: $data
        ) {
            id
            email
            displayName
            expectedDueDate
        }
    }
`

interface UserLoginInput {
    id: string;
    email: string | null;
    displayName: string | null;
};

const loginUserMutation = async (createUserInput: UserLoginInput) => {
    const { id, email, displayName } = createUserInput;

    const variables = {
        "id": id,
        "email": email,
        "displayName": displayName
    };

    const { loginUser } = await request({
        url: endpoint,
        document: loginUserDocument,
        variables: { data: variables }
    });
    return loginUser;
};

export const useLoginUser = () => {
    return useMutation(loginUserMutation)
};

const updateUserDocument = gql`
    mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!){
        updateUser(
            data: $data
            where: $where 
        ) {
            id
            email
            displayName
            expectedDueDate
        }
    }
`

interface UserUpdateInput {
    id: string | undefined;
    expectedDueDate: string | null;
}

const updateUserMutation = async (userUpdateInput: UserUpdateInput) => {
    const { id, expectedDueDate } = userUpdateInput;

    const variables = {
        "expectedDueDate": { "set": expectedDueDate }
    };

    const { updateUser } = await request({
        url: endpoint,
        document: updateUserDocument,
        variables: { data: variables, where: { "id": id } }
    });

    return updateUser;
}

export const useUpdateUser = () => {
    return useMutation(updateUserMutation)
}

const deleteUserDocument = gql`
    mutation deleteUser($id: String) {
        deleteUser(where: { id: $id } ) {
            id
            email
        }
    }
`

const deleteUserMutation = async (id: string | undefined) => {
    const { deleteUser } = await request({
        url: endpoint,
        document: deleteUserDocument,
        variables: { id }
    });
    
    return deleteUser;
};

export const useDeleteUser = () => {
    return useMutation(deleteUserMutation);
};