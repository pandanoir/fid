# FID
This library provides FID(Fully Indexable Dictionary) in JavaScript.

## Example
```javascript
var myfid = new FID([0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1]);
var n = 5;
myfid.rank(n); // 3
myfid.select(3); // 5
```

## rank()
rank(n) returns the number of 1 up to position n.

## select()
select(n) returns the position of *n*th 1. (Note: the position which select returns isn't equal to index of Array. the position add 1 is equal to index of Array.)
