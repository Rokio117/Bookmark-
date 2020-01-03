const store = [
  {
    username: "Demo",
    password: "password",
    books: [
      {
        title: "The Name of the Wind",
        authors: ["Patrick Rothfuss"],
        coverArt:
          "http://books.google.com/books/content?id=c-qcoAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        onTab: "finished",
        currentPage: "171",
        startedOn: "2018-07-22",
        finishedOn: "2018-10-11",
        description:
          "'I have stolen princesses back from sleeping barrow kings. I burned down the town...",
        notes: [
          {
            noteTitle: "Amazing",
            noteDate: "2018-10-11",
            noteContent:
              "A truly amazing fantasy novel. I can't wait to read the next one!"
          }
        ]
      },
      {
        title: "The Lorax",
        authors: ["Dr. Seuss"],
        coverArt:
          "http://books.google.com/books/content?id=cJnXmrk7BxAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        onTab: "finished",
        currentPage: null,
        startedOn: null,
        finishedOn: null,
        description:
          "The Once-ler describes the results of the local pollution problem.",
        notes: [
          {
            noteTitle: "Unless",
            noteDate: "unknown",
            noteContent:
              "Unless someone like you cares a whole awful lot, Nothing is going to get better. It's not."
          }
        ]
      },
      {
        title: "Murder, She Wrote: Manuscript for Murder",
        authors: ["Jon Land", "Jessica Fletcher"],
        coverArt:
          "http://books.google.com/books/content?id=Vn9LDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        onTab: "current",
        currentPage: "1",
        startedOn: "2020-01-01",
        finishedOn: null,
        description: "No description available",
        notes: [
          {
            noteTitle: "Multiple Authors",
            noteDate: "2020-01-02",
            noteContent: "This book has multiple authors. Cool!!"
          }
        ]
      },
      {
        title: "Holes",
        authors: ["Louis Sachar"],
        coverArt:
          "http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        onTab: "upcoming",
        currentPage: null,
        startedOn: null,
        finishedOn: null,
        description:
          "Winner of the Newbery Medal and the National Book Award! This #1 New York Times",
        notes: []
      }
    ]
  }
];

export default store;
