export default function countCategory(arr) {
    const stringCount = {};

    arr.forEach(item => {
        if (stringCount[item]) {
            stringCount[item]++;
        } else {
            stringCount[item] = 1;
        }
    });

    return stringCount;
}