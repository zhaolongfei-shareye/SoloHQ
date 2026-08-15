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
})
