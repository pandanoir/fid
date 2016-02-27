'use strict';
class FID {
    constructor(arr) {
        this.rankData = createRankData(arr);
        this.smallRankData = createSmallRankData(arr);
        this.bitTable = createBitTable(arr);
        this.rawArray = arr;
        this.bigBlockSize = Math.ceil(Math.log(arr.length) * Math.log(arr.length));
        this.smallBlockSize = Math.ceil(Math.log(arr.length) / 2);
    }
    rank(n) {
        if (n === 0) return 0;
            var bigBlockIndex = Math.floor((n - 1) / this.bigBlockSize);
            var smallBlockIndex = bigBlockIndex * Math.ceil(this.bigBlockSize / this.smallBlockSize) + Math.floor((n - 1) % this.bigBlockSize / this.smallBlockSize);
            var i3 = zerofill(
                this.rawArray.slice(bigBlockIndex * this.bigBlockSize + (smallBlockIndex - bigBlockIndex * Math.ceil(this.bigBlockSize / this.smallBlockSize)) * this.smallBlockSize, n).join(''),
                this.smallBlockSize);
        return this.rankData[bigBlockIndex] +
            this.smallRankData[smallBlockIndex] +
            this.bitTable[i3];
    }
    rank0(n) {
        return n - this.rank(n);
    }
    rank1(n) {
        return this.rank(n);
    }
    select(n) {
        var len = this.rawArray.length;
        var start = 1, end = len;
        while (start < end) {
            var mid = 0 | (start + end) / 2;
            if (this.rank(mid) < n) start = mid + 1;
            else if (this.rank(mid) >= n) end = mid;
        }
        if (this.rank(start) === n) return start - 1;
        return -1;
    }
    select0(n) {
        var len = this.rawArray.length;
        var start = 1, end = len;
        while (start < end) {
            var mid = 0 | (start + end) / 2;
            if (this.rank0(mid) < n) start = mid + 1;
            else if (this.rank0(mid) >= n) end = mid;
        }
        if (this.rank0(start) === n) return start - 1;
        return -1;
    }
    select1(n) {
        return select(n);
    }
}
function createRankData(arr) {
    var len = Math.ceil(Math.log(arr.length) * Math.log(arr.length));
    var res = [0];
    for (var i = 0, _i = arr.length; i - len < _i; i += len) {
        res.push(res[res.length - 1] + arr.slice(i, i + len).filter(isOne).length);
    }
    return res;
}
function createSmallRankData(arr) {
    var len = Math.ceil(Math.log(arr.length) / 2);
    var blockLen = Math.ceil(Math.log(arr.length) * Math.log(arr.length));
    var res = [];
    for (var i = 0, _i = arr.length; i - len < _i; i += blockLen) {
        for (var j = 0; j < blockLen; j += len) {
            res.push(
                arr.slice(i, i + Math.min(j, blockLen)).filter(isOne).length
            );
        }
    }
    return res;
}
function createBitTable(arr) {
    var len = Math.ceil(Math.log(arr.length) / 2);
    var res = {};
    for (var i = 0, _i = Math.pow(2, len); i < _i; i = 0 | i + 1) {
        res[zerofill(i.toString(2), len)] = count(i.toString(2), '1');
    }
    return res;
}
function count(string, key) {
    var counter = 0;
    for (var i = 0, _i = string.length; i < _i; i = 0 | i + 1) {
        if (string.charAt(i) === key) {
            counter = 0 | counter + 1;
        }
    }
    return counter;
}
function zerofill(str, len) {
    var zeros = '000';
    while (zeros.length <= len) {
        zeros = zeros + zeros;
    }
    return (zeros + str).slice(-len);
}
function isOne(n) {
    return n === 1 || n === '1';
}
module.exports = FID;
