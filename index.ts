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
}

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
}

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
}