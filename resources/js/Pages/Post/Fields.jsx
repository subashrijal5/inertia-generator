import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import DatePicker from "@/Components/DatePicker";

const PostField = ({ auth, pagedata = {} , toastData}) => {
    const {
        data,
        setData,
        processing,
        reset,
        errors,
        post,
        patch,
    } = useForm({"title":null,"author_id":null,"summery":null,"source":null,"description":null,"published_at":null,"create_another":false});


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
                onSuccess : ()=>  reset()
            });
        }

    };
    return (
        <AuthenticatedLayout auth={auth} toastData={toastData}>
            <div className="container px-6 mx-auto grid">
                <div className="flex justify-between">
                    <div className="flex-none w-50">
                        <h2 className="font-semibold text-xl py-5 text-gray-800 leading-tight">
                           {pagedata.id ? ("Edit ID#" + pagedata.id) : "Create Post" }
                        </h2>
                    </div>
                </div>
                <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row  md:gap-4">

                             <div className="mt-4">
    <InputLabel forInput="title" value="Name" />

    <TextInput
        id="title"
        name="title"
        type="text"
        value={data.title}
        className="mt-1 block w-full"
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
    <InputLabel forInput="author_id" value="Author" />

    <TextInput
        id="author_id"
        name="author_id"
        type="text"
        value={data.author_id}
        className="mt-1 block w-full"
        autoComplete="author_id"
        isFocused={true}
        handleChange={onHandleChange}
    />

    <InputError
        message={errors.author_id}
        className="mt-2"
    />
</div>
 <div className="mt-4">
    <InputLabel forInput="summery" value="Summery" />

    <TextInput
        id="summery"
        name="summery"
        type="textarea"
        value={data.summery}
        className="mt-1 block w-full"
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
    <InputLabel forInput="source" value="Summery" />

    <TextInput
        id="source"
        name="source"
        type="text"
        value={data.source}
        className="mt-1 block w-full"
        autoComplete="source"
        isFocused={true}
        handleChange={onHandleChange}
    />

    <InputError
        message={errors.source}
        className="mt-2"
    />
</div>
 <div className="mt-4">
    <InputLabel forInput="description" value="Description" />

    <TextInput
        id="description"
        name="description"
        type="textarea"
        value={data.description}
        className="mt-1 block w-full"
        autoComplete="description"
        isFocused={true}
        handleChange={onHandleChange}
    />

    <InputError
        message={errors.description}
        className="mt-2"
    />
</div>
<div className="mt-4">
    <InputLabel
        forInput="published_at"
        value="Published Date"
    />
    <DatePicker value={data.published_at} onChange={(val)=> onHandleChange(val, 'published_at')} />

    <InputError
        message={errors.published_at}
        className="mt-2"
    />
</div>

                        </div>
                        <div className=" flex my-4 w-100">
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
