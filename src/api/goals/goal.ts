import { useMutation } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';
import { getAuthToken } from '../../App.authProvider';

const updateGoalDocument = gql`
    mutation updateGoal($data: GoalUpdateInput!, $where: GoalWhereUniqueInput!){
        updateGoal(
            data: $data
            where: $where
        ) {
            id
            waterIntakeGoal
            proteinIntakeGoal
            exerciseGoal
            kegelsGoal
            garlandPoseGoal
        }
    }
`

interface UpdateGoalInput {
    id: string;
    waterIntakeGoal: number | null;
    proteinIntakeGoal: number | null;
    exerciseGoal: number | null;
    kegelsGoal: number | null;
    garlandPoseGoal: number | null;
};

const updateGoalMutation = async (updateGoalInput: UpdateGoalInput) => {
    const token = getAuthToken();
    const requestHeaders = {
        authorization: `Bearer ${token}`
    }
    const { id, 
        waterIntakeGoal, 
        proteinIntakeGoal, 
        exerciseGoal, 
        kegelsGoal, 
        garlandPoseGoal 
    } = updateGoalInput;

    const variables = {
        "id": id,
        "waterIntakeGoal": waterIntakeGoal,
        "proteinIntakeGoal": proteinIntakeGoal,
        "exerciseGoal": exerciseGoal,
        "kegelsGoal": kegelsGoal,
        "garlandPoseGoal": garlandPoseGoal
    };

    const { updateGoal } = await request({
        url: endpoint,
        document: updateGoalDocument,
        variables: { data: variables },
        requestHeaders
    });
    return updateGoal;
};

export const useUpdateGoal = () => {
    return useMutation(updateGoalMutation)
};