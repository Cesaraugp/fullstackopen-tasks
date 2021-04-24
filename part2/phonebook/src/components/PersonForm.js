import React from "react";

const PersonForm = ({
  newName,
  newPhone,
  inputChangeHandler,
  buttonHandler,
}) => {
  return (
    <form>
      <div>
        name:{" "}
        <input name="name" value={newName} onChange={inputChangeHandler} />
      </div>
      <div>
        number:{" "}
        <input name="phone" value={newPhone} onChange={inputChangeHandler} />
      </div>
      <div>
        <button onClick={buttonHandler} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
