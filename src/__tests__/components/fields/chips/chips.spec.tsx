import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IChipsSchema } from "../../../../components/fields";
import { FrontendEngine, IFrontendEngineData } from "../../../../components/frontend-engine";
import { TestHelper } from "../../../../utils";
import { ERROR_MESSAGE, TOverrideField, TOverrideSchema } from "../../../common";

const submitFn = jest.fn();
const componentId = "field";
const fieldType = "chips";
const componentTestId = TestHelper.generateId(componentId, fieldType);

const textareaLabel = "Durian";
const textareaId = `chips-${textareaLabel}`;
const textareaTestId = TestHelper.generateId(textareaId, "textarea");

const renderComponent = (overrideField?: TOverrideField<IChipsSchema>, overrideSchema?: TOverrideSchema) => {
	const json: IFrontendEngineData = {
		id: "test",
		fields: {
			[componentId]: {
				label: "Chips",
				fieldType,
				options: [
					{ label: "A", value: "A" },
					{ label: "B", value: "B" },
				],
				...overrideField,
			},
			submit: {
				label: "Submit",
				fieldType: "submit",
			},
		},
		...overrideSchema,
	};
	return render(<FrontendEngine data={json} onSubmit={submitFn} />);
};

describe(fieldType, () => {
	it("should be able to render the field", () => {
		renderComponent();
		expect(screen.getByTestId(componentTestId)).toBeInTheDocument();
	});

	it("should be able to support default values", async () => {
		const defaultValues = ["A"];
		renderComponent(undefined, { defaultValues: { [componentId]: defaultValues } });

		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));

		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: defaultValues }));
	});

	it("should be able to support validation schema", async () => {
		renderComponent({ validation: [{ required: true, errorMessage: ERROR_MESSAGE }] });

		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));

		expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
	});

	it("should be disabled if configured", async () => {
		renderComponent({ disabled: true });

		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));

		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: undefined }));
	});

	it("should be able to toggle the chips", async () => {
		renderComponent();
		const chips = screen.getByTestId(componentTestId).querySelectorAll("button");

		await waitFor(() => fireEvent.click(chips[0]));
		await waitFor(() => fireEvent.click(chips[1]));
		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: ["A", "B"] }));

		await waitFor(() => fireEvent.click(chips[0]));
		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: ["B"] }));

		await waitFor(() => fireEvent.click(chips[1]));
		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: [] }));
	});

	it("should be able to support single selection", async () => {
		renderComponent({ multi: false });
		const chips = screen.getByTestId(componentTestId).querySelectorAll("button");

		await waitFor(() => fireEvent.click(chips[0]));
		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: ["A"] }));

		await waitFor(() => fireEvent.click(chips[1]));
		await waitFor(() => fireEvent.click(screen.getByTestId("submit")));
		expect(submitFn).toBeCalledWith(expect.objectContaining({ [componentId]: ["B"] }));
	});

	it("should be able to render textarea upon selection", async () => {
		renderComponent({ textarea: { label: textareaLabel } });

		expect(screen.queryByTestId(textareaTestId)).not.toBeInTheDocument();

		const chip = screen.getByText(textareaLabel);
		await waitFor(() => fireEvent.click(chip));
		expect(screen.queryByTestId(textareaTestId)).toBeInTheDocument();
	});

	describe("textarea", () => {
		it("should be able to support validation schema", async () => {
			renderComponent({
				textarea: { label: textareaLabel, validation: [{ required: true, errorMessage: ERROR_MESSAGE }] },
			});

			const chip = screen.getByText(textareaLabel);
			await waitFor(() => fireEvent.click(chip));
			await waitFor(() => fireEvent.click(screen.getByTestId("submit")));

			expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
		});

		it("should be able to resize vertically", async () => {
			renderComponent({
				textarea: { label: textareaLabel, resizable: true },
			});

			const chip = screen.getByText(textareaLabel);
			await waitFor(() => fireEvent.click(chip));

			expect(screen.getByTestId(textareaTestId)).toHaveStyle({ resize: "vertical" });
		});

		it("should be able to support custom rows", async () => {
			renderComponent({
				textarea: { label: textareaLabel, rows: 1 },
			});

			const chip = screen.getByText(textareaLabel);
			await waitFor(() => fireEvent.click(chip));

			expect(screen.getByTestId(textareaTestId)).toHaveAttribute("rows", "1");
		});
	});
});
