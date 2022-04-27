import { useQuery, useMutation } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';

const createUserDocument = gql`
    mutation createUser($data: UserCreateInput!){
        createUser(
            data: $data
        ) {
            id
            email
        }
    }
`

interface UserCreateInput {
    id: string;
    email: string;
    displayName: string;
};

const createUserMutation = async (createUserInput: UserCreateInput) => {
    const { id, email, displayName } = createUserInput;

    const variables = {
        "id": id,
        "email": email,
        "displayName": displayName
    };

    const { createUser } = await request({
        url: endpoint,
        document: createUserDocument,
        variables: { data: variables }
    });
    console.log(createUser)
    return createUser;
};

export const useCreateUser = () => {
    return useMutation(createUserMutation)
};

const userDocument = gql`
    query User($id: String) {
        user (where: { id: $id } ) {
            id
            email
            displayName
        }
    }
`;

export const useUser = (id: string, displayName: string) => {
    return useQuery(['user', displayName], async () => {
        const { user } = await request({
            url: endpoint,
            document: userDocument,
            variables: { id }
        });
        console.log(user)
        return user;
    })
}