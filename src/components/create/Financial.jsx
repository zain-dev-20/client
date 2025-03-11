import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateFormData } from "../../redux/slice.js";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormButton from "../shareable/FormButton.jsx";

const schema = yup.object({
    income: yup.number().required("Monthly income is Required"),
    loanStatus: yup.string().required("Loan status is Required"),
    loanAmount: yup.number().optional(),
    creditScore: yup.number().required("credit is Required")
}).required();


const Financial = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.financialInfo);
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: formData,
    });
    const loanStatusVal = watch("loanStatus") == "yes"
    const onSubmit = (data) => {
        dispatch(updateFormData({stateName: "financialInfo",data}));
        dispatch(nextStep());
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mb-5">
                    <label htmlFor={"income"} className="block mb-2 text-sm font-medium text-gray-900">Your income</label>
                    <input {...register("income")} type={"number"} id={"income"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"income"} />
                    {errors.income && <p className="text-red-400 italic text-sm">{errors.income?.message}</p>}
                </div>
                <div>
                    <label className=" font-medium text-gray-900">Loan Status</label>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex">
                        <li className="w-full">
                            <div className="flex items-center ps-3">
                                <input {...register("loanStatus")} id="gender-male" type="radio" value="yes" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="gender-male" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Yes</label>
                            </div>
                        </li>
                        <li className="w-full">
                            <div className="flex items-center ps-3">
                                <input {...register("loanStatus")} id="gender-female" type="radio" value="no" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="gender-female" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">No</label>
                            </div>
                        </li>
                    </ul>
                    {errors.gender && <p className="text-red-400 italic text-sm">{errors.gender?.message}</p>}
                </div>
                
                {loanStatusVal && <div className="mb-5">
                    <label htmlFor={"loanAmount"} className="block mb-2 text-sm font-medium text-gray-900">Your loan amount</label>
                    <input {...register("loanAmount")} type={"number"} id={"loanAmount"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"loan amount"} />
                    {errors.loanAmount && <p className="text-red-400 italic text-sm">{errors.loanAmount?.message}</p>}
                </div>}
                <div className="mb-5">
                    <label htmlFor={"creditScore"} className="block mb-2 text-sm font-medium text-gray-900">Your credit score</label>
                    <input {...register("creditScore")} type={"number"} id={"creditScore"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"credit score"} />
                    {errors.creditScore && <p className="text-red-400 italic text-sm">{errors.creditScore?.message}</p>}
                </div>
                

            </div>
            {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full mt-2 px-5 py-2.5 text-center">Submit</button> */}
            <FormButton />

        </form>

    );
};

export default Financial;
