//Object destructuring

/*
const person = {
    name: 'Andrew',
    age: 27,
    location: {
        city: 'Philadelphia',
        temp: 95
    }
};

const {name: firstName = 'Anonymous', age} = person;

console.log(`${firstName} is ${age}.`);

const {city, temp: temperature} = person.location;

if(city && temperature){
    console.log(`It's ${temperature} in ${city}.`);
}
*/

/*
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}
const {title, author} = book;
const {name = 'Self-Published'} = book.publisher;

console.log(`Title: ${title}\nAuthor: ${author}`);

if(name){
    console.log(`Publisher: ${name}`);
}
*/


//Array destructuring

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [, city, state = 'New York'] = address;
console.log(`You are in ${city}, ${state}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [item_name, , medium_cost] = item;
console.log(`A medium ${item_name} costs ${medium_cost}.`);