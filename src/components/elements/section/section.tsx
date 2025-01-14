import { Wrapper } from "../wrapper";
import { ISectionProps } from "./types";

export const Section = (props: ISectionProps) => {
	// =============================================================================
	// CONST, STATE, REF
	// =============================================================================
	const {
		sectionSchema: { children },
		...otherProps
	} = props;

	// =============================================================================
	// RENDER FUNCTIONS
	// =============================================================================
	return <Wrapper {...otherProps}>{children}</Wrapper>;
};
