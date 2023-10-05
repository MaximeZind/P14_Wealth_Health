import {
  require_prop_types
} from "./chunk-PNSKILSM.js";
import "./chunk-4KLNKA2P.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/maximez_dropdown/src/Dropdown.jsx
var import_react6 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);
import classes4 from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_dropdown/src/styles/Dropdown.module.css";

// node_modules/maximez_dropdown/src/icons/DropdownArrow.jsx
var import_react = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);
function DropdownArrow({ transform, color }) {
  return import_react.default.createElement("svg", { fill: color, xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 129 129", enableBackground: "new 0 0 129 129", style: { transform, transition: "transform 0.7s ease" } }, import_react.default.createElement("g", null, import_react.default.createElement("path", { d: "m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" })));
}
DropdownArrow.propTypes = {
  transform: import_prop_types.default.string,
  color: import_prop_types.default.string
};
var DropdownArrow_default = DropdownArrow;

// node_modules/maximez_dropdown/src/SeparatedBox.jsx
var import_react4 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);
import classes2 from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_dropdown/src/styles/SeparatedBox.module.css";

// node_modules/maximez_dropdown/src/icons/MagnifyingGlass.jsx
var import_react2 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);
function MagnifyingGlass({ color }) {
  return import_react2.default.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      version: "1.1",
      id: "Capa_1",
      x: "0px",
      y: "0px",
      width: "475.084px",
      height: "475.084px",
      fill: color ? color : "rgb(177,196,108, 0.4)",
      viewBox: "0 0 475.084 475.084",
      enableBackground: "new 0 0 475.084 475.084",
      xmlSpace: "preserve"
    },
    import_react2.default.createElement("g", null, import_react2.default.createElement("path", { d: "M464.524,412.846l-97.929-97.925c23.6-34.068,35.406-72.047,35.406-113.917c0-27.218-5.284-53.249-15.852-78.087   c-10.561-24.842-24.838-46.254-42.825-64.241c-17.987-17.987-39.396-32.264-64.233-42.826   C254.246,5.285,228.217,0.003,200.999,0.003c-27.216,0-53.247,5.282-78.085,15.847C98.072,26.412,76.66,40.689,58.673,58.676   c-17.989,17.987-32.264,39.403-42.827,64.241C5.282,147.758,0,173.786,0,201.004c0,27.216,5.282,53.238,15.846,78.083   c10.562,24.838,24.838,46.247,42.827,64.234c17.987,17.993,39.403,32.264,64.241,42.832c24.841,10.563,50.869,15.844,78.085,15.844   c41.879,0,79.852-11.807,113.922-35.405l97.929,97.641c6.852,7.231,15.406,10.849,25.693,10.849   c9.897,0,18.467-3.617,25.694-10.849c7.23-7.23,10.848-15.796,10.848-25.693C475.088,428.458,471.567,419.889,464.524,412.846z    M291.363,291.358c-25.029,25.033-55.148,37.549-90.364,37.549c-35.21,0-65.329-12.519-90.36-37.549   c-25.031-25.029-37.546-55.144-37.546-90.36c0-35.21,12.518-65.334,37.546-90.36c25.026-25.032,55.15-37.546,90.36-37.546   c35.212,0,65.331,12.519,90.364,37.546c25.033,25.026,37.548,55.15,37.548,90.36C328.911,236.214,316.392,266.329,291.363,291.358z   " })),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null),
    import_react2.default.createElement("g", null)
  );
}
MagnifyingGlass.propTypes = {
  color: import_prop_types2.default.string
};
var MagnifyingGlass_default = MagnifyingGlass;

// node_modules/maximez_dropdown/src/scripts.js
function dropdownFilter(inputKeywords, list) {
  let result = [];
  if (inputKeywords.length === 0) {
    return list;
  }
  list.map((item) => {
    let count = 0;
    const array = Object.values(item).toString();
    inputKeywords.map((word) => {
      if (array.toLowerCase().trim().includes(word.toLowerCase().trim())) {
        count++;
      }
      if (count === inputKeywords.length) {
        result.push(item);
      }
    });
  });
  return result;
}

