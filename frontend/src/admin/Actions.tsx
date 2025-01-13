import React from "react";
import {Link} from "react-router-dom";

export default function Actions(){
    return (
        <div className="d-grid gap-2">
            <Link to="upload" className="btn btn-success w-100 h-100 ">Добавить новую музыку</Link>
            <Link to="musicList" className="btn btn-success w-100 h-100">Список музыки</Link>
        </div>
    );
}