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

interface GoalUpdateInput {
    id: string;
    waterIntakeGoal: number | null;
    proteinIntakeGoal: number | null;
    exerciseGoal: number | null;
    kegelsGoal: number | null;
    garlandPoseGoal: number | null;
};

const updateGoalsMutation = async (goalUpdateInput: GoalUpdateInput) => {
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
    } = goalUpdateInput;

    const variables = {
        "waterIntakeGoal": waterIntakeGoal,
        "proteinIntakeGoal": proteinIntakeGoal,
        "exerciseGoal": exerciseGoal,
        "kegelsGoal": kegelsGoal,
        "garlandPoseGoal": garlandPoseGoal
    };

    const { updateGoal } = await request({
        url: endpoint,
        document: updateGoalDocument,
        variables: { data: variables, where: { "id": id } },
        requestHeaders
    });
    return updateGoal;
};

export const useUpdateGoals = () => {
    return useMutation(updateGoalsMutation)
};