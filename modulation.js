// MIT License
//
// Copyright (c) 2021 Nobuo Kato (katonobu4649@gmail.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// 単位円を順方向に回る
function updateIqCircle(count, lo_cycle) {
    const radian = (count / lo_cycle / 64) * Math.PI * 2;
    return {I:1/Math.sqrt(2) * Math.cos(radian), Q:1/Math.sqrt(2) * Math.sin(radian)};
}

const modulation_select = {
    '単位円を順方向に回る':0,
    'CW 5波の重ね合わせのつもり':1,
    'CW 3波の重ね合わせのつもり':2,
    'CW 2波の重ね合わせのつもり':3,
    'CW 1波初期位相0度':4,
    'CW 1波初期位相45度':5,
    'CW 1波初期位相90度':6
}

const getUpdateIq = function(index){
    // 単位円を順方向に回る
    function updateIqCircle(count, lo_cycle) {
        const radian = (count / lo_cycle / 64) * Math.PI * 2;
        return {I:1/Math.sqrt(2) * Math.cos(radian), Q:1/Math.sqrt(2) * Math.sin(radian)};
    }

    // CW 5波の重ね合わせのつもり
    function updateIq5(count, lo_cycle) {
        const radian1 = (count / lo_cycle / 16) * Math.PI * 2;
        const radian2 = (count / lo_cycle / 8) * Math.PI * 2 + Math.PI;
        return {I:1/Math.sqrt(5) + 2/Math.sqrt(5)* Math.cos(radian1) + 2/Math.sqrt(5) * Math.cos(radian2), Q:0};
    }

    // CW 3波の重ね合わせのつもり
    function updateIq3(count, lo_cycle) {
        const radian1 = (count / lo_cycle / 16) * Math.PI * 2;
        return {I:1/Math.sqrt(3) + 2/Math.sqrt(3) * Math.cos(radian1), Q:0};
    }

    // CW 2波の重ね合わせのつもり
    function updateIq2(count, lo_cycle) {
        const radian1 = (count / lo_cycle / 16) * Math.PI * 2;
        return {I:1/Math.sqrt(2) * Math.cos(radian1), Q:0};
    }

    // CW 1波初期位相0度
    function updateIq1_ph0deg(count, lo_cycle) {
        return {I:1, Q:0};
    }

    // CW 1波初期位相45度
    function updateIq1_ph45deg(count, lo_cycle) {
        return {I:1/Math.sqrt(2), Q:1/Math.sqrt(2)};
    }

    // CW 1波初期位相90度
    function updateIq1_ph90deg(count, lo_cycle) {
        return {I:0, Q:1};
    }

    const updateIqs = [
        updateIqCircle,
        updateIq5,
        updateIq3,
        updateIq2,
        updateIq1_ph0deg,
        updateIq1_ph45deg,
        updateIq1_ph90deg,
    ]

    // 呼び出し対象関数は個々の戻り値で返す関数を変えることで実現できる。
    return updateIqs[index];
}
