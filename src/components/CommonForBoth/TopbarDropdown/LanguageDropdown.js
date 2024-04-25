import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { get, map } from "lodash";
import { withTranslation } from "react-i18next";

//i18n
import i18n from "../../../i18n";
import languages from "../../../common/languages";

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const [selectedLang, setSelectedLang] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    setSelectedLang(currentLanguage);
  }, [])

  const changeLanguageAction = lang => {
    //set language as i18n
    i18n.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setSelectedLang(lang);
  }

  const toggle = () => {
    setMenu(!menu);
  }

  return (
    <>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item " tag="button">
          <img
            src={get(languages, `${selectedLang}.flag`)}
            alt="Skote"
            height="16"
            className="me-1"
          />
        </DropdownToggle>
        <DropdownMenu className="language-switch dropdown-menu-end">
          {map(Object.keys(languages), key => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? "active" : "none"
                }`}
            >
              <img
                src={get(languages, `${key}.flag`)}
                alt="Skote"
                className="me-1"
                height="12"
              />
              <span className="align-middle">
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default withTranslation()(LanguageDropdown)
