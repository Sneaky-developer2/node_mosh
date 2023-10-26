const Joi = require("joi")
const express = require("express")
const app = express()
app.use(express.json())

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
]

// main page
app.get("/", (req, res) => {
  res.send("hello world!")
})
// all courses
app.get("/api/courses", (req, res) => {
  res.send(courses)
})
// make a new course
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body)
  if (error) return res.status(400).send(result.error.details[0].message)

  const course = { 
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course)
  res.send(course)
})

// update a course
app.put("/api/courses/:id", (req, res) => {
  // look if the course exist
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send("this course does not exist")

  // validate
  const result = validateCourse(req.body)
  if (result.error) return res.status(400).send(result.error.details[0].message)

  // update course
  course.name = req.body.name
  res.send(course)
})

// delete request

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send("this course does not exist")

  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send(course)
})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  }
  return Joi.validate(course, schema)
}

// look a spisific course by ID
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send("this course does not exist")
  res.send(course)
})

//PORT
const port = process.env.PORT || 3333
app.listen(port, () => console.log(`go ahead to 'http://127.0.0.1:${port}'`))
