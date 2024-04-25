const events = [
  {
    id: 1,
    title: "Hey!",
    start: new Date().setDate(new Date().getDate() + 1),
    className: "bg-warning text-white",
  },
  {
    id: 2,
    title: "See John Deo",
    start: new Date(),
    end: new Date(),
    className: "bg-success text-white",
  },
  {
    id: 3,
    title: "Meet John Deo",
    start: new Date().setDate(new Date().getDate() + 8),
    className: "bg-info text-white",
  },
  {
    id: 4,
    title: "Buy a Theme",
    start: new Date().setDate(new Date().getDate() + 7),
    className: "bg-primary text-white",
  },
]

const calenderDefaultCategories = [
  {
    id: 1,
    title: "New Theme Release",
    type: "bg-soft-success",
    text: "text-success"
  },
  {
    id: 2,
    title: "My Event",
    type: "bg-soft-info",
    text: "text-info"
  },
  {
    id: 3,
    title: "Meet Manager",
    type: "bg-soft-warning",
    text: "text-warning"
  },
  {
    id: 4,
    title: "Report Error",
    type: "bg-soft-danger",
    text: "text-danger"
  },
]

export { calenderDefaultCategories, events }
