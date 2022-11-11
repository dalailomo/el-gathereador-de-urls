const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const batchSize = 3;

for (let i = 0; i < a.length; i += batchSize) {
    const chunk = a.slice(i, i + batchSize);
    console.log(chunk);
}
