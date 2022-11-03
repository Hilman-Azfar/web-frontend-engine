import { DateInputProps } from "@lifesg/react-design-system/date-input";
import {
	IFrontendEngineBaseFieldJsonSchema,
	TFrontendEngineBaseFieldJsonSchemaKeys,
} from "../../frontend-engine/types";

export interface IDateInputSchema
	extends IFrontendEngineBaseFieldJsonSchema<"date">,
		Omit<DateInputProps, TFrontendEngineBaseFieldJsonSchemaKeys> {
	useCurrentDate?: boolean | undefined;
	dateFormat?: string | undefined;
}