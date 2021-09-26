
const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <p>{course.name}  {course.exercises}</p>
    </div>
  );
}

export default Course;