
console.log(`result : ${calculator([1, 2, 3, 4, 5])}`);

function calculator(arr) {

    let result = 0;
    // 1. sum
    result = arr.reduce((sum, p) => sum + p, 0);
    console.log(`1. sum : ${result}`);

    // 2. divide
    result /= 2;
    console.log(`2. divide : ${result}`);

    return result;
}

