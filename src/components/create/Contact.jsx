import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateFormData } from "../../redux/slice.js";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { country_city } from "../../constant/index.js";
import FormButton from "../shareable/FormButton.jsx";

const schema = yup.object({
    phoneNumber: yup.string().required("Phone is Required"),
    altPhone: yup.string().optional(),
    address1: yup.string().required("Adress 1 is Required"),
    address2: yup.string().optional(),
    city: yup.string().required("city is Required"),
    postalCode: yup.number().required("postal code is Required"),
    country: yup.string().required("country is Required"),

}).required();


const Contact = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.contactInfo);
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: formData,
    });
    const countryVal = watch("country")
    const onSubmit = (data) => {
        dispatch(updateFormData({ stateName: "contactInfo", data }));
        dispatch(nextStep());
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1">
                <div className="mb-5">
                    <label htmlFor={"phoneNumber"} className="block mb-2 text-sm font-medium text-gray-900">Your phone number</label>
                    <input {...register("phoneNumber")} type={"text"} id={"phoneNumber"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"phone number"} />
                    {errors.phoneNumber && <p className="text-red-400 italic text-sm">{errors.phoneNumber?.message}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor={"altPhone"} className="block mb-2 text-sm font-medium text-gray-900">Your alternate phone number</label>
                    <input {...register("altPhone")} type={"text"} id={"altPhone"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"alternate phone"} />
                    {errors.altPhone && <p className="text-red-400 italic text-sm">{errors.altPhone?.message}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor={"address1"} className="block mb-2 text-sm font-medium text-gray-900">Your primary address</label>
                    <input {...register("address1")} type={"text"} id={"address1"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"primary address"} />
                    {errors.address1 && <p className="text-red-400 italic text-sm">{errors.address1?.message}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor={"address2"} className="block mb-2 text-sm font-medium text-gray-900">Your secondary address</label>
                    <input {...register("address2")} type={"text"} id={"address2"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"secondary address"} />
                    {errors.address2 && <p className="text-red-400 italic text-sm">{errors.address2?.message}</p>}
                </div>

                <div>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select Country</label>
                    <select id="countries" {...register("country")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none">
                        <option selected>Choose a country</option>
                        {
                            country_city.map((c) => (
                                <option value={c.country}>{c.country}</option>
                            ))
                        }
                    </select>
                    {errors.country && <p className="text-red-400 italic text-sm">{errors.country?.message}</p>}
                </div>
                <div>
                    <label htmlFor="cities" className="block mb-2 text-sm font-medium text-gray-900">Select City</label>
                    <select id="cities" {...register("city")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none">
                        <option selected>Choose a city</option>
                        {
                            countryVal && country_city?.find(c => c.country === countryVal).cities.map((city) => (
                                <option value={city}>{city}</option>
                            ))
                        }
                    </select>
                    {errors.country && <p className="text-red-400 italic text-sm">{errors.country?.message}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor={"postalCode"} className="block mb-2 text-sm font-medium text-gray-900">Your postal code</label>
                    <input {...register("postalCode")} type={"number"} id={"postalCode"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"postal code"} />
                    {errors.postalCode && <p className="text-red-400 italic text-sm">{errors.postalCode?.message}</p>}
                </div>

            </div>
            {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full mt-2 px-5 py-2.5 text-center">Submit</button> */}
            <FormButton />

        </form>

    );
};

export default Contact;
