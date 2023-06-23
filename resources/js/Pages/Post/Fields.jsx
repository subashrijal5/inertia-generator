import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import BasicCard from "@/Components/Utility/Cards/BasicCard";
import MultiSelect from "@/Components/Utility/Select/MultiSelect";
import Autocomplete from "@/Components/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { fetchLanguages, fetchPostCategories } from "@/Hooks/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const help = {
    name: "help",
    keyCommand: "help",
    buttonProps: { "aria-label": "Insert help" },
    icon: (
        <svg viewBox="0 0 16 16" width="12px" height="12px">
            <path
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm.9 13H7v-1.8h1.9V13Zm-.1-3.6v.5H7.1v-.6c.2-2.1 2-1.9 1.9-3.2.1-.7-.3-1.1-1-1.1-.8 0-1.2.7-1.2 1.6H5c0-1.7 1.2-3 2.9-3 2.3 0 3 1.4 3 2.3.1 2.3-1.9 2-2.1 3.5Z"
                fill="currentColor"
            />
        </svg>
    ),
    execute: (state, api) => {
        window.open("https://www.google.com", "_blank");
    },
};

const PostField = ({
    auth,
    pagedata = {
        title: "",
        author_id: "",
        summery: "",
        source: "",
        description: "",
        published_at: "",
        meta_title: "",
        meta_description: "",
        published_at: "",
        create_another: false,
    },
    toastData,
}) => {
    const { data: languages } = useQuery(["languages"], fetchLanguages);
    const { data: categories } = useQuery(["categories"], fetchPostCategories);

    console.log(categories, languages);

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
            patch(route("posts.update", pagedata.id));
        } else {
            post(route("posts.store"), {
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
                                : "Create Post"}
                        </h2>
                    </div>
                </div>
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row md:gap-4">
                            <div className="flex flex-col gap-4 grow">
                                <BasicCard>
                                    <div className="mt-4">
                                        <InputLabel
                                            forInput="title"
                                            value="Title"
                                        />

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
                                            forInput="summery"
                                            value="Summery"
                                        />

                                        <TextInput
                                            id="summery"
                                            name="summery"
                                            type="textarea"
                                            value={data.summery}
                                            className="block w-full mt-1"
                                            autoComplete="summery"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.summery}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            forInput="description"
                                            value="Description"
                                        />
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={data.description}

                                            onBlur={(event, editor) => {
                                                onHandleChange(
                                                    "description",
                                                    editor.getData()
                                                );
                                            }}
                                        />

                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            forInput="source"
                                            value="Source"
                                        />

                                        <TextInput
                                            id="source"
                                            name="source"
                                            type="text"
                                            value={data.source}
                                            className="block w-full mt-1"
                                            autoComplete="source"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />

                                        <InputError
                                            message={errors.source}
                                            className="mt-2"
                                        />
                                    </div>
                                </BasicCard>
                            </div>
                            <BasicCard className="flex flex-col ">
                                <div className="mt-4">
                                    <InputLabel
                                        forInput="meta_title"
                                        value="Language"
                                    />
                                    <Autocomplete
                                        options={languages}
                                        selectedVal={{
                                            id: 1,
                                            label: "English",
                                        }}
                                        onChange={(selected) => null}
                                    />

                                    <InputError
                                        message={errors.language}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        forInput="categories"
                                        value="Categories"
                                    />

                                    <MultiSelect
                                        options={categories}
                                    ></MultiSelect>

                                    <InputError
                                        message={errors.categories}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        forInput="tags"
                                        value="Tags (Add comma separated tags)"
                                    />
                                    <TextInput
                                        id="tags"
                                        name="tags"
                                        type="text"
                                        value={data.tags}
                                        className="block w-full mt-1"
                                        autoComplete="tags"
                                        placeholder="eg: tag1,tag2,tag3"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                    <InputError
                                        message={errors.tags}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        forInput="meta_title"
                                        value="Meta title"
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
                            </BasicCard>
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

export default PostField;
