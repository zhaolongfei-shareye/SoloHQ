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
})
