import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";

const LanguageField = ({
    auth,
    pagedata = { name: "", short_code: "", create_another: false },
    toastData,
}) => {
    const { data, setData, processing, reset, errors, post, patch } =
        useForm(pagedata);

    const onHandleChange = (event, name = null) => {
        if (!event.target && name) {
            setData(name, event);
        } else {
            setData(
                event.target.name,
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pagedata.id) {
            patch(route("languages.update", pagedata.id));
        } else {
            post(route("languages.store"), {
                onSuccess: () => reset(),
            });
        }
    };
    return (
        <AuthenticatedLayout auth={auth} toastData={toastData}>
            <div className="container grid px-6 mx-auto">
                <div className="flex justify-between">
                    <div className="flex-none w-50">
                        <h2 className="py-5 text-xl font-semibold leading-tight text-gray-800">
                            {pagedata.id
                                ? "Edit ID#" + pagedata.id
                                : "Create Language"}
                        </h2>
                    </div>
                </div>
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:gap-4">
                            <div className="mt-4">
                                <InputLabel forInput="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="block w-full mt-1"
                                    autoComplete="name"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    forInput="short_code"
                                    value="Short Code"
                                />

                                <TextInput
                                    id="short_code"
                                    name="short_code"
                                    type="text"
                                    value={data.short_code}
                                    className="block w-full mt-1"
                                    autoComplete="short_code"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.short_code}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex my-4 w-100">
                            <PrimaryButton processing={processing}>
                                Submit
                            </PrimaryButton>
                            {!pagedata.id && (
                                <div className="block mx-4 mt-2">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="create_another"
                                            value={data.create_another}
                                            handleChange={onHandleChange}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Create Another
                                        </span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default LanguageField;
