import { useQuery, useMutation } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';



const createUserDocument = gql`
    mutation createUser($data: UserCreateInputData!){
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

    return createUser;
};

export const useCreateUser = () => {
    return useMutation(createUserMutation)
};