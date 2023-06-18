import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";

const PostCategoryField = ({
    auth,
    pagedata = {
        title: "",
        meta_title: "",
        meta_description: "",
        description: "",
        create_another: false,
    },
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
            patch(route("postcategories.update", pagedata.id));
        } else {
            post(route("postcategories.store"), {
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
                                : "Create Postcategory"}
                        </h2>
                    </div>
                </div>
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col  md:gap-4">
                            <div className="mt-4">
                                <InputLabel forInput="title" value="Title" />

                                <TextInput
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    className="block w-full mt-1"
                                    autoComplete="title"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    forInput="meta_title"
                                    value="Meta Title"
                                />

                                <TextInput
                                    id="meta_title"
                                    name="meta_title"
                                    type="text"
                                    value={data.meta_title}
                                    className="block w-full mt-1"
                                    autoComplete="meta_title"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.meta_title}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    forInput="meta_description"
                                    value="Meta Description"
                                />

                                <TextInput
                                    id="meta_description"
                                    name="meta_description"
                                    type="textarea"
                                    value={data.meta_description}
                                    className="block w-full mt-1"
                                    autoComplete="meta_description"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.meta_description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    forInput="description"
                                    value="Description"
                                />

                                <TextInput
                                    id="description"
                                    name="description"
                                    type="textarea"
                                    value={data.description}
                                    className="block w-full mt-1"
                                    autoComplete="description"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.description}
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

export default PostCategoryField;
