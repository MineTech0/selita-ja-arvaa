import data from "../data.json";
const words = data.words

export const GetRandomWords = (count: number) => {
    let list = [];
    for (let index = 0; index < count; index++) {
      list.push(words[Math.random() * words.length |0]);
    }
    return list;
  };