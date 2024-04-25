
const user = JSON.parse(localStorage.getItem("access_token"))
const accessToken =
  "Bearer " + user
export default accessToken
