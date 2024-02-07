export const getPosts = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const cache = await caches.open('cache')

    const cachedResponse = await cache.match(url)

    if (cachedResponse) {
      const expiresHeader = cachedResponse.headers.get('expires')
      const dateHeader = cachedResponse.headers.get('date')
      const maxAge = 60000 // 1 min.

      const expiresValue =
        expiresHeader && expiresHeader !== '-1'
          ? Date.parse(expiresHeader)
          : Date.parse(dateHeader ?? '') + maxAge

      if (Date.now() < expiresValue) {
        console.log('Using cached response')

        return await cachedResponse.json()
      }

      console.log('Removing cached response')
      cache.delete(url)
    }

    console.log('Fetch uncached response')
    const res = await fetch(url)
    const cloned = res.clone()
    const headers = new Headers([...cloned.headers.entries()])

    headers.set('date', new Date().toISOString())

    const { body, ...rest } = res

    await cache.put(url, new Response(body, { ...rest, headers }))

    return await cloned.json()
  } catch (error) {
    console.log(error)
  }
}
