import PostAction from "@/Components/Post/Action";
import PrimaryButton from "@/Components/PrimaryButton";
import Datatable from "@/Components/Utility/Table/Datatable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";

export default function Post(props) {
    const columns = [
        { field: "title", headerName: "Name" },
        {
            field: "author_id",
            headerName: "Author",
            computed: (row) => row.author.name,
        },
        {
            field: "category_id",
            headerName: "Category",
            computed: (row) => row.categories.map((c) => c.title).join(", "),
        },

        { field: "source", headerName: "Summery" },
        { field: "description", headerName: "Description" },
        { field: "published_at", headerName: "Published Date" },
    ];

    const handleCreate = (e) => {
        e.preventDefault();
        Inertia.get(route("posts.create"));
    };
    return (
        <AuthenticatedLayout auth={props.auth} toastData={props.toastData}>
            <Head title="Post" />
            <div className="container grid px-6 mx-auto">
                <div className="flex justify-between">
                    <div className="flex-none w-50">
                        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Create Post
                        </h2>
                    </div>
                    <div className="flex-none w-50">
                        <PrimaryButton
                            className="my-6"
                            type="button"
                            onClick={handleCreate}
                        >
                            Create
                        </PrimaryButton>
                    </div>
                </div>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <Datatable
                            columns={columns}
                            data={props.data}
                            actionComponent={PostAction}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
