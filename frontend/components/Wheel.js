import React from "react";
import { connect } from "react-redux";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

function Wheel(props) {
  const { wheel, moveClockwise, moveCounterClockwise } = props;

  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map((position) => (
          <div
            key={position}
            className={`cog ${position === wheel ? "active" : ""}`}
            style={{ "--i": position }}
          >
            {position === wheel && "B"}
          </div>
        ))}

        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => moveCounterClockwise()}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={() => moveClockwise()}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ wheel: state.wheel });

export default connect(mapStateToProps, {
  moveClockwise,
  moveCounterClockwise,
})(Wheel);
