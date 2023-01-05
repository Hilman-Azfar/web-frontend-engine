import { createContext, ReactElement, useRef } from "react";

interface IEventContext {
	eventManager: Element;
}

interface IProps {
	children: ReactElement;
}

export const EventContext = createContext<IEventContext>({
	eventManager: null,
});

export const EventProvider = ({ children }: IProps) => {
	const eventManager = useRef<Element>(document?.createElement("div"));

	return <EventContext.Provider value={{ eventManager: eventManager.current }}>{children}</EventContext.Provider>;
};
