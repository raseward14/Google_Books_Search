if (Number.isNaN(parseInt(process.argv[2])) || process.argv[2] == null) {
    console.log('please enter a valid barbell weight');
    process.exit();
}
var barGoal = parseInt(process.argv[2]);
var barWeight = process.argv[3] ? parseInt(process.argv[3]) : 45;
barGoal -= barWeight;
var WEIGHT_VALUES = [
    45,
    35,
    25,
    15,
    10,
    5,
    2.5
];
var results = [];
for (var i = 0; i < WEIGHT_VALUES.length; i++) {
    var count = Math.floor(barGoal / (WEIGHT_VALUES[i] * 2));
    count *= 2;
    results.push({
        weight: WEIGHT_VALUES[i],
        count: count
    });
    barGoal -= WEIGHT_VALUES[i] * count;
}
results.map(function (weight) {
    console.log("You will need ".concat(weight.count, " of ").concat(weight.weight, "."));
});
