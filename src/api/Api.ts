
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

//const authHeaders = {
//Authorization: `Basic ${Base64.encode(`${username}:${password}`)}`
//}

export const withRetry = (retryCount: number, delay: number, fn: (...args: any[]) => Promise<any>) => async (...args: any[]) => {
    let tryCount = 0
    let result = null
    let error = null

    while (result === null && tryCount <= retryCount) {
        try {
            result = await fn(...args)
        } catch (e) {
            if (tryCount >= retryCount) {
                error = e
            }
            tryCount++
            await wait(delay)
        }
    }

    return result ? Promise.resolve(result) : Promise.reject(error)
}

export const fetchPokemon = (pokemonName: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        .then(response => response.ok ? response.json() : Promise.reject(response))

// export const fetchEventStatus = (eventId: string) =>
//   fetch(`${API_HOST}/events/${eventId}/status/${username}`, { headers: authHeaders })
//     .then(response => response.ok ? response.json() : Promise.reject(response))

// export const changeEventStatus = withRetry(10, 1000, (eventId: string, coming: boolean) =>
//   fetch(`${API_HOST}/events/${eventId}/status/${username}`, {
//     method: 'PUT',
//     headers: authHeaders,
//     body: JSON.stringify({ coming })
//   })
//     .then(response => response.ok ? response.json() : Promise.reject(response)))
