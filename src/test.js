var obj ={
    'name':'zhangsan',
    'age':'18',
    'langage':[1,[2,3],[4,5]]
}
var obj2=Object.assign({}, obj)
obj2.name='nihao';
obj2.langage[1]=5

console.log(obj)
console.log(obj2)
