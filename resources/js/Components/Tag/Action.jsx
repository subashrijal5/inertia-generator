import DeleteButton from "../Utility/Action/DeleteButton";
import EditButton from "../Utility/Action/EditButton";

const TagAction = ({ row }) => {
    return (
        <div className="flex gap-1">
            <EditButton url={route("tags.edit", row.id)}/>
            <DeleteButton url={route('tags.destroy', row.id)}/>
        </div>
    );
};

export default TagAction;
