import { describe, it, expect } from 'vitest'
import { waShareUrl } from './share'

describe('waShareUrl', () => {
  it('mengembalikan URL wa.me dengan teks ter-encode', () => {
    expect(waShareUrl('Halo dunia!')).toBe('https://wa.me/?text=Halo%20dunia!')
    expect(waShareUrl('A & B')).toBe('https://wa.me/?text=A%20%26%20B')
  })
})
