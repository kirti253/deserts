import "./App.css";

function App() {
  return (
    <div>
      <h1>helo thrre</h1>
    </div>
  );
}

const style = {
  width: 200,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "grey",
  borderWidth: 1,
};
function postComponent() {
  return (
    <div style={style}>
      <img
        src={""}
        style={{
          width: 20,
          height: 20,
          borderRadius: 20,
        }}
      />
    </div>
  );
}

export default App;
