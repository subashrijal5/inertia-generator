import DeleteButton from "../Utility/Action/DeleteButton";
import EditButton from "../Utility/Action/EditButton";

const PostCategoryAction = ({ row }) => {
    return (
        <div className="flex gap-1">
            <EditButton url={route("postcategories.edit", row.id)}/>
            <DeleteButton url={route('postcategories.destroy', row.id)}/>
        </div>
    );
};

export default PostCategoryAction;
