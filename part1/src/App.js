const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
};

function App() {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log("Hello from the Component ");
  return (
    <div>
      <p>Hello World, its {now.toString()} o'clock</p>
      <Hello />
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  );
}

export default App;
