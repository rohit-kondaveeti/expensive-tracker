import React from "react";
import { TypeOf, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "./Categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description Should Be 3 characters" })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount Should Be Required" })
    .min(0.01)
    .max(100_00),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is Required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;
interface props {
  onSubmit: (data: ExpenseFormData) => void;
}
const ExpenseForm = ({ onSubmit }: props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          description
        </label>
        <input
          {...register("description")}
          type="text"
          id="description"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          id="amount"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option>Select</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
          <div className="mb-3 form-group">
            <input
              className="btn btn-primary mb-3 submit"
              type="submit"
              value="Submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
