import { useReducer } from 'react';

const ACTIONS = {
  SET_INPUT: 'SET_INPUT',
  START_SENDING: 'START_SENDING',
  STOP_SENDING: 'STOP_SENDING',
} as const;

type ChatLocalAction =
  | { type: typeof ACTIONS.SET_INPUT; payload: string }
  | { type: typeof ACTIONS.START_SENDING }
  | { type: typeof ACTIONS.STOP_SENDING };

type ChatLocalState = {
  input: string;
  isStreaming: boolean;
};

const initialState: ChatLocalState = {
  input: '',
  isStreaming: false,
};

function chatLocalReducer(state: ChatLocalState, action: ChatLocalAction): ChatLocalState {
  switch (action.type) {
    case ACTIONS.SET_INPUT:
      return { ...state, input: action.payload };
    case ACTIONS.START_SENDING:
      return { ...state, input: '', isStreaming: true };
    case ACTIONS.STOP_SENDING:
      return { ...state, isStreaming: false };
    default:
      return state;
  }
}

export function useChatState() {
  const [state, dispatch] = useReducer(chatLocalReducer, initialState);

  function setInput(input: string) {
    dispatch({ type: ACTIONS.SET_INPUT, payload: input });
  }

  function startSending() {
    dispatch({ type: ACTIONS.START_SENDING });
  }

  function stopSending() {
    dispatch({ type: ACTIONS.STOP_SENDING });
  }

  return {
    input: state.input,
    isStreaming: state.isStreaming,
    setInput,
    startSending,
    stopSending,
  };
}
