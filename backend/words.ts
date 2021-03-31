const words = './Words.json'

const  GetRandomWords = (count: number) => {
    let list = []
    for (let index = 0; index < count; index++) {
        list.push(words[Math.floor(Math.random() * words.length)])
    }
    return list;
}
export default GetRandomWords