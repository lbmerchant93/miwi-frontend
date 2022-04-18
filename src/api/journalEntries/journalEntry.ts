import API from '../apolloClient';
import { gql } from '@apollo/client';
import { useQuery, useMutation, useQueryClient  } from 'react-query';

const journalEntry = gql`
  query JournalEntry($id: Int) {
    journalEntry(where: { id: $id }) {
      id
      date
      exercise
      garlandPose
      kegels
      prenatalVitamins
      probiotics
      proteinIntake
      authorId
      waterIntake
    }
  }
`;

export const useJournalEntry = (id: string) => {
  return useQuery(['journalEntry'], async () => {
      const { data } = await API.query<any>({
          query: journalEntry,
          variables: { id: Number(id) }
      });

      return data.journalEntry;
  });
};

const createJournalEntryMutation = gql`
  mutation createJournalEntry($data: JournalEntryCreateInputData!){
    createJournalEntry(
      data: $data
    ) {
      id
      date
      exercise
      garlandPose
      kegels
      prenatalVitamins
      probiotics
      proteinIntake
      waterIntake
      authorId
    }
  }
`; 

interface JournalEntryCreate {
  authorId: string | undefined;
  date: string | null;
  waterIntake: number | string;
  proteinIntake: number | string;
  exercise: number | string;
  kegels: number | string;
  garlandPose: number | string;
  prenatalVitamins: boolean | null;
  probiotics: boolean | null;
}

const createJournalEntry = async (createJournalEntryInput: JournalEntryCreate) => {
  const { 
    date, 
    exercise, 
    garlandPose, 
    kegels, 
    prenatalVitamins, 
    probiotics, 
    proteinIntake, 
    waterIntake, 
    authorId 
  } = createJournalEntryInput;

  const variables = {
    "date": date,
    "exercise": exercise,
    "garlandPose": garlandPose,
    "kegels": kegels,
    "prenatalVitamins": prenatalVitamins,
    "probiotics": probiotics,
    "proteinIntake": proteinIntake,
    "waterIntake": waterIntake,
    "authorId": authorId
  };

  const { data } = await API.mutate<any>({
    mutation: createJournalEntryMutation,
    variables: { data: variables}
  });
  
  return data.createJournalEntry;
}

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(createJournalEntry, {
    onSuccess: (newEntry) => {
      queryClient.setQueryData(["journalEntries"], (oldData: any) => {
        return [...oldData, newEntry]
      })
    }
  })
}

export interface JournalEntryUpdate {
  id: string | undefined;
  date: string | null;
  waterIntake: number | string;
  proteinIntake: number | string;
  exercise: number | string;
  kegels: number | string;
  garlandPose: number | string;
  prenatalVitamins: boolean | null;
  probiotics: boolean | null;
  authorId: string | undefined;
}

const updateJournalEntryMutation = gql`
  mutation updateJournalEntry(
    $data: JournalEntryCreateInputData!
    $updateJournalEntryId: Int!
  ) { updateJournalEntry(
    data: $data
    id: $updateJournalEntryId
  ) {
    id
    date
    exercise
    garlandPose
    kegels
    prenatalVitamins
    probiotics
    proteinIntake
    waterIntake
    authorId
    }
  }
`;

const updateJournalEntry = async (updateJournalEntryInput: JournalEntryUpdate) => {
  const { 
    id,
    date, 
    exercise, 
    garlandPose, 
    kegels, 
    prenatalVitamins, 
    probiotics, 
    proteinIntake, 
    waterIntake, 
    authorId
  } = updateJournalEntryInput;

  const variables = {
    "date": date,
    "exercise": exercise,
    "garlandPose": garlandPose,
    "kegels": kegels,
    "prenatalVitamins": prenatalVitamins,
    "probiotics": probiotics,
    "proteinIntake": proteinIntake,
    "waterIntake": waterIntake,
    "authorId": authorId 
  };

  const { data } = await API.mutate<any>({
    mutation: updateJournalEntryMutation,
    variables: { data: variables, updateJournalEntryId: Number(id) }
  });

  return data.updateJournalEntry;
}

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(updateJournalEntry, {
    onSuccess: async () => {
      // working here, the work below instantly updates the dashboard... YAY!!...BUTTTT... needs to be slowed down, should show the snackbar
      // await queryClient.refetchQueries(['journalEntries'])
      await queryClient.invalidateQueries({ queryKey: ["journalEntries"], refetchActive: false })
    }
  })
}

const deleteJournalEntryMutation = gql`
  mutation deleteJournalEntry($where: JournalEntryWhereUniqueInput!) {
    deleteJournalEntry(where: $where) {
      id
    }
  }
`

const deleteJournalEntry = async (id: number) => {
  const { data } = await API.mutate<any>({
    mutation: deleteJournalEntryMutation,
    variables: { where: { id: Number(id) } }
  });

  return data.deleteJournalEntry;
}

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteJournalEntry, {
    onSuccess: async (_, id) => {
      await queryClient.setQueryData("journalEntries", (oldData: any) => oldData.filter((entry: { id: number; }) => entry.id !== id))
    }
  })
}