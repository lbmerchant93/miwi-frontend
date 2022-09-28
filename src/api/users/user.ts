import { useQuery, useQueryClient, useMutation } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';
import { getAuthToken } from '../../App.authProvider';

const userDocument = gql`
    query User($id: String) {
        user (where: { id: $id } ) {
            id
            email
            displayName
            expectedDueDate
            goals {
                id
                waterIntakeGoal
                proteinIntakeGoal
                exerciseGoal
                kegelsGoal
                garlandPoseGoal
            }
        }
    }
`;

export const useUser = (id: string | undefined, email: string | null) => {
    const token = getAuthToken();
    const requestHeaders = {
        authorization: `Bearer ${token}`
    }
    return useQuery(['user', email], async () => {
        const { user } = await request({
            url: endpoint,
            document: userDocument,
            variables: { id },
            requestHeaders
        });
        return user;
    }, {
        enabled: id !== undefined && id !== null && id !== '' && email !== '' && email !== null
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
            goals {
                id
                waterIntakeGoal
                proteinIntakeGoal
                exerciseGoal
                kegelsGoal
                garlandPoseGoal
            }
        }
    }
`

interface UserLoginInput {
    id: string;
    email: string | null;
    displayName: string | null;
};

const loginUserMutation = async (createUserInput: UserLoginInput) => {
    const token = await getAuthToken();
    const requestHeaders = {
        authorization: `Bearer ${token}`
    }
    const { id, email, displayName } = createUserInput;

    const variables = {
        "id": id,
        "email": email,
        "displayName": displayName
    };

    const { loginUser } = await request({
        url: endpoint,
        document: loginUserDocument,
        variables: { data: variables },
        requestHeaders
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
    displayName: string | null | undefined;
    expectedDueDate: string | null;
}

const updateUserMutation = async (userUpdateInput: UserUpdateInput) => {
    const token = getAuthToken();
    const requestHeaders = {
        authorization: `Bearer ${token}`
    }
    const { id, displayName, expectedDueDate } = userUpdateInput;

    const variables = {
        "displayName": { "set": displayName },
        "expectedDueDate": { "set": expectedDueDate }
    };

    const { updateUser } = await request({
        url: endpoint,
        document: updateUserDocument,
        variables: { data: variables, where: { "id": id } },
        requestHeaders
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
    const token = getAuthToken();
    const requestHeaders = {
        authorization: `Bearer ${token}`
    }

    const { deleteUser } = await request({
        url: endpoint,
        document: deleteUserDocument,
        variables: { id },
        requestHeaders
    });
    
    return deleteUser;
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteUserMutation, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["user"] })
        }
    });
};