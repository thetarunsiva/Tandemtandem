const addBtn = document.getElementById("addBtn")
const loadBtn = document.getElementById("loadBtn")
const result = document.getElementById("result")

addBtn.onclick = async () => {
  const location = document.getElementById("location").value
  const hint = document.getElementById("hint").value
  const password = document.getElementById("password").value

  const res = await fetch("http://localhost:3000/add-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location, hint, password })
  })

  const data = await res.json()
  alert("Password stored for " + data.location)
}

loadBtn.onclick = async () => {
  const res = await fetch("http://localhost:3000/get-hint-locations")
  const data = await res.json()

  result.innerHTML = ""

  data.forEach(item => {
    const div = document.createElement("div")
    div.innerText = item.location + " - " + item.hint
    result.appendChild(div)
  })
}