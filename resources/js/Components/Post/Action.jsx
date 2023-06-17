import DeleteButton from "../Utility/Action/DeleteButton";
import EditButton from "../Utility/Action/EditButton";

const PostAction = ({ row }) => {
    return (
        <div className="flex gap-1">
            <EditButton url={route("posts.edit", row.id)}/>
            <DeleteButton url={route('posts.destroy', row.id)}/>
        </div>
    );
};

export default PostAction;
