import Course from './Course';
import Notes from './Notes';

function App() {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <h2>Notes</h2>
      <Notes />
      <header>{course.name}</header>
      <section>
        {course.map((parts, index) => {
          return (
            <div key={index}>
              <div>
                <h2>{parts.name}</h2>
                {
                  parts.parts.map((course, index) => {
                    return <Course course={course} key={index} />
                  })
                }
              </div>
              <h3>total of {parts.parts.reduce((total, part) => total + part.exercises, 0)} exercises</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
