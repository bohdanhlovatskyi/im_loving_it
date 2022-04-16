#!/usr/bin/env node

function reverseString1(str) {
    return [...str].reverse().join("");
}

function reverseString2(str) {
    return str.split('').reverse().join('')
}

const reverseString3 = (str) => {
    return Array.from(str).reverse().join('')
}

const reverseString4 = (str) => {
    return str.split('').reverse().reduce(
        (prev, cur) => (prev + cur)
    )
}

function reverseString5(str, func) {
    return func(str)
}

const reverseString6 = (str) => {
    let reversed = '';
    str = [...str];
    while (str.length > 0) {
        reversed += str.pop();
    }

    return reversed
}

function reverseString7(str) {
    let reversed = '';
    for (let i = 0; i < str.length; ++i) {
        reversed += str.charAt(str.length - i - 1);
    }

    return reversed
}

const reverseString8 = (str) => { for (var i = str.length, rs = ''; i > 0; rs += str[--i]); return rs; }

function reverseString9(str) {
    let q = new Array();
    for (let char of [...str]) {
        q.unshift(char)
    }

    return q.join('')
}


function reverseString10(str) {
    str = str.split('')
    let sl = str.length
    for (let i = 0; i < str.length / 2; ++i)
        [str[i], str[sl - i - 1]] = [str[sl - i - 1], str[i]];

    return str.join('')
}

console.log(reverseString1("bla bla"))
console.log(reverseString2("bla bla"))
console.log(reverseString3("bla bla"))
console.log(reverseString4("bla bla"))
console.log(reverseString5("bla bla", reverseString4))
console.log(reverseString6("bla bla"))
console.log(reverseString7("bla bla"))
console.log(reverseString8("bla bla"))
console.log(reverseString9("bla bla"))
console.log(reverseString10('bla bla'))