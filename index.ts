type LibraryResult = {
    title: string,
    user_id: number,
    authors: string[],
    description: string,
    imageLink: string,
    subject: string,
    infoLink: string,
    favorited: boolean,
    isbn13: string,
    date: Date,
    rating: number,
    datesRead: string[]
};

type FavoriteResult = {
    title: string,
    user_id: number,
    authors: string[],
    description: string,
    subject: string,
    imageLink: string,
    infoLink: string,
    isbn13: string,
    date: Date
    rating: number,
};

type ReadResult = {
    title: string,
    user_id: number,
    authors: string[],
    description: string,
    imageLink: string,
    subject: string,
    infoLink: string,
    inProgress: boolean,
    isbn13: string,
    date: Date
};

type PlateResult = {
    weight: number,
    count: number
}

if(Number.isNaN(parseInt(process.argv[2])) || process.argv[2] == null) {
    console.log('please enter a valid barbell weight')
    process.exit();
} 

let barGoal = parseInt(process.argv[2]);
let barWeight = process.argv[3] ? parseInt(process.argv[3]) : 45;

barGoal -= barWeight;

const WEIGHT_VALUES = [
    45,
    35,
    25,
    15,
    10,
    5,
    2.5
];

let results: PlateResult[] = [];

for(let i = 0; i < WEIGHT_VALUES.length; i++)
{
    let count = Math.floor(barGoal / (WEIGHT_VALUES[i] * 2))
    count *=2

    results.push({
        weight: WEIGHT_VALUES[i],
        count
    });

    barGoal -= WEIGHT_VALUES[i] * count;
} 

results.map(weight => {
    console.log(`You will need ${weight.count} of ${weight.weight}.`)
});
