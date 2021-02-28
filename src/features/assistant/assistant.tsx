import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import { FC, memo, useEffect, useRef } from "react";
import { add_note } from "../toDo/toDoSlice";

import { useSelector, useDispatch } from "react-redux";

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

type assistantAction = {
  type: string;
  note?: string;
};

export const AssistantComponent: FC = memo(() => {
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();
  const dispatch = useDispatch();
  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }: any) => {
      if (action) {
        action = action as assistantAction;
        console.log(action);
        dispatch(add_note(action.note));
      }
    });
  }, []);

  return <> </>;
});
