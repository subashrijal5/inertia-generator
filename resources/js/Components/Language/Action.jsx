import DeleteButton from "../Utility/Action/DeleteButton";
import EditButton from "../Utility/Action/EditButton";

const LanguageAction = ({ row }) => {
    return (
        <div className="flex gap-1">
            <EditButton url={route("languages.edit", row.id)}/>
            <DeleteButton url={route('languages.destroy', row.id)}/>
        </div>
    );
};

export default LanguageAction;
