let codeblock = {
blab :
    `
   var test = 'blab';
    function ref(a,b) {
        return b + a;
    }
    var x = ref(3,4)`,
blub :
    `
   var test = 'blub';
    function ref(a,b) {
        return b - a;
    }
    var x = ref(3,4)`,
test : `
   var test = 'test';`,
}

export default codeblock;