// node_modules/maximez_dropdown/src/ListItem.jsx
var import_react3 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);
import classes from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_dropdown/src/styles/ListItem.module.css";
function ListItem({ item, index, height, fontFamily, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, handleClick }) {
  const [isHovered, setIsHovered] = (0, import_react3.useState)(false);
  return item.abbreviation ? import_react3.default.createElement(
    "span",
    {
      key: item.name ? item.name : index,
      className: classes.dropdown_option,
      value: item.abbreviation ? item.abbreviation : item,
      style: {
        minHeight: `${height}px`,
        fontFamily: fontFamily && fontFamily,
        backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
        color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor
      },
      onClick: () => handleClick(item.name ? item.name : item, item.abbreviation),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    item.name ? item.name : item
  ) : import_react3.default.createElement(
    "span",
    {
      key: item.name ? item.name : index,
      className: classes.dropdown_option,
      value: item.name ? item.name : item,
      style: {
        minHeight: `${height}px`,
        fontFamily: fontFamily && fontFamily,
        backgroundColor: isHovered ? hoveredBackgroundColor && hoveredBackgroundColor : backgroundColor && backgroundColor,
        color: isHovered ? hoveredFontColor && hoveredFontColor : fontColor && fontColor
      },
      onClick: () => handleClick(item.name ? item.name : item),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    item.name ? item.name : item
  );
}
ListItem.propTypes = {
  item: import_prop_types3.default.oneOfType([
    import_prop_types3.default.shape({
      name: import_prop_types3.default.string.isRequired,
      abbreviation: import_prop_types3.default.string
    }),
    import_prop_types3.default.string.isRequired,
    import_prop_types3.default.number.isRequired
  ]).isRequired,
  index: import_prop_types3.default.number.isRequired,
  height: import_prop_types3.default.number.isRequired,
  fontFamily: import_prop_types3.default.string,
  backgroundColor: import_prop_types3.default.string,
  hoveredBackgroundColor: import_prop_types3.default.string,
  fontColor: import_prop_types3.default.string,
  hoveredFontColor: import_prop_types3.default.string,
  handleClick: import_prop_types3.default.func.isRequired
};
var ListItem_default = ListItem;

// node_modules/maximez_dropdown/src/SeparatedBox.jsx
function SeparatedBox({ list, height, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, fontFamily, handleClick, searchBar }) {
  const [newList, setNewList] = (0, import_react4.useState)(list);
  function handleFilter(event) {
    const keywords = event.target.value.split(/[, ]+/).filter((item) => item !== "");
    const updatedList = dropdownFilter(keywords, list);
    setNewList(updatedList);
  }
  return import_react4.default.createElement(
    "div",
    {
      className: classes2.dropdown_content,
      style: { maxHeight: `${height * 7}px`, transform: `translateY(${height + 2}px)`, right: "0" }
    },
    import_react4.default.createElement(
      "div",
      {
        className: classes2.animation_box,
        style: {
          width: "100%",
          backgroundColor
        }
      },
      searchBar === true ? import_react4.default.createElement("div", { className: classes2.filter_items, style: { minHeight: `${height}px`, backgroundColor: hoveredBackgroundColor && hoveredBackgroundColor } }, import_react4.default.createElement("span", { className: classes2.filter_items_icon }, import_react4.default.createElement(MagnifyingGlass_default, null)), import_react4.default.createElement(
        "input",
        {
          name: "search_field",
          style: {
            color: fontColor
          },
          className: classes2.filter_items_input,
          type: "text",
          placeholder: "Search...",
          onChange: handleFilter
        }
      )) : null,
      import_react4.default.createElement(
        "div",
        {
          className: classes2.dropdown_options,
          style: {
            maxHeight: `${height * 6}px`,
            backgroundColor
          }
        },
        newList.map((item, index) => {
          return import_react4.default.createElement(
            ListItem_default,
            {
              key: item.name ? item.name : index,
              item,
              index,
              height,
              backgroundColor,
              hoveredBackgroundColor,
              fontColor,
              hoveredFontColor,
              fontFamily,
              handleClick
            }
          );
        })
      )
    )
  );
}
SeparatedBox.propTypes = {
  list: import_prop_types4.default.arrayOf(
    import_prop_types4.default.oneOfType([
      import_prop_types4.default.shape({
        name: import_prop_types4.default.string.isRequired,
        abbreviation: import_prop_types4.default.string
      }),
      import_prop_types4.default.number,
      import_prop_types4.default.string
    ])
  ).isRequired,
  height: import_prop_types4.default.number.isRequired,
  backgroundColor: import_prop_types4.default.string,
  hoveredBackgroundColor: import_prop_types4.default.string,
  fontColor: import_prop_types4.default.string,
  hoveredFontColor: import_prop_types4.default.string,
  fontFamily: import_prop_types4.default.string,
  handleClick: import_prop_types4.default.func.isRequired,
  searchBar: import_prop_types4.default.bool
};
var SeparatedBox_default = SeparatedBox;

// node_modules/maximez_dropdown/src/NormalBox.jsx
var import_react5 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);
import classes3 from "C:/Users/max-z/Desktop/OpenClassrooms/P14/WealthHealth_FrontEnd/node_modules/maximez_dropdown/src/styles/NormalBox.module.css";
function NormalBox({ list, height, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, handleClick, searchBar }) {
  const [newList, setNewList] = (0, import_react5.useState)(list);
  function handleFilter(event) {
    const keywords = event.target.value.split(/[, ]+/).filter((item) => item !== "");
    const updatedList = dropdownFilter(keywords, list);
    setNewList(updatedList);
  }
  return import_react5.default.createElement(
    "div",
    {
      className: classes3.dropdown_content,
      style: {
        maxHeight: `${height * 7}px`,
        minHeight: `${height * 7}px`,
        backgroundColor: backgroundColor && backgroundColor
      }
    },
    searchBar === true ? import_react5.default.createElement(
      "div",
      {
        className: classes3.filter_items,
        style: {
          minHeight: `${height}px`,
          backgroundColor: hoveredBackgroundColor && hoveredBackgroundColor
        }
      },
      import_react5.default.createElement("span", { className: classes3.filter_items_icon }, import_react5.default.createElement(MagnifyingGlass_default, { color: fontColor })),
      import_react5.default.createElement(
        "input",
        {
          name: "search_field",
          style: {
            color: fontColor
          },
          className: classes3.filter_items_input,
          type: "text",
          placeholder: "Search...",
          onChange: handleFilter
        }
      )
    ) : null,
    import_react5.default.createElement(
      "div",
      {
        className: classes3.dropdown_options,
        style: {
          minHeight: `${height * 6}px`,
          backgroundColor: backgroundColor && backgroundColor
        }
      },
      newList.map((item, index) => {
        return import_react5.default.createElement(
          ListItem_default,
          {
            key: item.name ? item.name : index,
            item,
            index,
            height,
            backgroundColor,
            hoveredBackgroundColor,
            fontColor,
            hoveredFontColor,
            handleClick
          }
        );
      })
    )
  );
}
NormalBox.propTypes = {
  list: import_prop_types5.default.arrayOf(
    import_prop_types5.default.shape({
      name: import_prop_types5.default.string.isRequired,
      abbreviation: import_prop_types5.default.string
    })
  ).isRequired,
  height: import_prop_types5.default.number.isRequired,
  backgroundColor: import_prop_types5.default.string,
  hoveredBackgroundColor: import_prop_types5.default.string,
  fontColor: import_prop_types5.default.string,
  hoveredFontColor: import_prop_types5.default.string,
  handleClick: import_prop_types5.default.func.isRequired,
  searchBar: import_prop_types5.default.bool
};
var NormalBox_default = NormalBox;

// node_modules/maximez_dropdown/src/Dropdown.jsx
function Dropdown({ list, label, name, errorMsg, separatedBox, searchBar, defaultValue, defaultName, onChange, height, maxWidth, labelColor, focusedLabelColor, backgroundColor, hoveredBackgroundColor, fontColor, hoveredFontColor, fontFamily, borderBottomColor, boxShadowColor }) {
  const [isOpen, setIsOpen] = (0, import_react6.useState)(false);
  const [isHovered, setIsHovered] = (0, import_react6.useState)(false);
  const [dropdownStatus, setDropdownStatus] = (0, import_react6.useState)("closed");
  const [selectedName, setSelectedName] = defaultName ? (0, import_react6.useState)(defaultName) : (0, import_react6.useState)(defaultValue ? defaultValue : "");
  const [selectedValue, setSelectedValue] = defaultValue ? (0, import_react6.useState)(defaultValue) : (0, import_react6.useState)("");
  const dropdownMenu = (0, import_react6.useRef)(null);
  function handleClickOutside(event) {
    if (isOpen && dropdownMenu.current && !dropdownMenu.current.contains(event.target)) {
      if (dropdownStatus === `opened`) {
        handleClose();
      }
    }
  }
  (0, import_react6.useEffect)(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, dropdownStatus]);
  (0, import_react6.useEffect)(() => {
    onChange && onChange(selectedValue);
  }, [selectedValue]);
  function handleClick(name2, value) {
    setSelectedName(name2);
    if (value) {
      setSelectedValue(value);
    } else if (!value) {
      setSelectedValue(name2);
    }
    handleClose();
  }
  function handleClose() {
    setDropdownStatus(`closing`);
    setIsOpen(false);
    setTimeout(() => {
      setDropdownStatus(`closed`);
    }, 300);
  }
  function handleOpen() {
    setDropdownStatus(`opening`);
    setIsOpen(true);
    setTimeout(() => {
      setDropdownStatus(`opened`);
    }, 300);
  }
  return import_react6.default.createElement(
    "div",
    {
      className: `${classes4.component_container} ${classes4[dropdownStatus]}`,
      style: { maxWidth: `${maxWidth}px` },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    import_react6.default.createElement(
      "label",
      {
        className: isOpen || selectedName !== "" ? `${classes4.label} ${classes4.focused}` : classes4.label,
        htmlFor: name,
        style: { color: isOpen || selectedName !== "" ? focusedLabelColor : labelColor }
      },
      label
    ),
    import_react6.default.createElement("input", { className: classes4.hidden, name, id: name, value: selectedValue, readOnly: true }),
    import_react6.default.createElement("div", { style: { height: `${height}px` } }, import_react6.default.createElement(
      "div",
      {
        ref: dropdownMenu,
        className: separatedBox ? `${classes4.dropdown_container} ${classes4.separated}` : `${classes4.dropdown_container} ${classes4.normal}`,
        style: {
          height: !separatedBox ? dropdownStatus === `closed` || dropdownStatus === `closing` ? `${height}px` : `${height * 8}px` : `${height}px`,
          boxShadow: `0 1px 0 0 ${borderBottomColor}`
        }
      },
      import_react6.default.createElement("div", { className: classes4.dropdown_header, style: { minHeight: `${height}px` }, onClick: () => isOpen ? handleClose() : handleOpen() }, import_react6.default.createElement(
        "span",
        {
          className: classes4.selected_item,
          style: { color: fontColor && fontColor }
        },
        selectedName
      ), import_react6.default.createElement("span", { className: classes4.dropdown_header_icon, style: { backgroundColor: (isHovered || isOpen) && hoveredBackgroundColor && hoveredBackgroundColor } }, import_react6.default.createElement(
        DropdownArrow_default,
        {
          transform: isOpen ? "rotate(180deg)" : "",
          color: fontColor
        }
      ))),
      separatedBox && isOpen ? import_react6.default.createElement(
        SeparatedBox_default,
        {
          list,
          height,
          backgroundColor,
          hoveredBackgroundColor,
          fontColor,
          hoveredFontColor,
          fontFamily,
          boxShadowColor,
          handleClick,
          searchBar
        }
      ) : null,
      !separatedBox ? import_react6.default.createElement(
        NormalBox_default,
        {
          list,
          height,
          backgroundColor,
          hoveredBackgroundColor,
          fontColor,
          hoveredFontColor,
          handleClick,
          searchBar
        }
      ) : null
    )),
    errorMsg ? import_react6.default.createElement("p", { className: classes4.error_msg }, errorMsg) : null
  );
}
Dropdown.propTypes = {
  list: import_prop_types6.default.arrayOf(
    import_prop_types6.default.oneOfType([
      import_prop_types6.default.shape({
        name: import_prop_types6.default.string.isRequired,
        abbreviation: import_prop_types6.default.string
      }),
      import_prop_types6.default.number,
      import_prop_types6.default.string
    ])
  ).isRequired,
  label: import_prop_types6.default.string.isRequired,
  name: import_prop_types6.default.string.isRequired,
  errorMsg: import_prop_types6.default.string,
  placeholder: import_prop_types6.default.string,
  height: import_prop_types6.default.number.isRequired,
  maxWidth: import_prop_types6.default.number,
  labelColor: import_prop_types6.default.string,
  focusedLabelColor: import_prop_types6.default.string,
  backgroundColor: import_prop_types6.default.string,
  hoveredBackgroundColor: import_prop_types6.default.string,
  fontColor: import_prop_types6.default.string,
  hoveredFontColor: import_prop_types6.default.string,
  fontFamily: import_prop_types6.default.string,
  borderBottomColor: import_prop_types6.default.string,
  boxShadowColor: import_prop_types6.default.string,
  separatedBox: import_prop_types6.default.bool.isRequired,
  searchBar: import_prop_types6.default.bool,
  defaultValue: import_prop_types6.default.oneOfType([
    import_prop_types6.default.number,
    import_prop_types6.default.string
  ]),
  defaultName: import_prop_types6.default.string,
  onChange: import_prop_types6.default.func
};
var Dropdown_default = Dropdown;
export {
  Dropdown_default as Dropdown
};
//# sourceMappingURL=maximez_dropdown.js.map
