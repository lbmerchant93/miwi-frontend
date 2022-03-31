import API from '../apolloClient';
import { gql } from '@apollo/client';
import { useQuery } from 'react-query';

const journalEntries = gql`
  query JournalEntries($authorId: String) {
    journalEntries(where: { authorId: { equals: $authorId } }) {
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

export const useJournalEntries = (authorId: string | undefined) => {
    return useQuery(['journalEntries'], async () => {
        const { data } = await API.query<any>({
            query: journalEntries,
            variables: { authorId }
        });

        return data.journalEntries;
    });
};

const authorJournalEntry = gql`
  query JournalEntries($id: Int, $authorId: String) {
    journalEntries(where: { AND: [{ id: { equals: $id } }, { authorId: { equals: $authorId } }]}) {
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

export const useAuthorJournalEntry = (id: string | undefined, authorId: string | undefined) => {
    return useQuery(['authorJournalEntry'], async () => {
        const variables = {
            id: Number(id), 
            authorId
        };
        const { data } = await API.query<any>({
            query: authorJournalEntry,
            variables
        });

        return data.journalEntries;
    });
}