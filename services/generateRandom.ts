export const generateRandomValue = (minimum?: number, maximum?: number) => {
    const min = minimum === undefined ? 0 : minimum
    const max = maximum === undefined ? 100: maximum
    return Math.round(Math.random() * (max! - min!) + min!)
}
