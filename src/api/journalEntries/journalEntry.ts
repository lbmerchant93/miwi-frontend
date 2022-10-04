import { useMutation, useQueryClient, useQuery  } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';
import { getAuthToken } from '../../App.authProvider';

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

const firstEntry = gql`
  query FindFirstJournalEntry($authorId: String, $date: String) {
    findFirstJournalEntry(where: { AND: [{ authorId: { equals: $authorId } }, { date: { equals: $date } }] }) {
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
      mood
      childbirthEducation
      selfCare
      postpartumPrep
      fetalLoveBreak
    }
  }
`

export const useFindFirstEntry = (authorId: string | undefined, date: string, email: string | null) => {
  const token = getAuthToken();
  const requestHeaders = {
      authorization: `Bearer ${token}`
  }

  return useQuery(['firstEntry', email], async () => {
    const { findFirstJournalEntry } = await request({
      url: endpoint,
      document: firstEntry,
      variables: { authorId, date },
      requestHeaders
    });
    return findFirstJournalEntry;
  })
};

const firstEntryById = gql`
  query FindFirstJournalEntry($id: Int, $authorId: String) {
    findFirstJournalEntry(where: { AND: [{ id: { equals: $id } }, { authorId: { equals: $authorId } }] }) {
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
      mood
      childbirthEducation
      selfCare
      postpartumPrep
      fetalLoveBreak
    }
  }
`;

export const useFindFirstEntryById = (authorId: string | undefined, id: string | undefined, email: string | null) => {
  const token = getAuthToken();
  const requestHeaders = {
      authorization: `Bearer ${token}`
  }

  return useQuery(['firstEntryById', id], async () => {
    const { findFirstJournalEntry } = await request({
      url: endpoint,
      document: firstEntryById,
      variables: { authorId, id: (isNaN(Number(id)) ? undefined : Number(id)) },
      requestHeaders
    });
    return findFirstJournalEntry;
  }, {
    enabled: id !== null && id !== undefined && authorId !== undefined && authorId !== null && !isNaN(Number(id))
  })
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
      mood
      childbirthEducation
      selfCare
      postpartumPrep
      fetalLoveBreak
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
  mood: string;
  childbirthEducation: string;
  selfCare: string;
  postpartumPrep: string;
  fetalLoveBreak: string;
}

const createJournalEntry = async (createJournalEntryInput: JournalEntryCreateInput) => {
  const token = getAuthToken();
  const requestHeaders = {
    authorization: `Bearer ${token}`
  }

  const { 
    date, 
    exercise, 
    garlandPose, 
    kegels, 
    prenatalVitamins, 
    probiotics, 
    proteinIntake, 
    waterIntake, 
    authorId,
    mood,
    childbirthEducation,
    selfCare,
    postpartumPrep,
    fetalLoveBreak
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
    "authorId": authorId,
    "mood": mood,
    "childbirthEducation": childbirthEducation,
    "selfCare": selfCare,
    "postpartumPrep": postpartumPrep,
    "fetalLoveBreak": fetalLoveBreak
  };

  const { createJournalEntry } = await request({
    url: endpoint,
    document: createJournalEntryMutation,
    variables: { data: variables},
    requestHeaders
  });
  return createJournalEntry;
}

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(createJournalEntry, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["journalEntriesCount"], refetchInactive: true })
      await queryClient.invalidateQueries({ queryKey: ["journalEntries"] })
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
  mood: string;
  childbirthEducation: string;
  selfCare: string;
  postpartumPrep: string;
  fetalLoveBreak: string;
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
    mood
    childbirthEducation
    selfCare
    postpartumPrep
    fetalLoveBreak
    }
  }
`;

const updateJournalEntry = async (updateJournalEntryInput: JournalEntryUpdateInput) => {
  const token = getAuthToken();
  const requestHeaders = {
    authorization: `Bearer ${token}`
  }
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
    authorId,
    mood,
    childbirthEducation,
    selfCare,
    postpartumPrep,
    fetalLoveBreak
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
    "authorId": authorId,
    "mood": mood,
    "childbirthEducation": childbirthEducation,
    "selfCare": selfCare,
    "postpartumPrep": postpartumPrep,
    "fetalLoveBreak": fetalLoveBreak 
  };

  const { updateJournalEntry } = await request({
    url: endpoint,
    document: updateJournalEntryMutation,
    variables: { data: variables, updateJournalEntryId: Number(id) },
    requestHeaders
  });
  return updateJournalEntry;
}

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(updateJournalEntry, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["journalEntriesCount"], refetchActive: false })
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
  const token = getAuthToken();
  const requestHeaders = {
    authorization: `Bearer ${token}`
  }

  const { deleteJournalEntry } = await request({
    url: endpoint,
    document: deleteJournalEntryMutation,
    variables: { where: { id: Number(id) } },
    requestHeaders
  });

  return deleteJournalEntry;
}

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteJournalEntry, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["journalEntriesCount"], refetchActive: false })
      await queryClient.invalidateQueries({ queryKey: ["journalEntries"], refetchActive: false })
    }
  })
}