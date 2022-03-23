import API from '../apolloClient';
import { gql } from '@apollo/client';
import { useQuery } from 'react-query';

const journalEntries = gql`
  query JournalEntries {
    journalEntries {
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

export const useJournalEntries = () => {
    return useQuery(['journalEntries'], async () => {
        const { data } = await API.query<any>({
            query: journalEntries
        });

        return data.journalEntries;
    });
};