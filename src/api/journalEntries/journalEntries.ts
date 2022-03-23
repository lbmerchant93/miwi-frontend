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