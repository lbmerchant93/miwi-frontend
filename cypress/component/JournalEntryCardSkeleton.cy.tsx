import React from 'react'
import JournalEntryCardSkeleton from '../../src/components/JournalEntryCardSkeleton/JournalEntryCardSkeleton'

describe('header component', () => {
  it('Mounts with MiWi title.', () => {
    cy.mount(<JournalEntryCardSkeleton />)
  })
})