// import API from '../apolloClient';
// import { gql } from '@apollo/client';
import { useQuery } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';

export const JournalEntries = gql`
  query JournalEntries(
    $authorId: String,
    $limit: Int,
    $skip: Int
  ) {
    journalEntries(
      orderBy: [ { date: desc } ], 
      skip: $skip,
      take: $limit,
      where: { authorId: { equals: $authorId } }
    ) {
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

export const useJournalEntries = (
  authorId: string | undefined, 
  limit: number,
  skip: number,
  count: number | undefined
) => {
  return useQuery(['journalEntries', count, skip], async () => {
    const { journalEntries } = await request(
      {
        url: endpoint,
        document: JournalEntries,
        variables: { authorId, limit, skip }
      });
      return journalEntries;
    }, {
      enabled: !!authorId && !!count
    }
  );
};

// Needs to be modified for graphql-request
// const authorJournalEntry = gql`
//   query JournalEntries($id: Int, $authorId: String) {
//     journalEntries(where: { AND: [{ id: { equals: $id } }, { authorId: { equals: $authorId } }]}) {
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

// export const useAuthorJournalEntry = (id: string | undefined, authorId: string | undefined) => {
//     return useQuery(['authorJournalEntry'], async () => {
//         const variables = {
//             id: Number(id), 
//             authorId
//         };
//         const { data } = await request({
//           url: endpoint,
//           document: authorJournalEntry,
//           variables
//         });

//         return data.journalEntries;
//     });
// }

const journalEntriesCount = gql`
  query AggregateJournalEntry($authorId: String) {
    aggregateJournalEntry(where: { authorId: { equals: $authorId } }) {
      _count {
        _all
      }
    }
  }
`;

export const useJournalEntriesCount = (authorId: string | undefined) => {
  return useQuery(['journalEntriesCount'], async () => {
    const { aggregateJournalEntry } = await request({
      url: endpoint,
      document: journalEntriesCount,
      variables: { authorId }
    });
    return aggregateJournalEntry._count._all;
  }, {
    enabled: !!authorId
  }
  );
}