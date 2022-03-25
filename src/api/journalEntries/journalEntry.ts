import API from '../apolloClient';
import { gql } from '@apollo/client';
import { useQuery } from 'react-query';

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

const createJournalEntryQuery = `
  mutation createJournalEntry($data: JournalEntryCreateInput!){
    createJournalEntry(
      data: $data
    ) {
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

export const createJournalEntry = async (createJournalEntryInput: JournalEntryCreate) => {
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
    "author": {
      "connect": {
        "id": authorId
      }
    }
  };

  const { data } = await API.mutate<any>({
    mutation: gql(createJournalEntryQuery),
    variables: { data: variables}
  });
  
  return data.createJournalEntry;
};

interface JournalEntryUpdate {
  id: string | undefined;
  date: string | null;
  waterIntake: number | string;
  proteinIntake: number | string;
  exercise: number | string;
  kegels: number | string;
  garlandPose: number | string;
  prenatalVitamins: boolean | null;
  probiotics: boolean | null;
}

const updateJournalEntryQuery = `
  mutation updateJournalEntry(
    $data: JournalEntryUpdateInput!
    $where: JournalEntryWhereUniqueInput!
  ) { updateJournalEntry(
    data: $data
    where: $where
  ) {
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

export const updateJournalEntry = async (updateJournalEntryInput: JournalEntryUpdate) => {
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
  } = updateJournalEntryInput;

  const variables = {
    "date": { "set": date },
    "exercise": { "set": exercise },
    "garlandPose": { "set": garlandPose },
    "kegels": { "set": kegels },
    "prenatalVitamins": { "set": prenatalVitamins },
    "probiotics": { "set": probiotics },
    "proteinIntake": { "set": proteinIntake },
    "waterIntake": { "set": waterIntake }
  };

  const { data } = await API.mutate<any>({
    mutation: gql(updateJournalEntryQuery),
    variables: { data: variables, where: { id: Number(id) }}
  });
  
  return data.updateJournalEntry;
}