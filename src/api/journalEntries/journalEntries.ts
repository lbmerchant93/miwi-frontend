import API from '../apolloClient';
import { gql } from '@apollo/client';
import { useQuery } from 'react-query';

export const journalEntries = gql`
  query JournalEntries($authorId: String) {
    journalEntries(orderBy: [ { date: desc } ], where: { authorId: { equals: $authorId } }) {
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

export const useJournalEntries = (authorId: string | undefined , count: number | undefined) => {
    return useQuery(['journalEntries'], async () => {
        const { data } = await API.query<any>({
            query: journalEntries,
            variables: { authorId }
        });
        return data.journalEntries;
      }, {
        enabled: authorId !== undefined
      }
    );
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

const journalEntriesCount = gql`
  query JournalEntries($authorId: String) {
    aggregateJournalEntry(where: { authorId: { equals: $authorId } }) {
      _count {
        _all
      }
    }
  }
`;

export const useJournalEntriesCount = (authorId: string | undefined) => {
  return useQuery(['journalEntriesCount'], async () => {
    const { data } = await API.query<any>({
        query: journalEntriesCount,
        variables: { authorId }
    });
    return data.aggregateJournalEntry._count._all;
  });
}