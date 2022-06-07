import { useQuery } from 'react-query';
import { request, gql } from "graphql-request";
import { endpoint } from '../../App';
import { getAuthToken } from '../../App.authProvider';

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
    const token = getAuthToken();
    const requestHeaders = {
      authorization: `Bearer ${token}`
    }
    const { journalEntries } = await request(
      {
        url: endpoint,
        document: JournalEntries,
        variables: { authorId, limit, skip },
        requestHeaders
      });
      return journalEntries;
    }, {
      enabled: !!authorId && count !== undefined && count !== null
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
  const token = getAuthToken();
  const requestHeaders = {
    authorization: `Bearer ${token}`
  }
  return useQuery(['journalEntriesCount'], async () => {
    const { aggregateJournalEntry } = await request({
      url: endpoint,
      document: journalEntriesCount,
      variables: { authorId },
      requestHeaders
    });
    return aggregateJournalEntry._count._all;
  }, {
    enabled: !!authorId
  }
  );
}