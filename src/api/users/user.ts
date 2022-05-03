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