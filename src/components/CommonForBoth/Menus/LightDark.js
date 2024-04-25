import React from 'react';

//Import Icons
import FeatherIcon from "feather-icons-react";

//constants
import { layoutTheme } from "../../../constants/layout";
const LightDark = ({ layoutMode, onChangeLayoutMode }) => {
    const mode = layoutMode === layoutTheme['DARKMODE'] ? layoutTheme['LIGHTMODE'] : layoutTheme['DARKMODE'];
    return (
        <div className="dropdown d-none d-sm-inline-block">
            <button
                onClick={
                    () => onChangeLayoutMode(mode)
                }
                type="button" className="btn header-item">
                {layoutMode === layoutTheme['DARKMODE'] ?
                    <FeatherIcon
                        icon="sun"
                        className="icon-lg layout-mode-light"
                    />
                    :
                    <FeatherIcon
                        icon="moon"
                        className="icon-lg layout-mode-dark"
                    />
                }
            </button>
        </div>
    );
}

export default LightDark;