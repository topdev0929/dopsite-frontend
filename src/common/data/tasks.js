const tasks = [
  {
    id: 1,
    title: "Example",
    tasks: [
      {
        id: 11,
        description: "Create a Skote Dashboard UI",
        members: [
          {
            username: "",
            userImg: "avatar2",
          },
          {
            username: "",
            userImg: "avatar1",
          },
        ],
        status: "Waiting",
        budget: "$145",
      },
      {
        id: 12,
        description: "Create a New Landing UI",
        members: [
          {
            username: "",
            userImg: "avatar4",
          },
          {
            username: "",
            userImg: "avatar5",
          },
          { username: "" },
          { username: "" },
          { username: "" },
        ],
        status: "Approved",
        budget: "$225",
      },
      {
        id: 13,
        description: "Create a Skote Logo",
        members: [
          {
            username: "Fransis",
          },
        ],
        status: "Waiting",
        budget: "$105",
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    tasks: [
      {
        id: 21,
        description: "Brand logo design",
        members: [
          {
            username: "",
            userImg: "avatar7",
          },
        ],
        status: "Complete",
        budget: "$198",
      },
      {
        id: 22,
        description: "Create a Blog Template UI",
        members: [
          {
            username: "Stephen",
          },
          {
            username: "",
            userImg: "avatar8",
          },
          {
            username: "",
            userImg: "avatar1",
          },
        ],
        status: "Pending",
        budget: "$125",
      },
    ],
  },
  {
    id: 3,
    title: "Completed",
    tasks: [
      {
        id: 31,
        description: "Redesign - Landing page",
        members: [
          {
            username: "",
            userImg: "avatar6",
          },
          {
            username: "Fransis",
          },
        ],
        status: "Complete",
        budget: "$175",
      },
      {
        id: 32,
        description: "Multipurpose Landing",
        members: [
          {
            username: "",
            userImg: "avatar7",
          },
        ],
        status: "Complete",
        budget: "$135",
      },
      {
        id: 33,
        description: "Create a Blog Template UI",
        members: [
          {
            username: "",
            userImg: "avatar4",
          },
          {
            username: "Stephen",
          },
          {
            username: "",
            userImg: "avatar2",
          },
        ],
        status: "Complete",
        budget: "$95",
      },
    ],
  },
  {
    id: 4,
    title: "Recent Tasks",
    tasks: [
      {
        id: 41,
        description: " Brand logo design",
        members: [
          {
            username: "",
            userImg: "avatar7",
          },
        ],
        status: "Complete",
        budget: "$100",
      },
      {
        id: 42,
        description: "Create a Blog Template UI",
        members: [
          {
            username: "Stephen",
          },
          {
            username: "",
            userImg: "avatar8",
          },
          {
            username: "",
            userImg: "avatar1",
          },
        ],
        status: "Complete",
        budget: "$75",
      },
      {
        id: 43,
        description: "Redesign - Landing page",
        members: [
          {
            username: "",
            userImg: "avatar7",
          },
          {
            username: "",
            userImg: "avatar4",
          },
        ],
        status: "Complete",
        budget: "$95",
      },
    ],
  },
]

const series = [
  {
    name: "Complete Tasks",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 52, 21, 44, 22, 30],
  },
  {
    name: "All Tasks",
    type: "line",
    data: [23, 11, 34, 27, 17, 22, 62, 32, 44, 22, 39],
  },
]

const options = {
  chart: { height: 280, type: "line", stacked: !1, toolbar: { show: !1 } },
  stroke: { width: [0, 2, 5], curve: "smooth" },
  plotOptions: { bar: { columnWidth: "20%", endingShape: "rounded" } },
  colors: ["#556ee6", "#34c38f"],
  fill: {
    gradient: {
      inverseColors: !1,
      shade: "light",
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  },
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ],
  markers: { size: 0 },
  yaxis: { min: 0 },
}

const statusClasses = {
  waiting: "badge-soft-secondary",
  approved: "badge-soft-primary",
  complete: "badge-soft-success",
  pending: "badge-soft-warning",
}

export { tasks, series, options, statusClasses }
