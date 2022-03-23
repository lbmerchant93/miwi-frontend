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