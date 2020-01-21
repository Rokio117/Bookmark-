const dataDictionary = [
  {
    name: "hasError",
    type: Boolean,
    foundIn: "state of app",
    contains: null,
    description: "default false. switched to true when error is thrown"
  },
  {
    name: "user",
    type: Object,
    foundIn: "app state, context",
    contains: "username and password",
    description: "object containing information for the user"
  },
  {
    name: "username",
    type: String,
    foundIn: "user object, token functions",
    contains: null,
    description: "the unique name for a user."
  },
  {
    name: "password",
    type: String,
    foundIn: "user object, token functions",
    contains: null,
    description: "password for a user. encoded after being sent to server"
  },
  {
    name: "books",
    type: Array,
    foundIn: "app state",
    contains: "book objects",
    description: "array of book objects"
  },
  {
    name: "book",
    type: Object,
    foundIn: "books",
    contains:
      "title, author, coverart, currentPage, startedOn, finishedOn, notes",
    description: ""
  },
  {
    name: "title",
    type: String,
    foundIn: "book object",
    contains: null,
    description: "the title of a book"
  },
  {
    name: "author",
    type: String,
    foundIn: "book object",
    contains: null,
    description: "the author of a book"
  },
  {
    name: "coverart",
    type: [String, "url"],
    foundIn: "book object",
    contains: null,
    description: "retrieved from the fetch to google's book api"
  },
  {
    name: "currentPage",
    type: Number,
    foundIn: "book object",
    contains: null,
    description: "the page the user is currently on in their book"
  },
  {
    name: "startedOn",
    type: [Date, String],
    foundIn: "book object",
    contains: null,
    description: "the date the user started reading"
  },
  {
    name: "finishedOn",
    type: [Date, String],
    foundIn: "book object",
    contains: null,
    description: "the date the user finished reading a book"
  },
  {
    name: "notes",
    type: Array,
    foundIn: "book object",
    contains: "",
    description: ""
  },
  {
    name: "note",
    type: Object,
    foundIn: "notes array",
    contains: "noteTitle, noteDate, noteContent",
    description: "object containing information for a note of a book"
  },
  {
    name: "noteTitle",
    type: String,
    foundIn: "note object",
    contains: null,
    description: "the title of a note"
  },
  {
    name: "noteDate",
    type: [Date, String],
    foundIn: "note object",
    contains: null,
    description: "the date the user made the note"
  },
  {
    name: "noteContent",
    type: "string",
    foundIn: "note object",
    contains: null,
    description: "the user-generated content of a note"
  },
  {
    name: "bookDescription",
    type: "string",
    foundIn: "book object inside books array",
    contains: null,
    description:
      "a brief description of a book. Generated from google books api"
  },
  {
    name: "isLoading",
    type: Boolean,
    foundIn: "app state",
    contains: null,
    description:
      "switched to true during async requests. used to display loading animation"
  },
  {
    name: "page",
    type: String,
    foundIn: "app state, context",
    contains: null,
    description:
      "the current page displayed, one of current, upcoming, finished, or add"
  },
  {
    name: "upcoming, Upcoming as displayed to user",
    type: "string",
    foundIn: "main component, add component, tab component",
    contains: null,
    description:
      "noun for the 'upcoming' display (main page when upcoming book data is displayed)"
  },
  {
    name: "current, Current as displayed to user",
    type: "string",
    foundIn: "main component, add component, tab component",
    contains: null,
    description:
      "noun used for 'current' display (main page when current book data is displayed)"
  },
  {
    name: "finished, Finished as displayed to user",
    type: "string",
    foundIn: "main component, add component, tab component",
    contains: "",
    description: ""
  },
  {
    name: "userProfile",
    type: "object",
    foundIn: "database, state",
    contains: "all data on user and their books",
    description: "all data on user and their books"
  },
  {
    name: "",
    type: "",
    foundIn: "",
    contains: "",
    description: ""
  }
];

//extra favicon information
// {
//   "src": "logo192.png",
//   "type": "image/png",
//   "sizes": "192x192"
// },
// {
//   "src": "logo512.png",
//   "type": "image/png",
//   "sizes": "512x512"
// }
