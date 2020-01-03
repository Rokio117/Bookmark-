const defaultProps = {
  listProps() {
    return [
      {
        title: "",
        authors: [null],
        coverArt:
          "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-gray-solid-color-background.jpg",
        onTab: "current",
        currentPage: null,
        startedOn: null,
        finishedOn: null,
        notes: [
          {
            noteTitle: "",
            noteDate: null,
            noteContent: ""
          }
        ]
      }
    ];
  },
  bookInfoProps() {
    return {
      title: "",
      authors: [null],
      coverArt:
        "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-gray-solid-color-background.jpg",
      onTab: "current",
      currentPage: null,
      startedOn: null,
      finishedOn: null,
      notes: [
        {
          noteTitle: "",
          noteDate: null,
          noteContent: ""
        }
      ]
    };
  },
  accordionProps() {
    return {
      title: "",
      authors: [null],
      coverArt:
        "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-gray-solid-color-background.jpg",
      onTab: "current",
      currentPage: null,
      startedOn: null,
      finishedOn: null,
      notes: [
        {
          noteTitle: "",
          noteDate: null,
          noteContent: ""
        }
      ]
    };
  }
};

export default defaultProps;
