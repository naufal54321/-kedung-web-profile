import { describe, it, expect, vi, beforeEach } from 'vitest'

const { pushMock, setMock, removeMock } = vi.hoisted(() => ({
  pushMock: vi.fn(async () => ({ key: 'new-key' })),
  setMock: vi.fn(async () => {}),
  removeMock: vi.fn(async () => {})
}))

vi.mock('firebase/database', () => ({
  ref: vi.fn((db, path) => ({ db, path })),
  push: pushMock,
  set: setMock,
  remove: removeMock
}))

vi.mock('./firebase', () => ({
  db: {},
  databaseURL: 'https://test-db.firebaseio.com'
}))

import api from './api'

const mockFetch = () => vi.fn(() => Promise.resolve({
  ok: true,
  status: 200,
  statusText: 'OK',
  json: async () => ({})
}))

describe('api', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch())
    pushMock.mockClear()
    setMock.mockClear()
    removeMock.mockClear()
  })

  it('fetchData tidak mengirim header Authorization dan URL tanpa ?auth=', async () => {
    await api.getAllArticles()
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://test-db.firebaseio.com/article.json')
    expect(url).not.toContain('auth=')
    expect(init).toBeUndefined()
  })

  it('postData menulis via Firebase SDK push ke path yang benar', async () => {
    const result = await api.createArticle({ title: 'Berita' })
    expect(pushMock).toHaveBeenCalledTimes(1)
    const [refObj, data] = pushMock.mock.calls[0]
    expect(refObj.path).toBe('article')
    expect(data).toEqual({ title: 'Berita' })
    expect(result.id).toBe('new-key')
  })

  it('putData menulis via Firebase SDK set ke path yang benar', async () => {
    await api.updateUmkmStatus('abc', 'approved')
    expect(setMock).toHaveBeenCalledTimes(1)
    const [refObj, data] = setMock.mock.calls[0]
    expect(refObj.path).toBe('umkm/abc/status')
    expect(data).toBe('approved')
  })

  it('deleteData menghapus via Firebase SDK remove ke path yang benar', async () => {
    await api.deleteArticle('abc')
    expect(removeMock).toHaveBeenCalledTimes(1)
    const [refObj] = removeMock.mock.calls[0]
    expect(refObj.path).toBe('article/abc')
  })

  it('publicCreateUmkm tidak mengirim header Authorization', async () => {
    await api.publicCreateUmkm({ name: 'Toko Baru' })
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe('https://test-db.firebaseio.com/umkm.json')
    expect(init.headers.Authorization).toBeUndefined()
  })
})
