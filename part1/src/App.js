const Hello = (props) => {
  return (
    <div>
      <p>
        Hello world, My name is {props.name} and i'm {props.age} years old
      </p>
    </div>
  );
};

function App() {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log("Hello from the Component ");
  return (
    <>
      <p>Hello World, its {now.toString()} o'clock</p>
      <Hello name="Cesar" age="20" />
      <p>
        {a} + {b} is {a + b}
      </p>
    </>
  );
}

export default App;
