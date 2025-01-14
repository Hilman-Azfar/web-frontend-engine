import { ArgsTable, Description, Heading, PRIMARY_STORY, Stories, Title } from "@storybook/addon-docs";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ITextFieldSchema } from "../../../components/fields";
import { CommonFieldStoryProps, FrontendEngine, SUBMIT_BUTTON_SCHEMA } from "../../common";

export default {
	title: "Field/TextField",
	parameters: {
		docs: {
			page: () => (
				<>
					<Title>TextField</Title>
					<Description>A form element that contains a label, input and error message</Description>
					<Heading>Props</Heading>
					<Description>
						This component also inherits the
						[HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
						attributes.
					</Description>
					<ArgsTable story={PRIMARY_STORY} />
					<Stories includePrimary={true} title="Examples" />
				</>
			),
		},
	},
	argTypes: {
		...CommonFieldStoryProps("text-field"),
		placeholder: {
			description: "Specifies the placeholder text",
			table: {
				type: {
					summary: "string",
				},
			},
			control: {
				type: "text",
			},
		},
		disabled: {
			description: "Specifies if the textfield is interactable",
			table: {
				type: {
					summary: "boolean",
				},
				defaultValue: { summary: false },
			},
			options: [true, false],
			control: {
				type: "boolean",
			},
		},
	},
} as Meta;

const Template = (id: string) =>
	(({ defaultValues, ...args }) => (
		<FrontendEngine
			data={{
				sections: {
					section: {
						uiType: "section",
						children: {
							[id]: args,
							...SUBMIT_BUTTON_SCHEMA,
						},
					},
				},
				...(!!defaultValues && {
					defaultValues: {
						[id]: defaultValues,
					},
				}),
			}}
		/>
	)) as Story<ITextFieldSchema & { defaultValues?: string | undefined }>;

export const Default = Template("text-default").bind({});
Default.args = {
	label: "Textfield",
	uiType: "text-field",
};

export const DefaultValue = Template("text-default-value").bind({});
DefaultValue.args = {
	label: "Textfield",
	uiType: "text-field",
	defaultValues: "This is the default value",
};
DefaultValue.argTypes = {
	defaultValues: {
		description: "Default value for the field, this is declared outside `sections`",
		table: {
			type: {
				summary: "string",
			},
		},
		control: {
			type: "text",
		},
	},
};

export const Disabled = Template("text-disabled").bind({});
Disabled.args = {
	label: "Textfield",
	uiType: "text-field",
	disabled: true,
};

export const MaxLength = Template("text-maxlength").bind({});
MaxLength.args = {
	label: "Textfield",
	uiType: "text-field",
	validation: [{ max: 5 }],
};

export const Placeholder = Template("text-placeholder").bind({});
Placeholder.args = {
	label: "Textfield",
	uiType: "text-field",
	placeholder: "Enter text here",
};

export const WithValidation = Template("text-with-validation").bind({});
WithValidation.args = {
	label: "Textfield",
	uiType: "text-field",
	validation: [{ required: true }],
};
