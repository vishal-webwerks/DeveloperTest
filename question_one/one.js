var arr = [
    [195, 10, 10],
    [55, 10, 10],
    [205, 10, 10],
    [25, 10, 10]
];

var newArr = [];

for (var i = 0; i < arr.length; i++) {

    for (var j = 0; j < arr.length; j++) {

        var status = false;
        if ((arr[i][0] > 180 && arr[j][0] < 180) || (arr[i][0] < 180 && arr[j][0] > 180)) {
            var no = arr[i][0] > 180 ? arr[i][0] - 180 : arr[j][0] - 180;
            if (arr[i][0] > 180) {
                status = no == arr[j][0] ? true : false;
            } else {
                status = no == arr[i][0] ? true : false;
            }
        }
        if (status == "true") {
            newArr.push(arr[i]);
            newArr.push(arr[j]);
            arr[i] = arr[j] = [null, null, null];
        }
    }


}

console.log(newArr);