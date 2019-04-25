const safe = require('./index.js')

let o = {
    name: "User1",
    address: {
        street: "513"
    },
    getAddress: function() {
      return this.address;
    },
    getNull: function() {
      return null;
    },
    isNull: null,
    items: [
        'A',
        'B'
    ]
};

let s = safe(o)
// '._' signifies the end of the expression and to resolve the value
console.log(s.getAddress().street._ === '513')
console.log(s.name._ === 'User1')

// Example using a default value
console.log(s.name.noName.noName2.__('name') === 'name')

// Example resolving to an object
console.log(s.address._ === o.address)

// Example undefined resolutions
console.log(s.address.city.country.street._ === undefined)
console.log(s.isNull.next.next._ === undefined)

// Example calling a function
console.log(s.getNull().street._ === undefined)

// Example calling non existent function
console.log(s.style().testing.__('nothing') === 'nothing')

console.log(s.items[0]._ === 'A')
console.log(s.items[2].testing._ === undefined)