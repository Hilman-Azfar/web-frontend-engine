import { ArgsTable, Description, Heading, PRIMARY_STORY, Stories, Title } from "@storybook/addon-docs";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { FrontendEngine, IFrontendEngineProps } from "../../src";

export default {
	title: "Form/Frontend Engine",
	component: FrontendEngine,
	parameters: {
		docs: {
			page: () => (
				<>
					<Title>FrontendEngine</Title>
					<Description>
						The main component to render a form, based on a JSON schema through the `data` prop or through
						manually defined children (custom rendering).
					</Description>
					<Heading>Props</Heading>
					<ArgsTable story={PRIMARY_STORY} />
					<Stories includePrimary={true} title="Examples" />
				</>
			),
		},
	},
	argTypes: {
		id: {
			description: "Unique HTML id attribute that is also assigned to the `data-testid`",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		className: {
			description: "HTML class attribute",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		data: {
			description: "JSON configuration to define the fields and functionalities of the form",
			table: {
				type: {
					summary: "JSON",
				},
			},
		},
		defaultValues: {
			description: "Fields' initial values on mount",
			table: {
				type: {
					summary: "TFrontendEngineValues",
				},
			},
		},
		// TODO: Update description
		validationSchema: {
			description: "TO BE UPDATED",
			table: {
				type: {
					summary: "Yup.AnyObjectSchema",
				},
			},
		},
		validators: {
			description: "Custom `Yup` validation rules",
			table: {
				type: {
					summary: "IFrontendEngineValidator[]",
				},
			},
		},
		conditions: {
			description: "Custom conditional rendering rules",
			table: {
				type: {
					summary: "IFrontendEngineCondition[]",
				},
			},
		},
		validationMode: {
			description: "Form validation behaviour",
			table: {
				type: {
					summary: "TValidationMode",
				},
			},
		},
		reValidationMode: {
			description: "Form re-validation behaviour",
			table: {
				type: {
					summary: "TRevalidationMode",
				},
				defaultValue: {
					summary: "onChange",
				},
			},
		},
		onSubmit: {
			description: "Submit event handler",
			table: {
				type: {
					summary: "(values: TFrontendEngineValues) => unknown",
				},
			},
		},
		onValidate: {
			description: "Validate event handler",
			table: {
				type: {
					summary: "(isValid: boolean) => void",
				},
			},
		},
	},
} as Meta;

const Template: Story<IFrontendEngineProps> = (args) => {
	return <FrontendEngine {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	id: "Sample Form",
	validationMode: "onSubmit",
	reValidationMode: "onChange",
	data: {
		fields: [
			{
				id: "name",
				title: "What is your name",
				type: "TEXTAREA",
				validation: ["required", "string"],
				chipTexts: ["John", "Doe"],
			},
		],
	},
	defaultValues: {
		name: "Erik Tan",
	},
};
