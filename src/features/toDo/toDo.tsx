import React, {
  FC,
  memo,
  useReducer,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./toDo.css";

import { useSelector, useDispatch } from "react-redux";

// import { reducer } from "./store";
import { add_note, done_note, delete_note, selectToDo } from "./toDoSlice";

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }

  return createAssistant({ getState });
};

export const toDo: FC = memo(() => {
  const toDo = useSelector(selectToDo);
  const dispatch = useDispatch();
  // const [appState, dispatch] = useReducer(reducer, { notes: [] });

  // const [note, setNote] = useState("");
  const note = "testNote";
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }: any) => {
      if (action) {
        dispatch(action);
      }
    });
  }, []);

  useEffect(() => {
    assistantStateRef.current = {
      item_selector: {
        items: toDo.notes.map(({ id, title }, index) => ({
          number: index + 1,
          id,
          title,
        })),
      },
    };
  }, [toDo]);

  return (
    <main className="container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // dispatch({ type: "add_note", note });
          dispatch(add_note(note));
          // setNote("");
        }}
      >
        <input
          className="add-note"
          type="text"
          placeholder="Add Note"
          value={note}
          onChange={({ target: { value } }) => dispatch(add_note(value))}
          required
          autoFocus
        />
      </form>
      <ul className="notes">
        {toDo.notes.map((note, index) => (
          <li className="note" key={note.id}>
            <span>
              <span style={{ fontWeight: "bold" }}>{index + 1}. </span>
              <span
                style={{
                  textDecorationLine: note.completed ? "line-through" : "none",
                }}
              >
                {note.title}
              </span>
            </span>
            <input
              className="done-note"
              type="checkbox"
              checked={note.completed}
              onChange={() => dispatch({ type: "done_note", id: note.id })}
            />
          </li>
        ))}
      </ul>
    </main>
  );
});
