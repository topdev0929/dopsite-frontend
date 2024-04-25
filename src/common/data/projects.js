const projects = [
  {
    id: 0,
    img: "img1",
    name: "New admin Design",
    description: "It will be as simple as Occidental",
    status: "Completed",
    color: "success",
    dueDate: "2019-10-15",
    commentsCount: 214,
    team: [
      {
        id: 1, img: "avatar4", fullname: "Janice Cole", skills: [
          { id: 1, name: "Frontend" },
          { id: 2, name: "UI" },
        ],
      },
      {
        id: 2, img: "avatar5", fullname: "Steve Foster",
        skills: [{ id: 1, name: "UI/UX" }],
      },
      {
        id: 3, img: "Null", name: "A", color: "success", fullname: "Aeffrey Walker",
        skills: [{ id: 1, name: "Backend" }],
      },
      {
        id: 4, img: "avatar2", fullname: "Daniel Candles",
        skills: [
          { id: 1, name: "Frontend" },
          { id: 2, name: "UI" },
        ],
      },
      {
        id: 5, img: "avatar6", fullname: "Steve Foster",
        skills: [
          { id: 1, name: "UI/UX" },
        ],
      },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 1,
    img: "img2",
    name: "Brand logo design",
    description: "To achieve it would be necessary",
    status: "Pending",
    color: "warning",
    dueDate: "2019-10-22",
    commentsCount: 183,
    team: [
      { id: 1, img: "avatar8" },
      { id: 2, img: "avatar2", fullname: "Daniel Candles" },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 2,
    img: "img3",
    name: "New Landing Design",
    description: "For science, music, sport, etc",
    status: "Delay",
    color: "danger",
    dueDate: "2019-10-13",
    commentsCount: 175,
    team: [
      { id: 1, img: "Null", name: "K", color: "info", fullname: "Kony Brafford" },
      { id: 2, img: "avatar2", fullname: "Daniel Candles" }
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 3,
    img: "img4",
    name: "Redesign - Landing page",
    description: "If several languages coalesce",
    status: "Completed",
    color: "success",
    dueDate: "2019-10-14",
    commentsCount: 202,
    team: [
      { id: 1, img: "avatar4", fullname: "Janice Cole" },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 4,
    img: "img5",
    name: "Skote Dashboard UI",
    description: "Separate existence is a myth",
    status: "Completed",
    color: "success",
    dueDate: "2019-10-13",
    commentsCount: 194,
    team: [
      { id: 1, img: "avatar1", fullname: "Jennifer Walker" },
      { id: 2, img: "avatar3", fullname: "Daniel Candel" },
      { id: 3, img: "Null", name: "3+", color: "danger" },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 5,
    img: "img6",
    name: "Blog Template UI",
    description: "For science, music, sport, etc",
    status: "Pending",
    color: "warning",
    dueDate: "2019-10-24",
    commentsCount: 222,
    team: [
      { id: 1, img: "avatar4", fullname: "Janice Cole" },
      { id: 2, img: "avatar5", fullname: "Steve Foster" },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 6,
    img: "img3",
    name: "Multipurpose Landing",
    description: "It will be as simple as Occidental",
    status: "Delay",
    color: "danger",
    dueDate: "2019-10-15",
    commentsCount: 214,
    team: [
      { id: 1, img: "avatar5", fullname: "Steve Foster" },
      { id: 3, img: "Null", name: "R", color: "warning", fullname: "Rony Candles" },
    ],
  },
  {
    id: 7,
    img: "img4",
    name: "App Landing UI",
    description: "It will be as simple as Occidental",
    status: "Completed",
    color: "success",
    dueDate: "11 Oct, 19",
    commentsCount: 185,
    team: [
      { id: 1, img: "Null", name: "L", color: "pink", fullname: "Lony Mackay" },
      { id: 3, img: "avatar2", fullname: "Daniel Candles" },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
  {
    id: 8,
    img: "img2",
    name: "New admin Design",
    description: "Their most common words.",
    status: "Completed",
    color: "success",
    dueDate: "2019-10-12",
    commentsCount: 106,
    team: [
      { id: 1, img: "avatar4", fullname: "Janice Cole" },
      { id: 2, img: "avatar5", fullname: "Steve Foster" },
      { id: 3, img: "Null", name: "A", color: "success", fullname: "Aeffrey Walker" },
      { id: 3, img: "avatar2", fullname: "Daniel Candles" },
    ],
    startDate: "08 Sept, 2019",
    projectDetails: {
      description:
        "To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc,",
      points: [
        "To achieve this, it would be necessary",
        "Separate existence is a myth.",
        "If several languages coalesce",
      ],
    },
    files: [
      { name: "Skote Landing.Zip", size: "3.25 MB", link: "#" },
      { name: "Skote Admin.Zip", size: "3.15 MB", link: "#" },
      { name: "Skote Logo.Zip", size: "2.02 MB", link: "#" },
      { name: "Veltrix admin.Zip", size: "2.25 MB", link: "#" },
    ],
    comments: [
      {
        id: 1,
        username: "David Lambert",
        userImg: "avatar2",
        comment: "Separate existence is a myth.",
      },
      {
        id: 2,
        username: "Steve Foster",
        userImg: "avatar3",
        comment: "@Henry To an English person it will like simplified",
        reply: {
          username: "Jeffrey Walker",
          comment: "as a skeptical Cambridge friend",
        },
      },
      {
        id: 3,
        username: "Steven Carlson",
        comment: " Separate existence is a myth.",
      },
    ],
  },
]

const options = {
  chart: {
    height: 290,
    type: "bar",
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "14%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: !1,
  },
  series: [
    {
      name: "Overview",
      data: [42, 56, 40, 64, 26, 42, 56, 35, 62],
    },
  ],
  grid: {
    yaxis: {
      lines: {
        show: !1,
      },
    },
  },
  yaxis: {
    title: {
      text: "% (Percentage)",
    },
  },
  xaxis: {
    labels: {
      rotate: -90,
    },
    categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    title: {
      text: "Week",
    },
  },
  colors: ["#556ee6"],
}

const series = [
  {
    name: "Overview",
    data: [42, 56, 40, 64, 26, 42, 56, 35, 62],
  },
]

export { projects, options, series }
