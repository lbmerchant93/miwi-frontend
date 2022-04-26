import { useMutation, useQueryClient  } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';

// Needs to be modified for graphql-request
// const journalEntry = gql`
//   query JournalEntry($id: Int) {
//     journalEntry(where: { id: $id }) {
//       id
//       date
//       exercise
//       garlandPose
//       kegels
//       prenatalVitamins
//       probiotics
//       proteinIntake
//       authorId
//       waterIntake
//     }
//   }
// `;

// export const useJournalEntry = (id: string) => {
//   return useQuery(['journalEntry'], async () => {
//       const { data } = await API.query<any>({
//           query: journalEntry,
//           variables: { id: Number(id) }
//       });

//       return data.journalEntry;
//   });
// };

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

interface JournalEntryCreateInput {
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

const createJournalEntry = async (createJournalEntryInput: JournalEntryCreateInput) => {
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

  const { createJournalEntry } = await request({
    url: endpoint,
    document: createJournalEntryMutation,
    variables: { data: variables}
  });
  return createJournalEntry;
}

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(createJournalEntry, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["journalEntriesCount"], refetchActive: false })
      await queryClient.invalidateQueries({ queryKey: ["journalEntries"], refetchActive: false })
    }, 
  })
}

interface JournalEntryUpdateInput {
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

const updateJournalEntry = async (updateJournalEntryInput: JournalEntryUpdateInput) => {
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

  const { updateJournalEntry } = await request({
    url: endpoint,
    document: updateJournalEntryMutation,
    variables: { data: variables, updateJournalEntryId: Number(id) }
  });
  return updateJournalEntry;
}

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(updateJournalEntry, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["journalEntriesCount"], refetchActive: true })
      await queryClient.invalidateQueries({ queryKey: ["journalEntries"], refetchActive: true })
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
  const { deleteJournalEntry } = await request({
    url: endpoint,
    document: deleteJournalEntryMutation,
    variables: { where: { id: Number(id) } }
  });

  return deleteJournalEntry;
}

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteJournalEntry, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["journalEntriesCount"], refetchActive: true })
      await queryClient.invalidateQueries({ queryKey: ["journalEntries"], refetchActive: true })
    }
  })
}