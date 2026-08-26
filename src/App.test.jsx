import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('SoloHQ', () => {
  afterEach(() => {
    cleanup()
    window.localStorage.clear()
  })

  it('renders the dashboard shell', () => {
    render(<App />)

    expect(screen.getByText('SOLO')).toBeInTheDocument()
    expect(screen.getAllByText('AI SaaS Generator').length).toBeGreaterThan(0)
    expect(screen.getByPlaceholderText(/Search with Google/i)).toBeInTheDocument()
  })

  it('opens settings and exposes backup controls', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Open settings' }))

    expect(screen.getByText('System Preferences')).toBeInTheDocument()
    expect(screen.getByText('Export JSON')).toBeInTheDocument()
    expect(screen.getByText('Import JSON')).toBeInTheDocument()
  })

  it('deletes a project from edit mode after confirmation', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /^Edit$/i }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }))

    expect(screen.getByText(/Delete "AI SaaS Generator"/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.queryAllByText('AI SaaS Generator').length).toBe(0)
  })

  it('does not count note-less project deletion as abandoned', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Create project' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }))

    expect(screen.getByText(/will not affect the abandoned count/i)).toBeInTheDocument()
  })

  it('manages bookmarks and prevents deleting a non-empty category', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Manage bookmarks' }))

    expect(screen.getByText(/Drag bookmarks to reorder/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete AI Agents' })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Add category' }))
    expect(screen.getByText(/Drop bookmarks here, or delete this empty category/i)).toBeInTheDocument()
  })

  it('opens quick-app settings above the dashboard content', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Configure quick apps' }))

    expect(screen.getByText('Quick Apps')).toBeInTheDocument()
    expect(screen.getByLabelText('Close quick apps settings')).toBeInTheDocument()
  })

  it('dates new notes, indexes them, and supports pinning', () => {
    render(<App />)

    expect(screen.getByText('Note index')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Pin note' }))
    expect(screen.getByText('Pinned note')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText(/today’s date is added automatically/i), { target: { value: 'Prepare the customer interview script.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }))

    expect(screen.getByDisplayValue('Prepare the customer interview script.')).toBeInTheDocument()
  })
})
